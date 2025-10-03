import React, { DragEvent } from 'react';
import { IToken } from '../../../types';
import { Sparkles } from 'lucide-react';

interface TokenTrayProps {
  tokens: IToken[];
}

export const TokenTray: React.FC<TokenTrayProps> = ({ tokens }) => {
  const Token = ({ token }: { token: IToken }) => {
    const onDragStart = (e: DragEvent<HTMLDivElement>) => {
      e.dataTransfer.setData('application/json', JSON.stringify(token));
    };

    return (
      <div
        draggable
        onDragStart={onDragStart}
        className="cursor-grab active:cursor-grabbing p-4 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl shadow-lg hover:shadow-orange-500/50 hover:scale-105 transition-all text-center font-semibold border-2 border-orange-400 group"
      >
        <Sparkles className="w-5 h-5 mx-auto mb-2 group-hover:animate-spin" />
        {token.label}
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-slate-900/50 rounded-2xl mt-6 border border-slate-700">
      <h3 className="text-center text-lg font-semibold text-slate-300 mb-4 flex items-center justify-center gap-2">
        <Sparkles className="w-5 h-5 text-orange-400" />
        Choose Your Decision Token
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tokens.map((token) => (
          <Token key={token.id} token={token} />
        ))}
      </div>
      <p className="text-center text-xs text-slate-500 mt-4">Drag and drop a token to make your decision</p>
    </div>
  );
};