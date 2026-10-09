# 🛡️ Privacy Mirror

> **"See yourself the way an attacker sees you."**

An AI-powered cybersecurity and digital safety platform engineered for college-level competitions and cybersecurity awareness showcases. Privacy Mirror demonstrates how harmless pieces of public information (college affiliation, city, event attendance, handles, and contact visibility) can be correlated by social engineers into high-confidence attack surfaces.

---

## 🌟 Key Features & 9-Screen Architecture

1. **Screen 1 — Landing / Welcome**:
   - High-impact cyber HUD with interactive **Live Mirror Preview** (instant Normal vs. Attacker toggle).
   - Core tagline, 3 pillar feature cards (*Connect The Dots*, *Attacker View*, *Privacy Coach*), and educational privacy guarantees.
2. **Screen 2 — Profile Builder**:
   - Form for Basic Information, Social Information, Contact Visibility toggles, Location Exposure dropdown, and Account Security (2FA & Password reuse).
   - One-click **"Load Demo Profile"** (Alex, Maya, Rohan) presets with direct navigation to the Exposure Dashboard.
3. **Screen 3 — Exposure Dashboard**:
   - Central circular progress gauge displaying the **Privacy Exposure Score** (e.g. `68 / 100 · MODERATE EXPOSURE`).
   - 5-Axis interactive SVG **Threat Radar Chart** comparing Identity, Location, Social, Contact, and Security Risk.
   - Clickable **Top Exposure Risks** modal drawers detailing threat mechanisms and demonstrated attack scenarios.
4. **Screen 4 — Connect The Dots (Signature WOW Feature)**:
   - Interactive SVG Node Graph with central `YOU` node linked to College, City, Events, Interests, Username, Location, and Contact.
   - Highlighted cross-correlation vectors with glowing animated data particles showing how combinations yield exploitation hooks.
5. **Screen 5 — Attacker View (Signature Feature)**:
   - Dynamic perspective toggle: **NORMAL VIEW ↔ ATTACKER VIEW 👁**.
   - Normal view displays a clean, friendly social profile card.
   - Attacker view morphs into a dark tactical OSINT reconnaissance dossier with classified watermarks, inferred traits, and vulnerability matrices.
6. **Screen 6 — Attack Simulation**:
   - Harmless educational spear-phishing lab simulating an urgent inbound campus registration verification message.
   - 4 user choices with instant feedback: **GOOD DECISION ✓** vs. **RISKY DECISION ⚠**.
   - Identifies 4 psychological levers: **Authority**, **Trust Building**, **Personalization**, and **Urgency**.
7. **Screen 7 — Attack Breakdown**:
   - 6-step kill-chain timeline tracing how harmless public data creates an exploit.
   - Adversary reasoning at each stage and defensive takeaways.
8. **Screen 8 — Privacy Coach**:
   - Actionable High and Medium priority hardening cards with expandable **"Why this matters"** and **"How to improve"** guides.
   - Interactive **"Apply Fix"** toggles that dynamically recalculate the exposure score in real-time.
9. **Screen 9 — Before vs After**:
   - Side-by-side comparative dashboard: **Before (68 / 100)** vs **After (91 / 100)**.
   - Measured delta improvements (-44% location exposure, -43% contact exposure, +50% account security).
   - Celebratory confetti and downloadable Executive Report (.txt).

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS with custom cyber dark theme, glassmorphism panels, and scanline effects
- **Icons**: Lucide React
- **Sound Effects**: 100% Client-side Web Audio API synthesizer (no external audio assets required, toggleable mute)
- **Effects**: Canvas Confetti

---

## 🚀 Running Locally

The local Vite dev server is running at:
```
http://localhost:5173/
```

To run manually:
```bash
npm run dev
```

To build for production:
```bash
npm run build
```
