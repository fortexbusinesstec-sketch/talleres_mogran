'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { Waveform } from '@/components/ui/Waveform';

interface SectionHeadingProps {
  /** Mono kicker label, e.g. "02 / método" */
  kicker: string;
  /** Heading content. Use <em> for the accent word (renders non-italic in primary color). */
  title: ReactNode;
  /** Optional supporting paragraph. */
  description?: ReactNode;
  /** Theme: dark sections (navy bg) use light text; light sections (cream/white) use dark text. */
  theme?: 'dark' | 'light';
  /** Alignment of the block. Editorial default is left. */
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  kicker,
  title,
  description,
  theme = 'dark',
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const isDark = theme === 'dark';
  const alignCls = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';

  return (
    <div className={`flex flex-col ${alignCls} ${className}`}>
      <motion.span
        className="text-[11px] font-mono uppercase tracking-[0.35em] text-mogran-primary mb-6 flex items-center gap-3"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
      >
        <Waveform bars={5} className="h-4 w-7" color="bg-mogran-primary" />
        {kicker}
      </motion.span>

      <motion.h2
        className={`font-bold leading-[0.95] tracking-tight text-[clamp(2.4rem,6vw,5rem)] text-balance ${
          isDark ? 'text-white' : 'text-mogran-secondary'
        } [&_em]:not-italic [&_em]:text-mogran-primary`}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.08 }}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          className={`mt-6 text-base md:text-lg leading-relaxed max-w-xl ${
            isDark ? 'text-white/60' : 'text-mogran-neutral'
          } ${align === 'center' ? 'mx-auto' : ''}`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.16 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
