'use client';

import { TestimonialCard } from '@/components/ui/TestimonialCard';
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
  const video = getVideo('mogran');

  return (
    <section
      id="professor"
      className="bg-mogran-tertiary section"
      aria-labelledby="professor-title"
    >
      <div className="container-section">
        <h2
          id="professor-title"
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-mogran-secondary text-center mb-16 text-balance max-w-3xl mx-auto"
        >
          Conoce al profesor: 25 años ayudando a personas a encontrar su voz
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative w-full max-w-sm md:max-w-md mx-auto lg:mx-0">
            <div className="relative rounded-2xl overflow-hidden border border-mogran-primary/20 shadow-xl bg-white">
              <VideoPlayer
                src={getVideo('quienes_somos').source}
                alt="Video de presentación de Talleres Mogran"
                poster=""
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
            <h3 className="text-2xl md:text-3xl font-bold text-mogran-secondary mb-4">
              {profesor.nombre}
            </h3>
            <p className="text-mogran-neutral/60 mb-6">
              Comunicador, locutor y formador
            </p>
            <div className="space-y-4 text-mogran-neutral leading-relaxed">
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
              className="inline-flex items-center gap-2 mt-6 text-mogran-primary hover:text-mogran-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-mogran-primary ring-offset-white rounded-md p-1"
            >
              <IconBrandTiktok size={20} strokeWidth={2} aria-hidden="true" />
              <span className="font-medium">@profesormoises</span>
            </a>
          </div>
        </div>

        <div className="flex justify-center mb-20">
          <div className="relative w-full max-w-2xl">
            <div className="relative rounded-2xl overflow-hidden border border-mogran-primary/20 shadow-xl bg-white">
              <VideoPlayer
                src={video.source}
                alt={video.description}
                poster={video.poster}
                aspectRatio={video.aspectRatio}
                autoPlay
                muted
                loop
                showControls
                preload="metadata"
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-mogran-secondary mb-8 text-center">
            Lo que dicen nuestros alumnos
          </h3>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            <div className="flex flex-col gap-6">
              {testimonios.slice(0, 2).map((testimonio) => (
                <TestimonialCard key={testimonio.id} testimonial={testimonio} />
              ))}
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-mogran-primary/20 shadow-xl bg-white h-full">
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
