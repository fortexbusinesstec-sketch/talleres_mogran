# Design System Rebrand — Mogran Landing

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar el sistema Inter + verde neón + dark-mode por Fredoka + paleta rojo/navy/crema con secciones oscuras estratégicas.

**Architecture:** Un único punto de verdad en `globals.css` + `tailwind.config.ts` define los 8 tokens nuevos. Los componentes se actualizan manualmente porque tienen clases `mogran-dark-*` y hex hardcodeados que los tokens solos no pueden reemplazar.

**Tech Stack:** Next.js 16 (App Router), Tailwind v4 (`@import "tailwindcss"`), `next/font/google` (Fredoka + Fredoka One), Framer Motion.

## Global Constraints

- Paleta EXACTA: primary `#F81443`, secondary `#14213D`, tertiary `#FCF2D1`, neutral `#2D3436`, white `#FFFFFF`, primary-hover `#D6103A`, primary-subtle `#FEE5EA`, border `#E8E0D0`
- Fuentes EXACTAS: Fredoka (body, 400/500/600) y Fredoka One (headings, 400)
- No agregar tokens ni colores fuera de la paleta definida — usar opacidad Tailwind (`white/10`, `mogran-primary/20`) para variantes
- No modificar lógica JS/TS — solo clases CSS, imports de fuente y valores de color
- Verificación visual: `npm run dev` (puerto 3005) tras cada task

## Token de reemplazo rápido (referencia global)

| Token eliminado | Reemplazar por |
|---|---|
| `mogran-dark-base` | `mogran-secondary` |
| `mogran-dark-elevated` | `white/5` (sobre oscuro) o `mogran-tertiary` (sobre claro) |
| `mogran-dark-surface` | `white/5` |
| `mogran-dark-border` | `white/10` |
| `mogran-dark-text` | `white` |
| `mogran-dark-text-secondary` | `white/70` |
| `mogran-dark-text-muted` | `white/40` |
| `mogran-accent` | `mogran-primary` |
| `mogran-canvas` | `mogran-white` |
| `mogran-primary` (teal viejo) | `mogran-secondary` |
| `#73D300` / `rgba(115,211,0,...)` | `#F81443` / `rgba(248,20,67,...)` |
| `bg-[#0a1e5c]` | `bg-mogran-secondary` |

---

### Task 1: Base — globals.css + tailwind.config.ts + layout.tsx

**Files:**
- Modify: `src/app/globals.css`
- Modify: `tailwind.config.ts`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: variables CSS `--color-mogran-*`, utilidades `.dot-grid`, `.radial-glow`, `.glow-ring`, font variables `--font-sans` / `--font-heading`; clases Tailwind `mogran-primary`, `mogran-secondary`, `mogran-tertiary`, `mogran-neutral`, `mogran-white`, `mogran-border`

- [ ] **Step 1: Reemplazar globals.css completo**

```css
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Fredoka:wght@400;500;600&display=swap');
@import "tailwindcss";

@theme inline {
  --color-mogran-primary: #F81443;
  --color-mogran-primary-hover: #D6103A;
  --color-mogran-primary-subtle: #FEE5EA;
  --color-mogran-secondary: #14213D;
  --color-mogran-tertiary: #FCF2D1;
  --color-mogran-neutral: #2D3436;
  --color-mogran-white: #FFFFFF;
  --color-mogran-border: #E8E0D0;

  --font-sans: "Fredoka", system-ui, sans-serif;
  --font-heading: "Fredoka One", system-ui, sans-serif;
  --spacing-section: 6rem;
  --spacing-section-sm: 4rem;
}

:root {
  --background: #FFFFFF;
  --foreground: #2D3436;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3 {
  font-family: var(--font-heading);
}

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

*:focus-visible {
  outline: 2px solid var(--color-mogran-primary);
  outline-offset: 2px;
}

.container-section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.section {
  padding-top: var(--spacing-section);
  padding-bottom: var(--spacing-section);
}

@media (max-width: 768px) {
  .section {
    padding-top: var(--spacing-section-sm);
    padding-bottom: var(--spacing-section-sm);
  }
}

.text-balance { text-wrap: balance; }

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Utilidades de fondo para secciones oscuras (navy) */
.dot-grid {
  background-image: radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px);
  background-size: 24px 24px;
}

.radial-glow {
  background:
    radial-gradient(ellipse 80% 60% at 20% 0%, rgba(248, 20, 67, 0.08), transparent 50%),
    radial-gradient(ellipse 60% 50% at 80% 100%, rgba(248, 20, 67, 0.05), transparent 50%);
}

.glow-ring {
  box-shadow:
    0 0 20px rgba(248, 20, 67, 0.2),
    0 0 40px rgba(248, 20, 67, 0.1),
    0 0 80px rgba(248, 20, 67, 0.05);
}

@keyframes pulse-soft {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.9; }
}

.animate-pulse-soft {
  animation: pulse-soft 2.5s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(248, 20, 67, 0.25), 0 0 40px rgba(248, 20, 67, 0.12); }
  50% { box-shadow: 0 0 30px rgba(248, 20, 67, 0.4), 0 0 60px rgba(248, 20, 67, 0.2); }
}

.animate-glow-pulse {
  animation: glow-pulse 3s ease-in-out infinite;
}

@keyframes icon-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.animate-icon-float {
  animation: icon-float 3s ease-in-out infinite;
}
```

- [ ] **Step 2: Reemplazar tailwind.config.ts**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mogran: {
          primary: "#F81443",
          "primary-hover": "#D6103A",
          "primary-subtle": "#FEE5EA",
          secondary: "#14213D",
          tertiary: "#FCF2D1",
          neutral: "#2D3436",
          white: "#FFFFFF",
          border: "#E8E0D0",
        },
      },
      fontFamily: {
        sans: ["Fredoka", "system-ui", "sans-serif"],
        heading: ["Fredoka One", "system-ui", "sans-serif"],
      },
      spacing: {
        section: "6rem",
        "section-sm": "4rem",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 3: Actualizar layout.tsx — fuentes**

Reemplazar los imports de fuente y las variables en el `<html>`:

```tsx
import { Fredoka, Fredoka_One } from 'next/font/google';

const fredoka = Fredoka({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const fredokaOne = Fredoka_One({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});
```

Y en el JSX:

```tsx
<html lang="es" className={`${fredoka.variable} ${fredokaOne.variable} h-full antialiased`}>
  ...
  <body className="flex min-h-full flex-col bg-white text-mogran-neutral">
    {children}
  </body>
```

- [ ] **Step 4: Verificar en el navegador**

```bash
npm run dev
```

Abrir `http://localhost:3005`. Confirmar que la fuente cambió a Fredoka (redondeada) en toda la página. El sitio se verá roto en colores — eso es esperado hasta los tasks siguientes.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css tailwind.config.ts src/app/layout.tsx
git commit -m "feat: apply Fredoka typography and new mogran color tokens"
```

---

### Task 2: Navbar + Button + Badge

**Files:**
- Modify: `src/components/ui/Navbar.tsx`
- Modify: `src/components/ui/Button.tsx`
- Modify: `src/components/ui/Badge.tsx`

**Interfaces:**
- Consumes: tokens `mogran-primary`, `mogran-secondary`, `mogran-tertiary`, `mogran-white` del Task 1
- Produces: componentes UI base usados en todas las secciones

- [ ] **Step 1: Actualizar Navbar.tsx**

Reemplazar todas las clases. El navbar es navy oscuro con texto blanco y accent rojo:

```tsx
<header
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled
      ? 'bg-mogran-secondary/90 backdrop-blur-xl border-b border-white/10'
      : 'bg-mogran-secondary/60 backdrop-blur-sm'
  }`}
  role="banner"
>
```

Logo:
```tsx
<span className="text-lg md:text-xl font-bold text-white tracking-tight">
  Talleres <span className="text-mogran-primary">Mogran</span>
</span>
```

Links de navegación desktop:
```tsx
className="text-sm font-medium text-white/70 hover:text-mogran-primary transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-mogran-primary rounded-md px-2 py-1"
```

Botón CTA desktop:
```tsx
className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-transparent border-2 border-mogran-primary rounded-lg hover:bg-mogran-primary transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-mogran-primary focus-visible:ring-offset-2 focus-visible:ring-offset-mogran-secondary"
```

Botón hamburguesa mobile:
```tsx
className="md:hidden p-2 text-white hover:text-mogran-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-mogran-primary rounded-md"
```

Menú mobile — divisor y fondo:
```tsx
<div className="flex flex-col gap-1 pt-4 border-t border-white/10">
```

Links mobile:
```tsx
className="block px-3 py-3 text-base font-medium text-white/70 hover:text-mogran-primary hover:bg-white/5 rounded-md transition-colors duration-200"
```

CTA mobile:
```tsx
className="mt-2 inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-white bg-transparent border-2 border-mogran-primary rounded-lg hover:bg-mogran-primary transition-all duration-300"
```

También actualizar el `aria-label` del logo:
```tsx
className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-mogran-primary rounded-md px-1"
```

- [ ] **Step 2: Actualizar Button.tsx**

```tsx
const variantStyles: Record<Variant, string> = {
  primary: 'bg-mogran-primary text-white hover:bg-mogran-primary-hover shadow-lg shadow-mogran-primary/20',
  secondary: 'border-2 border-mogran-secondary text-mogran-secondary hover:bg-mogran-secondary hover:text-white',
  ghost: 'text-mogran-neutral hover:text-mogran-secondary hover:bg-mogran-tertiary',
};

const baseStyles =
  'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-mogran-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed';
```

- [ ] **Step 3: Actualizar Badge.tsx**

Leer el archivo para ver variantes actuales. Reemplazar:
- Cualquier referencia a `mogran-accent` → `mogran-primary`
- Cualquier referencia a `mogran-dark-*` → tokens nuevos
- Variante `primary`: `bg-mogran-primary-subtle text-mogran-primary border border-mogran-primary/20`
- Variante `accent` (si existe): renombrar conceptualmente a secondary → `bg-mogran-secondary/10 text-mogran-secondary border border-mogran-secondary/20`

- [ ] **Step 4: Verificar en el navegador**

Abrir `http://localhost:3005`. El navbar debe verse navy con texto blanco y el logo "Mogran" en rojo. Los botones deben ser rojos.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/Navbar.tsx src/components/ui/Button.tsx src/components/ui/Badge.tsx
git commit -m "feat: update Navbar, Button, Badge to new color palette"
```

---

### Task 3: Accordion + TabGroup + TestimonialCard + VideoPlayer

**Files:**
- Modify: `src/components/ui/Accordion.tsx`
- Modify: `src/components/ui/TabGroup.tsx`
- Modify: `src/components/ui/TestimonialCard.tsx`
- Modify: `src/components/ui/VideoPlayer.tsx`

**Interfaces:**
- Consumes: tokens del Task 1
- Produces: componentes UI secundarios listos para usarse en secciones claras y oscuras

- [ ] **Step 1: Aplicar tabla de reemplazo global a cada archivo**

Para cada uno de los 4 archivos, aplicar la tabla de reemplazo de tokens de la sección "Token de reemplazo rápido" del header de este plan. Reglas específicas:

**Accordion.tsx** — los acordeones viven en `ClosingSection` (fondo navy oscuro):
- Bordes: `border-white/10`
- Texto pregunta: `text-white`
- Texto respuesta: `text-white/70`
- Ícono expand/collapse: `text-white/50` → hover `text-mogran-primary`
- Fondo item activo: `bg-white/5`

**TabGroup.tsx** — vive en `AudienceSection` (fondo navy):
- Tab activo: `bg-mogran-primary text-white`
- Tab inactivo: `text-white/60 hover:text-white`
- Borde tab activo: `border-mogran-primary`
- Contenido panel: heredar del padre (sin fondo propio)

**TestimonialCard.tsx** — puede vivir en sección clara o oscura:
- Fondo card: `bg-mogran-white border border-mogran-border`
- Texto: `text-mogran-neutral`
- Estrella/rating: `text-mogran-primary`
- Autor: `text-mogran-secondary font-semibold`

**VideoPlayer.tsx** — leer el archivo y reemplazar:
- `mogran-accent` → `mogran-primary`
- `mogran-dark-*` → según contexto (controles sobre video: siempre blancos)

- [ ] **Step 2: Verificar en el navegador**

Navegar a las secciones que usan estos componentes. Confirmar que tabs, acordeón y cards se ven con la nueva paleta.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Accordion.tsx src/components/ui/TabGroup.tsx src/components/ui/TestimonialCard.tsx src/components/ui/VideoPlayer.tsx
git commit -m "feat: update secondary UI components to new palette"
```

---

### Task 4: HeroSection

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`

**Interfaces:**
- Consumes: tokens Task 1, Button del Task 2
- Produces: hero con fondo navy, rojo como accent, Fredoka One en H1

El Hero actual es dark navy con verde. Se mantiene dark navy (es la sección de impacto principal) pero el accent cambia a rojo.

- [ ] **Step 1: Actualizar HeroSection.tsx**

Reemplazos en el JSX:

Sección root — mantener navy:
```tsx
className="relative bg-mogran-secondary overflow-hidden min-h-screen flex"
```

Top accent line:
```tsx
className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mogran-primary/30 to-transparent"
```

Kicker (texto pequeño superior):
```tsx
className="inline-flex items-center gap-3 text-xs md:text-sm font-semibold text-white/70 tracking-[0.25em] uppercase"
```

Punto del kicker:
```tsx
className="w-1.5 h-1.5 rounded-full bg-mogran-primary flex-shrink-0"
```

H1 — Fredoka One viene del CSS global (`h1` ya usa `--font-heading`):
```tsx
className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.25] tracking-[-0.01em] text-balance"
```

Spans de énfasis en H1:
```tsx
<span className="text-mogran-primary">Oratoria</span>
...
<span className="text-mogran-primary">Vencer la Timidez</span>
```

H2 subtítulo:
```tsx
className="text-base md:text-lg text-white/70 leading-relaxed max-w-xl"
```

Span bold en H2:
```tsx
<span className="text-white font-semibold">
```

Párrafo body:
```tsx
className="text-sm md:text-base text-white/60 leading-relaxed max-w-lg"
```

Date urgency box:
```tsx
className="inline-flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 border border-white/10"
```

Línea vertical del date box:
```tsx
className="w-1 h-10 bg-mogran-primary rounded-full flex-shrink-0"
```

Texto del date box:
```tsx
className="text-sm md:text-base text-white/70"
```

Botón CTA:
```tsx
className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-bold bg-mogran-primary text-white rounded-xl shadow-lg shadow-mogran-primary/30 transition-all duration-300 hover:bg-mogran-primary-hover hover:shadow-[0_0_30px_rgba(248,20,67,0.4)] hover:-translate-y-1 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-mogran-primary focus-visible:ring-offset-2 focus-visible:ring-offset-mogran-secondary"
```

Ícono del CTA:
```tsx
className="text-white transition-all duration-300 group-hover:rotate-[360deg] group-hover:scale-110"
```

Video container:
```tsx
className="relative rounded-2xl overflow-hidden border border-mogran-primary/20 shadow-xl bg-white/5"
```

Bottom gradient fade:
```tsx
className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-mogran-secondary pointer-events-none"
```

- [ ] **Step 2: Verificar en el navegador**

El hero debe verse navy con texto blanco, highlights rojos, botón CTA rojo.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/HeroSection.tsx
git commit -m "feat: update HeroSection to red accent on navy"
```

---

### Task 5: ProblemSection (valores hardcodeados en SVG)

**Files:**
- Modify: `src/components/sections/ProblemSection.tsx`

**Interfaces:**
- Consumes: tokens Task 1
- Produces: diagrama radial con strokes rojos, nodos navy, fondo navy

Este archivo tiene `#73D300` y `rgba(115,211,0,...)` hardcodeados en el SVG y en props de Framer Motion — no son clases Tailwind, son valores inline.

- [ ] **Step 1: Actualizar fondo y container**

```tsx
<section id="problem" className="bg-mogran-secondary section border-t border-white/10" ...>
```

Heading:
```tsx
className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance"
```

Span de énfasis:
```tsx
<span className="text-mogran-primary">desarrollarás</span>
```

Párrafo subtítulo:
```tsx
className="text-lg text-white/70 leading-relaxed"
```

Container del diagrama:
```tsx
className="bg-white/5 p-8 rounded-2xl border border-white/10"
```

- [ ] **Step 2: Reemplazar central glow (inline style)**

```tsx
<motion.div
  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full pointer-events-none"
  style={{ background: 'radial-gradient(circle, rgba(248,20,67,0.1) 0%, transparent 70%)' }}
  animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] }}
  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
/>
```

- [ ] **Step 3: Reemplazar strokes del SVG**

Spokes — cambiar `stroke="#73D300"` → `stroke="#F81443"` en ambos `<motion.line>`:
```tsx
stroke="#F81443"
```

Ring paths — cambiar `stroke="#73D300"` → `stroke="#F81443"` en `<motion.path>`:
```tsx
stroke="#F81443"
```

- [ ] **Step 4: Reemplazar animate props de nodos outer**

En el `motion.div` de cada nodo outer, reemplazar los valores `rgba(115,211,0,...)`:

```tsx
animate={{
  scale: lit ? 1 : 0.85,
  borderColor: lit ? 'rgba(248,20,67,0.6)' : 'rgba(255,255,255,0.1)',
  boxShadow: lit
    ? '0 0 16px rgba(248,20,67,0.25), 0 0 32px rgba(248,20,67,0.1)'
    : '0 0 0px rgba(248,20,67,0)',
}}
```

Fondo del nodo:
```tsx
className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border-2 flex items-center justify-center shadow-lg"
```

Ícono del nodo:
```tsx
<t.Icon
  size={18}
  className={lit ? 'text-mogran-primary' : 'text-white/30'}
/>
```

Texto del nodo:
```tsx
animate={{ color: lit ? 'rgb(248,250,252)' : 'rgb(255,255,255,0.4)' }}
```

- [ ] **Step 5: Reemplazar nodo central**

```tsx
animate={{
  borderColor: centerLit ? 'rgba(248,20,67,0.8)' : 'rgba(248,20,67,0.3)',
  boxShadow: centerLit
    ? '0 0 24px rgba(248,20,67,0.35), 0 0 48px rgba(248,20,67,0.15)'
    : '0 0 8px rgba(248,20,67,0.1)',
}}
```

Fondo nodo central:
```tsx
className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-full bg-white/5 border-[2.5px] flex items-center justify-center shadow-lg"
```

Ícono central:
```tsx
<IconStar size={24} className="text-mogran-primary" />
```

Texto central:
```tsx
animate={{ color: centerLit ? 'rgb(248,20,67)' : 'rgb(255,255,255,0.4)' }}
```

- [ ] **Step 6: Verificar en el navegador**

El diagrama radial debe mostrar spokes y ring en rojo, nodo central en rojo, sección con fondo navy.

- [ ] **Step 7: Commit**

```bash
git add src/components/sections/ProblemSection.tsx
git commit -m "feat: update ProblemSection SVG to red accent on navy"
```

---

### Task 6: MethodSection + MethodologyConsole

**Files:**
- Modify: `src/components/sections/MethodSection.tsx`
- Modify: `src/components/sections/MethodologyConsole.tsx`

**Interfaces:**
- Consumes: tokens Task 1
- Produces: sección método con consola interactiva en navy + rojo

- [ ] **Step 1: Actualizar MethodSection.tsx**

```tsx
<section id="method" className="bg-mogran-secondary section" ...>
```

H2:
```tsx
className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance"
```

Span de énfasis:
```tsx
<span className="text-mogran-primary">paso a paso</span>
```

Párrafo:
```tsx
className="text-base md:text-lg text-white/70 leading-relaxed"
```

- [ ] **Step 2: Actualizar MethodologyConsole.tsx — container y columna 1**

Container principal:
```tsx
className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-sm"
```

Label de columna 1:
```tsx
className="text-xs font-bold uppercase tracking-widest text-white/40 px-2 mb-1"
```

Botón de fase inactivo:
```tsx
className="w-full p-5 rounded-2xl border text-left transition-all relative overflow-hidden border-white/10 hover:border-white/30 bg-transparent"
```

Botón de fase activo:
```tsx
className="w-full p-5 rounded-2xl border text-left transition-all relative overflow-hidden bg-white/5 border-white/20 shadow-md"
```

Indicador lateral activo (motion.div):
```tsx
className="absolute left-0 top-0 bottom-0 w-1.5 bg-mogran-primary"
```

Texto "PILAR DE ENTRENAMIENTO" activo:
```tsx
className={`text-xs font-mono mb-1 ${activePhase === idx ? 'text-mogran-primary' : 'text-white/40'}`}
```

Título de fase:
```tsx
className={`text-lg font-bold ${activePhase === idx ? 'text-white' : 'text-white/60'}`}
```

- [ ] **Step 3: Actualizar MethodologyConsole.tsx — columna 2**

Container columna 2:
```tsx
className="lg:col-span-3 flex flex-col gap-2 bg-mogran-secondary/60 p-4 rounded-2xl border border-white/10 justify-center"
```

Label columna 2:
```tsx
className="text-xs font-bold uppercase tracking-widest text-white/40 px-2 mb-1"
```

Botón item activo:
```tsx
className="w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all bg-mogran-primary/10 border-mogran-primary/30 text-mogran-primary"
```

Botón item inactivo:
```tsx
className="w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all bg-white/5 border-transparent text-white/60 hover:text-white hover:bg-white/10"
```

Código de canal activo:
```tsx
className={`font-mono text-xs ${activeItem === idx ? 'text-mogran-primary' : 'text-white/30'}`}
```

- [ ] **Step 4: Actualizar MethodologyConsole.tsx — columna 3 (monitor)**

Container columna 3:
```tsx
className="lg:col-span-5 bg-mogran-secondary border border-white/10 rounded-2xl p-8 min-h-[340px] flex flex-col justify-between relative overflow-hidden"
```

Grid de fondo hardcodeado — reemplazar `#0f172a` por color semi-transparente blanco:
```tsx
className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-100 pointer-events-none"
```

Label "MOGRAN_OS_V2.6":
```tsx
className="absolute top-0 right-0 p-4 font-mono text-[10px] text-white/30 tracking-widest pointer-events-none"
```

Badge de subtítulo:
```tsx
className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-md font-mono text-xs text-white/60"
```

Punto animado del badge:
```tsx
className="w-2 h-2 rounded-full bg-mogran-primary animate-pulse"
```

H4 del item:
```tsx
className="text-2xl font-bold tracking-tight text-white"
```

Párrafo del item:
```tsx
className="text-white/70 text-base leading-relaxed"
```

Ecualizador — barra activa:
```tsx
className={`w-1 rounded-full ${i > 18 ? 'bg-white/10' : 'bg-mogran-primary/60'}`}
```

Divisor ecualizador:
```tsx
className="relative z-10 pt-4 border-t border-white/10 flex items-center gap-1.5 h-6"
```

- [ ] **Step 5: Verificar en el navegador**

La sección method debe ser navy. La consola debe mostrar fases con indicador rojo, ítems activos con rojo, ecualizador rojo.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/MethodSection.tsx src/components/sections/MethodologyConsole.tsx
git commit -m "feat: update MethodSection and MethodologyConsole to new palette"
```

---

### Task 7: AudienceSection

**Files:**
- Modify: `src/components/sections/AudienceSection.tsx`

**Interfaces:**
- Consumes: tokens Task 1, Button Task 2, Badge Task 2, TabGroup Task 3

- [ ] **Step 1: Actualizar AudienceSection.tsx**

Fondo — reemplazar hardcoded `bg-[#0a1e5c]`:
```tsx
className="bg-mogran-secondary section"
```

H2:
```tsx
className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance"
```

Párrafo del header:
```tsx
className="text-lg text-white/70 leading-relaxed"
```

Dentro del TabPanel — H3:
```tsx
className="text-2xl md:text-3xl font-bold text-white mb-2"
```

Edad (texto pequeño):
```tsx
className="text-white/40 mb-6"
```

Descripción:
```tsx
className="text-lg text-white/70 leading-relaxed mb-6"
```

Card de beneficios:
```tsx
className="bg-white/5 rounded-2xl border border-white/10 p-6 min-h-[260px] flex flex-col justify-center"
```

Ícono de beneficio (span):
```tsx
className="flex-shrink-0 w-7 h-7 rounded-full bg-mogran-primary/10 flex items-center justify-center mt-0.5"
```

Ícono de beneficio:
```tsx
<b.icon size={14} className="text-mogran-primary" />
```

Texto de beneficio:
```tsx
className="text-sm text-white/70 leading-snug"
```

- [ ] **Step 2: Verificar en el navegador**

La sección audience debe ser navy, tabs con rojo, cards con fondo sutil sobre navy.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/AudienceSection.tsx
git commit -m "feat: update AudienceSection to new palette"
```

---

### Task 8: ProfessorSection + ScheduleSection + PaymentSection

**Files:**
- Modify: `src/components/sections/ProfessorSection.tsx`
- Modify: `src/components/sections/ScheduleSection.tsx`
- Modify: `src/components/sections/PaymentSection.tsx`

**Interfaces:**
- Consumes: tokens Task 1, Button Task 2

Estas secciones son claras (blanco o crema). Aplicar la tabla de reemplazo: dark tokens → tokens claros.

- [ ] **Step 1: Leer cada archivo e identificar qué tokens usa**

Para cada archivo, aplicar:
- `bg-mogran-dark-base` → `bg-mogran-white` o `bg-mogran-tertiary` según sea sección principal o de contraste
- `text-mogran-dark-text` → `text-mogran-secondary`
- `text-mogran-dark-text-secondary` → `text-mogran-neutral`
- `text-mogran-dark-text-muted` → `text-mogran-neutral/60`
- `mogran-accent` → `mogran-primary`
- `border-mogran-dark-border` → `border-mogran-border`
- `bg-mogran-dark-elevated` → `bg-mogran-tertiary` o `bg-mogran-border/30`

Distribución de fondos recomendada:
- **ProfessorSection** → `bg-mogran-tertiary` (crema cálida, sección de persona)
- **ScheduleSection** → `bg-mogran-white` (blanco limpio)
- **PaymentSection** → `bg-mogran-tertiary` (crema, sección de cierre de venta)

- [ ] **Step 2: Verificar en el navegador**

Confirmar que las 3 secciones se ven claras con text oscuro y accent rojo.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/ProfessorSection.tsx src/components/sections/ScheduleSection.tsx src/components/sections/PaymentSection.tsx
git commit -m "feat: update Professor, Schedule, Payment sections to light palette"
```

---

### Task 9: RedSection + ClosingSection + MapaSection

**Files:**
- Modify: `src/components/sections/RedSection.tsx`
- Modify: `src/components/sections/ClosingSection.tsx`
- Modify: `src/components/sections/MapaSection.tsx`

**Interfaces:**
- Consumes: tokens Task 1, Button Task 2, Accordion Task 3

- [ ] **Step 1: Leer y actualizar RedSection.tsx**

Esta sección probablemente ya usa rojo. Verificar que use `mogran-primary` y no valores hardcodeados ni `mogran-accent`. Si el fondo es rojo: `bg-mogran-primary`. Texto sobre rojo: `text-white`.

- [ ] **Step 2: Actualizar ClosingSection.tsx (FAQs + Footer)**

Fondo principal:
```tsx
className="bg-mogran-secondary section"
```

H2:
```tsx
className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-12"
```

Card de CTA final:
```tsx
className="bg-white/5 rounded-3xl p-8 md:p-12 lg:p-16 text-center max-w-4xl mx-auto border border-white/10"
```

H3 del CTA:
```tsx
className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 text-balance"
```

Párrafo del CTA:
```tsx
className="text-lg text-white/70 leading-relaxed mb-8 max-w-2xl mx-auto"
```

Footer divisor:
```tsx
className="mt-20 pt-8 border-t border-white/10"
```

Texto footer:
```tsx
className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40"
```

Íconos de pago:
```tsx
className="text-white/40"
```

- [ ] **Step 3: Actualizar MapaSection.tsx**

Leer el archivo. Reemplazar tokens dark con equivalentes: borde del mapa → `border-white/10` o `border-mogran-border` si está en sección clara.

- [ ] **Step 4: Verificar en el navegador**

El footer/closing debe ser navy. FAQs con acordeón funcionando. Mapa visible.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/RedSection.tsx src/components/sections/ClosingSection.tsx src/components/sections/MapaSection.tsx
git commit -m "feat: update closing sections and footer to new palette"
```

---

### Task 10: Legacy adapters + Auditoría final

**Files:**
- Modify (si aplica): `src/adapters/primary/components/*.tsx`
- Modify (si aplica): `src/app/contact/page.tsx`, `src/app/ai/page.tsx`, `src/app/services/page.tsx`

**Interfaces:**
- Consumes: todos los tokens anteriores
- Produces: sitio completamente migrado sin referencias al sistema viejo

- [ ] **Step 1: Auditar archivos de adapters**

Leer y actualizar cada adapter que tenga tokens de color:
- `HeroSection.tsx` (adapter version): mismas reglas que `src/components/sections/HeroSection.tsx`
- `StatsSection.tsx`, `TestimonialsSection.tsx`, `ContactForm.tsx`, `Footer.tsx`, `Header.tsx`: aplicar tabla de reemplazo global
- `HexGrid.tsx`: probablemente tiene hex hardcodeados — buscar y reemplazar verde por rojo

- [ ] **Step 2: Auditar páginas adicionales**

Leer `contact/page.tsx`, `ai/page.tsx`, `services/page.tsx` y aplicar tokens correctos.

- [ ] **Step 3: Verificar que no quedan tokens viejos**

```bash
grep -rn "mogran-dark\|mogran-accent\|#73D300\|rgba(115,211,0\|Inter\|Montserrat\|#0a1e5c" src/
```

Resultado esperado: sin coincidencias (o solo comentarios irrelevantes).

- [ ] **Step 4: Verificar contraste de accesibilidad**

Revisar visualmente:
- Texto blanco sobre `#14213D` → ratio ~10:1 ✓
- Texto `#2D3436` sobre blanco → ratio ~11:1 ✓
- Texto blanco sobre `#F81443` → ratio ~3.5:1 (pasa AA para texto grande, borderline para small)
- Texto `#14213D` sobre `#FCF2D1` → ratio ~9:1 ✓

Para botones rojos con texto blanco en tamaño pequeño, si hay dudas, cambiar a `text-mogran-secondary` sobre rojo (ratio ~6:1 ✓).

- [ ] **Step 5: Verificar sitio completo de navbar a footer**

```bash
npm run dev
```

Scroll completo del sitio. Confirmar:
- Navbar navy con rojo
- Hero navy con rojo
- Secciones alternas blanco/crema
- Secciones oscuras en navy
- Footer navy
- Botones siempre rojos (`primary`) o navy (`secondary`)
- Tipografía Fredoka visible y legible en todo el sitio

- [ ] **Step 6: Commit final**

```bash
git add -p  # staged todo lo pendiente
git commit -m "feat: complete design system rebrand — Fredoka + rojo/navy/crema"
```
