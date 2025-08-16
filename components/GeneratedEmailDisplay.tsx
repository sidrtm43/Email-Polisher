
import React, { useState, useEffect } from 'react';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { CheckIcon } from './icons/CheckIcon';
import Loader from './Loader';

interface GeneratedEmailDisplayProps {
  generatedEmail: string;
  isLoading: boolean;
  error: string | null;
}

const GeneratedEmailDisplay: React.FC<GeneratedEmailDisplayProps> = ({
  generatedEmail,
  isLoading,
  error,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (generatedEmail) {
      setIsCopied(false);
    }
  }, [generatedEmail]);

  const handleCopy = () => {
    if (generatedEmail) {
      navigator.clipboard.writeText(generatedEmail);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <Loader />
          <p className="text-slate-500 mt-4">Crafting your email...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-full text-center">
          <p className="text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>
        </div>
      );
    }
    
    if (generatedEmail) {
      return (
        <div className="whitespace-pre-wrap p-4 bg-violet-50 rounded-lg text-slate-800 text-sm md:text-base leading-relaxed">
          {generatedEmail}
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center h-full text-center">
        <p className="text-slate-500">Your polished email will appear here ✨</p>
      </div>
    );
  };

  return (
    <div className="relative mt-8 lg:mt-0 bg-white/70 backdrop-blur-xl border border-violet-100 rounded-2xl shadow-lg p-6 md:p-8 min-h-[30rem] lg:min-h-0 flex flex-col">
      {generatedEmail && !isLoading && (
        <button
          onClick={handleCopy}
          className="absolute top-4 right-4 p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Copy to clipboard"
        >
          {isCopied ? (
            <CheckIcon className="w-5 h-5 text-green-500" />
          ) : (
            <ClipboardIcon className="w-5 h-5 text-slate-500" />
          )}
        </button>
      )}
      <div className="flex-grow flex flex-col justify-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default GeneratedEmailDisplay;
