import React, { useState } from 'react';
import { 
  Drama, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  ShieldCheck, 
  UserCheck, 
  Clock, 
  ExternalLink, 
  RotateCcw,
  Info,
  ShieldAlert,
  Mail,
  ShieldQuestion,
  HelpCircle,
  Eye,
  Crosshair
} from 'lucide-react';
import { usePrivacy } from '../../context/PrivacyContext';
import { generateAttackSimulation, analyzeUserDecision } from '../../services/attackSimulationService';
import { sounds } from '../../utils/audio';

export default function AttackSimulationScreen() {
  const { profile, navigateTo } = usePrivacy();
  const [selectedChoiceId, setSelectedChoiceId] = useState(null);
  const [showWarningHighlights, setShowWarningHighlights] = useState(true);

  const scenario = generateAttackSimulation(profile);
  const decisionResult = selectedChoiceId ? analyzeUserDecision(selectedChoiceId, profile) : null;

  const handleSelectChoice = (choiceId) => {
    const isSafe = choiceId === 'verify_independent' || choiceId === 'ignore_report';
    if (isSafe) {
      sounds.playSuccess();
    } else {
      sounds.playAlert();
    }
    setSelectedChoiceId(choiceId);
  };

  const handleResetSimulation = () => {
    sounds.playToggle();
    setSelectedChoiceId(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Screen Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-sky-400 mb-2">
            <span>STEP 06 OF 09</span>
            <span className="text-slate-600">·</span>
            <span>INTERACTIVE SPEAR-PHISHING LAB</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
            <span>Simulation: Exploitation in Action</span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-violet-500/10 text-violet-300 border border-violet-500/20 font-medium">
              Educational Sandbox
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Experience how seemingly harmless public signals are woven into a high-authenticity social-engineering pretext. Test your response in real time.
          </p>
        </div>

        {selectedChoiceId && (
          <button
            onClick={handleResetSimulation}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors cursor-pointer self-start md:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Decision</span>
          </button>
        )}
      </div>

      {/* Scenario Context Banner */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3 text-xs text-slate-400">
        <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-slate-200">Scenario Context:</strong>
          <p className="leading-relaxed">
            You recently posted about participating in <strong>{profile.recentActivity || 'the hackathon'}</strong> at <strong>{profile.college || 'your university'}</strong>. Shortly thereafter, an unexpected email arrives in your inbox.
          </p>
        </div>
      </div>

      {/* Inbound Suspicious Message Client Container */}
      <div className="rounded-2xl bg-slate-900/70 border border-slate-800/80 overflow-hidden shadow-xl">
        
        {/* Email Client Header Bar */}
        <div className="p-4 sm:p-5 bg-slate-950/70 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-sm">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-slate-200 text-xs sm:text-sm flex items-center gap-2">
                <span>{scenario.sender.name}</span>
                <span className="text-[10px] font-mono bg-rose-950/80 text-rose-300 px-2 py-0.5 rounded border border-rose-500/30">
                  UNVERIFIED SENDER
                </span>
              </div>
              <div className="text-xs font-mono text-slate-400 mt-0.5">
                {scenario.sender.handle}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowWarningHighlights(!showWarningHighlights)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer border ${
                showWarningHighlights
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showWarningHighlights ? 'Warning Signs Highlighted' : 'Show Warning Signs'}</span>
            </button>

            <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{scenario.message.urgencyTag}</span>
            </span>
          </div>
        </div>

        {/* Message Subject & Body */}
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wide">
              Subject: <strong className="text-slate-100">{scenario.message.subject}</strong>
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              To: {profile.name} &lt;@{profile.username}&gt; · Received {scenario.message.timestamp}
            </div>
          </div>

          {/* Email Body with Highlighted Indicators */}
          <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans space-y-4">
            <p>
              Hi {profile.name},
            </p>
            <p>
              I am contacting students from{' '}
              <span className={showWarningHighlights ? 'bg-amber-500/20 text-amber-200 px-1.5 py-0.5 rounded border border-amber-500/40 font-medium' : ''}>
                {profile.college}
              </span>{' '}
              regarding the upcoming{' '}
              <span className={showWarningHighlights ? 'bg-amber-500/20 text-amber-200 px-1.5 py-0.5 rounded border border-amber-500/40 font-medium' : ''}>
                {profile.recentActivity}
              </span>
              . We noticed your participation profile registration is incomplete on our master roster.
            </p>
            <p>
              Please confirm your student credentials and verify your roll number through the verification link below{' '}
              <span className={showWarningHighlights ? 'bg-rose-500/20 text-rose-200 px-1.5 py-0.5 rounded border border-rose-500/40 font-medium' : ''}>
                within 24 hours
              </span>{' '}
              to secure your event accreditation badge.
            </p>

            {/* Suspicious Action Link Mockup */}
            <div className="pt-2">
              <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                  <span className="font-mono text-xs text-sky-400 truncate">
                    {scenario.message.actionUrl}
                  </span>
                </div>
                {showWarningHighlights && (
                  <span className="text-[10px] font-mono uppercase text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-500/30 shrink-0">
                    ⚠ Lookalike Domain Replica
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Highlighted Warning Signs Legend (when toggled on) */}
          {showWarningHighlights && (
            <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/60 text-xs space-y-2">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                Detected Red Flags in this Inbound Message:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300">
                  <strong className="text-amber-300 block mb-0.5">1. Context Quoting</strong>
                  Accurately names your real college & event from public posts.
                </div>
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300">
                  <strong className="text-rose-300 block mb-0.5">2. Artificial Urgency</strong>
                  Enforces a "24-hour deadline" to rush human verification.
                </div>
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300">
                  <strong className="text-rose-300 block mb-0.5">3. External Lookalike Link</strong>
                  Uses an unverified <code>.auth-portal.net</code> replica domain.
                </div>
              </div>
            </div>
          )}

          {/* User Choices Section */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider">
                What action do you take?
              </span>
              <span className="text-[11px] font-mono text-sky-400">
                Select your defense choice:
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {scenario.choices.map((choice, idx) => {
                const isSelected = selectedChoiceId === choice.id;
                const isSafe = choice.risk === 'SAFE';

                return (
                  <button
                    key={choice.id}
                    onClick={() => handleSelectChoice(choice.id)}
                    className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? isSafe
                          ? 'bg-emerald-950/30 border-emerald-500 text-emerald-100 shadow-sm'
                          : 'bg-rose-950/30 border-rose-500 text-rose-100 shadow-sm'
                        : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-slate-900/70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] font-mono flex items-center justify-center font-bold text-slate-300">
                        {idx + 1}
                      </span>
                      <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${
                        isSafe ? 'text-emerald-400 bg-emerald-950/60' : 'text-slate-400 bg-slate-900'
                      }`}>
                        {choice.badge}
                      </span>
                    </div>
                    <p className="text-xs font-medium leading-relaxed">
                      {choice.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Immediate Decision Feedback Panel */}
      {decisionResult && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className={`p-6 rounded-2xl border ${
            decisionResult.isSafe
              ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/20 border-rose-500/40 text-rose-200'
          }`}>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                {decisionResult.isSafe ? (
                  <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-7 h-7 text-rose-400 shrink-0" />
                )}
                <div>
                  <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${
                    decisionResult.isSafe ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {decisionResult.status}
                  </span>
                  <h3 className="text-base font-bold text-slate-100 mt-0.5">
                    {decisionResult.headline}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => navigateTo('breakdown')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all cursor-pointer self-start sm:self-auto shrink-0 shadow-sm"
              >
                <span>Examine Attack Breakdown</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs leading-relaxed text-slate-300">
              <p className="text-sm font-medium text-slate-200">
                "{decisionResult.summary}"
              </p>
              <p className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 text-slate-300">
                {decisionResult.explanation}
              </p>
              <div className="p-3 rounded-lg bg-sky-950/30 border border-sky-500/30 text-[11px] text-sky-200">
                <strong>Defensive Principle:</strong> {decisionResult.keyLesson}
              </div>
            </div>

          </div>

          {/* Explanation of Manipulation Techniques */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 space-y-4">
            
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <h3 className="text-xs font-mono uppercase text-slate-200 font-bold tracking-wider flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-violet-400" />
                  Manipulation Techniques Deployed in this Attack:
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Cognitive and behavioral levers identified by the simulation engine
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                4 Levers
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {scenario.detectedTechniques.map((tech, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-violet-300 uppercase font-mono">
                      {tech.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-slate-900">
                      {tech.severity}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {tech.description}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* Screen Navigation Footer */}
      <div className="pt-2 flex items-center justify-between border-t border-slate-800">
        <button
          onClick={() => navigateTo('attacker')}
          className="text-xs font-mono text-slate-400 hover:text-sky-300 transition-colors"
        >
          ← Return to Attacker View
        </button>

        <button
          onClick={() => navigateTo('breakdown')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-xs bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all shadow-sm cursor-pointer"
        >
          <span>Proceed to Attack Breakdown</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
