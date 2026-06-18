# Design System Rebrand — Mogran Landing

**Fecha:** 2026-06-17
**Alcance:** Reemplazo completo de tipografía, paleta de color y tokens de diseño en la landing de Talleres Mogran.

---

## Contexto

El sistema actual usa Inter + paleta dark-mode (navy `#05113A`, verde neón `#73D300`). El rebrand adopta Fredoka + paleta rojo/navy/crema, eliminando el modo oscuro puro en favor de un sistema claro con secciones oscuras estratégicas.

---

## 1. Tipografía

| Token | Fuente | Weight | Uso |
|---|---|---|---|
| `--font-heading` | Fredoka One | 400 | H1, H2, logo MOGRAN |
| `--font-sans` | Fredoka | 400, 500, 600 | Body, labels, botones, nav |

**Carga:** Google Fonts vía `next/font/google`. Reemplaza `Inter` y `Montserrat` en `layout.tsx`.

Fredoka One solo existe en weight 400. Fredoka regular admite 300–700 pero en la práctica 400/500/600 son los más usados.

---

## 2. Paleta de color

### Tokens principales (reemplazan TODO el sistema anterior)

| Token CSS | Valor | Rol |
|---|---|---|
| `--color-mogran-primary` | `#F81443` | CTAs, highlights, accent rojo |
| `--color-mogran-primary-hover` | `#D6103A` | Hover del botón primario |
| `--color-mogran-primary-subtle` | `#FEE5EA` | Fondo tenue badges/tags rojos |
| `--color-mogran-secondary` | `#14213D` | Navbar, footer, secciones oscuras, headings |
| `--color-mogran-tertiary` | `#FCF2D1` | Fondos de secciones cálidas |
| `--color-mogran-neutral` | `#2D3436` | Texto body |
| `--color-mogran-white` | `#FFFFFF` | Fondos principales, texto sobre oscuro |
| `--color-mogran-border` | `#E8E0D0` | Bordes (derivado cálido del crema) |

### Tokens eliminados

Todos los tokens `mogran-dark-*`, `mogran-accent`, `mogran-canvas`, `mogran-elevated`, `mogran-inset`, `mogran-text-*`, `mogran-success`, `mogran-warning`, `mogran-danger`, `mogran-info` y sus variantes `*-subtle` se eliminan del sistema.

---

## 3. Arquitectura de fondos por sección

| Sección | Fondo | Texto heading | Texto body |
|---|---|---|---|
| Navbar | `#14213D` | Blanco | Blanco |
| Hero | `#FFFFFF` | `#14213D` | `#2D3436` |
| Secciones principales | `#FFFFFF` | `#14213D` | `#2D3436` |
| Secciones de contraste cálido | `#FCF2D1` | `#14213D` | `#2D3436` |
| Secciones de impacto (problema, cierre) | `#14213D` | Blanco | Blanco/crema |
| Footer | `#14213D` | Blanco | Blanco |

### Botones

| Variante | Fondo | Texto | Hover |
|---|---|---|---|
| primary | `#F81443` | `#FFFFFF` | `#D6103A` |
| secondary | borde `#14213D` | `#14213D` | fondo `#14213D` texto blanco |
| ghost | transparente | `#2D3436` | fondo `#FCF2D1` |

---

## 4. Archivos a modificar

### Tokens y base
- `src/app/globals.css` — reemplazar `@theme inline` completo, fuentes, variables `:root`, utilidades de fondo (dot-grid, radial-glow, glow-ring usan verde neón → actualizar a rojo/navy)
- `tailwind.config.ts` — reemplazar objeto `mogran` en `colors` y `fontFamily`
- `src/app/layout.tsx` — cambiar import de fuentes (`Inter`/`Montserrat` → `Fredoka_One`/`Fredoka`), actualizar clase del `<body>`

### Componentes UI (auditoría de clases hardcodeadas)
- `src/components/ui/Button.tsx` — reemplazar `mogran-accent`, `mogran-dark-*`
- `src/components/ui/Navbar.tsx` — fondo y texto
- `src/components/ui/Badge.tsx` — colores
- `src/components/ui/TabGroup.tsx` — colores activos
- `src/components/ui/TestimonialCard.tsx` — colores
- `src/components/ui/Accordion.tsx` — colores
- `src/components/ui/VideoPlayer.tsx` — bordes/controles

### Secciones (auditoría de clases hardcodeadas)
- `src/components/sections/HeroSection.tsx` — fondo, dot-grid, radial-glow, accent
- `src/components/sections/ProblemSection.tsx`
- `src/components/sections/MethodSection.tsx`
- `src/components/sections/MethodologyConsole.tsx`
- `src/components/sections/AudienceSection.tsx`
- `src/components/sections/ProfessorSection.tsx`
- `src/components/sections/ScheduleSection.tsx`
- `src/components/sections/PaymentSection.tsx`
- `src/components/sections/RedSection.tsx`
- `src/components/sections/ClosingSection.tsx`
- `src/components/sections/MapaSection.tsx`

### Adapters legacy (si usan clases de color)
- `src/adapters/primary/components/Header.tsx`
- `src/adapters/primary/components/Footer.tsx`
- `src/adapters/primary/components/HeroSection.tsx`
- `src/adapters/primary/components/ServicesSection.tsx`
- `src/adapters/primary/components/StatsSection.tsx`
- `src/adapters/primary/components/TestimonialsSection.tsx`
- `src/adapters/primary/components/ContactForm.tsx`

---

## 5. Criterios de éxito

- No queda ninguna referencia a `mogran-dark-*`, `mogran-accent` (verde), `#73D300` ni `Inter` en el código
- La paleta activa usa exclusivamente los 8 tokens definidos en sección 2
- La fuente en body y headings es Fredoka / Fredoka One
- El sitio se ve coherente visualmente de navbar a footer
- No hay regresiones en accesibilidad (contraste WCAG AA mínimo en texto sobre fondos)
