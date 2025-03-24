import { Card } from "./Card";
import { AiAssistantSummarySkeleton } from "./AiAssitantSummary";
import { Divider } from "./Divider";
import Title from "./Title";
import CityPicker from "./CityPicker";
import { SunriseIcon, SunsetIcon } from "lucide-react";
import DataObtainedFrom from "./DataObtainedFrom";

export function StatCardSkeleton() {
  return (
    <Card>
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mb-2 animate-pulse"></div>
      <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3 animate-pulse"></div>
    </Card>
  );
}

export function WeatherDayCardSkeleton() {
  return (
    <Card className="p-4 size-full">
      <div className="flex flex-col justify-center items-center w-28 h-full">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-20 mb-2 animate-pulse"></div>
        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-800 rounded mb-2 animate-pulse"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-24 mb-2 animate-pulse"></div>
        <div className="flex justify-between w-full text-[0.7rem]">
          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-12 animate-pulse"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-12 animate-pulse"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-12 animate-pulse"></div>
        </div>
      </div>
    </Card>
  );
}

export function WeatherSevenDaysCardSkeleton() {
  return (
    <Card className="flex flex-col gap-y-2">
      {[...Array(7)].map((_, i) => {
        return (
          <div
            key={i}
            className="grid grid-flow-col grid-cols-6 size-full text-[0.77rem]"
          >
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-20 col-span-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-4 col-span-1 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-8 col-span-1 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-8 col-span-1 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-8 col-span-1 animate-pulse"></div>
          </div>
        );
      })}
    </Card>
  );
}

export function ChartSkeleton() {
  return (
    <Card className="py-6 px-1 md:px-6">
      <div className="flex gap-x-2 mx-6 md:mx-0">
        <div className="h-4 w-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-20 animate-pulse"></div>
      </div>
      <div className="h-[200px] bg-gray-200 dark:bg-gray-800 rounded mt-6 animate-pulse"></div>
    </Card>
  );
}

export function InformationPanelSkeleton() {
  return (
    <div className="border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 p-5 pt-12 lg:p-8 2xl:p-10 lg:pt-14 2xl:pt-14 md:max-w-md 2xl:max-w-lg">
      <div className="pb-5">
        <Title className="md:text-4xl 2xl:text-5xl text-2xl">
          {"Cargando ciudad..."}
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

      <div className="flex items-center justify-between gap-x-10 mb-4">
        <div className="h-16 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-32 animate-pulse"></div>
      </div>

      <div className="flex items-center justify-between gap-x-10">
        <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded w-24 mb-4 animate-pulse"></div>
        <div className="flex gap-x-2 items-center">
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-16 animate-pulse"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-16 animate-pulse"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-16 animate-pulse"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-16 animate-pulse"></div>
        </div>
      </div>

      <div className="flex flex-col gap-y-2 pt-5">
        <div className="relative rounded-md border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-x-2 px-3 py-2">
            <p className="flex items-center justify-between gap-2">
              <SunriseIcon className="text-yellow-500 dark:text-yellow-400" />
            </p>
            <p>Amanecer</p>
            <div className="ml-auto h-4 bg-gray-200 dark:bg-gray-800 rounded w-16 animate-pulse"></div>
          </div>
        </div>

        <div className="relative rounded-md border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-x-2 px-3 py-2">
            <p className="flex items-center justify-between gap-x-3">
              <SunsetIcon color="orange" />
            </p>
            <p>Ocaso</p>
            <div className="ml-auto h-4 bg-gray-200 dark:bg-gray-800 rounded w-16 animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <DataObtainedFrom />
      </div>
    </div>
  );
}

export default function WeatherPageSkeleton() {
  return (
    <div className="flex flex-col min-h-screen md:flex-row text-gray-900 dark:text-gray-50 mt-[50px] w-full">
      <InformationPanelSkeleton />

      <div className="flex-1 lg:pt-10 lg:p-3 2xl:p-10">
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold mb-3">Predicción a 7 días</h2>
            <div className="hidden md:flex flex-row mx-auto gap-3 flex-wrap">
              {[...Array(7)].map((_, i) => (
                <div key={i}>
                  <WeatherDayCardSkeleton />
                </div>
              ))}
            </div>
            <div className="md:hidden">
              <WeatherSevenDaysCardSkeleton />
            </div>
          </div>

          <div className="pb-5">
            <h2 className="text-xl font-bold">Resumen de hoy</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Última actualización de la AEMET:{" "}
              <span className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-24 animate-pulse"></span>
            </p>
          </div>

          <AiAssistantSummarySkeleton className="mb-6" />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              <StatCardSkeleton />
              <StatCardSkeleton />
            </div>

            <div className="flex gap-x-3">
              <StatCardSkeleton />
              <StatCardSkeleton />
            </div>
          </div>

          <Divider />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <ChartSkeleton />
            <ChartSkeleton />
            <ChartSkeleton />
            <ChartSkeleton />
            <ChartSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
