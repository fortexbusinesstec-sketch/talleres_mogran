'use client';

import { Accordion, AccordionItem } from '@/components/ui/Accordion';
import { ButtonLink } from '@/components/ui/Button';
import { MapaSection } from '@/components/sections/MapaSection';
import { IconBrandWhatsapp, IconBuildingBank, IconCreditCard } from '@tabler/icons-react';

const faqs: AccordionItem[] = [
  {
    id: 'faq-1',
    question: '¿Dónde se dictan las clases presenciales?',
    answer:
      'Las clases presenciales se dictan en Lince (entre la 18 y 19 de la Avenida Arequipa).',
  },
  {
    id: 'faq-2',
    question: '¿A quiénes está dirigido el curso de Oratoria?',
    answer:
      'Dirigido a niños, adolescentes, jóvenes y adultos.',
  },
  {
    id: 'faq-3',
    question: '¿Cuántos alumnos son por clase?',
    answer:
      'En promedio son 12 alumnos por clase.',
  },
  {
    id: 'faq-4',
    question: '¿Cuánto dura el curso?',
    answer:
      'El curso en su nivel básico dura 3 meses.',
  },
];

export function ClosingSection() {
  return (
    <section
      id="closing"
      className="bg-mogran-dark-base section"
      aria-labelledby="closing-title"
    >
      <div className="container-section">
        <h2
          id="closing-title"
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-mogran-dark-text text-center mb-12"
        >
          Preguntas frecuentes
        </h2>

        <div className="max-w-3xl mx-auto mb-20">
          <Accordion items={faqs} />
        </div>

        <MapaSection />

        <div className="bg-mogran-dark-elevated/40 rounded-3xl p-8 md:p-12 lg:p-16 text-center max-w-4xl mx-auto border border-mogran-dark-border">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-mogran-dark-text mb-6 text-balance">
            Da el primer paso cuando te sientas listo
          </h3>
          <p className="text-lg text-mogran-dark-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
            No necesitás estar &ldquo;preparado&rdquo; para empezar. Ninguno de nuestros alumnos lo estaba. Solo necesitás
            decidir que hoy es el día en que dejás de evitarlo.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <ButtonLink
              variant="primary"
              size="lg"
              href="https://app.talleresmogran.com/inscripcion"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              Reservar mi cupo
            </ButtonLink>
            <ButtonLink
              variant="secondary"
              size="lg"
              href="https://wa.me/51943695799?text=Hola%20Mogran%2C%20me%20interesa%20el%20taller%20de%20oratoria"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <IconBrandWhatsapp size={20} strokeWidth={2.5} aria-hidden="true" />
              Hablar con un consultor
            </ButtonLink>
          </div>
        </div>

        <footer className="mt-20 pt-8 border-t border-mogran-dark-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-mogran-dark-text-muted">
            <div className="text-center md:text-left">
              <p>© Moisés Granados | Talleres Mogran</p>
              <p>Av. Juan Pardo de Zela Cdra 2, Lince, Lima — Visitas previa coordinación</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="sr-only">Métodos de pago aceptados:</span>
              <IconBuildingBank size={24} strokeWidth={1.5} className="text-mogran-dark-text-muted" aria-label="Transferencia bancaria" />
              <IconCreditCard size={24} strokeWidth={1.5} className="text-mogran-dark-text-muted" aria-label="Tarjetas" />
              <span className="text-xs">Yape · Plin · BCP · BBVA</span>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
