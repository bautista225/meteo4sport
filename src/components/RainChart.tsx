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
        "Storm Probability (%)": Number(forecast.stormProbability),
        "Rain Probability (%)": Number(forecast.rainProbability),
        "Rain (mm)": Number(forecast.rain),
      };
    })
    .slice(0, 24);

  return (
    <Card>
      <Text>Chances of rain</Text>
      <ComboChart
        className="mt-6"
        data={data}
        index="time"
        enableBiaxial
        barSeries={{
          categories: ["Rain (mm)"],
          colors: ["blue"],
          maxValue: forecasts.reduce(
            (max, { rain }) => Math.max(max, Number(rain)),
            6
          ),
          valueFormatter: (number: number) =>
            `${Intl.NumberFormat().format(number).toString()} mm`,
        }}
        lineSeries={{
          categories: ["Rain Probability (%)", "Storm Probability (%)"],
          colors: ["cyan", "gray"],
          maxValue: 100,
          valueFormatter: (number: number) =>
            `${Intl.NumberFormat().format(number).toString()}%`,
        }}
      />
    </Card>
  );
}
