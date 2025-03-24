import { Button } from "./Button";
import { Card } from "./Card";
import { MessageSquareWarningIcon } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  error: Error;
  reset: () => void;
};

export default function ErrorModal({ error, reset }: Props) {
  const [countdown, setCountdown] = useState(30);
  const [isCounting, setIsCounting] = useState(true);

  useEffect(() => {
    if (countdown > 0 && isCounting) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setIsCounting(false);
      reset();
    }
  }, [countdown, isCounting, reset]);

  const getErrorMessage = () => {
    if (error.message.includes("429") || error.message.includes("500")) {
      return "El servicio de la AEMET está recibiendo demasiadas solicitudes. Por favor, espera unos segundos y vuelve a intentarlo.";
    }
    if (error.message.includes("404")) {
      return "No se encontró la información meteorológica para esta ciudad.";
    }
    return "Ha ocurrido un error al cargar la información meteorológica. Por favor, intenta de nuevo en unos instantes.";
  };

  return (
    <div className="fixed inset-0 top-[75px] bg-black/50 flex items-center justify-center z-50">
      <Card className="max-w-md mx-4 p-6">
        <div className="flex flex-col items-center text-center">
          <MessageSquareWarningIcon
            className="h-16 w-16 text-orange-500 mb-4"
            color="orange"
          />
          <h2 className="text-xl font-bold mb-2">
            La carga de la información meteorológica ha fallado
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {getErrorMessage()}
          </p>
          <div className="relative">
            <Button
              onClick={() => {
                setIsCounting(false);
                reset();
              }}
              disabled={isCounting}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
            >
              {isCounting ? `Recargando en ${countdown}s` : "Reintentar"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
