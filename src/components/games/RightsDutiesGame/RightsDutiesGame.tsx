import React, { useState } from 'react';
import { Scale } from 'lucide-react';
import { SCENARIOS } from '../../../data/gamesData';
import { IToken, IRandomEvent } from '../../../types';
import { BalanceMeter } from './BalanceMeter';
import { ScenarioDisplay } from './ScenarioDisplay';
import { TokenTray } from './TokenTray';
// import { DropScale } from './DropScale';
import { Modal } from '../../common/Modal';
import { Button } from '../../common/Button';

export const RightsDutiesGame: React.FC = () => {
  const [gameState, setGameState] = useState<'playing' | 'debrief' | 'end'>('playing');
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [freedom, setFreedom] = useState(50);
  const [order, setOrder] = useState(50);
  const [debriefResult, setDebriefResult] = useState<{
    token: IToken;
    randomEvent?: IRandomEvent;
    finalFreedom: number;
    finalOrder: number;
  } | null>(null);

  const currentScenario = SCENARIOS[currentScenarioIndex];

  const handleTokenDrop = (token: IToken) => {
    let finalFreedom = freedom + token.meter.freedom;
    let finalOrder = order + token.meter.order;
    let triggeredEvent: IRandomEvent | undefined;

    if (currentScenario.randomEvents) {
      for (const event of currentScenario.randomEvents) {
        if (Math.random() < event.chance) {
          triggeredEvent = event;
          finalFreedom += event.effect.freedom;
          finalOrder += event.effect.order;
          break;
        }
      }
    }

    finalFreedom = Math.max(0, Math.min(100, finalFreedom));
    finalOrder = Math.max(0, Math.min(100, finalOrder));

    setFreedom(finalFreedom);
    setOrder(finalOrder);
    setDebriefResult({ token, randomEvent: triggeredEvent, finalFreedom, finalOrder });
    setGameState('debrief');
  };

  const handleNextScenario = () => {
    if (currentScenarioIndex < SCENARIOS.length - 1) {
      setCurrentScenarioIndex((prev) => prev + 1);
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
  };

  const getFinalMessage = () => {
    if (freedom > 70 && order < 30) return {
      title: 'Chaos Reigns!',
      message: 'Too much freedom without order led to instability.',
      emoji: '⚠️'
    };
    if (order > 70 && freedom < 30) return {
      title: 'Authoritarian State!',
      message: 'Too much order suppressed fundamental freedoms.',
      emoji: '🔒'
    };
    if (Math.abs(freedom - order) < 15) return {
      title: 'Perfect Balance!',
      message: 'You maintained an excellent equilibrium between rights and duties.',
      emoji: '⚖️'
    };
    return {
      title: 'Good Effort!',
      message: 'You navigated the scenarios with reasonable balance.',
      emoji: '👏'
    };
  };

  return (
    <div className="w-full max-w-4xl animate-fade-in">
      <header className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl mb-6">
          <Scale className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Rights vs. <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Duties</span>
        </h1>
        <p className="text-lg text-slate-400">Navigate complex scenarios and balance freedom with order</p>
      </header>

      <main>
        {(gameState === 'playing' || gameState === 'debrief') && (
          <>
            <BalanceMeter freedom={freedom} order={order} />
            <ScenarioDisplay 
              scenario={currentScenario} 
              currentIndex={currentScenarioIndex} 
              totalScenarios={SCENARIOS.length}
            />
            {/* <DropScale onDrop={handleTokenDrop} /> */}
            <TokenTray tokens={currentScenario.tokens} />
          </>
        )}

        {gameState === 'debrief' && debriefResult && (
          <Modal isOpen={true} onClose={() => {}} size="lg">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-orange-400 mb-4">Decision Impact</h2>
              <p className="text-slate-300 text-lg mb-4">
                You chose: <span className="font-bold text-white">{debriefResult.token.label}</span>
              </p>
              <div className="bg-slate-900/50 p-4 rounded-lg mb-4 border border-slate-700">
                <p className="text-slate-400">{debriefResult.token.explanation}</p>
              </div>
              {debriefResult.randomEvent && (
                <div className="bg-red-900/50 p-4 rounded-lg mb-4 border border-red-500/50">
                  <h4 className="font-bold text-red-300 mb-2">⚡ Random Event!</h4>
                  <p className="text-red-200">{debriefResult.randomEvent.desc}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4 my-6">
                <div className="bg-slate-700 p-4 rounded-xl">
                  <p className="text-slate-400 text-sm mb-1">Freedom Change</p>
                  <p className={`text-2xl font-bold ${
                    (debriefResult.token.meter.freedom + (debriefResult.randomEvent?.effect.freedom || 0)) >= 0 
                      ? 'text-sky-400' 
                      : 'text-red-400'
                  }`}>
                    {(debriefResult.token.meter.freedom + (debriefResult.randomEvent?.effect.freedom || 0)) >= 0 ? '+' : ''}
                    {debriefResult.token.meter.freedom + (debriefResult.randomEvent?.effect.freedom || 0)}
                  </p>
                </div>
                <div className="bg-slate-700 p-4 rounded-xl">
                  <p className="text-slate-400 text-sm mb-1">Order Change</p>
                  <p className={`text-2xl font-bold ${
                    (debriefResult.token.meter.order + (debriefResult.randomEvent?.effect.order || 0)) >= 0 
                      ? 'text-teal-400' 
                      : 'text-red-400'
                  }`}>
                    {(debriefResult.token.meter.order + (debriefResult.randomEvent?.effect.order || 0)) >= 0 ? '+' : ''}
                    {debriefResult.token.meter.order + (debriefResult.randomEvent?.effect.order || 0)}
                  </p>
                </div>
              </div>
              <Button onClick={handleNextScenario} variant="primary" size="lg">
                {currentScenarioIndex < SCENARIOS.length - 1 ? 'Next Scenario' : 'See Results'}
              </Button>
            </div>
          </Modal>
        )}

        {gameState === 'end' && (
          <div className="text-center max-w-2xl mx-auto p-8 bg-slate-800/80 rounded-2xl animate-fade-in border border-slate-700">
            <div className="text-6xl mb-4">{getFinalMessage().emoji}</div>
            <h2 className="text-4xl font-bold text-white mb-2">{getFinalMessage().title}</h2>
            <p className="text-xl mt-4 text-slate-300 mb-8">{getFinalMessage().message}</p>
            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4 text-white">Final Equilibrium</h3>
              <BalanceMeter freedom={freedom} order={order} />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-slate-700 p-6 rounded-xl">
                <p className="text-slate-400 text-sm mb-2">Freedom</p>
                <p className="text-4xl font-bold text-sky-400">{freedom}</p>
              </div>
              <div className="bg-slate-700 p-6 rounded-xl">
                <p className="text-slate-400 text-sm mb-2">Order</p>
                <p className="text-4xl font-bold text-teal-400">{order}</p>
              </div>
            </div>
            <Button onClick={restartGame} variant="primary" size="lg" className="mt-8">
              Play Again
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};