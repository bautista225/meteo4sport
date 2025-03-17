import { Card } from "@/components/Card";
import CityPicker from "@/components/CityPicker";
import { Divider } from "@/components/Divider";

export default function Home() {
  return (
    <main className="min-h-screen p-10 flex flex-col justify-center items-center">
      <Card className="max-w-2xl">
        <h3 className="text-center text-2xl font-semibold text-gray-900 dark:text-gray-50">
          Check the weather and prepare your next outdoor run!
        </h3>
        <Divider />
        <CityPicker />
      </Card>
    </main>
  );
}
