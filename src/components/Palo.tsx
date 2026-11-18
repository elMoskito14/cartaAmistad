import type { Palo as TipoPalo } from "@/lib/types";

const COLOR: Record<TipoPalo, { relleno: string; trazo: string }> = {
  oros: { relleno: "var(--oros)", trazo: "var(--oros-oscuro)" },
  copas: { relleno: "var(--copas)", trazo: "var(--copas-oscuro)" },
  espadas: { relleno: "var(--espadas)", trazo: "var(--espadas-oscuro)" },
  bastos: { relleno: "var(--bastos)", trazo: "var(--bastos-oscuro)" },
};

export const NOMBRE_PALO: Record<TipoPalo, string> = {
  oros: "Oros",
  copas: "Copas",
  espadas: "Espadas",
  bastos: "Bastos",
};

interface Props {
  palo: TipoPalo;
  /** Hueco: solo contorno (favor aceptado, aún sin cumplir). */
  hueco?: boolean;
  size?: number;
  className?: string;
}

/** Los cuatro palos de la baraja española, dibujados a mano en SVG. */
export function Palo({ palo, hueco = false, size = 20, className }: Props) {
  const { relleno, trazo } = COLOR[palo];
  const fill = hueco ? "none" : relleno;
  const comun = { fill, stroke: trazo, strokeWidth: 1.4, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      {palo === "oros" && (
        <>
          <circle cx="12" cy="12" r="8.5" {...comun} />
          <circle cx="12" cy="12" r="4.6" fill="none" stroke={trazo} strokeWidth="1.2" />
          <circle cx="12" cy="12" r="1.4" fill={trazo} />
        </>
      )}
      {palo === "copas" && (
        <path
          d="M6 3.5h12v2.8a6 6 0 0 1-4.6 5.84V16.5h3.1v3.8H7.5v-3.8h3.1v-4.36A6 6 0 0 1 6 6.3z"
          {...comun}
        />
      )}
      {palo === "espadas" && (
        <>
          <path d="M12 1.8l2 3V14.4h-4V4.8z" {...comun} />
          <path d="M6.8 14.4h10.4v2.1H6.8z" {...comun} />
          <path d="M11 16.5h2v4h-2z" {...comun} />
          <circle cx="12" cy="21.4" r="1.3" {...comun} />
        </>
      )}
      {palo === "bastos" && (
        <>
          <path
            d="M8.6 2.6c1.9-.9 4 .1 4.5 2.1l3.1 14.6c.25 1.3-.6 2.3-1.8 2.3h-1.3c-.95 0-1.75-.65-1.95-1.6L7.6 5.6c-.3-1.3.1-2.4 1-3z"
            {...comun}
          />
          <circle cx="9.9" cy="8.4" r="1" fill={trazo} />
          <circle cx="12.6" cy="13" r="1" fill={trazo} />
        </>
      )}
    </svg>
  );
}
