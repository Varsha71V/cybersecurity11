/**
 * Privacy Mirror — AI-Powered Cybersecurity Analysis Engine
 * 
 * Modular architecture:
 * This deterministic rule-based engine simulates an AI/LLM OSINT cybersecurity reasoning agent.
 * An external LLM API (e.g. Gemini API / Claude / OpenAI) can be integrated by replacing or
 * wrapping these methods with async API calls.
 */

export const DEMO_PROFILES = {
  alex: {
    id: 'alex',
    name: 'Alex',
    ageRange: '18–24',
    city: 'Bengaluru',
    college: 'Horizon Institute of Technology',
    username: 'alex_codes',
    bio: 'CSE student | coding | music | tech events',
    interests: 'Coding, music, gaming',
    recentActivity: 'College tech fest',
    phoneVisible: true,
    emailVisible: true,
    locationPosts: 'Frequent', // 'Frequent' | 'Occasional' | 'Never'
    twoFactorEnabled: false,
    passwordReuse: true,
  },
  maya: {
    id: 'maya',
    name: 'Maya Sen',
    ageRange: '25–34',
    city: 'Mumbai',
    college: 'National Design Academy (Alumni)',
    username: 'maya_creates',
    bio: 'Freelance UI/UX designer | Coffee & Art | Open for commissions',
    interests: 'UI/UX Design, Coffee, Photography',
    recentActivity: 'Design Con 2026 Mumbai',
    phoneVisible: false,
    emailVisible: true,
    locationPosts: 'Occasional',
    twoFactorEnabled: true,
    passwordReuse: true,
  },
  rohan: {
    id: 'rohan',
    name: 'Rohan Verma',
    ageRange: '25–34',
    city: 'Delhi NCR',
    college: 'Apex Tech Ventures',
    username: 'rohan_builds',
    bio: 'Founder @ Stealth AI Startup | Angel investor | Tech speaker',
    interests: 'AI, Startups, Angel Investing',
    recentActivity: 'Global AI Summit Keynote',
    phoneVisible: true,
    emailVisible: true,
    locationPosts: 'Frequent',
    twoFactorEnabled: false,
    passwordReuse: false,
  }
};

/**
 * Evaluates the profile's digital exposure footprint.
 * Returns comprehensive quantitative and qualitative threat metrics.
 * 
 * @param {Object} profile - User input or demo profile
 * @param {Array<string>} appliedFixes - List of applied recommendation IDs
 * @returns {Object} Comprehensive exposure dossier
 */
export function privacyAnalyzer(profile = DEMO_PROFILES.alex, appliedFixes = []) {
  // Base raw risk assessments (0 to 100, where 100 is maximum exposure risk)
  let identityScore = 50;
  if (profile.name) identityScore += 15;
  if (profile.college) identityScore += 15;
  if (profile.ageRange) identityScore += 10;
  if (profile.bio && profile.bio.length > 20) identityScore += 10;

  let locationScore = 20;
  if (profile.city) locationScore += 25;
  if (profile.locationPosts === 'Frequent') locationScore += 45;
  else if (profile.locationPosts === 'Occasional') locationScore += 20;
  if (profile.recentActivity) locationScore += 15;

  let socialScore = 30;
  if (profile.username) socialScore += 20;
  if (profile.interests) socialScore += 25;
  if (profile.recentActivity) socialScore += 15;

  let contactScore = 15;
  if (profile.phoneVisible) contactScore += 45;
  if (profile.emailVisible) contactScore += 35;

  // For account security: 100 means high risk (poor security), 0 means completely safe
  // We compute Account Exposure Risk:
  let securityExposure = 10;
  if (!profile.twoFactorEnabled) securityExposure += 45;
  if (profile.passwordReuse) securityExposure += 40;

  // Account Health Score is inverse of exposure:
  let accountSecurityHealth = Math.max(10, 100 - securityExposure);

  // Apply simulated fixes if toggled in Privacy Coach
  if (appliedFixes.includes('rec-location')) {
    locationScore = Math.max(25, Math.round(locationScore * 0.45));
  }
  if (appliedFixes.includes('rec-contact')) {
    contactScore = Math.max(20, Math.round(contactScore * 0.4));
  }
  if (appliedFixes.includes('rec-2fa')) {
    accountSecurityHealth = Math.min(95, accountSecurityHealth + 40);
    securityExposure = Math.max(10, securityExposure - 40);
  }
  if (appliedFixes.includes('rec-password')) {
    accountSecurityHealth = Math.min(95, accountSecurityHealth + 25);
    securityExposure = Math.max(10, securityExposure - 25);
  }
  if (appliedFixes.includes('rec-posts')) {
    socialScore = Math.max(20, Math.round(socialScore * 0.6));
    identityScore = Math.max(25, Math.round(identityScore * 0.7));
  }

  // Cap scores between 5 and 98
  identityScore = Math.min(95, Math.max(15, identityScore));
  locationScore = Math.min(98, Math.max(15, locationScore));
  socialScore = Math.min(92, Math.max(15, socialScore));
  contactScore = Math.min(95, Math.max(15, contactScore));
  accountSecurityHealth = Math.min(95, Math.max(15, accountSecurityHealth));

  // Overall Privacy Exposure Score (weighted index where higher = higher risk)
  // Weights: Contact (25%), Location (25%), Identity (20%), Security Risk (20%), Social (10%)
  const weightedExposure = Math.round(
    identityScore * 0.20 +
    locationScore * 0.25 +
    socialScore * 0.10 +
    contactScore * 0.25 +
    securityExposure * 0.20
  );

  const overallScore = Math.min(95, Math.max(12, weightedExposure));

  // Determine severity tier
  let severityTier = 'LOW EXPOSURE';
  let severityColor = 'emerald';
  if (overallScore >= 70) {
    severityTier = 'HIGH EXPOSURE';
    severityColor = 'rose';
  } else if (overallScore >= 45) {
    severityTier = 'MODERATE EXPOSURE';
    severityColor = 'amber';
  }

  // Top Exposure Risks
  const topRisks = [
    {
      id: 'risk-location',
      title: 'Frequent location sharing',
      severity: profile.locationPosts === 'Frequent' ? 'HIGH' : 'MEDIUM',
      category: 'Location',
      summary: 'Public real-time check-ins reveal routine patterns and physical availability.',
      explanation: 'Attackers scrape timestamped check-ins to map your daily commutes, frequent study cafes, or periods when you are away from home. This facilitates physical pretexting and timing-targeted social engineering attacks.',
      exploitScenario: 'A scammer observes you regularly attend a campus cafeteria between 2–4 PM, calling with a pretext claiming an incident occurred during that exact window.'
    },
    {
      id: 'risk-contact',
      title: 'Public contact information',
      severity: (profile.phoneVisible || profile.emailVisible) ? 'HIGH' : 'LOW',
      category: 'Contact',
      summary: 'Direct telephone and email visibility exposes you to spear-phishing campaigns.',
      explanation: 'Publishing unfiltered phone numbers and personal email addresses bypasses corporate/institutional spam gateways and allows threat actors to establish high-confidence direct channels via SMS, WhatsApp, or spoofed emails.',
      exploitScenario: 'Scammers launch SMS smishing messages referencing your university tech event directly to your personal phone number.'
    },
    {
      id: 'risk-password',
      title: 'Password reuse across platforms',
      severity: profile.passwordReuse ? 'HIGH' : 'LOW',
      category: 'Security',
      summary: 'Reusing credentials makes you susceptible to credential stuffing breaches.',
      explanation: 'If any third-party gaming, forum, or e-commerce database suffers a breach, automated botnets immediately attempt that email/password combination on major email and cloud accounts.',
      exploitScenario: 'A minor leak at a university hackathon forum compromises the password you also use for your primary email and cloud accounts.'
    },
    {
      id: 'risk-college',
      title: 'Public college & organization affiliation',
      severity: profile.college ? 'MEDIUM' : 'LOW',
      category: 'Identity',
      summary: 'Clear institutional ties provide high-credibility pretext templates.',
      explanation: 'Naming your specific college or department allows attackers to forge communications impersonating department deans, examination boards, or event coordinators.',
      exploitScenario: 'An attacker drafts an email claiming: "Horizon Institute IT Dept: Confirm your semester registration details immediately."'
    }
  ];

  // Inferred profile traits for Attacker View
  const inferredInsights = [
    `Likely student / affiliate at ${profile.college || 'target organization'}`,
    `Likely actively participates in ${profile.recentActivity || 'technical events & forums'}`,
    `Routinely frequents identified venues in ${profile.city || 'metro area'}`,
    `Direct attack vector available via ${profile.emailVisible ? 'unfiltered public email' : ''}${profile.emailVisible && profile.phoneVisible ? ' & ' : ''}${profile.phoneVisible ? 'direct phone' : 'social DM'}`,
    `Susceptible to authority-based pretexting referencing recent campus tech events`
  ];

  // Attack Surface Breakdown
  const attackSurface = [
    { type: 'Targeted Phishing (Spear Phishing)', level: 'HIGH', score: 88, desc: 'Tailored emails referencing your real college and recent event.' },
    { type: 'Identity Impersonation', level: 'MEDIUM', score: 62, desc: 'Creating spoofed handles mirroring your bio and interests to trick friends.' },
    { type: 'Social Engineering Pretexting', level: 'HIGH', score: 85, desc: 'Posing as faculty or event organizers demanding urgent action.' },
    { type: 'Location-Based Scams', level: profile.locationPosts === 'Frequent' ? 'HIGH' : 'MEDIUM', score: 79, desc: 'Exploiting routine check-ins to orchestrate convincing timing scams.' },
    { type: 'Account Recovery Manipulation', level: profile.passwordReuse ? 'HIGH' : 'MEDIUM', score: 74, desc: 'Guessing security challenge questions from publicly stated hobbies and history.' }
  ];

  // Connect the dots interactive graph nodes and links
  const graphNodes = [
    { id: 'you', label: 'YOU', type: 'center', val: profile.name || 'User', color: '#06b6d4' },
    { id: 'college', label: 'College', type: 'attribute', val: profile.college, category: 'Identity', color: '#38bdf8' },
    { id: 'city', label: 'City', type: 'attribute', val: profile.city, category: 'Location', color: '#818cf8' },
    { id: 'event', label: 'Recent Event', type: 'attribute', val: profile.recentActivity, category: 'Context', color: '#a855f7' },
    { id: 'interests', label: 'Interests', type: 'attribute', val: profile.interests, category: 'Profile', color: '#c084fc' },
    { id: 'username', label: 'Username', type: 'attribute', val: `@${profile.username}`, category: 'Handle', color: '#2dd4bf' },
    { id: 'location', label: 'Check-ins', type: 'attribute', val: `${profile.locationPosts} location sharing`, category: 'Location', color: '#f59e0b' },
    { id: 'contact', label: 'Contact Details', type: 'attribute', val: `${profile.phoneVisible ? 'Phone' : ''}${profile.phoneVisible && profile.emailVisible ? ' + ' : ''}${profile.emailVisible ? 'Email' : 'Private'}`, category: 'Contact', color: '#f43f5e' }
  ];

  const graphVectors = [
    {
      id: 'vec-1',
      source: 'college',
      target: 'event',
      title: 'Known Affiliation & Schedule',
      threat: 'Spear Phishing Vector',
      explanation: `By linking "${profile.college}" with "${profile.recentActivity}", a scammer gains the exact context needed to impersonate an event coordinator or college registrar with unprompted authority.`
    },
    {
      id: 'vec-2',
      source: 'city',
      target: 'location',
      title: 'Routine & Movement Inference',
      threat: 'Physical / Timing Scams',
      explanation: `Combining "${profile.city}" with frequent location check-ins allows bad actors to predict your schedule, typical hangouts, and when you are away from trusted networks.`
    },
    {
      id: 'vec-3',
      source: 'username',
      target: 'interests',
      title: 'Targeted Impersonation & Malicious DMs',
      threat: 'Social Pretexting',
      explanation: `Knowledge of your handle "@${profile.username}" paired with interests in "${profile.interests}" enables tailored baiting (e.g. fake hackathon prizes, pirated tools, or counterfeit Discord servers).`
    },
    {
      id: 'vec-4',
      source: 'contact',
      target: 'college',
      title: 'Direct Phishing Gateway',
      threat: 'Credential Harvesting',
      explanation: `Public email/phone visibility combined with college affiliation lets scammers bypass standard spam safeguards by sending personalized urgency alerts.`
    }
  ];

  // Actionable Privacy Coach Recommendations
  const recommendations = [
    {
      id: 'rec-location',
      priority: 'HIGH PRIORITY',
      badge: 'High Impact',
      icon: 'MapPin',
      title: 'Reduce real-time location exposure',
      shortDesc: 'Frequent public location posts reveal predictable habits and routines.',
      whyMatters: 'Posting real-time locations broadcasts where you are and, crucially, where you are not. Criminals and social engineers use this to establish plausible pretexts or determine when you are vulnerable.',
      howToImprove: [
        'Delay sharing photos or check-ins until after leaving the location.',
        'Disable automatic GPS geolocation tags on social media camera apps.',
        'Avoid publicizing regular daily routines (e.g., recurring class times or gym hours).'
      ],
      impact: '-44% Location Exposure',
      fixed: appliedFixes.includes('rec-location')
    },
    {
      id: 'rec-2fa',
      priority: 'HIGH PRIORITY',
      badge: 'High Impact',
      icon: 'ShieldAlert',
      title: 'Enable hardware or app-based Two-Factor Authentication',
      shortDesc: '2FA substantially minimizes account takeover risks if passwords leak.',
      whyMatters: 'Password breaches are commonplace. Without 2FA, a single leaked credential grants total access to email, code repositories, or student portals.',
      howToImprove: [
        'Install an authenticator app (Google Authenticator, Aegis, or Authy).',
        'Enable 2FA on primary email, GitHub/GitLab, and cloud accounts.',
        'Avoid relying solely on SMS 2FA where SIM-swapping is a concern.'
      ],
      impact: '+50% Account Security',
      fixed: appliedFixes.includes('rec-2fa')
    },
    {
      id: 'rec-contact',
      priority: 'MEDIUM PRIORITY',
      badge: 'Moderate Impact',
      icon: 'Mail',
      title: 'Hide direct contact details on public profiles',
      shortDesc: 'Public contact channels invite unsolicited spear-phishing and vishing.',
      whyMatters: 'When phone numbers and email addresses are indexed by search engines, automated scrapers add them to targeted telemarketing and social engineering lead lists.',
      howToImprove: [
        'Set profile phone visibility to "Only Me" or close contacts.',
        'Use alias emails (e.g., SimpleLogin, iCloud Hide My Email) for public inquiries.',
        'Use in-platform direct messages rather than publishing personal phone numbers.'
      ],
      impact: '-43% Contact Exposure',
      fixed: appliedFixes.includes('rec-contact')
    },
    {
      id: 'rec-password',
      priority: 'HIGH PRIORITY',
      badge: 'High Impact',
      icon: 'Key',
      title: 'Eliminate password reuse across applications',
      shortDesc: 'Reused passwords trigger catastrophic cascading credential stuffing.',
      whyMatters: 'When a low-security website experiences a data leak, attackers instantly run that email/password against hundreds of services to take over accounts.',
      howToImprove: [
        'Adopt an encrypted password manager (Bitwarden, 1Password).',
        'Generate unique, randomized 16+ character passphrases for each service.',
        'Audit your email address on breach monitoring tools.'
      ],
      impact: '+25% Account Defense',
      fixed: appliedFixes.includes('rec-password')
    },
    {
      id: 'rec-posts',
      priority: 'MEDIUM PRIORITY',
      badge: 'Moderate Impact',
      icon: 'EyeOff',
      title: 'Audit and prune legacy public posts',
      shortDesc: 'Old posts often contain answers to security recovery questions.',
      whyMatters: 'Childhood pets, high school names, favorite teachers, and birthdays lingering in historic posts are regularly used by attackers to reset account passwords.',
      howToImprove: [
        'Set your past social media posts to "Friends Only" retroactively.',
        'Delete check-ins from former schools or residential addresses.',
        'Avoid using real personal trivia as security question answers.'
      ],
      impact: '-35% Social Inference',
      fixed: appliedFixes.includes('rec-posts')
    }
  ];

  return {
    profile,
    overallScore,
    severityTier,
    severityColor,
    categoryScores: {
      identity: identityScore,
      location: locationScore,
      social: socialScore,
      contact: contactScore,
      security: accountSecurityHealth,
      securityExposure: securityExposure,
    },
    topRisks,
    inferredInsights,
    attackSurface,
    graphNodes,
    graphVectors,
    recommendations,
    appliedFixes
  };
}
