import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import { Inter, Oswald } from "next/font/google";
import { colores, negocio } from "@/datos";
import "./globals.css";

// Dos familias: Oswald (títulos y precios, gruesa y angosta) e Inter (textos, muy legible).
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const titulo = `${negocio.nombre} · ${negocio.eslogan} | Menú y pedidos por WhatsApp`;

export const metadata: Metadata = {
  title: titulo,
  description: negocio.descripcion,
  applicationName: negocio.nombre,
  // Mientras sea maqueta, que Google no la muestre.
  robots: negocio.esMaqueta ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: colores.fondo,
  colorScheme: "dark",
};

/** Paleta de src/datos.ts → variables CSS (las usa globals.css). */
const paleta = {
  "--fondo": colores.fondo,
  "--tarjeta": colores.tarjeta,
  "--borde": colores.borde,
  "--texto": colores.texto,
  "--texto-suave": colores.textoSuave,
  "--dorado": colores.dorado,
  "--naranja": colores.naranja,
  "--rojo-neon": colores.rojoNeon,
  "--rojo": colores.rojo,
  "--azul": colores.azul,
  "--whatsapp": colores.whatsapp,
} as CSSProperties;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO" style={paleta} className={`${oswald.variable} ${inter.variable} antialiased`}>
      <body className="min-h-dvh font-sans">{children}</body>
    </html>
  );
}
