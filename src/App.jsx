import React from 'react';
import { PrivacyProvider, usePrivacy } from './context/PrivacyContext';
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import Toast from './components/common/Toast';

import LandingScreen from './components/screens/LandingScreen';
import ProfileBuilderScreen from './components/screens/ProfileBuilderScreen';
import ExposureDashboardScreen from './components/screens/ExposureDashboardScreen';
import ConnectTheDotsScreen from './components/screens/ConnectTheDotsScreen';
import AttackerViewScreen from './components/screens/AttackerViewScreen';
import AttackSimulationScreen from './components/screens/AttackSimulationScreen';
import AttackBreakdownScreen from './components/screens/AttackBreakdownScreen';
import PrivacyCoachScreen from './components/screens/PrivacyCoachScreen';
import BeforeAfterScreen from './components/screens/BeforeAfterScreen';

function MainApp() {
  const { activeScreen } = usePrivacy();

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'landing':
        return <LandingScreen />;
      case 'profile':
        return <ProfileBuilderScreen />;
      case 'dashboard':
        return <ExposureDashboardScreen />;
      case 'dots':
        return <ConnectTheDotsScreen />;
      case 'attacker':
        return <AttackerViewScreen />;
      case 'simulation':
        return <AttackSimulationScreen />;
      case 'breakdown':
        return <AttackBreakdownScreen />;
      case 'coach':
        return <PrivacyCoachScreen />;
      case 'beforeAfter':
        return <BeforeAfterScreen />;
      default:
        return <LandingScreen />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070a13] text-slate-100 flex flex-col font-sans selection:bg-sky-500/25 selection:text-sky-200">
      
      {/* Background Micro-Grid */}
      <div className="fixed inset-0 cyber-grid pointer-events-none opacity-25 z-0" />

      {/* Top subtle border accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-sky-500/40 via-blue-500/40 to-violet-500/40 z-50 fixed top-0 left-0" />

      {/* Persistent App Header */}
      <Header />

      {/* Top Tab Navigation Bar */}
      <Navigation />

      {/* Main Screen Container */}
      <main className="relative z-10 flex-1 pb-24">
        {renderActiveScreen()}
      </main>

      {/* Toast Alert Notifications */}
      <Toast />

      {/* Professional SaaS Footer */}
      <footer className="relative z-10 w-full border-t border-slate-800/80 bg-[#070a13]/90 backdrop-blur-md py-6 px-4 text-center text-xs text-slate-500 space-y-2">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
            <span className="font-semibold text-slate-300">Privacy Mirror</span>
            <span className="text-slate-600">|</span>
            <span className="text-[11px] font-mono text-slate-400">Security Intelligence Platform</span>
          </div>

          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-3">
            <span>Client-Side Analysis</span>
            <span>·</span>
            <span>Zero Credentials Stored</span>
            <span>·</span>
            <span>Educational OSINT Modeling</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <PrivacyProvider>
      <MainApp />
    </PrivacyProvider>
  );
}
