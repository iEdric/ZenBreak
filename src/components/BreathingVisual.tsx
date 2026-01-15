import React, { useEffect, useState } from 'react';

const BreathingVisual: React.FC = () => {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in');
  const [instruction, setInstruction] = useState('吸气 (Inhale)');

  useEffect(() => {
    // 4-4-4 Breathing Cycle
    const cycle = async () => {
      setPhase('in');
      setInstruction('吸气 (Inhale)');
      await new Promise(r => setTimeout(r, 4000));

      setPhase('hold');
      setInstruction('保持 (Hold)');
      await new Promise(r => setTimeout(r, 4000));

      setPhase('out');
      setInstruction('呼气 (Exhale)');
      await new Promise(r => setTimeout(r, 4000));
    };

    cycle(); // Initial run
    const interval = setInterval(cycle, 12000); // 4+4+4 = 12s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-64 w-64 relative">
      <div className={`
        absolute rounded-full bg-sage-300 opacity-50 mix-blend-multiply filter blur-xl
        transition-all duration-[4000ms] ease-in-out
        ${phase === 'in' ? 'w-64 h-64' : phase === 'hold' ? 'w-64 h-64' : 'w-32 h-32'}
      `}></div>
      <div className={`
        absolute rounded-full bg-sage-400 opacity-60
        transition-all duration-[4000ms] ease-in-out flex items-center justify-center shadow-lg
        ${phase === 'in' ? 'w-56 h-56' : phase === 'hold' ? 'w-56 h-56' : 'w-24 h-24'}
      `}>
         <span className="text-white font-medium text-lg tracking-widest">{instruction}</span>
      </div>
    </div>
  );
};

export default BreathingVisual;