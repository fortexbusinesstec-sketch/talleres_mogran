import { MethodologyConsole } from '@/components/sections/MethodologyConsole';

export function MethodSection() {
  return (
    <section id="method" className="bg-mogran-secondary section" aria-labelledby="method-title">
      <div className="container-section">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2
            id="method-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance"
          >
            Un método práctico para ganar confianza{' '}
            <span className="text-mogran-primary">paso a paso</span>
          </h2>
          <p className="text-base md:text-lg text-white/70 leading-relaxed">
            Unimos locución, expresión corporal y tecnología de pantalla verde en un entrenamiento
            adaptado por fases estratégicas.
          </p>
        </div>

        <MethodologyConsole />
      </div>
    </section>
  );
}
