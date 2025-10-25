// import React from 'react';
// import { HeroSection } from '../components/home/HeroSection';
// import { AboutSection } from '../components/home/AboutSection';
// import { FeaturesSection } from '../components/home/FeaturesSection';
// import { WhyLearnSection } from '../components/home/WhyLearnSection';
// import { FAQSection } from '../components/home/FAQSection';

// interface HomePageProps {
//   onNavigate: (page: string) => void;
// }

// export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
//   return (
//     <div className="w-full">
//       <HeroSection onNavigate={onNavigate} />
//       <AboutSection />
//       <FeaturesSection />
//       <WhyLearnSection />
//       <FAQSection />
//     </div>
//   );
// };

import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { AboutSection } from '../components/home/AboutSection';
import { ConstitutionFacts } from '../components/home/ConstitutionFacts';
// import { WhatIsSmartSanstha } from '../components/home/WhatIsSmartSanstha';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { WhyLearnSection } from '../components/home/WhyLearnSection';
import { FAQSection } from '../components/home/FAQSection';
import { CTASection } from '../components/home/CTASection';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full">
      <HeroSection onNavigate={onNavigate} />
      <AboutSection />
      {/* <WhatIsSmartSanstha onNavigate={onNavigate} /> */}
      <WhyLearnSection />
      <FeaturesSection />
      <ConstitutionFacts />
      <FAQSection />
      <CTASection onNavigate={onNavigate} />
    </div>
  );
};