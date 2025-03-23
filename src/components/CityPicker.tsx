"use client";

import { getCitiesByRegion, getRegions } from "@/app/data/cityCodes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Select from "react-select";
import { RiEarthLine, RiBuildingLine } from "@remixicon/react";

type option = {
  value: { code: string; name: string };
  label: string;
};

const regionOptions = getRegions().map((region) => ({
  value: { ...region },
  label: region.name,
}));

const getCityOptions = (regionCode?: string) => {
  if (regionCode)
    return getCitiesByRegion(regionCode).map((city) => ({
      value: { ...city },
      label: city.name,
    }));
};

export default function CityPicker() {
  const [region, setRegion] = useState<option | null>(null);
  const [city, setCity] = useState<option | null>(null);
  const router = useRouter();

  const handleSelectedRegion = (option: option | null) => {
    setRegion(option);
    setCity(null);
  };

  const handleSelectedCity = (option: option | null) => {
    setCity(option);
    if (option) router.push(`/location/${option.value.code}`);
  };

  return (
    <div className="space-y-4">
      <div className="text-gray-900 dark:text-gray-50 flex items-center gap-x-2">
        <RiEarthLine />
        <label htmlFor="region">Comunidad autónoma</label>
      </div>
      <Select
        id="region"
        className="text-black"
        options={regionOptions}
        value={region}
        onChange={handleSelectedRegion}
        placeholder={"Escribe/Selecciona..."}
      />

      <div className="text-gray-900 dark:text-gray-50 flex items-center gap-x-2">
        <RiBuildingLine />
        <label htmlFor="city">Municipio</label>
      </div>
      <Select
        isDisabled={region === null}
        id="city"
        className="text-black"
        options={getCityOptions(region?.value.code)}
        value={city}
        onChange={handleSelectedCity}
        placeholder={"Escribe/Selecciona..."}
      />
    </div>
  );
}
