import { negocio } from "@/datos";
import { enlaceWhatsApp } from "@/lib/whatsapp";
import { HorarioSemana } from "./horario-semana";
import { Mapa } from "./mapa";
import {
  IconoBilletera,
  IconoFacebook,
  IconoInstagram,
  IconoMoto,
  IconoReloj,
  IconoUbicacion,
  IconoWhatsApp,
} from "./iconos";

const ICONO_RED = { instagram: IconoInstagram, facebook: IconoFacebook } as const;

function Titulo({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 font-titulo text-xl font-bold tracking-wide uppercase neon-dorado">{children}</h2>;
}

export function PiePagina() {
  const { ubicacion, whatsapp } = negocio;
  const direccion = [ubicacion.direccion, ubicacion.barrio, ubicacion.ciudad].filter(Boolean).join(", ");

  return (
    <footer className="mt-12 border-t border-borde bg-tarjeta/40">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <section aria-labelledby="t-visitanos">
          <Titulo>
            <span id="t-visitanos">Visítanos</span>
          </Titulo>
          <p className="mb-3 flex items-start gap-2 text-suave">
            <IconoUbicacion className="mt-0.5 size-5 shrink-0 text-naranja" />
            <span>{direccion}</span>
          </p>
          <Mapa consulta={ubicacion.mapa} />
        </section>

        <section aria-labelledby="t-horario">
          <Titulo>
            <span id="t-horario" className="inline-flex items-center gap-2">
              <IconoReloj className="size-5 text-naranja" />
              Horario
            </span>
          </Titulo>
          <HorarioSemana />
        </section>

        <section aria-labelledby="t-pide">
          <Titulo>
            <span id="t-pide">Pide y síguenos</span>
          </Titulo>
          <ul className="space-y-3 text-suave">
            <li>
              <a
                href={enlaceWhatsApp()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 font-semibold text-whatsapp hover:underline"
              >
                <IconoWhatsApp className="size-5" />
                {whatsapp.visible}
              </a>
            </li>
            {negocio.domicilios.activo && (
              <li className="flex items-start gap-2">
                <IconoMoto className="mt-0.5 size-5 shrink-0 text-naranja" />
                {negocio.domicilios.texto}
              </li>
            )}
            <li className="flex items-start gap-2">
              <IconoBilletera className="mt-0.5 size-5 shrink-0 text-naranja" />
              {negocio.pagos.join(" · ")}
            </li>
            {negocio.redes.map((r) => {
              const Icono = ICONO_RED[r.red];
              const contenido = (
                <>
                  <Icono className="size-5 shrink-0 text-naranja" />
                  <span className="break-all">{r.usuario}</span>
                </>
              );
              return (
                <li key={r.red}>
                  {r.url ? (
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 hover:text-texto hover:underline"
                    >
                      {contenido}
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2">{contenido}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {/* pb-28: espacio final para que la barra del pedido / botón de WhatsApp no tapen el texto */}
      <p className="border-t border-borde px-4 pt-5 pb-28 text-center text-xs text-suave">
        {negocio.nombre} · {negocio.eslogan}
        {negocio.esMaqueta && " · Maqueta de demostración: algunos datos son de ejemplo"}
      </p>
    </footer>
  );
}
