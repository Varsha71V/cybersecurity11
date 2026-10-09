import React, { useEffect } from 'react';
import { 
  Home, 
  User, 
  LayoutDashboard, 
  Share2, 
  Eye, 
  Drama, 
  FileText, 
  BrainCircuit, 
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { usePrivacy } from '../../context/PrivacyContext';

export const SCREENS_FLOW = [
  { id: 'landing', label: 'Welcome', icon: Home, short: '1. Welcome' },
  { id: 'profile', label: 'Profile', icon: User, short: '2. Profile' },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, short: '3. Dashboard' },
  { id: 'dots', label: 'Connect Dots', icon: Share2, short: '4. Dots' },
  { id: 'attacker', label: 'Attacker View', icon: Eye, short: '5. Attacker' },
  { id: 'simulation', label: 'Simulation', icon: Drama, short: '6. Simulation' },
  { id: 'breakdown', label: 'Breakdown', icon: FileText, short: '7. Breakdown' },
  { id: 'coach', label: 'Privacy Coach', icon: BrainCircuit, short: '8. Coach' },
  { id: 'beforeAfter', label: 'Before vs After', icon: Sparkles, short: '9. Results' },
];

export default function Navigation() {
  const { activeScreen, navigateTo } = usePrivacy();

  const currentIndex = SCREENS_FLOW.findIndex((s) => s.id === activeScreen);

  const handlePrev = () => {
    if (currentIndex > 0) {
      navigateTo(SCREENS_FLOW[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < SCREENS_FLOW.length - 1) {
      navigateTo(SCREENS_FLOW[currentIndex + 1].id);
    }
  };

  // Keyboard navigation for competition presentations (Left/Right arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return;
      }
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  return (
    <>
      {/* Top Enterprise Tab Bar */}
      <nav aria-label="Primary sections" className="w-full bg-[#080d19]/80 border-b border-slate-800/80 backdrop-blur-md px-2 py-1.5 overflow-x-auto scrollbar-none z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-0.5">
            {SCREENS_FLOW.map((screen, idx) => {
              const Icon = screen.icon;
              const isActive = activeScreen === screen.id;
              return (
                <button
                  key={screen.id}
                  onClick={() => navigateTo(screen.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-slate-800 text-sky-400 border border-slate-700 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                  }`}
                  title={`Step ${idx + 1}: ${screen.label}`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                  <span>{screen.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </nav>

      {/* Floating Bottom Step Bar for Judging Walkthrough */}
      <aside aria-label="Competition demo walkthrough navigation" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[92%] sm:w-auto">
        <div className="flex items-center justify-between sm:justify-center gap-3 px-4 py-2 rounded-full bg-[#0b1222]/95 border border-slate-700/80 backdrop-blur-xl shadow-xl">
          
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all ${
              currentIndex === 0
                ? 'text-slate-600 cursor-not-allowed'
                : 'text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          {/* Step dots */}
          <div className="flex items-center gap-1.5 px-2">
            {SCREENS_FLOW.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => navigateTo(s.id)}
                className={`transition-all rounded-full ${
                  activeScreen === s.id
                    ? 'w-5 h-1.5 bg-sky-400'
                    : idx < currentIndex
                    ? 'w-1.5 h-1.5 bg-slate-500 hover:bg-slate-400'
                    : 'w-1.5 h-1.5 bg-slate-700 hover:bg-slate-500'
                }`}
                title={s.short}
              />
            ))}
          </div>

          <div className="text-[11px] font-mono text-slate-400 hidden md:block px-1">
            {currentIndex + 1}/{SCREENS_FLOW.length}
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === SCREENS_FLOW.length - 1}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              currentIndex === SCREENS_FLOW.length - 1
                ? 'text-slate-600 cursor-not-allowed'
                : 'text-slate-950 bg-sky-400 hover:bg-sky-300 shadow-sm cursor-pointer'
            }`}
          >
            <span className="hidden sm:inline">Next: {SCREENS_FLOW[currentIndex + 1]?.label || 'Done'}</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

        </div>
      </aside>
    </>
  );
}
