import {
  EstadoCielo,
  HumedadRelativa,
  Nieve,
  Precipitacion,
  ProbNieve,
  ProbPrecipitacion,
  ProbTormenum,
  SensTermica,
  Temperatura,
  VientoAndRachaMax,
} from "@/types/AEMET/CityHourlyForecast";

export interface WeatherForecast {
  weatherHourlyData: WeatherHourlyData;
  weatherDailyData: WeatherDailyData;
}

export interface WeatherDailyData {
  city: string;
  forecastLanguage: string;
  region: string;
  country: string;
  dataCollectionInterval: string;
  forecastCreated: string;
  currentWeather: DayWeatherForecast;
  forecasts: DayWeatherForecast[];
}

export interface WeatherHourlyData {
  city: string;
  forecastLanguage: string;
  region: string;
  country: string;
  dataCollectionInterval: string;
  forecastCreated: string;
  currentWeather: HourWeatherForecast;
  forecasts: HourWeatherForecast[];
}

export interface DayWeatherForecast {
  dateTime: string;
  rainProbability?: string;
  weatherConditionCode?: string;
  weatherConditionDescription?: string;
  windSpeed?: string;
  windDirection?: string;
  windGust?: string;
  maxTemperature?: string;
  minTemperature?: string;
  maxFeelsLike?: string;
  minFeelsLike?: string;
  maxRelativeHumidity?: string;
  minRelativeHumidity?: string;
  uvMax?: string;
}

export interface HourWeatherForecast {
  dateTime: string;
  sunrise?: string;
  sunset?: string;
  weatherConditionCode?: string;
  weatherConditionDescription?: string;
  rain?: string;
  rainProbability?: string;
  stormProbability?: string;
  snowfall?: string;
  snowfallProbability?: string;
  temperature?: string;
  feelsLike?: string;
  relativeHumidity?: string;
  windSpeed?: string;
  windDirection?: string;
  windGust?: string;
}

export type AemetWeatherData =
  | EstadoCielo
  | Precipitacion
  | Nieve
  | Temperatura
  | SensTermica
  | HumedadRelativa;

export type AemetWeatherProbabilityData =
  | ProbPrecipitacion
  | ProbTormenum
  | ProbNieve;

export type AemetWeatherWind = VientoAndRachaMax;
