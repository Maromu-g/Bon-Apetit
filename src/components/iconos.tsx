import type { SVGProps } from "react";
import type { IconoCategoria } from "@/lib/tipos";

type P = SVGProps<SVGSVGElement>;

/** Base para íconos de línea (trazo redondeado, color del texto). */
function Linea({ children, ...props }: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

// ── Categorías ───────────────────────────────────────────────
export function IconoHamburguesa(p: P) {
  return (
    <Linea {...p}>
      <path d="M4 10.5C4 6.9 7.6 4 12 4s8 2.9 8 6.5H4Z" />
      <path d="M3 14c1.5-1.2 3-1.2 4.5 0s3 1.2 4.5 0 3-1.2 4.5 0 3 1.2 4.5 0" />
      <path d="M4.5 17.5h15a2.5 2.5 0 0 1-2.5 2.5H7a2.5 2.5 0 0 1-2.5-2.5Z" />
      <path d="M9 7.2h.01M12 6.5h.01M15 7.2h.01" />
    </Linea>
  );
}

export function IconoPerro(p: P) {
  return (
    <Linea {...p}>
      <path d="M3.5 10.5h17a1.5 1.5 0 0 1 1.5 1.5v.5a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V12a1.5 1.5 0 0 1 1.5-1.5Z" />
      <path d="M2.5 10.5c0-1.7 1.3-3 3-3h13c1.7 0 3 1.3 3 3" />
      <path d="M5 12.8c1.2-1 2.3 1 3.5 0s2.3 1 3.5 0 2.3 1 3.5 0 2.3 1 3.5 0" />
    </Linea>
  );
}

export function IconoPapas(p: P) {
  return (
    <Linea {...p}>
      <path d="M5.5 10h13l-1.6 10.2a1 1 0 0 1-1 .8H8.1a1 1 0 0 1-1-.8L5.5 10Z" />
      <path d="M8 10V4.5M10.7 10V3M13.3 10V3.8M16 10V5" />
      <path d="M9 14.5a3 2 0 0 0 6 0" />
    </Linea>
  );
}

export function IconoPicada(p: P) {
  return (
    <Linea {...p}>
      <path d="M6.5 3v6.5M4.5 3v4.5a2 2 0 0 0 4 0V3M6.5 9.5V21" />
      <path d="M17.5 21V3c-2.2.8-3.5 3.6-3.5 7.5h3.5" />
    </Linea>
  );
}

export function IconoMazorca(p: P) {
  return (
    <Linea {...p}>
      <path d="M12 3c2.3 0 3.6 3.4 3.6 7.4S14.3 19 12 19s-3.6-4.6-3.6-8.6S9.7 3 12 3Z" />
      <path d="M8.6 8.5h6.8M8.4 11.5h7.2M8.9 14.5h6.2M12 3.5v15" />
      <path d="M8.5 12.5C6 13.5 4.5 16.8 4.5 21c3 0 5.6-1.6 7.5-4M15.5 12.5c2.5 1 4 4.3 4 8.5-3 0-5.6-1.6-7.5-4" />
    </Linea>
  );
}

export function IconoBebida(p: P) {
  return (
    <Linea {...p}>
      <path d="M6 8h12l-1.4 12.1a1 1 0 0 1-1 .9H8.4a1 1 0 0 1-1-.9L6 8Z" />
      <path d="M5 8h14M12.5 8l1.5-5h3" />
      <path d="M7 13h10" />
    </Linea>
  );
}

const ICONOS: Record<IconoCategoria, (p: P) => React.JSX.Element> = {
  hamburguesa: IconoHamburguesa,
  perro: IconoPerro,
  papas: IconoPapas,
  picada: IconoPicada,
  mazorca: IconoMazorca,
  bebida: IconoBebida,
};

export function IconoDeCategoria({ icono, ...p }: P & { icono: IconoCategoria }) {
  const Icono = ICONOS[icono];
  return <Icono {...p} />;
}

// ── Interfaz ─────────────────────────────────────────────────
export function IconoMas(p: P) {
  return (
    <Linea strokeWidth={2.4} {...p}>
      <path d="M12 5v14M5 12h14" />
    </Linea>
  );
}

export function IconoMenos(p: P) {
  return (
    <Linea strokeWidth={2.4} {...p}>
      <path d="M5 12h14" />
    </Linea>
  );
}

export function IconoCerrar(p: P) {
  return (
    <Linea strokeWidth={2.2} {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Linea>
  );
}

export function IconoBolsa(p: P) {
  return (
    <Linea {...p}>
      <path d="M5 8h14l-1 12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 8Z" />
      <path d="M9 10V7a3 3 0 0 1 6 0v3" />
    </Linea>
  );
}

export function IconoReloj(p: P) {
  return (
    <Linea {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Linea>
  );
}

export function IconoUbicacion(p: P) {
  return (
    <Linea {...p}>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </Linea>
  );
}

export function IconoMoto(p: P) {
  return (
    <Linea {...p}>
      <circle cx="5.5" cy="17" r="3" />
      <circle cx="18.5" cy="17" r="3" />
      <path d="M8.5 17h6l2-6h-5l-3 6M14 6h3l1.5 5M5.5 17l3-6h3" />
    </Linea>
  );
}

export function IconoBilletera(p: P) {
  return (
    <Linea {...p}>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18M16 14.5h2" />
    </Linea>
  );
}

export function IconoInstagram(p: P) {
  return (
    <Linea {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </Linea>
  );
}

export function IconoFacebook(p: P) {
  return (
    <Linea {...p}>
      <path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H6.5v3.5H9V21h3.5v-7.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15V3Z" />
    </Linea>
  );
}

export function IconoWhatsApp(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35ZM12.05 21.5h-.01a9.5 9.5 0 0 1-4.84-1.33l-.35-.21-3.6.94.96-3.5-.23-.36a9.46 9.46 0 0 1-1.45-5.05c0-5.24 4.27-9.5 9.52-9.5 2.54 0 4.93.99 6.72 2.79a9.43 9.43 0 0 1 2.78 6.72c0 5.24-4.27 9.5-9.5 9.5Zm8.09-17.6A11.36 11.36 0 0 0 12.05.55C5.73.55.6 5.68.6 12c0 2.02.53 3.99 1.53 5.72L.5 23.5l5.92-1.55a11.4 11.4 0 0 0 5.62 1.43h.01c6.31 0 11.45-5.13 11.45-11.45 0-3.06-1.19-5.93-3.36-8.1Z" />
    </svg>
  );
}
