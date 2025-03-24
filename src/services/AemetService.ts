import { transformAemetToWeatherDailyData } from "@/lib/cleanDailyWeatherData";
import { transformAemetToWeatherHourlyData } from "@/lib/cleanHourlyWeatherData";
import { WeatherForecast } from "@/lib/weatherDataTypes";
import { PrediccionMunicipioProbabilidadPorDias } from "@/types/AEMET/CityDailyForecast";
import { PrediccionMunicipioProbabilidadPorHoras } from "@/types/AEMET/CityHourlyForecast";
import { AemetResponse } from "@/types/AEMET/Response";

const AEMET_OPEN_DATA_API_URL = "https://opendata.aemet.es/opendata/api";
const AEMET_WEATHER_ICONS_URL =
  "https://www.aemet.es/imagenes/png/estado_cielo";

export function getWeatherIconUrl(weatherCode: string) {
  return `${AEMET_WEATHER_ICONS_URL}/${weatherCode}_g.png`;
}

async function handleAemetResponse(response: Response) {
  if (!response.ok) {
    const error = new Error(`HTTP error! status: ${response.status}`);
    error.name = `AEMET_${response.status}`;
    throw error;
  }
  return response;
}

export async function getCityHourlyForecast(cityCode: string) {
  try {
    const preliminaryResponse = await handleAemetResponse(
      await fetch(
        `${AEMET_OPEN_DATA_API_URL}/prediccion/especifica/municipio/horaria/${cityCode}?api_key=${process.env.AEMET_API_KEY}`,
        {
          cache: "no-cache",
        }
      )
    );

    const preliminaryData = (await preliminaryResponse.json()) as AemetResponse;

    if (!preliminaryData.datos) {
      const error = new Error(
        "No se encontraron datos en la respuesta de AEMET"
      );
      error.name = "AEMET_NO_DATA";
      throw error;
    }

    const response = await handleAemetResponse(
      await fetch(preliminaryData.datos, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
    );

    const forecast = (
      await response.json()
    )[0] as PrediccionMunicipioProbabilidadPorHoras;

    return forecast;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Error desconocido al obtener el pronóstico horario");
  }
}

export async function getCityDailyForecast(cityCode: string) {
  try {
    const preliminaryResponse = await handleAemetResponse(
      await fetch(
        `${AEMET_OPEN_DATA_API_URL}/prediccion/especifica/municipio/diaria/${cityCode}?api_key=${process.env.AEMET_API_KEY}`,
        {
          cache: "no-cache",
        }
      )
    );

    const preliminaryData = (await preliminaryResponse.json()) as AemetResponse;

    if (!preliminaryData.datos) {
      const error = new Error(
        "No se encontraron datos en la respuesta de AEMET"
      );
      error.name = "AEMET_NO_DATA";
      throw error;
    }

    const response = await handleAemetResponse(
      await fetch(preliminaryData.datos, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
    );

    const forecast = (
      await response.json()
    )[0] as PrediccionMunicipioProbabilidadPorDias;

    return forecast;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Error desconocido al obtener el pronóstico diario");
  }
}

export async function getWeatherForecast(
  cityCode: string
): Promise<WeatherForecast | null> {
  try {
    const hourlyForecast = await getCityHourlyForecast(cityCode);
    const dailyForecast = await getCityDailyForecast(cityCode);

    if (!hourlyForecast || !dailyForecast) {
      const error = new Error("No se pudo obtener el pronóstico completo");
      error.name = "AEMET_INCOMPLETE_DATA";
      throw error;
    }

    const weatherHourlyData = transformAemetToWeatherHourlyData(hourlyForecast);
    const weatherDailyData = transformAemetToWeatherDailyData(dailyForecast);

    return { weatherHourlyData, weatherDailyData };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Error al procesar los datos meteorológicos");
  }
}
