"use client";

import { PrediccionMunicipioProbabilidadPorHoras } from "@/types/AEMET/CityHourlyForecast";
import { Card } from "./Card";
import { AreaChart } from "./AreaChart";
import Text from "./Text";

type Props = {
  forecast: PrediccionMunicipioProbabilidadPorHoras;
};

export default function HumidityChart({ forecast }: Props) {
  const currentDate = forecast.elaborado.split("T")[0];
  const hourly = forecast.prediccion.dia[0].temperatura.map(({ periodo }) => {
    const forecastStringDateTime = `${currentDate}T${periodo}:00:00`;
    return new Date(forecastStringDateTime).toLocaleString("en-US", {
      hour: "numeric",
      hour12: false,
      minute: "numeric",
    });
  });

  const data = hourly.map((hour) => {
    const humidity = forecast.prediccion.dia[0].humedadRelativa.filter(
      ({ periodo }) => periodo === hour.split(":")[0]
    );
    return {
      time: hour,
      "Humidity (%)": humidity.length ? humidity[0].value : 0,
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
