"use client";

import { getCitiesByRegion, getRegions } from "@/app/data/cityCodes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Select, { CSSObjectWithLabel } from "react-select";
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

const customStyles = {
  control: (base: CSSObjectWithLabel, state: { isFocused: boolean }) => ({
    ...base,
    background: "white",
    borderColor: state.isFocused ? "rgb(59, 130, 246)" : "rgb(229, 231, 235)",
    boxShadow: state.isFocused ? "0 0 0 1px rgb(59, 130, 246)" : "none",
    "&:hover": {
      borderColor: "rgb(59, 130, 246)",
    },
    ".dark &": {
      background: "rgb(17, 24, 39)",
      borderColor: state.isFocused ? "rgb(59, 130, 246)" : "rgb(31, 41, 55)",
      "&:hover": {
        borderColor: "rgb(59, 130, 246)",
      },
    },
  }),
  menu: (base: CSSObjectWithLabel) => ({
    ...base,
    background: "white",
    ".dark &": {
      background: "rgb(17, 24, 39)",
    },
  }),
  option: (base: CSSObjectWithLabel, state: { isFocused: boolean }) => ({
    ...base,
    backgroundColor: state.isFocused ? "rgb(59, 130, 246)" : "transparent",
    color: state.isFocused ? "white" : "rgb(17, 24, 39)",
    "&:hover": {
      backgroundColor: "rgb(59, 130, 246)",
      color: "white",
    },
    ".dark &": {
      color: state.isFocused ? "white" : "rgb(243, 244, 246)",
    },
  }),
  singleValue: (base: CSSObjectWithLabel) => ({
    ...base,
    color: "rgb(17, 24, 39)",
    ".dark &": {
      color: "rgb(243, 244, 246)",
    },
  }),
  input: (base: CSSObjectWithLabel) => ({
    ...base,
    color: "rgb(17, 24, 39)",
    ".dark &": {
      color: "rgb(243, 244, 246)",
    },
  }),
  placeholder: (base: CSSObjectWithLabel) => ({
    ...base,
    color: "rgb(156, 163, 175)",
    ".dark &": {
      color: "rgb(107, 114, 128)",
    },
  }),
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
        styles={customStyles}
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
        styles={customStyles}
      />
    </div>
  );
}
