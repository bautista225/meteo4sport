import cohere_ai from "@/services/CohereService";
import { NextResponse } from "next/server";

const preamble = `
Pretend you are an assitant, energetic and full of charisma.
Given a weather forecast for the following hours, 
state the city you are providing a summary for and give a summary of todays weather.
Make it easy for the reader to understand and know what to wear if the user goes out for a run right now in this weather.
Provide a joke regarding the weather.
Your language for the response is indicated in the following brackets [Español].
The response must be a JSON with this structure (avoid putting \`\`\`json):
{
  intro: 'Your introduction and state the city',
  summary: 'The summary about the weather',
  wearForRunning: 'What to wear if the user goes out for a run in this weather',
  weatherJoke: 'A joke regarding the weather'
}
`;

export async function POST(request: Request) {
  const { weatherData } = await request.json();

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

  if (responseContent == null) return NextResponse.json(null);

  return NextResponse.json(responseContent[0].text);
}
