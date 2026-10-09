import React from 'react';
import { 
  User, 
  Share2, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Check, 
  RotateCcw, 
  Info,
  Building,
  AtSign,
  Lock,
  Globe
} from 'lucide-react';
import { usePrivacy } from '../../context/PrivacyContext';

export default function ProfileBuilderScreen() {
  const { profile, updateProfile, loadPreset, navigateTo, analysisResults } = usePrivacy();

  const handleAnalyzeProfile = (e) => {
    e.preventDefault();
    navigateTo('dashboard');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700/80 text-sky-400 text-xs font-mono mb-2">
            <span>STEP 02 OF 09</span> · <span>DIGITAL FOOTPRINT INPUT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Build Your Public Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Use fictional information or select a pre-configured demo persona.
          </p>
        </div>

        {/* Demo Preset Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => loadPreset('alex')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              profile.id === 'alex'
                ? 'bg-sky-500/15 text-sky-300 border border-sky-500/40 shadow-sm'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Alex (Student)</span>
          </button>

          <button
            type="button"
            onClick={() => loadPreset('maya')}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              profile.id === 'maya'
                ? 'bg-sky-500/15 text-sky-300 border border-sky-500/40 shadow-sm'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            Maya (Freelancer)
          </button>

          <button
            type="button"
            onClick={() => loadPreset('rohan')}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              profile.id === 'rohan'
                ? 'bg-sky-500/15 text-sky-300 border border-sky-500/40 shadow-sm'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            Rohan (Founder)
          </button>
        </div>
      </div>

      {/* Safety Notice Banner */}
      <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-3 text-xs text-slate-400">
        <Info className="w-4 h-4 text-sky-400 shrink-0" />
        <p>
          <strong className="text-slate-200">Local Simulation Environment:</strong> Form inputs are processed locally in your browser memory. Do not enter authentic secret keys, credentials, or government IDs.
        </p>
      </div>

      <form onSubmit={handleAnalyzeProfile} className="space-y-6">
        
        {/* SECTION 1: BASIC INFORMATION */}
        <div className="p-6 rounded-xl bg-[#0d1527] border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800/80">
            <User className="w-4 h-4 text-sky-400" />
            <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-200">
              Basic Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="input-name" className="block text-xs font-medium text-slate-300 mb-1.5">
                Display Name (Simulated)
              </label>
              <input
                id="input-name"
                type="text"
                value={profile.name}
                onChange={(e) => updateProfile({ name: e.target.value })}
                placeholder="e.g. Alex"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#070c18] border border-slate-700/80 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-slate-100 text-sm placeholder:text-slate-600 outline-none transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="select-age" className="block text-xs font-medium text-slate-300 mb-1.5">
                Age Range
              </label>
              <select
                id="select-age"
                value={profile.ageRange}
                onChange={(e) => updateProfile({ ageRange: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#070c18] border border-slate-700/80 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-slate-100 text-sm outline-none transition-all"
              >
                <option value="18–24">18–24 (Student / Early Career)</option>
                <option value="25–34">25–34 (Young Professional)</option>
                <option value="35–44">35–44 (Mid Career)</option>
                <option value="45+">45+ (Senior)</option>
              </select>
            </div>

            <div>
              <label htmlFor="input-city" className="block text-xs font-medium text-slate-300 mb-1.5">
                City / Region
              </label>
              <input
                id="input-city"
                type="text"
                value={profile.city}
                onChange={(e) => updateProfile({ city: e.target.value })}
                placeholder="e.g. Bengaluru"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#070c18] border border-slate-700/80 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-slate-100 text-sm placeholder:text-slate-600 outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="input-college" className="block text-xs font-medium text-slate-300 mb-1.5">
                College / Organization
              </label>
              <input
                id="input-college"
                type="text"
                value={profile.college}
                onChange={(e) => updateProfile({ college: e.target.value })}
                placeholder="e.g. Horizon Institute of Technology"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#070c18] border border-slate-700/80 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-slate-100 text-sm placeholder:text-slate-600 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: SOCIAL INFORMATION */}
        <div className="p-6 rounded-xl bg-[#0d1527] border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800/80">
            <Share2 className="w-4 h-4 text-violet-400" />
            <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-200">
              Social Footprint & Online Presence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="input-username" className="block text-xs font-medium text-slate-300 mb-1.5">
                Public Username / Handle
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-500 font-mono text-sm">@</span>
                <input
                  id="input-username"
                  type="text"
                  value={profile.username}
                  onChange={(e) => updateProfile({ username: e.target.value })}
                  placeholder="alex_codes"
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-lg bg-[#070c18] border border-slate-700/80 focus:border-violet-400 focus:ring-1 focus:ring-violet-400 text-slate-100 text-sm placeholder:text-slate-600 outline-none font-mono transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="input-interests" className="block text-xs font-medium text-slate-300 mb-1.5">
                Interests / Hobbies
              </label>
              <input
                id="input-interests"
                type="text"
                value={profile.interests}
                onChange={(e) => updateProfile({ interests: e.target.value })}
                placeholder="Coding, music, gaming"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#070c18] border border-slate-700/80 focus:border-violet-400 focus:ring-1 focus:ring-violet-400 text-slate-100 text-sm placeholder:text-slate-600 outline-none transition-all"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="input-bio" className="block text-xs font-medium text-slate-300 mb-1.5">
                Public Bio Snippet
              </label>
              <input
                id="input-bio"
                type="text"
                value={profile.bio}
                onChange={(e) => updateProfile({ bio: e.target.value })}
                placeholder="CSE student | coding | music | tech events"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#070c18] border border-slate-700/80 focus:border-violet-400 focus:ring-1 focus:ring-violet-400 text-slate-100 text-sm placeholder:text-slate-600 outline-none transition-all"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="input-activity" className="block text-xs font-medium text-slate-300 mb-1.5">
                Recent Public Activities / Tagged Events
              </label>
              <input
                id="input-activity"
                type="text"
                value={profile.recentActivity}
                onChange={(e) => updateProfile({ recentActivity: e.target.value })}
                placeholder="College tech fest, Hackathon 2026"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#070c18] border border-slate-700/80 focus:border-violet-400 focus:ring-1 focus:ring-violet-400 text-slate-100 text-sm placeholder:text-slate-600 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: CONTACT VISIBILITY & LOCATION EXPOSURE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Contact Visibility */}
          <div className="p-6 rounded-xl bg-[#0d1527] border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800/80">
              <Phone className="w-4 h-4 text-rose-400" />
              <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-200">
                Contact Visibility
              </h2>
            </div>

            {/* Phone Visibility Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#070c18] border border-slate-800">
              <div>
                <span className="text-xs font-medium text-slate-200 block">Phone Number Visible?</span>
                <span className="text-[11px] text-slate-400">Listed in public bio or contact card</span>
              </div>
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-md border border-slate-800">
                <button
                  type="button"
                  onClick={() => updateProfile({ phoneVisible: true })}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                    profile.phoneVisible 
                      ? 'bg-rose-950 text-rose-300 border border-rose-500/40' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => updateProfile({ phoneVisible: false })}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                    !profile.phoneVisible 
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {/* Email Visibility Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#070c18] border border-slate-800">
              <div>
                <span className="text-xs font-medium text-slate-200 block">Email Visible?</span>
                <span className="text-[11px] text-slate-400">Publicly searchable or listed in header</span>
              </div>
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-md border border-slate-800">
                <button
                  type="button"
                  onClick={() => updateProfile({ emailVisible: true })}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                    profile.emailVisible 
                      ? 'bg-rose-950 text-rose-300 border border-rose-500/40' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => updateProfile({ emailVisible: false })}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                    !profile.emailVisible 
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          </div>

          {/* Location Exposure */}
          <div className="p-6 rounded-xl bg-[#0d1527] border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800/80">
              <MapPin className="w-4 h-4 text-amber-400" />
              <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-200">
                Location Exposure
              </h2>
            </div>

            <div>
              <label htmlFor="select-location-posts" className="block text-xs font-medium text-slate-300 mb-1.5">
                Real-time Check-ins & Frequent Geotags
              </label>
              <select
                id="select-location-posts"
                value={profile.locationPosts}
                onChange={(e) => updateProfile({ locationPosts: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#070c18] border border-slate-700/80 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-slate-100 text-sm outline-none transition-all"
              >
                <option value="Frequent">Frequent (Regular cafes, transit, campus venues)</option>
                <option value="Occasional">Occasional (Major conferences or annual events only)</option>
                <option value="Never">Never (Strict zero real-time location tags)</option>
              </select>
            </div>

            <div className="p-3 rounded-lg bg-[#070c18] border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
              💡 Routine check-ins allow threat actors to infer transit schedules and times when you are away from trusted networks.
            </div>
          </div>

        </div>

        {/* SECTION 4: ACCOUNT SECURITY */}
        <div className="p-6 rounded-xl bg-[#0d1527] border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800/80">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-200">
              Account Security Indicators
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 2FA Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#070c18] border border-slate-800">
              <div>
                <span className="text-xs font-medium text-slate-200 block">Two-Factor Authentication (2FA)</span>
                <span className="text-[11px] text-slate-400">Authenticator app or hardware key enabled</span>
              </div>
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-md border border-slate-800">
                <button
                  type="button"
                  onClick={() => updateProfile({ twoFactorEnabled: true })}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                    profile.twoFactorEnabled 
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Enabled
                </button>
                <button
                  type="button"
                  onClick={() => updateProfile({ twoFactorEnabled: false })}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                    !profile.twoFactorEnabled 
                      ? 'bg-rose-950 text-rose-300 border border-rose-500/40' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Disabled
                </button>
              </div>
            </div>

            {/* Password Reuse Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#070c18] border border-slate-800">
              <div>
                <span className="text-xs font-medium text-slate-200 block">Password Reuse</span>
                <span className="text-[11px] text-slate-400">Same or similar password on multiple portals</span>
              </div>
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-md border border-slate-800">
                <button
                  type="button"
                  onClick={() => updateProfile({ passwordReuse: true })}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                    profile.passwordReuse 
                      ? 'bg-rose-950 text-rose-300 border border-rose-500/40' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => updateProfile({ passwordReuse: false })}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                    !profile.passwordReuse 
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => loadPreset('alex')}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset form to Alex demo defaults</span>
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm bg-sky-400 hover:bg-sky-300 text-slate-950 shadow-sm transition-all cursor-pointer"
          >
            <span>Analyze Profile Exposure →</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>

    </div>
  );
}
