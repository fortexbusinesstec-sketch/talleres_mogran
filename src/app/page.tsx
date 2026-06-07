import { HeroSection } from '@/components/sections/HeroSection';
import { RedSection } from '@/components/sections/RedSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { MethodSection } from '@/components/sections/MethodSection';
import { AudienceSection } from '@/components/sections/AudienceSection';
import { ScheduleSection } from '@/components/sections/ScheduleSection';
import { ProfessorSection } from '@/components/sections/ProfessorSection';
import { PaymentSection } from '@/components/sections/PaymentSection';
import { ClosingSection } from '@/components/sections/ClosingSection';
import { Navbar } from '@/components/ui/Navbar';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <RedSection />
      <ProblemSection />
      <MethodSection />
      <AudienceSection />
      <ScheduleSection />
      <ProfessorSection />
      <PaymentSection />
      <ClosingSection />
    </>
  );
}
