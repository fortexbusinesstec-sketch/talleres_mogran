'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/Badge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { IconMapPin, IconClock, IconUsers, IconArrowUpRight } from '@tabler/icons-react';

interface ScheduleGroup {
  publico: string;
  rango: string;
  dias: string;
  hora: string;
  nota?: string;
}

const horariosVirtual: ScheduleGroup[] = [
  { publico: 'Niños', rango: '7-12 años', dias: 'Lunes y miércoles', hora: '4:00 p.m.' },
  { publico: 'Niños', rango: '7-12 años', dias: 'Martes y jueves', hora: '4:00 p.m.' },
  { publico: 'Adolescentes', rango: '13-16 años', dias: 'Lunes y miércoles', hora: '6:00 p.m.' },
  { publico: 'Adolescentes', rango: '13-16 años', dias: 'Martes y jueves', hora: '6:00 p.m.' },
  { publico: 'Jóvenes', rango: '17-20+ años', dias: 'Martes y jueves', hora: '7:00 p.m.' },
  { publico: 'Adultos', rango: '25-69 años', dias: 'Miércoles', hora: '8:30 p.m. a 10:00 p.m.' },
];

const horariosPresencial: ScheduleGroup[] = [
  { publico: 'Niños', rango: '8-12 años', dias: 'Sábados', hora: '9:00 a.m. a 11:00 a.m.' },
  { publico: 'Adolescentes y Jóvenes', rango: '13-18+ años', dias: 'Sábados', hora: '11:30 a.m. a 1:30 p.m.' },
  { publico: 'Adolescentes y Jóvenes', rango: '13-18+ años', dias: 'Sábados', hora: '3:00 p.m. a 5:00 p.m.', nota: 'Por aperturar según inscritos' },
  { publico: 'Adultos', rango: '25-69 años', dias: 'Domingos', hora: '9:00 a.m. a 12:00 m.' },
  { publico: 'Adultos', rango: '25-69 años', dias: 'Domingos', hora: '2:00 p.m. a 5:00 p.m.' },
];

// Varied organic border radii for an off-grid editorial feel.
const RADII = [
  'rounded-[2rem]',
  'rounded-[2rem_2rem_2rem_0.5rem]',
  'rounded-[2rem_0.5rem_2rem_2rem]',
  'rounded-[0.5rem_2rem_2rem_2rem]',
  'rounded-[2rem_2rem_0.5rem_2rem]',
  'rounded-[2rem]',
];

export function ScheduleSection() {
  const [modalidad, setModalidad] = useState<'virtual' | 'presencial'>('virtual');
  const horarios = modalidad === 'virtual' ? horariosVirtual : horariosPresencial;

  return (
    <section id="schedule" className="bg-[#14213D] section overflow-hidden border-b border-white/5" aria-labelledby="schedule-title">
      <div className="container-section">
        <SectionHeading
          kicker="05 / horarios"
          theme="dark"
          className="mb-10"
          title={<span id="schedule-title">Horarios flexibles<br className="hidden md:block" /> en <em>Lima</em></span>}
          description="Elige la modalidad que te funcione. Los horarios se actualizan según disponibilidad real de cupos."
        />

        {/* Modalidad toggle — pill */}
        <div className="flex mb-10" role="tablist" aria-label="Modalidad de clase">
          <div className="inline-flex bg-white/5 rounded-full p-1 border border-white/10">
            {(['virtual', 'presencial'] as const).map((m) => (
              <button
                key={m}
                role="tab"
                aria-selected={modalidad === m}
                aria-controls="schedule-content"
                onClick={() => setModalidad(m)}
                className={`relative px-7 py-2.5 text-sm font-semibold rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-mogran-primary ${
                  modalidad === m ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                {modalidad === m && (
                  <motion.span
                    layoutId="schedule-toggle"
                    className="absolute inset-0 bg-mogran-primary rounded-full z-0"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{m === 'virtual' ? 'Virtual' : 'Presencial'}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Modalidad info banner */}
        <motion.div
          key={modalidad}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-10"
        >
          {modalidad === 'virtual' ? (
            <div className="inline-flex items-center gap-6 text-white/75 bg-white/[0.04] border border-white/10 px-6 py-3 rounded-full flex-wrap">
              <span className="flex items-center gap-2"><IconClock size={18} className="text-mogran-primary" /> 8 horas por mes</span>
              <span className="w-px h-4 bg-white/10" aria-hidden="true" />
              <span className="flex items-center gap-2"><IconUsers size={18} className="text-mogran-primary" /> 2 sesiones por semana</span>
              <span className="w-px h-4 bg-white/10" aria-hidden="true" />
              <span>1 hora cada sesión</span>
            </div>
          ) : (
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 flex items-start gap-4 max-w-2xl text-white">
              <div className="flex-shrink-0 w-11 h-11 rounded-full bg-white/5 flex items-center justify-center border border-white/10" aria-hidden="true">
                <IconMapPin size={22} className="text-mogran-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Única sede · Lince</h3>
                <p className="text-sm text-white/70">Av. Juan Pardo de Zela Cdra 2 (altura cuadras 18 y 19 de Av. Arequipa).</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Editorial card grid — big index numbers, organic radii, magnetic hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" role="tabpanel" id="schedule-content">
          {horarios.map((h, index) => (
            <motion.article
              key={`${modalidad}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className={`group relative bg-white/[0.03] border border-white/10 p-7 transition-all duration-300 hover:bg-white/[0.08] hover:border-mogran-primary/45 ${RADII[index % RADII.length]}`}
            >
              {/* Giant index number watermark */}
              <span className="absolute top-4 right-5 font-bold text-[3.5rem] leading-none text-white/[0.02] group-hover:text-white/[0.05] transition-colors duration-300 pointer-events-none">
                {(index + 1).toString().padStart(2, '0')}
              </span>

              <Badge variant="primary" size="sm" className="mb-4">{h.publico}</Badge>
              <p className="text-xs text-white/40 group-hover:text-white/60 mb-5 transition-colors duration-300">{h.rango}</p>

              <div className="flex items-center gap-2 text-white/90 group-hover:text-white transition-colors duration-300">
                <IconClock size={16} className="text-mogran-primary" aria-hidden="true" />
                <span className="text-base font-bold">{h.dias}</span>
              </div>
              <p className="mt-1.5 pl-6 text-sm text-white/70 group-hover:text-white/80 transition-colors duration-300">{h.hora}</p>

              {h.nota && (
                <Badge variant="accent" size="sm" className="mt-3 ml-6">{h.nota}</Badge>
              )}

              <IconArrowUpRight
                size={20}
                className="absolute bottom-6 right-6 text-white/0 group-hover:text-mogran-primary transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
