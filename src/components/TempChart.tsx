"use client";

import { PrediccionMunicipioProbabilidadPorHoras } from "@/types/AEMET/CityHourlyForecast";
import { Card } from "./Card";
import { AreaChart } from "./AreaChart";
import Text from "./Text";

type Props = {
  forecast: PrediccionMunicipioProbabilidadPorHoras;
};

export default function TempChart({ forecast }: Props) {
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
    const tempSensation = forecast.prediccion.dia[0].sensTermica.filter(
      ({ periodo }) => periodo === hour.split(":")[0]
    );
    const temp = forecast.prediccion.dia[0].temperatura.filter(
      ({ periodo }) => periodo === hour.split(":")[0]
    );
    return {
      time: hour,
      "Temperature (ºC)": temp.length ? temp[0].value : 0,
      "Feels like (ºC)": tempSensation.length ? tempSensation[0].value : 0,
    };
  });

  return (
    <Card>
      <Text>Temperature & Feels like</Text>
      <AreaChart
        className="mt-6"
        data={data}
        index="time"
        showLegend
        categories={["Feels like (ºC)", "Temperature (ºC)"]}
        colors={["lime", "amber"]}
        minValue={0}
      />
    </Card>
  );
}
