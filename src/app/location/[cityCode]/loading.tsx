import Text from "@/components/Text";
import Title from "@/components/Title";
import { SunIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-slate-500">
      <SunIcon
        className="h-24 w-24 animate-slideDownAndFade text-yellow-500"
        color="yellow"
      />
      <Title className="my-5">Loading weather information</Title>
      <Text>
        Hold on, we are crunching the numbers and generating an AI summary of
        the weather!
      </Text>
    </div>
  );
}
