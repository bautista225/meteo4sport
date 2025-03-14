import {
  Dum,
  PrediccionMunicipioProbabilidadPorDias,
} from "@/types/AEMET/CityDailyForecast";
import { DayWeatherForecast } from "./weatherDataTypes";

const getCurrentDateTimeString = () => {
  const currentYear = new Date().getFullYear().toString();
  const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0");
  const currentDay = new Date().getDate().toString().padStart(2, "0");
  const currentTime = new Date().toLocaleString("en-GB", {
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
    second: "2-digit",
  });

  return `${currentYear}-${currentMonth}-${currentDay}T${currentTime}`;
};

const parseAemetCityDailyForecast = (dia: Dum[]): DayWeatherForecast[] => {
  return dia.map((dia) => {
    const maxPrecipitacion = dia.probPrecipitacion.reduce(
      (max, item) => Math.max(max, item.value),
      0
    );
    const weatherCondition = dia.estadoCielo.find(
      (item) => item.descripcion.trim() !== ""
    );
    const wind = dia.viento.find((item) => item.direccion.trim() !== "");
    const windGust = dia.rachaMax.find((item) => item.value.trim() !== "") ?? {
      value: dia.viento
        .reduce((max, item) => Math.max(max, item.velocidad), 0)
        .toString(),
    };

    return {
      dateTime: dia.fecha,
      rainProbability: maxPrecipitacion.toString(),
      weatherConditionCode: weatherCondition?.value || null,
      weatherConditionDescription: weatherCondition?.descripcion || null,
      windSpeed: wind?.velocidad.toString() || null,
      windDirection: wind?.direccion || null,
      windGust: windGust?.value || null,
      maxTemperature: dia.temperatura.maxima.toString(),
      minTemperature: dia.temperatura.minima.toString(),
      maxFeelsLike: dia.sensTermica.maxima.toString(),
      minFeelsLike: dia.sensTermica.minima.toString(),
      maxRelativeHumidity: dia.humedadRelativa.maxima.toString(),
      minRelativeHumidity: dia.humedadRelativa.minima.toString(),
      uvMax: dia.uvMax?.toString(),
    };
  }) as DayWeatherForecast[];
};

export const transformAemetToWeatherDailyData = (
  dailyForecast: PrediccionMunicipioProbabilidadPorDias
) => {
  const currentDateTime = getCurrentDateTimeString();

  const processedDailyForecast = parseAemetCityDailyForecast(
    dailyForecast.prediccion.dia
  );

  return {
    city: dailyForecast.nombre,
    forecastLanguage: dailyForecast.origen.language,
    region: dailyForecast.provincia,
    country: "Spain",
    dataCollectionInterval: "daily",
    forecastCreated: dailyForecast.elaborado,
    currentWeather: {
      dateTime: currentDateTime,
      ...processedDailyForecast.find(
        (dailyWeatherForecast) =>
          dailyWeatherForecast.dateTime.substring(0, 10) ===
          currentDateTime.substring(0, 10)
      ),
    },
    forecasts: processedDailyForecast,
  };
};
