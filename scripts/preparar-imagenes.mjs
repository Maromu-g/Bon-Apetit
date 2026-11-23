/**
 * Prepara las imágenes del sitio a partir del logo original (material-original/, no se sube a GitHub).
 *
 *   npm run imagenes
 *
 * - src/assets/logo.png   → logo con fondo transparente (Next lo sirve en WebP/AVIF).
 * - src/app/icon.png      → ícono de la pestaña del navegador.
 * - src/app/apple-icon.png→ ícono al guardar la página en la pantalla de inicio del celular.
 *
 * El logo es un neón sobre negro: cada píxel se vuelve transparente según su brillo
 * (como una luz), así se funde con cualquier fondo oscuro sin dejar un cuadro negro.
 */
import sharp from "sharp";
import { existsSync } from "node:fs";

const ORIGEN = "material-original/Logo neón Bocado Perfecto.png";

if (!existsSync(ORIGEN)) {
  console.error(`No encuentro ${ORIGEN}. Copia ahí el logo original.`);
  process.exit(1);
}

/** Convierte el negro en transparencia (alfa = canal más brillante). */
async function neonSinFondo(ancho) {
  const { data, info } = await sharp(ORIGEN)
    .removeAlpha()
    .resize(ancho)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const salida = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const a = Math.max(r, g, b);
    if (a < 6) continue; // negro puro → transparente
    const k = 255 / a;
    salida[j] = Math.min(255, Math.round(r * k));
    salida[j + 1] = Math.min(255, Math.round(g * k));
    salida[j + 2] = Math.min(255, Math.round(b * k));
    salida[j + 3] = a;
  }
  return sharp(salida, { raw: { width: info.width, height: info.height, channels: 4 } });
}

// Logo del encabezado (se muestra a ~180px; 640px cubre pantallas de alta densidad).
await (await neonSinFondo(640)).png({ compressionLevel: 9 }).toFile("src/assets/logo.png");

// Íconos: el logo completo sobre negro, cuadrado.
const cuadrado = async (lado, archivo) => {
  const logo = await sharp(ORIGEN).resize(lado, lado, { fit: "contain", background: "#000000" }).toBuffer();
  await sharp({ create: { width: lado, height: lado, channels: 3, background: "#000000" } })
    .composite([{ input: logo }])
    .png({ compressionLevel: 9 })
    .toFile(archivo);
};
await cuadrado(192, "src/app/icon.png");
await cuadrado(180, "src/app/apple-icon.png");

console.log("Listo: src/assets/logo.png, src/app/icon.png, src/app/apple-icon.png");
