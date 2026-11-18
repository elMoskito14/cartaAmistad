"use client";

import { useEffect, useRef, type ReactNode } from "react";
import s from "./Hoja.module.css";

interface Props {
  abierta: boolean;
  titulo: string;
  alCerrar: () => void;
  children: ReactNode;
}

/** Hoja que sube desde abajo, sobre <dialog> nativo (foco atrapado y Escape incluidos). */
export function Hoja({ abierta, titulo, alCerrar, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  // Cierre pedido desde fuera (otra hoja se abre): no hay que avisar con alCerrar.
  const cierrePorProp = useRef(false);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (abierta && !d.open) d.showModal();
    if (!abierta && d.open) {
      cierrePorProp.current = true;
      d.close();
    }
  }, [abierta]);

  return (
    <dialog
      ref={ref}
      className={s.hoja}
      aria-label={titulo}
      onClose={() => {
        if (cierrePorProp.current) {
          cierrePorProp.current = false;
          return;
        }
        alCerrar();
      }}
      onClick={(e) => {
        if (e.target === ref.current) alCerrar();
      }}
    >
      {abierta && (
        <>
          <div className={s.cabecera}>
            <h2 className={s.titulo}>{titulo}</h2>
            <button type="button" className={s.cerrar} onClick={alCerrar} aria-label="Cerrar">
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className={s.cuerpo}>{children}</div>
        </>
      )}
    </dialog>
  );
}
