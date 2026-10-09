import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  UserCheck, 
  ChevronDown, 
  Check,
  Shield,
  ExternalLink
} from 'lucide-react';
import { usePrivacy } from '../../context/PrivacyContext';

export default function Header() {
  const { 
    activeScreen, 
    navigateTo, 
    analysisResults, 
    profile, 
    loadPreset, 
    resetDemo, 
    soundEnabled, 
    toggleSound 
  } = usePrivacy();

  const [presetOpen, setPresetOpen] = useState(false);

  const getScoreBadge = (score) => {
    if (score >= 70) {
      return {
        dot: 'bg-rose-500',
        text: 'text-rose-400',
        bg: 'bg-rose-500/10 border-rose-500/30',
        label: 'High Exposure'
      };
    }
    if (score >= 45) {
      return {
        dot: 'bg-amber-400',
        text: 'text-amber-400',
        bg: 'bg-amber-500/10 border-amber-500/30',
        label: 'Moderate Exposure'
      };
    }
    return {
      dot: 'bg-emerald-400',
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/30',
      label: 'Low Exposure'
    };
  };

  const badge = getScoreBadge(analysisResults.overallScore);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080d19]/90 border-b border-slate-800/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => navigateTo('landing')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-900 border border-slate-700/80 group-hover:border-sky-500/60 transition-colors shadow-sm">
            <ShieldAlert className="w-4 h-4 text-sky-400 group-hover:scale-105 transition-transform" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-wide text-slate-100">
                PRIVACY MIRROR
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono tracking-widest bg-slate-900 text-sky-400 border border-slate-700/80 rounded">
                SECURITY PLATFORM
              </span>
            </div>
            <p className="text-[11px] text-slate-400 tracking-tight hidden md:block">
              "See yourself the way an attacker sees you."
            </p>
          </div>
        </div>

        {/* Center / Exposure Score Pill */}
        <div className="hidden md:flex items-center gap-3">
          {activeScreen !== 'landing' && (
            <div className={`flex items-center gap-2 px-3 py-1 rounded-md border text-xs font-mono ${badge.bg}`}>
              <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
              <span className="text-slate-400 font-sans text-[11px]">ILLUSTRATIVE EXPOSURE:</span>
              <span className={`font-bold ${badge.text}`}>{analysisResults.overallScore}/100</span>
              <span className="text-slate-400 text-[10px]">· {badge.label}</span>
            </div>
          )}
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Preset Demo Selector */}
          <div className="relative">
            <button
              onClick={() => setPresetOpen(!presetOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-700/80 hover:border-slate-600 text-slate-200 transition-all shadow-sm cursor-pointer"
              title="Switch Profile Presets"
            >
              <div className="w-5 h-5 rounded-full bg-slate-800 text-sky-400 flex items-center justify-center font-bold text-[10px]">
                {profile.name?.charAt(0) || 'P'}
              </div>
              <span className="hidden sm:inline text-slate-400 text-[11px]">Profile:</span>
              <span className="font-semibold text-slate-200 truncate max-w-[90px]">{profile.name}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${presetOpen ? 'rotate-180' : ''}`} />
            </button>

            {presetOpen && (
              <div 
                className="absolute right-0 mt-2 w-72 rounded-xl bg-[#0c1427] border border-slate-700/80 shadow-2xl p-2 z-50 animate-in fade-in"
                onMouseLeave={() => setPresetOpen(false)}
              >
                <div className="text-[10px] font-mono uppercase text-slate-400 px-2 py-1.5 tracking-wider border-b border-slate-800 mb-1 flex items-center justify-between">
                  <span>Demo Profiles</span>
                  <span className="text-slate-500">Preset Scenarios</span>
                </div>

                <button
                  onClick={() => { loadPreset('alex'); setPresetOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs flex flex-col gap-0.5 transition-colors cursor-pointer ${
                    profile.id === 'alex' ? 'bg-sky-500/10 text-sky-300 border border-sky-500/30' : 'hover:bg-slate-800/80 text-slate-300'
                  }`}
                >
                  <div className="font-semibold text-slate-200 flex items-center justify-between">
                    <span>Alex (Student)</span>
                    <span className="text-[10px] text-amber-400 font-mono">68/100 Moderate</span>
                  </div>
                  <span className="text-[11px] text-slate-400">Horizon Institute · CSE · Tech Fest Check-ins</span>
                </button>

                <button
                  onClick={() => { loadPreset('maya'); setPresetOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs flex flex-col gap-0.5 transition-colors mt-1 cursor-pointer ${
                    profile.id === 'maya' ? 'bg-sky-500/10 text-sky-300 border border-sky-500/30' : 'hover:bg-slate-800/80 text-slate-300'
                  }`}
                >
                  <div className="font-semibold text-slate-200 flex items-center justify-between">
                    <span>Maya (Freelancer)</span>
                    <span className="text-[10px] text-emerald-400 font-mono">48/100 Low</span>
                  </div>
                  <span className="text-[11px] text-slate-400">UI/UX Designer · Mumbai · 2FA Active</span>
                </button>

                <button
                  onClick={() => { loadPreset('rohan'); setPresetOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs flex flex-col gap-0.5 transition-colors mt-1 cursor-pointer ${
                    profile.id === 'rohan' ? 'bg-sky-500/10 text-sky-300 border border-sky-500/30' : 'hover:bg-slate-800/80 text-slate-300'
                  }`}
                >
                  <div className="font-semibold text-slate-200 flex items-center justify-between">
                    <span>Rohan (Founder)</span>
                    <span className="text-[10px] text-rose-400 font-mono">79/100 High</span>
                  </div>
                  <span className="text-[11px] text-slate-400">AI Startup · Keynote Speaker · Delhi NCR</span>
                </button>
              </div>
            )}
          </div>

          {/* Reset Demo button */}
          <button
            onClick={resetDemo}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-slate-600 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            title="Reset to default Alex profile"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Audio toggle */}
          <button
            onClick={toggleSound}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              soundEnabled 
                ? 'bg-slate-900 border-slate-700/80 text-sky-400 hover:text-sky-300' 
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
            title={soundEnabled ? 'Mute Interface Sound Effects' : 'Enable Subtle Audio Cues'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

        </div>
      </div>
    </header>
  );
}
