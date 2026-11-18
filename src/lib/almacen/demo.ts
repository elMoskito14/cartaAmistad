import { cartaVigente, FAVOR_MAX } from "../reglas";
import { cartasSeed, PERSONAS_SEED } from "../seed";
import type { Carta, NuevaPeticion, Palo, Persona } from "../types";
import { ErrorDeRegla, type Almacen, type Datos } from "./tipos";

const CLAVE = "carta-amistad-demo-v2";

function leer(): Datos {
  try {
    const crudo = window.localStorage.getItem(CLAVE);
    if (crudo) return JSON.parse(crudo) as Datos;
  } catch {
    // Sin almacenamiento (modo privado, bloqueado): se trabaja en memoria.
  }
  return { personas: PERSONAS_SEED, cartas: cartasSeed() };
}

let memoria: Datos | null = null;

function datos(): Datos {
  if (!memoria) memoria = leer();
  return memoria;
}

function guardar(d: Datos) {
  memoria = d;
  try {
    window.localStorage.setItem(CLAVE, JSON.stringify(d));
  } catch {
    // Igual que arriba: sin persistencia, pero la app sigue funcionando.
  }
}

function id(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `c-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** Almacén de demostración: guarda en el navegador y sincroniza pestañas. */
export const almacenDemo: Almacen = {
  modo: "demo",

  async cargar() {
    return structuredClone(datos());
  },

  async pedir(p: NuevaPeticion) {
    const d = datos();
    const favor = p.favor.trim();
    if (!favor) throw new ErrorDeRegla("Escribe qué favor pides.");
    if (favor.length > FAVOR_MAX) throw new ErrorDeRegla(`El favor no puede pasar de ${FAVOR_MAX} caracteres.`);
    if (p.de === p.para) throw new ErrorDeRegla("No puedes echarte una carta a ti.");
    const anio = new Date().getFullYear();
    if (cartaVigente(d.cartas, p.de, p.para, anio)) {
      throw new ErrorDeRegla("Ya has echado tu carta con esa persona este año.");
    }
    const carta: Carta = {
      id: id(),
      anio,
      de: p.de,
      para: p.para,
      estado: "pendiente",
      favor,
      fechaLimite: p.fechaLimite,
      fechaPeticion: new Date().toISOString(),
      fechaRespuesta: null,
      fechaCumplido: null,
    };
    guardar({ ...d, cartas: [...d.cartas, carta] });
    return carta;
  },

  async responder(cartaId, acepta) {
    const d = datos();
    const ahora = new Date().toISOString();
    guardar({
      ...d,
      cartas: d.cartas.map((c) =>
        c.id === cartaId && c.estado === "pendiente"
          ? { ...c, estado: acepta ? "aceptada" : "rechazada", fechaRespuesta: ahora }
          : c,
      ),
    });
  },

  async cumplir(cartaId) {
    const d = datos();
    const ahora = new Date().toISOString();
    guardar({
      ...d,
      cartas: d.cartas.map((c) =>
        c.id === cartaId && c.estado === "aceptada" ? { ...c, estado: "cumplida", fechaCumplido: ahora } : c,
      ),
    });
  },

  async altaPersona(nombre: string, palo: Palo, email: string | null) {
    const d = datos();
    const limpio = nombre.trim();
    if (!limpio) throw new ErrorDeRegla("Pon un nombre.");
    if (d.personas.some((p) => p.nombre.toLowerCase() === limpio.toLowerCase())) {
      throw new ErrorDeRegla("Ya hay alguien con ese nombre en la cuadrilla.");
    }
    const persona: Persona = { id: id(), nombre: limpio, palo, esAdmin: false, email };
    guardar({ ...d, personas: [...d.personas, persona] });
    return persona;
  },

  suscribir(alCambiar) {
    const enStorage = (e: StorageEvent) => {
      if (e.key !== CLAVE) return;
      memoria = null;
      alCambiar();
    };
    window.addEventListener("storage", enStorage);
    return () => window.removeEventListener("storage", enStorage);
  },
};

/** Vuelve a los datos de ejemplo. */
export function reiniciarDemo() {
  memoria = null;
  try {
    window.localStorage.removeItem(CLAVE);
  } catch {
    // nada que borrar
  }
}
