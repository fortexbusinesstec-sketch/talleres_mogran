'use client';

const row1 = [
  'Locución', 'Habla con Confianza', '25 Años de Trayectoria',
  'Artes Escénicas', 'Vence la Timidez', 'Lima · Perú',
  'Coaching Motivacional', 'Presencial y Virtual', 'Habilidades Sociales',
];

const row2 = [
  'Oratoria Práctica', '500+ Alumnos', 'Expresión Corporal',
  'Grupos Reducidos', 'Oratoria Digital', 'Método Integral',
  'Niños · Jóvenes · Adultos', 'Clases en Vivo', 'Certificado',
];

// Outlined (stroke) text — alternates with filled words for an editorial marquee.
const outlineStyle = {
  WebkitTextStroke: '1px rgba(255,255,255,0.35)',
  color: 'transparent',
} as const;

const Star = () => (
  <span
    className="mx-6 md:mx-8 text-mogran-primary text-[0.5em] align-middle flex-shrink-0"
    aria-hidden="true"
  >
    ✦
  </span>
);

export function RedSection() {
  return (
    <div
      className="bg-mogran-secondary overflow-hidden select-none border-y border-white/10 py-7 md:py-9 space-y-3 md:space-y-4"
      aria-hidden="true"
    >
      {/* Row 1 — large, alternating filled / outlined */}
      <div className="flex animate-marquee whitespace-nowrap">
        {[...row1, ...row1].map((item, i) => (
          <span key={i} className="inline-flex items-center flex-shrink-0">
            <span
              className="font-bold uppercase tracking-tight text-[clamp(1.5rem,3.4vw,2.6rem)] leading-none text-white"
              style={i % 2 === 1 ? outlineStyle : undefined}
            >
              {item}
            </span>
            <Star />
          </span>
        ))}
      </div>

      {/* Row 2 — smaller, dimmer, reverse direction */}
      <div className="flex animate-marquee-reverse whitespace-nowrap">
        {[...row2, ...row2].map((item, i) => (
          <span key={i} className="inline-flex items-center flex-shrink-0">
            <span
              className="font-semibold uppercase tracking-[0.15em] text-[clamp(0.7rem,1.3vw,0.95rem)] leading-none text-white/40"
            >
              {item}
            </span>
            <span className="mx-5 md:mx-7 w-1 h-1 rounded-full bg-mogran-primary/60 flex-shrink-0" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}
