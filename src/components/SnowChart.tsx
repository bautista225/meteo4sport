"use client";

import { Card } from "./Card";
import Text from "./Text";
import { ComboChart } from "./ComboChart";
import { HourWeatherForecast } from "@/lib/weatherDataTypes";
import { RiSnowflakeLine } from "@remixicon/react";

type Props = {
  forecasts: HourWeatherForecast[];
};

export default function SnowChart({ forecasts }: Props) {
  const data = forecasts.map((forecast) => {
    return {
      time: forecast.dateTime.split("T")[1].split(":")[0],
      "Probabilidad de nevada (%)": Number(forecast.snowfallProbability),
      "Cantidad de nieve (mm)": Number(forecast.snowfallProbability),
    };
  });

  return (
    <Card>
      <div className="flex gap-x-2">
        <RiSnowflakeLine />
        <Text>Nevadas</Text>
      </div>
      <ComboChart
        className="mt-6"
        data={data}
        index="time"
        enableBiaxial
        barSeries={{
          categories: ["Cantidad de nieve (mm)"],
          colors: ["pink"],
          maxValue: forecasts.reduce(
            (max, { snowfall }) => Math.max(max, Number(snowfall)),
            6
          ),
          valueFormatter: (number: number) =>
            `${Intl.NumberFormat().format(number).toString()} mm`,
        }}
        lineSeries={{
          categories: ["Probabilidad de nevada (%)"],
          colors: ["violet"],
          maxValue: 100,
          valueFormatter: (number: number) =>
            `${Intl.NumberFormat().format(number).toString()}%`,
        }}
      />
    </Card>
  );
}
