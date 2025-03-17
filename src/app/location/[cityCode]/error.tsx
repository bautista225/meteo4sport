"use client";

import Text from "@/components/Text";
import Title from "@/components/Title";
import { MessageSquareWarningIcon } from "lucide-react";

export default function Error() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-slate-500 mx-10 text-pretty">
      <MessageSquareWarningIcon
        className="h-24 w-24 animate-bounce text-orange-500"
        color="orange"
      />
      <Title className="my-5">
        La carga de la información meteorológica ha fallado
      </Title>
      <Text>
        El servicio de la AEMET está recibiendo demasiadas solicitudes, prueba
        en unos segundos.
      </Text>
    </div>
  );
}
