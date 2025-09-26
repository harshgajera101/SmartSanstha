import React, { useState, useEffect, DragEvent } from 'react';

// --- TYPE DEFINITIONS (TypeScript) ---
interface IMeterEffect {
  freedom: number;
  order: number;
}

interface IToken {
  id: string;
  label: string;
  meter: IMeterEffect;
  explanation: string;
}

interface IRandomEvent {
  chance: number;
  effect: IMeterEffect;
  desc: string;
}

interface IScenario {
  id: string;
  title: string;
  description: string;
  tokens: IToken[];
  randomEvents?: IRandomEvent[];
}

// --- GAME DATA (JSON-driven Scenarios) ---
const scenarios: IScenario[] = [
  {
    id: "rvd-001",
    title: "University Protest",
    description: "Students are organizing a large-scale protest on campus against a sudden fee hike. Tensions are high.",
    tokens: [
      { id: "right_speech", label: "Freedom of Speech", meter: { freedom: 15, order: -10 }, explanation: "Upholding the students' right to protest is a cornerstone of a free society (Article 19). It allows grievances to be aired publicly." },
      { id: "duty_order", label: "Maintain Public Order", meter: { freedom: -8, order: 12 }, explanation: "The university has a duty to ensure the safety of all students and prevent disruption to its educational activities." },
      { id: "policy_mediate", label: "Mediation Policy", meter: { freedom: 5, order: 5 }, explanation: "Initiating dialogue between the student union and the administration can lead to a peaceful resolution, balancing expression with order." }
    ],
    randomEvents: [
      { chance: 0.3, effect: { freedom: -5, order: -15 }, desc: "The protest turns disruptive, leading to minor property damage." }
    ],
  },
  {
    id: "rvd-002",
    title: "Investigative Journalism Report",
    description: "A major news outlet is about to publish a story with leaked documents exposing corruption in a government infrastructure project.",
    tokens: [
        { id: "right_press", label: "Freedom of the Press", meter: { freedom: 20, order: -15 }, explanation: "A free press is vital for holding power to account and informing the public. Exposing corruption strengthens democracy." },
        { id: "duty_security", label: "National Security", meter: { freedom: -25, order: 20 }, explanation: "The government argues the leaked documents contain sensitive information that could compromise national security if published." },
        { id: "policy_redact", label: "Redact Sensitive Info", meter: { freedom: -5, order: 10 }, explanation: "Publishing the story while redacting names and sensitive data balances transparency with security concerns." }
    ],
  },
    {
    id: "rvd-003",
    title: "Community Festival Permit",
    description: "A local religious group wants to hold a large public festival in the city's main park, which will require road closures.",
    tokens: [
        { id: "right_assembly", label: "Freedom of Assembly", meter: { freedom: 15, order: -5 }, explanation: "Citizens have the right to assemble peacefully, which includes cultural and religious celebrations." },
        { id: "duty_public_access", label: "Ensure Public Access", meter: { freedom: -10, order: 15 }, explanation: "The city must ensure that public spaces and services remain accessible to all citizens, minimizing disruption from private events." },
    ],
    randomEvents: [
        { chance: 0.2, effect: { freedom: 0, order: -10 }, desc: "Counter-protesters arrive, creating friction and requiring a larger police presence." }
    ],
  }
];

// --- UI COMPONENTS ---

const BalanceMeter = ({ freedom, order }: { freedom: number; order: number }) => {
  const freedomPercentage = Math.max(0, Math.min(100, freedom));
  const orderPercentage = Math.max(0, Math.min(100, order));

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-center text-xl font-bold text-white mb-4">Societal Equilibrium</h2>
      <div className="flex justify-between items-center space-x-4">
        {/* Freedom Gauge */}
        <div className="flex-1 text-center">
          <span className="text-lg font-semibold text-blue-300">Freedom</span>
          <div className="w-full bg-gray-700 rounded-full h-8 mt-2 overflow-hidden border-2 border-blue-400">
            <div
              className="bg-blue-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${freedomPercentage}%` }}
            ></div>
          </div>
           <p className="text-white text-2xl font-bold mt-1">{freedomPercentage.toFixed(0)}</p>
        </div>
        
        {/* Balance Icon */}
        <div className="text-4xl text-gray-400">
            ⚖️
        </div>

        {/* Order Gauge */}
        <div className="flex-1 text-center">
          <span className="text-lg font-semibold text-green-300">Order</span>
          <div className="w-full bg-gray-700 rounded-full h-8 mt-2 overflow-hidden border-2 border-green-400">
            <div
              className="bg-green-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${orderPercentage}%` }}
            ></div>
          </div>
          <p className="text-white text-2xl font-bold mt-1">{orderPercentage.toFixed(0)}</p>
        </div>
      </div>
    </div>
  );
};

const ScenarioDisplay = ({ scenario }: { scenario: IScenario }) => (
  <div className="w-full max-w-2xl mx-auto p-6 bg-gray-800 rounded-xl shadow-lg text-center my-6">
    <h3 className="text-2xl font-bold text-yellow-300">{scenario.title}</h3>
    <p className="text-gray-300 mt-2">{scenario.description}</p>
  </div>
);

const Token = ({ token }: { token: IToken }) => {
  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("application/json", JSON.stringify(token));
  };
  
  return (
    <div 
        draggable
        onDragStart={onDragStart}
        className="cursor-grab p-4 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition-all text-center font-semibold border-2 border-indigo-300"
    >
      {token.label}
    </div>
  );
};

const TokenTray = ({ tokens }: { tokens: IToken[] }) => (
  <div className="w-full max-w-2xl mx-auto p-4 bg-gray-900 rounded-xl mt-6">
     <h3 className="text-center text-lg font-semibold text-gray-300 mb-4">Choose a Token to Play</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {tokens.map(token => <Token key={token.id} token={token} />)}
    </div>
  </div>
);

const Scale = ({ onDrop }: { onDrop: (token: IToken) => void }) => {
  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const tokenData = e.dataTransfer.getData("application/json");
    if (tokenData) {
      const token: IToken = JSON.parse(tokenData);
      onDrop(token);
    }
  };

  return (
    <div 
        onDragOver={onDragOver}
        onDrop={handleDrop}
        className="w-full max-w-xs mx-auto my-6 p-8 border-4 border-dashed border-gray-600 rounded-2xl bg-gray-800 text-center transition-colors duration-300 hover:border-yellow-400 hover:bg-gray-700"
    >
      <p className="text-gray-400 font-semibold">Drag and Drop Token Here</p>
    </div>
  );
};

const DebriefModal = ({
    result,
    onNext
}: {
    result: { token: IToken; randomEvent?: IRandomEvent; finalFreedom: number; finalOrder: number };
    onNext: () => void
}) => {
    const freedomChange = result.token.meter.freedom + (result.randomEvent?.effect.freedom || 0);
    const orderChange = result.token.meter.order + (result.randomEvent?.effect.order || 0);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-lg w-full border-2 border-yellow-400 animate-fade-in">
                <h2 className="text-3xl font-bold text-center text-yellow-300 mb-4">Decision Impact</h2>
                
                <p className="text-gray-300 text-lg mb-4">You chose to prioritize: <span className="font-bold text-white">{result.token.label}</span>.</p>
                
                <div className="bg-gray-900 p-4 rounded-lg mb-4">
                  <p className="text-gray-400">{result.token.explanation}</p>
                </div>

                {result.randomEvent && (
                    <div className="bg-red-900 p-4 rounded-lg mb-4 border border-red-500">
                        <h4 className="font-bold text-red-300">Random Event!</h4>
                        <p className="text-red-200">{result.randomEvent.desc}</p>
                    </div>
                )}
                
                <div className="text-center my-6">
                    <p className={`text-xl font-semibold ${freedomChange > 0 ? 'text-blue-400' : 'text-red-400'}`}>
                        Freedom Change: {freedomChange > 0 ? '+' : ''}{freedomChange}
                    </p>
                    <p className={`text-xl font-semibold ${orderChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        Order Change: {orderChange > 0 ? '+' : ''}{orderChange}
                    </p>
                </div>

                <div className="flex justify-center">
                  <button onClick={onNext} className="mt-4 px-8 py-3 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-400 transition-all text-lg shadow-lg">
                      Next Scenario
                  </button>
                </div>
            </div>
        </div>
    );
}

// --- MAIN APP COMPONENT ---

export default function Right() {
  const [gameState, setGameState] = useState<'playing' | 'debrief' | 'end'>('playing');
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  
  const [freedom, setFreedom] = useState(50);
  const [order, setOrder] = useState(50);

  const [debriefResult, setDebriefResult] = useState<{token: IToken, randomEvent?: IRandomEvent, finalFreedom: number, finalOrder: number} | null>(null);

  const currentScenario = scenarios[currentScenarioIndex];

  useEffect(() => {
    // Add a simple fade-in animation on component mount
    const mainElement = document.getElementById('game-container');
    if (mainElement) {
        mainElement.classList.add('animate-fade-in');
    }
  }, []);

  const handleTokenDrop = (token: IToken) => {
    let finalFreedom = freedom + token.meter.freedom;
    let finalOrder = order + token.meter.order;
    let triggeredEvent: IRandomEvent | undefined = undefined;

    // Check for random events
    if (currentScenario.randomEvents) {
        for (const event of currentScenario.randomEvents) {
            if (Math.random() < event.chance) {
                triggeredEvent = event;
                finalFreedom += event.effect.freedom;
                finalOrder += event.effect.order;
                break; // Only trigger one event
            }
        }
    }
    
    // Clamp values between 0 and 100
    finalFreedom = Math.max(0, Math.min(100, finalFreedom));
    finalOrder = Math.max(0, Math.min(100, finalOrder));

    setFreedom(finalFreedom);
    setOrder(finalOrder);
    setDebriefResult({ token, randomEvent: triggeredEvent, finalFreedom, finalOrder });
    setGameState('debrief');
  };

  const handleNextScenario = () => {
    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      setDebriefResult(null);
      setGameState('playing');
    } else {
      setGameState('end');
    }
  };
  
  const restartGame = () => {
      setFreedom(50);
      setOrder(50);
      setCurrentScenarioIndex(0);
      setDebriefResult(null);
      setGameState('playing');
  }

  return (
    <div id="game-container" className="bg-gray-900 min-h-screen text-white font-sans p-4 md:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400">Rights vs. Duties</h1>
        <p className="text-lg text-gray-400">A Game of Societal Balance</p>
      </header>
      
      <main>
        {gameState === 'playing' && (
            <>
              <BalanceMeter freedom={freedom} order={order} />
              <ScenarioDisplay scenario={currentScenario} />
              <Scale onDrop={handleTokenDrop} />
              <TokenTray tokens={currentScenario.tokens} />
            </>
        )}
        
        {gameState === 'debrief' && debriefResult && (
            <DebriefModal result={debriefResult} onNext={handleNextScenario} />
        )}

        {gameState === 'end' && (
             <div className="text-center max-w-2xl mx-auto p-8 bg-gray-800 rounded-2xl animate-fade-in">
                <h2 className="text-4xl font-bold text-yellow-300">Game Over!</h2>
                <p className="text-xl mt-4 text-gray-300">You have completed all scenarios.</p>
                <div className="mt-8">
                    <h3 className="text-2xl font-semibold">Final Equilibrium:</h3>
                    <BalanceMeter freedom={freedom} order={order} />
                </div>
                 <button onClick={restartGame} className="mt-8 px-8 py-3 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-400 transition-all text-lg shadow-lg">
                      Play Again
                  </button>
             </div>
        )}
      </main>
      <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.7s ease-out forwards;
        }
      `}</style>
    </div>
  );
}