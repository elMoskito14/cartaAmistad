import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Carta, EstadoCarta, NuevaPeticion, Palo, Persona } from "../types";
import { ErrorDeRegla, type Almacen } from "./tipos";

interface FilaPersona {
  id: string;
  nombre: string;
  palo: Palo;
  es_admin: boolean;
  email: string | null;
}

interface FilaCarta {
  id: string;
  anio: number;
  de: string;
  para: string;
  estado: EstadoCarta;
  favor: string;
  fecha_limite: string | null;
  fecha_peticion: string;
  fecha_respuesta: string | null;
  fecha_cumplido: string | null;
}

const aPersona = (f: FilaPersona): Persona => ({
  id: f.id,
  nombre: f.nombre,
  palo: f.palo,
  esAdmin: f.es_admin,
  email: f.email,
});

const aCarta = (f: FilaCarta): Carta => ({
  id: f.id,
  anio: f.anio,
  de: f.de,
  para: f.para,
  estado: f.estado,
  favor: f.favor,
  fechaLimite: f.fecha_limite,
  fechaPeticion: f.fecha_peticion,
  fechaRespuesta: f.fecha_respuesta,
  fechaCumplido: f.fecha_cumplido,
});

/** Traduce los errores de Postgres a lo que entiende la cuadrilla. */
function traducir(error: { code?: string; message: string }): Error {
  if (error.code === "23505") return new ErrorDeRegla("Ya has echado tu carta con esa persona este año.");
  if (error.code === "42501") return new ErrorDeRegla("No puedes gastar una carta que no es tuya.");
  return new Error(error.message);
}

let cliente: SupabaseClient | null = null;

export function supabaseConfigurado(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function clienteSupabase(): SupabaseClient {
  if (!cliente) {
    cliente = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  }
  return cliente;
}

export const almacenSupabase: Almacen = {
  modo: "supabase",

  async cargar() {
    const sb = clienteSupabase();
    const [personas, cartas] = await Promise.all([
      sb.from("personas").select("id, nombre, palo, es_admin, email").order("created_at"),
      sb.from("cartas").select("*").order("fecha_peticion"),
    ]);
    if (personas.error) throw traducir(personas.error);
    if (cartas.error) throw traducir(cartas.error);
    return {
      personas: (personas.data as FilaPersona[]).map(aPersona),
      cartas: (cartas.data as FilaCarta[]).map(aCarta),
    };
  },

  async pedir(p: NuevaPeticion) {
    const { data, error } = await clienteSupabase()
      .from("cartas")
      .insert({
        anio: new Date().getFullYear(),
        de: p.de,
        para: p.para,
        favor: p.favor.trim(),
        fecha_limite: p.fechaLimite,
      })
      .select("*")
      .single();
    if (error) throw traducir(error);
    return aCarta(data as FilaCarta);
  },

  async responder(id, acepta) {
    const { error } = await clienteSupabase().rpc("responder_carta", { p_carta: id, p_acepta: acepta });
    if (error) throw traducir(error);
  },

  async cumplir(id) {
    const { error } = await clienteSupabase().rpc("cumplir_carta", { p_carta: id });
    if (error) throw traducir(error);
  },

  async altaPersona(nombre, palo, email) {
    const { data, error } = await clienteSupabase()
      .from("personas")
      .insert({ nombre: nombre.trim(), palo, email: email?.trim().toLowerCase() || null })
      .select("id, nombre, palo, es_admin, email")
      .single();
    if (error) {
      if (error.code === "23505") throw new ErrorDeRegla("Ya hay alguien con ese nombre o email.");
      throw traducir(error);
    }
    return aPersona(data as FilaPersona);
  },

  suscribir(alCambiar) {
    const canal = clienteSupabase()
      .channel("cuadrilla")
      .on("postgres_changes", { event: "*", schema: "public", table: "cartas" }, alCambiar)
      .on("postgres_changes", { event: "*", schema: "public", table: "personas" }, alCambiar)
      .subscribe();
    return () => {
      void clienteSupabase().removeChannel(canal);
    };
  },
};

/** Persona de la cuadrilla asociada a la sesión (null si el email no está dado de alta). */
export async function vincularPersona(): Promise<string | null> {
  const { data, error } = await clienteSupabase().rpc("vincular_persona");
  if (error) throw traducir(error);
  return (data as string | null) ?? null;
}
