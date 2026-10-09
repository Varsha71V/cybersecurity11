import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  RotateCcw, 
  MapPin, 
  Phone, 
  Lock, 
  User, 
  Share2, 
  Download, 
  Check, 
  ExternalLink,
  Radar,
  TrendingUp,
  AlertTriangle,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePrivacy } from '../../context/PrivacyContext';
import { sounds } from '../../utils/audio';

export default function BeforeAfterScreen() {
  const { 
    baselineAnalysis, 
    fullyFixedAnalysis, 
    analysisResults, 
    appliedFixes, 
    toggleFix, 
    navigateTo, 
    profile, 
    resetDemo 
  } = usePrivacy();

  // Dynamic scores calculated from the simulated profile state and applied fixes
  const initialScore = baselineAnalysis?.overallScore || 68;
  const currentScore = analysisResults?.overallScore || 68;
  const isImproved = appliedFixes.length > 0;
  const scoreDelta = currentScore - initialScore;

  useEffect(() => {
    // Launch celebratory confetti when user has applied fixes and improved score
    if (appliedFixes.length >= 2) {
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#0284c7', '#10b981', '#8b5cf6']
        });
        sounds.playSuccess();
      } catch {
        // Safe fallback
      }
    }
  }, [appliedFixes.length]);

  const handleExportReport = () => {
    sounds.playClick();
    const reportText = `PRIVACY MIRROR — EXECUTIVE CYBERSECURITY EXPOSURE REPORT
Generated for Profile: ${profile.name} (@${profile.username})
Institution: ${profile.college} | City: ${profile.city}
Report Generated: ${new Date().toLocaleDateString()}

============================================================
1. INITIAL OSINT FOOTPRINT (BEFORE REMEDIATION):
- Illustrative Exposure Score: ${initialScore}/100 (${baselineAnalysis.severityTier})
- Identity Exposure: ${baselineAnalysis.categoryScores.identity}%
- Location Exposure: ${baselineAnalysis.categoryScores.location}%
- Contact Visibility Exposure: ${baselineAnalysis.categoryScores.contact}%
- Account Security Health: ${baselineAnalysis.categoryScores.security}%

============================================================
2. CURRENT DEFENSIVE STATUS (AFTER REMEDIATION):
- Hardened Privacy Health Score: ${currentScore}/100 (${analysisResults.severityTier})
- Applied Countermeasures: ${appliedFixes.length} fixes active
- Location Exposure: ${analysisResults.categoryScores.location}%
- Contact Visibility Exposure: ${analysisResults.categoryScores.contact}%
- Account Security Health: ${analysisResults.categoryScores.security}%

============================================================
3. ACTIONS RESPONSIBLE FOR IMPROVEMENTS:
${appliedFixes.length > 0 
  ? appliedFixes.map(f => `✓ ${f.replace('rec-', '').toUpperCase()} countermeasure applied`).join('\n')
  : 'None currently applied. Visit Privacy Coach to apply recommendations.'}

============================================================
4. STRATEGIC DEFENSIVE INSIGHT:
- Attackers chain innocent public metadata into high-authenticity pretexts.
- Decoupling personal contact numbers and enforcing 2FA neutralizes the majority of automated reconnaissance vectors.
- Always verify collegiate and event communications through independent verified directory channels.

Privacy Mirror — "See yourself the way an attacker sees you."`;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Privacy-Mirror-Report-${profile.username}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleApplyAllFixes = () => {
    sounds.playSuccess();
    const allIds = ['rec-location', 'rec-2fa', 'rec-contact', 'rec-password', 'rec-posts'];
    allIds.forEach(id => {
      if (!appliedFixes.includes(id)) {
        toggleFix(id);
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Screen Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-sky-400 mb-2">
            <span>STEP 09 OF 09</span>
            <span className="text-slate-600">·</span>
            <span>TRANSFORMATION MATRIX</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
            <span>Before vs After Hardening</span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              Verified Delta
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            A precise comparative analysis showing how prioritizing key countermeasures breaks passive reconnaissance chaining and hardens your digital footprint.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <button
            onClick={resetDemo}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors cursor-pointer"
            title="Reset to Initial Baseline State"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Demo State</span>
          </button>

          <button
            onClick={handleExportReport}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Comparative Score Cards: Before vs After */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* BEFORE CARD */}
        <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/70 border border-slate-800/80 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider">
                Initial Illustrative Exposure
              </span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold uppercase bg-amber-500/10 text-amber-300 border border-amber-500/20">
                {baselineAnalysis.severityTier}
              </span>
            </div>

            <div className="text-center py-3">
              <div className="text-5xl sm:text-6xl font-black font-mono text-amber-400 tracking-tight">
                {initialScore} <span className="text-2xl text-slate-500 font-normal">/ 100</span>
              </div>
              <div className="text-xs font-mono text-slate-400 mt-2 uppercase tracking-wider">
                Baseline Exposure Score
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed text-center max-w-sm mx-auto">
              Frequent location check-ins, unfiltered public contact channels, and disabled 2FA create accessible reconnaissance entry points.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs font-mono text-slate-400">
            <div className="flex justify-between items-center py-1">
              <span>Location Exposure:</span>
              <span className="text-rose-400 font-semibold">{baselineAnalysis.categoryScores.location}%</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span>Contact Exposure:</span>
              <span className="text-rose-400 font-semibold">{baselineAnalysis.categoryScores.contact}%</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span>Account Security:</span>
              <span className="text-amber-400 font-semibold">{baselineAnalysis.categoryScores.security}%</span>
            </div>
          </div>
        </div>

        {/* AFTER CARD */}
        <div className={`p-6 sm:p-7 rounded-2xl border transition-all flex flex-col justify-between space-y-6 ${
          isImproved 
            ? 'bg-slate-900/80 border-emerald-500/50 shadow-md' 
            : 'bg-slate-900/70 border-slate-800/80'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono uppercase text-emerald-400 font-semibold tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Updated Illustrative Posture
              </span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold uppercase bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                {analysisResults.severityTier}
              </span>
            </div>

            <div className="text-center py-3">
              <div className="text-5xl sm:text-6xl font-black font-mono text-emerald-400 tracking-tight flex items-center justify-center gap-2">
                <span>{currentScore}</span>
                <span className="text-2xl text-slate-500 font-normal">/ 100</span>
              </div>
              <div className="text-xs font-mono text-emerald-300 mt-2 uppercase tracking-wider font-semibold">
                Hardened Privacy Score ({scoreDelta >= 0 ? `+${scoreDelta}` : scoreDelta} Points)
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed text-center max-w-sm mx-auto">
              Delayed location tags, masked contact handles, and multi-factor authentication disrupt passive reconnaissance chaining.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs font-mono text-slate-300">
            <div className="flex justify-between items-center py-1">
              <span>Location Exposure:</span>
              <span className="text-emerald-400 font-semibold">{analysisResults.categoryScores.location}%</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span>Contact Exposure:</span>
              <span className="text-emerald-400 font-semibold">{analysisResults.categoryScores.contact}%</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span>Account Security:</span>
              <span className="text-emerald-400 font-semibold">{analysisResults.categoryScores.security}%</span>
            </div>
          </div>
        </div>

      </div>

      {/* Category-Level Changes Breakdown */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-100">
              Category-Level Exposure Changes
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Specific quantitative deltas across the five evaluation domains
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-500/20">
            Calculated From Applied Mitigations
          </span>
        </div>

        <div className="space-y-3">
          
          {/* Row 1: Location */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-900 text-sky-400 border border-slate-800">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-xs sm:text-sm text-slate-200">Location Exposure</h3>
                <p className="text-[11px] text-slate-400">Habitual routine check-ins and commute patterns</p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto font-mono text-xs">
              <span className="text-slate-400">{baselineAnalysis.categoryScores.location}%</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-emerald-400 font-bold text-sm">{analysisResults.categoryScores.location}%</span>
              <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30">
                {analysisResults.categoryScores.location - baselineAnalysis.categoryScores.location}%
              </span>
            </div>
          </div>

          {/* Row 2: Contact */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-900 text-sky-400 border border-slate-800">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-xs sm:text-sm text-slate-200">Contact Visibility</h3>
                <p className="text-[11px] text-slate-400">Direct phone number and personal email exposure</p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto font-mono text-xs">
              <span className="text-slate-400">{baselineAnalysis.categoryScores.contact}%</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-emerald-400 font-bold text-sm">{analysisResults.categoryScores.contact}%</span>
              <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30">
                {analysisResults.categoryScores.contact - baselineAnalysis.categoryScores.contact}%
              </span>
            </div>
          </div>

          {/* Row 3: Security */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-900 text-sky-400 border border-slate-800">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-xs sm:text-sm text-slate-200">Account Security Health</h3>
                <p className="text-[11px] text-slate-400">Multi-factor authentication and credential hygiene</p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto font-mono text-xs">
              <span className="text-slate-400">{baselineAnalysis.categoryScores.security}%</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-emerald-400 font-bold text-sm">{analysisResults.categoryScores.security}%</span>
              <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30">
                +{analysisResults.categoryScores.security - baselineAnalysis.categoryScores.security}%
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Actions Responsible for the Changes */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-mono uppercase text-slate-200 font-bold tracking-wider">
              Actions Responsible for Improvements ({appliedFixes.length} Applied):
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Toggle specific mitigations to observe their direct impact on the model
            </p>
          </div>

          {appliedFixes.length < 5 && (
            <button
              onClick={handleApplyAllFixes}
              className="text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors cursor-pointer self-start sm:self-auto"
            >
              + Apply All Recommendations
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { id: 'rec-location', label: 'Delayed Location Tags', desc: '-44% Location Exposure' },
            { id: 'rec-2fa', label: 'Hardware / App 2FA Enabled', desc: '+50% Account Security' },
            { id: 'rec-contact', label: 'Masked Direct Phone / Email', desc: '-43% Contact Exposure' },
            { id: 'rec-password', label: 'Password Manager Adopted', desc: '+25% Account Defense' },
            { id: 'rec-posts', label: 'Audited Legacy Social Posts', desc: '-35% Social Inference' },
          ].map((item) => {
            const isApplied = appliedFixes.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggleFix(item.id)}
                className={`p-3.5 rounded-xl text-left border font-mono text-xs transition-all flex items-center justify-between cursor-pointer ${
                  isApplied
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div>
                  <div className="font-semibold text-slate-200">{item.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
                </div>
                {isApplied ? (
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                ) : (
                  <span className="text-[10px] text-slate-500 ml-2">Click to Apply</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Concise Explanation of the Improvement */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
        <h3 className="text-sm font-bold text-slate-100 font-mono uppercase flex items-center gap-2">
          <Info className="w-4 h-4 text-sky-400" />
          Concise Synthesis of Defensive Improvement
        </h3>
        <p>
          By decoupling direct contact details, introducing verification latency to location check-ins, and adopting hardware/app 2FA, the automated correlation pathways an adversary needs to construct credible spear-phishing pretexts have been disrupted.
        </p>
        <p className="text-slate-400">
          The threat actor is forced to expend significantly greater resources or move on to a less hardened target. Privacy Mirror demonstrates that security is not about secrecy, but about reducing unnecessary correlative signal leakage.
        </p>
      </div>

      {/* Final Action Bar */}
      <div className="pt-2 flex items-center justify-between border-t border-slate-800">
        <button
          onClick={() => navigateTo('coach')}
          className="text-xs font-mono text-slate-400 hover:text-sky-300 transition-colors"
        >
          ← Return to Privacy Coach
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('attacker')}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-rose-300 border border-slate-800 transition-colors cursor-pointer"
          >
            Re-inspect Attacker View 👁
          </button>

          <button
            onClick={() => navigateTo('landing')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-xs bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all shadow-sm cursor-pointer"
          >
            <span>Return to Welcome Screen</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
