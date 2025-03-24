import { AiAssistantResponse } from "@/lib/aiAssistantData";
import { WeatherForecast } from "@/lib/weatherDataTypes";
import Groq from "groq-sdk";

if (!process.env.GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is not defined in environment variables");
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const preamble = `
Pretend you are an assitant, energetic and full of charisma.
Given a weather forecast for the following hours, 
state the city you are providing a summary for and give a summary of todays weather.
Make it easy for the reader to understand and know what to wear if the user goes out for a run right now in the current weather.
Provide a funny joke regarding the weather.
Your language for the response is indicated in the following brackets [Español].
The response MUST be always a valid JSON with the following structure:
{
  intro: 'Your introduction and state the city',
  summary: 'The summary about the weather',
  wearForRunning: 'What to wear if the user goes out for a run in this weather',
  weatherJoke: 'A funny joke regarding the weather'
}
`;

export async function getWeatherSummary(
  weatherData: WeatherForecast
): Promise<AiAssistantResponse> {
  try {
    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
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

    const responseContent = chatCompletion.choices[0]?.message?.content;

    if (responseContent == null)
      return {
        intro:
          "El servicio de Groq AI no está disponible en estos momentos. Prueba en unos instantes.",
        summary: "",
        wearForRunning: "",
        weatherJoke: "",
      };

    const cleanResponse = responseContent.replace(/^```json|```$/g, "").trim();

    return JSON.parse(cleanResponse) as AiAssistantResponse;
  } catch (error) {
    console.error("Error in getWeatherSummary:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);

      if (error.message.includes("invalid api token")) {
        console.error("GROQ_API_KEY is invalid or not properly set");
      }
    }
    return {
      intro:
        "El servicio de Groq AI no está disponible en estos momentos. Prueba en unos instantes.",
      summary: "",
      wearForRunning: "",
      weatherJoke: "",
    };
  }
}
