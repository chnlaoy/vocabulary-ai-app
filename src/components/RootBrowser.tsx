import { useState } from 'react';
import { rootDatabase } from '../data/words';

interface RootBrowserProps {
  onSelectRoot: (root: string) => void;
}

export function RootBrowser({ onSelectRoot }: RootBrowserProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (root: string) => {
    setSelected(root);
    onSelectRoot(root);
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4">
      <h3 className="text-sm font-semibold text-slate-600 mb-3 flex items-center gap-2">
        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
        词根词缀导航
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {rootDatabase.map((entry) => (
          <button
            key={entry.root}
            onClick={() => handleClick(entry.root)}
            className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
              selected === entry.root
                ? 'bg-indigo-50 border-indigo-300 text-indigo-800'
                : 'bg-slate-50 border-slate-200 hover:bg-indigo-50 hover:border-indigo-200'
            }`}
          >
            <div className="font-mono font-bold text-sm">{entry.root}</div>
            <div className="text-xs text-slate-500 mt-0.5 truncate">{entry.meaning}</div>
            <div className="text-xs text-slate-400 mt-0.5">{entry.origin}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
