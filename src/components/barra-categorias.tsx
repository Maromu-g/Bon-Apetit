"use client";

import { useEffect, useRef, useState } from "react";
import type { IconoCategoria } from "@/lib/tipos";
import { IconoDeCategoria } from "./iconos";

type Item = { id: string; nombre: string; icono: IconoCategoria };

/**
 * Barra fija con las categorías. Funciona sin JavaScript (son enlaces a #seccion);
 * con JavaScript además resalta la categoría que se está viendo.
 */
export function BarraCategorias({ items }: { items: Item[] }) {
  const [activa, setActiva] = useState(items[0]?.id);
  const barra = useRef<HTMLElement>(null);
  const lista = useRef<HTMLUListElement>(null);
  // Tras tocar una categoría, ignorar el resaltado por scroll hasta que termine el desplazamiento.
  const bloqueo = useRef(0);

  useEffect(() => {
    let cuadro = 0;
    const calcular = () => {
      cuadro = 0;
      if (Date.now() < bloqueo.current) return;
      const limite = (barra.current?.offsetHeight ?? 64) + 24;
      let actual = items[0]?.id;
      for (const { id } of items) {
        const s = document.getElementById(id);
        if (s && s.getBoundingClientRect().top <= limite) actual = id;
      }
      // Al llegar al final de la página, la última categoría.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        actual = items[items.length - 1]?.id;
      }
      setActiva(actual);
    };
    const alDesplazar = () => {
      if (!cuadro) cuadro = requestAnimationFrame(calcular);
    };
    alDesplazar();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    window.addEventListener("resize", alDesplazar);
    return () => {
      window.removeEventListener("scroll", alDesplazar);
      window.removeEventListener("resize", alDesplazar);
      cancelAnimationFrame(cuadro);
    };
  }, [items]);

  // Mantener visible la categoría activa dentro de la barra (desplazamiento horizontal).
  useEffect(() => {
    const ul = lista.current;
    const enlace = ul?.querySelector<HTMLElement>(`[data-id="${activa}"]`);
    if (!ul || !enlace) return;
    const destino = enlace.offsetLeft - ul.clientWidth / 2 + enlace.offsetWidth / 2;
    ul.scrollTo({ left: destino, behavior: "smooth" });
  }, [activa]);

  return (
    <nav
      ref={barra}
      aria-label="Categorías del menú"
      className="sticky top-0 z-20 border-y border-borde bg-fondo/90 backdrop-blur-md"
    >
      <ul ref={lista} className="sin-scrollbar mx-auto flex max-w-5xl gap-2 overflow-x-auto px-4 py-3 sm:justify-center">
        {items.map((c) => {
          const esActiva = c.id === activa;
          return (
            <li key={c.id} className="shrink-0">
              <a
                href={`#${c.id}`}
                data-id={c.id}
                aria-current={esActiva ? "true" : undefined}
                onClick={() => {
                  setActiva(c.id);
                  bloqueo.current = Date.now() + 900;
                }}
                className={
                  "inline-flex min-h-10 items-center gap-1.5 rounded-full border px-4 font-titulo text-[0.95rem] font-medium tracking-wide uppercase transition-colors " +
                  (esActiva
                    ? "border-naranja bg-naranja text-fondo shadow-[0_0_16px_-2px_var(--naranja)]"
                    : "border-borde bg-tarjeta text-suave hover:border-naranja/60 hover:text-texto")
                }
              >
                <IconoDeCategoria icono={c.icono} className="size-[1.1rem]" />
                {c.nombre}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
