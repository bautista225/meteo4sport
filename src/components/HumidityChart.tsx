"use client";

import { Card } from "./Card";
import { AreaChart } from "./AreaChart";
import Text from "./Text";
import { HourWeatherForecast } from "@/lib/weatherDataTypes";

type Props = {
  forecasts: HourWeatherForecast[];
};

export default function HumidityChart({ forecasts }: Props) {
  const data = forecasts.map((forecast) => {
    return {
      time: forecast.dateTime.split("T")[1].split(":")[0],
      "Humidity (%)": Number(forecast.relativeHumidity),
    };
  });

  return (
    <Card>
      <Text>Humidity</Text>
      <AreaChart
        className="mt-6"
        data={data}
        index="time"
        showLegend
        categories={["Humidity (%)"]}
        valueFormatter={(number: number) =>
          `${Intl.NumberFormat().format(number).toString()}%`
        }
        colors={["emerald"]}
        minValue={0}
      />
    </Card>
  );
}
