'use client';

import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getVideo } from '@/lib/videos/registry';
import { IconMapPin, IconBuilding, IconRoute, IconExternalLink } from '@tabler/icons-react';

const ubicacion = {
  distrito: 'Lince',
  direccion: 'Av. Juan Pardo de Zela, Cdra 2',
  referencia: 'Entre la cdra 18 y 19 de la Av. Arequipa',
  ciudad: 'Lima, Perú',
  lat: -12.0780,
  lon: -77.0380,
  osmLink: 'https://www.openstreetmap.org/?mlat=-12.0780&mlon=-77.0380#map=17/-12.0780/-77.0380',
  gmapsLink: 'https://maps.app.goo.gl/2GMo25A9HVc9bk6n7',
};

export function MapaSection() {
  return (
    <section
      id="mapa"
      className="bg-[#14213D] section overflow-hidden border-b border-white/5"
      aria-labelledby="mapa-title"
    >
      <div className="container-section px-4 md:px-8">
        <SectionHeading
          kicker="08 / dónde estamos"
          theme="dark"
          className="mb-12"
          title={<span id="mapa-title">Nuestra <em>ubicación</em></span>}
          description="Visítanos en nuestro local. Coordinamos la visita para recibirte de la mejor manera."
        />

        <div className="grid lg:grid-cols-2 gap-8 items-stretch mb-10">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-white/5">
            <VideoPlayer
              src={getVideo('talleresubicacion').source}
              alt="Video de la ubicación de Talleres Mogran"
              poster=""
              showControls
              preload="metadata"
              className="rounded-2xl ![aspect-ratio:auto] !h-full !min-h-0"
            />
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-white/5 min-h-[400px]">
            <iframe
              src={`https://www.openstreetmap.org/export/embed.html?bbox=-77.0420%2C-12.0805%2C-77.0340%2C-12.0755&layer=mapnik&marker=${ubicacion.lat}%2C${ubicacion.lon}`}
              width="100%"
              height="100%"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de ubicación - Talleres Mogran"
            />

            <div className="absolute top-3 left-3 right-3 z-10 bg-mogran-secondary/90 backdrop-blur-sm rounded-xl border border-white/10 p-4 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-mogran-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <IconMapPin size={20} className="text-mogran-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-white">{ubicacion.distrito}</p>
                  <p className="text-xs text-white/70">{ubicacion.direccion}</p>
                  <p className="text-xs text-white/40">{ubicacion.referencia}</p>
                  <p className="text-xs text-white/40">{ubicacion.ciudad}</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-3 left-3 right-3 z-10 flex gap-2">
              <a
                href={ubicacion.osmLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 bg-mogran-secondary/90 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg border border-white/10 hover:bg-mogran-secondary transition-colors"
              >
                <IconExternalLink size={14} strokeWidth={2} />
                Ver mapa completo
              </a>
              <a
                href={ubicacion.gmapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 bg-mogran-primary/90 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg border border-mogran-primary/30 hover:bg-mogran-primary transition-colors font-semibold"
              >
                <IconRoute size={14} strokeWidth={2} />
                Cómo llegar
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center">
          <div className="flex items-center gap-2">
            <IconBuilding size={16} className="text-mogran-primary flex-shrink-0" />
            <span className="text-sm text-white/70">
              <strong className="text-white">Distrito:</strong> {ubicacion.distrito}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <IconMapPin size={16} className="text-mogran-primary flex-shrink-0" />
            <span className="text-sm text-white/70">
              <strong className="text-white">Dirección:</strong> {ubicacion.direccion}
            </span>
          </div>
          <span className="text-xs text-white/40">Visitas previa coordinación</span>
        </div>
      </div>
    </section>
  );
}
