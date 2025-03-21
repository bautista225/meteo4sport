import Title from "./Title";
import CityPicker from "./CityPicker";
import { Divider } from "./Divider";
import { getWeatherIconUrl } from "@/services/AemetService";
import Image from "next/image";
import { SunriseIcon, SunsetIcon } from "lucide-react";
import { WeatherForecast } from "@/lib/weatherDataTypes";
import DataObtainedFrom from "./DataObtainedFrom";
import Metric from "./Metric";
import { getCityName } from "@/app/data/cityCodes";
import {
  RiArrowDownLine,
  RiArrowUpLine,
  RiContrastDrop2Line,
  RiUmbrellaLine,
} from "@remixicon/react";

type Props = {
  weatherForecast: WeatherForecast;
  cityCode: string;
};

export default function InformationPanel({ weatherForecast, cityCode }: Props) {
  const { weatherDailyData, weatherHourlyData } = weatherForecast;

  return (
    <div className="border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 p-5 pt-12 lg:p-8 2xl:p-10 lg:pt-14 2xl:pt-14 md:max-w-md 2xl:max-w-lg">
      <div className="pb-5">
        <Title className="md:text-4xl 2xl:text-5xl text-2xl">
          {getCityName(cityCode)?.NOMBRE}
        </Title>
      </div>

      <CityPicker />

      <Divider className="my-10" />

      <div className="mt-5 flex items-center justify-between gap-x-10 mb-5">
        <div>
          <p className="text-xl">
            {new Date().toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <p className="font-extralight">
            Zona horaria: {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </p>
        </div>
        <p className="text-xl font-bold uppercase">
          {new Date().toLocaleTimeString("es-ES", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          })}
        </p>
      </div>

      <Divider className="mt-10" />

      <p className="font-semibold">Ahora</p>

      <div className="flex items-center justify-between gap-x-10">
        <Image
          src={getWeatherIconUrl(
            weatherHourlyData.currentWeather.weatherConditionCode || ""
          )}
          alt={
            weatherHourlyData.currentWeather.weatherConditionDescription || "NA"
          }
          width={75}
          height={75}
        />
        <p className="text-right font-extralight text-lg">
          {weatherHourlyData.currentWeather.weatherConditionDescription}
        </p>
      </div>
      <div className="flex items-center justify-between gap-x-10">
        <Metric>{weatherHourlyData.currentWeather.temperature}ºC</Metric>
        <div className="flex gap-x-2 items-center">
          <p className="flex items-center font-extralight text-red-500">
            <RiArrowUpLine size={20} />{" "}
            {weatherDailyData.currentWeather.maxTemperature}
            ºC
          </p>
          <p className="flex items-center font-extralight text-blue-500">
            <RiArrowDownLine size={20} />{" "}
            {weatherDailyData.currentWeather.minTemperature}ºC
          </p>
          <p className="flex items-center font-extralight text-blue-900">
            <RiUmbrellaLine size={20} />{" "}
            {weatherHourlyData.currentWeather.rainProbability}%
          </p>
          <p className="flex items-center font-extralight text-sky-600">
            <RiContrastDrop2Line size={20} />{" "}
            {weatherHourlyData.currentWeather.rain}mm
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-y-2 pt-5">
        <div className="relative rounded-md border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          {/* <span
            className="absolute inset-x-0 top-1/2 h-10 w-1 -translate-y-1/2 rounded-r-md bg-blue-500 dark:bg-blue-500"
            aria-hidden="true"
          /> */}
          <div className="flex items-center gap-x-2 px-3 py-2">
            <p className="flex items-center justify-between gap-2">
              <SunriseIcon className="text-yellow-500 dark:text-yellow-400" />
            </p>
            <p>Amanecer</p>
            <div className="ml-auto">
              {weatherHourlyData.currentWeather.sunrise}
            </div>
          </div>
        </div>

        <div className="relative rounded-md border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          {/* <span
            className="absolute inset-x-0 top-1/2 h-10 w-1 -translate-y-1/2 rounded-r-md bg-blue-500 dark:bg-blue-500"
            aria-hidden="true"
          /> */}
          <div className="flex items-center gap-x-2 px-3 py-2">
            <p className="flex items-center justify-between gap-x-3">
              <SunsetIcon color="orange" />
            </p>
            <p>Ocaso</p>
            <div className="ml-auto">
              {weatherHourlyData.currentWeather.sunset}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <DataObtainedFrom />
      </div>
    </div>
  );
}
