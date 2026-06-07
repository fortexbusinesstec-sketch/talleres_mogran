# Optimización de Video en Talleres Mogran

Reglas y arquitectura para que los videos del sitio carguen rápido, consuman poco ancho de banda y funcionen bien en conexiones lentas.

> **TL;DR — La mejor opción hoy es AV1 + WebM para navegadores modernos, con fallback a H.264 + MP4.** Si solo puedes mantener un archivo, mantén **H.264 + MP4 con `-movflags +faststart`**.

---

## Tabla de codecs (¿qué es "WebP pero para video"?)

Así como WebP/AVIF reemplazaron a PNG/JPG en imágenes, los videos tienen sus equivalentes modernos:

| Codec | Contenedor | Equivalente a... | Ventaja | Soporte (2026) |
|-------|-----------|------------------|---------|----------------|
| **H.264 (AVC)** | `.mp4` | JPG | Compatible con todo el mundo | ✅ Todos los navegadores + iOS + Android |
| **H.265 (HEVC)** | `.mp4` | — | 30-50% más pequeño que H.264 a misma calidad | ⚠️ Safari/iOS ✅ · Chrome ⚠️ · Firefox ❌ |
| **AV1** | `.webm` | **WebP de video** | 30-50% más pequeño que H.265, libre de regalías | ✅ Chrome, Edge, Firefox, Android · ⚠️ Safari 16+ parcial |
| **VP9** | `.webm` | — | Alternativa libre, 30% más pequeño que H.264 | ✅ Chrome, Firefox, Edge · ❌ Safari |
| **H.266 (VVC)** | `.mp4` | — | 50% más pequeño que H.265 | ❌ Soporte aún muy limitado |

### La estrategia recomendada: **doble archivo + `<source>`**

```html
<video>
  <source src="/videos/hero.webm" type="video/webm" />   <!-- AV1 o VP9 -->
  <source src="/videos/hero.mp4"  type="video/mp4"  />   <!-- H.264 fallback -->
</video>
```

El navegador elige el primer formato que entienda. Resultado: Chrome/Edge cargan WebM/AV1 (~50% más liviano), Safari carga MP4/H.264.

### ¿Y si quiero elegir UNO solo?

- **H.264 + MP4** → máxima compatibilidad, archivo más pesado.
- **AV1 + WebM** → ~50% más liviano, pero Safari < 16 no lo soporta.
- **H.265 + MP4** → buen balance si tu audiencia es iOS/Safari.

**Para esta landing:** Como el público es Perú/Lima (alta penetración de Android/Chrome), se recomienda **AV1 + WebM primario + H.264 + MP4 fallback**.

---

## Recetas FFmpeg

### 1. Convertir a AV1 (el "WebP de video")

```bash
# AV1 con libaom (calidad, más lento) — recomendado para videos finales
ffmpeg -i input.mp4 \
  -c:v libaom-av1 -crf 32 -b:v 0 \
  -cpu-used 4 -row-mt 1 \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  public/videos/hero.webm

# AV1 con svt-av1 (más rápido, buena calidad) — ideal para producción
ffmpeg -i input.mp4 \
  -c:v libsvtav1 -crf 32 -preset 6 \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  public/videos/hero.webm
```

> **CRF 30-34** es el sweet spot para AV1. Más bajo = más calidad pero archivo más grande.

### 2. Convertir a H.265 (HEVC)

```bash
# H.265 con libx265 (buena compresión, lento)
ffmpeg -i input.mp4 \
  -c:v libx265 -crf 28 -preset slow \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  -tag:v hvc1 \
  public/videos/hero-h265.mp4
```

### 3. H.264 "seguro" (compatibilidad universal)

```bash
# Hero vertical 9:16, max 5 MB
ffmpeg -i input.mp4 \
  -vf "scale=1080:1920" \
  -c:v libx264 -crf 26 -preset slow \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  public/videos/hero.mp4
```

### 4. Generar poster desde el video (WebP)

```bash
# Frame a los 2 segundos, 1080px de ancho
ffmpeg -i input.mp4 -ss 00:00:02 -vframes 1 \
  -vf "scale=1080:-1" \
  -c:v libwebp -lossless 0 -compression_level 6 \
  public/images/hero-poster.webp

# Para videos verticales (Hero)
ffmpeg -i input.mp4 -ss 00:00:02 -vframes 1 \
  -vf "scale=1080:1920" \
  -c:v libwebp -lossless 0 -compression_level 6 \
  public/images/hero-poster.webp
```

### 5. Conversión a HLS (streaming adaptativo)

```bash
# HLS desde un MP4 — el navegador pide solo los segmentos necesarios
ffmpeg -i input.mp4 \
  -c:v libx264 -crf 24 -preset slow \
  -c:a aac -b:a 128k \
  -hls_time 6 -hls_playlist_type vod \
  -hls_segment_filename "public/videos/hls/hero_%03d.ts" \
  public/videos/hls/hero.m3u8
```

---

## 3 niveles de optimización (elige uno)

### Nivel 1 — Básico (mínimo esfuerzo)
✅ H.264 + MP4 con `-movflags +faststart`  
✅ `preload="none"` + lazy load por IntersectionObserver  
✅ Poster obligatorio  
✅ Servir desde CDN  

**Tamaño esperado del hero:** ~3-5 MB

### Nivel 2 — Intermedio (recomendado)
✅ Todo el Nivel 1  
✅ **Doble archivo: AV1/WebM + H.264/MP4** con `<source>`  
✅ Poster en WebP, ~80 KB  
✅ HLS si el video dura > 30 segundos  
✅ Servir desde CDN con caché de 1 año para `*.mp4` y `*.webm`  

**Tamaño esperado del hero:** ~1.5-2.5 MB (AV1) · ~3-4 MB (H.264 fallback)

### Nivel 3 — Premium
✅ Todo el Nivel 2  
✅ Múltiples bitrates HLS (240p, 480p, 720p, 1080p) → elije según conexión del usuario  
✅ Thumbnails `<track>` WebVTT con thumbnails interactivos (como Netflix)  
✅ Subpistas de audio/idioma  

**Tamaño por calidad:** 240p ~200 KB · 480p ~500 KB · 720p ~1.2 MB · 1080p ~2.5 MB

---

## Componentes

| Archivo | Responsabilidad |
|---------|----------------|
| `src/components/ui/VideoPlayer.tsx` | Reproductor optimizado con lazy load, controles accesibles, soporte HLS |
| `src/lib/videos/registry.ts` | Índice centralizado de todos los videos del sitio |

**Cómo usar el `VideoPlayer`:**

```tsx
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { getVideo } from '@/lib/videos/registry';

const video = getVideo('hero');

<VideoPlayer
  src={video.source}        // string | { type: 'mp4' | 'hls' | 'adaptive', ... }
  alt={video.description}   // obligatorio para SEO y a11y
  poster={video.poster}     // WebP/JPG ~50-100 KB
  aspectRatio="9/16"        // '16/9' | '9/16' | '4/3' | '1/1' | '21/9'
  autoPlay                  // muted + playsInline obligatorios si true
  muted
  loop
  transcript={video.transcript}
/>
```

---

## Componentes

| Archivo | Responsabilidad |
|---------|----------------|
| `src/components/ui/VideoPlayer.tsx` | Reproductor optimizado con lazy load, controles accesibles, soporte HLS |
| `src/lib/videos/registry.ts` | Índice centralizado de todos los videos del sitio |

**Cómo usar el `VideoPlayer`:**

```tsx
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { getVideo } from '@/lib/videos/registry';

const video = getVideo('hero');

<VideoPlayer
  src={video.source}        // string | { type: 'mp4' | 'hls' | 'adaptive', ... }
  alt={video.description}   // obligatorio para SEO y a11y
  poster={video.poster}     // WebP/JPG ~50-100 KB
  aspectRatio="9/16"        // '16/9' | '9/16' | '4/3' | '1/1' | '21/9'
  autoPlay                  // muted + playsInline obligatorios si true
  muted
  loop
  transcript={video.transcript}
/>
```

---

## Reglas aplicadas (de la auditoría)

### 1. Videos — el recurso más pesado

- **Nunca autoplay con sonido.** Chrome lo bloquea. Si hay autoplay, debe ser `muted` y `playsInline`.
- **Lazy loading obligatorio.** `preload="none"` por defecto; el video se carga solo cuando entra al viewport mediante `IntersectionObserver`.
- **Codec recomendado: AV1 + WebM con fallback H.264 + MP4.** ~50% más liviano que H.264 a misma calidad. Ver tabla arriba.
- **HLS / streaming adaptativo.** Para videos largos (>30s), servimos un `.m3u8` que se corta en pedazos. El reproductor pide solo lo necesario según la conexión. `hls.js` está instalado y se carga solo en navegadores que lo necesitan (Safari lo trae nativo).
- **Poster obligatorio.** Imagen estática mientras el video no se reproduce. Evita el "Cargando video…" permanente y mejora el LCP. Usar WebP, ~80 KB.
- **Transcripts (.vtt).** Accesibilidad + SEO. Subtítulos cargados como `<track>`.

### 2. Infraestructura

- **CDN.** Servir videos desde un CDN (Cloudflare, AWS CloudFront, Bunny.net) configurando `next.config.ts` con `images.remotePatterns` si aplica.
- **HTTP/2 o HTTP/3.** Permite descargas paralelas. Vercel/Netlify lo activan por defecto.
- **Compresión previa con FFmpeg / HandBrake** antes de subir:

  ```bash
  # Hero vertical 9:16, máx 5 MB
  ffmpeg -i input.mp4 \
    -vf "scale=1080:1920" \
    -c:v libx264 -crf 28 -preset slow \
    -c:a aac -b:a 128k \
    -movflags +faststart \
    public/videos/hero.mp4

  # HLS (streaming adaptativo) — convertir MP4 a .m3u8
  ffmpeg -i input.mp4 \
    -c:v libx264 -crf 26 -preset slow \
    -c:a aac -b:a 128k \
    -hls_time 6 -hls_playlist_type vod \
    -hls_segment_filename "public/videos/hls/hero_%03d.ts" \
    public/videos/hls/hero.m3u8
  ```

  **Importante:** `-movflags +faststart` mueve el `moov` atom al inicio → el video puede empezar a reproducirse antes de descargarse completo.

### 3. Imágenes / posters

- **WebP o AVIF** obligatorio, máx 100 KB.
- **Next.js Image** (`next/image`) para todo lo que no sea `<video poster>`. Configurar `images.formats: ['image/avif', 'image/webp']` en `next.config.ts`.
- **Lazy loading** por defecto: `loading="lazy"`.

### 4. Estrategia de carga (`registry.ts`)

| Video | Sección | `preload` | Estrategia |
|-------|---------|-----------|-----------|
| `hero` | HeroSection | `metadata` | `eager` — above the fold |
| `method` | MethodSection | `none` | `lazy` — IntersectionObserver |
| `testimonial` | ProfessorSection | `none` | `lazy` — IntersectionObserver |

---

## Checklist antes de subir un video nuevo

1. **Comprimir con FFmpeg** usando las recetas de arriba. Verificar peso final.
2. **Generar poster** en WebP/AVIF, ~50-100 KB. Idealmente con el frame más representativo (FFmpeg: `ffmpeg -i input.mp4 -ss 00:00:02 -vframes 1 poster.webp`).
3. **Subir assets** a `/public/videos/` y `/public/images/`.
4. **Registrar el video** en `src/lib/videos/registry.ts` con:
   - `id`, `description` (para `alt`)
   - `source` (mp4 o hls)
   - `poster`
   - `aspectRatio` correcto
   - `section` que lo usa
   - `loadingStrategy` (`eager` o `lazy`)
5. **(Opcional) Transcripción `.vtt`** en `/public/transcripts/` y registrarla en `transcript`.
6. **Probar** en:
   - Chrome desktop + móvil (con throttling "Slow 3G")
   - Safari iOS (HLS nativo)
   - Firefox (lazy load e hls.js)
7. **Verificar** con Lighthouse que el video no afecta LCP/CLS.

---

## Anti-patrones prohibidos

- ❌ `<video autoplay>` sin `muted` y `playsInline`
- ❌ `preload="auto"` en videos below the fold
- ❌ MP4 sin `-movflags +faststart`
- ❌ Video sin poster
- ❌ Video con bitrate > 5 Mbps para contenido web
- ❌ `<video>` sin `aria-label` o `<track>` para a11y
- ❌ Servir video desde el mismo dominio sin CDN en producción

---

## Referencias

- [Web Vitals — Optimize LCP](https://web.dev/optimize-lcp/)
- [HLS.js docs](https://github.com/video-dev/hls.js/)
- [MDN — Video preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#preload)
- [Tabler Icons](https://tabler.io/icons) (iconos usados en el reproductor)
