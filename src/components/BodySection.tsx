import React from "react";

const topics = [
  { title: "Legislature", desc: "Understand how laws are made in India." },
  { title: "Executive", desc: "Explore how policies are implemented." },
  { title: "Judiciary", desc: "Learn how justice is delivered." },
];

const BodySection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-10">Core Pillars of the Constitution</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {topics.map((t) => (
            <div key={t.title} className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <h4 className="text-xl font-semibold mb-3 text-blue-700">{t.title}</h4>
              <p className="text-gray-600">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BodySection;
