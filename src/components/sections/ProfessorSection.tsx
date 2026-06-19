'use client';

import { useState } from 'react';
import { TestimonialCard } from '@/components/ui/TestimonialCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { getVideo } from '@/lib/videos/registry';
import { Testimonial, Professor } from '@/types';
import { IconBrandTiktok } from '@tabler/icons-react';

const profesor: Professor = {
  nombre: 'Moisés Granados Zuloeta',
  bio: 'Moisés Granados Zuloeta es comunicador, locutor y formador. Durante más de dos décadas ha desarrollado proyectos en televisión, medios audiovisuales y plataformas digitales. Pero su trabajo más importante sucede en el aula: acompañar a personas tímidas a descubrir que tienen algo valioso que decir.',
  foto: '/images/profesor-moises.jpg',
  tiktok: 'https://www.tiktok.com/@profesormoises',
  experiencia: '25 años',
};

const testimonios: Testimonial[] = [
  {
    id: '1',
    nombre: 'Carla M.',
    edad: '34 años',
    curso: 'Adultos presencial',
    texto:
      'Yo temblaba antes de cualquier presentación. Ahora puedo hablar en reuniones sin que me cueste. No soy otra persona. Soy yo, con herramientas.',
  },
  {
    id: '2',
    nombre: 'Padre de alumno',
    edad: '',
    curso: 'Curso niños virtual',
    texto:
      'Mi hijo de 9 años no levantaba la mano en clase. Después de dos meses, pidió participar en el festival de lectura. Fue él quien lo pidió.',
  },
  {
    id: '3',
    nombre: 'Luis R.',
    edad: '28 años',
    curso: 'Jóvenes presencial',
    texto:
      'Pensé que me iban a obligar a hablar frente a todos el primer día. No fue así. Empezamos con ejercicios individuales, luego en parejas, y cuando me di cuenta ya estaba presentando.',
  },
];

export function ProfessorSection() {
  const [activeVideo, setActiveVideo] = useState<'quienes_somos' | 'mogran'>('quienes_somos');

  return (
    <section
      id="professor"
      className="bg-[#14213D] section border-b border-white/5"
      aria-labelledby="professor-title"
    >
      <div className="container-section">
        <SectionHeading
          kicker="06 / el profesor"
          theme="dark"
          className="mb-16"
          title={<span id="professor-title">25 años ayudando a personas<br className="hidden md:block" /> a <em>encontrar su voz</em></span>}
        />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-14 md:mb-20">
          <div className="relative w-full max-w-[300px] mx-auto lg:mx-0">
            {/* Video Toggle Pills */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex bg-white/5 border border-white/10 rounded-full p-1 text-xs font-semibold relative z-20">
                <button
                  type="button"
                  onClick={() => setActiveVideo('quienes_somos')}
                  className={`px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeVideo === 'quienes_somos' ? 'bg-mogran-primary text-white shadow-md' : 'text-white/60 hover:text-white'
                  }`}
                >
                  Quiénes Somos
                </button>
                <button
                  type="button"
                  onClick={() => setActiveVideo('mogran')}
                  className={`px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeVideo === 'mogran' ? 'bg-mogran-primary text-white shadow-md' : 'text-white/60 hover:text-white'
                  }`}
                >
                  Taller en Acción
                </button>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-white/5">
              <VideoPlayer
                key={activeVideo}
                src={getVideo(activeVideo).source}
                alt={getVideo(activeVideo).description}
                poster={getVideo(activeVideo).poster}
                aspectRatio="9/16"
                autoPlay
                muted
                loop
                showControls
                preload="metadata"
                className="rounded-2xl"
              />
            </div>
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {profesor.nombre}
            </h3>
            <p className="text-white/60 mb-6">
              Comunicador, locutor y formador
            </p>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                Moisés Granados Zuloeta es comunicador, locutor y formador. Durante más de dos décadas ha
                desarrollado proyectos en televisión, medios audiovisuales y plataformas digitales. Pero su
                trabajo más importante sucede en el aula: acompañar a personas tímidas a descubrir que tienen
                algo valioso que decir.
              </p>
              <p>
                Su enfoque no es teórico. Aprendió que la confianza no se imparte con charlas motivacionales.
                Se construye con ejercicios concretos, repetición y un ambiente donde equivocarse no es
                vergonzoso.
              </p>
            </div>
            <a
              href={profesor.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-mogran-primary hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-mogran-primary ring-offset-mogran-secondary rounded-md p-1"
            >
              <IconBrandTiktok size={20} strokeWidth={2} aria-hidden="true" />
              <span className="font-medium">@profesormoises</span>
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-8 text-center">
            Lo que dicen nuestros alumnos
          </h3>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            <div className="flex flex-col gap-6">
              {testimonios.slice(0, 2).map((testimonio) => (
                <TestimonialCard key={testimonio.id} testimonial={testimonio} />
              ))}
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-white/5 h-full">
              <VideoPlayer
                src={getVideo('testimonios').source}
                alt="Video de testimonios de alumnos"
                poster=""
                showControls
                preload="metadata"
                className="rounded-2xl ![aspect-ratio:auto] !h-full !min-h-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
