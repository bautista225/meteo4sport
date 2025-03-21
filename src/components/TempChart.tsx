"use client";

import { Card } from "./Card";
import { AreaChart } from "./AreaChart";
import Text from "./Text";
import { HourWeatherForecast } from "@/lib/weatherDataTypes";
import { RiTempHotLine } from "@remixicon/react";

type Props = {
  forecasts: HourWeatherForecast[];
};

export default function TempChart({ forecasts }: Props) {
  const data = forecasts
    .map((forecast) => {
      return {
        time: forecast.dateTime.split("T")[1].split(":")[0],
        "Temperatura (ºC)": Number(forecast.temperature),
        "Sensación térmica (ºC)": Number(forecast.feelsLike),
      };
    })
    .slice(0, 24);

  return (
    <Card>
      <div className="flex gap-x-2">
        <RiTempHotLine />
        <Text>Temperatura y sensación térmica</Text>
      </div>
      <AreaChart
        className="mt-6"
        data={data}
        index="time"
        showLegend
        categories={["Sensación térmica (ºC)", "Temperatura (ºC)"]}
        valueFormatter={(number: number) =>
          `${Intl.NumberFormat().format(number).toString()}°C`
        }
        colors={["lime", "amber"]}
      />
    </Card>
  );
}
