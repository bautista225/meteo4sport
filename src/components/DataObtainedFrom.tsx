import CohereIcon from "../../public/cohere.svg";
import AemetIcon from "../../public/aemet-logo.png";
import Image from "next/image";

export default function DataObtainedFrom() {
  return (
    <div className="text-gray-500 dark:text-gray-400 text-sm text-center mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
      <div className="flex items-center justify-center gap-x-2">
        <p>Datos proporcionados por</p>
        <Image
          src={AemetIcon}
          alt="AEMET"
          width={50}
          className="inline-block"
        />
      </div>
      <div className="flex items-center justify-center gap-x-2">
        <p>y analizados con la IA de </p>
        <Image
          src={CohereIcon}
          alt="Cohere AI"
          width={65}
          className="inline-block"
        />
      </div>
    </div>
  );
}
