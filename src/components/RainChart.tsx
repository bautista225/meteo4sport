"use client";

import { PrediccionMunicipioProbabilidadPorHoras } from "@/types/AEMET/CityHourlyForecast";
import { Card } from "./Card";
import Text from "./Text";
import { ComboChart } from "./ComboChart";

type Props = {
  forecast: PrediccionMunicipioProbabilidadPorHoras;
};

export default function RainChart({ forecast }: Props) {
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
    const stormProb = forecast.prediccion.dia[0].probTormenta.filter(
      ({ periodo }) =>
        Number(periodo.substring(0, 2)) <= Number(hour.split(":")[0]) &&
        Number(periodo.substring(2, 4)) >= Number(hour.split(":")[0])
    );
    const rainProb = forecast.prediccion.dia[0].probPrecipitacion.filter(
      ({ periodo }) =>
        Number(periodo.substring(0, 2)) <= Number(hour.split(":")[0]) &&
        Number(periodo.substring(2, 4)) >= Number(hour.split(":")[0])
    );
    const rain = forecast.prediccion.dia[0].precipitacion.filter(
      ({ periodo }) => periodo === hour.split(":")[0]
    );
    return {
      time: hour,
      "Storm Probability (%)": stormProb.length ? stormProb[0].value : 0,
      "Rain Probability (%)": rainProb.length ? rainProb[0].value : 0,
      "Rain (mm)": rain.length ? rain[0].value : 0,
    };
  });

  return (
    <Card>
      <Text>Chances of rain</Text>
      <ComboChart
        className="mt-6"
        data={data}
        index="time"
        enableBiaxial
        barSeries={{
          categories: ["Rain (mm)"],
          colors: ["blue"],
          maxValue: forecast.prediccion.dia[0].precipitacion.filter(
            ({ value }) => Number(value) > 6
          ).length
            ? forecast.prediccion.dia[0].precipitacion.filter(
                ({ value }) => Number(value) > 6
              ).length
            : 6,
        }}
        lineSeries={{
          categories: ["Rain Probability (%)", "Storm Probability (%)"],
          colors: ["cyan", "gray"],
          maxValue: 100,
        }}
      />
    </Card>
  );
}
