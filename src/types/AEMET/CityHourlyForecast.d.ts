export interface PrediccionMunicipioProbabilidadPorHoras {
  origen: Origen;
  elaborado: string;
  nombre: string;
  provincia: string;
  prediccion: Prediccion;
  id: string;
  version: string;
}

export interface Origen {
  productor: string;
  web: string;
  enlace: string;
  language: string;
  copyright: string;
  notaLegal: string;
}

export interface Prediccion {
  dia: Dum[];
}

export interface Dum {
  estadoCielo: EstadoCielo[];
  precipitacion: Precipitacion[];
  probPrecipitacion: ProbPrecipitacion[];
  probTormenta: ProbTormenum[];
  nieve: Nieve[];
  probNieve: ProbNieve[];
  temperatura: Temperatura[];
  sensTermica: SensTermica[];
  humedadRelativa: HumedadRelativa[];
  vientoAndRachaMax: VientoAndRachaMax[];
  fecha: string;
  orto: string;
  ocaso: string;
}

export interface EstadoCielo {
  value: string;
  periodo: string;
  descripcion: string;
}

export interface Precipitacion {
  value: string;
  periodo: string;
}

export interface ProbPrecipitacion {
  value: string;
  periodo: string;
}

export interface ProbTormenum {
  value: string;
  periodo: string;
}

export interface Nieve {
  value: string;
  periodo: string;
}

export interface ProbNieve {
  value: string;
  periodo: string;
}

export interface Temperatura {
  value: string;
  periodo: string;
}

export interface SensTermica {
  value: string;
  periodo: string;
}

export interface HumedadRelativa {
  value: string;
  periodo: string;
}

export interface VientoAndRachaMax {
  direccion?: string[];
  velocidad?: string[];
  periodo: string;
  value?: string;
}
