"use client";

import { useState } from "react";

/** Ilustración de un plano con un pin de neón (no es un mapa real). */
function Plano() {
  return (
    <svg viewBox="0 0 400 200" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="200" className="fill-tarjeta" />
      <rect x="252" y="18" width="112" height="66" rx="10" fill="#1d2817" />
      <rect x="22" y="136" width="70" height="46" rx="8" fill="#1d2817" />
      <g className="stroke-borde" strokeWidth="5" fill="none">
        <path d="M-10 70H230M-10 168H410M60-10V210M200-10V96M300 100V210M380-10V210" />
      </g>
      <g className="stroke-borde" strokeWidth="13" strokeLinecap="round" fill="none">
        <path d="M-10 122H410M128-10V210M-10 30C120 60 260 90 410 196" />
      </g>
      <ellipse cx="200" cy="131" rx="13" ry="4" className="fill-neon" opacity="0.35" />
      <path
        d="M200 130C200 130 183 115 183 102A17 17 0 0 1 217 102C217 115 200 130 200 130Z"
        className="fill-neon"
        style={{ filter: "drop-shadow(0 0 8px var(--rojo-neon))" }}
      />
      <circle cx="200" cy="102" r="6" className="fill-fondo" />
    </svg>
  );
}

/**
 * Mapa del local. Para no cargar Google Maps (pesado) apenas se abre la página,
 * primero se ve una ilustración y el mapa real se carga solo si la persona lo pide.
 * Si no hay dirección para el mapa (src/datos.ts → ubicacion.mapa), se muestra la ilustración de ejemplo.
 */
export function Mapa({ consulta }: { consulta: string }) {
  const [cargar, setCargar] = useState(false);
  const q = encodeURIComponent(consulta);

  if (cargar && consulta) {
    return (
      <iframe
        title="Ubicación en Google Maps"
        src={`https://www.google.com/maps?q=${q}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="aspect-[2/1] w-full rounded-2xl border border-borde"
      />
    );
  }

  return (
    <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl border border-borde">
      <Plano />
      {consulta ? (
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap justify-center gap-2 p-3">
          <button
            type="button"
            onClick={() => setCargar(true)}
            className="h-10 rounded-full bg-fondo/85 px-4 text-sm font-semibold text-texto backdrop-blur hover:bg-fondo"
          >
            Ver mapa
          </button>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${q}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center rounded-full bg-fondo/85 px-4 text-sm font-semibold text-dorado backdrop-blur hover:bg-fondo"
          >
            Abrir en Google Maps
          </a>
        </div>
      ) : (
        <span className="absolute top-3 left-3 rounded-full border border-dashed border-naranja/60 bg-fondo/80 px-2.5 py-0.5 text-xs text-naranja">
          Mapa de ejemplo
        </span>
      )}
    </div>
  );
}
