// Genera supabase/seed.sql a partir de los datos de ejemplo de src/lib/seed.ts.
// Uso: node scripts/generar-seed-sql.ts
import { writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { cartasSeed, PERSONAS_SEED } from "../src/lib/seed.ts";

const uuid = (texto: string) => {
  const h = createHash("sha1").update(`carta-amistad:${texto}`).digest("hex");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-5${h.slice(13, 16)}-a${h.slice(17, 20)}-${h.slice(20, 32)}`;
};
const q = (v: string | null) => (v === null ? "null" : `'${v.replace(/'/g, "''")}'`);

const lineas: string[] = [
  "-- Datos de ejemplo (ficticios). Generado por scripts/generar-seed-sql.ts.",
  "-- Para entrar con una persona, pon su email: update personas set email = 'tu@correo' where nombre = 'David';",
  "",
  "insert into public.personas (id, nombre, palo, es_admin) values",
  PERSONAS_SEED.map((p) => `  (${q(uuid(p.id))}, ${q(p.nombre)}, ${q(p.palo)}, ${p.esAdmin})`).join(",\n") + ";",
  "",
  "insert into public.cartas (id, anio, de, para, estado, favor, fecha_limite, fecha_peticion, fecha_respuesta, fecha_cumplido) values",
  cartasSeed()
    .map(
      (c) =>
        `  (${q(uuid(c.id))}, ${c.anio}, ${q(uuid(c.de))}, ${q(uuid(c.para))}, ${q(c.estado)}, ${q(c.favor)}, ${q(c.fechaLimite)}, ${q(c.fechaPeticion)}, ${q(c.fechaRespuesta)}, ${q(c.fechaCumplido)})`,
    )
    .join(",\n") + ";",
  "",
];

writeFileSync(new URL("../supabase/seed.sql", import.meta.url), lineas.join("\n"), "utf8");
console.log("supabase/seed.sql generado");
