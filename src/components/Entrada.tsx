"use client";

import { useState } from "react";
import { clienteSupabase } from "@/lib/almacen/supabase";
import { Palo } from "./Palo";
import ui from "./ui.module.css";

/** Pantalla de entrada con enlace mágico (solo con Supabase configurado). */
export function Entrada({ aviso }: { aviso?: string }) {
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState<"quieto" | "enviando" | "enviado">("quieto");
  const [error, setError] = useState<string | null>(null);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setError("Ese email no parece válido.");
    setError(null);
    setEstado("enviando");
    const { error: err } = await clienteSupabase().auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: window.location.origin, shouldCreateUser: true },
    });
    if (err) {
      setError("No se ha podido enviar el enlace. Inténtalo en un rato.");
      setEstado("quieto");
    } else {
      setEstado("enviado");
    }
  }

  return (
    <main style={{ position: "relative", zIndex: 1, maxWidth: 420, margin: "0 auto", padding: "64px 20px" }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 18 }} aria-hidden="true">
        <Palo palo="oros" size={26} />
        <Palo palo="copas" size={26} />
        <Palo palo="espadas" size={26} />
        <Palo palo="bastos" size={26} />
      </div>
      <h1 style={{ fontFamily: "var(--fuente-titulo)", fontWeight: 800, fontSize: 38, lineHeight: 1.05, marginBottom: 14 }}>
        La Carta de la Amistad
      </h1>
      <p style={{ color: "var(--sobre-tapete-suave)", marginBottom: 28 }}>
        Una carta con cada uno de la cuadrilla, una vez al año. Entra con tu email y te mandamos un enlace.
      </p>
      {aviso && (
        <p className={ui.error} role="alert">
          {aviso}
        </p>
      )}
      {estado === "enviado" ? (
        <p role="status" style={{ fontSize: 18, fontWeight: 600 }}>
          Mira tu correo: tienes el enlace para entrar.
        </p>
      ) : (
        <form onSubmit={enviar} noValidate>
          <label htmlFor="email" style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
            Tu email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={ui.entrada}
            style={{ marginBottom: 14 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && (
            <p className={ui.error} role="alert">
              {error}
            </p>
          )}
          <button type="submit" className={`${ui.boton} ${ui.ancho}`} disabled={estado === "enviando"}>
            {estado === "enviando" ? "Enviando…" : "Mandarme el enlace"}
          </button>
        </form>
      )}
    </main>
  );
}
