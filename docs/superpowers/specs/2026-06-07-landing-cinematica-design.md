# Talleres Mogran — Landing Cinematográfica

**Fecha:** 2026-06-07  
**Alcance:** Reestructura narrativa + tratamiento visual cinematográfico de la landing page existente.

---

## Objetivo

El sitio actual se siente genérico (estética tech/SaaS). El objetivo es que transmita **transformación personal**: el visitante debe sentir en los primeros 3 segundos que aquí puede pasar de tímido a imparable. Se mantiene la paleta navy + verde (#73D300) pero se eleva con tipografía de display, animaciones de scroll y una narrativa más emocional.

---

## Decisiones de diseño

| Decisión | Elección |
|---|---|
| Dirección visual | Dinámico/moderno — evolución del diseño actual, no ruptura |
| Hook principal | Transformación: "De tímido a imparable" |
| Audiencia | Niños, jóvenes y adultos (los 3, con tabs por segmento) |
| Contenido multimedia | Sintético / stock para el MVP |
| Tipografía display | Bebas Neue para headings de sección |
| Animaciones | scroll-triggered con `motion` (ya instalado) |

---

## Nueva estructura de página

El orden de secciones cambia para contar una historia de transformación:

### ① Hero — Transformación
- **Cambios:** Copy reescrito centrado en "De tímido a imparable." Heading principal con Bebas Neue a tamaño grande. Video autoplay existente se mantiene. CTA único y directo.
- **Nuevo:** Indicador de urgencia opcional (próximo ciclo / cupos).
- **Quitar:** La barra de "síguenos en redes sociales" (RedSection actual) que interrumpe el flujo.

### ② Stats Bar — Credibilidad (reemplaza RedSection)
- Barra horizontal compacta (fondo verde #73D300, texto navy).
- 4 métricas: `500+ alumnos · 25 años · ★ 4.9 · Lima & Virtual`.
- Animación: números cuentan desde 0 al entrar al viewport.

### ③ Testimonios — Prueba Social (sección nueva)
- Componente nuevo: `TestimonialsSection.tsx`.
- 3 tarjetas con avatar (imagen circular), cita breve, nombre y perfil (ejecutiva / padre / universitario — uno por segmento de audiencia).
- Diseño: fondo `mogran-dark-elevated`, borde izquierdo verde, entrada escalonada con scroll animation.

### ④ Problema — Empatía
- Se mantiene la sección existente (`ProblemSection`).
- **Cambios:** Heading reescrito como pregunta empática ("¿Te reconoces en esto?"). Más breathing room (padding de sección aumentado).

### ⑤ Método — Proceso
- Se mantiene `MethodSection` + `MethodologyConsole`.
- **Cambios:** Heading con Bebas Neue. Más espacio entre fases.

### ⑥ Audiencias — Segmentos
- Se mantiene `AudienceSection` con tabs (Niños / Jóvenes / Adultos).
- **Cambios:** Ninguno estructural. Copy interior mejorado por tab.

### ⑦ Profesor — Autoridad
- Se mantiene `ProfessorSection`.
- **Cambios:** Agregar badges de credibilidad (medios, años, concursos). Video más prominente. Heading con Bebas Neue.

### ⑧ Horarios + Pagos
- Se mantienen `ScheduleSection` y `PaymentSection`.
- **Cambios:** Solo breathing room y heading con Bebas Neue.

### ⑨ Cierre — Urgencia
- Se mantiene `ClosingSection` + `MapaSection`.
- **Cambios:** CTA final más fuerte. Agregar "Cupos limitados" y fecha del próximo ciclo como elemento de urgencia.

---

## Cambios transversales (afectan todo el sitio)

### Tipografía
- Añadir **Bebas Neue** via `next/font/google` en `layout.tsx`.
- Aplicar a todos los headings de sección (`h2` de cada section component).
- Inter se mantiene para cuerpo de texto, subtítulos y UI.
- CSS variable: `--font-display: "Bebas Neue"`.

### Animaciones de scroll
- Usar `motion` (ya instalado como `motion/react`).
- Patrón: `whileInView={{ opacity: 1, y: 0 }}` con `initial={{ opacity: 0, y: 30 }}`.
- Aplicar a headings, tarjetas de testimonios y stats counter.
- Respetar `prefers-reduced-motion` (ya hay media query en globals.css).

### Breathing room
- Aumentar padding de secciones de `py-16 md:py-20` a `py-24 md:py-32` en las secciones que se sientan comprimidas.

---

## Archivos que cambian

| Archivo | Tipo de cambio |
|---|---|
| `src/app/layout.tsx` | Agregar Bebas Neue font |
| `src/app/globals.css` | Agregar `--font-display` CSS var |
| `src/app/page.tsx` | Nuevo orden de secciones, agregar TestimonialsSection |
| `src/components/sections/HeroSection.tsx` | Copy + heading display |
| `src/components/sections/RedSection.tsx` | Eliminar (reemplazado por StatsBar) |
| `src/components/sections/ProblemSection.tsx` | Heading + breathing room |
| `src/components/sections/MethodSection.tsx` | Heading display |
| `src/components/sections/ProfessorSection.tsx` | Badges + heading display |
| `src/components/sections/ScheduleSection.tsx` | Heading display + breathing room |
| `src/components/sections/PaymentSection.tsx` | Heading display |
| `src/components/sections/ClosingSection.tsx` | CTA urgencia |

## Archivos nuevos

| Archivo | Descripción |
|---|---|
| `src/components/sections/TestimonialsSection.tsx` | 3 tarjetas de testimonios con scroll animation |
| `src/components/sections/StatsBar.tsx` | Barra de métricas (reemplaza RedSection) |

---

## Lo que NO cambia

- Paleta de colores (navy + verde #73D300)
- Sistema de componentes UI (`heroui-compat`, botones, badges)
- VideoPlayer component
- Lógica de negocio (horarios, pagos, audiencias)
- Estructura de rutas Next.js
