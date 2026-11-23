import { menu } from "@/datos";
import type { IconoCategoria } from "./tipos";

/** 15000 → "$15.000" (igual que en el menú impreso). */
export function precioCOP(valor: number) {
  return "$" + String(Math.round(valor)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function slug(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export type OpcionMenu = {
  /** Clave única en el pedido: "choripapa/grande", "picada/20000". */
  clave: string;
  /** "Personal", "Grande"… o null si la variante solo se distingue por el precio. */
  nombre: string | null;
  precio: number;
};

export type ProductoMenu = {
  id: string;
  nombre: string;
  descripcion: string;
  nota?: string;
  foto?: string;
  opciones: OpcionMenu[];
};

export type CategoriaMenu = {
  id: string;
  nombre: string;
  icono: IconoCategoria;
  nota?: string;
  ejemplo: boolean;
  productos: ProductoMenu[];
};

/** El menú de src/datos.ts con identificadores listos para el pedido. */
export const categorias: CategoriaMenu[] = menu.map((c) => ({
  id: c.id,
  nombre: c.nombre,
  icono: c.icono,
  nota: "nota" in c ? c.nota : undefined,
  ejemplo: "ejemplo" in c ? c.ejemplo : false,
  productos: c.productos.map((p) => {
    const id = slug(p.nombre);
    const opciones =
      "opciones" in p
        ? p.opciones.map((o) => {
            const nombre = "nombre" in o ? o.nombre : null;
            return { clave: `${id}/${nombre ? slug(nombre) : o.precio}`, nombre, precio: o.precio };
          })
        : [{ clave: id, nombre: null, precio: p.precio }];
    return {
      id,
      nombre: p.nombre,
      descripcion: p.descripcion,
      nota: "nota" in p ? p.nota : undefined,
      foto: "foto" in p ? (p.foto as string) : undefined,
      opciones,
    };
  }),
}));

/** Busca un producto del pedido por su clave (si el menú cambió y ya no existe → undefined). */
const porClave = new Map(
  categorias.flatMap((c) => c.productos.flatMap((p) => p.opciones.map((o) => [o.clave, { producto: p, opcion: o }] as const)))
);

export function buscarOpcion(clave: string) {
  return porClave.get(clave);
}

/** Nombre completo para el pedido: "Choripapa (Grande)" o "Picada de $20.000". */
export function nombreEnPedido(producto: ProductoMenu, opcion: OpcionMenu) {
  if (producto.opciones.length === 1) return producto.nombre;
  return opcion.nombre ? `${producto.nombre} (${opcion.nombre})` : `${producto.nombre} de ${precioCOP(opcion.precio)}`;
}
