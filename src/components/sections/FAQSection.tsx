'use client';

import { Accordion, AccordionItem } from '@/components/ui/Accordion';
import { SectionHeading } from '@/components/ui/SectionHeading';

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

export function FAQSection() {
  return (
    <section
      id="faq"
      className="bg-[#14213D] section border-b border-white/5"
      aria-labelledby="faq-title"
    >
      <div className="container-section px-4 md:px-8">
        <SectionHeading
          kicker="07 / dudas"
          theme="dark"
          className="mb-12"
          title={<span id="faq-title">Preguntas <em>frecuentes</em></span>}
        />

        <div className="max-w-3xl mx-auto">
          <Accordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
