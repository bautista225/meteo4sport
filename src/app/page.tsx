import { Card } from "@/components/Card";
import CityPicker from "@/components/CityPicker";
import { Divider } from "@/components/Divider";

export default function Home() {
  return (
    <main className="min-h-screen p-10 flex flex-col justify-center items-center">
      <Card className="max-w-2xl">
        <h3 className="text-center text-5xl font-semibold text-gray-900 dark:text-gray-50">
          meteo4sport
        </h3>
        <p className="text-center mt-2 text-xs leading-6 text-gray-900 dark:text-gray-50">
          Never doubt again about what to wear for your next outdoor run.
        </p>
        <Divider />
        <Card>
          <CityPicker />
        </Card>
      </Card>
    </main>
  );
}
