import { negocio } from "@/datos";
import type { HorarioDia } from "./tipos";

/** Días en el orden de JavaScript (0 = domingo). */
const CLAVES = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"] as const;
export const NOMBRES_DIA = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

/** Orden para mostrar la semana: lunes a domingo. */
export const SEMANA = [1, 2, 3, 4, 5, 6, 0];

export function horarioDe(dia: number): HorarioDia {
  return negocio.horario[CLAVES[dia]];
}

function aMinutos(hora: string) {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
}

/** "17:00" → "5:00 p. m." */
export function hora12(hora: string) {
  const [h, m] = hora.split(":").map(Number);
  const sufijo = h < 12 || h === 24 ? "a. m." : "p. m.";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${sufijo}`;
}

export function rangoTexto(h: HorarioDia) {
  return h ? `${hora12(h[0])} – ${hora12(h[1])}` : "Cerrado";
}

/** Día de la semana y minutos del día en Colombia (sin importar la zona del celular). */
export function ahoraEnColombia(ms: number) {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Bogota",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(ms));
  const valor = (t: string) => partes.find((p) => p.type === t)?.value ?? "";
  const dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(valor("weekday"));
  return { dia, minutos: Number(valor("hour")) * 60 + Number(valor("minute")) };
}

export type Estado = {
  abierto: boolean;
  /** Texto corto: "Hasta 10:00 p. m." / "Abre hoy a las 5:00 p. m." */
  detalle: string;
  /** Horario de hoy: "5:00 p. m. – 10:00 p. m." o "Cerrado". */
  hoy: string;
  dia: number;
};

export function calcularEstado(ms: number): Estado {
  const { dia, minutos } = ahoraEnColombia(ms);
  const hoy = horarioDe(dia);
  const ayer = horarioDe((dia + 6) % 7);

  // ¿Sigue abierto el turno de ayer que pasa la medianoche?
  if (ayer) {
    const [a, c] = ayer.map(aMinutos);
    if (c <= a && minutos < c) return { abierto: true, detalle: `Hasta las ${hora12(ayer[1])}`, hoy: rangoTexto(hoy), dia };
  }

  if (hoy) {
    const [a, c] = hoy.map(aMinutos);
    const pasaMedianoche = c <= a;
    if (minutos >= a && (pasaMedianoche || minutos < c)) {
      return { abierto: true, detalle: `Hasta las ${hora12(hoy[1])}`, hoy: rangoTexto(hoy), dia };
    }
    if (minutos < a) return { abierto: false, detalle: `Abre hoy a las ${hora12(hoy[0])}`, hoy: rangoTexto(hoy), dia };
  }

  // Buscar el próximo día que abre.
  for (let i = 1; i <= 7; i++) {
    const d = (dia + i) % 7;
    const h = horarioDe(d);
    if (h) {
      const cuando = i === 1 ? "mañana" : `el ${NOMBRES_DIA[d].toLowerCase()}`;
      return { abierto: false, detalle: `Abre ${cuando} a las ${hora12(h[0])}`, hoy: rangoTexto(hoy), dia };
    }
  }
  return { abierto: false, detalle: "", hoy: rangoTexto(hoy), dia };
}
