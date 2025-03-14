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
        "Temperature (ºC)": Number(forecast.temperature),
        "Feels like (ºC)": Number(forecast.feelsLike),
      };
    })
    .slice(0, 24);

  return (
    <Card>
      <Text>Temperature & Feels like</Text>
      <AreaChart
        className="mt-6"
        data={data}
        index="time"
        showLegend
        categories={["Feels like (ºC)", "Temperature (ºC)"]}
        valueFormatter={(number: number) =>
          `${Intl.NumberFormat().format(number).toString()}°C`
        }
        colors={["lime", "amber"]}
      />
    </Card>
  );
}
