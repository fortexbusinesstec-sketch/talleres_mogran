'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { IconMapPin, IconClock, IconUsers } from '@tabler/icons-react';

interface ScheduleGroup {
  publico: string;
  rango: string;
  dias: string;
  hora: string;
  nota?: string;
}

const horariosVirtual: ScheduleGroup[] = [
  {
    publico: 'Niños',
    rango: '7-12 años',
    dias: 'Lunes y miércoles',
    hora: '4:00 p.m.',
  },
  {
    publico: 'Niños',
    rango: '7-12 años',
    dias: 'Martes y jueves',
    hora: '4:00 p.m.',
  },
  {
    publico: 'Adolescentes',
    rango: '13-16 años',
    dias: 'Lunes y miércoles',
    hora: '6:00 p.m.',
  },
  {
    publico: 'Adolescentes',
    rango: '13-16 años',
    dias: 'Martes y jueves',
    hora: '6:00 p.m.',
  },
  {
    publico: 'Jóvenes',
    rango: '17-20+ años',
    dias: 'Martes y jueves',
    hora: '7:00 p.m.',
  },
  {
    publico: 'Adultos',
    rango: '25-69 años',
    dias: 'Miércoles',
    hora: '8:30 p.m. a 10:00 p.m. (1 hora 30 minutos)',
  },
];

const horariosPresencial: ScheduleGroup[] = [
  {
    publico: 'Niños',
    rango: '8-12 años',
    dias: 'Sábados',
    hora: '9:00 a.m. a 11:00 a.m.',
  },
  {
    publico: 'Adolescentes y Jóvenes',
    rango: '13-18+ años',
    dias: 'Sábados',
    hora: '11:30 a.m. a 1:30 p.m.',
  },
  {
    publico: 'Adolescentes y Jóvenes',
    rango: '13-18+ años',
    dias: 'Sábados',
    hora: '3:00 p.m. a 5:00 p.m.',
    nota: 'Por aperturar según inscritos',
  },
  {
    publico: 'Adultos',
    rango: '25-69 años',
    dias: 'Domingos',
    hora: '9:00 a.m. a 12:00 m.',
  },
  {
    publico: 'Adultos',
    rango: '25-69 años',
    dias: 'Domingos',
    hora: '2:00 p.m. a 5:00 p.m.',
  },
];

export function ScheduleSection() {
  const [modalidad, setModalidad] = useState<'virtual' | 'presencial'>('virtual');
  const horarios = modalidad === 'virtual' ? horariosVirtual : horariosPresencial;

  return (
    <section
      id="schedule"
      className="bg-mogran-dark-base section"
      aria-labelledby="schedule-title"
    >
      <div className="container-section">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2
            id="schedule-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-mogran-dark-text mb-6 text-balance"
          >
            Horarios flexibles presenciales y virtuales en Lima
          </h2>
          <p className="text-lg text-mogran-dark-text-secondary leading-relaxed">
            Elegí la modalidad que te funcione. Los horarios se actualizan según disponibilidad real de cupos.
          </p>
        </div>

        <div className="flex justify-center mb-10" role="tablist" aria-label="Modalidad de clase">
          <div className="inline-flex bg-mogran-dark-surface rounded-full p-1 border border-mogran-dark-border">
            <button
              role="tab"
              aria-selected={modalidad === 'virtual'}
              aria-controls="schedule-content"
              onClick={() => setModalidad('virtual')}
              className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-mogran-accent focus-visible:ring-offset-2 focus-visible:ring-offset-mogran-dark-base ${
                modalidad === 'virtual'
                  ? 'bg-mogran-accent text-mogran-dark-base shadow-sm font-semibold'
                  : 'text-mogran-dark-text-secondary hover:text-mogran-dark-text hover:bg-mogran-dark-elevated'
              }`}
            >
              Virtual
            </button>
            <button
              role="tab"
              aria-selected={modalidad === 'presencial'}
              aria-controls="schedule-content"
              onClick={() => setModalidad('presencial')}
              className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-mogran-accent focus-visible:ring-offset-2 focus-visible:ring-offset-mogran-dark-base ${
                modalidad === 'presencial'
                  ? 'bg-mogran-accent text-mogran-dark-base shadow-sm font-semibold'
                  : 'text-mogran-dark-text-secondary hover:text-mogran-dark-text hover:bg-mogran-dark-elevated'
              }`}
            >
              Presencial
            </button>
          </div>
        </div>

        {modalidad === 'virtual' && (
          <div
            id="schedule-content"
            role="tabpanel"
            className="max-w-3xl mx-auto mb-10 text-center"
          >
            <div className="inline-flex items-center gap-6 text-mogran-dark-text-secondary bg-mogran-accent/10 border border-mogran-accent/20 px-6 py-3 rounded-2xl flex-wrap justify-center">
              <span className="flex items-center gap-2">
                <IconClock size={18} strokeWidth={2} aria-hidden="true" />
                8 horas por mes
              </span>
              <span className="w-px h-4 bg-mogran-accent/30" aria-hidden="true" />
              <span className="flex items-center gap-2">
                <IconUsers size={18} strokeWidth={2} aria-hidden="true" />
                2 sesiones por semana
              </span>
              <span className="w-px h-4 bg-mogran-accent/30" aria-hidden="true" />
              <span>1 hora cada sesión</span>
            </div>
          </div>
        )}

        {modalidad === 'presencial' && (
          <div
            id="schedule-content"
            role="tabpanel"
            className="max-w-3xl mx-auto mb-10"
          >
            <div className="bg-mogran-accent/10 border border-mogran-accent/20 rounded-2xl p-6 flex items-start gap-4">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full bg-mogran-dark-surface flex items-center justify-center"
                aria-hidden="true"
              >
                <IconMapPin size={24} strokeWidth={1.5} className="text-mogran-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-mogran-dark-text mb-1">Única sede</h3>
                <p className="text-mogran-dark-text-secondary">
                  Av. Juan Pardo de Zela Cdra 2, Lince (altura cuadras 18 y 19 de Av. Arequipa).
                </p>
                <Badge variant="accent" size="sm" className="mt-2">
                  Visitas previa coordinación
                </Badge>
              </div>
            </div>
          </div>
        )}

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          role="tabpanel"
          id="schedule-content"
        >
          {horarios.map((horario, index) => (
            <article
              key={index}
              className="bg-mogran-dark-surface border border-mogran-dark-border rounded-xl p-6 transition-all duration-300 hover:border-mogran-accent/30 hover:shadow-lg hover:shadow-mogran-accent/5"
            >
              <Badge variant="primary" size="sm" className="mb-3">
                {horario.publico}
              </Badge>
              <p className="text-sm text-mogran-dark-text-muted mb-3">{horario.rango}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-mogran-dark-text">
                  <IconClock size={16} strokeWidth={2} className="text-mogran-accent" aria-hidden="true" />
                  <span className="text-sm font-medium">{horario.dias}</span>
                </div>
                <p className="text-mogran-dark-text-secondary text-sm pl-6">{horario.hora}</p>
                {horario.nota && (
                  <Badge variant="accent" size="sm" className="mt-2 ml-6">
                    {horario.nota}
                  </Badge>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
