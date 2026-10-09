import React, { useState } from 'react';
import { 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Globe, 
  Building, 
  Calendar, 
  PenTool, 
  Zap, 
  Lock, 
  Info,
  ShieldCheck,
  Eye,
  Crosshair
} from 'lucide-react';
import { usePrivacy } from '../../context/PrivacyContext';

export default function AttackBreakdownScreen() {
  const { profile, navigateTo } = usePrivacy();
  const [activeStep, setActiveStep] = useState(1);

  const college = profile.college || 'Horizon Institute';
  const event = profile.recentActivity || 'College Tech Fest';
  const targetName = profile.name || 'Alex';

  // Comprehensive 6-step attack kill-chain timeline with exact required elements:
  // Step number, Short title, Explanation, Associated warning sign, Relevant prevention advice
  const timelineSteps = [
    {
      step: 1,
      phase: 'RECONNAISSANCE',
      title: 'Public Information Scraped',
      explanation: `The adversary scans public social bios and developer repositories, indexing target name "${targetName}", handle "@${profile.username}", and base location "${profile.city}".`,
      warningSign: 'Public search indexing linking real identity to social profiles and locations.',
      preventionAdvice: 'Regularly audit public profile visibility; decouple personal names from casual gaming and public forum accounts.',
      adversaryThought: 'Identified an active student profile with public handles and consistent posting patterns.',
      icon: Globe
    },
    {
      step: 2,
      phase: 'AFFILIATION MAPPING',
      title: 'Institutional Affiliation Confirmed',
      explanation: `Public profile tags link ${targetName} to "${college}". The attacker now knows which authority figures, departments, or IT services can be convincingly impersonated.`,
      warningSign: 'Unrestricted public disclosure of current university and department affiliation.',
      preventionAdvice: 'Limit academic affiliations to verified professional connections (e.g. LinkedIn) rather than public social bios.',
      adversaryThought: `I will pose as department administration or event staff from ${college} to establish immediate trust.`,
      icon: Building
    },
    {
      step: 3,
      phase: 'TEMPORAL HOOK',
      title: 'Event & Schedule Context Harvested',
      explanation: `Recent public posts indicate participation in "${event}". This gives the attacker a high-priority, time-sensitive conversational hook.`,
      warningSign: 'Real-time broadcasting of event attendance and conference schedules.',
      preventionAdvice: 'Share photos and event summaries retrospectively after concluding attendance rather than broadcasting live schedules.',
      adversaryThought: `The target expects post-event follow-ups or badge verifications right now. Perfect timing pretext.`,
      icon: Calendar
    },
    {
      step: 4,
      phase: 'LURE CRAFTING',
      title: 'Personalized Pretext Composed',
      explanation: `The attacker constructs a targeted email utilizing authentic campus terminology, accurate names, and a spoofed event domain mimicking ${college}.`,
      warningSign: 'Inbound message referencing your exact schedule from an unverified external domain.',
      preventionAdvice: 'Scrutinize sender headers and domain suffixes. Official campus communications will always originate from verified institutional domains.',
      adversaryThought: 'Matching their exact event vocabulary ensures the message slips past their suspicion filters.',
      icon: PenTool
    },
    {
      step: 5,
      phase: 'PSYCHOLOGICAL MANIPULATION',
      title: 'Trust Established & Suspicion Lowered',
      explanation: `The victim reads the message. Because it accurately cites their college and recent participation, their critical defense skepticism is lowered by over 80%.`,
      warningSign: 'Unprompted communications referencing real personal activities paired with artificial urgency.',
      preventionAdvice: 'Remember that familiarity is not authentication. Attackers can read the same public web pages anyone else can.',
      adversaryThought: 'They believe I am an authorized coordinator. The critical thinking barrier is dismantled.',
      icon: Zap
    },
    {
      step: 6,
      phase: 'EXPLOITATION',
      title: 'Urgent Credential Harvesting Attempt',
      explanation: `The attacker enforces an artificial 24-hour urgency deadline, directing the target to a fake authentication portal designed to steal portal logins.`,
      warningSign: 'Urgent demands to verify credentials or click action links to preserve access.',
      preventionAdvice: 'Never authenticate through incoming email links. Always bookmark and navigate directly to official institutional portals.',
      adversaryThought: 'Victim feels rushed and clicks without verifying the domain. Credentials harvested.',
      icon: AlertTriangle
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Screen Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-sky-400 mb-2">
            <span>STEP 07 OF 09</span>
            <span className="text-slate-600">·</span>
            <span>EXPLOIT TIMELINE ANALYSIS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
            <span>Attack Breakdown Timeline</span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20 font-medium">
              Multistage Kill-Chain
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            See the exact progression an adversary follows to chain isolated public signals into an effective social-engineering exploit.
          </p>
        </div>

        <button
          onClick={() => navigateTo('coach')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-xs bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all shadow-sm cursor-pointer self-start md:self-auto"
        >
          <span>Open Privacy Coach Remedies</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Forensic Intelligence Dossier Overview */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm space-y-4">
        <div className="text-xs font-mono uppercase text-slate-400 tracking-wider pb-2 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crosshair className="w-4 h-4 text-sky-400" />
            <span className="text-slate-200 font-semibold">Simulated Adversary Playbook Profile</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">MITRE ATT&CK Framework Context</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-slate-400 block uppercase font-mono text-[10px]">Primary Vector</span>
            <span className="text-sm font-bold text-slate-100 block mt-1">Spear-Phishing Pretexting</span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Academic coordinator persona</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-slate-400 block uppercase font-mono text-[10px]">Threat Objective</span>
            <span className="text-sm font-bold text-slate-100 block mt-1">Credential Harvesting</span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Student portal roll number & password theft</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-slate-400 block uppercase font-mono text-[10px]">Exploitation Mechanism</span>
            <span className="text-sm font-bold text-rose-300 block mt-1">Public Signal Correlation</span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Zero database compromise needed</span>
          </div>
        </div>
      </div>

      {/* The 6-Stage Visual Kill-Chain Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <span>Anatomy of a Multistage Exploit</span>
          </h2>
          <span className="text-xs font-mono text-sky-400">
            6 Sequential Attack Stages
          </span>
        </div>

        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-6 py-2">
          
          {timelineSteps.map((stepItem) => {
            const Icon = stepItem.icon;
            const isSelected = activeStep === stepItem.step;

            return (
              <div
                key={stepItem.step}
                onClick={() => setActiveStep(stepItem.step)}
                className={`relative p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900/95 border-sky-500/50 shadow-md'
                    : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Node number badge on the timeline line */}
                <div className={`absolute -left-[35px] sm:-left-[43px] top-6 w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold border transition-colors ${
                  isSelected
                    ? 'bg-sky-500 text-slate-950 border-sky-400'
                    : 'bg-slate-900 text-slate-400 border-slate-700'
                }`}>
                  {stepItem.step}
                </div>

                {/* Step Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-slate-900 text-sky-400 border border-slate-800">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase text-sky-400 font-bold tracking-wider">
                        STEP 0{stepItem.step} · {stepItem.phase}
                      </div>
                      <h3 className="font-bold text-sm sm:text-base text-slate-100">
                        {stepItem.title}
                      </h3>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded border border-slate-800 bg-slate-900 text-slate-300 self-start sm:self-auto">
                    STAGE {stepItem.step} OF 6
                  </span>
                </div>

                {/* Explanation */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {stepItem.explanation}
                </p>

                {/* Two Distinct Callouts: Associated Warning Sign & Relevant Prevention Advice */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  
                  {/* Associated Warning Sign */}
                  <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200/90 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-amber-300 text-[11px] uppercase tracking-wider font-mono">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      <span>Associated Warning Sign</span>
                    </div>
                    <p className="leading-relaxed text-[11px]">
                      {stepItem.warningSign}
                    </p>
                  </div>

                  {/* Relevant Prevention Advice */}
                  <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-200/90 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-300 text-[11px] uppercase tracking-wider font-mono">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Relevant Prevention Advice</span>
                    </div>
                    <p className="leading-relaxed text-[11px]">
                      {stepItem.preventionAdvice}
                    </p>
                  </div>

                </div>

                {/* Adversary Thought */}
                <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs font-mono text-slate-400 flex items-start gap-2">
                  <span className="text-rose-400 font-bold shrink-0">ADVERSARY REASONING:</span>
                  <span className="italic text-slate-300">"{stepItem.adversaryThought}"</span>
                </div>

              </div>
            );
          })}

        </div>
      </div>

      {/* Synthesis Takeaway Card */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
        <h3 className="text-sm font-bold text-slate-100 font-mono uppercase flex items-center gap-2">
          <Info className="w-4 h-4 text-sky-400" />
          Key Defensive Takeaway
        </h3>
        <p>
          Each individual piece of data Alex shared (college affiliation, city, attending a tech fest, username) appears completely innocent in isolation. But by assembling the pieces into a timeline, an attacker establishes instant credibility.
        </p>
        <p className="text-slate-400">
          Defense is not about disconnecting from the internet. Defense is about understanding what you project, decoupling public identities from sensitive authentication credentials, and validating unexpected requests through independent channels.
        </p>
      </div>

      {/* Screen Navigation Footer */}
      <div className="pt-2 flex items-center justify-between border-t border-slate-800">
        <button
          onClick={() => navigateTo('simulation')}
          className="text-xs font-mono text-slate-400 hover:text-sky-300 transition-colors"
        >
          ← Return to Attack Simulation
        </button>

        <button
          onClick={() => navigateTo('coach')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-xs bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all shadow-sm cursor-pointer"
        >
          <span>Proceed to Privacy Coach Remediation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
