"use client";

import { useState } from "react";
import type { Palo as TipoPalo, Persona } from "@/lib/types";
import { NOMBRE_PALO, Palo } from "./Palo";
import ui from "./ui.module.css";

interface Props {
  personas: Persona[];
  pideEmail: boolean;
  alDarDeAlta: (nombre: string, palo: TipoPalo, email: string | null) => Promise<void>;
}

const PALOS: TipoPalo[] = ["oros", "copas", "espadas", "bastos"];

/** Alta de miembros (solo admin). Cada persona juega con un palo, que es su color en la mesa. */
export function Cuadrilla({ personas, pideEmail, alDarDeAlta }: Props) {
  const [nombre, setNombre] = useState("");
  const [palo, setPalo] = useState<TipoPalo>("oros");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [hecho, setHecho] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setHecho(null);
    if (!nombre.trim()) return setError("Pon un nombre.");
    if (pideEmail && !/^\S+@\S+\.\S+$/.test(email.trim())) {
      return setError("Pon el email con el que entrará: le llegará ahí el enlace.");
    }
    setEnviando(true);
    try {
      await alDarDeAlta(nombre, palo, email.trim() || null);
      setHecho(`${nombre.trim()} ya está en la cuadrilla.`);
      setNombre("");
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se ha podido dar de alta.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <>
      <ul style={{ listStyle: "none", display: "flex", flexWrap: "wrap", gap: "8px 16px", marginBottom: 22 }}>
        {personas.map((p) => (
          <li key={p.id} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontWeight: 600 }}>
            <Palo palo={p.palo} size={16} />
            {p.nombre}
            {p.esAdmin && <span className={ui.ayuda}> (admin)</span>}
          </li>
        ))}
      </ul>

      <form onSubmit={enviar} noValidate>
        <div className={ui.campo}>
          <label className={ui.etiqueta} htmlFor="alta-nombre">
            Nombre
          </label>
          <input
            id="alta-nombre"
            className={ui.entrada}
            value={nombre}
            maxLength={40}
            autoComplete="off"
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className={ui.campo}>
          <label className={ui.etiqueta} htmlFor="alta-palo">
            Palo
          </label>
          <select id="alta-palo" className={ui.entrada} value={palo} onChange={(e) => setPalo(e.target.value as TipoPalo)}>
            {PALOS.map((p) => (
              <option key={p} value={p}>
                {NOMBRE_PALO[p]}
              </option>
            ))}
          </select>
          <span className={ui.ayuda}>Es su color en la mesa. Se puede repetir.</span>
        </div>
        {pideEmail && (
          <div className={ui.campo}>
            <label className={ui.etiqueta} htmlFor="alta-email">
              Email
            </label>
            <input
              id="alta-email"
              type="email"
              className={ui.entrada}
              value={email}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}
        {error && (
          <p className={ui.error} role="alert">
            {error}
          </p>
        )}
        {hecho && (
          <p role="status" style={{ marginBottom: 14, fontWeight: 600, color: "var(--tapete)" }}>
            {hecho}
          </p>
        )}
        <button type="submit" className={`${ui.boton} ${ui.ancho}`} disabled={enviando}>
          {enviando ? "Dando de alta…" : "Dar de alta"}
        </button>
      </form>
    </>
  );
}
