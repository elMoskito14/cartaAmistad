import { fechaLarga } from "@/lib/reglas";
import type { Carta, Persona } from "@/lib/types";
import { Naipe, type EstadoCelda } from "./Naipe";
import ui from "./ui.module.css";
import s from "./Detalle.module.css";

const TEXTO_ESTADO: Record<Exclude<EstadoCelda, "propia" | "libre">, string> = {
  pendiente: "Esperando respuesta",
  aceptada: "Aceptada, falta cumplirla",
  cumplida: "Cumplida",
};

interface Props {
  de: Persona;
  para: Persona;
  carta: Carta | undefined;
  numero: number | undefined;
  total: number;
  anio: number;
  puedoEchar: boolean;
  alEchar: () => void;
}

export function Detalle({ de, para, carta, numero, total, anio, puedoEchar, alEchar }: Props) {
  if (!carta) {
    return (
      <>
        <div className={s.detalle}>
          <Naipe estado="libre" palo={de.palo} grande />
          <p className={s.vacia}>
            {puedoEchar
              ? `Aún tienes tu carta con ${para.nombre} este año.`
              : `${de.nombre} todavía no ha echado su carta a ${para.nombre} en ${anio}.`}
          </p>
        </div>
        {puedoEchar && (
          <button type="button" className={`${ui.boton} ${ui.ancho}`} onClick={alEchar}>
            Echar carta a {para.nombre}
          </button>
        )}
      </>
    );
  }

  const estado = carta.estado as Exclude<EstadoCelda, "propia" | "libre">;
  return (
    <>
      <div className={s.detalle}>
        <Naipe estado={estado} palo={de.palo} numero={numero} grande />
        <div>
          {numero !== undefined && (
            <p className={`${s.serie} tabular`}>
              {carta.anio} · Nº {numero}/{total}
            </p>
          )}
          <p className={s.favor}>«{carta.favor}»</p>
          <span className={s.estado} data-estado={estado}>
            {TEXTO_ESTADO[estado]}
          </span>
        </div>
      </div>
      <dl className={s.fechas}>
        <dt>Pedida</dt>
        <dd>{fechaLarga(carta.fechaPeticion)}</dd>
        {carta.fechaLimite && (
          <>
            <dt>Para el</dt>
            <dd>{fechaLarga(carta.fechaLimite)}</dd>
          </>
        )}
        {carta.fechaRespuesta && (
          <>
            <dt>Aceptada</dt>
            <dd>{fechaLarga(carta.fechaRespuesta)}</dd>
          </>
        )}
        {carta.fechaCumplido && (
          <>
            <dt>Cumplida</dt>
            <dd>{fechaLarga(carta.fechaCumplido)}</dd>
          </>
        )}
      </dl>
    </>
  );
}
