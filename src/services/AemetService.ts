import { PrediccionMunicipioProbabilidadPorDias } from "@/types/AEMET/CityDailyForecast";
import { PrediccionMunicipioProbabilidadPorHoras } from "@/types/AEMET/CityHourlyForecast";
import { AemetResponse } from "@/types/AEMET/Response";

const AEMET_OPEN_DATA_API_URL = "https://opendata.aemet.es/opendata/api";
const AEMET_WEATHER_ICONS_URL =
  "https://www.aemet.es/imagenes/png/estado_cielo";

export function getWeatherIconUrl(weatherCode: string) {
  return `${AEMET_WEATHER_ICONS_URL}/${weatherCode}_g.png`;
}

export async function getCityHourlyForecast(cityCode: string) {
  console.log(`AEMET API KEY ${process.env.AEMET_API_KEY}`);
  const preliminaryResponse = await fetch(
    `${AEMET_OPEN_DATA_API_URL}/prediccion/especifica/municipio/horaria/${cityCode}?api_key=${process.env.AEMET_API_KEY}`,
    {
      cache: "no-cache",
    }
  );
  const preliminaryData = (await preliminaryResponse.json()) as AemetResponse;

  if (!preliminaryData.datos) return null;

  const response = await fetch(preliminaryData.datos);
  const forecast = (
    await response.json()
  )[0] as PrediccionMunicipioProbabilidadPorHoras;

  return forecast;
}

export async function getCityDailyForecast(cityCode: string) {
  const preliminaryResponse = await fetch(
    `${AEMET_OPEN_DATA_API_URL}/prediccion/especifica/municipio/diaria/${cityCode}?api_key=${process.env.AEMET_API_KEY}`,
    {
      cache: "no-cache",
    }
  );
  const preliminaryData = (await preliminaryResponse.json()) as AemetResponse;

  if (!preliminaryData.datos) return null;

  const response = await fetch(preliminaryData.datos);
  const forecast = (
    await response.json()
  )[0] as PrediccionMunicipioProbabilidadPorDias;

  return forecast;
}
