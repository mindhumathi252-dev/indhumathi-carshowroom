import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Gauge, Zap, Volume2, VolumeX, Flame } from 'lucide-react';
import { engineSound } from '../utils/engineSound';

interface EngineRevTesterProps {
  initialType?: 'v8' | 'v12' | 'ev' | 'turbo';
}

export const EngineRevTester: React.FC<EngineRevTesterProps> = ({ initialType = 'v12' }) => {
  const [engineType, setEngineType] = useState<'v8' | 'v12' | 'ev' | 'turbo'>(initialType);
  const [isRunning, setIsRunning] = useState(false);
  const [rpm, setRpm] = useState(0);
  const [isThrottling, setIsThrottling] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Subscribe to real RPM updates from audio engine
  useEffect(() => {
    const unsubscribe = engineSound.subscribeRPM((currentRpm) => {
      setRpm(currentRpm);
    });
    return () => {
      unsubscribe();
      engineSound.stop();
    };
  }, []);

  const handleToggleEngine = () => {
    if (isRunning) {
      engineSound.stop();
      setIsRunning(false);
      setIsThrottling(false);
    } else {
      engineSound.start(engineType);
      setIsRunning(true);
    }
  };

  const handleSwitchType = (type: 'v8' | 'v12' | 'ev' | 'turbo') => {
    setEngineType(type);
    if (isRunning) {
      engineSound.start(type);
    }
  };

  const handleThrottleStart = () => {
    if (!isRunning) {
      engineSound.start(engineType);
      setIsRunning(true);
    }
    setIsThrottling(true);
    engineSound.setThrottle(true);
  };

  const handleThrottleEnd = () => {
    setIsThrottling(false);
    engineSound.setThrottle(false);
  };

  const maxRpm = engineType === 'ev' ? 18000 : engineType === 'v12' ? 9000 : 8000;
  const rpmPercent = Math.min(100, Math.max(0, (rpm / maxRpm) * 100));

  // Dynamic exhaust flames / pulses on high rev
  const isRedlining = rpmPercent > 78;

  return (
    <section id="simulator" className="py-20 bg-[#0C0D12] border-y border-white/[0.08] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
            Acoustic Test Bench
          </div>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Showroom Engine Rev Simulator
          </h2>
          <p className="text-sm text-slate-400 mt-2 font-light">
            Synthesized live in your browser using Web Audio physics. Select a powertrain architecture, initiate ignition, and hold the throttle to experience the acoustic signature.
          </p>
        </div>

        {/* Console Box */}
        <div className="bg-[#12141C] border border-white/[0.1] rounded-xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          {/* Powertrain Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
            {[
              { id: 'v12', label: '6.5L V12 Maranello', note: '8,900 RPM Italian High-Pitch' },
              { id: 'v8', label: '4.4L Twin-Turbo V8', note: 'Low-End Basso Rumbling' },
              { id: 'ev', label: 'Quad-Motor EV', note: 'Hypersonic Electromagnetic Hum' },
              { id: 'turbo', label: '4.0L Flat-6 Classic', note: 'Mechanical Air-Cooled Rasp' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleSwitchType(item.id as typeof engineType)}
                className={`p-3 text-left rounded-lg transition-all border ${
                  engineType === item.id
                    ? 'bg-amber-400/15 border-amber-400/60 text-white'
                    : 'bg-[#181A24] border-white/[0.06] text-slate-400 hover:text-slate-200 hover:bg-[#1F2230]'
                }`}
              >
                <div className="text-xs font-bold text-white font-mono">{item.label}</div>
                <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">{item.note}</div>
              </button>
            ))}
          </div>

          {/* Tachometer Display */}
          <div className="flex flex-col items-center justify-center py-6">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
              {/* Circular Gauge Border */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="transparent"
                  stroke="#202432"
                  strokeWidth="6"
                  strokeDasharray="198 66"
                />
                {/* Active RPM Arc */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="transparent"
                  stroke={isRedlining ? '#EF4444' : '#F59E0B'}
                  strokeWidth="6"
                  strokeDasharray={`${(rpmPercent * 198) / 100} 300`}
                  strokeLinecap="round"
                  className="transition-all duration-75"
                />
              </svg>

              {/* Gauge Face / Center readouts */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <div className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-1">
                  Engine Speed
                </div>
                <div className="text-4xl sm:text-5xl font-black font-mono tabular-nums text-white tracking-tight">
                  {isRunning ? rpm.toLocaleString() : '0000'}
                </div>
                <div className="text-xs font-mono text-amber-400 mt-1">
                  {engineType === 'ev' ? 'MOTOR RPM' : 'CRANK RPM'}
                </div>

                {isRedlining && (
                  <div className="mt-2 text-[10px] uppercase font-mono tracking-widest text-red-400 animate-pulse font-bold flex items-center gap-1">
                    <Flame className="w-3 h-3 text-red-500" />
                    <span>REDLINE REACHED</span>
                  </div>
                )}
              </div>
            </div>

            {/* Linear RPM Bar */}
            <div className="w-full max-w-md mt-4">
              <div className="flex justify-between text-[11px] font-mono text-slate-500 mb-1">
                <span>IDLE</span>
                <span className="text-amber-400/80">OPTIMAL</span>
                <span className="text-red-400">REDLINE ({maxRpm.toLocaleString()})</span>
              </div>
              <div className="w-full h-2 bg-[#202432] rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-75 ${
                    isRedlining ? 'bg-red-500' : 'bg-gradient-to-r from-amber-500 to-amber-300'
                  }`}
                  style={{ width: `${rpmPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Interactive Controls */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleToggleEngine}
              className={`flex items-center gap-2.5 px-6 py-3.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                isRunning
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
              }`}
            >
              {isRunning ? (
                <>
                  <Square className="w-4 h-4 fill-current" />
                  <span>Cut Ignition / Off</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Ignition</span>
                </>
              )}
            </button>

            {/* Throttle Accelerator Button */}
            <button
              onMouseDown={handleThrottleStart}
              onMouseUp={handleThrottleEnd}
              onMouseLeave={handleThrottleEnd}
              onTouchStart={handleThrottleStart}
              onTouchEnd={handleThrottleEnd}
              disabled={!isRunning}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-3 px-8 py-3.5 text-sm font-bold rounded-md transition-all select-none shadow-lg whitespace-nowrap ${
                !isRunning
                  ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500'
                  : isThrottling
                  ? 'bg-amber-500 text-black scale-[0.98] shadow-amber-500/40'
                  : 'bg-amber-400 hover:bg-amber-300 text-black shadow-amber-400/20 active:scale-[0.98]'
              }`}
            >
              <Zap className={`w-4 h-4 ${isThrottling ? 'animate-bounce' : ''}`} />
              <span>{isThrottling ? 'THROTTLE WIDE OPEN!' : 'PRESS & HOLD THROTTLE TO REV'}</span>
            </button>
          </div>

          <div className="text-center text-[11px] text-slate-500 mt-4">
            Tip: Press and hold the throttle button or hold on mobile screen to hear the high-RPM frequency sweep.
          </div>
        </div>
      </div>
    </section>
  );
};
