"use client";

import { useId, useRef, useState } from "react";
import { negocio } from "@/datos";
import { precioCOP } from "@/lib/menu";
import { lineasDe, resumen, usePedido, vaciar } from "@/lib/pedido";
import { enlaceWhatsApp, mensajePedido, type Entrega } from "@/lib/whatsapp";
import { ControlCantidad } from "./control-cantidad";
import { IconoBolsa, IconoCerrar, IconoWhatsApp } from "./iconos";

/**
 * - Sin productos: botón flotante de WhatsApp (mensaje general).
 * - Con productos: barra inferior "Ver pedido · total" que abre el resumen y envía TODO en un solo mensaje.
 */
export function Pedido() {
  const pedido = usePedido();
  const lineas = lineasDe(pedido);
  const { cantidad, total } = resumen(lineas);

  const dialogo = useRef<HTMLDialogElement>(null);
  const tituloId = useId();
  const notaId = useId();
  const [entrega, setEntrega] = useState<Entrega>(negocio.domicilios.activo ? "domicilio" : "recoger");
  const [nota, setNota] = useState("");

  const abrir = () => dialogo.current?.showModal();
  const cerrar = () => dialogo.current?.close();

  return (
    <>
      {/* Anuncio para lectores de pantalla cada vez que cambia el pedido */}
      <p className="sr-only" aria-live="polite">
        {cantidad > 0 ? `Pedido: ${cantidad} productos, total ${precioCOP(total)}` : ""}
      </p>

      {cantidad > 0 ? (
        <div className="fixed inset-x-0 bottom-0 z-30 px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={abrir}
            className="mx-auto flex h-14 w-full max-w-md items-center justify-between gap-3 rounded-2xl bg-naranja px-4 text-fondo shadow-[0_10px_40px_-6px_rgba(253,136,2,0.6)] transition-transform active:scale-[0.98]"
          >
            <span className="flex items-center gap-2.5 font-semibold">
              <span key={cantidad} className="rebote relative">
                <IconoBolsa className="size-6" />
                <span className="absolute -top-1.5 -right-2 flex size-5 items-center justify-center rounded-full bg-fondo text-[0.7rem] font-bold text-naranja">
                  {cantidad}
                </span>
              </span>
              Ver pedido
            </span>
            <span className="font-titulo text-xl font-bold tracking-wide">{precioCOP(total)}</span>
          </button>
        </div>
      ) : (
        <a
          href={enlaceWhatsApp()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escríbenos por WhatsApp (se abre en otra pestaña)"
          className="fixed right-4 bottom-4 z-30 flex items-center gap-2 rounded-full bg-whatsapp p-3.5 text-fondo shadow-[0_8px_30px_rgba(37,211,102,0.4)] transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
        >
          <IconoWhatsApp className="size-7" />
          <span className="hidden pr-1 text-sm font-semibold lg:inline">Pide por WhatsApp</span>
        </a>
      )}

      <dialog
        ref={dialogo}
        aria-labelledby={tituloId}
        className="hoja"
        onClick={(e) => {
          if (e.target === e.currentTarget) cerrar(); // clic en el fondo oscuro
        }}
      >
        <div className="flex max-h-[88dvh] flex-col">
          <div className="flex items-center justify-between border-b border-borde px-5 py-3.5">
            <h2 id={tituloId} className="font-titulo text-2xl font-bold tracking-wide uppercase neon-dorado">
              Tu pedido
            </h2>
            <button
              type="button"
              onClick={cerrar}
              aria-label="Cerrar"
              className="flex size-11 items-center justify-center rounded-full text-suave transition-colors hover:bg-white/5 hover:text-texto"
            >
              <IconoCerrar className="size-5" />
            </button>
          </div>

          {lineas.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-suave">Tu pedido está vacío.</p>
              <button
                type="button"
                onClick={cerrar}
                className="mt-4 h-11 rounded-full border border-dorado/70 px-5 font-semibold text-dorado"
              >
                Ver el menú
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-5 py-2">
                <ul className="divide-y divide-borde">
                  {lineas.map((l) => (
                    <li key={l.clave} className="flex items-center gap-3 py-3">
                      <div className="min-w-0 flex-1">
                        <p className="leading-snug font-medium">{l.nombre}</p>
                        <p className="text-sm text-suave">
                          {precioCOP(l.precio)}
                          {l.cantidad > 1 && (
                            <>
                              {" "}
                              · <span className="text-dorado">{precioCOP(l.precio * l.cantidad)}</span>
                            </>
                          )}
                        </p>
                      </div>
                      <ControlCantidad clave={l.clave} nombre={l.nombre} />
                    </li>
                  ))}
                </ul>

                {negocio.domicilios.activo && (
                  <fieldset className="mt-3">
                    <legend className="mb-2 text-sm font-medium text-suave">¿Cómo lo quieres?</legend>
                    <div className="grid grid-cols-2 gap-2">
                      {(
                        [
                          ["domicilio", "A domicilio"],
                          ["recoger", "Paso a recogerlo"],
                        ] as const
                      ).map(([valor, texto]) => (
                        <label
                          key={valor}
                          className="flex h-11 cursor-pointer items-center justify-center rounded-xl border border-borde text-sm font-semibold text-suave transition-colors has-[:checked]:border-naranja has-[:checked]:bg-naranja/15 has-[:checked]:text-texto has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-azul"
                        >
                          <input
                            type="radio"
                            name="entrega"
                            value={valor}
                            checked={entrega === valor}
                            onChange={() => setEntrega(valor)}
                            className="sr-only"
                          />
                          {texto}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}

                <label htmlFor={notaId} className="mt-4 mb-1.5 block text-sm font-medium text-suave">
                  Indicaciones (opcional)
                </label>
                <textarea
                  id={notaId}
                  value={nota}
                  onChange={(e) => setNota(e.target.value)}
                  rows={2}
                  maxLength={200}
                  placeholder="Ej.: sin cebolla, salsas aparte"
                  className="w-full resize-none rounded-xl border border-borde bg-fondo px-3 py-2.5 text-base text-texto placeholder:text-suave/70 focus:border-naranja focus:outline-none"
                />
              </div>

              <div className="border-t border-borde px-5 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <div className="flex items-baseline justify-between">
                  <span className="text-suave">Total ({cantidad} {cantidad === 1 ? "producto" : "productos"})</span>
                  <span className="font-titulo text-3xl font-bold tracking-wide text-dorado">{precioCOP(total)}</span>
                </div>
                {entrega === "domicilio" && (
                  <p className="mt-0.5 text-xs text-suave">El valor del domicilio se confirma por WhatsApp.</p>
                )}
                <a
                  href={enlaceWhatsApp(
                    mensajePedido(
                      lineas.map((l) => ({ nombre: l.nombre, precio: l.precio, cantidad: l.cantidad })),
                      entrega,
                      nota
                    )
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex h-13 items-center justify-center gap-2.5 rounded-full bg-whatsapp text-base font-bold text-fondo shadow-[0_8px_28px_-6px_rgba(37,211,102,0.55)] transition-transform active:scale-[0.98]"
                >
                  <IconoWhatsApp className="size-6" />
                  Enviar pedido por WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => {
                    vaciar();
                    setNota("");
                    cerrar();
                  }}
                  className="mx-auto mt-2 block min-h-11 px-4 text-sm text-suave underline-offset-4 hover:text-texto hover:underline"
                >
                  Vaciar pedido
                </button>
              </div>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
