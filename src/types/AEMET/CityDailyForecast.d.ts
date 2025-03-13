export interface PrediccionMunicipioProbabilidadPorDias {
  origen: Origen;
  elaborado: string;
  nombre: string;
  provincia: string;
  prediccion: Prediccion;
  id: number;
  version: number;
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
  probPrecipitacion: ProbPrecipitacion[];
  cotaNieveProv: CotaNieveProv[];
  estadoCielo: EstadoCielo[];
  viento: Viento[];
  rachaMax: RachaMax[];
  temperatura: Temperatura;
  sensTermica: SensTermica;
  humedadRelativa: HumedadRelativa;
  uvMax?: number;
  fecha: string;
}

export interface ProbPrecipitacion {
  value: number;
  periodo?: string;
}

export interface CotaNieveProv {
  value: string;
  periodo?: string;
}

export interface EstadoCielo {
  value: string;
  periodo?: string;
  descripcion: string;
}

export interface Viento {
  direccion: string;
  velocidad: number;
  periodo?: string;
}

export interface RachaMax {
  value: string;
  periodo?: string;
}

export interface Temperatura {
  maxima: number;
  minima: number;
  dato: Dato[];
}

export interface Dato {
  value: number;
  hora: number;
}

export interface SensTermica {
  maxima: number;
  minima: number;
  dato: Dato2[];
}

export interface Dato2 {
  value: number;
  hora: number;
}

export interface HumedadRelativa {
  maxima: number;
  minima: number;
  dato: Dato3[];
}

export interface Dato3 {
  value: number;
  hora: number;
}
