import React from 'react';

const MeditationVisual: React.FC = () => {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <div className="absolute w-48 h-48 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute w-48 h-48 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 top-0 right-4"></div>
      <div className="absolute w-48 h-48 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 bottom-0 left-8"></div>
      <div className="z-10 text-sage-800 font-serif italic text-xl">Peace</div>
    </div>
  );
};

export default MeditationVisual;