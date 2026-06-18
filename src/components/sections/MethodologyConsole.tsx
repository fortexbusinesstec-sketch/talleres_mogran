'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SubTask {
  id: number;
  title: string;
  desc: string;
}

interface Phase {
  title: string;
  subtitle: string;
  items: SubTask[];
}

const data: Phase[] = [
  {
    title: 'Desbloqueo Emocional',
    subtitle: 'Fase 01 · Derribar el Bloqueo',
    items: [
      { id: 1, title: '100% práctico', desc: 'Ejemplos reales de la vida diaria, no teoría abstracta en el aire.' },
      { id: 2, title: 'Vencer el miedo sin exposición', desc: 'Progresión respetuosa en set cerrado que cuida tu ritmo inicial.' },
      { id: 5, title: 'Conversaciones fluidas', desc: 'Estrategias dinámicas para iniciar y sostener diálogos sin quedarte en blanco.' },
    ],
  },
  {
    title: 'Control Expresivo',
    subtitle: 'Fase 02 · El Lenguaje Humano',
    items: [
      { id: 3, title: 'Postura y control', desc: 'Proyectar seguridad mediante el posicionamiento del eje corporal.' },
      { id: 6, title: 'Expresión corporal', desc: 'Uso estratégico de las manos y dominio del contacto visual en el set.' },
      { id: 7, title: 'Dicción y pronunciación', desc: 'Ejercicios modulares para hablar con claridad milimétrica y sin esfuerzo.' },
      { id: 9, title: 'Comunicación no verbal', desc: 'Alineación del lenguaje silencioso para ser leído e interpretado correctamente.' },
      { id: 10, title: 'Modulación de la voz', desc: 'Control de velocidad y volumen para eliminar el tono monótono por nervios.' },
    ],
  },
  {
    title: 'Impacto y Ejecución',
    subtitle: 'Fase 03 · Alta Performance',
    items: [
      { id: 4, title: 'Lectura en voz alta', desc: 'Técnicas de ritmo y entonación para eliminar el tartamudeo o tropiezos al leer.' },
      { id: 8, title: 'Presentaciones efectivas', desc: 'Estructuración ágil de ideas para responder con autoridad bajo presión.' },
    ],
  },
];

export function MethodologyConsole() {
  const [activePhase, setActivePhase] = useState<number>(0);
  const [activeItem, setActiveItem] = useState<number>(0);

  useEffect(() => {
    setActiveItem(0);
  }, [activePhase]);

  const currentItem = data[activePhase].items[activeItem];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">

      {/* COLUMNA 1: Macro-Fases (3 Capas) */}
      <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
        <span className="text-xs font-bold uppercase tracking-widest text-white/40 px-2 mb-1">
          [ 01 / Selecciona Pilar ]
        </span>
        {data.map((phase, idx) => (
          <button
            key={idx}
            onClick={() => setActivePhase(idx)}
            className={`w-full p-5 rounded-2xl border text-left transition-all relative overflow-hidden ${
              activePhase === idx
                ? 'bg-white/5 border-white/20 shadow-md'
                : 'bg-transparent border-white/10 hover:border-white/30'
            }`}
          >
            {activePhase === idx && (
              <motion.div
                layoutId="activePhaseIndicator"
                className="absolute left-0 top-0 bottom-0 w-1.5 bg-mogran-primary"
              />
            )}
            <p className={`text-xs font-mono mb-1 ${activePhase === idx ? 'text-mogran-primary' : 'text-white/40'}`}>
              PILAR DE ENTRENAMIENTO 0{idx + 1}
            </p>
            <h3 className={`text-lg font-bold ${activePhase === idx ? 'text-white' : 'text-white/60'}`}>
              {phase.title}
            </h3>
          </button>
        ))}
      </div>

      {/* COLUMNA 2: Sub-Canales Técnicos */}
      <div className="lg:col-span-3 flex flex-col gap-2 bg-mogran-secondary/60 p-4 rounded-2xl border border-white/10 justify-center">
        <span className="text-xs font-bold uppercase tracking-widest text-white/40 px-2 mb-1">
          [ 02 / Parámetro ]
        </span>
        <div className="space-y-1.5 max-h-[320px] overflow-y-auto pr-1">
          {data[activePhase].items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(idx)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                activeItem === idx
                  ? 'bg-mogran-primary/10 border-mogran-primary/30 text-mogran-primary'
                  : 'bg-white/5 border-transparent text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="truncate">{item.title}</span>
              <span className={`font-mono text-xs ${activeItem === idx ? 'text-mogran-primary' : 'text-white/30'}`}>
                CH.{item.id.toString().padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* COLUMNA 3: Monitor de Visualización */}
      <div className="lg:col-span-5 bg-mogran-secondary border border-white/10 rounded-2xl p-8 min-h-[340px] flex flex-col justify-between relative overflow-hidden">
        {/* Trama técnica de fondo */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-100 pointer-events-none" />
        <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-white/30 tracking-widest pointer-events-none">
          MOGRAN_OS_V2.6
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activePhase}-${activeItem}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="relative z-10 space-y-4 my-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-md font-mono text-xs text-white/60">
              <span className="w-2 h-2 rounded-full bg-mogran-primary animate-pulse" />
              {data[activePhase].subtitle}
            </div>

            <h4 className="text-2xl font-bold tracking-tight text-white">
              {currentItem?.title}
            </h4>

            <p className="text-white/70 text-base leading-relaxed">
              {currentItem?.desc}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Falso Ecualizador Gráfico Inferior */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex items-center gap-1.5 h-6">
          {[...Array(24)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                height:
                  activePhase === 0
                    ? [4, 16, 6, 12, 4][i % 5]
                    : activePhase === 1
                      ? [6, 22, 10, 18, 6][i % 5]
                      : [8, 12, 14, 8, 10][i % 5],
              }}
              transition={{
                duration: 0.6 + (i % 3) * 0.1,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className={`w-1 rounded-full ${i > 18 ? 'bg-white/10' : 'bg-mogran-primary/60'}`}
            />
          ))}
        </div>

      </div>

    </div>
  );
}
