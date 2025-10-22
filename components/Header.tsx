
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
        AI Mockup & Image Studio
      </h1>
      <p className="mt-3 max-w-md mx-auto text-base text-indigo-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        Bring your creative ideas to life with the power of Gemini.
      </p>
    </header>
  );
};

export default Header;
