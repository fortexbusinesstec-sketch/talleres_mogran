'use client';

import { TabGroup, TabPanel } from '@/components/ui/TabGroup';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CourseAudience } from '@/types';
import {
  IconStar, IconMasksTheater, IconSpeakerphone, IconUsers,
  IconShieldCheck, IconBooks, IconUserCheck, IconMessage2,
  IconRocket, IconBriefcase, IconUsersGroup, IconUserStar,
  IconTargetArrow, IconCamera, IconAward, IconHeartHandshake,
} from '@tabler/icons-react';

interface Benefit {
  icon: typeof IconStar;
  text: string;
}

const audiences: (CourseAudience & { subtitle: string; benefits: Benefit[] })[] = [
  {
    id: 'ninos',
    label: 'Niños',
    edad: '7 a 12 años',
    subtitle: 'Desarrollo Temprano y Confianza',
    descripcion:
      'Juegos teatrales, expresión corporal y lectura en voz alta. Grupos reducidos para que nadie pase desapercibido. El objetivo no es convertirlos en políticos. Es que puedan presentar un trabajo escolar sin temblar.',
    badge: 'Presencial y Virtual',
    benefits: [
      { icon: IconStar, text: 'Vencer la timidez escolar: Exponer tareas en clase con total seguridad.' },
      { icon: IconMasksTheater, text: 'Aprender jugando: Dinámicas lúdicas para soltar el cuerpo y la voz.' },
      { icon: IconSpeakerphone, text: 'Expresión de emociones: Comunicar lo que sienten con claridad y sin frustración.' },
      { icon: IconUsers, text: 'Socialización efectiva: Herramientas para hacer amigos y ganar liderazgo.' },
    ],
  },
  {
    id: 'adolescentes',
    label: 'Adolescentes',
    edad: '13 a 16 años',
    subtitle: 'Identidad y Seguridad Social',
    descripcion:
      'Dinámicas de grupo, lectura crítica de textos y presentaciones cortas que preparan para exámenes orales. Aprenden a sostener su postura y a decir lo que piensan sin agresividad ni sumisión.',
    badge: 'Presencial y Virtual',
    benefits: [
      { icon: IconShieldCheck, text: 'Superar el miedo al ridículo: Controlar los nervios frente a sus compañeros.' },
      { icon: IconBooks, text: 'Exámenes orales fluidos: Técnicas para estructurar respuestas bajo presión.' },
      { icon: IconUserCheck, text: 'Fortalecer la autoestima: Lenguaje corporal que proyecta seguridad y autoridad.' },
      { icon: IconMessage2, text: 'Debate y opinión: Defender sus ideas ante profesores y padres con madurez.' },
    ],
  },
  {
    id: 'jovenes',
    label: 'Jóvenes',
    edad: '17 a 20+ años',
    subtitle: 'Impulso Académico y Profesional',
    descripcion:
      'Oratoria aplicada a contextos académicos y profesionales: defensas de tesis, exposiciones, entrevistas. Trabajo de modulación, presencia y construcción de argumentos sólidos.',
    badge: 'Presencial y Virtual',
    benefits: [
      { icon: IconRocket, text: 'Sustentación de proyectos: Convencer a jurados y profesores exigentes.' },
      { icon: IconBriefcase, text: 'Entrevistas de trabajo: Saber "venderse" y proyectar un perfil de alto valor.' },
      { icon: IconUsersGroup, text: 'Networking estratégico: Conectar con seguridad en eventos y trabajos grupales.' },
      { icon: IconUserStar, text: 'Marca personal: Primeros pasos en la comunicación y liderazgo de equipos.' },
    ],
  },
  {
    id: 'adultos',
    label: 'Adultos',
    edad: '25 a 69 años',
    subtitle: 'Liderazgo y Crecimiento Laboral',
    descripcion:
      'Técnicas para reuniones de trabajo, presentaciones ejecutivas y conversaciones difíciles. Practicamos cómo sostener la mirada, cómo decir no, cómo pedir sin pedir perdón.',
    badge: 'Presencial y Virtual',
    benefits: [
      { icon: IconBriefcase, text: 'Manejo de equipos: Dirigir reuniones y dar directrices con total claridad.' },
      { icon: IconTargetArrow, text: 'Ventas y negociación: Presentar propuestas comerciales que cierren tratos.' },
      { icon: IconCamera, text: 'Oratoria digital: Dominar la comunicación ante cámaras, micro y entornos virtuales.' },
      { icon: IconAward, text: 'Autoridad y credibilidad: Proyectar la seguridad que exige un puesto de alto cargo.' },
    ],
  },
];

export function AudienceSection() {
  const handleTabChange = (tabId: string) => {
    const element = document.getElementById('schedule');
    if (element) {
      const url = new URL(window.location.href);
      url.searchParams.set('publico', tabId);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const tabs = audiences.map((audience) => ({
    id: audience.id,
    label: audience.label,
    content: (
      <TabPanel>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-mogran-dark-text mb-2">
              Oratoria para {audience.label}
            </h3>
            <p className="text-mogran-dark-text-muted mb-6">{audience.edad}</p>
            <p className="text-lg text-mogran-dark-text-secondary leading-relaxed mb-6">
              {audience.descripcion}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="primary">{audience.badge}</Badge>
              <Badge variant="accent">Grupos de 8 a 12 alumnos</Badge>
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                const element = document.getElementById('schedule');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Ver horarios para {audience.label.toLowerCase()}
            </Button>
          </div>

          <div className="bg-mogran-dark-surface/80 rounded-2xl border border-mogran-dark-border p-6 min-h-[260px] flex flex-col justify-center">
            <ul className="space-y-3">
              {audience.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-mogran-accent/10 flex items-center justify-center mt-0.5">
                    <b.icon size={14} className="text-mogran-accent" />
                  </span>
                  <span className="text-sm text-mogran-dark-text-secondary leading-snug">
                    {b.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </TabPanel>
    ),
  }));

  return (
    <section
      id="audience"
      className="bg-[#0a1e5c] section"
      aria-labelledby="audience-title"
    >
      <div className="container-section">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2
            id="audience-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-mogran-dark-text mb-6 text-balance"
          >
            Cursos diseñados para cada etapa de la vida
          </h2>
          <p className="text-lg text-mogran-dark-text-secondary leading-relaxed">
            Cada edad tiene sus propios desafíos al hablar en público. Por eso adaptamos el método al
            momento que estás viviendo.
          </p>
        </div>

        <TabGroup tabs={tabs} onChange={handleTabChange} />
      </div>
    </section>
  );
}
