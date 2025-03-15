import transformWeatherDataForAiPrompt, {
  AiAssistantResponse,
} from "@/lib/aiAssistantData";
import getBasePath from "@/lib/getBasePath";
import { WeatherForecast } from "@/lib/weatherDataTypes";

export const getWeatherForecast = async (cityCode: string) => {
  const resWeatherForecast = await fetch(
    `${getBasePath()}/api/getWeatherForecast`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cityCode }),
      cache: "no-store",
    }
  );

  const resWeatherForecastJSON = await resWeatherForecast.json();
  if (!resWeatherForecastJSON) return null;

  const weatherForecast = resWeatherForecastJSON as WeatherForecast;
  return weatherForecast;
};

export const getWeatherSummary = async (weatherForecast: WeatherForecast) => {
  const aiAssistantWeatherData =
    transformWeatherDataForAiPrompt(weatherForecast);

  const resAiAssistantResponse = await fetch(
    `${getBasePath()}/api/getWeatherSummary`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ weatherData: aiAssistantWeatherData }),
      cache: "no-store",
    }
  );

  const resAiAssistantResponseJSON = await resAiAssistantResponse.json();
  let aiAssistantResponse = {} as AiAssistantResponse;
  if (resAiAssistantResponseJSON)
    aiAssistantResponse = JSON.parse(
      resAiAssistantResponseJSON
    ) as AiAssistantResponse;

  return aiAssistantResponse;
};
