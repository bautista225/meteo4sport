import AiAssistantSummary, {
  AiAssistantSummarySkeleton,
} from "@/components/AiAssitantSummary";
import CalloutCard from "@/components/CalloutCard";
import { Card } from "@/components/Card";
import { Divider } from "@/components/Divider";
import HumidityChart from "@/components/HumidityChart";
import InformationPanel from "@/components/InformationPanel";
import RainChart from "@/components/RainChart";
import SnowChart from "@/components/SnowChart";
import StatCard from "@/components/StatCard";
import TempChart from "@/components/TempChart";
import WeatherCard from "@/components/WeatherCard";
import WindChart from "@/components/WindChart";
import { getCurrentWeatherIndex } from "@/lib/cleanHourlyWeatherData";
import { getWeatherForecast, getWeatherIconUrl } from "@/services/AemetService";
import {
  RiArrowDownLine,
  RiArrowUpLine,
  RiUmbrellaLine,
} from "@remixicon/react";
import {
  ArrowDown,
  ArrowDownLeft,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpLeft,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

type Props = {
  params: {
    cityCode: string;
  };
};

const windDirectionIcons = {
  N: <ArrowDown />,
  S: <ArrowUp />,
  E: <ArrowLeft />,
  O: <ArrowRight />,
  NE: <ArrowDownLeft />,
  NO: <ArrowDownRight />,
  SE: <ArrowUpLeft />,
  SO: <ArrowUpRight />,
};

export default async function WeatherPage({ params: { cityCode } }: Props) {
  const weatherForecast = await getWeatherForecast(cityCode);

  if (!weatherForecast) return null;

  const { weatherHourlyData, weatherDailyData } = weatherForecast;

  return (
    <div className="flex flex-col min-h-screen md:flex-row text-gray-900 dark:text-gray-50 mt-[50px] w-full">
      <InformationPanel weatherForecast={weatherForecast} cityCode={cityCode} />

      <div className="flex-1 lg:pt-10 lg:p-3 2xl:p-10">
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold mb-3">Predicción a 7 días</h2>
            <div className="hidden md:flex flex-row mx-auto gap-3 flex-wrap">
              {weatherDailyData.forecasts.map((forecast) => {
                return (
                  <div key={forecast.dateTime}>
                    <WeatherCard dayWeatherForecast={forecast} />
                  </div>
                );
              })}
            </div>
            <div className="md:hidden">
              <Card className="flex flex-col gap-y-2">
                {weatherDailyData.forecasts.map((forecast) => {
                  return (
                    <div
                      key={forecast.dateTime}
                      className="grid grid-flow-col grid-cols-6 size-full text-[0.77rem]"
                    >
                      <p className="col-span-2">
                        {new Date(forecast.dateTime).toLocaleString("es-ES", {
                          weekday: "long",
                        }) +
                          " " +
                          new Date(forecast.dateTime).toLocaleString("es-ES", {
                            day: "numeric",
                          })}
                      </p>
                      <Image
                        className="col-span-1"
                        src={getWeatherIconUrl(
                          forecast.weatherConditionCode || ""
                        )}
                        alt={forecast.weatherConditionDescription || "NA"}
                        width={22}
                        height={22}
                      />
                      <p className="flex items-center font-extralight text-red-500 col-span-1">
                        <RiArrowUpLine className="size-3" />{" "}
                        {forecast.maxTemperature}ºC
                      </p>
                      <p className="flex items-center font-extralight text-blue-500 col-span-1">
                        <RiArrowDownLine className="size-3" />{" "}
                        {forecast.minTemperature}ºC
                      </p>
                      <p className="flex items-center font-extralight text-blue-900 dark:text-teal-600 col-span-1">
                        <RiUmbrellaLine className="size-3" />{" "}
                        {forecast.rainProbability}%
                      </p>
                    </div>
                  );
                })}
              </Card>
            </div>
          </div>

          <div className="pb-5">
            <h2 className="text-xl font-bold">Resumen de hoy</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Última actualización de la AEMET:{" "}
              {new Date(weatherHourlyData.forecastCreated).toLocaleString()}{" "}
            </p>
          </div>

          <Suspense fallback={<AiAssistantSummarySkeleton className="mb-6" />}>
            <AiAssistantSummary
              className="mb-6"
              weatherForecast={weatherForecast}
            />
          </Suspense>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              <StatCard
                title="Índice UV máximo"
                metric={`${weatherDailyData.currentWeather.uvMax}`}
              />

              {((Number(weatherDailyData.currentWeather.uvMax) || 0) > 3 && (
                <CalloutCard
                  title="¿Me pongo crema solar?"
                  message={
                    (Number(weatherDailyData.currentWeather.uvMax) || 0) > 5
                      ? "Hoy el índice UV está muy alto, ¡asegúrate de usar crema solar de +50 FPS!"
                      : "Con este índice UV es recomendable utilizar crema solar de +25 FPS en horas altas."
                  }
                  variant={
                    (Number(weatherDailyData.currentWeather.uvMax) || 0) > 5
                      ? "error"
                      : "warning"
                  }
                />
              )) || (
                <CalloutCard
                  title="¿Me pongo crema solar?"
                  message={
                    "El índice UV es bajo en horas altas. No obstante, utilizar protector solar todos los días contribuye a retrasar el envejecimiento de la piel."
                  }
                  variant={"default"}
                />
              )}
            </div>

            <div className="flex gap-x-3">
              <StatCard
                title="Velocidad del viento"
                metric={`${weatherHourlyData.currentWeather.windSpeed} km/h`}
              />
              <StatCard
                title="Dirección del viento"
                metric={`${weatherHourlyData.currentWeather.windDirection}`}
                icon={
                  weatherHourlyData.currentWeather.windDirection
                    ? windDirectionIcons[
                        weatherHourlyData.currentWeather
                          .windDirection as keyof typeof windDirectionIcons
                      ]
                    : ""
                }
              />
            </div>
          </div>

          <Divider />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <TempChart
              forecasts={weatherHourlyData.forecasts.slice(
                getCurrentWeatherIndex(
                  weatherHourlyData.forecasts,
                  weatherHourlyData.currentWeather.dateTime
                )
              )}
            />
            <RainChart
              forecasts={weatherHourlyData.forecasts.slice(
                getCurrentWeatherIndex(
                  weatherHourlyData.forecasts,
                  weatherHourlyData.currentWeather.dateTime
                )
              )}
            />
            <HumidityChart
              forecasts={weatherHourlyData.forecasts.slice(
                getCurrentWeatherIndex(
                  weatherHourlyData.forecasts,
                  weatherHourlyData.currentWeather.dateTime
                )
              )}
            />
            <WindChart
              forecasts={weatherHourlyData.forecasts.slice(
                getCurrentWeatherIndex(
                  weatherHourlyData.forecasts,
                  weatherHourlyData.currentWeather.dateTime
                )
              )}
            />
            <SnowChart
              forecasts={weatherHourlyData.forecasts.slice(
                getCurrentWeatherIndex(
                  weatherHourlyData.forecasts,
                  weatherHourlyData.currentWeather.dateTime
                )
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
