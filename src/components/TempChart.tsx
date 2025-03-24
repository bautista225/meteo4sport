"use client";

import { Card } from "./Card";
import { AreaChart } from "./AreaChart";
import Text from "./Text";
import { HourWeatherForecast } from "@/lib/weatherDataTypes";
import { RiTempHotLine } from "@remixicon/react";
import { getChartFormattedDateTime } from "@/lib/cleanHourlyWeatherData";

type Props = {
  forecasts: HourWeatherForecast[];
};

export default function TempChart({ forecasts }: Props) {
  const data = forecasts.map((forecast) => {
    return {
      time: getChartFormattedDateTime(forecast.dateTime),
      "Temperatura (ºC)": Number(forecast.temperature),
      "Sensación térmica (ºC)": Number(forecast.feelsLike),
    };
  });

  return (
    <Card className="py-6 px-1 md:px-6">
      <div className="flex gap-x-2 mx-6 md:mx-0">
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
