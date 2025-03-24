"use client";

import { Card } from "./Card";
import { AreaChart } from "./AreaChart";
import Text from "./Text";
import { HourWeatherForecast } from "@/lib/weatherDataTypes";
import { RiWaterPercentLine } from "@remixicon/react";
import { getChartFormattedDateTime } from "@/lib/cleanHourlyWeatherData";

type Props = {
  forecasts: HourWeatherForecast[];
};

export default function HumidityChart({ forecasts }: Props) {
  const data = forecasts.map((forecast) => {
    return {
      time: getChartFormattedDateTime(forecast.dateTime),
      "Humedad relativa (%)": Number(forecast.relativeHumidity),
    };
  });

  return (
    <Card className="py-6 px-1 md:px-6">
      <div className="flex gap-x-2 mx-6 md:mx-0">
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
