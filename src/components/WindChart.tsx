"use client";

import { Card } from "./Card";
import { AreaChart } from "./AreaChart";
import Text from "./Text";
import { HourWeatherForecast } from "@/lib/weatherDataTypes";
import { RiWindyLine } from "@remixicon/react";

type Props = {
  forecasts: HourWeatherForecast[];
};

export default function WindChart({ forecasts }: Props) {
  const data = forecasts
    .map((forecast) => {
      return {
        time: forecast.dateTime.split("T")[1].split(":")[0],
        "Viento (km/h)": Number(forecast.windSpeed),
        "Racha max. (km/h)": Number(forecast.windGust),
      };
    })
    .slice(0, 24);

  return (
    <Card>
      <div className="flex gap-x-2">
        <RiWindyLine />
        <Text>Vientos</Text>
      </div>
      <AreaChart
        className="mt-6"
        data={data}
        index="time"
        showLegend
        categories={["Viento (km/h)", "Racha max. (km/h)"]}
        valueFormatter={(number: number) =>
          `${Intl.NumberFormat().format(number).toString()} km/h`
        }
        colors={["blue", "gray"]}
      />
    </Card>
  );
}
