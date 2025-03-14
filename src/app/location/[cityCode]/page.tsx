import CalloutCard from "@/components/CalloutCard";
import { Divider } from "@/components/Divider";
import HumidityChart from "@/components/HumidityChart";
import InformationPanel from "@/components/InformationPanel";
import RainChart from "@/components/RainChart";
import SnowChart from "@/components/SnowChart";
import StatCard from "@/components/StatCard";
import TempChart from "@/components/TempChart";
import { getWeatherForecast } from "@/services/AemetService";

type Props = {
  params: {
    cityCode: string;
  };
};

export default async function WeatherPage({ params: { cityCode } }: Props) {
  const weatherForecast = await getWeatherForecast(cityCode);
  if (!weatherForecast) return null;

  const { weatherHourlyData, weatherDailyData } = weatherForecast;

  return (
    <div className="flex flex-col min-h-screen md:flex-row text-gray-900 dark:text-gray-50">
      <InformationPanel weatherForecast={weatherForecast} />

      <div className="flex-1 p-5 lg:p-10">
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold">Todays Overview</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last Updated at:{" "}
              {new Date(weatherHourlyData.forecastCreated).toLocaleString()}{" "}
            </p>
          </div>

          <div className="mb-6">
            <CalloutCard
              title="Information about the prediction"
              message={`This is where Cohere summary will go! At the moment in ${weatherHourlyData.city} is ${weatherHourlyData.currentWeather.weatherConditionDescription} with ${weatherHourlyData.currentWeather.temperature}℃`}
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <StatCard
              title="Maximum Temperature"
              metric={`${weatherDailyData.currentWeather.maxTemperature}ºC`}
            />

            <StatCard
              title="Minimum Temperature"
              metric={`${weatherDailyData.currentWeather.minTemperature}ºC`}
            />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              <StatCard
                title="Max UV Index"
                metric={`${weatherDailyData.currentWeather.uvMax}`}
              />

              {(Number(weatherDailyData.currentWeather.uvMax) || 0) > 3 && (
                <CalloutCard
                  title="The UV is high today, be sure to wear SPF!"
                  warning
                />
              )}
            </div>

            <div className="flex gap-x-3">
              <StatCard
                title="Wind Speed"
                metric={`${weatherHourlyData.currentWeather.windSpeed} km/h`}
              />
              <StatCard
                title="Wind Direction"
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
