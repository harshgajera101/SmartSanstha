import React from 'react';
import { Globe, Calendar, FileText, Award, Star } from 'lucide-react';
import { Card } from '../common/Card';
import { useInView } from 'react-intersection-observer';

export const ConstitutionFacts: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const facts = [
    {
      title: 'World\'s Longest Constitution',
      description: 'The Indian Constitution is the longest written constitution of any country in the world.',
      icon: <Globe className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Took 2 Years 11 Months',
      description: 'The Constituent Assembly took nearly 3 years to draft the Constitution from 1947 to 1950.',
      icon: <Calendar className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Handwritten & Calligraphed',
      description: 'The original Constitution was handwritten in both Hindi and English with beautiful calligraphy.',
      icon: <FileText className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Borrowed from Best Practices',
      description: 'It incorporates the best features from constitutions of various countries around the world.',
      icon: <Award className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4 sm:mb-6">
            <Star className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 font-semibold text-xs sm:text-sm">Did You Know?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-4">
            Fascinating Facts About Our Constitution
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto px-4">
            Discover interesting facts about the world's longest written constitution
          </p>
        </div>

        <div 
          ref={ref}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {facts.map((fact, index) => (
            <div
              key={index}
              className={inView ? 'animate-fade-in-up' : 'opacity-0'}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <Card hover className="text-center h-full">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${fact.color} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                  <div className="text-white">{fact.icon}</div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{fact.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm">{fact.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};