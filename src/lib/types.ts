export type Palo = "oros" | "copas" | "espadas" | "bastos";

export type EstadoCarta = "pendiente" | "aceptada" | "cumplida" | "rechazada";

export interface Persona {
  id: string;
  nombre: string;
  palo: Palo;
  esAdmin: boolean;
  email?: string | null;
}

/**
 * Una carta de la amistad echada: "de" pide un favor a "para" en un año.
 * Una carta rechazada se conserva como historial, pero devuelve la carta:
 * el par (de, para, anio) vuelve a quedar libre.
 */
export interface Carta {
  id: string;
  anio: number;
  de: string;
  para: string;
  estado: EstadoCarta;
  favor: string;
  fechaLimite: string | null;
  fechaPeticion: string;
  fechaRespuesta: string | null;
  fechaCumplido: string | null;
}

export interface NuevaPeticion {
  de: string;
  para: string;
  favor: string;
  fechaLimite: string | null;
}
