"use client";

import { Card } from "./Card";
import { AreaChart } from "./AreaChart";
import Text from "./Text";
import { HourWeatherForecast } from "@/lib/weatherDataTypes";

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
      <Text>Temperatura y sensación térmica</Text>
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
