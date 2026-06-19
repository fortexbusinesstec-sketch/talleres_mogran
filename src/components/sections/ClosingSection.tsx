'use client';

import { ButtonLink } from '@/components/ui/Button';
import { IconBrandWhatsapp, IconBuildingBank, IconCreditCard } from '@tabler/icons-react';

export function ClosingSection() {
  return (
    <section
      id="closing"
      className="bg-[#0b1224] py-20 md:py-28 relative overflow-hidden border-t border-white/5"
      aria-labelledby="closing-title"
    >
      {/* Background radial spotlight */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mogran-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-section px-4 md:px-8 relative z-10 text-center">
        
        {/* Main CTA Content */}
        <div className="max-w-4xl mx-auto mb-20 md:mb-28">
          <h2 
            id="closing-title" 
            className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.05] text-balance mb-6 [&_em]:not-italic [&_em]:text-mogran-primary"
          >
            Da el primer paso <br className="hidden md:block" />cuando te sientas <em>listo</em>
          </h2>
          
          <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto mb-10">
            No necesitás estar &ldquo;preparado&rdquo; para empezar. Ninguno de nuestros alumnos lo estaba. 
            Solo necesitás decidir que hoy es el día en que dejás de evitarlo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <ButtonLink
              variant="primary"
              size="lg"
              href="https://app.talleresmogran.com/inscripcion"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold shadow-lg shadow-mogran-primary/25"
            >
              Reservar mi cupo
            </ButtonLink>
            
            <ButtonLink
              variant="secondary"
              size="lg"
              href="https://wa.me/51943695799?text=Hola%20Mogran%2C%20me%20interesa%20el%20taller%20de%20oratoria"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold"
            >
              <IconBrandWhatsapp size={22} strokeWidth={2.5} aria-hidden="true" />
              Hablar con un consultor
            </ButtonLink>
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
            <div className="text-center md:text-left">
              <p>© Moisés Granados | Talleres Mogran</p>
              <p className="mt-1">Av. Juan Pardo de Zela Cdra 2, Lince, Lima — Visitas previa coordinación</p>
            </div>
            
            <div className="flex items-center gap-2 justify-center md:justify-end">
              <span className="sr-only">Métodos de pago aceptados:</span>
              <IconBuildingBank size={24} strokeWidth={1.5} className="text-white/40" aria-label="Transferencia bancaria" />
              <IconCreditCard size={24} strokeWidth={1.5} className="text-white/40" aria-label="Tarjetas" />
              <span className="text-xs">Yape · Plin · BCP · BBVA</span>
            </div>
          </div>
        </footer>

      </div>
    </section>
  );
}
