import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { AboutSection } from '../components/home/AboutSection';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { WhyLearnSection } from '../components/home/WhyLearnSection';
import { FAQSection } from '../components/home/FAQSection';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full">
      <HeroSection onNavigate={onNavigate} />
      <AboutSection />
      <FeaturesSection />
      <WhyLearnSection />
      <FAQSection />
    </div>
  );
};