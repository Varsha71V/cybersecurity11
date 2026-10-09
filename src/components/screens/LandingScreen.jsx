import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ArrowRight, 
  Share2, 
  Eye, 
  BrainCircuit, 
  Lock, 
  Terminal, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  ChevronRight, 
  Info,
  ShieldCheck,
  Building,
  MapPin,
  Calendar,
  Mail,
  UserCheck
} from 'lucide-react';
import { usePrivacy } from '../../context/PrivacyContext';

export default function LandingScreen() {
  const { navigateTo, loadPreset } = usePrivacy();
  const [previewAttackerMode, setPreviewAttackerMode] = useState(false);

  const handleAnalyzePrivacy = () => {
    loadPreset('alex');
    navigateTo('dashboard');
  };

  const handleTryDemoProfile = () => {
    loadPreset('alex');
    navigateTo('profile');
  };

  return (
    <div className="relative min-h-[calc(100vh-8rem)] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between space-y-12">
      
      {/* Hero Section */}
      <div className="pt-4 pb-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Left Hero Column */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-sky-400 text-xs font-mono tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span>AI CYBERSECURITY & THREAT MODELING PLATFORM</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              PRIVACY MIRROR
            </h1>
            <p className="text-xl sm:text-2xl font-semibold text-slate-300 font-mono tracking-tight">
              "See yourself the way an attacker sees you."
            </p>
          </div>

          <p className="text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Discover how seemingly harmless digital signals can combine into potential cybersecurity risks.
            Privacy Mirror models multi-point correlation to demonstrate how open-source details assemble into a digital attack surface.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
            <button
              onClick={handleAnalyzePrivacy}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm bg-sky-400 hover:bg-sky-300 text-slate-950 transition-all shadow-sm hover:shadow-sky-500/20 cursor-pointer"
            >
              <span>Analyze My Privacy</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleTryDemoProfile}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-sky-400" />
              <span>Try Demo Profile (Alex)</span>
            </button>
          </div>

          {/* Educational Disclaimer Badge */}
          <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-400 max-w-xl mx-auto lg:mx-0">
            <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-slate-200">Simulated Educational Environment:</strong> Never enter authentic passwords, OTPs, banking information, or government IDs. All evaluations run client-side on simulated demo data.
            </p>
          </div>

        </div>

        {/* Right Column: Digital Footprint Intelligence Panel */}
        <div className="lg:col-span-5 flex flex-col items-center">
          
          <div className="w-full max-w-md">
            
            {/* Header / Mode Switcher */}
            <div className="flex items-center justify-between mb-2.5 px-1">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-sky-400" />
                Live Footprint Panel
              </span>

              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-md border border-slate-800 text-xs font-mono">
                <button
                  onClick={() => setPreviewAttackerMode(false)}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    !previewAttackerMode 
                      ? 'bg-slate-800 text-sky-300 font-semibold' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Public Profile
                </button>
                <button
                  onClick={() => setPreviewAttackerMode(true)}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    previewAttackerMode 
                      ? 'bg-rose-950/80 text-rose-300 font-semibold border border-rose-500/40' 
                      : 'text-slate-400 hover:text-rose-400'
                  }`}
                >
                  Attacker View 👁
                </button>
              </div>
            </div>

            {/* Realistic Digital Footprint Intelligence Panel */}
            <div className={`relative rounded-xl transition-all duration-300 p-5 bg-[#0d1527] border ${
              previewAttackerMode
                ? 'border-rose-500/40 shadow-rose-glow-sm attacker-scanline'
                : 'border-slate-800 shadow-card'
            }`}>
              
              {/* Header inside Panel */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm border ${
                    previewAttackerMode
                      ? 'bg-rose-950/60 border-rose-500/40 text-rose-400 font-mono'
                      : 'bg-slate-900 border-slate-700 text-sky-400'
                  }`}>
                    {previewAttackerMode ? '🎯' : 'A'}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                      {previewAttackerMode ? 'TARGET: #ALEX-992' : 'Alex (Demo Target)'}
                      {previewAttackerMode && (
                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                          OSINT TARGET
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      @alex_codes · Bengaluru, India
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`text-xs font-mono font-bold ${previewAttackerMode ? 'text-rose-400' : 'text-amber-400'}`}>
                    {previewAttackerMode ? 'HIGH RISK' : '68/100'}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {previewAttackerMode ? 'VULNERABLE' : 'Moderate Exposure'}
                  </div>
                </div>
              </div>

              {/* Content sections */}
              {!previewAttackerMode ? (
                /* Standard Public Footprint View */
                <div className="pt-3.5 space-y-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block mb-1">
                      PUBLIC SIGNALS (INPUT DATA)
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded bg-slate-900/70 border border-slate-800/80">
                        <span className="text-slate-500 block text-[10px] uppercase font-mono">Affiliation</span>
                        <span className="text-slate-200 font-medium truncate block">Horizon Institute</span>
                      </div>
                      <div className="p-2 rounded bg-slate-900/70 border border-slate-800/80">
                        <span className="text-slate-500 block text-[10px] uppercase font-mono">Recent Activity</span>
                        <span className="text-slate-200 font-medium truncate block">College Tech Fest</span>
                      </div>
                      <div className="p-2 rounded bg-slate-900/70 border border-slate-800/80">
                        <span className="text-slate-500 block text-[10px] uppercase font-mono">Location Posts</span>
                        <span className="text-slate-200 font-medium truncate block">Frequent Check-ins</span>
                      </div>
                      <div className="p-2 rounded bg-slate-900/70 border border-slate-800/80">
                        <span className="text-slate-500 block text-[10px] uppercase font-mono">Contact Vis.</span>
                        <span className="text-slate-200 font-medium truncate block">Email & Phone Public</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block mb-1">
                      PUBLIC BIO
                    </span>
                    <p className="text-xs text-slate-300 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed">
                      "CSE student @ Horizon Institute | coding | music | attending campus tech fest!"
                    </p>
                  </div>
                </div>
              ) : (
                /* Attacker View Intelligence Dossier */
                <div className="pt-3.5 space-y-3 font-mono text-xs">
                  <div>
                    <span className="text-[10px] uppercase text-rose-400 font-bold tracking-wider block mb-1">
                      POTENTIAL INFERENCES (ATTACKER DEDUCTIONS)
                    </span>
                    <ul className="space-y-1.5 p-2.5 rounded-lg bg-rose-950/20 border border-rose-500/20 text-rose-200 text-[11px]">
                      <li className="flex items-start gap-1.5">
                        <span className="text-rose-400">•</span>
                        <span>Likely full-time student at Horizon Institute CSE department</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-rose-400">•</span>
                        <span>Attended recent Tech Fest (spoofable campus authority pretext)</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-rose-400">•</span>
                        <span>Direct phishing gateway available via unfiltered public email/phone</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase text-amber-400 font-bold tracking-wider block mb-1">
                      RISK INDICATORS
                    </span>
                    <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800 space-y-1.5 text-[11px]">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Spear-Phishing Susceptibility:</span>
                        <span className="text-rose-400 font-bold">88% (High)</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-amber-500 to-rose-500 h-full w-[88%]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom footer inside panel */}
              <div className="mt-3.5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px]">
                  {previewAttackerMode ? 'Correlation analysis applied' : 'Raw public visibility'}
                </span>
                <button
                  onClick={() => setPreviewAttackerMode(!previewAttackerMode)}
                  className="text-sky-400 hover:text-sky-300 font-medium flex items-center gap-1 cursor-pointer text-[11px]"
                >
                  <span>Switch Perspective</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* 3 Core Pillar Feature Cards */}
      <div className="space-y-4">
        <div className="border-b border-slate-800/80 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-slate-100">
            Defensive Threat Intelligence Capabilities
          </h2>
          <span className="text-xs font-mono text-slate-400">
            Educational OSINT kill-chain simulation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1 */}
          <div 
            onClick={() => navigateTo('dots')}
            className="p-5 rounded-xl bg-[#0d1527] border border-slate-800 hover:border-sky-500/40 transition-all cursor-pointer group space-y-3"
          >
            <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-sky-400 tracking-wider">
                01 · CORRELATION ENGINE
              </span>
              <h3 className="text-base font-bold text-slate-100 group-hover:text-sky-300 transition-colors mt-0.5">
                Connect the Dots
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              "Discover relationships between the information you share." Interactive entity graph visualizing how college, location, and handles combine into attack vectors.
            </p>
            <div className="pt-1 flex items-center gap-1 text-xs text-sky-400 font-medium">
              <span>Inspect Entity Graph</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => navigateTo('attacker')}
            className="p-5 rounded-xl bg-[#0d1527] border border-slate-800 hover:border-rose-500/40 transition-all cursor-pointer group space-y-3"
          >
            <div className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-rose-400 tracking-wider">
                02 · OSINT REVERSAL
              </span>
              <h3 className="text-base font-bold text-slate-100 group-hover:text-rose-300 transition-colors mt-0.5">
                Attacker View
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              "Understand what a social engineer could infer from your public profile." Invert your vantage point to see verified signals, inferences, and misuse scenarios.
            </p>
            <div className="pt-1 flex items-center gap-1 text-xs text-rose-400 font-medium">
              <span>View Attacker Dossier</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => navigateTo('coach')}
            className="p-5 rounded-xl bg-[#0d1527] border border-slate-800 hover:border-violet-500/40 transition-all cursor-pointer group space-y-3"
          >
            <div className="w-9 h-9 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-violet-400 tracking-wider">
                03 · HARDENING PLAYBOOK
              </span>
              <h3 className="text-base font-bold text-slate-100 group-hover:text-violet-300 transition-colors mt-0.5">
                Privacy Coach
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              "Get personalized recommendations to reduce your exposure." Prioritized defensive countermeasures with interactive before-and-after score simulation.
            </p>
            <div className="pt-1 flex items-center gap-1 text-xs text-violet-400 font-medium">
              <span>Review Hardening Steps</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

        </div>
      </div>

      {/* Presentation Walkthrough Launch Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-slate-200">
              Cybersecurity Competition Presentation Flow
            </div>
            <div className="text-[11px] text-slate-400">
              Recommended walkthrough: Profile → Dashboard → Connect Dots → Attacker View → Simulation → Breakdown → Coach → Score
            </div>
          </div>
        </div>

        <button
          onClick={handleTryDemoProfile}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 transition-colors cursor-pointer"
        >
          <span>Launch Full 9-Screen Demo</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
