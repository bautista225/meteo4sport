import { DayWeatherForecast } from "@/lib/weatherDataTypes";
import { Card } from "./Card";
import Image from "next/image";
import { getWeatherIconUrl } from "@/services/AemetService";
import {
  RiArrowDownLine,
  RiArrowUpLine,
  RiUmbrellaLine,
} from "@remixicon/react";

export default function WeatherCard({
  dayWeatherForecast,
}: {
  dayWeatherForecast: DayWeatherForecast;
}) {
  return (
    <Card className="p-4 size-full">
      <div className="flex flex-col justify-center items-center w-28 h-full">
        <p>
          {new Date(dayWeatherForecast.dateTime)
            .toLocaleString("es-ES", {
              weekday: "long",
            })
            .substring(0, 3) +
            ". " +
            new Date(dayWeatherForecast.dateTime).toLocaleString("es-ES", {
              day: "numeric",
            })}
        </p>
        <Image
          src={getWeatherIconUrl(dayWeatherForecast.weatherConditionCode || "")}
          alt={dayWeatherForecast.weatherConditionDescription || "NA"}
          width={30}
          height={30}
        />
        <div className="flex flex-col justify-between w-full h-full">
          <p className="font-light text-xs text-center">
            {dayWeatherForecast.weatherConditionDescription}
          </p>
          <div className="flex justify-between text-[0.7rem]">
            <p className="flex items-center font-extralight text-red-500">
              <RiArrowUpLine className="size-3" />{" "}
              {dayWeatherForecast.maxTemperature}ºC
            </p>
            <p className="flex items-center font-extralight text-blue-500">
              <RiArrowDownLine className="size-3" />{" "}
              {dayWeatherForecast.minTemperature}ºC
            </p>
            <p className="flex items-center font-extralight text-blue-900 dark:text-teal-600">
              <RiUmbrellaLine className="size-3" />{" "}
              {dayWeatherForecast.rainProbability}%
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
