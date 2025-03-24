"use client";

import { Card } from "./Card";
import Text from "./Text";
import { ComboChart } from "./ComboChart";
import { HourWeatherForecast } from "@/lib/weatherDataTypes";
import { RiUmbrellaLine } from "@remixicon/react";
import { getChartFormattedDateTime } from "@/lib/cleanHourlyWeatherData";

type Props = {
  forecasts: HourWeatherForecast[];
};

export default function RainChart({ forecasts }: Props) {
  const data = forecasts.map((forecast) => {
    return {
      time: getChartFormattedDateTime(forecast.dateTime),
      "Prob. tormenta (%)": Number(forecast.stormProbability),
      "Prob. precipitación (%)": Number(forecast.rainProbability),
      "Cantidad de lluvia (mm)": Number(forecast.rain),
    };
  });

  return (
    <Card className="py-6 px-1 md:px-6">
      <div className="flex gap-x-2 mx-6 md:mx-0">
        <RiUmbrellaLine />
        <Text>Precipitaciones</Text>
      </div>
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
          categories: ["Prob. precipitación (%)", "Prob. tormenta (%)"],
          colors: ["cyan", "gray"],
          maxValue: 100,
          valueFormatter: (number: number) =>
            `${Intl.NumberFormat().format(number).toString()}%`,
        }}
      />
    </Card>
  );
}
