import { VideoSource } from '@/components/ui/VideoPlayer';

export interface VideoEntry {
  id: string;
  description: string;
  source: VideoSource;
  poster: string;
  transcript?: string;
  aspectRatio: '16/9' | '9/16' | '4/3' | '1/1' | '21/9';
  section: string;
  loadingStrategy: 'eager' | 'lazy' | 'intersection';
}

/**
 * Índice centralizado de videos del sitio.
 *
 * Reglas de optimización aplicadas (ver `docs/VIDEO_OPTIMIZATION.md`):
 *  - MP4 con H.264 + AAC, max 1080p
 *  - Preload `none` por defecto; `metadata` solo para Hero (above the fold)
 *  - `playsInline` y `muted` cuando hay autoplay
 *  - Poster obligatorio (WebP, ~50-100 KB)
 *  - HLS opcional para videos largos (`.m3u8`)
 *  - Lazy load vía IntersectionObserver
 */
export const VIDEOS: Record<string, VideoEntry> = {
  hero: {
    id: 'hero',
    description: 'Video vertical del profesor Moisés presentándose (Hero, above the fold).',
    source: { type: 'mp4', src: '/videos/hero.mp4' },
    poster: '/images/hero-poster.jpg',
    aspectRatio: '9/16',
    section: 'HeroSection',
    loadingStrategy: 'eager',
  },
  method: {
    id: 'method',
    description: 'Explicación del método paso a paso.',
    source: { type: 'mp4', src: '/videos/metodo-explicado.mp4' },
    poster: '/images/metodo-poster.jpg',
    transcript: '/transcripts/metodo-explicado.vtt',
    aspectRatio: '16/9',
    section: 'MethodSection',
    loadingStrategy: 'lazy',
  },
  testimonial: {
    id: 'testimonial',
    description: 'Testimonio en video del alumno más representativo.',
    source: { type: 'mp4', src: '/videos/testimonial-principal.mp4' },
    poster: '/images/testimonial-poster.jpg',
    transcript: '/transcripts/testimonial-principal.vtt',
    aspectRatio: '16/9',
    section: 'ProfessorSection',
    loadingStrategy: 'lazy',
  },
  quienes_somos: {
    id: 'quienes_somos',
    description: 'Video presentación del profesor y la escuela.',
    source: { type: 'mp4', src: '/videos/quienes_somos.mp4' },
    poster: '',
    aspectRatio: '9/16',
    section: 'ProfessorSection',
    loadingStrategy: 'lazy',
  },
  mogran: {
    id: 'mogran',
    description: 'Video promocional de Talleres Mogran.',
    source: { type: 'mp4', src: '/videos/mogran.mp4' },
    poster: '',
    aspectRatio: '9/16',
    section: 'ProfessorSection',
    loadingStrategy: 'lazy',
  },
  testimonios: {
    id: 'testimonios',
    description: 'Video de testimonios de alumnos.',
    source: { type: 'mp4', src: '/videos/testimonios.mp4' },
    poster: '',
    aspectRatio: '16/9',
    section: 'ProfessorSection',
    loadingStrategy: 'lazy',
  },
  talleresubicacion: {
    id: 'talleresubicacion',
    description: 'Video mostrando la ubicación de Talleres Mogran.',
    source: { type: 'mp4', src: '/videos/talleresubicacion.mp4' },
    poster: '',
    aspectRatio: '16/9',
    section: 'ClosingSection',
    loadingStrategy: 'lazy',
  },
};

export function getVideo(id: keyof typeof VIDEOS): VideoEntry {
  const entry = VIDEOS[id];
  if (!entry) throw new Error(`Video "${id}" no encontrado en el índice VIDEOS`);
  return entry;
}
