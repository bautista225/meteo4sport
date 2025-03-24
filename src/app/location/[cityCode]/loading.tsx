import Text from "@/components/Text";
import Title from "@/components/Title";
import { SunIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-slate-500 px-10 text-pretty animate-pulse">
      <SunIcon className="h-24 w-24 text-yellow-500 " />
      <Title className="my-5">Cargando información meteorológica...</Title>
      <Text>
        Analizando los números y generando un resumen personalizado con IA del
        clima
      </Text>
    </div>
  );
}
