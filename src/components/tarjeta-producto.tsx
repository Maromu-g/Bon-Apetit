import Image from "next/image";
import { nombreEnPedido, precioCOP, type ProductoMenu } from "@/lib/menu";
import { ControlCantidad } from "./control-cantidad";

export function TarjetaProducto({ producto }: { producto: ProductoMenu }) {
  const { nombre, descripcion, nota, foto, opciones } = producto;
  const unica = opciones.length === 1;

  return (
    <article className="flex flex-col rounded-2xl border border-borde bg-tarjeta p-4 transition-colors hover:border-naranja/40">
      {foto && (
        // Solo fotos reales del plato. Next las sirve en WebP/AVIF y las carga al acercarse (lazy).
        <Image
          src={foto}
          alt={nombre}
          width={640}
          height={480}
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
          className="mb-3 aspect-[4/3] w-full rounded-xl object-cover"
        />
      )}

      <h3 className="font-titulo text-xl leading-tight font-semibold tracking-wide text-texto uppercase">{nombre}</h3>
      <p className="mt-1.5 text-[0.94rem] leading-relaxed text-suave">{descripcion}</p>
      {nota && <p className="mt-2 text-sm font-medium text-naranja">{nota}</p>}

      <div className="mt-auto pt-4">
        {unica ? (
          <div className="flex items-center justify-between gap-3">
            <p className="font-titulo text-3xl font-bold tracking-wide text-dorado">{precioCOP(opciones[0].precio)}</p>
            <ControlCantidad clave={opciones[0].clave} nombre={nombre} />
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-2">
            {opciones.map((o) => (
              <li key={o.clave} className="flex flex-col gap-2 rounded-xl border border-borde bg-fondo/50 p-2.5">
                <p className="px-1 leading-none">
                  {o.nombre && (
                    <span className="mb-1 block font-titulo text-xs tracking-[0.15em] text-suave uppercase">{o.nombre}</span>
                  )}
                  <span className="font-titulo text-2xl font-bold tracking-wide text-dorado">{precioCOP(o.precio)}</span>
                </p>
                <ControlCantidad clave={o.clave} nombre={nombreEnPedido(producto, o)} ancho />
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
