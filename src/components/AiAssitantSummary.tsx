"use client";

import CalloutCard from "./CalloutCard";
import { WeatherForecast } from "@/lib/weatherDataTypes";
import { useEffect, useState } from "react";
import { AiAssistantResponse } from "@/lib/aiAssistantData";
import { fetchWeatherSummary } from "@/app/actions";

function SkeletonPlaceholder() {
  return (
    <div className="flex flex-col w-full">
      <div className="space-y-2">
        <div className="h-4 bg-blue-500/30 dark:bg-blue-900/50 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-blue-500/30 dark:bg-blue-900/50 rounded w-5/6 animate-pulse"></div>
        <div className="h-4 bg-blue-500/30 dark:bg-blue-900/50 rounded w-4/6 animate-pulse"></div>
      </div>
    </div>
  );
}

export function AiAssistantSummarySkeleton({
  className,
}: {
  className: string;
}) {
  return (
    <div className={`grid grid-cols-1 xl:grid-cols-2 gap-5 ${className}`}>
      <div className="xl:col-span-2">
        <CalloutCard
          title="Información sobre la predicción"
          message={<SkeletonPlaceholder />}
        />
      </div>
      <CalloutCard
        title="¿Qué pasa si salgo a correr ahora?"
        message={<SkeletonPlaceholder />}
      />
      <CalloutCard
        title="Chiste sobre el clima"
        message={<SkeletonPlaceholder />}
      />
    </div>
  );
}

export default function AiAssistantSummary({
  weatherForecast,
  className,
}: {
  weatherForecast: WeatherForecast;
  className: string;
}) {
  const [aiAssistantResponse, setAiAssistantResponse] =
    useState<AiAssistantResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const response = await fetchWeatherSummary(weatherForecast);
        setAiAssistantResponse(response);
      } catch (error) {
        console.error("Error fetching weather summary:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSummary();
  }, [weatherForecast]);

  if (isLoading || !aiAssistantResponse) {
    return <AiAssistantSummarySkeleton className={className} />;
  }

  return (
    <div className={`grid grid-cols-1 xl:grid-cols-2 gap-5 ${className}`}>
      <div className="xl:col-span-2">
        <CalloutCard
          title="Información sobre la predicción"
          message={aiAssistantResponse.summary}
        />
      </div>
      <CalloutCard
        title="¿Qué pasa si salgo a correr ahora?"
        message={aiAssistantResponse.wearForRunning}
      />
      <CalloutCard
        title="Chiste sobre el clima"
        message={aiAssistantResponse.weatherJoke}
      />
    </div>
  );
}
