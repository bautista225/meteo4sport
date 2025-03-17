import {
  Dum,
  PrediccionMunicipioProbabilidadPorHoras,
} from "@/types/AEMET/CityHourlyForecast";

import {
  AemetWeatherData,
  AemetWeatherProbabilityData,
  AemetWeatherWind,
  HourWeatherForecast,
  WeatherHourlyData,
} from "./weatherDataTypes";

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

const getAllAvailableHours = (day: Dum): string[] => {
  const allHours = new Set([
    ...day.estadoCielo.map((e) => e.periodo),
    ...day.precipitacion.map((p) => p.periodo),
    ...day.nieve.map((p) => p.periodo),
    ...day.temperatura.map((p) => p.periodo),
    ...day.sensTermica.map((p) => p.periodo),
    ...day.humedadRelativa.map((p) => p.periodo),
  ]);

  return Array.from(allHours);
};

const findPeriodInWeatherData = <t extends AemetWeatherData>(
  measurement: t[],
  hour: string
): t | undefined => {
  return measurement.find(({ periodo }) => periodo === hour);
};

const findPeriodInWeatherProbabilityData = <
  t extends AemetWeatherProbabilityData
>(
  measurement: t[],
  hour: string
): t | undefined => {
  return measurement.find(
    ({ periodo }) =>
      Number(periodo.substring(0, 2)) <= Number(hour) &&
      Number(periodo.substring(2, 4)) >= Number(hour)
  );
};

const findPeriodInWeatherWind = <t extends AemetWeatherWind>(
  measurement: t[],
  hour: string
): t | undefined => {
  return measurement.find(
    ({ periodo, direccion, velocidad }) =>
      periodo === hour && direccion && velocidad
  );
};

const findPeriodInWeatherWindGust = <t extends AemetWeatherWind>(
  measurement: t[],
  hour: string
): t | undefined => {
  return measurement.find(({ periodo, value }) => periodo === hour && value);
};

const mergeHourlyData = (availableHours: string[], day: Dum) => {
  const baseDate = day.fecha.split("T")[0];

  return availableHours.map((hour) => {
    const currentDateTime = `${baseDate}T${hour}:00:00`;

    const weatherCondition = findPeriodInWeatherData(day.estadoCielo, hour);

    const rain = findPeriodInWeatherData(day.precipitacion, hour);
    const rainProb = findPeriodInWeatherProbabilityData(
      day.probPrecipitacion,
      hour
    );
    const stormProb = findPeriodInWeatherProbabilityData(
      day.probTormenta,
      hour
    );

    const snowfall = findPeriodInWeatherData(day.nieve, hour);
    const snowfallProb = findPeriodInWeatherProbabilityData(
      day.probNieve,
      hour
    );

    const temperature = findPeriodInWeatherData(day.temperatura, hour);
    const feelsLike = findPeriodInWeatherData(day.sensTermica, hour);
    const relativeHumidity = findPeriodInWeatherData(day.humedadRelativa, hour);

    const wind = findPeriodInWeatherWind(day.vientoAndRachaMax, hour);

    const windGust = findPeriodInWeatherWindGust(day.vientoAndRachaMax, hour);

    return {
      dateTime: currentDateTime,
      weatherConditionCode: weatherCondition?.value || null,
      weatherConditionDescription: weatherCondition?.descripcion || null,
      rain: rain?.value || null,
      rainProbability: rainProb?.value || null,
      stormProbability: stormProb?.value || null,
      snowfall: snowfall?.value || null,
      snowfallProbability: snowfallProb?.value || null,
      temperature: temperature?.value || null,
      feelsLike: feelsLike?.value || null,
      relativeHumidity: relativeHumidity?.value || null,
      windSpeed: wind?.velocidad?.[0] || null,
      windDirection: wind?.direccion?.[0] || null,
      windGust: windGust?.value || null,
      sunrise: day.orto,
      sunset: day.ocaso,
    };
  });
};

const parseAemetCityHourlyForecast = (dia: Dum[]): HourWeatherForecast[] => {
  return dia.flatMap((day) => {
    const allHours = getAllAvailableHours(day);

    const mergedForecast = mergeHourlyData(allHours, day);

    return mergedForecast;
  }) as HourWeatherForecast[];
};

const getCurrentWeather = (
  weatherData: HourWeatherForecast[],
  currentDateTime: string
) => {
  return weatherData.find(
    (hourWeatherForecast) =>
      hourWeatherForecast.dateTime.substring(0, 14) ===
      currentDateTime.substring(0, 14)
  );
};

export const transformAemetToWeatherHourlyData = (
  hourlyForecast: PrediccionMunicipioProbabilidadPorHoras
): WeatherHourlyData => {
  const processedHourlyForecast = parseAemetCityHourlyForecast(
    hourlyForecast.prediccion.dia
  );

  const currentDateTime = getCurrentDateTimeString();

  const currentWeatherData = getCurrentWeather(
    processedHourlyForecast,
    currentDateTime
  );

  return {
    city: hourlyForecast.nombre,
    forecastLanguage: hourlyForecast.origen.language,
    region: hourlyForecast.provincia,
    country: "Spain",
    dataCollectionInterval: "hourly",
    forecastCreated: hourlyForecast.elaborado,
    currentWeather: {
      dateTime: currentDateTime,
      ...currentWeatherData,
    },
    forecasts: processedHourlyForecast,
  };
};
