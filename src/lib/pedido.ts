"use client";

import { useSyncExternalStore } from "react";
import { buscarOpcion, nombreEnPedido } from "./menu";

/**
 * Pedido guardado en el navegador (localStorage). Solo se guarda la clave del producto y la cantidad:
 * el nombre y el precio salen siempre de src/datos.ts, así un cambio de precio se refleja al instante.
 */
type Guardado = Record<string, number>;

const CLAVE = "bonappetit-pedido";
const MAX = 20;
const VACIO: Guardado = {};

let estado: Guardado = VACIO;
let cargado = false;
const oyentes = new Set<() => void>();

function cargar() {
  if (cargado) return;
  cargado = true;
  try {
    const crudo = JSON.parse(localStorage.getItem(CLAVE) ?? "{}");
    const limpio: Guardado = {};
    for (const [k, v] of Object.entries(crudo)) {
      if (buscarOpcion(k) && typeof v === "number" && v > 0) limpio[k] = Math.min(Math.floor(v), MAX);
    }
    estado = limpio;
  } catch {
    estado = VACIO;
  }
}

function guardar(nuevo: Guardado) {
  estado = nuevo;
  try {
    localStorage.setItem(CLAVE, JSON.stringify(nuevo));
  } catch {
    /* navegador sin almacenamiento: el pedido funciona igual mientras la página esté abierta */
  }
  oyentes.forEach((f) => f());
}

function suscribir(f: () => void) {
  oyentes.add(f);
  // Mantener el pedido sincronizado entre pestañas.
  const alCambiar = (e: StorageEvent) => {
    if (e.key === CLAVE) {
      cargado = false;
      cargar();
      f();
    }
  };
  window.addEventListener("storage", alCambiar);
  return () => {
    oyentes.delete(f);
    window.removeEventListener("storage", alCambiar);
  };
}

export function cambiarCantidad(clave: string, cantidad: number) {
  cargar();
  const nuevo = { ...estado };
  if (cantidad <= 0) delete nuevo[clave];
  else nuevo[clave] = Math.min(cantidad, MAX);
  guardar(nuevo);
}

export function agregar(clave: string) {
  cargar();
  cambiarCantidad(clave, (estado[clave] ?? 0) + 1);
}

export function vaciar() {
  guardar({});
}

/** Cantidades del pedido. En el servidor (y al cargar) devuelve un pedido vacío. */
export function usePedido(): Guardado {
  return useSyncExternalStore(
    suscribir,
    () => {
      cargar();
      return estado;
    },
    () => VACIO
  );
}

export type LineaPedido = { clave: string; nombre: string; precio: number; cantidad: number };

export function lineasDe(pedido: Guardado): LineaPedido[] {
  return Object.entries(pedido).flatMap(([clave, cantidad]) => {
    const r = buscarOpcion(clave);
    return r ? [{ clave, nombre: nombreEnPedido(r.producto, r.opcion), precio: r.opcion.precio, cantidad }] : [];
  });
}

export function resumen(lineas: LineaPedido[]) {
  return {
    cantidad: lineas.reduce((s, l) => s + l.cantidad, 0),
    total: lineas.reduce((s, l) => s + l.precio * l.cantidad, 0),
  };
}
