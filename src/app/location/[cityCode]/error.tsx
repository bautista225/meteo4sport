"use client";

import { useEffect } from "react";
import ErrorModal from "@/components/ErrorModal";
import WeatherPageSkeleton from "@/components/WeatherPageSkeleton";

type Props = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error("Error loading weather data:", error);
  }, [error]);

  return (
    <>
      <WeatherPageSkeleton />
      <ErrorModal error={error} reset={reset} />
    </>
  );
}
