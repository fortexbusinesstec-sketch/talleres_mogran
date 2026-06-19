'use client';

import React from 'react';
import { motion } from 'motion/react';
import { IconArrowRight, IconSparkles, IconHelpCircle, IconUserCheck, IconDeviceAnalytics } from '@tabler/icons-react';
import { SpeakerStyleKey, SPEAKER_COLORS } from '@/components/ui/SpeakerIcons';
import { SectionHeading } from '@/components/ui/SectionHeading';

const floatingStyles: { name: string; style: SpeakerStyleKey }[] = [
  { name: 'El Conector', style: 'ORADOR_CONECTOR' },
  { name: 'El Estratega', style: 'ORADOR_ESTRATEGA' },
  { name: 'El Energético', style: 'ORADOR_ENERGETICO' },
  { name: 'El Analítico', style: 'ORADOR_ANALITICO' },
  { name: 'El Transformador', style: 'ORADOR_TRANSFORMADOR' },
  { name: 'El Protector', style: 'ORADOR_PROTECTOR' },
  { name: 'El Guerrero', style: 'ORADOR_GUERRERO' },
  { name: 'El Explorador', style: 'ORADOR_EXPLORADOR' },
];

export function TestPromoSection() {
  return (
    <section
      id="test-promo"
      className="bg-mogran-secondary py-24 md:py-36 px-6 overflow-hidden relative border-b border-white/5"
      aria-labelledby="test-promo-title"
    >
      {/* Background soft glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-mogran-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-section mx-auto max-w-7xl relative z-10 px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Column: Heading & Steps */}
          <div className="flex-1 text-left w-full">
            <SectionHeading
              kicker="01 / DIAGNÓSTICO CIENTÍFICO"
              title={<span>Descubre tu <em>Estilo de Orador</em></span>}
              description="Conoce tu perfil de comunicación único en 2 minutos. Basado en el estándar científico de la personalidad (Big Five) y potenciado por IA para trazar tu ruta de desarrollo."
              theme="dark"
              align="left"
              className="mb-10"
            />

            {/* 3 Steps List */}
            <div className="flex flex-col gap-8 mb-10 max-w-xl">
              <div className="flex gap-5">
                <span className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-mogran-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                  <IconHelpCircle size={24} />
                </span>
                <div>
                  <h4 className="text-base md:text-lg font-bold text-white">1. Responde situaciones reales</h4>
                  <p className="text-xs md:text-sm text-white/70 mt-1 leading-relaxed">
                    Enfréntate a escenarios de oratoria interactivos y dinámicos. Nada de tests psicológicos aburridos.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <span className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-mogran-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                  <IconDeviceAnalytics size={24} />
                </span>
                <div>
                  <h4 className="text-base md:text-lg font-bold text-white">2. Nuestra IA analiza tu perfil</h4>
                  <p className="text-xs md:text-sm text-white/70 mt-1 leading-relaxed">
                    Calculamos tus puntuaciones exactas de personalidad (OCEAN) mediante tus respuestas y el análisis de tus metáforas de comunicación.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <span className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-mogran-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                  <IconUserCheck size={24} />
                </span>
                <div>
                  <h4 className="text-base md:text-lg font-bold text-white">3. Recibe tu perfil + plan único</h4>
                  <p className="text-xs md:text-sm text-white/70 mt-1 leading-relaxed">
                    Obtén tu estilo de orador oficial, fortalezas de comunicación, nivel de compatibilidad grupal y un plan de desarrollo a tu medida.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs & Social Proof */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 mt-12">
              <a
                href="/test"
                className="inline-flex items-center justify-center px-10 py-5 bg-mogran-primary hover:bg-mogran-primary-hover text-white text-base md:text-lg font-extrabold rounded-full transition-all gap-2.5 group shadow-lg shadow-mogran-primary/25 hover:scale-[1.01] active:scale-[0.99] w-full sm:w-auto"
              >
                🚀 INICIAR TEST GRATIS
                <IconArrowRight size={20} className="transition-transform group-hover:translate-x-1.5" />
              </a>
              <span className="text-xs md:text-sm font-bold text-white/60 pl-2 sm:pl-0">
                ⚡ +2,847 personas ya descubrieron su estilo
              </span>
            </div>
          </div>

          {/* Right Column: Large Orbiting badges illustration */}
          <div className="flex-1 w-full flex items-center justify-center relative min-h-[400px] lg:min-h-[500px]">
            {/* Background dashed circle */}
            <div className="absolute w-[240px] h-[240px] md:w-[400px] md:h-[400px] rounded-full border border-dashed border-white/15 flex items-center justify-center pointer-events-none">
              <div className="absolute w-[160px] h-[160px] md:w-[260px] md:h-[260px] rounded-full border border-dashed border-white/10" />
            </div>

            {/* Center Core Badge */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-mogran-secondary border-2 border-mogran-primary text-white flex items-center justify-center font-black text-lg md:text-xl shadow-xl shadow-mogran-primary/20 relative z-20 animate-pulse-soft">
              OCEAN
            </div>

            {/* Orbiting Styles */}
            {floatingStyles.map((item, index) => {
              const angle = (index * 360) / floatingStyles.length;
              const color = SPEAKER_COLORS[item.style] || '#14213D';

              return (
                <motion.a
                  key={index}
                  href="/test"
                  animate={{
                    y: [0, -6, 0],
                  }}
                  transition={{
                    duration: 3.5 + (index % 3),
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.2,
                  }}
                  style={{
                    '--angle': `${angle}deg`,
                    '--radius-mobile': '110px',
                    '--radius-desktop': '190px',
                    transform: `rotate(var(--angle)) translate(var(--radius-mobile)) rotate(calc(-1 * var(--angle)))`,
                    borderColor: `${color}45`,
                    color: color,
                    backgroundColor: `rgba(20, 33, 61, 0.85)`,
                  } as React.CSSProperties}
                  className="absolute px-4 py-2.5 rounded-full border border-white/10 backdrop-blur-sm text-[10px] md:text-xs font-extrabold tracking-wider shadow-md hover:shadow-lg hover:scale-105 transition-all z-10 md:[transform:rotate(var(--angle))_translate(var(--radius-desktop))_rotate(calc(-1_*_var(--angle)))] whitespace-nowrap"
                >
                  {item.name}
                </motion.a>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
