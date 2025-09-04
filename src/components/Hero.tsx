import React from "react";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-20 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
      <div className="max-w-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Learn the Constitution in a{" "}
          <span className="text-yellow-300">Fun</span> &{" "}
          <span className="text-yellow-300">Interactive</span> Way
        </h1>
        <p className="mt-6 text-lg text-gray-200">
          SmartSanstha makes constitutional literacy engaging through AI-powered
          explanations, gamified learning, quizzes, and multilingual support.
        </p>
        <div className="mt-8 space-x-4">
          <Link
            to="/learn"
            className="px-6 py-3 bg-yellow-400 text-blue-900 rounded-lg font-semibold shadow hover:bg-yellow-300 transition"
          >
            Start Learning
          </Link>
          <Link
            to="/chatbot"
            className="px-6 py-3 bg-white text-blue-900 rounded-lg font-semibold shadow hover:bg-gray-200 transition"
          >
            Ask AI Chatbot
          </Link>
        </div>
      </div>
      <img
        src="/hero-illustration.svg"
        alt="Gamified Learning"
        className="mt-10 md:mt-0 md:w-1/2"
      />
    </section>
  );
};

export default Hero;
