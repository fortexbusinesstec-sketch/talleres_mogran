'use client';

import { IconArrowRight } from '@tabler/icons-react';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { getVideo } from '@/lib/videos/registry';

interface HeroSectionProps {
  fechaInicioCiclo?: string;
}

export function HeroSection({ fechaInicioCiclo }: HeroSectionProps) {
  const video = getVideo('hero');

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative bg-mogran-dark-base overflow-hidden min-h-screen flex"
      aria-labelledby="hero-title"
    >
      {/* Background layers */}
      <div className="absolute inset-0 dot-grid opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 radial-glow" aria-hidden="true" />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mogran-accent/30 to-transparent"
        aria-hidden="true"
      />

      <div className="container-section mx-auto max-w-7xl relative z-10 pt-24 md:pt-28 pb-16 md:pb-20 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left column - Content */}
          <div className="space-y-7 md:space-y-8">

            {/* Kicker / Ceja superior */}
            <h3 className="inline-flex items-center gap-3 text-xs md:text-sm font-semibold text-mogran-dark-text tracking-[0.25em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-mogran-accent flex-shrink-0" aria-hidden="true" />
              ESCUELA MOGRAN · 25 AÑOS FORMANDO NUEVAS VOCES
            </h3>

            {/* H1 */}
            <h1
              id="hero-title"
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.25] tracking-[-0.02em] text-balance"
            >
              Talleres de <span className="text-mogran-accent">Oratoria</span> Práctica para <span className="text-mogran-accent">Vencer la Timidez</span> y el Miedo a Hablar en Público
            </h1>

            {/* H2 - Premisa */}
            <h2 className="text-base md:text-lg text-mogran-dark-text-secondary leading-relaxed max-w-xl">
              El único método adaptado para niños, jóvenes y adultos que prefieren{' '}
              <span className="text-white font-semibold">escuchar antes de hablar</span>.
            </h2>

            {/* Body */}
            <p className="text-sm md:text-base text-mogran-dark-text-secondary/80 leading-relaxed max-w-lg">
              Ya sea para participar con seguridad en el colegio, destacar en la universidad o liderar en el ámbito profesional. Te ayudamos a encontrar tu propia voz, perder los nervios y expresarte con confianza — a tu propio ritmo.
            </p>

            {/* Date urgency (optional) */}
            {fechaInicioCiclo && (
              <div className="inline-flex items-center gap-3 px-4 py-3 rounded-lg bg-mogran-dark-elevated/80 border border-mogran-dark-border">
                <div className="w-1 h-10 bg-mogran-accent rounded-full flex-shrink-0" aria-hidden="true" />
                <p className="text-sm md:text-base text-mogran-dark-text-secondary">
                  Próximo ciclo inicia el{' '}
                  <strong className="text-white font-semibold">{fechaInicioCiclo}</strong>.
                  Inscripciones abiertas hasta agotar cupos.
                </p>
              </div>
            )}

            {/* Single CTA */}
            <div className="pt-3">
              <button
                onClick={() => scrollTo('schedule')}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-bold bg-mogran-accent text-black rounded-xl shadow-lg shadow-mogran-accent/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(115,211,0,0.4)] hover:-translate-y-1 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-mogran-accent focus-visible:ring-offset-2 focus-visible:ring-offset-mogran-dark-base"
              >
                <IconArrowRight
                  size={18}
                  strokeWidth={2.5}
                  className="text-black transition-all duration-300 group-hover:rotate-[360deg] group-hover:scale-110"
                  aria-hidden="true"
                />
                Ver Talleres y Promociones Disponibles →
              </button>
            </div>

          </div>

          {/* Right column - Video */}
          <div className="relative flex flex-col items-center lg:items-end gap-4">

            {/* Video container - clean border, no glow */}
            <div className="relative w-full max-w-[280px] md:max-w-xs lg:max-w-sm">
              <div className="relative rounded-2xl overflow-hidden border border-mogran-accent/20 shadow-xl bg-mogran-dark-elevated">
                <VideoPlayer
                  src={video.source}
                  alt={video.description}
                  poster={video.poster}
                  transcript={video.transcript}
                  aspectRatio={video.aspectRatio}
                  autoPlay
                  muted
                  loop
                  showControls
                  preload="metadata"
                  className="rounded-2xl"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-mogran-dark-base pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
