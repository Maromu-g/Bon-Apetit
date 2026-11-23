import { negocio } from "@/datos";
import { precioCOP } from "./menu";

/** Enlace a WhatsApp con el mensaje ya escrito. */
export function enlaceWhatsApp(mensaje: string = mensajeGeneral()) {
  return `https://wa.me/${negocio.whatsapp.numero}?text=${encodeURIComponent(mensaje)}`;
}

export function mensajeGeneral() {
  return `${negocio.whatsapp.saludo} Quiero hacer un pedido.`;
}

export type LineaMensaje = { nombre: string; precio: number; cantidad: number };
export type Entrega = "domicilio" | "recoger";

/** Mensaje con todo el pedido: productos, variante, precio, total y forma de entrega. */
export function mensajePedido(lineas: LineaMensaje[], entrega: Entrega, nota: string) {
  const total = lineas.reduce((s, l) => s + l.precio * l.cantidad, 0);
  const partes = [
    `${negocio.whatsapp.saludo} Quiero hacer este pedido:`,
    "",
    ...lineas.map((l) => `• ${l.cantidad} x ${l.nombre} — ${precioCOP(l.precio * l.cantidad)}`),
    "",
    `Total: ${precioCOP(total)}`,
    entrega === "domicilio"
      ? "Entrega: a domicilio (¿me confirman el valor del domicilio?)"
      : "Entrega: paso a recogerlo",
  ];
  const notaLimpia = nota.trim();
  if (notaLimpia) partes.push(`Nota: ${notaLimpia}`);
  partes.push("", "Mi nombre:");
  if (entrega === "domicilio") partes.push("Mi dirección:");
  return partes.join("\n");
}
