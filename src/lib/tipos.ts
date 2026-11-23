/** Tipos del archivo de datos (src/datos.ts). No hace falta tocar este archivo para cambiar el menú. */

/** Hora en formato 24 h, por ejemplo "17:00" o "22:30". */
export type Hora = `${number}:${number}`;

/** [abre, cierra] o null si ese día no abre. Si cierra después de medianoche, ej. ["18:00", "01:00"]. */
export type HorarioDia = readonly [Hora, Hora] | null;

export type Opcion = {
  /** Nombre de la variante (ej. "Personal"). Si se omite, la variante se identifica por su precio. */
  nombre?: string;
  precio: number;
};

export type Producto = {
  nombre: string;
  descripcion: string;
  /** Texto corto destacado bajo la descripción (opcional). */
  nota?: string;
  /** Foto real del plato en /public/fotos (opcional). Sin foto, la tarjeta se ve completa igual. */
  foto?: string;
} & ({ precio: number; opciones?: never } | { opciones: readonly Opcion[]; precio?: never });

export type IconoCategoria = "hamburguesa" | "perro" | "papas" | "picada" | "mazorca" | "bebida";

export type Categoria = {
  /** Identificador para el enlace (#hamburguesas). Solo minúsculas, sin tildes ni espacios. */
  id: string;
  nombre: string;
  icono: IconoCategoria;
  /** Frase que se muestra bajo el título de la categoría (opcional). */
  nota?: string;
  /** Marca la categoría como "datos de ejemplo" (se muestra una etiqueta). */
  ejemplo?: boolean;
  productos: readonly Producto[];
};

export type Colores = {
  fondo: string;
  tarjeta: string;
  borde: string;
  texto: string;
  textoSuave: string;
  dorado: string;
  naranja: string;
  rojoNeon: string;
  rojo: string;
  azul: string;
  whatsapp: string;
};
