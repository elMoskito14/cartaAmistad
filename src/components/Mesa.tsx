"use client";

import { abreviaturas, cartaVigente, estaEchada } from "@/lib/reglas";
import type { Carta, Persona } from "@/lib/types";
import { Naipe, type EstadoCelda } from "./Naipe";
import { Palo } from "./Palo";
import s from "./Mesa.module.css";

interface Props {
  personas: Persona[];
  cartas: Carta[];
  anio: number;
  yoId: string | null;
  foco: string | null;
  numeros: Map<string, number>;
  nuevos: Set<string>;
  /** Pares "de:para" cuya carta acaban de rechazar: el naipe vuelve al mazo. */
  devueltas: Set<string>;
  alEnfocar: (id: string | null) => void;
  alTocarCelda: (de: Persona, para: Persona, carta: Carta | undefined) => void;
}

const DESCRIPCION: Record<EstadoCelda, string> = {
  libre: "carta sin echar",
  propia: "",
  pendiente: "pedida, esperando respuesta",
  aceptada: "aceptada, sin cumplir",
  cumplida: "cumplida",
};

export function Mesa({
  personas,
  cartas,
  anio,
  yoId,
  foco,
  numeros,
  nuevos,
  devueltas,
  alEnfocar,
  alTocarCelda,
}: Props) {
  const delAnio = cartas.filter((c) => c.anio === anio);
  const abrev = abreviaturas(personas);
  // Con muchas personas la mesa se aprieta: menos aire y sin número en el naipe (sigue en el detalle).
  const densa = personas.length > 9;
  const cambiarFoco = (id: string) => alEnfocar(foco === id ? null : id);
  const atenuada = (de: string, para: string) => foco !== null && de !== foco && para !== foco;

  return (
    <table
      className={`${s.mesa} ${densa ? s.densa : ""}`}
      style={{ "--n": personas.length } as React.CSSProperties}
    >
      <caption className="solo-lector">
        Mesa de {anio}: en cada fila, quien pide; en cada columna, a quién.
      </caption>
      <thead>
        <tr>
          <th scope="col" className={s.esquina}>
            Pide<br />a quién
          </th>
          {personas.map((p) => (
            <th key={p.id} scope="col" className={s.colCab}>
              <button
                type="button"
                className={`${s.cabBoton} ${foco === p.id ? s.activa : ""} ${p.id === yoId ? s.yo : ""}`}
                style={{ opacity: foco && foco !== p.id ? 0.45 : 1 }}
                onClick={() => cambiarFoco(p.id)}
                aria-pressed={foco === p.id}
                aria-label={`Resaltar a ${p.nombre}`}
              >
                <Palo palo={p.palo} size={14} />
                {abrev.get(p.id)}
              </button>
            </th>
          ))}
          <th scope="col" className={s.totalCab}>
            Echa
          </th>
        </tr>
      </thead>
      <tbody>
        {personas.map((de) => {
          const echadas = delAnio.filter((c) => c.de === de.id && estaEchada(c)).length;
          return (
            <tr key={de.id}>
              <th scope="row" className={s.filaCab}>
                <button
                  type="button"
                  className={`${s.filaBoton} ${foco === de.id ? s.activa : ""} ${de.id === yoId ? s.yo : ""}`}
                  style={{ opacity: foco && foco !== de.id ? 0.45 : 1 }}
                  onClick={() => cambiarFoco(de.id)}
                  aria-pressed={foco === de.id}
                >
                  <Palo palo={de.palo} size={14} />
                  <span>{de.nombre}</span>
                </button>
              </th>
              {personas.map((para) => {
                if (de.id === para.id) {
                  return (
                    <td key={para.id} className={s.celda}>
                      <Naipe estado="propia" palo={de.palo} />
                    </td>
                  );
                }
                const carta = cartaVigente(delAnio, de.id, para.id, anio);
                const estado: EstadoCelda = carta ? (carta.estado as EstadoCelda) : "libre";
                const levantada = foco !== null && (de.id === foco || para.id === foco);
                const devuelta = !carta && devueltas.has(`${de.id}:${para.id}`);
                return (
                  <td key={para.id} className={s.celda}>
                    <button
                      type="button"
                      data-celda={`${de.id}:${para.id}`}
                      className={`${s.celdaBoton} ${atenuada(de.id, para.id) ? s.atenuada : ""} ${levantada ? s.levantada : ""}`}
                      onClick={() => alTocarCelda(de, para, carta)}
                      aria-label={`${de.nombre} a ${para.nombre}: ${devuelta ? "carta devuelta, " : ""}${DESCRIPCION[estado]}${carta && numeros.get(carta.id) ? `, número ${numeros.get(carta.id)}` : ""}`}
                    >
                      <Naipe
                        estado={estado}
                        palo={de.palo}
                        numero={carta && !densa ? numeros.get(carta.id) : undefined}
                        nuevo={carta ? nuevos.has(carta.id) : devuelta}
                      />
                      {devuelta && (
                        <span className={s.devuelta} aria-hidden="true">
                          <Naipe estado="pendiente" palo={de.palo} />
                        </span>
                      )}
                    </button>
                  </td>
                );
              })}
              <td className={s.total} style={{ opacity: foco && foco !== de.id ? 0.45 : 1 }}>
                <span className="solo-lector">
                  {echadas} de {personas.length - 1} echadas
                </span>
                <span className={s.tanteo} aria-hidden="true">
                  {Array.from({ length: echadas }, (_, i) => (
                    <i key={i} className={s.amarraco} />
                  ))}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
