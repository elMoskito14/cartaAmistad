import type { Carta, EstadoCarta, Persona } from "./types";

/**
 * La cuadrilla (12 personas) con dos años de historia de ejemplo.
 * Los nombres son los reales; los favores y las fechas son inventados para ver la mesa llena.
 */
export const PERSONAS_SEED: Persona[] = [
  { id: "david", nombre: "David", palo: "oros", esAdmin: true },
  { id: "fran", nombre: "Fran", palo: "copas", esAdmin: false },
  { id: "gomez", nombre: "Gomez", palo: "espadas", esAdmin: false },
  { id: "gorka", nombre: "Gorka", palo: "bastos", esAdmin: false },
  { id: "igor", nombre: "Igor", palo: "oros", esAdmin: false },
  { id: "motx", nombre: "Motx", palo: "copas", esAdmin: false },
  { id: "murua", nombre: "Murua", palo: "espadas", esAdmin: false },
  { id: "olaf", nombre: "Olaf", palo: "bastos", esAdmin: false },
  { id: "sein", nombre: "Sein", palo: "oros", esAdmin: false },
  { id: "jon", nombre: "Jon", palo: "copas", esAdmin: false },
  { id: "omar", nombre: "Omar", palo: "espadas", esAdmin: false },
  { id: "urko", nombre: "Urko", palo: "bastos", esAdmin: false },
];

const FAVORES = [
  "Llevarme al aeropuerto a las 5 de la mañana",
  "Cuidar del perro el puente de diciembre",
  "Ayudarme con la mudanza al piso de Amara",
  "Hacerme de pareja de mus en el campeonato de la sociedad",
  "Recoger el paquete de Correos que no llego a buscar",
  "Prestarme la furgo un finde",
  "Cocinar el marmitako para la cena de cuadrilla",
  "Venir conmigo a la boda de mi prima",
  "Revisar mi currículum antes del viernes",
  "Guardarme sitio en la Tamborrada",
  "Regarme las plantas dos semanas",
  "Montar el armario de Ikea",
  "Pinchar en mi cumple",
  "Acompañarme al dentista",
  "Llevar la nevera a la playa de Zarautz",
  "Traerme txakoli de Getaria",
  "Subir conmigo al Txindoki",
  "Hacer la reserva en la sidrería para 10",
  "Ir a buscar a mi ama al hospital",
  "Explicarme de una vez cómo va la Thermomix",
];

type Fila = [string, string, EstadoCarta, string, string];

const CARTAS_2026: Fila[] = [
  ["igor", "david", "cumplida", "2026-01-12", "Llevarme al aeropuerto a las 5 de la mañana"],
  ["fran", "gomez", "cumplida", "2026-01-20", "Ayudarme con la mudanza al piso de Amara"],
  ["david", "fran", "cumplida", "2026-02-14", "Cuidar del perro el puente de San José"],
  ["igor", "fran", "cumplida", "2026-02-27", "Prestarme la furgo un finde"],
  ["motx", "fran", "cumplida", "2026-03-11", "Hacerme de pareja de mus en el campeonato de la sociedad"],
  ["murua", "gorka", "cumplida", "2026-03-19", "Revisar mi currículum antes del viernes"],
  ["fran", "olaf", "cumplida", "2026-04-02", "Montar el armario de Ikea"],
  ["igor", "gomez", "cumplida", "2026-04-20", "Regarme las plantas dos semanas"],
  ["gomez", "igor", "cumplida", "2026-05-08", "Subir conmigo al Txindoki"],
  ["david", "olaf", "cumplida", "2026-05-23", "Llevar la nevera a la playa de Zarautz"],
  ["urko", "motx", "cumplida", "2026-05-30", "Traerme txakoli de Getaria"],
  ["murua", "olaf", "aceptada", "2026-06-15", "Hacer la reserva en la sidrería para 12"],
  ["igor", "olaf", "cumplida", "2026-06-27", "Cambiar la rueda de la bici"],
  ["fran", "motx", "cumplida", "2026-07-09", "Cubrirme el turno de barra en fiestas"],
  ["olaf", "igor", "cumplida", "2026-07-21", "Hacer de fotógrafo en la comunión"],
  ["gorka", "jon", "cumplida", "2026-07-30", "Guardarme sitio en la Tamborrada"],
  ["igor", "motx", "aceptada", "2026-08-12", "Pintar la habitación del crío"],
  ["motx", "omar", "cumplida", "2026-08-20", "Acompañarme al dentista"],
  ["fran", "igor", "rechazada", "2026-08-30", "Hacerme la declaración de la renta"],
  ["fran", "igor", "aceptada", "2026-09-14", "Arreglarme el wifi de casa"],
  ["jon", "urko", "cumplida", "2026-09-22", "Cocinar el marmitako para la cena de cuadrilla"],
  ["motx", "urko", "cumplida", "2026-10-01", "Prestarme el traje para la cena de empresa"],
  ["gomez", "murua", "cumplida", "2026-10-05", "Recoger el paquete de Correos que no llego a buscar"],
  ["omar", "gorka", "aceptada", "2026-10-11", "Explicarme de una vez cómo va la Thermomix"],
  ["urko", "sein", "cumplida", "2026-10-19", "Ir a buscar a mi ama al hospital"],
  ["murua", "david", "aceptada", "2026-10-28", "Venir conmigo a la boda de mi prima"],
  ["igor", "sein", "cumplida", "2026-11-02", "Pinchar en mi cumple"],
  ["gorka", "fran", "pendiente", "2026-11-08", "Hacer la compra grande del txoko"],
  ["motx", "jon", "pendiente", "2026-11-12", "Traerme las llaves del local a Donosti"],
  ["olaf", "david", "pendiente", "2026-11-15", "Pasar a recoger la txuleta del carnicero el sábado"],
  ["jon", "omar", "pendiente", "2026-11-16", "Ayudarme a subir el sofá al quinto sin ascensor"],
  ["gomez", "gorka", "pendiente", "2026-11-17", "Comprarme entradas para el concierto en cuanto salgan"],
];


/** Generador pseudoaleatorio determinista (mulberry32) para que el seed sea siempre igual. */
function prng(semilla: number) {
  let a = semilla;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function iso(fecha: string, hora = 19): string {
  return new Date(`${fecha}T${String(hora).padStart(2, "0")}:00:00`).toISOString();
}

function sumarDias(fecha: string, dias: number): string {
  const d = new Date(`${fecha}T12:00:00`);
  d.setDate(d.getDate() + dias);
  return d.toISOString().slice(0, 10);
}

function construir(anio: number, filas: Fila[]): Carta[] {
  return filas.map(([de, para, estado, fecha, favor], i) => ({
    id: `${anio}-${String(i + 1).padStart(3, "0")}`,
    anio,
    de,
    para,
    estado,
    favor,
    fechaLimite: null,
    fechaPeticion: iso(fecha, 18 + (i % 4)),
    fechaRespuesta: estado === "pendiente" ? null : iso(sumarDias(fecha, 1)),
    fechaCumplido: estado === "cumplida" ? iso(sumarDias(fecha, 6)) : null,
  }));
}

function generar2025(): Fila[] {
  const azar = prng(2025);
  const ids = PERSONAS_SEED.map((p) => p.id);
  const pares: [string, string][] = [];
  for (const de of ids) for (const para of ids) if (de !== para) pares.push([de, para]);
  // Mezcla determinista y nos quedamos con 58 cartas echadas.
  for (let i = pares.length - 1; i > 0; i--) {
    const j = Math.floor(azar() * (i + 1));
    [pares[i], pares[j]] = [pares[j], pares[i]];
  }
  const elegidos = pares.slice(0, 58);
  const filas: Fila[] = elegidos.map(([de, para], i) => {
    const dia = 1 + Math.floor((i / elegidos.length) * 350 + azar() * 8);
    const fecha = sumarDias("2025-01-01", dia);
    const favor = FAVORES[Math.floor(azar() * FAVORES.length)];
    return [de, para, "cumplida", fecha, favor];
  });
  // Dos rechazos devolvieron la carta: quedan como historial.
  filas.push(["omar", "murua", "rechazada", "2025-03-11", "Hacerme la declaración de la renta"]);
  filas.push(["sein", "urko", "rechazada", "2025-09-02", "Pinchar en mi cumple"]);
  return filas.sort((a, b) => a[3].localeCompare(b[3]));
}

export function cartasSeed(): Carta[] {
  return [...construir(2025, generar2025()), ...construir(2026, CARTAS_2026)];
}
