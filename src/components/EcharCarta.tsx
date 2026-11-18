"use client";

import { useState } from "react";
import { FAVOR_MAX } from "@/lib/reglas";
import type { Persona } from "@/lib/types";
import { Palo } from "./Palo";
import ui from "./ui.module.css";
import s from "./EcharCarta.module.css";

interface Props {
  disponibles: Persona[];
  preseleccion: string | null;
  alEchar: (para: Persona, favor: string, fechaLimite: string | null) => Promise<void>;
}

export function EcharCarta({ disponibles, preseleccion, alEchar }: Props) {
  const [para, setPara] = useState<string | null>(
    preseleccion && disponibles.some((p) => p.id === preseleccion) ? preseleccion : null,
  );
  const [favor, setFavor] = useState("");
  const [limite, setLimite] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const elegida = disponibles.find((p) => p.id === para);
  const listo = Boolean(elegida && favor.trim());

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!elegida) {
      setError("Elige a quién le echas la carta.");
      return;
    }
    if (!favor.trim()) {
      setError("Escribe qué favor pides.");
      return;
    }
    setEnviando(true);
    setError(null);
    try {
      await alEchar(elegida, favor.trim(), limite || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se ha podido echar la carta. Inténtalo otra vez.");
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={enviar} noValidate>
      <p className={s.intro}>Solo tienes una carta con cada persona al año. Si te dice que no, te la devuelve.</p>

      <fieldset className={s.mano} role="radiogroup" aria-label="¿A quién?">
        <legend className={`${ui.etiqueta} ${s.leyenda}`}>¿A quién?</legend>
        {disponibles.map((p) => (
          <button
            key={p.id}
            type="button"
            role="radio"
            aria-checked={para === p.id}
            className={s.opcion}
            onClick={() => setPara(p.id)}
          >
            <span className={s.miniNaipe}>
              <Palo palo={p.palo} size={22} />
            </span>
            {p.nombre}
          </button>
        ))}
      </fieldset>

      <div className={ui.campo}>
        <label className={ui.etiqueta} htmlFor="favor">
          ¿Qué favor pides?
        </label>
        <textarea
          id="favor"
          className={ui.entrada}
          value={favor}
          maxLength={FAVOR_MAX}
          placeholder="Llevarme al aeropuerto el viernes a las 6"
          onChange={(e) => setFavor(e.target.value)}
        />
        <span className={`${s.contador} tabular`} data-lleno={favor.length >= FAVOR_MAX}>
          {favor.length}/{FAVOR_MAX}
        </span>
      </div>

      <div className={ui.campo}>
        <label className={ui.etiqueta} htmlFor="limite">
          ¿Para cuándo? <span className={ui.ayuda}>(opcional)</span>
        </label>
        <input
          id="limite"
          type="date"
          className={ui.entrada}
          value={limite}
          min={new Date().toISOString().slice(0, 10)}
          onChange={(e) => setLimite(e.target.value)}
        />
      </div>

      {error && (
        <p className={ui.error} role="alert">
          {error}
        </p>
      )}

      <button type="submit" className={`${ui.boton} ${ui.ancho}`} disabled={!listo || enviando}>
        {enviando ? "Echando…" : elegida ? `Echar carta a ${elegida.nombre}` : "Echar carta"}
      </button>
    </form>
  );
}
