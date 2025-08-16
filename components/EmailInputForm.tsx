
import React, { useState } from 'react';
import type { Tone } from '../types';
import { TONES } from '../constants';
import ToneSelector from './ToneSelector';
import { SparklesIcon } from './icons/SparklesIcon';

interface EmailInputFormProps {
  rawContent: string;
  setRawContent: (value: string) => void;
  replyToEmail: string;
  setReplyToEmail: (value: string) => void;
  selectedTone: Tone;
  setSelectedTone: (tone: Tone) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const EmailInputForm: React.FC<EmailInputFormProps> = ({
  rawContent,
  setRawContent,
  replyToEmail,
  setReplyToEmail,
  selectedTone,
  setSelectedTone,
  onGenerate,
  isLoading,
}) => {
  const [showReply, setShowReply] = useState(false);

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-violet-100 rounded-2xl shadow-lg p-6 md:p-8 space-y-6 h-fit">
      <div>
        <label htmlFor="rawContent" className="block text-sm font-semibold text-slate-700 mb-2">
          Your thoughts
        </label>
        <textarea
          id="rawContent"
          value={rawContent}
          onChange={(e) => setRawContent(e.target.value)}
          placeholder="e.g., ask marketing for the latest campaign numbers for the Q3 report"
          className="w-full h-36 p-3 bg-violet-50 border border-violet-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-200 resize-none"
          rows={5}
        />
      </div>

      <div>
        {!showReply ? (
          <button
            onClick={() => setShowReply(true)}
            className="text-sm font-medium text-violet-600 hover:text-violet-800 transition-colors"
          >
            + Add email you're replying to (optional)
          </button>
        ) : (
          <div>
            <label htmlFor="replyToEmail" className="block text-sm font-semibold text-slate-700 mb-2">
              Email you're replying to
            </label>
            <textarea
              id="replyToEmail"
              value={replyToEmail}
              onChange={(e) => setReplyToEmail(e.target.value)}
              placeholder="Paste the email content here..."
              className="w-full h-28 p-3 bg-violet-50 border border-violet-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-200 resize-none"
              rows={3}
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Choose a tone
        </label>
        <ToneSelector
          tones={TONES}
          selectedTone={selectedTone}
          onSelectTone={setSelectedTone}
        />
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-violet-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-violet-700 disabled:bg-violet-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:scale-100"
      >
        <SparklesIcon className="w-5 h-5" />
        {isLoading ? 'Generating...' : 'Polish Email'}
      </button>
    </div>
  );
};

export default EmailInputForm;
