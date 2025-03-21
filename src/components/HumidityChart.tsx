"use client";

import { Card } from "./Card";
import { AreaChart } from "./AreaChart";
import Text from "./Text";
import { HourWeatherForecast } from "@/lib/weatherDataTypes";
import { RiWaterPercentLine } from "@remixicon/react";

type Props = {
  forecasts: HourWeatherForecast[];
};

export default function HumidityChart({ forecasts }: Props) {
  const data = forecasts.map((forecast) => {
    return {
      time: forecast.dateTime.split("T")[1].split(":")[0],
      "Humedad relativa (%)": Number(forecast.relativeHumidity),
    };
  });

  return (
    <Card>
      <div className="flex gap-x-2">
        <RiWaterPercentLine />
        <Text>Humedad relativa</Text>
      </div>
      <AreaChart
        className="mt-6"
        data={data}
        index="time"
        showLegend
        categories={["Humedad relativa (%)"]}
        valueFormatter={(number: number) =>
          `${Intl.NumberFormat().format(number).toString()}%`
        }
        colors={["emerald"]}
        minValue={0}
      />
    </Card>
  );
}
