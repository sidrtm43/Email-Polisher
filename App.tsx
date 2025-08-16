
import React, { useState } from 'react';
import type { Tone } from './types';
import { TONES } from './constants';
import { generateEmail } from './services/geminiService';
import EmailInputForm from './components/EmailInputForm';
import GeneratedEmailDisplay from './components/GeneratedEmailDisplay';
import Header from './components/Header';

const App: React.FC = () => {
  const [rawContent, setRawContent] = useState<string>('');
  const [replyToEmail, setReplyToEmail] = useState<string>('');
  const [selectedTone, setSelectedTone] = useState<Tone>(TONES[0]);
  const [generatedEmail, setGeneratedEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!rawContent.trim()) {
      setError("Please enter your thoughts before generating an email.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedEmail('');
    try {
      const result = await generateEmail({
        rawContent,
        tone: selectedTone.name,
        replyToEmail,
      });
      setGeneratedEmail(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-violet-50 text-slate-800">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#e9d5ff,transparent)]"></div>
      </div>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
          <EmailInputForm
            rawContent={rawContent}
            setRawContent={setRawContent}
            replyToEmail={replyToEmail}
            setReplyToEmail={setReplyToEmail}
            selectedTone={selectedTone}
            setSelectedTone={setSelectedTone}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
          <GeneratedEmailDisplay
            generatedEmail={generatedEmail}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
