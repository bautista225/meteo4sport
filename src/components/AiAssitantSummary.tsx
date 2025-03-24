import { getWeatherSummary } from "@/services/CohereService";
import CalloutCard from "./CalloutCard";
import { WeatherForecast } from "@/lib/weatherDataTypes";

function SkeletonPlaceholder() {
  return (
    <div>
      <div className="h-4 bg-blue-500/30 dark:bg-blue-900/50 rounded w-3/4 mb-2 animate-pulse"></div>
      <div className="space-y-2">
        <div className="h-4 bg-blue-500/30 dark:bg-blue-900/50 rounded animate-pulse"></div>
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

export default async function AiAssistantSummary({
  weatherForecast,
  className,
}: {
  weatherForecast: WeatherForecast;
  className: string;
}) {
  const aiAssistantResponse = await getWeatherSummary(weatherForecast);
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
