import { WeatherForecast } from "./weatherDataTypes";

export interface AiAssistantResponse {
  intro: string;
  summary: string;
  wearForRunning: string;
  weatherJoke: string;
}

export default function transformWeatherDataForAiPrompt(
  weatherForecast: WeatherForecast
) {
  const {
    city,
    country,
    dataCollectionInterval,
    forecastCreated,
    forecastLanguage,
    region,
    currentWeather,
    forecasts,
  } = weatherForecast.weatherHourlyData;

  const { sunrise, sunset, ...shortCurrentWeather } = currentWeather;

  const currentWeatherIndex = forecasts.findIndex(
    (hourWeatherForecast) =>
      hourWeatherForecast.dateTime.substring(0, 14) ===
      currentWeather.dateTime.substring(0, 14)
  );

  return {
    currentWeather: {
      ...shortCurrentWeather,
    },
    nextForecasts: forecasts.slice(
      currentWeatherIndex + 1,
      currentWeatherIndex + 4
    ),
    sunrise,
    sunset,
    city,
    region,
    country,
    dataCollectionInterval,
    forecastCreated,
    forecastLanguage,
  };
}
