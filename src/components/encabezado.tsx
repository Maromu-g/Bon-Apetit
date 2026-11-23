import Image from "next/image";
import { negocio } from "@/datos";
import logo from "@/assets/logo.png";
import { enlaceWhatsApp } from "@/lib/whatsapp";
import { EstadoHorario } from "./estado-horario";
import { IconoBilletera, IconoMoto, IconoWhatsApp } from "./iconos";

export function Encabezado() {
  return (
    <header className="resplandor relative overflow-hidden">
      {negocio.esMaqueta && (
        <p className="border-b border-dashed border-naranja/40 bg-naranja/10 px-4 py-1.5 text-center text-xs text-suave">
          <strong className="font-semibold text-naranja">Maqueta</strong> · Dirección, horario, domicilios, pagos, redes
          y bebidas son datos de ejemplo.
        </p>
      )}

      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 pt-6 pb-7 text-center sm:pt-8">
        <Image
          src={logo}
          alt={`Logo de ${negocio.nombre} · ${negocio.eslogan}`}
          sizes="(min-width: 640px) 208px, 176px"
          loading="eager"
          fetchPriority="high"
          className="h-auto w-44 sm:w-52"
        />

        <h1 className="mt-3 font-titulo text-4xl font-bold tracking-wide uppercase neon-dorado sm:text-5xl">
          {negocio.nombre}
        </h1>
        <p className="mt-1 font-titulo text-sm tracking-[0.35em] text-suave uppercase">{negocio.eslogan}</p>

        <EstadoHorario />

        <a
          href={enlaceWhatsApp()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-whatsapp px-6 text-base font-semibold text-fondo shadow-[0_8px_28px_-6px_rgba(37,211,102,0.55)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          <IconoWhatsApp className="size-6" />
          Pedir por WhatsApp
        </a>

        <ul className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-sm text-suave">
          {negocio.domicilios.activo && (
            <li className="inline-flex items-center gap-1.5">
              <IconoMoto className="size-4 text-naranja" />
              Domicilios
            </li>
          )}
          <li className="inline-flex items-center gap-1.5">
            <IconoBilletera className="size-4 text-naranja" />
            {negocio.pagos.join(" · ")}
          </li>
        </ul>
      </div>
    </header>
  );
}
