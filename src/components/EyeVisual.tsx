import React, { useEffect, useState } from 'react';
import { Eye, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

const EyeVisual: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Change step every 3 seconds
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const renderIcon = () => {
    switch (step) {
      case 0: return <div className="flex flex-col items-center animate-bounce"><ArrowUp size={48} className="text-sage-600 mb-2" /><span className="text-sage-700">向上看 (Look Up)</span></div>;
      case 1: return <div className="flex flex-col items-center animate-bounce"><ArrowDown size={48} className="text-sage-600 mb-2" /><span className="text-sage-700">向下看 (Look Down)</span></div>;
      case 2: return <div className="flex flex-col items-center animate-pulse"><ArrowLeft size={48} className="text-sage-600 mb-2" /><span className="text-sage-700">向左看 (Look Left)</span></div>;
      case 3: return <div className="flex flex-col items-center animate-pulse"><ArrowRight size={48} className="text-sage-600 mb-2" /><span className="text-sage-700">向右看 (Look Right)</span></div>;
      case 4: return <div className="flex flex-col items-center"><Eye size={64} className="text-sage-600 mb-2 animate-pulse" /><span className="text-sage-700">闭眼放松 (Close Eyes)</span></div>;
      default: return null;
    }
  };

  return (
    <div className="flex items-center justify-center h-64 w-64 bg-sage-100 rounded-full shadow-inner border-4 border-sage-200">
      {renderIcon()}
    </div>
  );
};

export default EyeVisual;