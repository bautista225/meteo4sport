import { transformAemetToWeatherDailyData } from "@/lib/cleanDailyWeatherData";
import { transformAemetToWeatherHourlyData } from "@/lib/cleanHourlyWeatherData";
import {
  getCityDailyForecast,
  getCityHourlyForecast,
} from "@/services/AemetService";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { cityCode } = await request.json();

  const hourlyForecast = await getCityHourlyForecast(cityCode);
  const dailyForecast = await getCityDailyForecast(cityCode);

  if (!hourlyForecast || !dailyForecast) return NextResponse.json(null);

  const weatherHourlyData = transformAemetToWeatherHourlyData(hourlyForecast);
  const weatherDailyData = transformAemetToWeatherDailyData(dailyForecast);

  return NextResponse.json({ weatherHourlyData, weatherDailyData });
}
