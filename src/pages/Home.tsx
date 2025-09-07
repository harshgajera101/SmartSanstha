import FAQ from "../components/FAQ";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative text-center text-white bg-cover bg-center h-[70vh]"
        style={{ backgroundImage: "url('/india-flag-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full">
          <h2 className="text-2xl font-semibold">Welcome To</h2>
          <h1 className="text-4xl md:text-5xl font-bold mt-2">SmartSanstha:</h1>
          <p className="text-lg md:text-xl mt-2">
            AI-Powered Gamified Constitutional Literacy Platform
          </p>
          <button className="mt-6 px-6 py-3 bg-white text-[#0A2240] font-semibold rounded-full shadow-md hover:bg-gray-200">
            Start Learning →
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 md:px-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">What is SmartSanstha?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            SmartSanstha is an AI-powered, gamified learning platform designed
            to simplify the Indian Constitution for everyone. It transforms
            complex legal concepts into easy-to-understand language, enriched
            with interactive games, courtroom simulations, quizzes, and visual
            dashboards.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The platform not only helps users explore the Legislature,
            Executive, and Judiciary but also provides multilingual support and
            AI-driven insights to make learning engaging, inclusive, and
            impactful.
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src="/lady-justice.jpg"
            alt="Lady Justice"
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="bg-[#0A2240] text-white py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="text-center">
            <img src="/offer-simplified.jpg" alt="Simplified Learning" className="rounded-lg mb-4" />
            <h3 className="font-bold text-lg">Simplified Learning</h3>
            <p className="text-gray-300 mt-2 text-sm">
              Complex constitutional articles are translated into clear,
              easy-to-understand language with AI support.
            </p>
          </div>
          {/* Card 2 */}
          <div className="text-center">
            <img src="/offer-courtroom.jpg" alt="Courtroom Simulation" className="rounded-lg mb-4" />
            <h3 className="font-bold text-lg">Courtroom Simulation</h3>
            <p className="text-gray-300 mt-2 text-sm">
              Watch real-life inspired cases unfold step by step and observe
              petitions, defenses, and judgments.
            </p>
          </div>
          {/* Card 3 */}
          <div className="text-center">
            <img src="/offer-gamified.jpg" alt="Gamified Approach" className="rounded-lg mb-4" />
            <h3 className="font-bold text-lg">Gamified Approach</h3>
            <p className="text-gray-300 mt-2 text-sm">
              Spin-the-wheel, quizzes, and scenario challenges make learning
              engaging and fun.
            </p>
          </div>
          {/* Card 4 */}
          <div className="text-center">
            <img src="/offer-performance.jpg" alt="Performance Tracking" className="rounded-lg mb-4" />
            <h3 className="font-bold text-lg">Performance Tracking</h3>
            <p className="text-gray-300 mt-2 text-sm">
              Track progress, review strengths, and get guided suggestions for
              improvement with visual dashboards.
            </p>
          </div>
          {/* Card 5 */}
          <div className="text-center md:col-span-2 lg:col-span-1">
            <img src="/offer-chatbot.jpg" alt="Ask Chatbot" className="rounded-lg mb-4" />
            <h3 className="font-bold text-lg">Ask Chatbot</h3>
            <p className="text-gray-300 mt-2 text-sm">
              An AI chatbot answers questions, simplifies legal terms, and
              guides learners to relevant content.
            </p>
          </div>
        </div>
      </section>

      {/* Why Learn Section */}
      <section className="py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-12">
          Why Learn with SmartSanstha?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <img src="/why-clarity.png" alt="Clarity" className="mx-auto mb-4 h-20" />
            <p className="font-semibold">Clarity & Understanding</p>
          </div>
          <div>
            <img src="/why-engaging.png" alt="Engaging" className="mx-auto mb-4 h-20" />
            <p className="font-semibold">Engaging Experience</p>
          </div>
          <div>
            <img src="/why-guidance.png" alt="Guidance" className="mx-auto mb-4 h-20" />
            <p className="font-semibold">Instant Guidance</p>
          </div>
          <div>
            <img src="/why-progress.png" alt="Progress" className="mx-auto mb-4 h-20" />
            <p className="font-semibold">Smarter Progress</p>
          </div>
        </div>
      </section>

      <section>
        <FAQ/>
      </section>

    </div>
  );
}
