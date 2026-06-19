import { MethodologyConsole } from '@/components/sections/MethodologyConsole';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function MethodSection() {
  return (
    <section id="method" className="bg-mogran-secondary section" aria-labelledby="method-title">
      <div className="container-section">
        <SectionHeading
          kicker="02 / el método"
          theme="dark"
          className="mb-16"
          title={<span id="method-title">Confianza que se construye <em>paso a paso</em></span>}
          description="Unimos locución, expresión corporal y tecnología de pantalla verde en un entrenamiento adaptado por fases estratégicas."
        />

        <MethodologyConsole />
      </div>
    </section>
  );
}
