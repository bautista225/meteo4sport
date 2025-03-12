import SpanishCities from "./CodigoEspañaMunicipios.json";
import SpanishRegions from "./CodigoEspañaComunidades.json";

export type SpanishCity = {
  CODAUTO: string;
  CPRO: string;
  CMUN: string;
  DC: string;
  NOMBRE: string;
};

export type SpanishRegion = {
  CODAUTO: string;
  NOMBRE: string;
};

export const SPAIN_CITY_LIST = SpanishCities as SpanishCity[];
export const SPAIN_REGION_LIST = SpanishRegions as SpanishRegion[];

export function getRegions() {
  return SPAIN_REGION_LIST.map((region) => ({
    code: region.CODAUTO,
    name: region.NOMBRE,
  }));
}

export function getCitiesByRegion(regionCode: string) {
  return SPAIN_CITY_LIST.filter((city) => city.CODAUTO === regionCode).map(
    (city) => ({
      code: `${city.CPRO}${city.CMUN}`,
      name: city.NOMBRE,
    })
  );
}
