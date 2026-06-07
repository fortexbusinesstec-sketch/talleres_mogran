'use client';

import Image from 'next/image';
import { Testimonial } from '@/types';
import { IconQuote } from '@tabler/icons-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className = '' }: TestimonialCardProps) {
  return (
    <article
      className={`bg-mogran-dark-surface border border-mogran-dark-border rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:border-mogran-accent/30 hover:shadow-mogran-accent/5 ${className}`}
      aria-label={`Testimonio de ${testimonial.nombre}`}
    >
      <div className="flex items-center gap-2 mb-4" aria-hidden="true">
        <IconQuote size={28} strokeWidth={1.5} className="text-mogran-accent/40" />
      </div>
      <blockquote className="text-mogran-dark-text-secondary leading-relaxed mb-6 italic">
        &ldquo;{testimonial.texto}&rdquo;
      </blockquote>
      <footer className="flex items-center gap-3">
        {testimonial.fotoUrl && (
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-mogran-dark-elevated flex-shrink-0">
            <Image
              src={testimonial.fotoUrl}
              alt=""
              fill
              sizes="40px"
              className="object-cover"
              loading="lazy"
            />
          </div>
        )}
        <div className="text-left">
          <cite className="not-italic font-semibold text-mogran-dark-text block">{testimonial.nombre}</cite>
          <span className="text-sm text-mogran-dark-text-muted">
            {testimonial.edad} · {testimonial.curso}
          </span>
        </div>
      </footer>
    </article>
  );
}