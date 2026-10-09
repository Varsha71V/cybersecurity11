import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert,
  MapPin,
  User,
  Share2,
  Phone,
  Lock,
  AlertTriangle,
  ChevronRight,
  ArrowRight,
  Info,
  X,
  ShieldCheck,
  Eye,
  BrainCircuit,
  Sparkles,
  Layers,
  ArrowUpRight,
  Activity,
  Globe,
  Wifi,
  Zap,
  Target,
  Radio,
  Shield
} from 'lucide-react';
import { usePrivacy } from '../../context/PrivacyContext';

/* ─── Animated World Map SVG (simplified continents) ─── */
function WorldMapSVG({ profile, categoryScores }) {
  const nodes = [
    { cx: 150, cy: 120, label: 'Identity', score: categoryScores.identity, color: '#38bdf8' },
    { cx: 310, cy: 85, label: 'Social', score: categoryScores.social, color: '#a855f7' },
    { cx: 480, cy: 130, label: 'Location', score: categoryScores.location, color: '#f59e0b' },
    { cx: 400, cy: 220, label: 'Contact', score: categoryScores.contact, color: '#f43f5e' },
    { cx: 230, cy: 200, label: 'Security', score: categoryScores.security, color: '#10b981' },
  ];

  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 3], [1, 4], [2, 4], [0, 2], [1, 3]
  ];

  return (
    <svg viewBox="0 0 620 300" className="w-full h-full" style={{ filter: 'drop-shadow(0 0 30px rgba(14, 165, 233, 0.15))' }}>
      <defs>
        <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(14, 165, 233, 0.08)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(14, 165, 233, 0.6)" />
          <stop offset="50%" stopColor="rgba(168, 85, 247, 0.4)" />
          <stop offset="100%" stopColor="rgba(14, 165, 233, 0.6)" />
        </linearGradient>
      </defs>

      <rect width="620" height="300" fill="url(#mapGlow)" />

      {/* Simplified world map continents as glowing outlines */}
      <g opacity="0.2" stroke="#38bdf8" fill="none" strokeWidth="0.8">
        {/* North America */}
        <path d="M80,60 Q90,50 110,48 Q130,42 145,50 Q155,55 160,65 Q165,80 155,95 Q145,110 130,115 Q115,118 105,125 Q95,130 85,125 Q75,115 72,100 Q70,85 75,70 Z" />
        {/* South America */}
        <path d="M120,150 Q130,145 140,148 Q148,155 150,170 Q152,185 145,200 Q138,215 130,225 Q122,230 118,220 Q112,205 110,190 Q108,175 112,160 Z" />
        {/* Europe */}
        <path d="M270,55 Q280,48 295,50 Q305,52 310,58 Q315,65 310,75 Q305,82 298,85 Q290,88 282,85 Q275,80 272,72 Q268,64 270,55 Z" />
        {/* Africa */}
        <path d="M285,100 Q295,95 305,98 Q315,105 318,120 Q320,138 315,155 Q308,170 298,178 Q288,180 280,172 Q275,160 273,145 Q272,128 275,115 Q278,105 285,100 Z" />
        {/* Asia */}
        <path d="M340,45 Q360,38 385,42 Q410,48 430,55 Q450,62 465,70 Q475,78 478,90 Q480,105 470,115 Q458,122 445,118 Q430,115 415,110 Q395,105 380,95 Q365,88 355,78 Q345,68 340,55 Z" />
        {/* Australia */}
        <path d="M470,180 Q485,175 500,178 Q512,185 515,198 Q510,210 500,215 Q488,218 478,212 Q470,205 468,195 Q467,188 470,180 Z" />
      </g>

      {/* Grid lines */}
      <g opacity="0.06" stroke="#38bdf8" strokeWidth="0.5">
        {[60, 120, 180, 240].map(y => (
          <line key={`h-${y}`} x1="20" y1={y} x2="600" y2={y} strokeDasharray="4 8" />
        ))}
        {[100, 200, 300, 400, 500].map(x => (
          <line key={`v-${x}`} x1={x} y1="20" x2={x} y2="280" strokeDasharray="4 8" />
        ))}
      </g>

      {/* Connection lines between nodes */}
      {connections.map(([from, to], i) => (
        <g key={`conn-${i}`}>
          <line
            x1={nodes[from].cx} y1={nodes[from].cy}
            x2={nodes[to].cx} y2={nodes[to].cy}
            stroke="url(#lineGrad)"
            strokeWidth="1"
            opacity="0.35"
            strokeDasharray="6 4"
          >
            <animate attributeName="stroke-dashoffset" values="0;20" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
          </line>
        </g>
      ))}

      {/* Data flow particles along connections */}
      {connections.slice(0, 5).map(([from, to], i) => (
        <circle key={`particle-${i}`} r="2" fill="#38bdf8" opacity="0.7" filter="url(#softGlow)">
          <animateMotion
            dur={`${4 + i}s`}
            repeatCount="indefinite"
            path={`M${nodes[from].cx},${nodes[from].cy} L${nodes[to].cx},${nodes[to].cy}`}
          />
        </circle>
      ))}

      {/* Network nodes */}
      {nodes.map((node, i) => (
        <g key={`node-${i}`} filter="url(#glow)">
          {/* Outer pulse ring */}
          <circle cx={node.cx} cy={node.cy} r="18" fill="none" stroke={node.color} strokeWidth="0.5" opacity="0.3">
            <animate attributeName="r" values="18;28;18" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.05;0.3" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
          {/* Inner solid node */}
          <circle cx={node.cx} cy={node.cy} r="6" fill={node.color} opacity="0.9" />
          <circle cx={node.cx} cy={node.cy} r="3" fill="#fff" opacity="0.8" />
          {/* Label */}
          <text
            x={node.cx}
            y={node.cy - 18}
            textAnchor="middle"
            fill={node.color}
            fontSize="9"
            fontFamily="monospace"
            fontWeight="600"
            opacity="0.9"
          >
            {node.label}
          </text>
          {/* Score */}
          <text
            x={node.cx}
            y={node.cy + 25}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="8"
            fontFamily="monospace"
          >
            {node.score}%
          </text>
        </g>
      ))}

      {/* Central "YOU" node */}
      <g filter="url(#glow)">
        <circle cx="310" cy="150" r="20" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.4">
          <animate attributeName="r" values="20;32;20" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="310" cy="150" r="12" fill="rgba(6, 182, 212, 0.15)" stroke="#06b6d4" strokeWidth="1.5" />
        <circle cx="310" cy="150" r="4" fill="#06b6d4" />
        <text x="310" y="145" textAnchor="middle" fill="#06b6d4" fontSize="6" fontFamily="monospace" fontWeight="700">
          TARGET
        </text>
        <text x="310" y="155" textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace" fontWeight="700">
          @{profile.username}
        </text>
      </g>

      {/* Scanning line effect */}
      <line x1="20" y1="0" x2="20" y2="300" stroke="#06b6d4" strokeWidth="1" opacity="0.08">
        <animate attributeName="x1" values="20;600;20" dur="8s" repeatCount="indefinite" />
        <animate attributeName="x2" values="20;600;20" dur="8s" repeatCount="indefinite" />
      </line>
    </svg>
  );
}

/* ─── Animated Signal Bars ─── */
function SignalBars({ value, max = 100, color = '#38bdf8', height = 32 }) {
  const bars = 8;
  const filled = Math.round((value / max) * bars);
  return (
    <div className="flex items-end gap-[2px]" style={{ height }}>
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className="rounded-sm transition-all duration-500"
          style={{
            width: 3,
            height: `${20 + (i / bars) * 80}%`,
            backgroundColor: i < filled ? color : 'rgba(51, 65, 85, 0.4)',
            opacity: i < filled ? 0.9 : 0.3,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Threat Level Indicator Ring ─── */
function ThreatRing({ score, size = 100 }) {
  const radius = (size / 2) - 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 70 ? '#f43f5e' : score >= 45 ? '#f59e0b' : '#10b981';

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="rgba(51, 65, 85, 0.3)" strokeWidth="3"
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color} strokeWidth="3"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000"
          style={{ filter: `drop-shadow(0 0 6px ${color}50)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-black font-mono text-white">{score}</span>
        <span className="text-[7px] font-mono text-slate-400 uppercase tracking-widest">INDEX</span>
      </div>
    </div>
  );
}

/* ═════════════════ MAIN DASHBOARD COMPONENT ═════════════════ */
export default function ExposureDashboardScreen() {
  const { analysisResults, profile, navigateTo } = usePrivacy();
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [time, setTime] = useState(new Date());

  const { overallScore, severityTier, categoryScores, topRisks, attackSurface } = analysisResults;

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getScoreColor = (score) => {
    if (score >= 70) return '#f43f5e';
    if (score >= 45) return '#f59e0b';
    return '#10b981';
  };

  const categories = [
    { key: 'identity', label: 'IDENTITY', icon: User, color: '#38bdf8' },
    { key: 'location', label: 'LOCATION', icon: MapPin, color: '#f59e0b' },
    { key: 'social', label: 'SOCIAL', icon: Share2, color: '#a855f7' },
    { key: 'contact', label: 'CONTACT', icon: Phone, color: '#f43f5e' },
    { key: 'security', label: 'ACCOUNT', icon: Lock, color: '#10b981' },
  ];

  return (
    <div className="w-full px-3 sm:px-4 lg:px-6 py-4 space-y-4" style={{ maxWidth: '1600px', margin: '0 auto' }}>

      {/* ─── TOP STATUS BAR ─── */}
      <div className="flex items-center justify-between px-4 py-2.5 rounded-lg border border-slate-800/60"
           style={{ background: 'linear-gradient(135deg, rgba(13, 21, 39, 0.9), rgba(7, 10, 19, 0.95))' }}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">SYSTEM ONLINE</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-slate-700" />
          <span className="hidden sm:block text-[10px] font-mono text-slate-500">
            {time.toLocaleTimeString('en-US', { hour12: false })} UTC
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-2.5 py-1 rounded border border-slate-700/60 bg-slate-900/60">
            <span className="text-[10px] font-mono text-slate-400">TARGET: </span>
            <span className="text-[10px] font-mono text-cyan-400 font-semibold">@{profile.username}</span>
          </div>
          <div className="px-2.5 py-1 rounded border border-slate-700/60 bg-slate-900/60">
            <span className="text-[10px] font-mono text-slate-400">SEVERITY: </span>
            <span className="text-[10px] font-mono font-semibold" style={{ color: getScoreColor(overallScore) }}>
              {severityTier}
            </span>
          </div>
        </div>
      </div>

      {/* ─── MAIN 3-COLUMN GRID ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">

        {/* ════ LEFT COLUMN: Exposure Signals ════ */}
        <div className="lg:col-span-3 space-y-3">

          {/* Panel: Exposure Score */}
          <div className="rounded-lg border border-slate-800/60 overflow-hidden"
               style={{ background: 'linear-gradient(180deg, rgba(13, 21, 39, 0.95), rgba(7, 10, 19, 0.9))' }}>
            <div className="px-3 py-2 border-b border-slate-800/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-3 h-3 text-cyan-400" />
                <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-semibold">Threat Index</span>
              </div>
              <X className="w-3 h-3 text-slate-600" />
            </div>
            <div className="p-4 flex flex-col items-center">
              <ThreatRing score={overallScore} size={110} />
              <div className="mt-3 text-center">
                <div className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full inline-block"
                     style={{
                       color: getScoreColor(overallScore),
                       backgroundColor: `${getScoreColor(overallScore)}15`,
                       border: `1px solid ${getScoreColor(overallScore)}30`
                     }}>
                  {overallScore >= 70 ? 'CRITICAL' : overallScore >= 45 ? 'ELEVATED' : 'NOMINAL'}
                </div>
              </div>
            </div>
          </div>

          {/* Panel: Exposure Signals List */}
          <div className="rounded-lg border border-slate-800/60 overflow-hidden"
               style={{ background: 'linear-gradient(180deg, rgba(13, 21, 39, 0.95), rgba(7, 10, 19, 0.9))' }}>
            <div className="px-3 py-2 border-b border-slate-800/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-3 h-3 text-cyan-400" />
                <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-semibold">Exposure Signals</span>
              </div>
              <X className="w-3 h-3 text-slate-600" />
            </div>
            <div className="p-2 space-y-1">
              {categories.map((cat, i) => {
                const score = categoryScores[cat.key];
                const Icon = cat.icon;
                return (
                  <div key={cat.key} className="flex items-center gap-2 px-2.5 py-2 rounded hover:bg-slate-800/30 transition-colors group">
                    <div className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: `${cat.color}15` }}>
                      <Icon className="w-3 h-3" style={{ color: cat.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-300 font-medium">{cat.label}</span>
                        <span className="text-[10px] font-mono font-bold" style={{ color: cat.color }}>{score}%</span>
                      </div>
                      <div className="w-full h-1 bg-slate-800 rounded-full mt-1 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${score}%`, backgroundColor: cat.color, boxShadow: `0 0 8px ${cat.color}40` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Panel: Profile Intel */}
          <div className="rounded-lg border border-slate-800/60 overflow-hidden"
               style={{ background: 'linear-gradient(180deg, rgba(13, 21, 39, 0.95), rgba(7, 10, 19, 0.9))' }}>
            <div className="px-3 py-2 border-b border-slate-800/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-3 h-3 text-cyan-400" />
                <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-semibold">Profile Intel</span>
              </div>
              <X className="w-3 h-3 text-slate-600" />
            </div>
            <div className="p-3 space-y-2">
              {[
                { label: 'Handle', value: `@${profile.username}`, color: '#06b6d4' },
                { label: 'Affiliation', value: profile.college || '—', color: '#38bdf8' },
                { label: 'City', value: profile.city || '—', color: '#818cf8' },
                { label: 'Activity', value: profile.recentActivity || '—', color: '#a855f7' },
                { label: '2FA', value: profile.twoFactorEnabled ? 'ENABLED' : 'DISABLED', color: profile.twoFactorEnabled ? '#10b981' : '#f43f5e' },
                { label: 'Location', value: profile.locationPosts, color: '#f59e0b' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-500">{item.label}</span>
                  <span className="font-semibold truncate max-w-[120px]" style={{ color: item.color }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════ CENTER COLUMN: Digital Monitoring Map ════ */}
        <div className="lg:col-span-6 space-y-3">

          {/* Main Header */}
          <div className="rounded-lg border border-slate-800/60 overflow-hidden"
               style={{ background: 'linear-gradient(180deg, rgba(13, 21, 39, 0.95), rgba(7, 10, 19, 0.9))' }}>
            <div className="px-4 py-3 border-b border-slate-800/60 flex items-center justify-between">
              <div>
                <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <Globe className="w-5 h-5 text-cyan-400" />
                  Digital Monitoring
                </h1>
                <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                  Real-time exposure surface visualization · {profile.name}'s digital footprint network
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-slate-500 px-2 py-0.5 rounded border border-slate-700/50 bg-slate-900/50">
                  Map
                </span>
                <span className="text-[9px] font-mono text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/30 bg-cyan-500/10">
                  Network
                </span>
              </div>
            </div>

            {/* World Map Visualization */}
            <div className="relative p-2" style={{ minHeight: '280px' }}>
              <WorldMapSVG profile={profile} categoryScores={categoryScores} />

              {/* Corner decorative brackets */}
              <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-cyan-500/30" />
              <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-cyan-500/30" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-cyan-500/30" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-cyan-500/30" />
            </div>

            {/* Sub-stats row beneath map */}
            <div className="px-4 py-2.5 border-t border-slate-800/60 grid grid-cols-4 gap-2">
              {[
                { label: 'Threat Score', value: `${overallScore}/100`, color: getScoreColor(overallScore) },
                { label: 'Attack Vectors', value: attackSurface.filter(a => a.level === 'HIGH').length, color: '#f43f5e' },
                { label: 'Data Points', value: '12', color: '#a855f7' },
                { label: 'Risk Level', value: overallScore >= 70 ? 'HIGH' : overallScore >= 45 ? 'MED' : 'LOW', color: getScoreColor(overallScore) },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-[8px] font-mono text-slate-500 uppercase tracking-wider">{stat.label}</div>
                  <div className="text-sm font-mono font-bold mt-0.5" style={{ color: stat.color }}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row: 4 Analysis Panels */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

            {/* Panel 1: Attack Vectors */}
            <div className="rounded-lg border border-slate-800/60 overflow-hidden"
                 style={{ background: 'linear-gradient(180deg, rgba(13, 21, 39, 0.95), rgba(7, 10, 19, 0.9))' }}>
              <div className="px-3 py-2 border-b border-slate-800/60 flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase text-slate-400 tracking-wider font-semibold">Vectors</span>
                <X className="w-2.5 h-2.5 text-slate-600" />
              </div>
              <div className="p-2.5 space-y-1.5">
                {attackSurface.slice(0, 4).map((atk, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${atk.level === 'HIGH' ? 'bg-rose-400' : 'bg-amber-400'}`} />
                      <span className="text-[9px] font-mono text-slate-400 truncate max-w-[80px]">{atk.type.split('(')[0].trim().slice(0, 14)}</span>
                    </div>
                    <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${atk.score}%`,
                          backgroundColor: atk.level === 'HIGH' ? '#f43f5e' : '#f59e0b'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Panel 2: Signal Monitoring */}
            <div className="rounded-lg border border-slate-800/60 overflow-hidden"
                 style={{ background: 'linear-gradient(180deg, rgba(13, 21, 39, 0.95), rgba(7, 10, 19, 0.9))' }}>
              <div className="px-3 py-2 border-b border-slate-800/60 flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase text-slate-400 tracking-wider font-semibold">Monitoring</span>
                <X className="w-2.5 h-2.5 text-slate-600" />
              </div>
              <div className="p-2.5 flex flex-col items-center justify-center gap-2" style={{ minHeight: '90px' }}>
                <div className="flex items-end gap-[3px]">
                  {[40, 65, 85, 55, 72, 90, 45, 78, 60, 88, 50, 70].map((h, i) => (
                    <div key={i} className="rounded-sm transition-all" style={{
                      width: 4, height: `${h * 0.5}px`,
                      backgroundColor: h > 75 ? '#a855f7' : '#38bdf8',
                      opacity: 0.7
                    }} />
                  ))}
                </div>
                <span className="text-[8px] font-mono text-slate-500">SIGNAL FREQUENCY</span>
              </div>
            </div>

            {/* Panel 3: Risk Regions */}
            <div className="rounded-lg border border-slate-800/60 overflow-hidden"
                 style={{ background: 'linear-gradient(180deg, rgba(13, 21, 39, 0.95), rgba(7, 10, 19, 0.9))' }}>
              <div className="px-3 py-2 border-b border-slate-800/60 flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase text-slate-400 tracking-wider font-semibold">Regions</span>
                <X className="w-2.5 h-2.5 text-slate-600" />
              </div>
              <div className="p-2.5 space-y-1.5">
                {[
                  { name: profile.city || 'Primary', pct: 68, color: '#f43f5e' },
                  { name: 'Social Net', pct: 45, color: '#a855f7' },
                  { name: 'Campus', pct: 72, color: '#38bdf8' },
                  { name: 'Cloud Svc', pct: 30, color: '#10b981' },
                ].map((r, i) => (
                  <div key={i} className="flex items-center justify-between text-[9px] font-mono">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: r.color }} />
                      <span className="text-slate-400">{r.name}</span>
                    </div>
                    <span style={{ color: r.color }} className="font-semibold">{r.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Panel 4: Powerbank / Defenses */}
            <div className="rounded-lg border border-slate-800/60 overflow-hidden"
                 style={{ background: 'linear-gradient(180deg, rgba(13, 21, 39, 0.95), rgba(7, 10, 19, 0.9))' }}>
              <div className="px-3 py-2 border-b border-slate-800/60 flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase text-slate-400 tracking-wider font-semibold">Defenses</span>
                <X className="w-2.5 h-2.5 text-slate-600" />
              </div>
              <div className="p-2.5 flex flex-col items-center gap-2" style={{ minHeight: '90px' }}>
                <ThreatRing score={categoryScores.security} size={60} />
                <div className="text-center">
                  <span className="text-[8px] font-mono text-slate-500 block">ACCOUNT HEALTH</span>
                  <span className="text-[10px] font-mono font-bold" style={{ color: categoryScores.security >= 60 ? '#10b981' : '#f43f5e' }}>
                    {categoryScores.security >= 60 ? 'HARDENED' : 'VULNERABLE'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ════ RIGHT COLUMN: Exposure Intelligence ════ */}
        <div className="lg:col-span-3 space-y-3">

          {/* Panel: Quick Stats */}
          <div className="rounded-lg border border-slate-800/60 overflow-hidden"
               style={{ background: 'linear-gradient(180deg, rgba(13, 21, 39, 0.95), rgba(7, 10, 19, 0.9))' }}>
            <div className="px-3 py-2 border-b border-slate-800/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-3 h-3 text-cyan-400" />
                <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-semibold">Threat Summary</span>
              </div>
              <X className="w-3 h-3 text-slate-600" />
            </div>
            <div className="p-3 grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded bg-slate-900/50 border border-slate-800/40 text-center">
                <div className="text-lg font-black font-mono" style={{ color: getScoreColor(overallScore) }}>{overallScore}</div>
                <div className="text-[8px] font-mono text-slate-500 uppercase">Overall</div>
              </div>
              <div className="p-2.5 rounded bg-slate-900/50 border border-slate-800/40 text-center">
                <div className="text-lg font-black font-mono text-rose-400">{topRisks.filter(r => r.severity === 'HIGH').length}</div>
                <div className="text-[8px] font-mono text-slate-500 uppercase">High Risks</div>
              </div>
              <div className="p-2.5 rounded bg-slate-900/50 border border-slate-800/40 text-center">
                <div className="text-lg font-black font-mono text-amber-400">{topRisks.filter(r => r.severity === 'MEDIUM').length}</div>
                <div className="text-[8px] font-mono text-slate-500 uppercase">Med Risks</div>
              </div>
              <div className="p-2.5 rounded bg-slate-900/50 border border-slate-800/40 text-center">
                <div className="text-lg font-black font-mono text-cyan-400">5</div>
                <div className="text-[8px] font-mono text-slate-500 uppercase">Vectors</div>
              </div>
            </div>
          </div>

          {/* Panel: Security Posture */}
          <div className="rounded-lg border border-slate-800/60 overflow-hidden"
               style={{ background: 'linear-gradient(180deg, rgba(13, 21, 39, 0.95), rgba(7, 10, 19, 0.9))' }}>
            <div className="px-3 py-2 border-b border-slate-800/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-3 h-3 text-cyan-400" />
                <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-semibold">Security Posture</span>
              </div>
              <X className="w-3 h-3 text-slate-600" />
            </div>
            <div className="p-3 flex flex-col items-center gap-3">
              {/* Profile avatar area */}
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
                     style={{
                       borderColor: getScoreColor(overallScore),
                       backgroundColor: `${getScoreColor(overallScore)}10`,
                       boxShadow: `0 0 20px ${getScoreColor(overallScore)}20`
                     }}>
                  <User className="w-7 h-7" style={{ color: getScoreColor(overallScore) }} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-mono font-bold"
                     style={{
                       backgroundColor: getScoreColor(overallScore),
                       color: '#070a13'
                     }}>
                  {overallScore}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs font-semibold text-white">{profile.name}</div>
                <div className="text-[10px] font-mono text-slate-400">@{profile.username}</div>
              </div>
              {/* Security indicators */}
              <div className="w-full space-y-1.5">
                {[
                  { label: 'Phone Exposed', val: profile.phoneVisible, bad: true },
                  { label: 'Email Exposed', val: profile.emailVisible, bad: true },
                  { label: '2FA Protection', val: profile.twoFactorEnabled, bad: false },
                  { label: 'Password Unique', val: !profile.passwordReuse, bad: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-[10px] font-mono px-1">
                    <span className="text-slate-400">{item.label}</span>
                    <span className={`font-semibold ${
                      item.bad
                        ? (item.val ? 'text-rose-400' : 'text-emerald-400')
                        : (item.val ? 'text-emerald-400' : 'text-rose-400')
                    }`}>
                      {item.bad
                        ? (item.val ? '⚠ YES' : '✓ NO')
                        : (item.val ? '✓ YES' : '⚠ NO')
                      }
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Panel: Top Findings */}
          <div className="rounded-lg border border-slate-800/60 overflow-hidden"
               style={{ background: 'linear-gradient(180deg, rgba(13, 21, 39, 0.95), rgba(7, 10, 19, 0.9))' }}>
            <div className="px-3 py-2 border-b border-slate-800/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-3 h-3 text-amber-400" />
                <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-semibold">Top Findings</span>
              </div>
              <X className="w-3 h-3 text-slate-600" />
            </div>
            <div className="p-2 space-y-1">
              {topRisks.map((risk, idx) => (
                <button
                  key={risk.id}
                  onClick={() => setSelectedRisk(risk)}
                  className="w-full text-left p-2 rounded hover:bg-slate-800/30 transition-all cursor-pointer group flex items-start gap-2"
                >
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                    risk.severity === 'HIGH' ? 'bg-rose-400' : 'bg-amber-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-semibold text-slate-300 group-hover:text-cyan-300 transition-colors line-clamp-1 block">
                      {risk.title}
                    </span>
                    <span className="text-[9px] text-slate-500 line-clamp-1 block">{risk.summary.slice(0, 60)}…</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 mt-1 shrink-0 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Panel: Quick Actions */}
          <div className="rounded-lg border border-slate-800/60 overflow-hidden"
               style={{ background: 'linear-gradient(180deg, rgba(13, 21, 39, 0.95), rgba(7, 10, 19, 0.9))' }}>
            <div className="px-3 py-2 border-b border-slate-800/60">
              <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-semibold">Quick Actions</span>
            </div>
            <div className="p-2 space-y-1">
              {[
                { label: 'Connection Graph', screen: 'dots', icon: Share2, color: '#38bdf8' },
                { label: 'Attacker View', screen: 'attacker', icon: Eye, color: '#f43f5e' },
                { label: 'Privacy Coach', screen: 'coach', icon: ShieldCheck, color: '#10b981' },
              ].map((action, i) => {
                const Icon = action.icon;
                return (
                  <button
                    key={i}
                    onClick={() => navigateTo(action.screen)}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded hover:bg-slate-800/30 transition-all cursor-pointer group"
                  >
                    <div className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: `${action.color}15` }}>
                      <Icon className="w-3 h-3" style={{ color: action.color }} />
                    </div>
                    <span className="text-[10px] font-mono text-slate-300 group-hover:text-white transition-colors font-medium flex-1 text-left">
                      {action.label}
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ─── BOTTOM NAVIGATION BAR ─── */}
      <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-slate-800/60"
           style={{ background: 'linear-gradient(135deg, rgba(13, 21, 39, 0.9), rgba(7, 10, 19, 0.95))' }}>
        <button
          onClick={() => navigateTo('profile')}
          className="text-[10px] font-mono text-slate-400 hover:text-slate-200 transition-colors cursor-pointer flex items-center gap-1"
        >
          ← Adjust Profile
        </button>
        <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-500">
          <span>Privacy Mirror</span>
          <span className="text-slate-700">|</span>
          <span>Exposure Detection v2.0</span>
        </div>
        <button
          onClick={() => navigateTo('dots')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-[10px] font-mono transition-all cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
            color: '#030711',
            boxShadow: '0 0 15px rgba(14, 165, 233, 0.25)'
          }}
        >
          <span>CONNECT THE DOTS →</span>
        </button>
      </div>

      {/* ─── Risk Detail Modal ─── */}
      {selectedRisk && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedRisk.title}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          onClick={() => setSelectedRisk(null)}
        >
          <div
            className="w-full max-w-lg rounded-lg border border-slate-700/60 shadow-2xl overflow-hidden"
            style={{ background: 'linear-gradient(180deg, rgba(13, 21, 39, 0.98), rgba(7, 10, 19, 0.98))' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-3 border-b border-slate-800/60 flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="font-bold text-sm text-slate-100">{selectedRisk.title}</h3>
                  <span className="text-[10px] font-mono text-slate-400">
                    {selectedRisk.category} · {selectedRisk.severity}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelectedRisk(null)} className="p-1 rounded hover:bg-slate-800 cursor-pointer">
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <span className="text-[9px] font-mono uppercase text-cyan-400 font-bold tracking-wider block mb-1.5">EXPLOITATION MECHANISM</span>
                <p className="text-xs text-slate-300 leading-relaxed p-3 rounded bg-slate-900/50 border border-slate-800/40">
                  {selectedRisk.explanation}
                </p>
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase text-amber-400 font-bold tracking-wider block mb-1.5">ATTACK PRETEXT SCENARIO</span>
                <p className="text-[11px] font-mono text-amber-200/90 p-3 rounded bg-amber-950/20 border border-amber-500/30">
                  "{selectedRisk.exploitScenario}"
                </p>
              </div>
            </div>

            <div className="px-5 py-3 border-t border-slate-800/60 flex justify-end">
              <button
                onClick={() => setSelectedRisk(null)}
                className="px-4 py-2 rounded text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer font-mono"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
