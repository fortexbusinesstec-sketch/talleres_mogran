import React from 'react';

export type SpeakerStyleKey =
  | 'ORADOR_CONECTOR'
  | 'ORADOR_ESTRATEGA'
  | 'ORADOR_ENERGETICO'
  | 'ORADOR_ANALITICO'
  | 'ORADOR_TRANSFORMADOR'
  | 'ORADOR_PROTECTOR'
  | 'ORADOR_GUERRERO'
  | 'ORADOR_EXPLORADOR';

interface SpeakerIconProps extends React.SVGProps<SVGSVGElement> {
  styleKey: SpeakerStyleKey;
  size?: number;
}

export const SPEAKER_COLORS: Record<SpeakerStyleKey, string> = {
  ORADOR_CONECTOR: '#05BFDB',
  ORADOR_ESTRATEGA: '#0A4D68',
  ORADOR_ENERGETICO: '#F59E0B',
  ORADOR_ANALITICO: '#64748B',
  ORADOR_TRANSFORMADOR: '#EF4444',
  ORADOR_PROTECTOR: '#10B981',
  ORADOR_GUERRERO: '#DC2626',
  ORADOR_EXPLORADOR: '#8B5CF6',
};

export function SpeakerIcon({ styleKey, size = 64, className, ...props }: SpeakerIconProps) {
  const color = SPEAKER_COLORS[styleKey] || '#14213D';

  const commonProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    ...props,
  };

  switch (styleKey) {
    case 'ORADOR_CONECTOR':
      return (
        <svg {...commonProps}>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 11a7 7 0 0 1 14 0v7a1.78 1.78 0 0 1 -3.1 1.4a1.65 1.65 0 0 0 -2.6 0a1.65 1.65 0 0 1 -2.6 0a1.65 1.65 0 0 0 -2.6 0a1.78 1.78 0 0 1 -3.1 -1.4v-7" />
          <path d="M10 10l.01 0" />
          <path d="M14 10l.01 0" />
          <path d="M10 14a3.5 3.5 0 0 0 4 0" />
        </svg>
      );
    case 'ORADOR_ESTRATEGA':
      return (
        <svg {...commonProps}>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 2a4 4 0 0 1 4 4c0 1.95 -.81 3.27 -2 4c-1.19 .73 -2 2.05 -2 4" />
          <path d="M8 14c-1.667 0 -3.333 1.333 -4 4h16c-.667 -2.667 -2.333 -4 -4 -4" />
          <path d="M12 10h.01" />
          <path d="M12 2v2" />
          <path d="M8 8l-2 2" />
          <path d="M16 8l2 2" />
        </svg>
      );
    case 'ORADOR_ENERGETICO':
      return (
        <svg {...commonProps}>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11" />
        </svg>
      );
    case 'ORADOR_ANALITICO':
      return (
        <svg {...commonProps}>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 3v18h18" />
          <path d="M9 15m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M13 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M17 7m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M5 19l4 -4l4 2l4 -6l4 4" />
        </svg>
      );
    case 'ORADOR_TRANSFORMADOR':
      return (
        <svg {...commonProps}>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 10.941c2.333 -3.066 4.667 -3.066 7 0c-2.333 3.066 -2.333 6.117 0 9.059c-2.333 -2.942 -4.667 -2.942 -7 0c2.333 -2.942 2.333 -5.993 0 -9.059z" />
          <path d="M12 10.941c-2.333 -3.066 -4.667 -3.066 -7 0c2.333 3.066 2.333 6.117 0 9.059c2.333 -2.942 4.667 -2.942 7 0c-2.333 -2.942 -2.333 -5.993 0 -9.059z" transform="rotate(45 12 12)" />
        </svg>
      );
    case 'ORADOR_PROTECTOR':
      return (
        <svg {...commonProps}>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
        </svg>
      );
    case 'ORADOR_GUERRERO':
      return (
        <svg {...commonProps}>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M20 4v5l-9 7l-4 4l-3 -3l4 -4l7 -9" />
          <path d="M17.5 6.5l-5 5" />
        </svg>
      );
    case 'ORADOR_EXPLORADOR':
      return (
        <svg {...commonProps}>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M12 12l4 -4" />
          <path d="M12 12l-4 4" />
          <path d="M12 12l4 4" />
          <path d="M12 12l-4 -4" />
        </svg>
      );
    default:
      return null;
  }
}
