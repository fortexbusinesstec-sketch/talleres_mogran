'use client';

import { motion } from 'motion/react';

interface WaveformProps {
  bars?: number;
  /** Tailwind bg-* color class for the bars */
  color?: string;
  /** Container height — bars animate as % of this */
  className?: string;
  /** Whether bars oscillate (true) or sit static-ish (false) */
  active?: boolean;
}

// Pseudo-random base heights so the wave looks organic, not uniform.
const PATTERN = [45, 80, 35, 95, 60, 25, 70, 50, 90, 40, 65, 30, 85, 55, 75];

export function Waveform({
  bars = 32,
  color = 'bg-mogran-primary',
  className = '',
  active = true,
}: WaveformProps) {
  return (
    <div className={`flex items-center gap-[3px] md:gap-1 ${className}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => {
        const base = PATTERN[i % PATTERN.length];
        return (
          <motion.span
            key={i}
            className={`w-[3px] md:w-[5px] rounded-full ${color}`}
            initial={{ height: `${base * 0.4}%` }}
            animate={
              active
                ? { height: [`${base * 0.25}%`, `${base}%`, `${base * 0.45}%`] }
                : { height: `${base * 0.5}%` }
            }
            transition={{
              duration: 0.7 + (i % 6) * 0.13,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: (i % 9) * 0.06,
            }}
          />
        );
      })}
    </div>
  );
}
