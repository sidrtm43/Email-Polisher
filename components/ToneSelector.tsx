
import React from 'react';
import type { Tone } from '../types';

interface ToneSelectorProps {
  tones: Tone[];
  selectedTone: Tone;
  onSelectTone: (tone: Tone) => void;
}

const ToneSelector: React.FC<ToneSelectorProps> = ({ tones, selectedTone, onSelectTone }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tones.map((tone) => (
        <button
          key={tone.id}
          onClick={() => onSelectTone(tone)}
          className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 border ${
            selectedTone.id === tone.id
              ? 'bg-violet-600 text-white border-violet-600 shadow-md'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-violet-100 hover:border-violet-300'
          }`}
        >
          {tone.emoji} {tone.name}
        </button>
      ))}
    </div>
  );
};

export default ToneSelector;
