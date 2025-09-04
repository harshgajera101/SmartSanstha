import React from "react";
import { Brain, Gamepad2, Trophy, Languages, Mic } from "lucide-react";
import FeatureCard from "./FeatureCard";

const Features: React.FC = () => {
  return (
    <section className="py-16 px-8 md:px-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold text-gray-800">
        Key Features of SmartSanstha
      </h2>
      <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
        SmartSanstha blends AI, gamification, and accessibility to make
        constitutional learning enjoyable and inclusive for everyone.
      </p>
      <div className="mt-12 grid gap-10 md:grid-cols-3">
        <FeatureCard
          title="AI Chatbot"
          description="Simplifies legal terms, answers queries, and translates into multiple languages with voice support."
          icon={<Brain />}
        />
        <FeatureCard
          title="Gamified Learning"
          description="Play Snakes & Ladders, Spin-the-Wheel, and simulations to make learning fun."
          icon={<Gamepad2 />}
        />
        <FeatureCard
          title="Quizzes & Rewards"
          description="Test your knowledge, track progress, and earn badges for achievements."
          icon={<Trophy />}
        />
        <FeatureCard
          title="Multilingual Support"
          description="Understand the Constitution in your own language with AI-driven translation."
          icon={<Languages />}
        />
        <FeatureCard
          title="Voice Interaction"
          description="Ask questions by speaking and listen to answers using AI speech-to-text and text-to-speech."
          icon={<Mic />}
        />
      </div>
    </section>
  );
};

export default Features;
