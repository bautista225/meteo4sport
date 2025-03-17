import CalloutCard from "@/components/CalloutCard";
import { Divider } from "@/components/Divider";
import HumidityChart from "@/components/HumidityChart";
import InformationPanel from "@/components/InformationPanel";
import RainChart from "@/components/RainChart";
import SnowChart from "@/components/SnowChart";
import StatCard from "@/components/StatCard";
import TempChart from "@/components/TempChart";
import { getWeatherForecast } from "@/services/AemetService";
import { getWeatherSummary } from "@/services/CohereService";

type Props = {
  params: {
    cityCode: string;
  };
};

export default async function WeatherPage({ params: { cityCode } }: Props) {
  const weatherForecast = await getWeatherForecast(cityCode);

  if (!weatherForecast) return null;

  const { weatherHourlyData, weatherDailyData } = weatherForecast;

  const aiAssistantResponse = await getWeatherSummary(weatherForecast);

  return (
    <div className="flex flex-col min-h-screen md:flex-row text-gray-900 dark:text-gray-50 mt-[50px]">
      <InformationPanel weatherForecast={weatherForecast} />

      <div className="flex-1 lg:p-10">
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold">Resumen de hoy</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Última actualización de la AEMET:{" "}
              {new Date(weatherHourlyData.forecastCreated).toLocaleString()}{" "}
            </p>
          </div>

          <div className="mb-6">
            <CalloutCard
              title="Información sobre la predicción"
              message={aiAssistantResponse.summary}
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <CalloutCard
              title="¿Qué pasa si salgo a correr ahora?"
              message={aiAssistantResponse.wearForRunning}
            />
            <CalloutCard
              title="Chiste sobre el clima"
              message={aiAssistantResponse.weatherJoke}
            />
            <StatCard
              title="Temperatura máxima"
              metric={`${weatherDailyData.currentWeather.maxTemperature}ºC`}
            />

            <StatCard
              title="Temperatura mínima"
              metric={`${weatherDailyData.currentWeather.minTemperature}ºC`}
            />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              <StatCard
                title="Índice UV máximo"
                metric={`${weatherDailyData.currentWeather.uvMax}`}
              />

              {(Number(weatherDailyData.currentWeather.uvMax) || 0) > 3 && (
                <CalloutCard
                  title="Aviso"
                  message={
                    (Number(weatherDailyData.currentWeather.uvMax) || 0) > 5
                      ? "Hoy el índice UV está muy alto, ¡asegúrate de usar crema solar de +50 FPS!"
                      : "Con este índice UV es recomendable utilizar crema solar de +25 FPS en horas altas"
                  }
                  variant={
                    (Number(weatherDailyData.currentWeather.uvMax) || 0) > 5
                      ? "error"
                      : "warning"
                  }
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
              />
            </div>
          </div>

          <Divider />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <TempChart forecasts={weatherHourlyData.forecasts} />
            <RainChart forecasts={weatherHourlyData.forecasts} />
            <HumidityChart forecasts={weatherHourlyData.forecasts} />
            <SnowChart forecasts={weatherHourlyData.forecasts} />
          </div>
        </div>
      </div>
    </div>
  );
}
