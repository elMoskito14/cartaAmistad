import type { Palo as TipoPalo } from "@/lib/types";
import { Palo } from "./Palo";
import s from "./Naipe.module.css";

export type EstadoCelda = "libre" | "propia" | "pendiente" | "aceptada" | "cumplida";

interface Props {
  estado: EstadoCelda;
  /** Palo de quien echó la carta: se ve cuando el naipe está boca arriba. */
  palo: TipoPalo;
  numero?: number;
  nuevo?: boolean;
  grande?: boolean;
}

/**
 * Un naipe de la mesa.
 * Boca abajo: carta por echar. Boca abajo con amarraco: pedida, esperando respuesta.
 * Boca arriba con palo hueco: aceptada. Boca arriba con palo lleno: cumplida.
 */
export function Naipe({ estado, palo, numero, nuevo = false, grande = false }: Props) {
  if (estado === "propia") return <span className={s.propia} aria-hidden="true" />;
  const bocaArriba = estado === "aceptada" || estado === "cumplida";
  const clases = [s.naipe, bocaArriba ? s["boca-arriba"] : s["boca-abajo"], nuevo ? s.nuevo : "", grande ? s.grande : "", estado === "cumplida" ? s.cumplida : ""]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={clases} style={{ "--color-palo": `var(--${palo})` } as React.CSSProperties} aria-hidden="true">
      <span className={s.dorso} />
      <span className={s.cara}>
        {numero !== undefined && <span className={`${s.numero} tabular`}>{numero}</span>}
        <Palo palo={palo} hueco={estado === "aceptada"} size={grande ? 64 : 18} />
      </span>
      {estado === "pendiente" && <span className={s.amarraco} />}
    </span>
  );
}
