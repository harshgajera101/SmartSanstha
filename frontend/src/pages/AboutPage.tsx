import React from 'react';
import { Users, ShieldCheck, Target, Brain, Heart, Rocket } from 'lucide-react';
import { Card } from '../components/common/Card';

export const AboutPage: React.FC = () => {
  const team = [
    { name: 'Mohammad Waseem Khan', id: '22104050', role: 'Full Stack Developer' },
    { name: 'Siddhant Gaikwad', id: '22104083', role: 'Backend & AI Specialist' },
    { name: 'Harsh Gajera', id: '22104099', role: 'Frontend Developer' },
    { name: 'Sekhar Gauda', id: '22104044', role: 'UI/UX Designer' },
  ];

  return (
    <div className="w-full max-w-7xl animate-fade-in">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-xl mb-6">
          <Users className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Us</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Passionate about making constitutional literacy accessible to every Indian citizen
        </p>
      </div>

      {/* Mission, Vision, Values */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card hover className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Our Mission</h3>
          <p className="text-slate-400 leading-relaxed">
            To create high-quality, educational experiences that make constitutional learning engaging, accessible, and impactful for all.
          </p>
        </Card>
        
        <Card hover className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Our Vision</h3>
          <p className="text-slate-400 leading-relaxed">
            To be the leading platform for gamified constitutional literacy, where knowledge is not just consumed, but experienced.
          </p>
        </Card>
        
        <Card hover className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Our Values</h3>
          <p className="text-slate-400 leading-relaxed">
            Accessibility, accuracy, engagement, and empowerment through technology-driven education.
          </p>
        </Card>
      </div>

      {/* Story */}
      <Card className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Rocket className="w-6 h-6 text-orange-400" />
          <h2 className="text-3xl font-bold text-white">Our Story</h2>
        </div>
        <div className="space-y-4 text-slate-300 leading-relaxed">
          <p>
            SmartSanstha was born from a simple observation: the Indian Constitution, while being the supreme law of our land, remains inaccessible to most citizens due to its complex legal language and dense structure.
          </p>
          <p>
            As students at A.P. Shah Institute of Technology, we recognized this gap and decided to leverage modern technology to bridge it. Our team combined expertise in full-stack development, artificial intelligence, UI/UX design, and gamification to create a platform that transforms constitutional learning.
          </p>
          <p>
            What started as an academic project has evolved into a comprehensive platform that uses AI, interactive games, and adaptive learning to make the Constitution accessible to students, professionals, and curious citizens alike.
          </p>
        </div>
      </Card>

      {/* Team */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Meet the Team</h2>
          <p className="text-slate-400">Students of A.P. Shah Institute of Technology, Thane</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <Card key={index} hover className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl shadow-lg">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="font-bold text-white text-lg mb-1">{member.name}</h3>
              <p className="text-slate-500 text-sm mb-2">{member.id}</p>
              <p className="text-orange-400 text-sm font-semibold">{member.role}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Guidance */}
      <Card className="text-center bg-gradient-to-br from-slate-800 to-slate-700">
        <Brain className="w-16 h-16 text-orange-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-4">Under the Guidance of</h3>
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div>
            <p className="text-xl font-bold text-white">Dr. Vaibhav Yawalkar</p>
            <p className="text-slate-400">Project Guide</p>
          </div>
          <div>
            <p className="text-xl font-bold text-white">Ms. Charul Singh</p>
            <p className="text-slate-400">Project Co-Guide</p>
          </div>
        </div>
      </Card>
    </div>
  );
};