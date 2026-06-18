'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { IconPlayerPlayFilled, IconPlayerPauseFilled, IconVolume, IconVolumeOff, IconAlertCircle } from '@tabler/icons-react';

export type VideoSource =
  | { type: 'mp4'; src: string }
  | { type: 'hls'; src: string }
  | { type: 'adaptive'; mp4: string; hls?: string };

export interface VideoPlayerProps {
  src: string | VideoSource;
  alt: string;
  poster?: string;
  transcript?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  aspectRatio?: '16/9' | '9/16' | '4/3' | '1/1' | '21/9';
  className?: string;
  showControls?: boolean;
  showPosterUntilPlay?: boolean;
  rootMargin?: string;
  preload?: 'none' | 'metadata' | 'auto';
}

const DEFAULT_ASPECT: VideoPlayerProps['aspectRatio'] = '16/9';

function resolveSource(src: string | VideoSource): { src: string; type?: string; mp4Fallback?: string } {
  if (typeof src === 'string') {
    if (src.endsWith('.m3u8')) return { src, type: 'hls' };
    return { src, type: 'mp4' };
  }
  if (src.type === 'hls') return { src: src.src, type: 'hls' };
  if (src.type === 'mp4') return { src: src.src, type: 'mp4' };
  return { src: src.hls || src.mp4, type: src.hls ? 'hls' : 'mp4', mp4Fallback: src.mp4 };
}

export function VideoPlayer({
  src,
  alt,
  poster,
  transcript,
  autoPlay = false,
  muted = true,
  loop = true,
  aspectRatio = DEFAULT_ASPECT,
  className = '',
  showControls = true,
  showPosterUntilPlay = false,
  rootMargin = '500px',
  preload = 'none',
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<unknown>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const [isInView, setIsInView] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [hasError, setHasError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const source = resolveSource(src);

  useEffect(() => {
    if (isInView || !containerRef.current) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        });
      },
      { rootMargin, threshold: 0.05 }
    );

    observerRef.current.observe(containerRef.current);
    return () => observerRef.current?.disconnect();
  }, [isInView, rootMargin]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isInView || source.type !== 'hls') return;

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = source.src;
      return;
    }

    import('hls.js').then(({ default: Hls }) => {
      if (Hls.isSupported() && videoRef.current) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: false,
          backBufferLength: 30,
        });
        hls.loadSource(source.src);
        hls.attachMedia(videoRef.current);
        hlsRef.current = hls;
      } else if (source.mp4Fallback) {
        video.src = source.mp4Fallback;
      }
    });

    return () => {
      const hls = hlsRef.current as { destroy?: () => void } | null;
      hls?.destroy?.();
      hlsRef.current = null;
    };
  }, [isInView, source]);

  useEffect(() => {
    if (!isInView || source.type !== 'mp4') return;
    const video = videoRef.current;
    if (video && !video.src) {
      video.src = source.src;
      video.load();
    }
  }, [isInView, source]);

  useEffect(() => {
    if (!isInView || !autoPlay || !videoRef.current) return;
    const video = videoRef.current;

    const tryPlay = () => {
      const p = video.play();
      if (p && typeof p.catch === 'function') {
        p.catch(() => setIsPlaying(false));
      }
    };

    if (video.readyState >= 3) {
      tryPlay();
    } else {
      video.addEventListener('canplay', tryPlay, { once: true });
      return () => video.removeEventListener('canplay', tryPlay);
    }
  }, [isInView, autoPlay]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.src && source.type === 'mp4') {
      video.src = source.src;
      video.load();
    }
    if (video.paused) {
      video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  }, [source]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration || !Number.isFinite(video.duration)) return;
    setCurrentTime(video.currentTime);
    setProgress((video.currentTime / video.duration) * 100);
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;
    setDuration(video.duration);
  }, []);

  const handleSeek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const video = videoRef.current;
      if (!video || !video.duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      video.currentTime = pct * video.duration;
    },
    []
  );

  const handleSeekKey = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    if (e.key === 'ArrowRight') {
      video.currentTime = Math.min(video.duration, video.currentTime + 5);
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      video.currentTime = Math.max(0, video.currentTime - 5);
      e.preventDefault();
    }
  }, []);

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const showPosterOverlay = showPosterUntilPlay && !isPlaying && !!poster;
  const showLoadingOverlay = isInView && !isReady && !hasError;
  const showPlayOverlay = isInView && !hasError;
  const showBottomControls = showControls && isReady && !hasError;

  return (
    <figure
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl bg-mogran-secondary group ${className}`}
      aria-label={alt}
      style={{ aspectRatio }}
    >
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-mogran-secondary p-6">
          <div className="text-center max-w-xs">
            <IconAlertCircle size={32} className="text-white/40 mx-auto mb-2" aria-hidden="true" />
            <p className="text-white/70 text-sm font-medium">No se pudo cargar el video</p>
            <p className="text-white/40 text-xs mt-1">Verifica tu conexión e inténtalo de nuevo</p>
          </div>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            poster={poster}
            autoPlay={false}
            muted={isMuted}
            loop={loop}
            playsInline
            preload={preload}
            onLoadedData={() => setIsReady(true)}
            onCanPlay={() => setIsReady(true)}
            onCanPlayThrough={() => setIsReady(true)}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => !loop && setIsPlaying(false)}
            onTimeUpdate={handleTimeUpdate}
            onError={() => {
              setHasError(true);
              setIsReady(true);
            }}
            onClick={togglePlay}
            className="absolute inset-0 w-full h-full object-cover cursor-pointer"
            aria-label={alt}
          >
            {transcript && (
              <track kind="captions" src={transcript} srcLang="es" label="Español" default />
            )}
          </video>

          {/* Loading spinner — fondo oscuro, se oculta detrás del overlay */}
          {showLoadingOverlay && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-white/5 pointer-events-none"
              style={{
                backgroundImage: poster ? `url(${poster})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              aria-hidden="true"
            >
              {!poster && (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 border-[3px] border-white/20 border-t-mogran-primary rounded-full animate-spin" />
                  <span className="text-xs text-white/40">Cargando video…</span>
                </div>
              )}
            </div>
          )}

          {/* Gradient overlay — siempre visible */}
          {showPlayOverlay && (
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-300 ${
                isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
              }`}
              aria-hidden="true"
            />
          )}

          {/* Center play/pause overlay — siempre visible (incluso mientras carga) */}
          {showPlayOverlay && (
            <button
              onClick={togglePlay}
              className={`absolute inset-0 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-mogran-primary rounded-xl transition-all duration-300 ${
                isPlaying
                  ? 'opacity-0 group-hover:opacity-100 bg-black/40'
                  : 'opacity-100 bg-mogran-secondary/85 backdrop-blur-sm'
              }`}
              aria-label={isPlaying ? `Pausar video: ${alt}` : `Reproducir video: ${alt}`}
              aria-pressed={isPlaying}
              type="button"
            >
              <div className="flex flex-col items-center gap-3 pointer-events-none">
                <span
                  className={`flex items-center justify-center rounded-full shadow-2xl transition-all duration-200 ${
                    isPlaying
                      ? 'w-14 h-14 md:w-16 md:h-16 bg-white/90 text-mogran-secondary hover:scale-110'
                      : 'w-16 h-16 md:w-20 md:h-20 bg-mogran-primary text-white hover:scale-110 shadow-lg shadow-mogran-primary/30'
                  }`}
                  aria-hidden="true"
                >
                  {isPlaying ? (
                    <IconPlayerPauseFilled size={28} strokeWidth={1.5} />
                  ) : (
                    <IconPlayerPlayFilled size={36} strokeWidth={2} />
                  )}
                </span>
                {!isPlaying && (
                  <span className="text-white text-sm md:text-base font-bold tracking-wide">
                    Ver Video
                  </span>
                )}
              </div>
            </button>
          )}

          {/* Poster overlay */}
          {showPosterOverlay && (
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true" />
          )}

          {/* Bottom controls (progreso, volumen) — solo cuando el video está listo */}
          {showBottomControls && (
            <div
              className={`absolute bottom-0 left-0 right-0 p-3 md:p-4 transition-opacity duration-300 ${
                isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-mogran-secondary/95 backdrop-blur-sm text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-mogran-primary transition-colors"
                  aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                  aria-pressed={isPlaying}
                  type="button"
                >
                  {isPlaying ? (
                    <IconPlayerPauseFilled size={18} strokeWidth={2} aria-hidden="true" />
                  ) : (
                    <IconPlayerPlayFilled size={18} strokeWidth={2} aria-hidden="true" />
                  )}
                </button>

                <div className="flex-1 flex items-center gap-2 text-white">
                  <span className="text-xs font-medium tabular-nums min-w-[3ch]">
                    {formatTime(currentTime)}
                  </span>

                  <div
                    className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden cursor-pointer"
                    onClick={handleSeek}
                    onKeyDown={handleSeekKey}
                    role="progressbar"
                    aria-label="Barra de progreso del video"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(progress)}
                    tabIndex={0}
                  >
                    <div
                      className="h-full bg-mogran-primary rounded-full transition-all duration-100"
                      style={{ width: `${progress}%` }}
                      aria-hidden="true"
                    />
                  </div>

                  <span className="text-xs font-medium tabular-nums min-w-[3ch]">
                    {formatTime(duration)}
                  </span>
                </div>

                <button
                  onClick={toggleMute}
                  className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-mogran-secondary/95 backdrop-blur-sm text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-mogran-primary transition-colors"
                  aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                  aria-pressed={!isMuted}
                  type="button"
                >
                  {isMuted ? (
                    <IconVolumeOff size={18} strokeWidth={2} aria-hidden="true" />
                  ) : (
                    <IconVolume size={18} strokeWidth={2} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          )}

          <figcaption className="visually-hidden">{alt}</figcaption>
        </>
      )}
    </figure>
  );
}
