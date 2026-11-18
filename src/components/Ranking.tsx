import { premios, tanteo } from "@/lib/reglas";
import type { Carta, Persona } from "@/lib/types";
import { Palo } from "./Palo";
import s from "./Ranking.module.css";

interface Props {
  personas: Persona[];
  cartas: Carta[];
  anio: number;
  anios: number[];
}

export function Ranking({ personas, cartas, anio, anios }: Props) {
  const t = tanteo(personas, cartas, anio);
  const hayCartas = t.some((x) => x.echadas > 0);
  const ordenado = [...t].sort((a, b) => b.echadas - a.echadas || b.recibidas - a.recibidas);
  const porAnio = anios.map((a) => ({ anio: a, tanteo: tanteo(personas, cartas, a) }));

  return (
    <div className={s.ranking}>
      <section aria-labelledby="premios">
        <h2 id="premios" className={s.titulo}>
          Los premios de {anio}
        </h2>
        <p className={s.sub}>{hayCartas ? "Así va la partida." : "Aún no se ha echado ninguna carta este año."}</p>
        {hayCartas && (
          <ul className={s.premios}>
            {premios(t).map((p) => (
              <li key={p.clave} className={s.premio}>
                <span className={s.premioNombre}>{p.titulo}</span>
                <span className={s.premioExpl}>{p.explicacion}</span>
                <span className={s.ganadores}>
                  {p.ganadores.map((g) => (
                    <span key={g.id}>
                      <Palo palo={g.palo} size={14} />
                      {g.nombre}
                    </span>
                  ))}
                </span>
                <span className={`${s.valor} tabular`} aria-label={`${p.valor} cartas`}>
                  {p.valor}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="tanteo">
        <h2 id="tanteo" className={s.titulo}>
          El tanteo
        </h2>
        <div className={s.leyenda}>
          <span>
            <i className={s.ficha} /> carta echada
          </span>
          <span>
            <i className={s.fichaHueca} /> carta recibida
          </span>
        </div>
        <ul className={s.tanteo}>
          {ordenado.map((x) => (
            <li key={x.persona.id} className={s.fila}>
              <span className={s.persona}>
                <Palo palo={x.persona.palo} size={14} />
                {x.persona.nombre}
              </span>
              <span className={s.fichas} aria-label={`${x.echadas} echadas`}>
                {Array.from({ length: x.echadas }, (_, i) => (
                  <i key={i} className={s.ficha} />
                ))}
                <span className={`${s.etiquetaFichas} tabular`}>{x.echadas}</span>
              </span>
              <span className={s.fichas} aria-label={`${x.recibidas} recibidas`}>
                {Array.from({ length: x.recibidas }, (_, i) => (
                  <i key={i} className={s.fichaHueca} />
                ))}
                <span className={`${s.etiquetaFichas} tabular`}>{x.recibidas}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {porAnio.length > 1 && (
        <section aria-labelledby="historico">
          <h2 id="historico" className={s.titulo}>
            Cartas echadas por año
          </h2>
          <table className={s.historico}>
            <thead>
              <tr>
                <th scope="col">Persona</th>
                {porAnio.map((a) => (
                  <th key={a.anio} scope="col" className={a.anio === anio ? s.actual : undefined}>
                    {a.anio}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {personas.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  {porAnio.map((a) => (
                    <td key={a.anio} className={`tabular ${a.anio === anio ? s.actual : ""}`}>
                      {a.tanteo.find((x) => x.persona.id === p.id)?.echadas ?? 0}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}
