"use client";

import { ahoraEnColombia, horarioDe, NOMBRES_DIA, rangoTexto, SEMANA } from "@/lib/horario";
import { useMinuto } from "./estado-horario";

/** Horario de lunes a domingo; resalta el día de hoy (hora de Colombia). */
export function HorarioSemana() {
  const minuto = useMinuto();
  const hoy = minuto === null ? -1 : ahoraEnColombia(minuto * 60_000).dia;

  return (
    <dl className="divide-y divide-borde/70 text-sm">
      {SEMANA.map((d) => {
        const h = horarioDe(d);
        const esHoy = d === hoy;
        return (
          <div key={d} className={"flex justify-between gap-4 py-1.5 " + (esHoy ? "font-semibold text-texto" : "text-suave")}>
            <dt>
              {NOMBRES_DIA[d]}
              {esHoy && <span className="ml-2 rounded-full bg-naranja px-1.5 py-px text-[0.7rem] text-fondo">HOY</span>}
            </dt>
            <dd className={h ? "" : "text-suave/80"}>{rangoTexto(h)}</dd>
          </div>
        );
      })}
    </dl>
  );
}
