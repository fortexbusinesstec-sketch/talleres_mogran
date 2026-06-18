'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  IconMicrophone, IconTheater,
  IconBodyScan, IconPresentationAnalytics,
  IconBulb, IconHeartHandshake, IconStar,
} from '@tabler/icons-react';

const outerTechniques = [
  { label: 'Locución', Icon: IconMicrophone },
  { label: 'Artes\nEscénicas', Icon: IconTheater },
  { label: 'Expresión\nCorporal', Icon: IconBodyScan },
  { label: 'Oratoria\nDigital', Icon: IconPresentationAnalytics },
  { label: 'Coaching\nMotivacional', Icon: IconBulb },
  { label: 'Habilidades\nSociales', Icon: IconHeartHandshake },
] as const;

const R = 38;
const cx = 50;
const cy = 50;

const outerPositions = Array.from({ length: 6 }, (_, i) => {
  const angle = (i * 60 - 90) * (Math.PI / 180);
  return {
    x: +(cx + R * Math.cos(angle)).toFixed(1),
    y: +(cy + R * Math.sin(angle)).toFixed(1),
  };
});

const spokeConnections = outerPositions.map((p) => ({ x2: p.x, y2: p.y }));

function ringPath(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = mx - cx;
  const dy = my - cy;
  const cpx = +(cx + dx * 1.6).toFixed(1);
  const cpy = +(cy + dy * 1.6).toFixed(1);
  return `M${a.x},${a.y} Q${cpx},${cpy} ${b.x},${b.y}`;
}

const curvedRingPaths = Array.from({ length: 6 }, (_, i) =>
  ringPath(outerPositions[i], outerPositions[(i + 1) % 6]),
);

export function ProblemSection() {
  const [animStep, setAnimStep] = useState(-1);
  const phaseTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const durations = [600, 500, 500, 500, 500, 500, 500, 500, 2200];

    phaseTimer.current = setTimeout(() => {
      setAnimStep((prev) => (prev + 1) % durations.length);
    }, animStep === -1 ? 800 : durations[animStep]);

    return () => clearTimeout(phaseTimer.current);
  }, [animStep]);

  useEffect(() => {
    const t = setTimeout(() => setAnimStep(0), 400);
    return () => clearTimeout(t);
  }, []);

  const isNodeLit = (idx: number) => animStep >= idx;
  const isRingLit = (idx: number) => animStep >= idx + 1;
  const centerLit = animStep >= 0;

  return (
    <section id="problem" className="bg-mogran-secondary section border-t border-white/10" aria-labelledby="problem-title">
      <div className="container-section">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2
            id="problem-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance"
          >
            Competencias que{' '}
            <span className="text-mogran-primary">desarrollarás</span>
          </h2>
          <p className="text-lg text-white/70 leading-relaxed">
            Un enfoque integral que abarca todas las áreas necesarias para comunicarte con confianza y
            seguridad en cualquier situación.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-xl">
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
              <div className="relative w-full aspect-square">
                {/* Central glow */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(248,20,67,0.1) 0%, transparent 70%)' }}
                  animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />

                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                  {/* Spokes (center → outer) */}
                  {spokeConnections.map((s, i) => (
                    <motion.line
                      key={`spoke-${i}`}
                      x1={cx} y1={cy} x2={s.x2} y2={s.y2}
                      stroke="#F81443"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeDasharray={isNodeLit(i) ? 'none' : '2 6'}
                      initial={{ pathLength: 0 }}
                      animate={{
                        pathLength: 1,
                        strokeOpacity: isNodeLit(i) ? 0.45 : 0.08,
                        strokeDashoffset: isNodeLit(i) ? 0 : [-8, 0],
                      }}
                      transition={{
                        pathLength: { duration: 0.8, delay: 0.05 * i },
                        strokeOpacity: { duration: 0.5, ease: 'easeInOut' },
                        strokeDashoffset: { duration: 1.2, repeat: Infinity, ease: 'linear' },
                      }}
                    />
                  ))}

                  {/* Outer ring connections (curved) */}
                  {curvedRingPaths.map((d, i) => (
                    <motion.path
                      key={`ring-${i}`}
                      d={d}
                      stroke="#F81443"
                      strokeWidth={1.2}
                      strokeLinecap="round"
                      strokeDasharray={isRingLit(i) ? 'none' : '2 6'}
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{
                        pathLength: 1,
                        strokeOpacity: isRingLit(i) ? 0.4 : 0.05,
                        strokeDashoffset: isRingLit(i) ? 0 : [-8, 0],
                      }}
                      transition={{
                        pathLength: { duration: 0.6, delay: 0.03 * i },
                        strokeOpacity: { duration: 0.5, ease: 'easeInOut' },
                        strokeDashoffset: { duration: 1.2, repeat: Infinity, ease: 'linear' },
                      }}
                    />
                  ))}
                </svg>

                {/* Outer nodes */}
                {outerTechniques.map((t, i) => {
                  const p = outerPositions[i];
                  const lit = isNodeLit(i);
                  const floatDur = 3.5 + i * 0.3;

                  return (
                    <div
                      key={t.label}
                      className="absolute flex flex-col items-center"
                      style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)' }}
                    >
                      <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: floatDur, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex flex-col items-center gap-1"
                      >
                        <motion.div
                          animate={{
                            scale: lit ? 1 : 0.85,
                            borderColor: lit ? 'rgba(248,20,67,0.6)' : 'rgba(255,255,255,0.1)',
                            boxShadow: lit
                              ? '0 0 16px rgba(248,20,67,0.25), 0 0 32px rgba(248,20,67,0.1)'
                              : '0 0 0px rgba(248,20,67,0)',
                          }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border-2 flex items-center justify-center shadow-lg"
                        >
                          <t.Icon
                            size={18}
                            className={lit ? 'text-mogran-primary' : 'text-white/30'}
                          />
                        </motion.div>

                        <motion.span
                          animate={{ color: lit ? 'rgb(248,250,252)' : 'rgba(255,255,255,0.4)' }}
                          transition={{ duration: 0.4 }}
                          className="text-[clamp(9px,2.5vw,12px)] font-semibold text-center leading-tight whitespace-pre-line"
                        >
                          {t.label}
                        </motion.span>
                      </motion.div>
                    </div>
                  );
                })}

                {/* Center node: Talleres Mogran */}
                <div
                  className="absolute flex flex-col items-center"
                  style={{ left: `${cx}%`, top: `${cy}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <motion.div
                    animate={{ scale: centerLit ? [1, 1.05, 1] : [0.9, 0.95, 0.9] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex flex-col items-center gap-1"
                  >
                    <motion.div
                      animate={{
                        borderColor: centerLit
                          ? 'rgba(248,20,67,0.8)'
                          : 'rgba(248,20,67,0.3)',
                        boxShadow: centerLit
                          ? '0 0 24px rgba(248,20,67,0.35), 0 0 48px rgba(248,20,67,0.15)'
                          : '0 0 8px rgba(248,20,67,0.1)',
                      }}
                      transition={{ duration: 0.6 }}
                      className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-full bg-white/5 border-[2.5px] flex items-center justify-center shadow-lg"
                    >
                      <IconStar size={24} className="text-mogran-primary" />
                    </motion.div>

                    <motion.span
                      animate={{ color: centerLit ? 'rgb(248,20,67)' : 'rgba(255,255,255,0.4)' }}
                      transition={{ duration: 0.4 }}
                      className="text-[clamp(10px,2.5vw,13px)] font-extrabold text-center leading-tight tracking-wider"
                    >
                      TALLERES
                      <br />
                      MOGRAN
                    </motion.span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
