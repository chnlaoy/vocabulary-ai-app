import { Sparkles } from 'lucide-react';
import type { WordCard } from '../data/words';

interface WordListProps {
  cards: WordCard[];
  onSelectWord: (wordId: string) => void;
  activeWordId?: string;
}

export function WordList({ cards, onSelectWord, activeWordId }: WordListProps) {
  return (
    <div className="space-y-2">
      {cards.map((card) => {
        const isActive = card.id === activeWordId;
        return (
          <button
            key={card.id}
            onClick={() => onSelectWord(card.id)}
            className={`
              w-full text-left p-3 rounded-xl border-2 transition-all
              ${isActive
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-100 bg-white hover:border-indigo-200 hover:bg-gray-50'
              }
            `}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className={`font-medium truncate ${isActive ? 'text-indigo-900' : 'text-gray-900'}`}>
                  {card.word}
                </div>
                <div className="text-sm text-gray-500 truncate">{card.definition}</div>
              </div>
              {isActive && (
                <div className="flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
