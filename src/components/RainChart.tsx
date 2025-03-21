"use client";

import { Card } from "./Card";
import Text from "./Text";
import { ComboChart } from "./ComboChart";
import { HourWeatherForecast } from "@/lib/weatherDataTypes";

type Props = {
  forecasts: HourWeatherForecast[];
};

export default function RainChart({ forecasts }: Props) {
  const data = forecasts
    .map((forecast) => {
      return {
        time: forecast.dateTime.split("T")[1].split(":")[0],
        "Probabilidad de tormenta (%)": Number(forecast.stormProbability),
        "Probabilidad de precipitación (%)": Number(forecast.rainProbability),
        "Cantidad de lluvia (mm)": Number(forecast.rain),
      };
    })
    .slice(0, 24);

  return (
    <Card>
      <Text>Precipitaciones</Text>
      <ComboChart
        className="mt-6"
        data={data}
        index="time"
        enableBiaxial
        barSeries={{
          categories: ["Cantidad de lluvia (mm)"],
          colors: ["blue"],
          maxValue: forecasts.reduce(
            (max, { rain }) => Math.max(max, Number(rain)),
            6.0
          ),
          valueFormatter: (number: number) =>
            `${Intl.NumberFormat().format(number).toString()} mm`,
        }}
        lineSeries={{
          categories: [
            "Probabilidad de precipitación (%)",
            "Probabilidad de tormenta (%)",
          ],
          colors: ["cyan", "gray"],
          maxValue: 100,
          valueFormatter: (number: number) =>
            `${Intl.NumberFormat().format(number).toString()}%`,
        }}
      />
    </Card>
  );
}
