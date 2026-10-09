import React, { useState } from 'react';
import { 
  BrainCircuit, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  ShieldAlert, 
  Mail, 
  Key, 
  EyeOff, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  ShieldCheck,
  Check,
  Info,
  Sliders,
  RotateCcw
} from 'lucide-react';
import { usePrivacy } from '../../context/PrivacyContext';
import { sounds } from '../../utils/audio';

export default function PrivacyCoachScreen() {
  const { analysisResults, appliedFixes, toggleFix, navigateTo, resetAnalysis } = usePrivacy();
  const [expandedMatters, setExpandedMatters] = useState({});
  const [expandedHowTo, setExpandedHowTo] = useState({});

  const { recommendations, overallScore } = analysisResults;

  const toggleMatters = (id) => {
    sounds.playClick();
    setExpandedMatters((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleHowTo = (id) => {
    sounds.playClick();
    setExpandedHowTo((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const iconMap = {
    MapPin: MapPin,
    ShieldAlert: ShieldAlert,
    Mail: Mail,
    Key: Key,
    EyeOff: EyeOff,
  };

  const highPriority = recommendations.filter((r) => r.priority === 'HIGH PRIORITY');
  const mediumPriority = recommendations.filter((r) => r.priority === 'MEDIUM PRIORITY');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Screen Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-sky-400 mb-2">
            <span>STEP 08 OF 09</span>
            <span className="text-slate-600">·</span>
            <span>REMEDIATION PLAYBOOK</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
            <span>Privacy Coach Recommendations</span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              Action Plan
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Prioritized defensive countermeasures. Mark recommendations as applied to simulate real-time exposure reduction across your profile footprint.
          </p>
        </div>

        {/* Live Score Counter Pill */}
        <div className="flex items-center gap-4 bg-slate-900/90 p-3 rounded-xl border border-slate-800/80 shadow-sm self-start md:self-auto">
          <div>
            <span className="text-[10px] font-mono text-slate-400 block uppercase">CURRENT SCORE</span>
            <span className="text-lg font-bold font-mono text-sky-400">{overallScore}/100</span>
          </div>
          <div className="h-8 w-[1px] bg-slate-800" />
          <div>
            <span className="text-[10px] font-mono text-slate-400 block uppercase">FIXES SIMULATED</span>
            <span className="text-lg font-bold font-mono text-emerald-400">
              {appliedFixes.length} / {recommendations.length}
            </span>
          </div>
        </div>
      </div>

      {/* Applied Fixes Quick Status Bar */}
      <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <Info className="w-4 h-4 text-sky-400 shrink-0" />
          <span>
            <strong>Simulated Hardening:</strong> Applying countermeasures dynamically recalculates your exposure risk score and updates the Before vs After matrix.
          </span>
        </div>
        <button
          onClick={() => navigateTo('beforeAfter')}
          className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <span>Preview Before vs After Screen</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* HIGH PRIORITY SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <h2 className="text-sm font-bold text-slate-100 font-mono tracking-wider uppercase">
              High Priority Action Items ({highPriority.length})
            </h2>
          </div>
          <span className="text-xs text-rose-400 font-mono">Immediate Attack Surface Reduction</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {highPriority.map((rec) => {
            const Icon = iconMap[rec.icon] || ShieldAlert;
            const isFixed = appliedFixes.includes(rec.id);

            return (
              <div
                key={rec.id}
                className={`p-6 rounded-2xl border transition-all ${
                  isFixed
                    ? 'bg-slate-900/50 border-emerald-500/40 shadow-sm'
                    : 'bg-slate-900/70 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-3">
                  <div className="flex items-start gap-3.5">
                    <div className={`p-2.5 rounded-xl border mt-0.5 shrink-0 ${
                      isFixed
                        ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                        : 'bg-rose-950/40 border-rose-500/30 text-rose-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-bold">
                          {rec.priority}
                        </span>
                        <span className="text-[11px] font-mono text-emerald-400 font-medium">
                          Expected Improvement: {rec.impact}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-slate-100 mt-1">
                        {rec.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {rec.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Toggle Fix Button */}
                  <button
                    onClick={() => {
                      sounds.playToggle();
                      toggleFix(rec.id);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                      isFixed
                        ? 'bg-emerald-950/80 border border-emerald-400 text-emerald-300'
                        : 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200'
                    }`}
                  >
                    {isFixed ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Fix Applied</span>
                      </>
                    ) : (
                      <>
                        <span>Apply Fix</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      </>
                    )}
                  </button>
                </div>

                {/* Interactive Action Buttons */}
                <div className="pt-3 border-t border-slate-800/80 flex flex-wrap gap-2 text-xs">
                  <button
                    onClick={() => toggleMatters(rec.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors cursor-pointer"
                  >
                    <span>Why This Matters</span>
                    {expandedMatters[rec.id] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => toggleHowTo(rec.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-sky-300 transition-colors cursor-pointer"
                  >
                    <span>Recommended Action Checklist</span>
                    {expandedHowTo[rec.id] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Expanded "Why this matters" Panel */}
                {expandedMatters[rec.id] && (
                  <div className="mt-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans space-y-1 animate-fadeIn">
                    <span className="text-amber-400 font-bold font-mono text-[11px] block">
                      RISK BEING ADDRESSED:
                    </span>
                    <p>{rec.whyMatters}</p>
                  </div>
                )}

                {/* Expanded "How to improve" Panel */}
                {expandedHowTo[rec.id] && (
                  <div className="mt-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2 animate-fadeIn">
                    <span className="text-emerald-400 font-mono font-bold text-[11px] block">
                      RECOMMENDED ACTION:
                    </span>
                    <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                      {rec.howToImprove.map((step, sIdx) => (
                        <li key={sIdx}>{step}</li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>

      {/* MEDIUM PRIORITY SECTION */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <h2 className="text-sm font-bold text-slate-100 font-mono tracking-wider uppercase">
              Medium Priority Action Items ({mediumPriority.length})
            </h2>
          </div>
          <span className="text-xs text-amber-400 font-mono">Secondary Hardening Protections</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {mediumPriority.map((rec) => {
            const Icon = iconMap[rec.icon] || Mail;
            const isFixed = appliedFixes.includes(rec.id);

            return (
              <div
                key={rec.id}
                className={`p-6 rounded-2xl border transition-all ${
                  isFixed
                    ? 'bg-slate-900/50 border-emerald-500/40 shadow-sm'
                    : 'bg-slate-900/70 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-3">
                  <div className="flex items-start gap-3.5">
                    <div className={`p-2.5 rounded-xl border mt-0.5 shrink-0 ${
                      isFixed
                        ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                        : 'bg-amber-950/40 border-amber-500/30 text-amber-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold">
                          {rec.priority}
                        </span>
                        <span className="text-[11px] font-mono text-emerald-400 font-medium">
                          Expected Improvement: {rec.impact}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-slate-100 mt-1">
                        {rec.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {rec.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Toggle Fix Button */}
                  <button
                    onClick={() => {
                      sounds.playToggle();
                      toggleFix(rec.id);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                      isFixed
                        ? 'bg-emerald-950/80 border border-emerald-400 text-emerald-300'
                        : 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200'
                    }`}
                  >
                    {isFixed ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Fix Applied</span>
                      </>
                    ) : (
                      <>
                        <span>Apply Fix</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      </>
                    )}
                  </button>
                </div>

                {/* Interactive Action Buttons */}
                <div className="pt-3 border-t border-slate-800/80 flex flex-wrap gap-2 text-xs">
                  <button
                    onClick={() => toggleMatters(rec.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors cursor-pointer"
                  >
                    <span>Why This Matters</span>
                    {expandedMatters[rec.id] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => toggleHowTo(rec.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-sky-300 transition-colors cursor-pointer"
                  >
                    <span>Recommended Action Checklist</span>
                    {expandedHowTo[rec.id] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Expanded "Why this matters" Panel */}
                {expandedMatters[rec.id] && (
                  <div className="mt-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans space-y-1 animate-fadeIn">
                    <span className="text-amber-400 font-bold font-mono text-[11px] block">
                      RISK BEING ADDRESSED:
                    </span>
                    <p>{rec.whyMatters}</p>
                  </div>
                )}

                {/* Expanded "How to improve" Panel */}
                {expandedHowTo[rec.id] && (
                  <div className="mt-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2 animate-fadeIn">
                    <span className="text-emerald-400 font-mono font-bold text-[11px] block">
                      RECOMMENDED ACTION:
                    </span>
                    <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                      {rec.howToImprove.map((step, sIdx) => (
                        <li key={sIdx}>{step}</li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>

      {/* Educational Disclaimer Banner */}
      <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-200">Simulation Guardrail:</strong> Privacy Mirror demonstrates how your illustrative risk score changes as security best practices are adopted. Applying fixes here demonstrates the defensive model and does not modify your real external accounts or social media settings.
        </p>
      </div>

      {/* Screen Navigation Footer */}
      <div className="pt-2 flex items-center justify-between border-t border-slate-800">
        <button
          onClick={() => navigateTo('breakdown')}
          className="text-xs font-mono text-slate-400 hover:text-sky-300 transition-colors"
        >
          ← Return to Attack Breakdown
        </button>

        <button
          onClick={() => navigateTo('beforeAfter')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-xs bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all shadow-sm cursor-pointer"
        >
          <span>View Before vs After Score Matrix</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
