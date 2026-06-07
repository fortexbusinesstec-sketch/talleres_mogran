'use client';

import { VideoPlayer } from '@/components/ui/VideoPlayer';
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
    <>
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2
          id="mapa-title"
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-mogran-dark-text mb-6 text-balance"
        >
          Nuestra <span className="text-mogran-accent">ubicación</span>
        </h2>
        <p className="text-lg text-mogran-dark-text-secondary leading-relaxed">
          Visítanos en nuestro local. Coordinamos la visita para recibirte de la mejor manera.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-stretch mb-10">
        <div className="relative rounded-2xl overflow-hidden border border-mogran-accent/20 shadow-xl bg-mogran-dark-elevated">
          <VideoPlayer
            src={getVideo('talleresubicacion').source}
            alt="Video de la ubicación de Talleres Mogran"
            poster=""
            showControls
            preload="metadata"
            className="rounded-2xl ![aspect-ratio:auto] !h-full !min-h-0"
          />
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-mogran-accent/20 shadow-xl bg-mogran-dark-elevated min-h-[400px]">
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

          <div className="absolute top-3 left-3 right-3 z-10 bg-mogran-dark-base/90 backdrop-blur-sm rounded-xl border border-mogran-dark-border p-4 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-mogran-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <IconMapPin size={20} className="text-mogran-accent" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-mogran-dark-text">{ubicacion.distrito}</p>
                <p className="text-xs text-mogran-dark-text-secondary">{ubicacion.direccion}</p>
                <p className="text-xs text-mogran-dark-text-muted">{ubicacion.referencia}</p>
                <p className="text-xs text-mogran-dark-text-muted">{ubicacion.ciudad}</p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-3 left-3 right-3 z-10 flex gap-2">
            <a
              href={ubicacion.osmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 bg-mogran-dark-base/90 backdrop-blur-sm text-mogran-dark-text text-xs px-3 py-2 rounded-lg border border-mogran-dark-border hover:bg-mogran-dark-surface transition-colors"
            >
              <IconExternalLink size={14} strokeWidth={2} />
              Ver mapa completo
            </a>
            <a
              href={ubicacion.gmapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 bg-mogran-accent/90 backdrop-blur-sm text-mogran-dark-base text-xs px-3 py-2 rounded-lg border border-mogran-accent/30 hover:bg-mogran-accent transition-colors font-semibold"
            >
              <IconRoute size={14} strokeWidth={2} />
              Cómo llegar
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center mb-20">
        <div className="flex items-center gap-2">
          <IconBuilding size={16} className="text-mogran-accent flex-shrink-0" />
          <span className="text-sm text-mogran-dark-text-secondary">
            <strong className="text-mogran-dark-text">Distrito:</strong> {ubicacion.distrito}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <IconMapPin size={16} className="text-mogran-accent flex-shrink-0" />
          <span className="text-sm text-mogran-dark-text-secondary">
            <strong className="text-mogran-dark-text">Dirección:</strong> {ubicacion.direccion}
          </span>
        </div>
        <span className="text-xs text-mogran-dark-text-muted">Visitas previa coordinación</span>
      </div>
    </>
  );
}
