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
      className={`bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:border-mogran-primary/30 hover:shadow-mogran-primary/5 ${className}`}
      aria-label={`Testimonio de ${testimonial.nombre}`}
    >
      <div className="flex items-center gap-2 mb-4" aria-hidden="true">
        <IconQuote size={28} strokeWidth={1.5} className="text-mogran-primary/40" />
      </div>
      <blockquote className="text-white/80 leading-relaxed mb-6 italic">
        &ldquo;{testimonial.texto}&rdquo;
      </blockquote>
      <footer className="flex items-center gap-3">
        {testimonial.fotoUrl && (
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-mogran-tertiary flex-shrink-0">
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
          <cite className="not-italic font-semibold text-white block">{testimonial.nombre}</cite>
          <span className="text-sm text-white/40">
            {testimonial.edad} · {testimonial.curso}
          </span>
        </div>
      </footer>
    </article>
  );
}
