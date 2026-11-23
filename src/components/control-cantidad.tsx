"use client";

import { agregar, cambiarCantidad, usePedido } from "@/lib/pedido";
import { IconoMas, IconoMenos } from "./iconos";

/**
 * Botón "Agregar" que, cuando el producto ya está en el pedido, se convierte en [ − 2 + ].
 * `ancho` = ocupa todo el espacio disponible (en las variantes de un producto).
 */
export function ControlCantidad({ clave, nombre, ancho = false }: { clave: string; nombre: string; ancho?: boolean }) {
  const pedido = usePedido();
  const cantidad = pedido[clave] ?? 0;

  if (cantidad === 0) {
    return (
      <button
        type="button"
        onClick={() => agregar(clave)}
        aria-label={`Agregar ${nombre} al pedido`}
        className={
          "inline-flex h-11 items-center justify-center gap-1.5 rounded-full border border-dorado/70 px-4 text-sm font-semibold text-dorado transition-colors hover:bg-dorado hover:text-fondo active:scale-[0.97] " +
          (ancho ? "w-full" : "")
        }
      >
        <IconoMas className="size-4" />
        Agregar
      </button>
    );
  }

  return (
    <div
      className={
        "inline-flex h-11 items-center justify-between rounded-full bg-dorado text-fondo " + (ancho ? "w-full" : "w-[7.5rem]")
      }
    >
      <button
        type="button"
        onClick={() => cambiarCantidad(clave, cantidad - 1)}
        aria-label={`Quitar una unidad de ${nombre}`}
        className="flex size-11 items-center justify-center rounded-full transition-colors hover:bg-black/10"
      >
        <IconoMenos className="size-4" />
      </button>
      <span className="font-titulo text-lg font-bold tabular-nums">
        {cantidad}
        <span className="sr-only"> en el pedido</span>
      </span>
      <button
        type="button"
        onClick={() => agregar(clave)}
        aria-label={`Agregar una unidad más de ${nombre}`}
        className="flex size-11 items-center justify-center rounded-full transition-colors hover:bg-black/10"
      >
        <IconoMas className="size-4" />
      </button>
    </div>
  );
}
