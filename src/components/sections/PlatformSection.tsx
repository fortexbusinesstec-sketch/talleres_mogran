'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { Waveform } from '@/components/ui/Waveform';
import {
  IconUser, IconCertificate, IconMicrophone, IconVolume,
  IconCreditCard, IconLock, IconUsers, IconCheck, IconDownload,
  IconSparkles, IconUserCheck, IconArrowRight
} from '@tabler/icons-react';

interface FeatureItem {
  title: string;
  stage: string;
  description: string;
  icon: any;
}

const features: FeatureItem[] = [
  {
    stage: 'ETAPA 1',
    title: 'Portal del Alumno',
    description: 'Acceso centralizado para consultar tu horario, registrar asistencia, descargar materiales y visualizar tus horas acumuladas y certificados oficiales de logros.',
    icon: IconUser,
  },
  {
    stage: 'ETAPA 2',
    title: 'Entrenamiento y Práctica',
    description: 'Entrena tu voz desde casa. Trabajos de vocalización con trabalenguas interactivos, lecturas guiadas y simulador de grabación con reporte de claridad.',
    icon: IconMicrophone,
  },
  {
    stage: 'ETAPA 3 y 4',
    title: 'Gestión y Finanzas',
    description: 'Control absoluto de tus cuotas, recordatorios automáticos de pago y renovaciones sencillas de matrícula desde una pasarela integrada y segura.',
    icon: IconCreditCard,
  },
  {
    stage: 'CONTROL',
    title: 'Control de Accesos',
    description: 'Un ecosistema unificado con cuentas y permisos diferenciados para Alumnos, Profesores y Padres de Familia (para monitoreo de menores).',
    icon: IconLock,
  },
];

export function PlatformSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedRole, setSelectedRole] = useState<'alumno' | 'profesor' | 'padre'>('alumno');

  return (
    <section
      id="platform"
      className="bg-[#14213D] section pt-12 pb-10 md:pt-16 md:pb-12 overflow-hidden relative border-b border-white/5"
      aria-labelledby="platform-title"
    >
      {/* Background glow */}
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-mogran-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-section px-4 md:px-8 relative z-10">
        <SectionHeading
          kicker="04 / ECOSISTEMA DIGITAL"
          theme="dark"
          className="mb-10"
          title={<span id="platform-title">Tu práctica no <em>termina en el aula</em></span>}
          description="Mucho más que clases presenciales. Contamos con una plataforma digital integrada diseñada para potenciar tu práctica constante y simplificar tu gestión académica."
        />

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
          
          {/* LEFT: App Mockup Simulator */}
          <div className="relative bg-white/[0.03] border border-white/10 rounded-[32px] p-6 md:p-8 min-h-[485px] shadow-2xl flex flex-col justify-between overflow-hidden backdrop-blur-sm">
            {/* Grid lines inside mockup */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none opacity-50" />
            <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-white/20 select-none pointer-events-none">
              MOGRAN_PORTAL_V1.2
            </div>

            {/* Header window dots */}
            <div className="flex gap-1.5 mb-6 border-b border-white/5 pb-4 relative z-10">
              <span className="w-2.5 h-2.5 rounded-full bg-mogran-primary/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="text-[10px] font-mono text-white/30 ml-2">alumnos.oratoriamogran.com</span>
            </div>

            {/* Dynamic Screens */}
            <div className="flex-1 flex flex-col justify-center relative z-10">
              <AnimatePresence mode="wait">
                {activeTab === 0 && (
                  <motion.div
                    key="stage-portal"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    {/* User profile card */}
                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                      <div className="w-12 h-12 rounded-full bg-mogran-primary/10 border border-mogran-primary/30 flex items-center justify-center font-bold text-white text-lg">
                        C
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-white text-base">Carlos Mendoza</h4>
                        <span className="text-xs font-mono text-mogran-primary tracking-wider uppercase">Nivel 3 · Orador Conector</span>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Attendance widget */}
                      <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl space-y-2 text-left">
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Asistencia Acumulada</span>
                        <div className="flex justify-between items-end">
                          <span className="text-2xl font-bold text-white">92%</span>
                          <span className="text-xs text-white/50">11 de 12 clases</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '92%' }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="h-full bg-mogran-primary rounded-full"
                          />
                        </div>
                      </div>

                      {/* Cumulative Hours widget */}
                      <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl space-y-1 text-left flex flex-col justify-between">
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Horas en Escenario</span>
                        <div>
                          <span className="text-2xl font-bold text-white">24 hrs</span>
                          <p className="text-[10px] text-white/40 mt-1">Acumuladas en set de croma</p>
                        </div>
                      </div>
                    </div>

                    {/* Certificate Badge */}
                    <div className="bg-mogran-primary/10 border border-mogran-primary/20 p-4 rounded-2xl flex items-center justify-between text-left">
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-mogran-primary/20 text-mogran-primary flex items-center justify-center">
                          <IconCertificate size={22} />
                        </span>
                        <div>
                          <h5 className="text-xs font-bold text-white uppercase tracking-wider">Certificado Disponible</h5>
                          <p className="text-[11px] text-white/60">Taller modular de expresión escénica</p>
                        </div>
                      </div>
                      <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                        <IconDownload size={14} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeTab === 1 && (
                  <motion.div
                    key="stage-practice"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Herramienta de Vocalización</span>
                        <h4 className="font-bold text-white text-lg mt-1">Trabalenguas del Día</h4>
                      </div>
                      <Badge variant="accent" size="sm">Dificultad Media</Badge>
                    </div>

                    {/* Tongue twister text card */}
                    <div className="bg-white/[0.03] border border-white/10 p-5 rounded-2xl relative">
                      <p className="text-white font-medium text-base leading-relaxed italic text-center md:px-6">
                        "Tres tristes tigres tragaban trigo en un trigal en tres tristes trastos."
                      </p>
                    </div>

                    {/* Waveform and recording animation */}
                    <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl flex items-center justify-between gap-6">
                      <div className="flex-1 flex items-center gap-1.5 h-6">
                        <Waveform bars={16} className="h-6 w-full" color="bg-mogran-primary/70" />
                      </div>
                      {/* Record button */}
                      <button className="w-12 h-12 rounded-full bg-mogran-primary hover:bg-mogran-primary-hover text-white flex items-center justify-center shadow-lg shadow-mogran-primary/30 active:scale-95 transition-all cursor-pointer">
                        <IconMicrophone size={20} className="animate-pulse" />
                      </button>
                    </div>

                    {/* AI Feedback indicator */}
                    <div className="flex items-center gap-3 text-xs text-white/60">
                      <IconSparkles size={14} className="text-mogran-primary" />
                      <span>Nuestra IA evaluará tu claridad silábica y velocidad de oratoria.</span>
                    </div>
                  </motion.div>
                )}

                {activeTab === 2 && (
                  <motion.div
                    key="stage-finance"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4 text-left"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Pagos y Matrícula</span>
                      <h4 className="font-bold text-white text-lg mt-1">Estado de Cuenta</h4>
                    </div>

                    {/* Payment Receipt Box */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-white/5">
                        <div>
                          <h5 className="font-extrabold text-sm text-white">Taller Regular de Oratoria</h5>
                          <span className="text-[10px] font-mono text-white/40 block">Ciclo Junio - Julio</span>
                        </div>
                        <Badge variant="success" size="sm">Pagado</Badge>
                      </div>

                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/60">Siguiente vencimiento:</span>
                        <span className="font-extrabold text-white">Ninguno (Ciclo cancelado)</span>
                      </div>
                    </div>

                    {/* Payment Alert / Reminder toggle */}
                    <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-mogran-primary">
                          <IconVolume size={18} />
                        </span>
                        <div>
                          <span className="text-xs font-bold text-white block">Avisos de pago</span>
                          <span className="text-[10px] text-white/40 block">WhatsApp y correo electrónico</span>
                        </div>
                      </div>
                      <div className="w-10 h-6 bg-mogran-primary rounded-full p-0.5 flex justify-end cursor-pointer">
                        <div className="w-5 h-5 bg-white rounded-full shadow-sm" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 3 && (
                  <motion.div
                    key="stage-access"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6 text-left"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Roles y Accesos</span>
                      <h4 className="font-bold text-white text-lg mt-1">Control de Permisos</h4>
                    </div>

                    {/* Role selector inside mockup */}
                    <div className="grid grid-cols-3 bg-white/5 border border-white/5 rounded-full p-1 text-center font-mono text-[10px] font-bold">
                      {(['alumno', 'profesor', 'padre'] as const).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setSelectedRole(r)}
                          className={`py-1.5 rounded-full capitalize transition-colors cursor-pointer ${
                            selectedRole === r ? 'bg-mogran-primary text-white' : 'text-white/45 hover:text-white'
                          }`}
                        >
                          {r === 'padre' ? 'Apoderado' : r}
                        </button>
                      ))}
                    </div>

                    {/* Permissions summary */}
                    <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl space-y-4">
                      <div className="flex items-center gap-3 text-sm font-bold text-white">
                        <IconUserCheck size={18} className="text-mogran-primary" />
                        <span>Vista Habilitada</span>
                      </div>
                      
                      <ul className="space-y-2.5 text-xs text-white/70">
                        {selectedRole === 'alumno' && (
                          <>
                            <li className="flex items-center gap-2">✓ Grabador de videos de práctica diaria.</li>
                            <li className="flex items-center gap-2">✓ Biblioteca de trabalenguas y materiales de clase.</li>
                            <li className="flex items-center gap-2">✓ Módulo de logros y horas en escenario.</li>
                          </>
                        )}
                        {selectedRole === 'profesor' && (
                          <>
                            <li className="flex items-center gap-2">✓ Registro veloz de asistencia (código QR / lista).</li>
                            <li className="flex items-center gap-2">✓ Módulo de feedback directo por video o audio.</li>
                            <li className="flex items-center gap-2">✓ Control de materiales asignados a cada grupo.</li>
                          </>
                        )}
                        {selectedRole === 'padre' && (
                          <>
                            <li className="flex items-center gap-2">✓ Historial de asistencia y puntualidad de su hijo.</li>
                            <li className="flex items-center gap-2">✓ Certificados de culminación y medallas ganadas.</li>
                            <li className="flex items-center gap-2">✓ Cronograma de cuotas y recibos de pagos emitidos.</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Simulated footer bar */}
            <div className="mt-6 flex justify-between items-center text-[10px] font-mono text-white/30 pt-4 border-t border-white/5 relative z-10">
              <span>ESTADO: ONLINE</span>
              <span>TOKEN_AUTH: OK</span>
            </div>
          </div>

          {/* RIGHT: Detail of Stages (Tab Selector) */}
          <div className="flex flex-col gap-4 text-left">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-2">
              [ Módulos del Ecosistema Académico ]
            </span>

            <div className="space-y-3">
              {features.map((feat, idx) => {
                const isSelected = activeTab === idx;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`w-full text-left p-5 rounded-3xl border transition-all duration-500 relative overflow-hidden outline-none cursor-pointer ${
                      isSelected
                        ? 'bg-white/[0.04] border-mogran-primary/45 shadow-[0_15px_30px_-10px_rgba(248,20,67,0.12)]'
                        : 'bg-transparent border-white/10 hover:bg-white/[0.015] hover:border-white/20'
                    }`}
                  >
                    {/* Active highlight side bar */}
                    {isSelected && (
                      <motion.div
                        layoutId="platformActiveBar"
                        className="absolute left-0 top-0 bottom-0 w-1.5 bg-mogran-primary"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}

                    <div className="flex gap-4 items-start relative z-10">
                      {/* Icon wrapper */}
                      <span className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${isSelected ? 'bg-mogran-primary text-white' : 'bg-white/5 text-white/45'}`}>
                        <feat.icon size={20} />
                      </span>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-[9px] uppercase tracking-wider ${isSelected ? 'text-mogran-primary font-bold' : 'text-white/40'}`}>
                            {feat.stage}
                          </span>
                        </div>
                        <h4 className={`text-base font-extrabold tracking-tight mt-0.5 ${isSelected ? 'text-white' : 'text-white/80'}`}>
                          {feat.title}
                        </h4>
                        
                        <AnimatePresence initial={false}>
                          {isSelected && (
                            <motion.p
                              initial={{ height: 0, opacity: 0, marginTop: 0 }}
                              animate={{ height: 'auto', opacity: 1, marginTop: 6 }}
                              exit={{ height: 0, opacity: 0, marginTop: 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                              className="text-xs leading-relaxed text-white/70 overflow-hidden"
                            >
                              {feat.description}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Visual indicator of the upcoming release */}
            <div className="mt-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
              <p className="text-[11px] text-white/60 leading-normal">
                Ecosistema en fase de implementación académica. Acceso gratuito incluido para todos los alumnos matriculados en el ciclo vigente.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
