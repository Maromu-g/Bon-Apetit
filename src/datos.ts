/**
 * ================================================================
 *  BON APPÉTIT · BOCADO PERFECTO — TODO EL CONTENIDO DEL MENÚ
 * ================================================================
 *
 *  Este es el ÚNICO archivo que hay que editar para cambiar el menú:
 *  negocio, colores, WhatsApp, horarios, ubicación, redes, categorías,
 *  productos y precios.
 *
 *  ✏️ Cambiar un precio: busca el producto y cambia el número.
 *     Se escribe sin puntos ni signo: 15000 = $15.000
 *  ✏️ Quitar un producto: borra su bloque { ... },
 *  ✏️ Reordenar: mueve el bloque de la categoría o del producto.
 *
 *  ⚠️ MAQUETA: los productos y precios de comida son REALES (copiados del PDF del negocio).
 *     Son DATOS DE EJEMPLO (inventados, por confirmar con el negocio):
 *     dirección, horario, domicilios, medios de pago, redes sociales y la categoría Bebidas.
 */
import type { Categoria, Colores, HorarioDia } from "@/lib/tipos";

// ─────────────────────────────────────────────────────────────
//  NEGOCIO
// ─────────────────────────────────────────────────────────────
export const negocio = {
  nombre: "Bon Appétit",
  eslogan: "Bocado Perfecto",
  /** Texto para Google y para la vista previa al compartir el enlace. */
  descripcion:
    "Menú de Bon Appétit · Bocado Perfecto: hamburguesas, perros, salchipapas, choripapas, picadas y mazorcadas. Haz tu pedido por WhatsApp.",

  /** true = muestra el aviso "Maqueta: algunos datos son de ejemplo". Poner false con los datos reales. */
  esMaqueta: true,

  whatsapp: {
    /** Número con indicativo de Colombia (57), solo dígitos. */
    numero: "573145874450",
    /** Cómo se ve el número en la página. */
    visible: "314 587 4450",
    /** Primera línea de todos los mensajes. */
    saludo: "¡Hola Bon Appétit!",
  },

  /**
   * Horario por día (hora de Colombia, formato 24 h). null = cerrado ese día.
   * Si cierra después de medianoche: ["18:00", "01:00"].
   * ⚠️ EJEMPLO — por confirmar con el negocio.
   */
  horario: {
    lunes: null,
    martes: ["17:00", "22:00"],
    miercoles: ["17:00", "22:00"],
    jueves: ["17:00", "22:00"],
    viernes: ["17:00", "23:30"],
    sabado: ["17:00", "23:30"],
    domingo: ["16:00", "22:00"],
  } satisfies Record<string, HorarioDia>,

  /** ⚠️ EJEMPLO — por confirmar con el negocio. */
  ubicacion: {
    direccion: "Calle 10 # 5-23",
    barrio: "Centro",
    ciudad: "",
    /**
     * Texto que se busca en Google Maps (ej. "Calle 10 # 5-23, Centro, Ciudad").
     * Vacío = se muestra un mapa ilustrado de ejemplo.
     */
    mapa: "",
  },

  /** ⚠️ EJEMPLO — por confirmar con el negocio. */
  domicilios: {
    activo: true,
    texto: "Domicilio con costo según el barrio",
  },

  /** ⚠️ EJEMPLO — por confirmar con el negocio. */
  pagos: ["Efectivo", "Nequi", "Daviplata"],

  /**
   * Redes sociales. Deja url en "" para mostrar el usuario sin enlace.
   * ⚠️ EJEMPLO — por confirmar con el negocio.
   */
  redes: [
    { red: "instagram", usuario: "@bonappetit.bocadoperfecto", url: "" },
    { red: "facebook", usuario: "Bon Appétit Bocado Perfecto", url: "" },
  ],
} as const;

// ─────────────────────────────────────────────────────────────
//  COLORES (salen del logo: neón rojo, naranja, dorado y azul)
// ─────────────────────────────────────────────────────────────
export const colores = {
  fondo: "#0D0A08", // negro cálido (el fondo del logo)
  tarjeta: "#1A1512", // tarjetas de producto
  borde: "#2E2520", // líneas finas
  texto: "#FFF6E5", // texto principal
  textoSuave: "#C9BBA8", // descripciones
  dorado: "#FDD828", // precios y títulos (letras del logo)
  naranja: "#FD8802", // categoría activa y barra del pedido (llamas)
  rojoNeon: "#F80401", // detalles decorativos (llamas)
  rojo: "#C81E14", // fondos con texto blanco (etiqueta "Cerrado")
  azul: "#4D6BFF", // contorno al navegar con teclado (aro del logo)
  whatsapp: "#25D366", // botones de WhatsApp (con texto oscuro)
} satisfies Colores;

// ─────────────────────────────────────────────────────────────
//  MENÚ — productos y precios (copiados del PDF del negocio)
// ─────────────────────────────────────────────────────────────
export const menu = [
  {
    id: "hamburguesas",
    nombre: "Hamburguesas",
    icono: "hamburguesa",
    nota: "¡Todas incluyen papas a la francesa!",
    productos: [
      {
        nombre: "Hamburguesa Clásica",
        descripcion:
          "Pan brioche, salsa de la casa, tomate fresco, lechuga, cebolla caramelizada, carne y doble queso gratinado.",
        precio: 15000,
      },
      {
        nombre: "Hamburguesa con Tocineta",
        descripcion:
          "Pan brioche, salsa de la casa, tomate fresco, lechuga, cebolla caramelizada, carne, tocineta crocante y doble queso gratinado.",
        precio: 18000,
      },
      {
        nombre: "Hamburguesa de Carne y Pollo Desmechado",
        descripcion:
          "Pan brioche, salsa de la casa, tomate, lechuga, cebolla caramelizada, carne, pollo desmechado y doble queso gratinado.",
        precio: 20000,
      },
      {
        nombre: "Hamburguesa Doble",
        descripcion:
          "Pan brioche, doble lechuga, doble tomate, doble carne, doble cebolla caramelizada y triple queso gratinado.",
        precio: 22000,
      },
      {
        nombre: "Hamburguesa Hawaiana",
        descripcion:
          "Pan, salsas de la casa, carne, doble queso gratinado, tomate, lechuga, cebolla caramelizada y piña caramelizada.",
        precio: 17000,
      },
      {
        nombre: "Hamburguesa Ranchera",
        descripcion:
          "Pan, salsas de la casa, carne, doble queso gratinado, tomate, cebolla caramelizada, lechuga, tocineta y chorizo.",
        precio: 20000,
      },
    ],
  },
  {
    id: "picadas",
    nombre: "Picadas",
    icono: "picada",
    productos: [
      {
        // El PDF no les pone nombre: se venden por precio ($20 y $30).
        nombre: "Picada",
        descripcion:
          "Papas a la francesa con salsa de la casa, lechuga, carne, pollo, salchicha, chorizo, tomate fresco, queso campesino rallado, aguacate y huevo de codorniz.",
        opciones: [{ precio: 20000 }, { precio: 30000 }],
      },
      {
        // En el PDF son las de $40 y $50 (llevan tocineta). Nombre sugerido, por confirmar.
        nombre: "Picada con Tocineta",
        descripcion:
          "Papas a la francesa con salsa de la casa, lechuga, carne, pollo, salchicha, chorizo, tocineta, tomate fresco, queso campesino rallado, aguacate y huevo de codorniz.",
        opciones: [{ precio: 40000 }, { precio: 50000 }],
      },
    ],
  },
  {
    id: "choripapas",
    nombre: "Choripapas",
    icono: "papas",
    productos: [
      {
        nombre: "Choripapa",
        descripcion:
          "Papas a la francesa, salsa de la casa, lechuga fresca, chorizo, tomate, cebolla, queso campesino rallado y huevos de codorniz.",
        nota: "Grande: el doble de sabor, ¡ideal para compartir!",
        opciones: [
          { nombre: "Personal", precio: 15000 },
          { nombre: "Grande", precio: 30000 },
        ],
      },
    ],
  },
  {
    id: "perros",
    nombre: "Perros",
    icono: "perro",
    nota: "¡Todos vienen con papas a la francesa!",
    productos: [
      {
        nombre: "Perro Clásico",
        descripcion: "Pan, salsas, salchicha americana, papa ripio, queso gratinado y papas a la francesa.",
        precio: 15000,
      },
      {
        nombre: "Perro Especial",
        descripcion:
          "Pan, salsas, salchicha americana, pollo desmechado, queso gratinado, tocineta y papas a la francesa.",
        precio: 18000,
      },
      {
        nombre: "Perro Ranchero",
        descripcion:
          "Pan, salsas, salchicha americana, pollo desmechado, maíz tierno, tocineta, queso gratinado, chorizo y papas a la francesa.",
        precio: 20000,
      },
    ],
  },
  {
    id: "salchipapas",
    nombre: "Salchipapas",
    icono: "papas",
    productos: [
      {
        nombre: "Salchipapa",
        descripcion:
          "Papas a la francesa, salchicha en rodajas, salsa de la casa, lechuga fresca, tomate, cebolla, queso campesino rallado y huevos de codorniz.",
        nota: "Grande: el doble de sabor, ¡ideal para compartir!",
        opciones: [
          { nombre: "Personal", precio: 15000 },
          { nombre: "Grande", precio: 30000 },
        ],
      },
    ],
  },
  {
    id: "mazorcadas",
    nombre: "Mazorcadas",
    icono: "mazorca",
    productos: [
      {
        // El PDF las vende por precio: "De 22K" y "De 30K".
        nombre: "Mazorcada",
        descripcion:
          "Papas a la francesa con salsas, lechuga, pollo desmechado, maíz dulce, tocineta en trozos, chorizo y queso gratinado.",
        opciones: [{ precio: 22000 }, { precio: 30000 }],
      },
    ],
  },
  {
    // ⚠️ EJEMPLO: el PDF no trae bebidas. Productos y precios inventados, por confirmar.
    id: "bebidas",
    nombre: "Bebidas",
    icono: "bebida",
    ejemplo: true,
    productos: [
      { nombre: "Gaseosa personal", descripcion: "Botella de 400 ml.", precio: 4000 },
      { nombre: "Gaseosa familiar", descripcion: "Botella de 1,5 litros.", precio: 8000 },
      { nombre: "Jugo natural", descripcion: "En agua o en leche.", precio: 6000 },
      { nombre: "Agua", descripcion: "Botella de 600 ml.", precio: 3000 },
    ],
  },
] as const satisfies readonly Categoria[];
