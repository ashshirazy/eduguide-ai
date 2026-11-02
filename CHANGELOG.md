# Changelog — EduGuide AI Prototype

All notable changes to this prototype are documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [1.0.0] — 2025-11-01 — FINAL DELIVERY

Complete high-fidelity UI/UX prototype covering the full student journey.

### Added
- **Phase 1** — Design system (`design-system.html`, `tokens.css`, `base.css`, `animations.css`, `components.css`, `styleguide.css`, `app.js`, `components.js`, `styleguide.js`)
- **Phase 2** — Landing page (`index.html`, `landing.css`, `landing.js`)
- **Phase 3** — 3-step registration (`register.html`, `auth.css`, `register.js`)
- **Phase 4** — Login & password recovery (`login.html`, `forgot-password.html`, `auth-forms.css`, `login.js`, `forgot-password.js`)
- **Phase 5** — Dashboard shell + overview (`dashboard.html`, `dashboard-shell.css`, `dashboard.css`, `dashboard-shell.js`, `dashboard.js`)
- **Phase 6** — Profile editor (`profile.html`, `profile.css`, `profile.js`)
- **Phase 7** — 20-question career assessment (`assessment.html`, `assessment.css`, `assessment.js`)
- **Phase 8** — Recommendations with compare tray (`recommendations.html`, `recommendations.css`, `recommendations.js`)
- **Phase 9** — 36-career explorer (`explore.html`, `explore.css`, `explore.js`)
- **Phase 10** — Career details + interactive roadmap (`career-details.html`, `career-details.css`, `career-details.js`)
- **Phase 11** — Learning resources (`resources.html`, `resources.css`, `resources.js`)
- **Phase 12** — About & contact (`about.html`, `contact.html`, `about-contact.css`, `about-contact.js`)
- **Phase 13** — Saved, roadmap, settings pages (`saved.html`, `roadmap.html`, `settings.html`, `pages-extra.css`, `saved.js`, `roadmap.js`, `settings.js`)
- **Phase 14** — Accessibility + print layer (`a11y-print.css`, `a11y.js`), documentation (`README.md`, `CHANGELOG.md`)

### Fixed
- Focus trap in modals (Phase 14)
- Focus return to trigger on modal close (Phase 14)
- Skip-link keyboard focus forwarding (Phase 14)
- Universal `prefers-reduced-motion` CSS override (Phase 14)
- Universal focus-visible rings on all custom components (Phase 14)

### Documentation
- `README.md` — Complete handoff guide for frontend developers
- `CHANGELOG.md` — This file

---

## Legend

- **Added** — New screens, components, or capabilities
- **Fixed** — Corrections to previously delivered phases
- **Documentation** — New or updated docs
- **Removed** — Anything deprecated or replaced

---

## Version Convention

| Version | Meaning |
|---|---|
| **1.0.0** | Complete prototype delivered (all 14 phases) |
| **0.x.x** | Pre-1.0 iterations during phase delivery |