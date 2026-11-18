import type { Carta, Persona } from "./types";

export const FAVOR_MAX = 160;

/** Una carta cuenta como echada mientras no se haya rechazado. */
export function estaEchada(c: Carta): boolean {
  return c.estado !== "rechazada";
}

export function anioActual(hoy = new Date()): number {
  return hoy.getFullYear();
}

/** Carta vigente (no rechazada) de "de" a "para" en el año, si la hay. */
export function cartaVigente(cartas: Carta[], de: string, para: string, anio: number): Carta | undefined {
  return cartas.find((c) => c.anio === anio && c.de === de && c.para === para && estaEchada(c));
}

/** Personas a las que "de" todavía puede echar carta este año. */
export function disponiblesPara(personas: Persona[], cartas: Carta[], de: string, anio: number): Persona[] {
  return personas.filter((p) => p.id !== de && !cartaVigente(cartas, de, p.id, anio));
}

/** Total de cartas de un año: cada persona tiene una con cada una de las demás. */
export function totalCartas(personas: Persona[]): number {
  const n = personas.length;
  return n * (n - 1);
}

/** Número de serie de cada carta echada en el año, por orden de petición. */
export function numerosDeSerie(cartas: Carta[], anio: number): Map<string, number> {
  const delAnio = cartas
    .filter((c) => c.anio === anio && estaEchada(c))
    .sort((a, b) => a.fechaPeticion.localeCompare(b.fechaPeticion));
  return new Map(delAnio.map((c, i) => [c.id, i + 1]));
}

export interface Tanteo {
  persona: Persona;
  echadas: number;
  recibidas: number;
  cumplidas: number;
}

export function tanteo(personas: Persona[], cartas: Carta[], anio: number): Tanteo[] {
  const delAnio = cartas.filter((c) => c.anio === anio && estaEchada(c));
  return personas.map((persona) => ({
    persona,
    echadas: delAnio.filter((c) => c.de === persona.id).length,
    recibidas: delAnio.filter((c) => c.para === persona.id).length,
    cumplidas: delAnio.filter((c) => c.para === persona.id && c.estado === "cumplida").length,
  }));
}

export interface Premio {
  clave: "ordago" | "paso" | "buscada" | "sinEnvite";
  titulo: string;
  explicacion: string;
  ganadores: Persona[];
  valor: number;
}

function extremos(t: Tanteo[], campo: "echadas" | "recibidas", mayor: boolean): { ganadores: Persona[]; valor: number } {
  if (t.length === 0) return { ganadores: [], valor: 0 };
  const valores = t.map((x) => x[campo]);
  const valor = mayor ? Math.max(...valores) : Math.min(...valores);
  return { ganadores: t.filter((x) => x[campo] === valor).map((x) => x.persona), valor };
}

export function premios(t: Tanteo[]): Premio[] {
  const ordago = extremos(t, "echadas", true);
  const paso = extremos(t, "echadas", false);
  const buscada = extremos(t, "recibidas", true);
  const sinEnvite = extremos(t, "recibidas", false);
  return [
    { clave: "ordago", titulo: "El Órdago", explicacion: "Quien más cartas ha echado", ...ordago },
    { clave: "paso", titulo: "Paso", explicacion: "Quien menos cartas ha echado", ...paso },
    { clave: "buscada", titulo: "La mano buscada", explicacion: "A quien más favores le han pedido", ...buscada },
    { clave: "sinEnvite", titulo: "Sin envite", explicacion: "A quien menos favores le han pedido", ...sinEnvite },
  ];
}

export function aniosConDatos(cartas: Carta[], actual: number): number[] {
  const set = new Set<number>(cartas.map((c) => c.anio));
  set.add(actual);
  return [...set].sort((a, b) => b - a);
}

export function iniciales(nombre: string): string {
  const limpio = nombre.trim();
  return limpio.slice(0, 2).toUpperCase();
}

/**
 * Abreviatura de dos letras por persona, sin repetirse en la cuadrilla.
 * Si dos nombres empiezan igual (Gomez y Gorka), se usa la primera letra y otra del nombre
 * que nadie más tenga: GZ y GK.
 */
export function abreviaturas(personas: { id: string; nombre: string }[]): Map<string, string> {
  const resultado = new Map<string, string>();
  const usadas = new Set<string>();
  const cuenta = new Map<string, number>();
  for (const p of personas) cuenta.set(iniciales(p.nombre), (cuenta.get(iniciales(p.nombre)) ?? 0) + 1);
  for (const p of personas) {
    const base = iniciales(p.nombre);
    if (cuenta.get(base) === 1) {
      resultado.set(p.id, base);
      usadas.add(base);
    }
  }
  for (const p of personas) {
    if (resultado.has(p.id)) continue;
    const letras = p.nombre.trim().toUpperCase();
    const candidatas = [...letras.slice(1)].reverse().map((l) => letras[0] + l);
    const elegida = candidatas.find((c) => !usadas.has(c) && /^[A-ZÑ]{2}$/.test(c)) ?? letras.slice(0, 3);
    resultado.set(p.id, elegida);
    usadas.add(elegida);
  }
  return resultado;
}

const FORMATO_FECHA = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short" });
const FORMATO_FECHA_LARGA = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric" });

export function fechaCorta(iso: string): string {
  return FORMATO_FECHA.format(new Date(iso)).replace(".", "");
}

export function fechaLarga(iso: string): string {
  return FORMATO_FECHA_LARGA.format(new Date(iso));
}
