import CalloutCard from "@/components/CalloutCard";
import { Divider } from "@/components/Divider";
import HumidityChart from "@/components/HumidityChart";
import InformationPanel from "@/components/InformationPanel";
import RainChart from "@/components/RainChart";
import StatCard from "@/components/StatCard";
import TempChart from "@/components/TempChart";
import {
  getCityDailyForecast,
  getCityHourlyForecast,
} from "@/services/AemetService";

type Props = {
  params: {
    cityCode: string;
  };
};
export default async function WeatherPage({ params: { cityCode } }: Props) {
  const hourlyForecast = await getCityHourlyForecast(cityCode);
  const dailyForecast = await getCityDailyForecast(cityCode);

  if (!hourlyForecast || !dailyForecast) return null;

  const currentHour = new Date().toLocaleString("en-GB", {
    hour: "numeric",
    hour12: false,
  });

  const currentHourForecast = {
    temperature: hourlyForecast.prediccion.dia[0].temperatura.filter(
      ({ periodo }) => Number(periodo) === Number(currentHour)
    ),
    maxTemperature: dailyForecast.prediccion.dia[0].temperatura.maxima,
    minTemperature: dailyForecast.prediccion.dia[0].temperatura.minima,
    weather: hourlyForecast.prediccion.dia[0].estadoCielo.filter(
      ({ periodo }) => Number(periodo) === Number(currentHour)
    ),
    wind: hourlyForecast.prediccion.dia[0].vientoAndRachaMax.filter(
      ({ periodo }) => Number(periodo) === Number(currentHour)
    ),
  };

  return (
    <div className="flex flex-col min-h-screen md:flex-row text-gray-900 dark:text-gray-50">
      <InformationPanel
        hourlyForecast={hourlyForecast}
        dailyForecast={dailyForecast}
      />

      <div className="flex-1 p-5 lg:p-10">
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold">Todays Overview</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last Updated at:{" "}
              {new Date(hourlyForecast.elaborado).toLocaleString()}
            </p>
          </div>

          <div className="mb-6">
            <CalloutCard
              title="Information about the prediction"
              message={`This is where Cohere summary will go! At the moment in ${hourlyForecast.nombre} is ${hourlyForecast.prediccion.dia[0].estadoCielo[0].descripcion} with ${hourlyForecast.prediccion.dia[0].temperatura[0].value}℃`}
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <StatCard
              title="Maximum Temperature"
              metric={`${dailyForecast.prediccion.dia[0].temperatura.maxima}ºC`}
            />

            <StatCard
              title="Minimum Temperature"
              metric={`${dailyForecast.prediccion.dia[0].temperatura.minima}ºC`}
            />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              <StatCard
                title="Max UV Index"
                metric={`${dailyForecast.prediccion.dia[0].uvMax}`}
              />

              {(dailyForecast.prediccion.dia[0].uvMax || 0) > 3 && (
                <CalloutCard
                  title="The UV is high today, be sure to wear SPF!"
                  warning
                />
              )}
            </div>

            <div className="flex gap-x-3">
              <StatCard
                title="Wind Speed"
                metric={`${currentHourForecast.wind[0].velocidad} km/h`}
              />
              <StatCard
                title="Wind Direction"
                metric={`${currentHourForecast.wind[0].direccion}`}
              />
            </div>
          </div>

          <Divider />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <TempChart forecast={hourlyForecast} />
            <RainChart forecast={hourlyForecast} />
            <HumidityChart forecast={hourlyForecast} />
          </div>
        </div>
      </div>
    </div>
  );
}
