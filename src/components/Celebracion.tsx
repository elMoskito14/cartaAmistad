"use client";

import { useEffect } from "react";
import { motion } from "motion/react";

interface Props {
  x: number;
  y: number;
  alTerminar: () => void;
}

const FICHAS = Array.from({ length: 12 }, (_, i) => {
  const angulo = (i / 12) * Math.PI * 2 + (i % 2) * 0.25;
  const distancia = 70 + (i % 3) * 28;
  return { dx: Math.cos(angulo) * distancia, dy: Math.sin(angulo) * distancia - 40, giro: (i % 2 ? 1 : -1) * (90 + i * 20) };
});

/** Favor cumplido: saltan los amarracos de la mesa. */
export function Celebracion({ x, y, alTerminar }: Props) {
  useEffect(() => {
    const t = setTimeout(alTerminar, 1100);
    return () => clearTimeout(t);
  }, [alTerminar]);

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 60 }} aria-hidden="true">
      {FICHAS.map((f, i) => (
        <motion.span
          key={i}
          style={{
            position: "absolute",
            left: x - 9,
            top: y - 7,
            width: 18,
            height: 13,
            borderRadius: "50%",
            background: "radial-gradient(ellipse at 35% 30%, #fbe39b 0%, var(--amarraco) 45%, var(--amarraco-sombra) 100%)",
            boxShadow: "0 2px 3px rgba(0,0,0,.4)",
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.6, rotate: 0 }}
          animate={{ x: f.dx, y: [0, f.dy, f.dy + 90], opacity: [1, 1, 0], scale: 1, rotate: f.giro }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], times: [0, 0.55, 1] }}
        />
      ))}
    </div>
  );
}
