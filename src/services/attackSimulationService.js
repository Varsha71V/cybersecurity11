/**
 * Privacy Mirror — Attack Simulation & Human Decision Evaluation Engine
 * 
 * Demonstrates the cognitive mechanics of social engineering attacks
 * crafted from publicly accessible profile attributes.
 */

export function generateAttackSimulation(profile) {
  const collegeName = profile.college || 'Horizon Institute of Technology';
  const eventName = profile.recentActivity || 'College Tech Fest';
  const targetName = profile.name || 'Alex';
  const username = profile.username || 'alex_codes';

  return {
    id: 'sim-spearphish-01',
    scenarioTitle: 'Targeted Student Pretexting Campaign',
    scenarioSubtitle: 'Simulated social-engineering attempt based on your profile inputs',
    sender: {
      name: 'Campus Event Operations',
      handle: 'events-support@horizon-fest-verify.org',
      displayTag: 'UNKNOWN CONTACT · UNVERIFIED EXTERNAL SENDER',
      avatarBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
    },
    message: {
      timestamp: 'Today at 02:45 PM',
      subject: `[ACTION REQUIRED] Incomplete Registration for ${eventName}`,
      content: `Hi ${targetName}, I'm contacting students from ${collegeName} regarding the upcoming ${eventName}. We noticed your registration is incomplete on our master roster. Please confirm your student details and verify your roll number through the official link below within 24 hours to secure your participation badge.`,
      actionUrl: `https://${collegeName.toLowerCase().replace(/[^a-z0-9]/g, '')}-verification.auth-portal.net/login?user=${username}`,
      urgencyTag: '24-HOUR DEADLINE'
    },
    choices: [
      {
        id: 'respond_details',
        label: 'Respond directly with requested student details & phone number',
        risk: 'HIGH',
        badge: 'High Risk'
      },
      {
        id: 'click_link',
        label: 'Click the verification link and sign in with campus credentials',
        risk: 'HIGH',
        badge: 'Severe Risk'
      },
      {
        id: 'verify_independent',
        label: 'Verify through an independent official channel (call campus coordinator / check official site)',
        risk: 'SAFE',
        badge: 'Recommended Practice'
      },
      {
        id: 'ignore_report',
        label: 'Ignore the message and flag it to campus IT security desk',
        risk: 'SAFE',
        badge: 'Defensive Action'
      }
    ],
    detectedTechniques: [
      {
        name: 'Authority',
        icon: 'Award',
        description: `Poses as ${collegeName} official event committee to leverage institutional respect and demand compliance.`,
        severity: 'High'
      },
      {
        name: 'Trust Building',
        icon: 'ShieldCheck',
        description: `Quotes your actual college and recent participation in "${eventName}" so the message looks authentic.`,
        severity: 'Critical'
      },
      {
        name: 'Personalization',
        icon: 'UserCheck',
        description: `Uses your direct name "${targetName}" and references public activities, disarming your natural suspicion.`,
        severity: 'High'
      },
      {
        name: 'Urgency',
        icon: 'Clock',
        description: 'Imposes an artificial 24-hour deadline to induce panic and force an impulse decision before you can verify.',
        severity: 'Medium'
      }
    ]
  };
}

export function analyzeUserDecision(decisionId, profile) {
  const isSafe = decisionId === 'verify_independent' || decisionId === 'ignore_report';
  const collegeName = profile.college || 'Horizon Institute';

  if (decisionId === 'verify_independent') {
    return {
      status: 'GOOD DECISION ✓',
      isSafe: true,
      headline: 'You Chose Independent Verification — Attack Thwarted!',
      summary: 'You broke the attacker’s pre-packaged communication loop.',
      explanation: `By contacting the verified department or checking the genuine campus website independently, you denied the threat actor the chance to intercept your credentials or siphon sensitive data. Attackers rely on victims staying inside their fabricated channel.`,
      keyLesson: 'Always verify unexpected requests out-of-band using contact numbers or URLs you obtained independently.',
      mitigationStep: 'Save verified institutional contact directories so you never have to trust incoming links.'
    };
  }

  if (decisionId === 'ignore_report') {
    return {
      status: 'GOOD DECISION ✓',
      isSafe: true,
      headline: 'Threat Contained — Community Defense Triggered!',
      summary: 'You recognized the unverified source and preserved account integrity.',
      explanation: `Ignoring the bait prevented credential leakage. Submitting a report to institutional security or IT administrators alerts defenses, allowing them to block the malicious spoofed domain for everyone on campus.`,
      keyLesson: 'Prompt reporting turns an individual target into a collective security shield.',
      mitigationStep: 'Report phishing emails using built-in mailbox reporting tools or forwarding to the security team.'
    };
  }

  if (decisionId === 'click_link') {
    return {
      status: 'RISKY DECISION ⚠',
      isSafe: false,
      headline: 'Credential Harvesting Danger — Account Compromised!',
      summary: 'Clicking the link directs you to an attacker-controlled replica.',
      explanation: `The link looks plausible because it includes "${collegeName.toLowerCase().slice(0, 10)}", but it points to an external credential-harvesting server. Entering your credentials here provides the attacker with full unauthorized access to your student portal and linked email.`,
      keyLesson: 'Inspect full URLs carefully. Look past the prefix to verify the registered domain matches the authentic organization.',
      mitigationStep: 'If you ever click a suspicious link, immediately change passwords and revoke active login sessions.'
    };
  }

  // respond_details
  return {
    status: 'RISKY DECISION ⚠',
    isSafe: false,
    headline: 'Information Leakage — Secondary Vector Opened!',
    summary: 'Direct response validates your phone number and provides attacker leverage.',
    explanation: `Even without passwords, replying with your student ID, full name, and phone number confirms that your contact information is active and responsive. The scammer now has high-confidence data to escalate into voice phishing (vishing) or SMS OTP scams.`,
    keyLesson: 'Never reply to unverified inbound contacts requesting personal identifiers.',
    mitigationStep: 'Ignore requests from unknown senders asking for identity validation.'
  };
}

export function getAttackBreakdownTimeline(profile) {
  const college = profile.college || 'Horizon Institute';
  const event = profile.recentActivity || 'College Tech Fest';
  const targetName = profile.name || 'Alex';

  return [
    {
      step: 1,
      phase: 'OSINT RECONNAISSANCE',
      title: 'Harmless Public Information Scraped',
      detail: `Attacker scours public Instagram, LinkedIn, or Twitter bio for name "${targetName}" and username "${profile.username || 'user'}".`,
      attackerThought: 'Found a target profile with active student bio and regular postings.',
      badgeColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/40',
      icon: 'Globe'
    },
    {
      step: 2,
      phase: 'AFFILIATION CORRELATION',
      title: 'College & Academic Affiliation Confirmed',
      detail: `Public bio and tags link target to "${college}". Attacker now knows the authoritative hierarchy to spoof.`,
      attackerThought: `I will pose as someone from ${college} to establish immediate institutional trust.`,
      badgeColor: 'border-blue-500/40 text-blue-400 bg-blue-950/40',
      icon: 'Building'
    },
    {
      step: 3,
      phase: 'TEMPORAL HOOK',
      title: 'Recent Activity & Event Context Harvested',
      detail: `Public check-in or story mentions "${event}". This provides a plausible, timely excuse for urgent contact.`,
      attackerThought: 'The target recently attended or registered for this event. They will expect updates about it.',
      badgeColor: 'border-purple-500/40 text-purple-400 bg-purple-950/40',
      icon: 'Calendar'
    },
    {
      step: 4,
      phase: 'SPEAR-PHISH CRAFTING',
      title: 'Highly Personalized Message Composed',
      detail: `Attacker crafts an email/SMS using college acronyms, authentic event logos, and the target's first name.`,
      attackerThought: 'By matching their exact campus vocabulary, this will bypass their generic spam filters.',
      badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-950/40',
      icon: 'PenTool'
    },
    {
      step: 5,
      phase: 'PSYCHOLOGICAL MANIPULATION',
      title: 'Trust Established & Guard Lowered',
      detail: `Target reads the message. Because it accurately cites their real college and event, their threat radar remains dormant.`,
      attackerThought: 'They believe I am an authorized coordinator. The critical thinking barrier is down.',
      badgeColor: 'border-rose-500/40 text-rose-400 bg-rose-950/40',
      icon: 'Zap'
    },
    {
      step: 6,
      phase: 'EXPLOITATION',
      title: 'Urgent Request for Credentials or Action',
      detail: `Attacker leverages artificial 24-hour urgency, directing the target to a fake replica portal or requesting personal details.`,
      attackerThought: 'Action completed. Credentials harvested or secondary attack surface expanded.',
      badgeColor: 'border-red-500/50 text-red-400 bg-red-950/50',
      icon: 'AlertTriangle'
    }
  ];
}
