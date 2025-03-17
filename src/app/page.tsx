import { Card } from "@/components/Card";
import CityPicker from "@/components/CityPicker";
import { Divider } from "@/components/Divider";
import DataObtainedFrom from "@/components/DataObtainedFrom";

export default function Home() {
  return (
    <main className="p-10 flex flex-col justify-center items-center">
      <Card className="max-w-2xl">
        <h3 className="text-center text-2xl font-semibold text-gray-900 dark:text-gray-50">
          ¡Consulta el tiempo y prepara tu próxima carrera al aire libre con la
          IA integrada!
        </h3>

        <DataObtainedFrom />

        <Divider />
        <CityPicker />
      </Card>
    </main>
  );
}
