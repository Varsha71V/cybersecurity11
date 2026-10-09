import React, { createContext, useContext, useState, useMemo } from 'react';
import { DEMO_PROFILES, privacyAnalyzer } from '../services/privacyAnalyzer';
import { sounds } from '../utils/audio';

const PrivacyContext = createContext(null);

export function PrivacyProvider({ children }) {
  const [profile, setProfile] = useState({ ...DEMO_PROFILES.alex });
  const [activeScreen, setActiveScreen] = useState('landing');
  const [appliedFixes, setAppliedFixes] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  // Compute live threat intelligence whenever profile or applied fixes change
  const analysisResults = useMemo(() => {
    return privacyAnalyzer(profile, appliedFixes);
  }, [profile, appliedFixes]);

  // Compute baseline analysis without fixes for Before vs After comparison
  const baselineAnalysis = useMemo(() => {
    return privacyAnalyzer(profile, []);
  }, [profile]);

  // Compute fully secured analysis with all fixes for target comparison
  const fullyFixedAnalysis = useMemo(() => {
    return privacyAnalyzer(profile, ['rec-location', 'rec-2fa', 'rec-contact', 'rec-password', 'rec-posts']);
  }, [profile]);

  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage((prev) => (prev?.id === prev?.id ? null : prev));
    }, 3500);
  };

  const navigateTo = (screen) => {
    sounds.playClick();
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateProfile = (fields) => {
    setProfile((prev) => ({ ...prev, ...fields }));
  };

  const loadPreset = (presetKey = 'alex') => {
    sounds.playSuccess();
    const preset = DEMO_PROFILES[presetKey] || DEMO_PROFILES.alex;
    setProfile({ ...preset });
    setAppliedFixes([]);
    showToast(`Loaded "${preset.name}" profile demo!`, 'success');
  };

  const resetDemo = () => {
    sounds.playToggle();
    setProfile({ ...DEMO_PROFILES.alex });
    setAppliedFixes([]);
    showToast('Reset back to initial Alex demo profile.', 'info');
  };

  const toggleFix = (fixId) => {
    sounds.playToggle();
    setAppliedFixes((prev) => {
      const exists = prev.includes(fixId);
      const updated = exists ? prev.filter((id) => id !== fixId) : [...prev, fixId];
      if (!exists) {
        showToast('Security recommendation applied! Exposure score improved.', 'success');
      } else {
        showToast('Recommendation reverted.', 'info');
      }
      return updated;
    });
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.enabled = next;
    if (next) sounds.playClick();
  };

  return (
    <PrivacyContext.Provider
      value={{
        profile,
        updateProfile,
        activeScreen,
        navigateTo,
        appliedFixes,
        toggleFix,
        setAppliedFixes,
        analysisResults,
        baselineAnalysis,
        fullyFixedAnalysis,
        loadPreset,
        resetDemo,
        soundEnabled,
        toggleSound,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </PrivacyContext.Provider>
  );
}

export function usePrivacy() {
  const ctx = useContext(PrivacyContext);
  if (!ctx) {
    throw new Error('usePrivacy must be used within a PrivacyProvider');
  }
  return ctx;
}
