# Assets de Talleres Mogran

Esta carpeta contiene los recursos multimedia de la landing page. **Reemplaza los archivos placeholder con los assets reales.**

## Estructura

```
public/
├── images/
│   ├── og/
│   │   └── home.jpg          # Open Graph 1200x630 (link preview en redes)
│   ├── profesor-moises.jpg   # Foto del profesor (cuadrada, mín. 800x800)
│   ├── hero-poster.jpg       # Poster del video del Hero (mismo aspect ratio)
│   ├── metodo-poster.jpg     # Poster del video del método (16:9)
│   ├── testimonial-poster.jpg # Poster del video testimonial (16:9)
│   └── alumnos/              # Fotos de alumnos para testimonios (opcional)
│       ├── carla-m.jpg
│       ├── luis-r.jpg
│       └── ...
├── videos/
│   ├── hero.mp4                      # Video del Hero (vertical o cuadrado)
│   ├── metodo-explicado.mp4          # Video del método (16:9)
│   └── testimonial-principal.mp4     # Testimonio en video (16:9)
├── transcripts/
│   ├── metodo-explicado.vtt          # Transcripción del video del método
│   └── testimonial-principal.vtt     # Transcripción del testimonial
└── favicon.ico                      # Icono del sitio
```

## Especificaciones por archivo

### `/videos/hero.mp4`
- **Ubicación en el código:** `HeroSection.tsx`
- **Formato:** MP4 (H.264 + AAC)
- **Aspect ratio:** Vertical 9:16 (recomendado) o cuadrado 1:1
- **Resolución:** 1080x1920 (vertical) o 1080x1080 (cuadrado)
- **Duración:** 15-30 segundos
- **Contenido sugerido:** El profesor Moisés presentándose brevemente, o un alumno contando su experiencia. Tono cálido, sin presión.
- **Audio:** El video se reproduce muted por defecto. El usuario puede activar el sonido con el botón de volumen.
- **Peso máximo:** 5 MB
- **Poster:** `/images/hero-poster.jpg` (mismo aspect ratio, JPG ligero)

### `/videos/metodo-explicado.mp4`
- **Ubicación en el código:** `MethodSection.tsx`
- **Formato:** MP4 (H.264 + AAC)
- **Aspect ratio:** 16:9 horizontal
- **Resolución:** 1920x1080
- **Duración:** 1-3 minutos
- **Contenido sugerido:** Explicación breve del método paso a paso, o tomas de clases reales con permiso de los alumnos.
- **Audio:** Opcional, con transcript disponible.
- **Peso máximo:** 15 MB

### `/videos/testimonial-principal.mp4`
- **Ubicación en el código:** `ProfessorSection.tsx`
- **Formato:** MP4 (H.264 + AAC)
- **Aspect ratio:** 16:9 horizontal
- **Resolución:** 1920x1080
- **Duración:** 30-90 segundos
- **Contenido sugerido:** El testimonio más representativo (vulnerable, real, no "ahora soy CEO").
- **Audio:** Con transcript disponible.
- **Peso máximo:** 10 MB

### `/images/profesor-moises.jpg`
- **Ubicación en el código:** `ProfessorSection.tsx`
- **Formato:** JPG o WebP
- **Aspect ratio:** 1:1 (cuadrado)
- **Resolución:** Mínimo 800x800, recomendado 1200x1200
- **Peso máximo:** 300 KB
- **Contenido:** Retrato del profesor Moisés, iluminación cálida, fondo neutro. Evitar poses agresivas o sonrisas exageradas (mantener el tono empático).

### `/images/og/home.jpg`
- **Ubicación en el código:** `layout.tsx` (Open Graph)
- **Formato:** JPG
- **Resolución exacta:** 1200x630 px
- **Peso máximo:** 200 KB
- **Contenido:** Imagen que aparece cuando se comparte el link en Facebook, WhatsApp, LinkedIn. Debe incluir:
  - Logo o nombre "Talleres Mogran"
  - Tagline corto: "Oratoria para personas tímidas" o "Encontrá tu voz a tu propio ritmo"
  - Paleta de la marca (fondo claro, acentos teal/verde bosque, nunca verde neón)

### `/transcripts/metodo-explicado.vtt`
- **Formato:** WebVTT (`.vtt`)
- **Idioma:** es-PE
- **Ejemplo de estructura:**
  ```
  WEBVTT

  00:00:00.000 --> 00:00:05.000
  El método Mogran se basa en cinco pilares...

  00:00:05.000 --> 00:00:10.000
  Primero, la práctica con ejemplos reales...
  ```

### `/transcripts/testimonial-principal.vtt`
- **Formato:** WebVTT (`.vtt`)
- **Contenido:** Transcripción literal del testimonio en video. Crítico para SEO y accesibilidad.

### `/favicon.ico`
- **Formato:** ICO multi-resolución (16x16, 32x32, 48x48)
- **Contenido:** Logotipo "M" o símbolo distintivo en versión simplificada.

## Optimización de videos

Para videos de más de 1 MB, comprimir con ffmpeg:

```bash
# Vertical para hero
ffmpeg -i input.mp4 -vf "scale=1080:1920" -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k -movflags +faststart public/videos/hero-presentacion.mp4

# Horizontal 16:9
ffmpeg -i input.mp4 -vf "scale=1920:1080" -c:v libx264 -crf 26 -preset slow -c:a aac -b:a 128k -movflags +faststart public/videos/metodo-explicado.mp4
```

## Optimización de imágenes

- JPG: comprimir con [TinyPNG](https://tinypng.com) o [Squoosh](https://squoosh.app)
- WebP: preferido para mejor compresión (cambiar extensión y ajustar `<Image>` en el código)
- Tamaños: usar `next/image` con `sizes` apropiado para responsive

## Dónde conseguir los assets reales

| Asset | Fuente sugerida |
|-------|-----------------|
| Foto del profesor | Sesión fotográfica profesional, fondo neutro |
| Video hero | Selfie del profesor con celular o cámara, edición mínima |
| Video método | Compilación de clases reales (con consentimiento) o animación con texto |
| Testimonio video | Grabación con un alumno real, encuadre natural |
| Imagen OG | Diseño en Figma/Canva con tipografía Inter |

## Estado actual

Los archivos en esta carpeta son **placeholders vacíos**. El sitio compila y se ve correctamente, pero mostrará el skeleton de carga hasta que reemplaces estos archivos con los reales.

## Repositorio de iconos Tabler

Iconos usados en la UI (vienen de `@tabler/icons-react`, ya instalado):

- `IconPlayerPlayFilled` / `IconPlayerPauseFilled` — controles de video
- `IconVolume` / `IconVolumeOff` — audio del video
- `IconChevronDown` / `IconChevronUp` — acordeón FAQ
- `IconChevronLeft` / `IconChevronRight` — carrusel de testimonios
- `IconArrowRight` — flecha de botones
- `IconBrandFacebook` / `IconBrandInstagram` / `IconBrandTiktok` — redes sociales
- `IconBrandWhatsapp` — CTA de WhatsApp
- `IconBuildingBank` / `IconCreditCard` — métodos de pago
- `IconMoodKid` / `IconUserStar` / `IconBriefcase` — problemas por público
- `IconMapPin` / `IconClock` / `IconUsers` — información de horarios
- `IconQuote` — testimonio

Buscar más iconos en [tabler.io/icons](https://tabler.io/icons).
