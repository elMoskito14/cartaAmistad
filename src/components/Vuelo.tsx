"use client";

import { useEffect, useRef } from "react";
import { useAnimate } from "motion/react";
import type { Persona } from "@/lib/types";
import { Palo } from "./Palo";
import s from "./Vuelo.module.css";

export interface DatosVuelo {
  de: Persona;
  para: Persona;
  numero: number;
}

interface Props {
  vuelo: DatosVuelo;
  alTerminar: () => void;
}

const ANCHO = 96;
const ALTO = 144;
const salida = [0.16, 1, 0.3, 1] as const;

const esperarFotograma = () => new Promise((r) => requestAnimationFrame(() => r(null)));

/**
 * El momento estrella: el naipe sale de tu mano, cruza el tapete girando,
 * cae en su casilla, se da la vuelta y recibe el amarraco. «¡Órdago!». Menos de 3 s.
 */
export function Vuelo({ vuelo, alTerminar }: Props) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const terminado = useRef(false);

  useEffect(() => {
    let cancelado = false;
    const fin = () => {
      if (terminado.current) return;
      terminado.current = true;
      alTerminar();
    };

    (async () => {
      const celda = document.querySelector<HTMLElement>(`[data-celda="${vuelo.de.id}:${vuelo.para.id}"]`);
      if (!celda) return fin();
      celda.scrollIntoView({ block: "center", behavior: "instant" });
      await esperarFotograma();
      if (cancelado) return;

      const r = celda.getBoundingClientRect();
      const escala = r.width / ANCHO;
      const x0 = window.innerWidth / 2 - ANCHO / 2;
      const y0 = window.innerHeight - ALTO - 28;
      const tx = r.left + r.width / 2 - ANCHO / 2;
      const ty = r.top + r.height / 2 - ALTO / 2;
      const xm = (x0 + tx) / 2 + (tx > x0 ? -60 : 60);
      const ym = Math.min(y0, ty) - 70;

      const naipe = scope.current.querySelector("[data-naipe]")!;
      const interior = scope.current.querySelector("[data-interior]")!;
      const ficha = scope.current.querySelector("[data-ficha]")!;
      const grito = scope.current.querySelector<HTMLElement>("[data-grito]")!;

      // 1. Sale de la mano y vuela en arco hasta la casilla.
      await animate(
        naipe,
        {
          x: [x0, x0, xm, tx],
          y: [y0 + 120, y0, ym, ty],
          rotate: [-14, -8, 10, 0],
          scale: [0.85, 1.12, 0.9, escala],
        },
        { duration: 1.05, times: [0, 0.22, 0.62, 1], ease: ["easeOut", "easeInOut", salida] },
      );
      if (cancelado) return;

      // 2. Golpe en la mesa y el grito.
      const gx = Math.max(12, Math.min(window.innerWidth - 150, r.left + r.width / 2 - 70));
      const gy = Math.max(12, r.top - 52);
      grito.style.left = `${gx}px`;
      grito.style.top = `${gy}px`;
      animate(grito, { opacity: [0, 1], scale: [1.7, 1], rotate: [-14, -6] }, { duration: 0.32, ease: salida });
      await animate(naipe, { scale: [escala * 1.18, escala] }, { duration: 0.22, ease: salida });

      // 3. Se da la vuelta: queda boca abajo, esperando respuesta…
      await animate(interior, { rotateY: [0, 180] }, { duration: 0.34, ease: "easeInOut" });

      // 4. …y cae el amarraco encima.
      await animate(ficha, { opacity: [0, 1], y: [-36, 0], scale: [1.7, 1] }, { duration: 0.28, ease: salida });

      await animate(grito, { opacity: 0, y: -12 }, { duration: 0.35, delay: 0.25 });
      fin();
    })();

    return () => {
      cancelado = true;
    };
    // Una sola animación por vuelo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={scope} className={s.capa} aria-hidden="true">
      <div data-naipe className={s.naipe} style={{ opacity: 1 }}>
        <div data-interior className={s.interior}>
          <div className={s.cara}>
            <span className={`${s.num} tabular`}>{vuelo.numero}</span>
            <Palo palo={vuelo.de.palo} size={46} className={s.pip} />
            <span className={s.para}>a {vuelo.para.nombre}</span>
          </div>
          <div className={s.dorso} />
        </div>
        <span data-ficha className={s.ficha} />
      </div>
      <span data-grito className={s.grito}>
        ¡Órdago!
      </span>
    </div>
  );
}
