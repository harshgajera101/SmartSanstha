import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "What courses are offered?", a: "We provide AI-powered simplified modules..." },
  { q: "How do these courses simplify topics?", a: "Using games, visuals, and quizzes..." },
  { q: "Who can benefit?", a: "Students, law aspirants, and citizens of all ages." },
  { q: "Are these courses self-paced?", a: "Yes, you can learn anytime." },
  { q: "Do you offer certificates?", a: "Yes, after course completion." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="px-8 py-12 bg-[#0A2240] text-white">
      <h2 className="text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="max-w-2xl mx-auto">
        {faqs.map((f, i) => (
          <div key={i} className="border-b border-gray-500 py-4">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex justify-between items-center text-lg font-semibold focus:outline-none"
            >
              {f.q}
              {open === i ? (
                <Minus className="text-yellow-400" />
              ) : (
                <Plus className="text-yellow-400" />
              )}
            </button>
            {open === i && (
              <p className="mt-2 text-gray-200 leading-relaxed">{f.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
