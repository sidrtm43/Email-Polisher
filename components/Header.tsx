
import React from 'react';
import { MailIcon } from './icons/MailIcon';

const Header: React.FC = () => {
  return (
    <header className="py-8">
      <div className="container mx-auto flex flex-col items-center justify-center text-center px-4">
        <div className="flex items-center gap-3 mb-2">
            <MailIcon className="h-10 w-10 text-violet-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                Email Polisher AI
            </h1>
        </div>
        <p className="text-lg text-slate-600 max-w-2xl">
            Transform your brief thoughts into perfectly crafted emails. Just write, choose a tone, and let AI handle the rest.
        </p>
      </div>
    </header>
  );
};

export default Header;
