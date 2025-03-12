import { PrediccionMunicipioProbabilidadPorHoras } from "@/types/AEMET/CityHourlyForecast";
import { AemetResponse } from "@/types/AEMET/Response";

const AEMET_OPEN_DATA_API_URL = "https://opendata.aemet.es/opendata/api/";

export async function getCityHourlyForecast(cityCode: string) {
  const preliminaryResponse = await fetch(
    `${AEMET_OPEN_DATA_API_URL}/prediccion/especifica/municipio/horaria/${cityCode}?api_key=${process.env.AEMET_API_KEY}`
  );
  const preliminaryData = (await preliminaryResponse.json()) as AemetResponse;

  if (!preliminaryData.datos) return null;

  const response = await fetch(preliminaryData.datos);
  const forecast = (
    await response.json()
  )[0] as PrediccionMunicipioProbabilidadPorHoras;

  return forecast;
}
