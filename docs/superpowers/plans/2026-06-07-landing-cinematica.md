# Landing Cinematográfica — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevar la landing de Talleres Mogran de genérica a cinematográfica: nueva narrativa de transformación, tipografía display, animaciones de scroll, barra de stats y sección de testimonios.

**Architecture:** Se conserva la paleta navy + verde (#73D300) y todos los componentes UI existentes. Se añaden dos componentes nuevos (StatsBar, TestimonialsSection), se reordena `page.tsx` y se aplica la fuente Bebas Neue a todos los headings de sección via CSS variable de Tailwind v4.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, `motion/react` (ya instalado), `next/font/google`

---

## File Map

| Acción | Archivo |
|---|---|
| Modify | `src/app/layout.tsx` |
| Modify | `src/app/globals.css` |
| Modify | `src/app/page.tsx` |
| Create | `src/components/sections/StatsBar.tsx` |
| Create | `src/components/sections/TestimonialsSection.tsx` |
| Modify | `src/components/sections/HeroSection.tsx` |
| Modify | `src/components/sections/ProblemSection.tsx` |
| Modify | `src/components/sections/MethodSection.tsx` |
| Modify | `src/components/sections/AudienceSection.tsx` |
| Modify | `src/components/sections/ScheduleSection.tsx` |
| Modify | `src/components/sections/PaymentSection.tsx` |
| Modify | `src/components/sections/ProfessorSection.tsx` |
| Modify | `src/components/sections/ClosingSection.tsx` |
| Delete | `src/components/sections/RedSection.tsx` |

---

## Task 1: Bebas Neue font setup

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Reemplazar Montserrat con Bebas Neue en layout.tsx**

Montserrat está importado pero no se usa en CSS. Reemplazarlo con Bebas Neue:

```tsx
// src/app/layout.tsx — línea 2: cambiar import
import { Inter, Bebas_Neue } from 'next/font/google';
```

```tsx
// Reemplazar el bloque montserrat (líneas 13-17) con:
const bebasNeue = Bebas_Neue({
  weight: '400',
  variable: '--font-bebas',
  subsets: ['latin'],
  display: 'swap',
});
```

```tsx
// Línea 166: cambiar la className del <html>
<html lang="es" className={`${inter.variable} ${bebasNeue.variable} h-full antialiased`}>
```

- [ ] **Step 2: Agregar CSS variable de display font en globals.css**

Dentro del bloque `@theme inline { ... }`, después de `--font-heading`:

```css
--font-display: var(--font-bebas), system-ui, sans-serif;
```

Esto crea la clase Tailwind `font-display` que se usará en todos los headings de sección.

- [ ] **Step 3: Verificar que compila**

```bash
cd /Users/estebanmacbook/Document/Code/NextJS/talleres_mogran && npm run typecheck
```

Esperado: sin errores de tipos.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat: add Bebas Neue display font via next/font"
```

---

## Task 2: Crear StatsBar (reemplaza RedSection)

**Files:**
- Create: `src/components/sections/StatsBar.tsx`

- [ ] **Step 1: Crear el componente**

```tsx
// src/components/sections/StatsBar.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 500, suffix: '+', label: 'alumnos formados' },
  { value: 25, suffix: '', label: 'años de experiencia' },
  { value: 4.9, suffix: '', label: '★ valoración promedio' },
  { value: 3, suffix: '', label: 'modalidades disponibles' },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const isDecimal = !Number.isInteger(value);

  useEffect(() => {
    if (!isInView) return;
    const start = Date.now();
    const duration = 1400;
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;
      setDisplay(isDecimal ? Math.round(current * 10) / 10 : Math.round(current));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, value, isDecimal]);

  return (
    <span ref={ref}>
      {isDecimal ? display.toFixed(1) : display}{suffix}
    </span>
  );
}

export function StatsBar() {
  return (
    <section
      className="bg-mogran-accent py-6 md:py-8"
      aria-label="Estadísticas de Talleres Mogran"
    >
      <div className="container-section mx-auto max-w-7xl">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-mogran-dark-base/20">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center px-4"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd
                className="text-3xl md:text-4xl font-display text-mogran-dark-base font-black leading-none"
                aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
              >
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </dd>
              <span className="mt-1 text-xs md:text-sm text-mogran-dark-base/70 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar tipos**

```bash
npm run typecheck
```

Esperado: sin errores.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/StatsBar.tsx
git commit -m "feat: add StatsBar with animated counters"
```

---

## Task 3: Crear TestimonialsSection

**Files:**
- Create: `src/components/sections/TestimonialsSection.tsx`

- [ ] **Step 1: Crear el componente**

```tsx
// src/components/sections/TestimonialsSection.tsx
'use client';

import { motion } from 'motion/react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  segment: 'Niños' | 'Jóvenes' | 'Adultos';
}

const testimonials: Testimonial[] = [
  {
    quote:
      'Yo temblaba antes de cualquier presentación. Ahora puedo hablar en reuniones sin que me cueste. No soy otra persona. Soy yo, con herramientas.',
    name: 'Carla M.',
    role: 'Ejecutiva de ventas · 34 años',
    initials: 'CM',
    segment: 'Adultos',
  },
  {
    quote:
      'Mi hijo de 9 años no levantaba la mano en clase. Después de dos meses, pidió participar en el festival de lectura. Fue él quien lo pidió.',
    name: 'Carlos P.',
    role: 'Padre de alumno · Curso niños',
    initials: 'CP',
    segment: 'Niños',
  },
  {
    quote:
      'Pensé que me obligarían a hablar frente a todos el primer día. Empezamos de a pocos. Cuando me di cuenta, ya estaba presentando.',
    name: 'Luis R.',
    role: 'Universitario · 22 años',
    initials: 'LR',
    segment: 'Jóvenes',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export function TestimonialsSection() {
  return (
    <section
      id="testimonios"
      className="bg-mogran-dark-base py-20 md:py-28"
      aria-labelledby="testimonios-title"
    >
      <div className="container-section mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-mogran-accent mb-3">
            Lo que dicen nuestros alumnos
          </p>
          <h2
            id="testimonios-title"
            className="font-display text-4xl md:text-5xl lg:text-6xl text-white tracking-wide"
          >
            HISTORIAS REALES.
            <span className="text-mogran-accent"> CAMBIOS REALES.</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {testimonials.map((t) => (
            <motion.article
              key={t.name}
              variants={cardVariants}
              className="flex flex-col gap-5 rounded-2xl bg-mogran-dark-elevated border border-mogran-dark-border p-6 md:p-8 relative overflow-hidden"
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-1 bg-mogran-accent rounded-l-2xl"
                aria-hidden="true"
              />
              <blockquote className="text-mogran-dark-text-secondary leading-relaxed text-sm md:text-base flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <footer className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full bg-mogran-dark-surface border border-mogran-accent/30 flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <span className="text-mogran-accent text-xs font-bold">{t.initials}</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-mogran-dark-text-muted text-xs">{t.role}</p>
                </div>
                <span className="ml-auto text-xs font-medium text-mogran-accent bg-mogran-accent/10 px-2 py-1 rounded-full border border-mogran-accent/20">
                  {t.segment}
                </span>
              </footer>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar tipos**

```bash
npm run typecheck
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/TestimonialsSection.tsx
git commit -m "feat: add TestimonialsSection with staggered scroll animation"
```

---

## Task 4: Reestructurar page.tsx

**Files:**
- Modify: `src/app/page.tsx`
- Delete: `src/components/sections/RedSection.tsx`

- [ ] **Step 1: Reemplazar contenido de page.tsx**

```tsx
// src/app/page.tsx
import { HeroSection } from '@/components/sections/HeroSection';
import { StatsBar } from '@/components/sections/StatsBar';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { MethodSection } from '@/components/sections/MethodSection';
import { AudienceSection } from '@/components/sections/AudienceSection';
import { ScheduleSection } from '@/components/sections/ScheduleSection';
import { ProfessorSection } from '@/components/sections/ProfessorSection';
import { PaymentSection } from '@/components/sections/PaymentSection';
import { ClosingSection } from '@/components/sections/ClosingSection';
import { Navbar } from '@/components/ui/Navbar';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <StatsBar />
      <TestimonialsSection />
      <ProblemSection />
      <MethodSection />
      <AudienceSection />
      <ScheduleSection />
      <ProfessorSection />
      <PaymentSection />
      <ClosingSection />
    </>
  );
}
```

- [ ] **Step 2: Eliminar RedSection.tsx**

```bash
rm /Users/estebanmacbook/Document/Code/NextJS/talleres_mogran/src/components/sections/RedSection.tsx
```

- [ ] **Step 3: Verificar que compila sin errores**

```bash
npm run typecheck
```

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git rm src/components/sections/RedSection.tsx
git commit -m "refactor: restructure page sections, replace RedSection with StatsBar"
```

---

## Task 5: Hero — nuevo copy + heading display

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`

- [ ] **Step 1: Actualizar heading principal y copy**

En `HeroSection.tsx`, reemplazar el bloque `{/* H1 */}` (líneas 52-57) con:

```tsx
{/* H1 — display font */}
<h1
  id="hero-title"
  className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-none tracking-wide"
>
  DE TÍMIDO<br />
  <span className="text-mogran-accent">A IMPARABLE.</span>
</h1>
```

- [ ] **Step 2: Actualizar H2 — premisa más directa**

Reemplazar el bloque `{/* H2 - Premisa */}` con:

```tsx
{/* H2 - Premisa */}
<p className="text-base md:text-lg text-mogran-dark-text-secondary leading-relaxed max-w-xl">
  El único método de oratoria adaptado a{' '}
  <span className="text-white font-semibold">tu personalidad</span>.
  Para niños, jóvenes y adultos que prefieren escuchar antes de hablar.
</p>
```

- [ ] **Step 3: Actualizar CTA**

Reemplazar el texto del botón:

```tsx
// Cambiar el texto del botón (dentro del <button onClick={() => scrollTo('schedule')}>)
Reservar mi lugar en el próximo ciclo →
```

- [ ] **Step 4: Agregar animación de entrada al heading**

Envolver `h1` con motion para entrada dramática:

```tsx
// Al inicio del archivo, agregar import:
import { motion } from 'motion/react';

// Reemplazar el h1 con:
<motion.h1
  id="hero-title"
  className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-none tracking-wide"
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
>
  DE TÍMIDO<br />
  <span className="text-mogran-accent">A IMPARABLE.</span>
</motion.h1>
```

- [ ] **Step 5: Verificar tipos**

```bash
npm run typecheck
```

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/HeroSection.tsx
git commit -m "feat: hero with display font and transformation copy"
```

---

## Task 6: Headings display en secciones existentes

Aplicar `font-display` y breathing room a todas las secciones. Cada una es un cambio quirúrgico al `h2` y al `className` de la `<section>`.

**Files:**
- Modify: `src/components/sections/ProblemSection.tsx`
- Modify: `src/components/sections/MethodSection.tsx`
- Modify: `src/components/sections/AudienceSection.tsx`
- Modify: `src/components/sections/ScheduleSection.tsx`
- Modify: `src/components/sections/PaymentSection.tsx`

- [ ] **Step 1: ProblemSection — heading empático + display font**

Buscar el `h2` con `className="text-3xl md:text-4xl..."` y reemplazarlo:

```tsx
<h2
  id="problem-title"
  className="font-display text-4xl md:text-5xl lg:text-6xl text-mogran-dark-text tracking-wide text-balance"
>
  ¿TE RECONOCES<br />
  <span className="text-mogran-accent">EN ESTO?</span>
</h2>
```

En el elemento `<section>` de ProblemSection, agregar `py-24 md:py-32` si el elemento no los tiene ya. Si usa la clase `section` de globals, agregar adicionalmente `py-24 md:py-32` para sobreescribir el padding por defecto.

- [ ] **Step 2: MethodSection — heading display**

```tsx
<h2
  id="method-title"
  className="font-display text-4xl md:text-5xl lg:text-6xl text-mogran-dark-text tracking-wide text-balance"
>
  PASO A PASO<br />
  <span className="text-mogran-accent">HACIA TU VOZ.</span>
</h2>
```

- [ ] **Step 3: AudienceSection — heading display**

```tsx
<h2
  id="audience-title"
  className="font-display text-4xl md:text-5xl lg:text-6xl text-mogran-dark-text tracking-wide text-balance text-center"
>
  DISEÑADO PARA<br />
  <span className="text-mogran-accent">CADA ETAPA.</span>
</h2>
```

- [ ] **Step 4: ScheduleSection — heading display**

```tsx
<h2
  id="schedule-title"
  className="font-display text-4xl md:text-5xl lg:text-6xl text-mogran-dark-text tracking-wide text-balance text-center"
>
  HORARIOS<br />
  <span className="text-mogran-accent">FLEXIBLES.</span>
</h2>
```

- [ ] **Step 5: PaymentSection — heading display**

```tsx
<h2
  id="payment-title"
  className="font-display text-4xl md:text-5xl lg:text-6xl text-mogran-dark-text tracking-wide text-balance text-center"
>
  ¿CÓMO<br />
  <span className="text-mogran-accent">PUEDO PAGAR?</span>
</h2>
```

- [ ] **Step 6: Verificar tipos**

```bash
npm run typecheck
```

- [ ] **Step 7: Commit**

```bash
git add src/components/sections/ProblemSection.tsx src/components/sections/MethodSection.tsx src/components/sections/AudienceSection.tsx src/components/sections/ScheduleSection.tsx src/components/sections/PaymentSection.tsx
git commit -m "feat: apply display font headings across all sections"
```

---

## Task 7: ProfessorSection — autoridad + heading display

**Files:**
- Modify: `src/components/sections/ProfessorSection.tsx`

- [ ] **Step 1: Actualizar heading principal**

Reemplazar el `h2` actual (línea 54-59) con:

```tsx
<h2
  id="professor-title"
  className="font-display text-4xl md:text-5xl lg:text-6xl text-mogran-dark-text tracking-wide text-balance text-center max-w-3xl mx-auto mb-16"
>
  25 AÑOS AYUDANDO<br />
  <span className="text-mogran-accent">A ENCONTRAR TU VOZ.</span>
</h2>
```

- [ ] **Step 2: Agregar badges de credibilidad antes del texto bio**

Después del `h3` con el nombre del profesor (línea 80) y el párrafo de "Comunicador, locutor..." (línea 84), agregar los badges:

```tsx
{/* Badges de credibilidad */}
<div className="flex flex-wrap gap-2 mb-6" aria-label="Credenciales">
  {[
    '📺 TV & Radio',
    '🏆 25 años de experiencia',
    '👥 +500 alumnos',
    '🎙️ Locutor profesional',
    '📍 Lima, Perú',
  ].map((badge) => (
    <span
      key={badge}
      className="text-xs font-medium px-3 py-1.5 rounded-full bg-mogran-dark-surface border border-mogran-dark-border text-mogran-dark-text-secondary"
    >
      {badge}
    </span>
  ))}
</div>
```

- [ ] **Step 3: Verificar tipos**

```bash
npm run typecheck
```

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/ProfessorSection.tsx
git commit -m "feat: professor section with authority badges and display heading"
```

---

## Task 8: ClosingSection — urgencia + heading display

**Files:**
- Modify: `src/components/sections/ClosingSection.tsx`

- [ ] **Step 1: Actualizar heading FAQ**

Reemplazar el `h2` del cierre (línea 43-48) con:

```tsx
<h2
  id="closing-title"
  className="font-display text-4xl md:text-5xl lg:text-6xl text-mogran-dark-text tracking-wide text-center mb-12"
>
  PREGUNTAS<br />
  <span className="text-mogran-accent">FRECUENTES.</span>
</h2>
```

- [ ] **Step 2: Actualizar CTA final con urgencia**

Reemplazar el `h3` del CTA final (línea 57) con:

```tsx
<h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-mogran-dark-text tracking-wide text-balance mb-4">
  DA EL PRIMER PASO.<br />
  <span className="text-mogran-accent">LOS CUPOS SON LIMITADOS.</span>
</h3>
```

Agregar badge de urgencia antes del `h3`:

```tsx
{/* Badge urgencia */}
<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mogran-accent/10 border border-mogran-accent/30 mb-6">
  <span className="w-2 h-2 rounded-full bg-mogran-accent animate-pulse" aria-hidden="true" />
  <span className="text-mogran-accent text-sm font-semibold">Inscripciones abiertas · Grupos de máx. 12 personas</span>
</div>
```

- [ ] **Step 3: Verificar tipos**

```bash
npm run typecheck
```

- [ ] **Step 4: Build de producción para validar todo**

```bash
npm run build
```

Esperado: build exitoso sin errores. Si hay warnings de imágenes o fuentes, son aceptables.

- [ ] **Step 5: Commit final**

```bash
git add src/components/sections/ClosingSection.tsx
git commit -m "feat: closing section with urgency and display heading"
```

---

## Verificación final

Una vez completadas todas las tareas, correr en el servidor de desarrollo y verificar visualmente:

```bash
npm run dev
```

Checklist visual:
- [ ] Hero: heading en Bebas Neue grande, copy "DE TÍMIDO / A IMPARABLE"
- [ ] StatsBar verde con números animándose al scroll
- [ ] TestimonialsSection: 3 tarjetas aparecen escalonadas al scroll
- [ ] Todas las secciones tienen heading en Bebas Neue
- [ ] ProfessorSection: badges visibles debajo del nombre
- [ ] ClosingSection: badge de urgencia + heading display
- [ ] No hay referencia a RedSection en ningún archivo
