'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  IconMicrophone, IconTheater,
  IconBodyScan, IconPresentationAnalytics,
  IconBulb, IconHeartHandshake,
} from '@tabler/icons-react';

const techniques = [
  {
    num: '01',
    label: 'Locución',
    Icon: IconMicrophone,
    desc: 'Proyecta una voz clara, modulada y con autoridad en cada conversación.',
    panelBg: 'bg-mogran-primary',
    panelText: 'text-white',
    iconBg: 'bg-white/10',
  },
  {
    num: '02',
    label: 'Artes Escénicas',
    Icon: IconTheater,
    desc: 'Presencia escénica y manejo del espacio con confianza total.',
    panelBg: 'bg-mogran-tertiary',
    panelText: 'text-mogran-secondary',
    iconBg: 'bg-mogran-secondary/10',
  },
  {
    num: '03',
    label: 'Expresión Corporal',
    Icon: IconBodyScan,
    desc: 'Domina la postura, el gesto y la mirada para comunicar sin palabras.',
    panelBg: 'bg-mogran-primary',
    panelText: 'text-white',
    iconBg: 'bg-white/10',
  },
  {
    num: '04',
    label: 'Oratoria Digital',
    Icon: IconPresentationAnalytics,
    desc: 'Domina presentaciones virtuales, cámara y escenarios digitales con impacto real.',
    panelBg: 'bg-mogran-tertiary',
    panelText: 'text-mogran-secondary',
    iconBg: 'bg-mogran-secondary/10',
  },
  {
    num: '05',
    label: 'Coaching Motivacional',
    Icon: IconBulb,
    desc: 'Desbloquea tu potencial y construye la mentalidad ganadora.',
    panelBg: 'bg-mogran-primary',
    panelText: 'text-white',
    iconBg: 'bg-white/10',
  },
  {
    num: '06',
    label: 'Habilidades Sociales',
    Icon: IconHeartHandshake,
    desc: 'Conecta genuinamente y lidera conversaciones con magnetismo natural.',
    panelBg: 'bg-mogran-tertiary',
    panelText: 'text-mogran-secondary',
    iconBg: 'bg-mogran-secondary/10',
  },
] as const;

export function ProblemSection() {
  const [active, setActive] = useState(0);
  const t = techniques[active];

  return (
    <section id="problem" className="bg-mogran-secondary" aria-labelledby="problem-title">

      {/* Header — giant editorial typography */}
      <div className="container-section pt-20 pb-12">
        <motion.p
          className="text-xs font-mono uppercase tracking-[0.35em] text-mogran-primary mb-8"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          06 disciplinas · método integral
        </motion.p>
        <motion.h2
          id="problem-title"
          className="text-[clamp(2.8rem,8.5vw,7rem)] font-bold text-white leading-[0.92] tracking-tight"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Las habilidades<br />
          <em className="text-mogran-primary not-italic">que desarrollarás</em>
        </motion.h2>
      </div>

      {/* Numbered list + sticky panel */}
      <div className="lg:grid lg:grid-cols-[1fr_420px] border-t border-white/10">

        {/* LEFT — interactive numbered list */}
        <div>
          {techniques.map((item, i) => (
            <div
              key={item.num}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActive(i)}
              aria-pressed={active === i}
              className={`group relative flex items-center gap-6 md:gap-10 px-8 md:px-16 py-10 md:py-14 border-b border-white/10 cursor-default transition-colors duration-300 outline-none focus-visible:bg-white/5 ${
                active === i ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'
              }`}
            >
              {/* Left accent bar */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-[3px] bg-mogran-primary origin-top"
                animate={{ scaleY: active === i ? 1 : 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />

              {/* Number */}
              <span
                className={`font-mono text-xs font-bold flex-shrink-0 w-7 transition-colors duration-300 ${
                  active === i ? 'text-mogran-primary' : 'text-white/15'
                }`}
              >
                {item.num}
              </span>

              {/* Technique name */}
              <h3
                className={`text-2xl sm:text-3xl md:text-4xl xl:text-[2.75rem] font-bold flex-1 leading-none transition-colors duration-300 ${
                  active === i ? 'text-white' : 'text-white/30'
                }`}
              >
                {item.label}
              </h3>

              {/* Arrow indicator */}
              <motion.span
                className="text-mogran-primary flex-shrink-0 text-xl"
                animate={{ opacity: active === i ? 1 : 0, x: active === i ? 0 : -10 }}
                transition={{ duration: 0.2 }}
                aria-hidden="true"
              >
                →
              </motion.span>
            </div>
          ))}
        </div>

        {/* RIGHT — sticky visual panel (desktop only) */}
        <div className="hidden lg:block">
          <div className="sticky top-0 h-screen">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className={`h-full flex flex-col items-center justify-center gap-6 p-12 ${t.panelBg}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                <div className={`${t.panelText} flex flex-col items-center gap-6 text-center`}>
                  <motion.div
                    className={`w-28 h-28 rounded-3xl ${t.iconBg} flex items-center justify-center`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <t.Icon size={56} strokeWidth={1.1} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.12 }}
                  >
                    <p className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-40 mb-3">
                      {t.num} / 06
                    </p>
                    <h4 className="text-3xl font-bold mb-4 leading-tight">{t.label}</h4>
                    <p className="text-sm opacity-60 leading-relaxed max-w-[260px]">{t.desc}</p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
