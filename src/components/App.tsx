"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { almacenDemo, reiniciarDemo } from "@/lib/almacen/demo";
import { almacenSupabase, clienteSupabase, supabaseConfigurado, vincularPersona } from "@/lib/almacen/supabase";
import type { Almacen, Datos } from "@/lib/almacen/tipos";
import { aniosConDatos, anioActual, disponiblesPara, numerosDeSerie, totalCartas } from "@/lib/reglas";
import type { Carta, Palo as TipoPalo, Persona } from "@/lib/types";
import { Bandeja } from "./Bandeja";
import { Celebracion } from "./Celebracion";
import { Cuadrilla } from "./Cuadrilla";
import { Detalle } from "./Detalle";
import { EcharCarta } from "./EcharCarta";
import { Entrada } from "./Entrada";
import { Hoja } from "./Hoja";
import { Mesa } from "./Mesa";
import { Naipe } from "./Naipe";
import { Ranking } from "./Ranking";
import { Vuelo, type DatosVuelo } from "./Vuelo";
import ui from "./ui.module.css";
import s from "./App.module.css";

type Pestana = "mesa" | "ranking" | "bandeja";
type HojaAbierta =
  | { tipo: "echar"; para: string | null }
  | { tipo: "detalle"; de: Persona; para: Persona; carta: Carta | undefined }
  | { tipo: "cuadrilla" }
  | null;
type Sesion = "cargando" | "fuera" | "sinPersona" | "dentro";

const CLAVE_YO = "carta-amistad-yo";
const almacen: Almacen = supabaseConfigurado() ? almacenSupabase : almacenDemo;

/** Se consulta en el momento: el ajuste del sistema puede cambiar con la app abierta. */
function prefiereQuieto(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function leerYoDemo(): string {
  try {
    return window.localStorage.getItem(CLAVE_YO) ?? "david";
  } catch {
    return "david";
  }
}

export function App() {
  const actual = anioActual();
  const [datos, setDatos] = useState<Datos | null>(null);
  const [errorCarga, setErrorCarga] = useState<string | null>(null);
  const [sesion, setSesion] = useState<Sesion>(almacen.modo === "demo" ? "dentro" : "cargando");
  const [yoId, setYoId] = useState<string | null>(() => (almacen.modo === "demo" ? leerYoDemo() : null));
  const [pestana, setPestana] = useState<Pestana>("mesa");
  const [anio, setAnio] = useState(actual);
  const [foco, setFoco] = useState<string | null>(null);
  const [nuevos, setNuevos] = useState<Set<string>>(new Set());
  // Pares "de:para" cuya carta acaba de ser rechazada: el naipe vuelve al mazo en la mesa.
  const [devueltas, setDevueltas] = useState<Set<string>>(new Set());
  const [hoja, setHoja] = useState<HojaAbierta>(null);
  const [vuelo, setVuelo] = useState<DatosVuelo | null>(null);
  const [fiesta, setFiesta] = useState<{ x: number; y: number } | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  const anteriores = useRef<Map<string, string> | null>(null);
  const mios = useRef<Set<string>>(new Set());
  const enVuelo = useRef(false);

  // Carga y marca lo que han cambiado otras personas desde la última vez.
  const recargar = useCallback(async () => {
    try {
      const d = await almacen.cargar();
      const previo = anteriores.current;
      if (previo) {
        const cambiadas = d.cartas
          .filter((c) => previo.get(c.id) !== c.estado && !mios.current.has(c.id))
          .map((c) => c.id);
        if (cambiadas.length) setNuevos((n) => new Set([...n, ...cambiadas]));
        const rechazadas = d.cartas
          .filter((c) => c.estado === "rechazada" && previo.get(c.id) === "pendiente")
          .map((c) => `${c.de}:${c.para}`);
        if (rechazadas.length) setDevueltas((v) => new Set([...v, ...rechazadas]));
      }
      anteriores.current = new Map(d.cartas.map((c) => [c.id, c.estado]));
      mios.current.clear();
      setDatos(d);
      setErrorCarga(null);
    } catch (e) {
      setErrorCarga(e instanceof Error ? e.message : "No se han podido cargar las cartas.");
    }
  }, []);

  // Sesión: en demo eliges quién eres; con Supabase, enlace mágico.
  useEffect(() => {
    if (almacen.modo === "demo") return;
    const sb = clienteSupabase();
    const resolver = async (hay: boolean) => {
      if (!hay) return setSesion("fuera");
      try {
        const id = await vincularPersona();
        setYoId(id);
        setSesion(id ? "dentro" : "sinPersona");
      } catch {
        setSesion("sinPersona");
      }
    };
    void sb.auth.getSession().then(({ data }) => resolver(Boolean(data.session)));
    const { data } = sb.auth.onAuthStateChange((_e, ses) => void resolver(Boolean(ses)));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (sesion !== "dentro") return;
    void recargar();
    return almacen.suscribir(() => {
      if (!enVuelo.current) void recargar();
    });
  }, [sesion, recargar]);

  useEffect(() => {
    if (!aviso) return;
    const t = setTimeout(() => setAviso(null), 3200);
    return () => clearTimeout(t);
  }, [aviso]);

  const personas = useMemo(() => datos?.personas ?? [], [datos]);
  const cartas = useMemo(() => datos?.cartas ?? [], [datos]);
  // En demo, si la persona guardada ya no existe (otra cuadrilla), juegas como el admin.
  const yo =
    personas.find((p) => p.id === yoId) ??
    (almacen.modo === "demo" ? (personas.find((p) => p.esAdmin) ?? null) : null);
  const numeros = useMemo(() => numerosDeSerie(cartas, anio), [cartas, anio]);
  const anios = useMemo(() => aniosConDatos(cartas, actual), [cartas, actual]);
  const disponibles = yo ? disponiblesPara(personas, cartas, yo.id, actual) : [];
  const pendientesMias = yo
    ? cartas.filter((c) => c.anio === actual && c.para === yo.id && c.estado === "pendiente").length
    : 0;

  function cambiarYo(id: string) {
    setYoId(id);
    try {
      window.localStorage.setItem(CLAVE_YO, id);
    } catch {
      // sin almacenamiento: vale para esta visita
    }
  }

  function tocarCelda(de: Persona, para: Persona, carta: Carta | undefined) {
    const par = `${de.id}:${para.id}`;
    if (devueltas.has(par)) {
      setDevueltas((v) => {
        const copia = new Set(v);
        copia.delete(par);
        return copia;
      });
    }
    if (carta && nuevos.has(carta.id)) {
      setNuevos((n) => {
        const copia = new Set(n);
        copia.delete(carta.id);
        return copia;
      });
    }
    setHoja({ tipo: "detalle", de, para, carta });
  }

  async function echar(para: Persona, favor: string, fechaLimite: string | null) {
    if (!yo) return;
    const carta = await almacen.pedir({ de: yo.id, para: para.id, favor, fechaLimite });
    mios.current.add(carta.id);
    setHoja(null);
    setPestana("mesa");
    setAnio(actual);
    setFoco(null);
    const numero = (numerosDeSerie(cartas, actual).size ?? 0) + 1;
    if (prefiereQuieto()) {
      await recargar();
      setAviso(`Carta echada a ${para.nombre}.`);
      return;
    }
    enVuelo.current = true;
    setVuelo({ de: yo, para, numero });
  }

  async function terminarVuelo() {
    const destino = vuelo?.para.nombre;
    await recargar();
    enVuelo.current = false;
    setVuelo(null);
    if (destino) setAviso(`Carta echada a ${destino}. Ahora le toca responder.`);
  }

  async function responder(carta: Carta, acepta: boolean) {
    mios.current.add(carta.id);
    await almacen.responder(carta.id, acepta);
    await recargar();
    const de = personas.find((p) => p.id === carta.de)?.nombre ?? "";
    setAviso(acepta ? `Aceptado. ${de} cuenta contigo.` : `Carta devuelta a ${de}.`);
  }

  async function cumplir(carta: Carta, origen: DOMRect) {
    mios.current.add(carta.id);
    await almacen.cumplir(carta.id);
    if (!prefiereQuieto()) setFiesta({ x: origen.left + origen.width / 2, y: origen.top + origen.height / 2 });
    await recargar();
    setAviso("¡Favor cumplido!");
  }

  async function darDeAlta(nombre: string, palo: TipoPalo, email: string | null) {
    await almacen.altaPersona(nombre, palo, email);
    await recargar();
  }

  if (sesion === "cargando") return <p className={s.estadoCarga}>Barajando…</p>;
  if (sesion === "fuera") return <Entrada />;
  if (sesion === "sinPersona") {
    return (
      <Entrada aviso="Tu email no está en la cuadrilla. Pide a quien la administra que te dé de alta con este email." />
    );
  }

  const esActual = anio === actual;
  const conAside = pestana === "mesa";
  const puedeEchar = pestana === "mesa" && esActual && yo !== null;
  const botonEchar = (
    <button
      type="button"
      className={`${ui.boton} ${s.cta}`}
      disabled={disponibles.length === 0 || vuelo !== null}
      onClick={() => setHoja({ tipo: "echar", para: null })}
    >
      {disponibles.length === 0 ? "Ya has echado todas tus cartas" : "Echar carta"}
      <small>
        {disponibles.length === 0
          ? `Hasta el 1 de enero de ${actual + 1}`
          : `Te quedan ${disponibles.length} de ${personas.length - 1}`}
      </small>
    </button>
  );

  return (
    <div className={s.app}>
      <header className={s.cabecera}>
        <h1 className={s.marca}>
          La Carta
          <br />
          de la Amistad
        </h1>
        <div className={s.herramientas}>
          {yo?.esAdmin && (
            <button type="button" className={s.botonCabecera} onClick={() => setHoja({ tipo: "cuadrilla" })}>
              Cuadrilla
            </button>
          )}
          <label className={`${s.anio} tabular`}>
            <span className="solo-lector">Año</span>
            {anio}
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
            <select value={anio} onChange={(e) => setAnio(Number(e.target.value))}>
              {anios.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>

      {almacen.modo === "demo" && personas.length > 0 && (
        <div className={s.demo}>
          <span>
            <b>Modo demo</b> con datos de ejemplo. Juegas como
          </span>
          <select value={yo?.id ?? ""} onChange={(e) => cambiarYo(e.target.value)} aria-label="Juegas como">
            {personas.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => {
              reiniciarDemo();
              anteriores.current = null;
              setNuevos(new Set());
              void recargar();
            }}
          >
            Reiniciar demo
          </button>
        </div>
      )}

      <nav className={s.pestanas} role="tablist" aria-label="Secciones">
        <button
          type="button"
          role="tab"
          aria-selected={pestana === "mesa"}
          className={s.pestana}
          onClick={() => setPestana("mesa")}
        >
          Mesa
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={pestana === "ranking"}
          className={`${s.pestana} ${s.soloMovil}`}
          onClick={() => setPestana("ranking")}
        >
          Ranking
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={pestana === "bandeja"}
          className={s.pestana}
          onClick={() => setPestana("bandeja")}
        >
          Bandeja
          {pendientesMias > 0 && (
            <span className={`${s.contador} tabular`} aria-label={`${pendientesMias} sin responder`}>
              {pendientesMias}
            </span>
          )}
        </button>
      </nav>

      {errorCarga && (
        <p className={ui.error} role="alert">
          {errorCarga}{" "}
          <button type="button" onClick={() => void recargar()} style={{ textDecoration: "underline" }}>
            Reintentar
          </button>
        </p>
      )}

      {!datos ? (
        <p className={s.estadoCarga}>Barajando…</p>
      ) : (
        <div className={s.contenido} data-con-aside={conAside}>
          <main>
            {pestana === "mesa" && (
              <>
                <div className={s.leyenda} aria-hidden="true">
                  <span>
                    <i className={s.mini}><Naipe estado="libre" palo="oros" /></i> Sin echar
                  </span>
                  <span>
                    <i className={s.mini}><Naipe estado="pendiente" palo="oros" /></i> Pedida
                  </span>
                  <span>
                    <i className={s.mini}><Naipe estado="aceptada" palo="oros" /></i> Aceptada
                  </span>
                  <span>
                    <i className={s.mini}><Naipe estado="cumplida" palo="oros" /></i> Cumplida
                  </span>
                </div>
                <Mesa
                  personas={personas}
                  cartas={cartas}
                  anio={anio}
                  yoId={yo?.id ?? null}
                  foco={foco}
                  numeros={numeros}
                  nuevos={nuevos}
                  devueltas={devueltas}
                  alEnfocar={setFoco}
                  alTocarCelda={tocarCelda}
                />
              </>
            )}
            {pestana === "ranking" && <Ranking personas={personas} cartas={cartas} anio={anio} anios={anios} />}

            {pestana === "mesa" && esActual && yo && (
              <div className={s.pie}>
                {botonEchar}
              </div>
            )}
            {pestana === "bandeja" && yo && (
              <Bandeja
                personas={personas}
                cartas={cartas}
                anio={actual}
                yoId={yo.id}
                alResponder={responder}
                alCumplir={cumplir}
              />
            )}
          </main>
          {conAside && (
            <aside className={s.aside} aria-label="Ranking">
              {puedeEchar && <div className={s.pieAside}>{botonEchar}</div>}
              <Ranking personas={personas} cartas={cartas} anio={anio} anios={anios} />
            </aside>
          )}
        </div>
      )}


      <Hoja
        abierta={hoja?.tipo === "echar"}
        titulo="Echar carta"
        alCerrar={() => setHoja(null)}
      >
        {hoja?.tipo === "echar" && (
          <EcharCarta disponibles={disponibles} preseleccion={hoja.para} alEchar={echar} />
        )}
      </Hoja>

      <Hoja
        abierta={hoja?.tipo === "detalle"}
        titulo={hoja?.tipo === "detalle" ? `${hoja.de.nombre} a ${hoja.para.nombre}` : ""}
        alCerrar={() => setHoja(null)}
      >
        {hoja?.tipo === "detalle" && (
          <Detalle
            de={hoja.de}
            para={hoja.para}
            carta={hoja.carta}
            numero={hoja.carta ? numeros.get(hoja.carta.id) : undefined}
            total={totalCartas(personas)}
            anio={anio}
            puedoEchar={esActual && hoja.de.id === yo?.id && disponibles.some((p) => p.id === hoja.para.id)}
            alEchar={() => setHoja({ tipo: "echar", para: hoja.para.id })}
          />
        )}
      </Hoja>

      <Hoja abierta={hoja?.tipo === "cuadrilla"} titulo="La cuadrilla" alCerrar={() => setHoja(null)}>
        {hoja?.tipo === "cuadrilla" && (
          <Cuadrilla personas={personas} pideEmail={almacen.modo === "supabase"} alDarDeAlta={darDeAlta} />
        )}
      </Hoja>

      {vuelo && <Vuelo vuelo={vuelo} alTerminar={terminarVuelo} />}
      {fiesta && <Celebracion x={fiesta.x} y={fiesta.y} alTerminar={() => setFiesta(null)} />}

      {aviso && (
        <p className={s.aviso} role="status">
          {aviso}
        </p>
      )}
    </div>
  );
}
