"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { estaEchada, fechaCorta } from "@/lib/reglas";
import type { Carta, Persona } from "@/lib/types";
import { Palo } from "./Palo";
import ui from "./ui.module.css";
import s from "./Bandeja.module.css";

interface Props {
  personas: Persona[];
  cartas: Carta[];
  anio: number;
  yoId: string;
  alResponder: (carta: Carta, acepta: boolean) => Promise<void>;
  alCumplir: (carta: Carta, origen: DOMRect) => Promise<void>;
}

const ESTADO_ECHADA: Record<string, string> = {
  pendiente: "Esperando respuesta",
  aceptada: "Aceptada",
  cumplida: "Cumplida",
};

export function Bandeja({ personas, cartas, anio, yoId, alResponder, alCumplir }: Props) {
  const quieto = useReducedMotion();
  const [ocupada, setOcupada] = useState<string | null>(null);
  const nombre = (id: string) => personas.find((p) => p.id === id);

  const recibidas = cartas
    .filter((c) => c.anio === anio && c.para === yoId && (c.estado === "pendiente" || c.estado === "aceptada"))
    .sort((a, b) => (a.estado === b.estado ? b.fechaPeticion.localeCompare(a.fechaPeticion) : a.estado === "pendiente" ? -1 : 1));
  const echadas = cartas
    .filter((c) => c.anio === anio && c.de === yoId && estaEchada(c))
    .sort((a, b) => b.fechaPeticion.localeCompare(a.fechaPeticion));

  async function hacer(id: string, accion: () => Promise<void>) {
    setOcupada(id);
    try {
      await accion();
    } finally {
      setOcupada(null);
    }
  }

  const salida = quieto ? { opacity: 0 } : { opacity: 0, x: -120, rotate: -6, transition: { duration: 0.35 } };

  return (
    <div className={s.bandeja}>
      <section className={s.seccion} aria-labelledby="te-piden">
        <h2 id="te-piden">Te han pedido</h2>
        <p>Si dices que no, la carta vuelve a su dueño.</p>
        {recibidas.length === 0 ? (
          <p className={s.vacio}>Nadie te ha echado carta pendiente. Mesa tranquila.</p>
        ) : (
          <ul className={s.lista}>
            <AnimatePresence initial={false}>
              {recibidas.map((c) => {
                const de = nombre(c.de);
                if (!de) return null;
                return (
                  <motion.li key={c.id} layout={!quieto} exit={salida} className={s.peticion}>
                    <span className={s.palo}>
                      <Palo palo={de.palo} size={22} hueco={c.estado === "aceptada"} />
                    </span>
                    <div>
                      <p className={s.quien}>
                        <b>{de.nombre}</b> · {fechaCorta(c.fechaPeticion)}
                        {c.fechaLimite && <> · para el {fechaCorta(c.fechaLimite)}</>}
                      </p>
                      <p className={s.texto}>«{c.favor}»</p>
                    </div>
                    <div className={s.acciones}>
                      {c.estado === "pendiente" ? (
                        <>
                          <button
                            type="button"
                            className={`${ui.boton} ${s.aceptar}`}
                            disabled={ocupada === c.id}
                            onClick={() => hacer(c.id, () => alResponder(c, true))}
                          >
                            Acepto
                          </button>
                          <button
                            type="button"
                            className={ui.secundario}
                            disabled={ocupada === c.id}
                            onClick={() => hacer(c.id, () => alResponder(c, false))}
                          >
                            No puedo, devuélvela
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          className={`${ui.boton} ${s.aceptar}`}
                          disabled={ocupada === c.id}
                          onClick={(e) => {
                            const origen = e.currentTarget.getBoundingClientRect();
                            void hacer(c.id, () => alCumplir(c, origen));
                          }}
                        >
                          Favor cumplido
                        </button>
                      )}
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        )}
      </section>

      <section className={s.seccion} aria-labelledby="has-echado">
        <h2 id="has-echado">Has echado</h2>
        <p>Tus cartas de {anio}.</p>
        {echadas.length === 0 ? (
          <p className={s.vacio}>Todavía no has echado ninguna carta este año.</p>
        ) : (
          <ul className={s.lista}>
            {echadas.map((c) => {
              const para = nombre(c.para);
              if (!para) return null;
              return (
                <li key={c.id} className={s.peticion}>
                  <span className={s.palo}>
                    <Palo palo={para.palo} size={22} />
                  </span>
                  <div>
                    <p className={s.quien}>
                      A <b>{para.nombre}</b> · {fechaCorta(c.fechaPeticion)}
                    </p>
                    <p className={s.texto}>«{c.favor}»</p>
                    <p className={s.estado}>{ESTADO_ECHADA[c.estado]}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
