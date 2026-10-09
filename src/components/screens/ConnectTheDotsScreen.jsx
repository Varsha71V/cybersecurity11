import React, { useState, useEffect } from 'react';
import { 
  Share2, 
  ArrowRight, 
  ShieldAlert, 
  Zap, 
  Info, 
  Layers, 
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  ExternalLink,
  Crosshair,
  Filter
} from 'lucide-react';
import { usePrivacy } from '../../context/PrivacyContext';
import { sounds } from '../../utils/audio';

export default function ConnectTheDotsScreen() {
  const { analysisResults, profile, navigateTo } = usePrivacy();
  const [selectedVector, setSelectedVector] = useState(null);
  const [activeNodeId, setActiveNodeId] = useState('college');
  const [pulseTick, setPulseTick] = useState(0);

  const { graphNodes, graphVectors, attackSurface } = analysisResults;

  // Gentle pulse animation for active data cables
  useEffect(() => {
    const timer = setInterval(() => {
      setPulseTick((p) => (p + 1) % 100);
    }, 60);
    return () => clearInterval(timer);
  }, []);

  // Center coordinate on 760x520 canvas
  const centerCoord = { x: 380, y: 260 };

  // Well-balanced coordinate distribution with clear margins to prevent clipping
  const orbitalCoordinates = {
    college: { x: 190, y: 110, kind: 'supplied', category: 'Identity' },
    event: { x: 380, y: 75, kind: 'supplied', category: 'Public Activity' },
    interests: { x: 570, y: 110, kind: 'supplied', category: 'Interests' },
    username: { x: 620, y: 260, kind: 'supplied', category: 'Account Handle' },
    contact: { x: 550, y: 415, kind: 'supplied', category: 'Contact Visibility' },
    location: { x: 380, y: 445, kind: 'supplied', category: 'Location Posts' },
    city: { x: 210, y: 415, kind: 'supplied', category: 'Geographic Context' },
  };

  // Node classification for legend & contextual details
  const getNodeDetails = (nodeId) => {
    const rawNode = graphNodes.find(n => n.id === nodeId);
    const pos = orbitalCoordinates[nodeId];
    if (!rawNode) return null;

    // Associated vectors
    const connectedVectors = graphVectors.filter(
      v => v.source === nodeId || v.target === nodeId
    );

    // Contextual defense guidance
    const mitigationMap = {
      college: {
        kind: 'supplied',
        whyMatters: 'Listing your specific college or faculty provides high-authenticity pretexts for impersonating academic deans, IT helpdesks, or exam boards.',
        countermeasure: 'Restrict educational affiliations to verified professional networks (e.g. LinkedIn connections only) instead of open public bios.'
      },
      city: {
        kind: 'supplied',
        whyMatters: 'Revealing your home city narrows down regional social engineering templates, local financial institutions, and physical proximity targets.',
        countermeasure: 'Avoid combining city of residence with real-time location check-ins and transit updates.'
      },
      event: {
        kind: 'supplied',
        whyMatters: 'Event attendance creates tight time-sensitive urgency windows (e.g., fake organizer notifications or counterfeit hackathon prize links).',
        countermeasure: 'Share event retrospectives after the conference has concluded rather than announcing live schedules in real time.'
      },
      interests: {
        kind: 'supplied',
        whyMatters: 'Niche interests allow attackers to craft tailored bait (e.g. specialized developer tools, conference passes, or targeted malware disguised as tools).',
        countermeasure: 'Verify incoming invitations from community forums independently without clicking unsolicited download links.'
      },
      username: {
        kind: 'supplied',
        whyMatters: 'A reused username across services allows OSINT scrapers to correlate multiple accounts and build a unified psychological profile.',
        countermeasure: 'Use distinct usernames for academic/professional personas versus casual gaming or open discussion boards.'
      },
      location: {
        kind: 'supplied',
        whyMatters: 'Frequent check-ins establish predictable physical habits and reveal when you are away from trusted environments or homes.',
        countermeasure: 'Disable automated GPS check-ins; post photos with location tags only after leaving the venue.'
      },
      contact: {
        kind: 'supplied',
        whyMatters: 'Public phone numbers and emails provide direct bypass around enterprise spam filters for direct SMS smishing and spear-phishing.',
        countermeasure: 'Set personal phone numbers to private and use alias forwarding addresses for public directory listings.'
      }
    };

    const details = mitigationMap[nodeId] || {
      kind: 'supplied',
      whyMatters: 'Publicly indexed data can be harvested and combined with secondary leak records.',
      countermeasure: 'Regularly audit public profile visibility and remove unneeded identifiers.'
    };

    return {
      ...rawNode,
      category: pos?.category || rawNode.category,
      kind: details.kind,
      whyMatters: details.whyMatters,
      countermeasure: details.countermeasure,
      connectedVectors
    };
  };

  const handleSelectNode = (nodeId) => {
    sounds.playClick();
    setActiveNodeId(nodeId);
    // Find matching vector connected to this node to keep intelligence panel synchronized
    const matching = graphVectors.find(v => v.source === nodeId || v.target === nodeId);
    if (matching) {
      setSelectedVector(matching);
    }
  };

  const handleSelectVector = (vec) => {
    sounds.playScanPing();
    setSelectedVector(vec);
    setActiveNodeId(vec.source);
  };

  const activeNodeInfo = getNodeDetails(activeNodeId) || getNodeDetails('college');
  const activeVectorInfo = selectedVector || graphVectors[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Screen Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-sky-400 mb-2">
            <span>STEP 04 OF 09</span>
            <span className="text-slate-600">·</span>
            <span>THREAT CORRELATION GRAPH</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
            <span>Connect the Dots</span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20 font-medium">
              Intelligence Graph
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            See how isolated, seemingly harmless public data signals correlate into structured reconnaissance pathways and actionable social-engineering pretexts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setActiveNodeId('college');
              setSelectedVector(graphVectors[0]);
              sounds.playClick();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
            title="Reset Graph Selection"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset View</span>
          </button>
          
          <button
            onClick={() => navigateTo('attacker')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-xs bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all shadow-sm cursor-pointer"
          >
            <span>Proceed to Attacker View</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Intelligence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Interactive Canvas / SVG Node Graph */}
        <div className="lg:col-span-8 rounded-2xl bg-slate-900/70 border border-slate-800/80 p-5 backdrop-blur-sm flex flex-col space-y-4">
          
          {/* Graph Toolbar & Legend */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Crosshair className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-semibold text-slate-300">Entity Correlation Matrix</span>
              <span className="text-slate-600">|</span>
              <span className="text-[11px] text-slate-400">Click any node or connector cable</span>
            </div>

            {/* Compact Legend */}
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-emerald-300/40" />
                <span>Supplied Data</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-400 border border-violet-300/40" />
                <span>Inferred Link</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 border border-rose-300/40" />
                <span>Simulated Risk</span>
              </div>
            </div>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="relative w-full aspect-[76/52] max-h-[500px] bg-slate-950/60 rounded-xl border border-slate-800/50 overflow-hidden flex items-center justify-center">
            
            <svg 
              viewBox="0 0 760 520" 
              className="w-full h-full select-none"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Enterprise Gradients & Filters */}
                <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>

                <linearGradient id="cableActiveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#fb7185" />
                </linearGradient>

                <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background Concentric Radar Guidance Rings */}
              <circle cx={centerCoord.x} cy={centerCoord.y} r="210" className="fill-none stroke-slate-800/40" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx={centerCoord.x} cy={centerCoord.y} r="140" className="fill-none stroke-slate-800/60" strokeWidth="1" />
              <circle cx={centerCoord.x} cy={centerCoord.y} r="70" className="fill-none stroke-slate-800/30" strokeWidth="1" strokeDasharray="2 2" />

              {/* Spoke Cables from Center Node to all Orbital Attributes */}
              {Object.entries(orbitalCoordinates).map(([key, coord]) => {
                const isNodeActive = activeNodeId === key;
                return (
                  <line
                    key={`spoke-${key}`}
                    x1={centerCoord.x}
                    y1={centerCoord.y}
                    x2={coord.x}
                    y2={coord.y}
                    stroke={isNodeActive ? 'rgba(56, 189, 248, 0.4)' : 'rgba(51, 65, 85, 0.35)'}
                    strokeWidth={isNodeActive ? '1.75' : '1'}
                    strokeDasharray={isNodeActive ? 'none' : '3 3'}
                  />
                );
              })}

              {/* Cross-correlating Attack Surface Cables */}
              {graphVectors.map((vec) => {
                const src = orbitalCoordinates[vec.source];
                const dst = orbitalCoordinates[vec.target];
                if (!src || !dst) return null;

                const isSelected = selectedVector?.id === vec.id;
                const isRelevantToActiveNode = activeNodeId === vec.source || activeNodeId === vec.target;

                // Position calculation for animated packet
                const ratio = ((pulseTick + (vec.id === 'vec-1' ? 0 : vec.id === 'vec-2' ? 25 : vec.id === 'vec-3' ? 50 : 75)) % 100) / 100;
                const packetX = src.x + (dst.x - src.x) * ratio;
                const packetY = src.y + (dst.y - src.y) * ratio;

                return (
                  <g key={vec.id} onClick={() => handleSelectVector(vec)} className="cursor-pointer group">
                    {/* Broad transparent stroke for easy hover/clicking */}
                    <line
                      x1={src.x}
                      y1={src.y}
                      x2={dst.x}
                      y2={dst.y}
                      stroke="transparent"
                      strokeWidth="20"
                    />

                    {/* Threat Cable */}
                    <line
                      x1={src.x}
                      y1={src.y}
                      x2={dst.x}
                      y2={dst.y}
                      stroke={
                        isSelected 
                          ? '#f43f5e' 
                          : isRelevantToActiveNode 
                            ? '#a855f7' 
                            : 'rgba(56, 189, 248, 0.45)'
                      }
                      strokeWidth={isSelected ? '2.5' : isRelevantToActiveNode ? '2' : '1.25'}
                      strokeDasharray={isSelected ? 'none' : '4 3'}
                      className="transition-all duration-200"
                    />

                    {/* Threat Badge Marker at Midpoint */}
                    <circle
                      cx={(src.x + dst.x) / 2}
                      cy={(src.y + dst.y) / 2}
                      r={isSelected ? '6' : '4'}
                      fill={isSelected ? '#f43f5e' : isRelevantToActiveNode ? '#a855f7' : '#334155'}
                      stroke="#070a13"
                      strokeWidth="1.5"
                    />

                    {/* Animated Data Particle traveling between correlated nodes */}
                    <circle
                      cx={packetX}
                      cy={packetY}
                      r={isSelected ? '4' : '2.5'}
                      fill={isSelected ? '#fb7185' : '#38bdf8'}
                    />
                  </g>
                );
              })}

              {/* Orbital Attribute Nodes */}
              {graphNodes.filter(n => n.type !== 'center').map((node) => {
                const coord = orbitalCoordinates[node.id];
                if (!coord) return null;

                const isNodeActive = activeNodeId === node.id;
                const isVectorParticipant = selectedVector && (selectedVector.source === node.id || selectedVector.target === node.id);

                return (
                  <g 
                    key={node.id} 
                    transform={`translate(${coord.x}, ${coord.y})`}
                    onClick={() => handleSelectNode(node.id)}
                    className="cursor-pointer group"
                  >
                    {/* Outer Selection Highlight Ring */}
                    {(isNodeActive || isVectorParticipant) && (
                      <circle
                        r="34"
                        fill="none"
                        stroke={isVectorParticipant ? 'rgba(244, 63, 94, 0.4)' : 'rgba(56, 189, 248, 0.4)'}
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                      />
                    )}

                    {/* Node Core Body */}
                    <circle
                      r="26"
                      fill="#0d1527"
                      stroke={
                        isVectorParticipant 
                          ? '#f43f5e' 
                          : isNodeActive 
                            ? '#38bdf8' 
                            : 'rgba(71, 85, 105, 0.7)'
                      }
                      strokeWidth={isVectorParticipant || isNodeActive ? '2' : '1'}
                      className="transition-colors duration-150"
                    />

                    {/* Kind indicator dot (Supplied vs Inferred) */}
                    <circle
                      cx="0"
                      cy="-16"
                      r="3"
                      fill="#10b981"
                    />

                    {/* Node Text - Title */}
                    <text
                      textAnchor="middle"
                      y="-3"
                      className="fill-slate-100 font-sans text-[11px] font-semibold"
                    >
                      {node.label}
                    </text>

                    {/* Node Text - Attribute Summary */}
                    <text
                      textAnchor="middle"
                      y="11"
                      className="fill-slate-400 font-mono text-[9px]"
                    >
                      {String(node.val || '').length > 12 
                        ? `${String(node.val || '').slice(0, 10)}…` 
                        : String(node.val || '')}
                    </text>
                  </g>
                );
              })}

              {/* Central Target Profile Node: YOU */}
              <g 
                transform={`translate(${centerCoord.x}, ${centerCoord.y})`}
                className="cursor-pointer"
                onClick={() => {
                  setActiveNodeId('college');
                  setSelectedVector(graphVectors[0]);
                }}
              >
                {/* Subtle Radar Ring */}
                <circle
                  r="48"
                  className="fill-none stroke-sky-500/20"
                  strokeWidth="1.5"
                />

                {/* Main Identity Orb */}
                <circle
                  r="38"
                  fill="url(#centerGradient)"
                  stroke="#38bdf8"
                  strokeWidth="2"
                />

                <text
                  textAnchor="middle"
                  y="-4"
                  className="fill-white font-mono font-bold text-xs tracking-wider"
                >
                  TARGET
                </text>
                <text
                  textAnchor="middle"
                  y="12"
                  className="fill-sky-100 font-mono text-[10px] uppercase font-medium"
                >
                  @{profile.username || 'user'}
                </text>
              </g>

            </svg>
          </div>

          {/* Quick-Access Threat Vectors Selector */}
          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
              Identified Threat Vectors ({graphVectors.length}):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {graphVectors.map((v) => {
                const isSelected = selectedVector?.id === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => handleSelectVector(v)}
                    className={`p-2.5 rounded-lg text-left transition-all border ${
                      isSelected
                        ? 'bg-rose-950/30 border-rose-500/50 text-rose-200'
                        : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400">
                        {v.threat.replace(' Vector', '')}
                      </span>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                      )}
                    </div>
                    <div className="text-xs font-semibold text-slate-200 truncate">
                      {v.title}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 mt-1 capitalize truncate">
                      {v.source} ↔ {v.target}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right: Contextual Intelligence & Defense Panel */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Active Node / Vector Analysis Card */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-400">
                <Zap className="w-4 h-4 text-sky-400" />
                <span>Relationship Intelligence</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {activeNodeInfo.category}
              </span>
            </div>

            {/* Selected Node Profile Signal */}
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <span>{activeNodeInfo.label} Signal</span>
                </h3>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                  Supplied Signal
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80">
                <div className="text-[10px] font-mono uppercase text-slate-500 mb-0.5">Profile Value</div>
                <div className="text-xs font-mono text-sky-300 font-semibold truncate">
                  "{String(activeNodeInfo.val)}"
                </div>
              </div>
            </div>

            {/* Why This Connection Matters */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Why This Connection Matters</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-800/50">
                {activeVectorInfo?.explanation || activeNodeInfo.whyMatters}
              </p>
            </div>

            {/* How to Reduce Exposure */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Recommended Mitigation</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-emerald-950/20 p-3 rounded-lg border border-emerald-500/20">
                {activeNodeInfo.countermeasure}
              </p>
            </div>

            {/* Quick Action Button */}
            <button
              onClick={() => navigateTo('coach')}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            >
              <span>Review Privacy Coach Recommendations</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </button>

          </div>

          {/* Educational Threat Intelligence Callout */}
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-xs text-slate-400 space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-slate-200">
              <Info className="w-3.5 h-3.5 text-sky-400" />
              <span>OSINT Chaining Principles</span>
            </div>
            <p className="leading-relaxed">
              Adversaries correlate 3 to 4 independent data fragments (institution, city, recent event, and contact handle) to bypass suspicion without needing broken passwords or database breaches.
            </p>
          </div>

        </div>

      </div>

      {/* Potential Attack Surface Section */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <span>Potential Digital Attack Surface</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulated risk vectors identified by correlating your active profile signals
            </p>
          </div>
          <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
            Simulated Assessment · Educational Model
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {attackSurface.map((surface, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-slate-500">Vector #{idx + 1}</span>
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                  surface.level === 'HIGH' ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20' : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                }`}>
                  {surface.level}
                </span>
              </div>
              <h3 className="font-semibold text-xs text-slate-200">
                {surface.type}
              </h3>
              <p className="text-[11px] text-slate-400 leading-snug">
                {surface.desc}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* Screen Navigation Footer */}
      <div className="pt-2 flex items-center justify-between border-t border-slate-800">
        <button
          onClick={() => navigateTo('dashboard')}
          className="text-xs font-mono text-slate-400 hover:text-sky-300 transition-colors"
        >
          ← Return to Exposure Dashboard
        </button>

        <button
          onClick={() => navigateTo('attacker')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-xs bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all shadow-sm cursor-pointer"
        >
          <span>Continue to Attacker View</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}

