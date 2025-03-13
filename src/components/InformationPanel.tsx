import { PrediccionMunicipioProbabilidadPorHoras } from "@/types/AEMET/CityHourlyForecast";
import Title from "./Title";
import CityPicker from "./CityPicker";
import { Divider } from "./Divider";
import { getWeatherIconUrl } from "@/services/AemetService";
import Image from "next/image";
import { SunriseIcon, SunsetIcon } from "lucide-react";
import { PrediccionMunicipioProbabilidadPorDias } from "@/types/AEMET/CityDailyForecast";

type Props = {
  hourlyForecast: PrediccionMunicipioProbabilidadPorHoras;
  dailyForecast: PrediccionMunicipioProbabilidadPorDias;
};

export default function InformationPanel({
  hourlyForecast,
  dailyForecast,
}: Props) {
  const currentDayForecast = hourlyForecast.prediccion.dia[0];

  const currentHour = new Date().toLocaleString("en-GB", {
    hour: "numeric",
    hour12: false,
  });

  const currentHourForecast = {
    temperature: currentDayForecast.temperatura.filter(
      ({ periodo }) => Number(periodo) === Number(currentHour)
    ),
    maxTemperature: dailyForecast.prediccion.dia[0].temperatura.maxima,
    minTemperature: dailyForecast.prediccion.dia[0].temperatura.minima,
    weather: currentDayForecast.estadoCielo.filter(
      ({ periodo }) => Number(periodo) === Number(currentHour)
    ),
  };

  return (
    <div className="border-b-[1px] md:border-b-0 md:border-r-[1px] border-gray-200 dark:border-gray-800 p-10">
      <div className="pb-5">
        <Title className="text-4xl">{hourlyForecast.nombre}</Title>
      </div>

      <CityPicker />

      <Divider className="my-10" />

      <div className="mt-5 flex items-center justify-between gap-x-10 mb-5">
        <div>
          <p className="text-xl">
            {new Date().toLocaleDateString("en-GB", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <p className="font-extralight">
            Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </p>
        </div>
        <p className="text-xl font-bold uppercase">
          {new Date().toLocaleTimeString("en-GB", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          })}
        </p>
      </div>

      <Divider className="mt-10" />

      <div className="flex items-center justify-between">
        <div>
          <Image
            src={getWeatherIconUrl(currentHourForecast.weather[0].value)}
            alt={
              currentHourForecast.weather.length
                ? currentHourForecast.weather[0].descripcion
                : "NA"
            }
            width={75}
            height={75}
          />
          <div className="flex items-center justify-between gap-x-10">
            <p className="text-6xl font-semibold">
              {currentHourForecast.temperature[0].value}ºC
            </p>
            <p className="text-right font-extralight text-lg">
              {currentHourForecast.weather[0].descripcion}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-2 pt-5">
        <div className="relative rounded-md border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <span
            className="absolute inset-x-0 top-1/2 h-10 w-1 -translate-y-1/2 rounded-r-md bg-blue-500 dark:bg-blue-500"
            aria-hidden="true"
          />
          <div className="flex items-center gap-x-2 px-3 py-2">
            <p className="flex items-center justify-between gap-2">
              <SunriseIcon color="yellow" />
            </p>
            <p>Sunrise</p>
            <div className="ml-auto">{currentDayForecast.orto}</div>
          </div>
        </div>

        <div className="relative rounded-md border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <span
            className="absolute inset-x-0 top-1/2 h-10 w-1 -translate-y-1/2 rounded-r-md bg-blue-500 dark:bg-blue-500"
            aria-hidden="true"
          />
          <div className="flex items-center gap-x-2 px-3 py-2">
            <p className="flex items-center justify-between gap-2">
              <SunsetIcon color="orange" />
            </p>
            <p>Sunset</p>
            <div className="ml-auto">{currentDayForecast.ocaso}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
