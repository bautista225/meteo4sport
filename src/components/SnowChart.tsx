"use client";

import { PrediccionMunicipioProbabilidadPorHoras } from "@/types/AEMET/CityHourlyForecast";
import { Card } from "./Card";
import Text from "./Text";
import { ComboChart } from "./ComboChart";

type Props = {
  forecast: PrediccionMunicipioProbabilidadPorHoras;
};

export default function SnowChart({ forecast }: Props) {
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
    const snowProb = forecast.prediccion.dia[0].probNieve.filter(
      ({ periodo }) =>
        Number(periodo.substring(0, 2)) <= Number(hour.split(":")[0]) &&
        Number(periodo.substring(2, 4)) >= Number(hour.split(":")[0])
    );
    const snow = forecast.prediccion.dia[0].nieve.filter(
      ({ periodo }) => periodo === hour.split(":")[0]
    );
    return {
      time: hour,
      "Snow Probability (%)": snowProb.length ? snowProb[0].value : 0,
      "Snow (mm)": snow.length ? snow[0].value : 0,
    };
  });

  return (
    <Card>
      <Text>Chances of snow</Text>
      <ComboChart
        className="mt-6"
        data={data}
        index="time"
        enableBiaxial
        barSeries={{
          categories: ["Snow (mm)"],
          colors: ["pink"],
          maxValue: forecast.prediccion.dia[0].precipitacion.filter(
            ({ value }) => Number(value) > 6
          ).length
            ? forecast.prediccion.dia[0].precipitacion.filter(
                ({ value }) => Number(value) > 6
              ).length
            : 6,
          valueFormatter: (number: number) =>
            `${Intl.NumberFormat().format(number).toString()} mm`,
        }}
        lineSeries={{
          categories: ["Snow Probability (%)"],
          colors: ["violet"],
          maxValue: 100,
          valueFormatter: (number: number) =>
            `${Intl.NumberFormat().format(number).toString()}%`,
        }}
      />
    </Card>
  );
}
