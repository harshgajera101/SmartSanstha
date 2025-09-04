import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="p-6 bg-white shadow rounded-2xl hover:shadow-lg transition flex flex-col items-center text-center">
      <div className="text-4xl text-blue-700 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-blue-800">{title}</h3>
      <p className="mt-3 text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
