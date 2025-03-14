"use client";

import { Card } from "./Card";
import Text from "./Text";
import { ComboChart } from "./ComboChart";
import { HourWeatherForecast } from "@/lib/weatherDataTypes";

type Props = {
  forecasts: HourWeatherForecast[];
};

export default function SnowChart({ forecasts }: Props) {
  const data = forecasts.map((forecast) => {
    return {
      time: forecast.dateTime.split("T")[1].split(":")[0],
      "Snowfall Probability (%)": Number(forecast.snowfallProbability),
      "Snowfall (mm)": Number(forecast.snowfallProbability),
    };
  });

  return (
    <Card>
      <Text>Chances of snowfall</Text>
      <ComboChart
        className="mt-6"
        data={data}
        index="time"
        enableBiaxial
        barSeries={{
          categories: ["Snow (mm)"],
          colors: ["pink"],
          maxValue: forecasts.reduce(
            (max, { snowfall }) => Math.max(max, Number(snowfall)),
            6
          ),
          valueFormatter: (number: number) =>
            `${Intl.NumberFormat().format(number).toString()} mm`,
        }}
        lineSeries={{
          categories: ["Snow Probability (%)"],
          colors: ["violet"],
          maxValue: 100,
          valueFormatter: (number: number) =>
            `${Intl.NumberFormat().format(number).toString()}%`,
        }}
      />
    </Card>
  );
}
