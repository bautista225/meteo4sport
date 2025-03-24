"use server";

import { getWeatherSummary } from "@/services/CohereService";
import { WeatherForecast } from "@/lib/weatherDataTypes";

export async function fetchWeatherSummary(weatherForecast: WeatherForecast) {
  try {
    return await getWeatherSummary(weatherForecast);
  } catch (error) {
    console.error("Error fetching weather summary:", error);
    return {
      intro:
        "El servicio de Cohere AI no está disponible en estos momentos. Prueba en unos instantes.",
      summary:
        "El servicio de Cohere AI no está disponible en estos momentos. Prueba en unos instantes.",
      wearForRunning: "",
      weatherJoke: "",
    };
  }
}
