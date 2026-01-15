
import React, { useState, useEffect, useCallback } from 'react';
import { Wind, Eye, Brain, Play, RotateCcw, Home, Clock } from 'lucide-react';
import { AppState, RelaxMode, SessionConfig, RelaxationAdvice } from './types';
import { getRelaxationContent } from './services/geminiService';
import BreathingVisual from './components/BreathingVisual';
import EyeVisual from './components/EyeVisual';
import MeditationVisual from './components/MeditationVisual';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.HOME);
  const [config, setConfig] = useState<SessionConfig>({
    durationMinutes: 3,
    mode: RelaxMode.BREATHING,
  });
  const [timeLeft, setTimeLeft] = useState(0);
  const [advice, setAdvice] = useState<RelaxationAdvice | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- Logic ---

  const startSession = useCallback(async () => {
    setIsLoading(true);
    setAppState(AppState.SESSION);
    setTimeLeft(config.durationMinutes * 60);

    // Fetch content (now static)
    try {
      const content = await getRelaxationContent(config.mode);
      setAdvice(content);
    } catch (e) {
      console.error("Failed to load advice", e);
    } finally {
      setIsLoading(false);
    }
  }, [config]);

  const resetApp = () => {
    setAppState(AppState.HOME);
    setAdvice(null);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (appState === AppState.SESSION && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setAppState(AppState.FINISHED);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [appState, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // --- Render Helpers ---

  const renderVisual = () => {
    switch (config.mode) {
      case RelaxMode.BREATHING: return <BreathingVisual />;
      case RelaxMode.EYES: return <EyeVisual />;
      case RelaxMode.MEDITATION: return <MeditationVisual />;
    }
  };

  const ModeCard = ({ mode, icon: Icon, label, description }: { mode: RelaxMode, icon: any, label: string, description: string }) => (
    <button
      onClick={() => setConfig({ ...config, mode })}
      className={`p-6 rounded-2xl border-2 text-left transition-all duration-300 w-full md:w-1/3 flex flex-col gap-4
        ${config.mode === mode
          ? 'border-sage-500 bg-white shadow-lg scale-105'
          : 'border-transparent bg-white/50 hover:bg-white hover:border-sage-300 hover:shadow'}`}
    >
      <div className={`p-3 rounded-full w-fit ${config.mode === mode ? 'bg-sage-100 text-sage-700' : 'bg-sand-200 text-sage-600'}`}>
        <Icon size={28} />
      </div>
      <div>
        <h3 className="text-xl font-bold text-sage-800">{label}</h3>
        <p className="text-sm text-sage-600 mt-1">{description}</p>
      </div>
    </button>
  );

  const DurationButton = ({ min }: { min: number }) => (
    <button
      onClick={() => setConfig({ ...config, durationMinutes: min })}
      className={`px-6 py-2 rounded-full font-medium transition-colors
        ${config.durationMinutes === min
          ? 'bg-sage-600 text-white shadow-md'
          : 'bg-sand-200 text-sage-700 hover:bg-sand-300'}`}
    >
      {min} 分钟
    </button>
  );

  // --- Views ---

  if (appState === AppState.HOME) {
    return (
      <div className="min-h-screen bg-sand-50 flex flex-col items-center justify-center p-6">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-sage-800 mb-4 tracking-tight">ZenBreak</h1>
          <p className="text-sage-600 text-lg">给大脑放个假，重拾专注力。</p>
        </header>

        <div className="w-full max-w-4xl space-y-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>

          {/* Mode Selection */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-sage-700 text-center uppercase tracking-wider text-sm">选择放松方式</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <ModeCard
                mode={RelaxMode.BREATHING}
                icon={Wind}
                label="深呼吸"
                description="通过节奏呼吸减轻压力，平复心情。"
              />
              <ModeCard
                mode={RelaxMode.EYES}
                icon={Eye}
                label="眼部放松"
                description="缓解屏幕造成的眼部疲劳。"
              />
              <ModeCard
                mode={RelaxMode.MEDITATION}
                icon={Brain}
                label="片刻冥想"
                description="清空杂念，快速充电。"
              />
            </div>
          </section>

          {/* Duration Selection */}
          <section className="space-y-4 text-center">
            <h2 className="text-lg font-semibold text-sage-700 uppercase tracking-wider text-sm">设置时长</h2>
            <div className="flex justify-center gap-3">
              <DurationButton min={1} />
              <DurationButton min={3} />
              <DurationButton min={5} />
            </div>
          </section>

          {/* Start Button */}
          <div className="flex justify-center pt-8">
            <button
              onClick={startSession}
              className="group flex items-center gap-3 bg-sage-700 hover:bg-sage-800 text-white px-10 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <Play size={24} className="fill-current" />
              开始放松
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (appState === AppState.SESSION) {
    return (
      <div className="min-h-screen bg-sage-50 flex flex-col items-center p-6 transition-colors duration-1000">
        <div className="w-full max-w-3xl flex justify-between items-center mb-8">
          <button onClick={resetApp} className="p-2 text-sage-500 hover:text-sage-700 transition-colors">
            <Home size={24} />
          </button>
          <div className="flex items-center gap-2 text-sage-600 font-mono text-xl bg-white/50 px-4 py-1 rounded-full">
            <Clock size={20} />
            {formatTime(timeLeft)}
          </div>
        </div>

        <main className="flex-1 w-full max-w-4xl flex flex-col items-center justify-center gap-12">

          {/* Main Visual */}
          <div className="relative">
            {renderVisual()}
          </div>

          {/* Static Content / Loading */}
          <div className="w-full max-w-2xl bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-sm text-center min-h-[200px] flex flex-col items-center justify-center transition-all duration-500">
            {isLoading ? (
              <div className="space-y-3 animate-pulse">
                <div className="h-4 bg-sage-200 rounded w-48 mx-auto"></div>
                <div className="h-3 bg-sage-100 rounded w-64 mx-auto"></div>
                <p className="text-sage-400 text-sm mt-4">正在为您准备放松引导...</p>
              </div>
            ) : advice ? (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-serif text-sage-800 mb-4">{advice.title}</h2>
                <p className="text-sage-700 leading-relaxed mb-6">{advice.content}</p>
                {advice.steps && advice.steps.length > 0 && (
                  <ul className="text-left bg-sage-50/50 p-6 rounded-xl space-y-3 inline-block mx-auto">
                    {advice.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sage-700">
                        <span className="bg-sage-200 text-sage-700 w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">{idx + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <p className="text-sage-500">Focus on the center...</p>
            )}
          </div>

        </main>
      </div>
    );
  }

  // AppState.FINISHED
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-100 to-sand-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full animate-fade-in">
        <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6 text-sage-600">
          <Wind size={40} />
        </div>
        <h2 className="text-3xl font-bold text-sage-800 mb-2">做得好!</h2>
        <p className="text-sage-600 mb-8">您刚刚完成了 {config.durationMinutes} 分钟的 {config.mode === RelaxMode.BREATHING ? '深呼吸' : config.mode === RelaxMode.EYES ? '眼部放松' : '冥想'}。</p>

        <p className="text-sm text-sage-500 mb-8 italic">"休息是为了走更长远的路。"</p>

        <div className="flex flex-col gap-3">
          <button
            onClick={resetApp}
            className="w-full bg-sage-700 hover:bg-sage-800 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Home size={20} />
            回到主页
          </button>
          <button
            onClick={startSession}
            className="w-full bg-sand-200 hover:bg-sand-300 text-sage-800 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw size={20} />
            再来一次
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
