/* ============================================================
   EduGuide AI — Prototype Navigator (Phase 13)
   ============================================================ */
(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     SCREENS INVENTORY
     ============================================================ */
  const SCREENS = [
    /* ---------- MARKETING ---------- */
    { cat: 'marketing', path: 'index.html', title: 'Landing Page', desc: 'The public homepage with hero, features, categories, testimonials and FAQ.', icon: 'bi-house', categoryLabel: 'Marketing' },
    { cat: 'marketing', path: 'about.html', title: 'About Us', desc: 'Mission, vision, objectives, values and how EduGuide AI helps students.', icon: 'bi-info-circle', categoryLabel: 'Marketing' },
    { cat: 'marketing', path: 'contact.html', title: 'Contact', desc: 'Contact form with live validation, office info and social links.', icon: 'bi-chat-dots', categoryLabel: 'Marketing' },

    /* ---------- AUTHENTICATION ---------- */
    { cat: 'auth', path: 'register.html', title: 'Student Registration', desc: '3-step signup with dynamic academic levels and password strength.', icon: 'bi-person-plus', categoryLabel: 'Authentication' },
    { cat: 'auth', path: 'login.html', title: 'Login', desc: 'Sign in with email/password, remember me and social login.', icon: 'bi-box-arrow-in-right', categoryLabel: 'Authentication' },
    { cat: 'auth', path: 'forgot-password.html', title: 'Password Recovery', desc: 'Password reset flow with email confirmation success state.', icon: 'bi-shield-lock', categoryLabel: 'Authentication' },

    /* ---------- CORE EXPERIENCE ---------- */
    { cat: 'core', path: 'assessment.html', title: 'Career Assessment', desc: '20-question, 8-section assessment with persistent progress.', icon: 'bi-clipboard2-pulse', categoryLabel: 'Core Experience' },
    { cat: 'core', path: 'recommendations.html', title: 'Recommendations', desc: '9 personalized career matches with filters and compare tool.', icon: 'bi-stars', categoryLabel: 'Core Experience' },

    /* ---------- DISCOVERY ---------- */
    { cat: 'discovery', path: 'dashboard.html', title: 'Dashboard', desc: 'Personalized welcome, stats, progress, recommendations and next steps.', icon: 'bi-grid-1x2', categoryLabel: 'Discovery' },
    { cat: 'discovery', path: 'explore.html', title: 'Career Explorer', desc: 'Search and filter 36 careers across 10 categories.', icon: 'bi-compass', categoryLabel: 'Discovery' },
    { cat: 'discovery', path: 'career-details.html', title: 'Career Details', desc: 'Full career breakdown with interactive 4-stage roadmap.', icon: 'bi-briefcase', categoryLabel: 'Discovery' },

    /* ---------- ACCOUNT & UTILITIES ---------- */
    { cat: 'account', path: 'profile.html', title: 'My Profile', desc: 'Edit personal info, education, interests and security.', icon: 'bi-person', categoryLabel: 'Account' },
    { cat: 'account', path: 'resources.html', title: 'Learning Resources', desc: '24 resources across 7 categories with filters and detail modals.', icon: 'bi-collection-play', categoryLabel: 'Account' },
    { cat: 'account', path: 'saved.html', title: 'Saved Careers', desc: 'Bookmarked careers and saved resources in one place.', icon: 'bi-bookmark', categoryLabel: 'Account' },
    { cat: 'account', path: 'roadmap.html', title: 'Learning Roadmaps', desc: 'Roadmap progress across all in-progress careers.', icon: 'bi-signpost-split', categoryLabel: 'Account' },
    { cat: 'account', path: 'settings.html', title: 'Settings', desc: 'Account preferences, notifications, privacy and appearance.', icon: 'bi-gear', categoryLabel: 'Account' }
  ];

  /* ============================================================
     DOM
     ============================================================ */
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);
  const grid = $('#screenGrid');

  /* ============================================================
     RENDER SCREENS
     ============================================================ */
  const renderScreens = (filter = 'all') => {
    if (!grid) return;
    const list = filter === 'all'
      ? SCREENS
      : SCREENS.filter((s) => s.cat === filter);

    grid.innerHTML = list.map((s, i) => `
      <a href="${s.path}" class="pm-screen" style="animation-delay:${i * 0.04}s">
        <div class="pm-screen__preview">
          <span class="pm-screen__icon"><i class="bi ${s.icon}"></i></span>
          <span class="pm-screen__status"><i class="bi bi-check2"></i> Live</span>
        </div>
        <div class="pm-screen__body">
          <span class="pm-screen__category">${s.categoryLabel}</span>
          <h3 class="pm-screen__title">${s.title}</h3>
          <p class="pm-screen__desc">${s.desc}</p>
          <span class="pm-screen__path"><i class="bi bi-file-earmark-code"></i> ${s.path}</span>
        </div>
      </a>
    `).join('');
  };

  /* ============================================================
     CATEGORY FILTER
     ============================================================ */
  $$('[data-cat]').forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('[data-cat]').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      renderScreens(btn.dataset.cat);
    });
  });

  /* ============================================================
     GUIDED JOURNEY BUTTON
     ============================================================ */
  document.getElementById('startJourneyBtn')?.addEventListener('click', () => {
    const target = document.getElementById('walkthrough');
    if (target) {
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  });

  /* ============================================================
     COUNTERS
     ============================================================ */
  const counters = $$('[data-count]');
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count || '0');
    const suffix = el.dataset.suffix || '';
    if (prefersReducedMotion) { el.textContent = target + suffix; return; }
    const start = performance.now();
    const dur = 1400;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(target * easeOutCubic(p)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { animateCount(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => io.observe(c));
  } else {
    counters.forEach(animateCount);
  }

  /* ============================================================
     REVEAL ON SCROLL
     ============================================================ */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = parseInt(entry.target.dataset.delay || '0', 10);
        setTimeout(() => entry.target.classList.add('is-visible'), delay * 100);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* ============================================================
     INIT
     ============================================================ */
  renderScreens();
})();