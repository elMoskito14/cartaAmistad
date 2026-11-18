import type { Carta, NuevaPeticion, Palo, Persona } from "../types";

export interface Datos {
  personas: Persona[];
  cartas: Carta[];
}

/** Acceso a los datos de la cuadrilla. Hay dos: demo (navegador) y Supabase. */
export interface Almacen {
  modo: "demo" | "supabase";
  cargar(): Promise<Datos>;
  pedir(peticion: NuevaPeticion): Promise<Carta>;
  responder(id: string, acepta: boolean): Promise<void>;
  cumplir(id: string): Promise<void>;
  altaPersona(nombre: string, palo: Palo, email: string | null): Promise<Persona>;
  /** Avisa cuando otra persona (u otra pestaña) cambia los datos. Devuelve la baja. */
  suscribir(alCambiar: () => void): () => void;
}

export class ErrorDeRegla extends Error {}
