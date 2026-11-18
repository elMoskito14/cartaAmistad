"use client";

import dynamic from "next/dynamic";

/** La app depende de la fecha, el navegador y la sesión: se pinta solo en cliente. */
export const Cliente = dynamic(() => import("./App").then((m) => m.App), {
  ssr: false,
  loading: () => (
    <p style={{ padding: "80px 20px", textAlign: "center", color: "var(--sobre-tapete-suave)" }}>Barajando…</p>
  ),
});
