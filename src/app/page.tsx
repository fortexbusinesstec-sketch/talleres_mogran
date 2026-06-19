import { HeroSection } from '@/components/sections/HeroSection';
import { RedSection } from '@/components/sections/RedSection';
import { TestPromoSection } from '@/components/sections/TestPromoSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { MethodSection } from '@/components/sections/MethodSection';
import { AudienceSection } from '@/components/sections/AudienceSection';
import { PlatformSection } from '@/components/sections/PlatformSection';
import { ScheduleSection } from '@/components/sections/ScheduleSection';
import { ProfessorSection } from '@/components/sections/ProfessorSection';
import { PaymentSection } from '@/components/sections/PaymentSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { MapaSection } from '@/components/sections/MapaSection';
import { ClosingSection } from '@/components/sections/ClosingSection';
import { Navbar } from '@/components/ui/Navbar';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <RedSection />
      <TestPromoSection />
      <ProblemSection />
      <MethodSection />
      <AudienceSection />
      <PlatformSection />
      <ScheduleSection />
      <ProfessorSection />
      <PaymentSection />
      <FAQSection />
      <MapaSection />
      <ClosingSection />
    </>
  );
}
