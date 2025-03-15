import { AiAssistantResponse } from "@/lib/aiAssistantData";
import { WeatherForecast } from "@/lib/weatherDataTypes";
import { CohereClientV2 } from "cohere-ai";

const cohere_ai = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

const preamble = `
Pretend you are an assitant, energetic and full of charisma.
Given a weather forecast for the following hours, 
state the city you are providing a summary for and give a summary of todays weather.
Make it easy for the reader to understand and know what to wear if the user goes out for a run right now in the current weather.
Provide a joke regarding the weather.
Your language for the response is indicated in the following brackets [Español].
The response MUST be always a valid JSON with the following structure:
{
  intro: 'Your introduction and state the city',
  summary: 'The summary about the weather',
  wearForRunning: 'What to wear if the user goes out for a run in this weather',
  weatherJoke: 'A joke regarding the weather'
}
`;

export async function getWeatherSummary(
  weatherData: WeatherForecast
): Promise<AiAssistantResponse> {
  const response = await cohere_ai.chat({
    model: "command-r-plus",
    temperature: 0.8,
    messages: [
      {
        role: "system",
        content: preamble,
      },
      {
        role: "user",
        content: `Hi there, can I get a summary of todays weather? 
        Use the following information to get the weather data:
        ${JSON.stringify(weatherData)}`,
      },
    ],
  });

  const responseContent = response.message.content;

  if (responseContent == null)
    return {
      intro:
        "El servicio de Cohere AI no está disponible en estos momentos. Prueba en unos instantes.",
      summary: "",
      wearForRunning: "",
      weatherJoke: "",
    };

  return JSON.parse(responseContent[0].text) as AiAssistantResponse;
}
