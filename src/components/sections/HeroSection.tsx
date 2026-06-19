'use client';

import { motion } from 'motion/react';
import { IconArrowRight, IconArrowDown } from '@tabler/icons-react';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { Waveform } from '@/components/ui/Waveform';
import { Blob } from '@/components/ui/Blob';
import { getVideo } from '@/lib/videos/registry';

interface HeroSectionProps {
  fechaInicioCiclo?: string;
}

const reveal = {
  hidden: { opacity: 0, y: '110%' },
  show: (i: number) => ({
    opacity: 1,
    y: '0%',
    transition: { duration: 0.85, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

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

  const lines: { text: string; accent?: boolean; logoAfter?: boolean }[][] = [
    [{ text: 'Encuentra' }],
    [{ text: 'tu' }, { text: 'voz', accent: true, logoAfter: true }],
  ];
  let wordIndex = 0;

  return (
    <section
      id="hero"
      className="relative bg-mogran-secondary overflow-hidden min-h-[100svh] flex flex-col"
      aria-labelledby="hero-title"
    >
      {/* Single soft ambient blob — restrained */}
      <Blob color="#F81443" blur className="absolute -top-40 -left-40 w-[520px] h-[520px] opacity-[0.08]" />

      {/* Full-height video panel bleeding to the right edge */}
      <motion.div
        initial={{ opacity: 0, clipPath: 'inset(0 0 0 30%)' }}
        animate={{ opacity: 1, clipPath: 'inset(0 0 0 0%)' }}
        transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block absolute top-0 right-0 h-full w-[42vw] max-w-[760px] z-0"
      >
        <div className="relative h-full w-full overflow-hidden rounded-bl-[3rem]">
          <VideoPlayer
            src={video.source}
            alt={video.description}
            poster={video.poster}
            transcript={video.transcript}
            autoPlay
            muted
            loop
            showControls
            preload="metadata"
            className="!h-full ![aspect-ratio:auto] !rounded-none"
          />
          {/* soft fade into the content on the left edge */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-mogran-secondary to-transparent pointer-events-none" />
        </div>

        {/* Sticker badges on the panel */}
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute z-20 top-28 left-2 bg-white/[0.08] backdrop-blur-md border border-white/15 rounded-2xl shadow-xl px-3 py-2 -rotate-6 flex items-center gap-2 text-white"
        >
          <Waveform bars={4} className="h-4 w-6" color="bg-mogran-primary" />
          <span className="text-[11px] font-bold">En vivo</span>
        </motion.div>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute z-20 bottom-32 right-8 bg-mogran-secondary text-white rounded-2xl shadow-xl px-4 py-2.5 rotate-3"
        >
          <span className="text-[11px] font-bold uppercase tracking-wide">Presencial · Virtual</span>
        </motion.div>
      </motion.div>

      {/* Content — left aligned, fills the column */}
      <div className="relative z-10 flex-1 flex flex-col justify-center w-full pl-6 md:pl-12 lg:pl-16 xl:pl-24 pr-6 pt-28 pb-16 lg:pt-24">
        <div className="max-w-2xl lg:max-w-none lg:w-[52%]">

          {/* Kicker pill */}
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="inline-flex items-center gap-3 rounded-full bg-white/5 border border-white/10 px-4 py-2 mb-8"
          >
            <Waveform bars={5} className="h-4 w-7" color="bg-mogran-primary" />
            <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.18em] text-white/90">
              Escuela Mogran · 25 años
            </span>
          </motion.div>

          {/* SEO H1 */}
          <h1 id="hero-title" className="sr-only">
            Talleres de Oratoria Práctica para Vencer la Timidez y el Miedo a Hablar en Público
          </h1>

          {/* Huge kinetic headline */}
          <div aria-hidden="true" className="font-bold leading-[0.82] tracking-[-0.03em] text-white">
            {lines.map((line, li) => (
              <div key={li} className={`${li === 0 ? 'overflow-hidden py-[0.04em]' : 'relative py-[0.04em] mt-[0.08em]'}`}>
                <span className="flex flex-wrap items-end gap-x-[0.26em]">
                  {line.map((word, wi) => {
                    const i = wordIndex++;
                    return (
                      <span key={wi} className="relative inline-flex items-end gap-x-[0.26em] text-[clamp(3.5rem,8.5vw,8rem)]">
                        <motion.span
                          custom={i}
                          variants={reveal}
                          initial="hidden"
                          animate="show"
                          className="relative inline-block"
                        >
                          {word.accent && (
                            <motion.span
                              aria-hidden="true"
                              className="absolute -inset-x-2 inset-y-[16%] -z-0 rounded-[42%_58%_55%_45%/55%_45%_60%_40%] bg-mogran-primary"
                              initial={{ scaleX: 0, opacity: 0 }}
                              animate={{ scaleX: 1, opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.95, ease: 'easeOut' }}
                              style={{ originX: 0 }}
                            />
                          )}
                          <span className={`relative z-10 ${word.accent ? 'text-white px-3' : ''}`}>
                            {word.text}
                          </span>
                        </motion.span>
                        {word.logoAfter && (
                          <motion.span
                            custom={i + 0.5}
                            variants={reveal}
                            initial="hidden"
                            animate="show"
                            className="absolute left-full ml-4 md:ml-5 lg:ml-6 bottom-0 translate-y-[16%] w-[1.2em] h-[1.2em] flex-shrink-0"
                          >
                            <img 
                              src="/images/emblem-only.svg" 
                              alt="Profesor Mogran" 
                              className="h-full w-auto object-contain select-none"
                            />
                          </motion.span>
                        )}
                      </span>
                    );
                  })}
                </span>
              </div>
            ))}
          </div>

          {/* Supporting copy */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-8 max-w-md text-base md:text-lg text-white/70 leading-relaxed"
          >
            Talleres de oratoria práctica para vencer el miedo a hablar en público.
            El método adaptado para <span className="text-white font-semibold">niños, jóvenes y adultos</span> que prefieren escuchar antes de hablar.
          </motion.p>

          {fechaInicioCiclo && (
            <div className="mt-6 inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 max-w-md">
              <div className="w-1 h-10 bg-mogran-primary rounded-full flex-shrink-0" aria-hidden="true" />
              <p className="text-sm text-white/70">
                Próximo ciclo inicia el <strong className="text-white font-semibold">{fechaInicioCiclo}</strong>. Cupos limitados.
              </p>
            </div>
          )}

          {/* Mobile video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="lg:hidden relative mt-8 w-full max-w-[300px]"
          >
            <Blob color="#F81443" className="absolute -inset-5 -z-0 w-[calc(100%+2.5rem)] h-[calc(100%+2.5rem)] opacity-90" />
            <div className="relative z-10 rounded-[1.75rem] overflow-hidden border-4 border-white shadow-2xl shadow-mogran-secondary/20 rotate-2">
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
              />
            </div>
            <div className="absolute z-20 -top-3 -left-3 bg-white/[0.08] backdrop-blur-md border border-white/15 text-white rounded-2xl shadow-xl px-3 py-2 -rotate-6 flex items-center gap-2">
              <Waveform bars={4} className="h-4 w-6" color="bg-mogran-primary" />
              <span className="text-[11px] font-bold">En vivo</span>
            </div>
          </motion.div>

          {/* CTA + stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-10 flex flex-wrap items-center gap-7"
          >
            <button
              onClick={() => scrollTo('schedule')}
              className="group inline-flex items-center gap-2.5 pl-7 pr-5 py-4 text-base font-bold bg-mogran-primary text-white rounded-full shadow-lg shadow-mogran-primary/25 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(248,20,67,0.45)] hover:-translate-y-1 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-mogran-primary focus-visible:ring-offset-2 focus-visible:ring-offset-mogran-secondary"
            >
              Ver Talleres
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5">
                <IconArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
              </span>
            </button>

            <div className="flex items-center gap-5">
              <div>
                <div className="text-3xl font-bold text-white leading-none">25</div>
                <div className="text-[11px] text-white/50 mt-1">años</div>
              </div>
              <div className="w-px h-10 bg-white/15" aria-hidden="true" />
              <div>
                <div className="text-3xl font-bold text-white leading-none">500+</div>
                <div className="text-[11px] text-white/50 mt-1">alumnos</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom waveform + scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1 }}
        className="relative z-10 flex items-center gap-4 w-full pl-6 md:pl-12 lg:pl-16 xl:pl-24 pb-8"
      >
        <Waveform bars={36} className="h-6 w-40 md:w-56 opacity-40" color="bg-white/40" />
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-white/40"
          aria-hidden="true"
        >
          <IconArrowDown size={20} strokeWidth={2} />
        </motion.span>
      </motion.div>
    </section>
  );
}
