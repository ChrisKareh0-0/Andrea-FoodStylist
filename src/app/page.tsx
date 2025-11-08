import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import StatsSection from '@/components/sections/StatsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ResumeSection from '@/components/sections/ResumeSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import ServicesSection from '@/components/sections/ServicesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactSection from '@/components/sections/ContactSection';
import Layout from '@/components/Layout';

export default function Home() {
  return (
    <Layout pageTitle="Index">
      <HeroSection />
      <AboutSection />
      {/* <StatsSection /> */}
      {/* <SkillsSection /> */}
      {/* <ResumeSection /> */}
      <PortfolioSection />
      <ServicesSection />
      {/* <TestimonialsSection /> */}
      <ContactSection />
    </Layout>
  );
}