"use client";

import { useSyncExternalStore } from "react";
import { calcularEstado } from "@/lib/horario";
import { IconoReloj } from "./iconos";

/**
 * Minuto actual. Solo se lee en el navegador: en el servidor no hay "hora del visitante"
 * (y Next no permite leer la hora al prerenderizar), así que ahí se devuelve null.
 */
function suscribirMinuto(aviso: () => void) {
  const id = window.setInterval(aviso, 30_000);
  return () => window.clearInterval(id);
}
const minutoActual = () => Math.floor(Date.now() / 60_000);

export function useMinuto() {
  return useSyncExternalStore(suscribirMinuto, minutoActual, () => null);
}

/** "● Abierto · Hasta las 10:00 p. m." / "● Cerrado · Abre mañana a las 5:00 p. m." + horario de hoy. */
export function EstadoHorario() {
  const minuto = useMinuto();
  const estado = minuto === null ? null : calcularEstado(minuto * 60_000);

  return (
    <div className="mt-4 flex min-h-[3.25rem] flex-col items-center justify-center gap-1" aria-live="polite">
      {estado ? (
        <>
          <p className="inline-flex items-center gap-2 rounded-full border border-borde bg-tarjeta/80 py-1 pr-3.5 pl-2.5 text-sm">
            <span
              className={
                estado.abierto
                  ? "size-2.5 rounded-full bg-whatsapp shadow-[0_0_8px_var(--whatsapp)]"
                  : "size-2.5 rounded-full bg-rojo"
              }
              aria-hidden="true"
            />
            <span className={estado.abierto ? "font-semibold text-whatsapp" : "font-semibold text-texto"}>
              {estado.abierto ? "Abierto ahora" : "Cerrado"}
            </span>
            {estado.detalle && <span className="text-suave">· {estado.detalle}</span>}
          </p>
          <p className="inline-flex items-center gap-1.5 text-xs text-suave">
            <IconoReloj className="size-3.5" />
            Hoy: {estado.hoy}
          </p>
        </>
      ) : (
        // Mismo alto mientras carga, para que nada salte.
        <span className="h-7 w-56 animate-pulse rounded-full bg-tarjeta" aria-hidden="true" />
      )}
    </div>
  );
}
