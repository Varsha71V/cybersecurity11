import React, { useState } from 'react';
import { 
  Eye, 
  Terminal, 
  User, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Target, 
  Zap, 
  Crosshair,
  ExternalLink,
  ChevronRight,
  Shield,
  Layers,
  HelpCircle,
  FileText
} from 'lucide-react';
import { usePrivacy } from '../../context/PrivacyContext';
import { sounds } from '../../utils/audio';

export default function AttackerViewScreen() {
  const { profile, analysisResults, navigateTo } = usePrivacy();
  const [isAttackerMode, setIsAttackerMode] = useState(true);

  const toggleMode = (targetMode) => {
    sounds.playToggle();
    setIsAttackerMode(targetMode);
  };

  // Structured inferences with explicit attribution to supplied signals
  const inferencesWithAttribution = [
    {
      id: 'inf-1',
      title: 'Current Student or Active Department Affiliate',
      likelihood: 'High Probability',
      deduction: `Enrolled or affiliated with ${profile.college || 'institution'}. Routinely responsive to collegiate announcements and department IT communications.`,
      supportingSignals: ['College Affiliation', 'Recent Activity'],
      signalsValues: [`${profile.college}`, `"${profile.recentActivity}"`],
      adversaryValue: 'Enables impersonation of faculty deans, department registrars, or examination coordinators.'
    },
    {
      id: 'inf-2',
      title: 'Active Technical Community & Event Participant',
      likelihood: 'High Probability',
      deduction: `Confirmed attendee at "${profile.recentActivity}". High likelihood of expecting post-event certificates, Discord invites, or prize disbursements.`,
      supportingSignals: ['Recent Activity', 'Interests'],
      signalsValues: [`"${profile.recentActivity}"`, `"${profile.interests}"`],
      adversaryValue: 'Provides an urgent, topical pretext (e.g., "Confirm your hackathon prize eligibility before midnight").'
    },
    {
      id: 'inf-3',
      title: 'Predictable Physical Movement Corridor',
      likelihood: 'Medium-High Probability',
      deduction: `Based in ${profile.city} with ${profile.locationPosts.toLowerCase()} location check-ins. Regular commutes map study hubs and transit corridors.`,
      supportingSignals: ['City / Region', 'Location Posts'],
      signalsValues: [`${profile.city}`, `${profile.locationPosts} sharing`],
      adversaryValue: 'Facilitates timing-sensitive fraud calls claiming physical emergencies or campus incidents.'
    },
    {
      id: 'inf-4',
      title: 'Direct Perimeter-Bypass Contact Vector',
      likelihood: 'Definitive Signal',
      deduction: `Reachable via ${profile.emailVisible ? 'unfiltered public email' : ''}${profile.emailVisible && profile.phoneVisible ? ' and ' : ''}${profile.phoneVisible ? 'direct phone' : 'social direct messages'}.`,
      supportingSignals: ['Contact Visibility', 'Public Handle'],
      signalsValues: [
        `${profile.phoneVisible ? 'Phone exposed' : ''}${profile.phoneVisible && profile.emailVisible ? ' + ' : ''}${profile.emailVisible ? 'Email exposed' : 'Protected'}`,
        `@${profile.username}`
      ],
      adversaryValue: 'Allows direct spear-phishing or smishing bypassing enterprise email security gateways.'
    }
  ];

  // Concrete misuse scenarios based on correlated signals
  const potentialMisuseScenarios = [
    {
      id: 'scen-1',
      title: 'Targeted Spear-Phishing via Authority Pretext',
      vector: 'Institutional Spoofing',
      severity: 'HIGH RISK',
      severityColor: 'rose',
      mechanics: `An attacker crafts an email spoofed as "${profile.college} Student Affairs" with the subject "Action Required: Registration Verification for ${profile.recentActivity}".`,
      whyItWorks: 'Because the recipient genuinely attends that college and participated in that event, standard suspicion filters are lowered by up to 80%.'
    },
    {
      id: 'scen-2',
      title: 'Urgent SMS / Smishing Verification Lure',
      vector: 'Direct Mobile Channel',
      severity: profile.phoneVisible ? 'HIGH RISK' : 'MEDIUM RISK',
      severityColor: profile.phoneVisible ? 'rose' : 'amber',
      mechanics: `A spoofed text sent to your phone reads: "[${profile.college} Alert] Unusual login attempt from ${profile.city} IP. Tap here to secure your student portal."`,
      whyItWorks: 'Using accurate geographic and institutional tags creates acute panic, prompting immediate action on lookalike domains.'
    },
    {
      id: 'scen-3',
      title: 'Identity Impersonation & Lateral Social Engineering',
      vector: 'Peer Credential Harvesting',
      severity: 'MEDIUM RISK',
      severityColor: 'amber',
      mechanics: `Using handle @${profile.username} and documented interests in "${profile.interests}", an attacker clones your profile on Discord/Telegram to message project teammates for repo access keys.`,
      whyItWorks: 'Teammates recognize your real projects and assume the alternate account is your backup handle.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Screen Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-sky-400 mb-2">
            <span>STEP 05 OF 09</span>
            <span className="text-slate-600">·</span>
            <span>PERSPECTIVE COMPARISON</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
            <span>View As An Attacker</span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 font-medium">
              OSINT Reconnaissance Lens
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Understand the psychological and analytical difference between how a regular contact views your profile versus how a reconnaissance analyst evaluates the same signals.
          </p>
        </div>

        {/* Perspective Toggle Switch */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
          <button
            onClick={() => toggleMode(false)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              !isAttackerMode
                ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Normal View</span>
          </button>

          <button
            onClick={() => toggleMode(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              isAttackerMode
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-rose-400" />
            <span>Attacker View</span>
          </button>
        </div>
      </div>

      {/* Perspective Views */}
      {!isAttackerMode ? (
        /* NORMAL CASUAL SOCIAL PROFILE VIEW */
        <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-sm shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 font-bold text-xl">
                {profile.name?.charAt(0) || 'A'}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-100">{profile.name}</h2>
                <p className="text-xs font-mono text-sky-400">@{profile.username} · {profile.city}</p>
                <p className="text-xs text-slate-400 mt-0.5">{profile.ageRange} · Public Profile</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-800/80 text-slate-300 border border-slate-700">
              Casual Visitor Perspective
            </span>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <span className="text-[11px] text-slate-400 block uppercase font-mono mb-1.5">Profile Bio</span>
              <p className="text-slate-200 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 leading-relaxed font-sans">
                "{profile.bio}"
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/70">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">College / University</span>
                <span className="text-slate-200 font-semibold mt-0.5 block">{profile.college}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/70">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Recent Event / Activity</span>
                <span className="text-slate-200 font-semibold mt-0.5 block">{profile.recentActivity}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/70">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Stated Interests</span>
                <span className="text-slate-200 font-semibold mt-0.5 block">{profile.interests}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/70">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Location Sharing Frequency</span>
                <span className="text-slate-200 font-semibold mt-0.5 block">{profile.locationPosts} Sharing</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400 text-center sm:text-left">
              To a casual visitor, this profile represents a friendly, active, and standard student/developer presence.
            </p>
            <button
              onClick={() => toggleMode(true)}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 transition-colors cursor-pointer shrink-0"
            >
              Switch to Attacker Perspective →
            </button>
          </div>
        </div>
      ) : (
        /* ATTACKER OSINT RECONNAISSANCE DOSSIER */
        <div className="space-y-8 animate-fadeIn">
          
          {/* Concise Relationship Summary Bar */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 shadow-sm">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Threat Conversion Pipeline</span>
              <span className="text-slate-400">Zero database breach required</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center text-xs font-mono">
              <div className="p-3 rounded-lg bg-slate-950/80 border border-emerald-500/30 flex items-center gap-3">
                <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">1</span>
                <div>
                  <div className="text-[10px] text-emerald-400 font-bold uppercase">PUBLIC SIGNALS</div>
                  <div className="text-slate-200 font-medium">College, city, recent event, handle</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/80 border border-violet-500/30 flex items-center gap-3">
                <span className="w-6 h-6 rounded-md bg-violet-500/10 text-violet-400 flex items-center justify-center font-bold text-xs shrink-0">2</span>
                <div>
                  <div className="text-[10px] text-violet-400 font-bold uppercase">CORRELATION</div>
                  <div className="text-slate-200 font-medium">Cross-referencing timeline & affiliation</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/80 border border-rose-500/30 flex items-center gap-3">
                <span className="w-6 h-6 rounded-md bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold text-xs shrink-0">3</span>
                <div>
                  <div className="text-[10px] text-rose-400 font-bold uppercase">POTENTIAL RISK</div>
                  <div className="text-slate-200 font-medium">Tailored spear-phishing pretext</div>
                </div>
              </div>
            </div>
          </div>

          {/* THREE CLEARLY SEPARATED SECTIONS */}
          <div className="space-y-6">

            {/* SECTION 1: WHAT IS PUBLIC */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
                    01
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">
                      WHAT IS PUBLIC
                    </h2>
                    <p className="text-xs text-slate-400">
                      Raw signals explicitly and openly supplied in the user's profile
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-500/30">
                  Explicitly Supplied
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400">College Affiliation</span>
                  <div className="text-slate-200 font-semibold">{profile.college}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Geographic Base</span>
                  <div className="text-slate-200 font-semibold">{profile.city}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Public Activity / Event</span>
                  <div className="text-slate-200 font-semibold">{profile.recentActivity}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Account Handle</span>
                  <div className="text-sky-400 font-semibold font-mono">@{profile.username}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Stated Interests</span>
                  <div className="text-slate-200 font-semibold">{profile.interests}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Location Posts</span>
                  <div className="text-slate-200 font-semibold">{profile.locationPosts} Check-ins</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Contact Visibility</span>
                  <div className="text-slate-200 font-semibold">
                    {profile.phoneVisible ? 'Phone' : ''}{profile.phoneVisible && profile.emailVisible ? ' & ' : ''}{profile.emailVisible ? 'Email' : 'Private'}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Age Bracket</span>
                  <div className="text-slate-200 font-semibold">{profile.ageRange}</div>
                </div>
              </div>
            </div>

            {/* SECTION 2: WHAT COULD BE INFERRED */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-violet-500/10 text-violet-400 flex items-center justify-center font-mono font-bold text-xs">
                    02
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">
                      WHAT COULD BE INFERRED
                    </h2>
                    <p className="text-xs text-slate-400">
                      Potential inferences that may be drawn by correlating the supplied information
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-violet-300 bg-violet-950/40 px-2.5 py-1 rounded-md border border-violet-500/30">
                  Speculative Deductions · Possibilities
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inferencesWithAttribution.map((inf) => (
                  <div
                    key={inf.id}
                    className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-slate-200">
                        {inf.title}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-950/60 text-violet-300 border border-violet-500/20 shrink-0">
                        {inf.likelihood}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {inf.deduction}
                    </p>

                    {/* Explains which supplied signals support this inference */}
                    <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] space-y-1">
                      <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
                        <span>Supporting Supplied Signals:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {inf.signalsValues.map((val, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded bg-slate-800 text-sky-300 font-mono text-[10px] border border-slate-700"
                          >
                            {inf.supportingSignals[idx]}: <strong>{val}</strong>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400 leading-snug">
                      <span className="text-amber-400 font-semibold">Adversary Utility: </span>
                      {inf.adversaryValue}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 3: POTENTIAL MISUSE */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-rose-500/10 text-rose-400 flex items-center justify-center font-mono font-bold text-xs">
                    03
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide">
                      POTENTIAL MISUSE
                    </h2>
                    <p className="text-xs text-slate-400">
                      Illustrative ways correlated inferences could be mobilized in social-engineering attacks
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-rose-400 bg-rose-950/40 px-2.5 py-1 rounded-md border border-rose-500/30">
                  Simulated Threat Models
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {potentialMisuseScenarios.map((scen) => (
                  <div
                    key={scen.id}
                    className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase text-slate-400">
                          {scen.vector}
                        </span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          scen.severityColor === 'rose'
                            ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                            : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                        }`}>
                          {scen.severity}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-200">
                        {scen.title}
                      </h3>

                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800 font-mono">
                        {scen.mechanics}
                      </p>
                    </div>

                    <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
                      <span className="text-rose-400 font-medium">Why it bypasses suspicion: </span>
                      {scen.whyItWorks}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Educational Callout Banner */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold text-slate-200 block">
                Crucial Defense Principle: The Power of Contextual Triangulation
              </span>
              <p className="leading-relaxed">
                Notice that at no point was a password or private account credential required. By correlating your college affiliation, recent public activity, and communication handles, an attacker constructs a high-converting pretext in under 5 minutes.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Screen Navigation Footer */}
      <div className="pt-2 flex items-center justify-between border-t border-slate-800">
        <button
          onClick={() => navigateTo('dots')}
          className="text-xs font-mono text-slate-400 hover:text-sky-300 transition-colors"
        >
          ← Return to Connect the Dots
        </button>

        <button
          onClick={() => navigateTo('simulation')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-xs bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all shadow-sm cursor-pointer"
        >
          <span>Launch Interactive Attack Simulation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
