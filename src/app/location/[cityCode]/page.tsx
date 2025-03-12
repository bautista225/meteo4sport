import CalloutCard from "@/components/CalloutCard";
import { getCityHourlyForecast } from "@/services/AemetService";

type Props = {
  params: {
    cityCode: string;
  };
};
export default async function WeatherPage({ params: { cityCode } }: Props) {
  const forecast = await getCityHourlyForecast(cityCode);

  if (!forecast) return null;

  return (
    <div className="text-gray-900 dark:text-gray-50">
      <div>
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold">Todays Overview</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last Updated at: {new Date(forecast.elaborado).toLocaleString()}
            </p>
          </div>

          <div>
            <CalloutCard
              title="Information about the prediction"
              message={`This is where Cohere summary will go! At the moment in ${forecast.nombre} is ${forecast.prediccion.dia[0].estadoCielo[0].descripcion} with ${forecast.prediccion.dia[0].temperatura[0].value}℃`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
