'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CourseAudience } from '@/types';
import {
  IconStar, IconMasksTheater, IconSpeakerphone, IconUsers,
  IconShieldCheck, IconBooks, IconUserCheck, IconMessage2,
  IconRocket, IconBriefcase, IconUsersGroup, IconUserStar,
  IconTargetArrow, IconCamera, IconAward, IconArrowRight, IconPlus
} from '@tabler/icons-react';

interface Benefit {
  icon: any;
  text: string;
}

type AudienceItem = CourseAudience & {
  subtitle: string;
  benefits: Benefit[];
  bgImage: string;
  bgVideo?: string;
};

const audiences: AudienceItem[] = [
  {
    id: 'ninos',
    label: 'Niños',
    edad: '7 a 12 años',
    subtitle: 'Desarrollo Temprano y Confianza',
    descripcion:
      'Juegos teatrales, expresión corporal y lectura en voz alta. Grupos reducidos para que nadie pase desapercibido. El objetivo no es convertirlos en políticos. Es que puedan presentar un trabajo escolar sin temblar.',
    badge: 'Presencial y Virtual',
    bgImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200',
    benefits: [
      { icon: IconStar, text: 'Vencer la timidez escolar: Exponer tareas en clase con total seguridad.' },
      { icon: IconMasksTheater, text: 'Aprender jugando: Dinámicas lúdicas para soltar el cuerpo y la voz.' },
      { icon: IconSpeakerphone, text: 'Expresión de emociones: Comunicar lo que sienten con claridad y sin frustración.' },
      { icon: IconUsers, text: 'Socialización efectiva: Herramientas para hacer amigos y ganar liderazgo.' },
    ],
  },
  {
    id: 'adolescentes',
    label: 'Adolescentes',
    edad: '13 a 16 años',
    subtitle: 'Identidad y Seguridad Social',
    descripcion:
      'Dinámicas de grupo, lectura crítica de textos y presentaciones cortas que preparan para exámenes orales. Aprenden a sostener su postura y a decir lo que piensan sin agresividad ni sumisión.',
    badge: 'Presencial y Virtual',
    bgImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1200',
    benefits: [
      { icon: IconShieldCheck, text: 'Superar el miedo al ridículo: Controlar los nervios frente a sus compañeros.' },
      { icon: IconBooks, text: 'Exámenes orales fluidos: Técnicas para estructurar respuestas bajo presión.' },
      { icon: IconUserCheck, text: 'Fortalecer la autoestima: Lenguaje corporal que proyecta seguridad y autoridad.' },
      { icon: IconMessage2, text: 'Debate y opinión: Defender sus ideas ante profesores y padres con madurez.' },
    ],
  },
  {
    id: 'jovenes',
    label: 'Jóvenes',
    edad: '17 a 20+ años',
    subtitle: 'Impulso Académico y Profesional',
    descripcion:
      'Oratoria aplicada a contextos académicos y profesionales: defensas de tesis, exposiciones, entrevistas. Trabajo de modulación, presencia y construcción de argumentos sólidos.',
    badge: 'Presencial y Virtual',
    bgImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200',
    benefits: [
      { icon: IconRocket, text: 'Sustentación de proyectos: Convencer a jurados y profesores exigentes.' },
      { icon: IconBriefcase, text: 'Entrevistas de trabajo: Saber "venderse" y proyectar un perfil de alto valor.' },
      { icon: IconUsersGroup, text: 'Networking estratégico: Conectar con seguridad en eventos y trabajos grupales.' },
      { icon: IconUserStar, text: 'Marca personal: Primeros pasos en la comunicación y liderazgo de equipos.' },
    ],
  },
  {
    id: 'adultos',
    label: 'Adultos',
    edad: '25 a 69 años',
    subtitle: 'Liderazgo y Crecimiento Laboral',
    descripcion:
      'Técnicas para reuniones de trabajo, presentaciones ejecutivas y conversaciones difíciles. Practicamos cómo sostener la mirada, cómo decir no, cómo pedir sin pedir perdón.',
    badge: 'Presencial y Virtual',
    bgImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200',
    benefits: [
      { icon: IconBriefcase, text: 'Manejo de equipos: Dirigir reuniones y dar directrices con total claridad.' },
      { icon: IconTargetArrow, text: 'Ventas y negociación: Presentar propuestas comerciales que cierren tratos.' },
      { icon: IconCamera, text: 'Oratoria digital: Dominar la comunicación ante cámaras, micro y entornos virtuales.' },
      { icon: IconAward, text: 'Autoridad y credibilidad: Proyectar la seguridad que exige un puesto de alto cargo.' },
    ],
  },
];

export function AudienceSection() {
  const [active, setActive] = useState(2); // Default to Jóvenes (index 2)

  // Sync with URL parameter on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pub = params.get('publico');
    if (pub) {
      const idx = audiences.findIndex((a) => a.id === pub);
      if (idx !== -1) {
        setActive(idx);
      }
    }
  }, []);

  const selectAudience = (idx: number) => {
    setActive(idx);
    const url = new URL(window.location.href);
    url.searchParams.set('publico', audiences[idx].id);
    window.history.replaceState({}, '', url.toString());
  };

  return (
    <section
      id="audience"
      className="bg-[#14213D] section overflow-hidden relative border-b border-white/5"
      aria-labelledby="audience-title"
    >
      {/* Dynamic Section Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        >
          {audiences[active].bgVideo ? (
            <video
              src={audiences[active].bgVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={audiences[active].bgImage}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
          {/* Subtle gradient overlays to blend the edges */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#14213D] via-transparent to-[#14213D] opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#14213D] via-transparent to-[#14213D] opacity-90" />
        </motion.div>
      </AnimatePresence>

      {/* Soft background ambient glow */}
      <div className="absolute left-0 bottom-0 w-[450px] h-[450px] bg-mogran-primary/5 rounded-full blur-[100px] pointer-events-none z-10" />

      <div className="container-section px-4 md:px-8 relative z-10">
        <SectionHeading
          kicker="03 / por edades"
          theme="dark"
          className="mb-14"
          title={<span id="audience-title">Un curso para <em>cada etapa</em><br className="hidden md:block" /> de la vida</span>}
          description="Cada edad tiene sus propios desafíos al hablar en público. Por eso adaptamos el método al momento que estás viviendo."
        />

        {/* Sliding Accordion Row/Stack */}
        <div className="flex flex-col lg:flex-row gap-5 items-stretch w-full mt-10 min-h-[660px] lg:h-[620px]">
          {audiences.map((aud, idx) => {
            const isExpanded = active === idx;

            return (
              <motion.div
                key={aud.id}
                layout
                onClick={() => selectAudience(idx)}
                className={`group relative overflow-hidden cursor-pointer rounded-[32px] border transition-all duration-500 flex flex-col justify-between ${
                  isExpanded
                    ? 'bg-white/[0.04] border-mogran-primary/45 shadow-[0_30px_70px_-20px_rgba(248,20,67,0.18)] lg:flex-[3.5] p-6 md:p-8 lg:p-10 lg:h-full'
                    : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/20 lg:w-[90px] lg:flex-none h-[80px] lg:h-full p-4 lg:py-10 lg:px-4 flex lg:flex-col flex-row items-center justify-between lg:justify-start'
                }`}
                transition={{ type: 'spring' as const, stiffness: 350, damping: 32 }}
              >
                {/* Grid lines backdrop (only visible on expanded) */}
                {isExpanded && (
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none opacity-60" />
                )}
                
                {/* Glow backdrop (only visible on expanded) */}
                {isExpanded && (
                  <div className="absolute -left-1/4 -top-1/4 w-96 h-96 bg-mogran-primary/10 rounded-full blur-[80px] pointer-events-none" />
                )}

                <AnimatePresence mode="wait">
                  {isExpanded ? (
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="grid lg:grid-cols-[1.15fr_1.35fr] gap-8 lg:gap-12 items-center h-full w-full relative z-10"
                    >
                      {/* Left Column Content */}
                      <div className="flex flex-col justify-between h-full py-2">
                        <div>
                          {/* Monospace tag */}
                          <div className="flex items-center gap-3 mb-4">
                            <span className="font-mono text-xs text-white/40">[ ETAPA 0{idx + 1} ]</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-mogran-primary animate-pulse" />
                            <span className="font-mono text-xs text-mogran-primary uppercase tracking-widest font-semibold">{aud.edad}</span>
                          </div>
                          
                          {/* Huge Title */}
                          <h3 className="font-bold text-white tracking-tight text-4xl sm:text-5xl lg:text-6xl mb-6">
                            {aud.label}
                          </h3>
                          
                          {/* Subtitle */}
                          <p className="text-mogran-primary text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-3">
                            {aud.subtitle}
                          </p>

                          {/* Description */}
                          <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6 max-w-md">
                            {aud.descripcion}
                          </p>
                        </div>

                        <div>
                          {/* Badges */}
                          <div className="flex flex-wrap gap-2.5 mb-8">
                            <Badge variant="primary">{aud.badge}</Badge>
                            <Badge variant="accent">Grupos de 8 a 12 alumnos</Badge>
                          </div>

                          {/* CTA Button */}
                          <a
                            href="#schedule"
                            onClick={(e) => {
                              e.preventDefault();
                              document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="group relative overflow-hidden inline-flex items-center justify-center pl-7 pr-6 py-3.5 text-sm font-extrabold rounded-full bg-mogran-primary text-white transition-all duration-300 hover:bg-mogran-primary-hover shadow-lg shadow-mogran-primary/25 hover:shadow-xl active:scale-[0.98] w-fit"
                          >
                            <span className="transition-transform duration-300 group-hover:-translate-x-1.5 flex items-center">
                              Ver horarios para {aud.label.toLowerCase()}
                            </span>
                            <span className="absolute right-5 opacity-0 transform translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                              <IconArrowRight size={16} strokeWidth={2.5} />
                            </span>
                            <span className="w-0 transition-all duration-300 group-hover:w-3.5" />
                          </a>
                        </div>
                      </div>

                      {/* Right Column Content - Benefit List */}
                      <div className="flex flex-col gap-4">
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2 block">
                          [ Objetivos Clave de Aprendizaje ]
                        </span>
                        <div className="space-y-3">
                          {aud.benefits.map((b, i) => {
                            const parts = b.text.split(':');
                            const title = parts[0]?.trim();
                            const description = parts[1]?.trim();

                            return (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.35, delay: i * 0.08 }}
                                whileHover={{ x: 6, backgroundColor: 'rgba(255, 255, 255, 0.04)' }}
                                className="flex gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.015] hover:border-mogran-primary/30 transition-colors group/benefit relative"
                              >
                                {/* Index tag */}
                                <span className="absolute right-4 top-4 font-mono text-[9px] text-white/20">
                                  0{i + 1}
                                </span>
                                
                                {/* Icon wrapper */}
                                <span className="inline-flex w-10 h-10 rounded-xl bg-mogran-primary/10 text-mogran-primary items-center justify-center flex-shrink-0 group-hover/benefit:bg-mogran-primary group-hover/benefit:text-white transition-all duration-300">
                                  <b.icon size={18} className="transition-transform duration-300 group-hover/benefit:scale-110 group-hover/benefit:rotate-3" />
                                </span>
                                
                                <div>
                                  <h4 className="font-extrabold text-white text-sm tracking-tight transition-colors group-hover/benefit:text-mogran-primary">
                                    {title}
                                  </h4>
                                  <p className="text-white/60 text-xs leading-relaxed mt-1">
                                    {description}
                                  </p>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    /* Collapsed Card Content */
                    <motion.div
                      key="collapsed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex lg:flex-col flex-row items-center justify-between lg:justify-start lg:gap-10 w-full h-full relative z-10"
                    >
                      {/* Monospace index */}
                      <span className="font-mono text-sm text-white/35">0{idx + 1}</span>

                      {/* Rotated label for desktop, normal text for mobile */}
                      <div className="lg:my-auto flex items-center justify-center">
                        <span
                          className="font-bold text-base lg:text-lg text-white/40 tracking-wider uppercase whitespace-nowrap lg:origin-center lg:[writing-mode:vertical-lr] lg:rotate-180 group-hover:text-white transition-colors duration-300"
                        >
                          {aud.label}
                        </span>
                      </div>

                      {/* Monospace age or plus icon */}
                      <div className="flex lg:flex-col items-center gap-3 lg:mt-auto">
                        <span className="hidden lg:inline font-mono text-[9px] text-mogran-primary/60 uppercase tracking-widest lg:[writing-mode:vertical-lr] lg:rotate-180 mb-2">
                          {aud.edad}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/45 group-hover:bg-mogran-primary group-hover:text-white transition-all duration-300">
                          <IconPlus size={14} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
