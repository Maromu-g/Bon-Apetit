import { BarraCategorias } from "@/components/barra-categorias";
import { Encabezado } from "@/components/encabezado";
import { IconoDeCategoria } from "@/components/iconos";
import { Pedido } from "@/components/pedido";
import { PiePagina } from "@/components/pie-pagina";
import { TarjetaProducto } from "@/components/tarjeta-producto";
import { categorias } from "@/lib/menu";

export default function Inicio() {
  return (
    <>
      <Encabezado />
      <BarraCategorias items={categorias.map(({ id, nombre, icono }) => ({ id, nombre, icono }))} />

      <main id="menu">
        {categorias.map((c) => (
          <section key={c.id} id={c.id} aria-labelledby={`t-${c.id}`} className="mx-auto max-w-5xl px-4 pt-9">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <IconoDeCategoria
                icono={c.icono}
                className="size-8 text-naranja drop-shadow-[0_0_8px_var(--naranja)]"
              />
              <h2 id={`t-${c.id}`} className="font-titulo text-3xl font-bold tracking-wide uppercase neon-dorado">
                {c.nombre}
              </h2>
              {c.ejemplo && (
                <span className="rounded-full border border-dashed border-naranja/60 px-2.5 py-0.5 text-xs text-naranja">
                  Productos y precios de ejemplo
                </span>
              )}
            </div>
            <div className="linea-neon mt-2.5 w-24" />
            {c.nota && <p className="mt-3 font-medium text-texto">{c.nota}</p>}

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {c.productos.map((p) => (
                <TarjetaProducto key={p.id} producto={p} />
              ))}
            </div>
          </section>
        ))}
      </main>

      <PiePagina />
      <Pedido />
    </>
  );
}
