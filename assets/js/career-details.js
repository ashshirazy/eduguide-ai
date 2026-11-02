/* ============================================================
   EduGuide AI — Career Details & Roadmap (Phase 10)
   Depends on dashboard-shell.js + app.js (egToast) + components.js
   ============================================================ */
(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     ROADMAP DATA — 4 stages · 32 modules
     ============================================================ */
  const ROADMAP = [
    {
      id: 'beginner',
      title: 'Beginner',
      subtitle: 'Foundations',
      color: '#6C4CF1',
      bg: '#EDE8FF',
      modules: [
        { id: 'b1', title: 'HTML & CSS fundamentals', duration: '8 hours', type: 'Course' },
        { id: 'b2', title: 'JavaScript basics — variables, functions, loops', duration: '12 hours', type: 'Course' },
        { id: 'b3', title: 'Build 3 small web pages from scratch', duration: '6 hours', type: 'Project' },
        { id: 'b4', title: 'Version control with Git & GitHub', duration: '4 hours', type: 'Course' },
        { id: 'b5', title: 'Command-line basics', duration: '3 hours', type: 'Article' },
        { id: 'b6', title: 'Intro to computer science concepts', duration: '10 hours', type: 'Video' }
      ]
    },
    {
      id: 'intermediate',
      title: 'Intermediate',
      subtitle: 'Core Skills',
      color: '#2EA8FF',
      bg: '#E0F2FE',
      modules: [
        { id: 'i1', title: 'Modern JavaScript (ES6+) & async patterns', duration: '14 hours', type: 'Course' },
        { id: 'i2', title: 'React — components, state, hooks', duration: '20 hours', type: 'Course' },
        { id: 'i3', title: 'Node.js & REST API design', duration: '16 hours', type: 'Course' },
        { id: 'i4', title: 'Databases — SQL & NoSQL fundamentals', duration: '12 hours', type: 'Course' },
        { id: 'i5', title: 'Testing — unit and integration', duration: '8 hours', type: 'Course' },
        { id: 'i6', title: 'Data structures & algorithms basics', duration: '18 hours', type: 'Course' },
        { id: 'i7', title: 'Build a full-stack todo app', duration: '16 hours', type: 'Project' },
        { id: 'i8', title: 'Deployment — Heroku, Vercel, Netlify', duration: '4 hours', type: 'Article' }
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced',
      subtitle: 'Specialisation',
      color: '#10B981',
      bg: '#D1FAE5',
      modules: [
        { id: 'a1', title: 'System design — scalable architecture', duration: '16 hours', type: 'Course' },
        { id: 'a2', title: 'Advanced React — patterns & performance', duration: '12 hours', type: 'Course' },
        { id: 'a3', title: 'TypeScript for large applications', duration: '10 hours', type: 'Course' },
        { id: 'a4', title: 'Cloud fundamentals — AWS or GCP', duration: '20 hours', type: 'Course' },
        { id: 'a5', title: 'CI/CD pipelines & DevOps basics', duration: '8 hours', type: 'Article' },
        { id: 'a6', title: 'Security best practices for developers', duration: '6 hours', type: 'Course' },
        { id: 'a7', title: 'Contribute to an open-source project', duration: '20 hours', type: 'Project' },
        { id: 'a8', title: 'Build a production-grade application', duration: '24 hours', type: 'Project' }
      ]
    },
    {
      id: 'professional',
      title: 'Professional',
      subtitle: 'Career Ready',
      color: '#F59E0B',
      bg: '#FEF3C7',
      modules: [
        { id: 'p1', title: 'Technical interview preparation', duration: '20 hours', type: 'Course' },
        { id: 'p2', title: 'Build an outstanding portfolio site', duration: '10 hours', type: 'Project' },
        { id: 'p3', title: 'Soft skills — communication & teamwork', duration: '6 hours', type: 'Article' },
        { id: 'p4', title: 'Earn 1 industry certification (AWS / GCP / Meta)', duration: '30 hours', type: 'Course' },
        { id: 'p5', title: 'Freelance or internship experience', duration: '3 months', type: 'Project' },
        { id: 'p6', title: 'Mock interviews with a mentor', duration: '4 hours', type: 'Course' },
        { id: 'p7', title: 'Negotiation & job offer strategies', duration: '3 hours', type: 'Article' },
        { id: 'p8', title: 'Land your first software engineering role', duration: 'Ongoing', type: 'Project' }
      ]
    }
  ];

  const STORAGE_KEY = 'eg_roadmap_software-engineer_v1';
  let completed = new Set();

  /* ============================================================
     LOAD / SAVE
     ============================================================ */
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (Array.isArray(saved)) completed = new Set(saved);
  } catch (_) {}

  const save = () => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed])); } catch (_) {}
  };

  /* ============================================================
     DOM
     ============================================================ */
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);
  const roadmapContainer = $('#roadmapContainer');

  /* ============================================================
     CALCULATE STAGE PROGRESS
     ============================================================ */
  const stageProgress = (stage) => {
    const done = stage.modules.filter((m) => completed.has(m.id)).length;
    return { done, total: stage.modules.length, pct: Math.round((done / stage.modules.length) * 100) };
  };

  const overallProgress = () => {
    const total = ROADMAP.reduce((sum, s) => sum + s.modules.length, 0);
    const done = completed.size;
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  };

  /* ============================================================
     RENDER ROADMAP
     ============================================================ */
  const renderRoadmap = () => {
    if (!roadmapContainer) return;

    roadmapContainer.innerHTML = ROADMAP.map((stage, idx) => {
      const { done, total, pct } = stageProgress(stage);
      const isDone = done === total;
      const isOpen = idx === 0; // first stage open by default

      const badge = isDone
        ? `<span class="cd-stage__badge cd-stage__badge--done">Complete</span>`
        : pct > 0
          ? `<span class="cd-stage__badge cd-stage__badge--inprogress">In progress</span>`
          : `<span class="cd-stage__badge cd-stage__badge--locked">Not started</span>`;

      return `
        <div class="cd-stage ${isOpen ? 'is-open' : ''} ${isDone ? 'is-complete' : ''}"
             data-stage="${stage.id}"
             style="--stage-color:${stage.color};--stage-bg:${stage.bg}">
          <button class="cd-stage__head" data-stage-toggle="${stage.id}" aria-expanded="${isOpen}">
            <span class="cd-stage__num">${idx + 1}</span>
            <div class="cd-stage__info">
              <div class="cd-stage__title-row">
                <h3 class="cd-stage__title">${stage.title}</h3>
                ${badge}
              </div>
              <p class="cd-stage__meta">${stage.subtitle} · ${total} modules · ${pct}% complete</p>
            </div>
            <div class="cd-stage__right">
              <span class="cd-stage__progress-text">${done}/${total}</span>
              <div class="cd-stage__progress"><span style="width:${pct}%"></span></div>
              <i class="bi bi-chevron-down cd-stage__chevron"></i>
            </div>
          </button>
          <div class="cd-stage__body">
            <div class="cd-stage__body-inner">
              <div class="cd-modules">
                ${stage.modules.map((m) => `
                  <div class="cd-module ${completed.has(m.id) ? 'is-done' : ''}"
                       data-module="${m.id}"
                       role="checkbox"
                       aria-checked="${completed.has(m.id)}"
                       tabindex="0">
                    <span class="cd-module__check"><i class="bi bi-check2"></i></span>
                    <div class="cd-module__info">
                      <p class="cd-module__title">${m.title}</p>
                      <p class="cd-module__meta">
                        <span><i class="bi bi-clock"></i> ${m.duration}</span>
                        <span><i class="bi bi-tag"></i> ${m.type}</span>
                      </p>
                    </div>
                  </div>
                `).join('')}
              </div>
              <div class="cd-stage__cta">
                <p class="cd-stage__cta-text">
                  ${isDone
                    ? `<i class="bi bi-check2-circle" style="color:#10B981;"></i> Stage complete — well done!`
                    : `<i class="bi bi-info-circle"></i> Check off modules as you finish them.`}
                </p>
                <button class="eg-btn eg-btn--ghost eg-btn--sm" data-stage-complete="${stage.id}">
                  <i class="bi bi-check2-all"></i> Mark stage complete
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    /* Toggle expand */
    roadmapContainer.querySelectorAll('[data-stage-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const stageEl = btn.closest('.cd-stage');
        const isOpen = stageEl.classList.contains('is-open');
        stageEl.classList.toggle('is-open', !isOpen);
        btn.setAttribute('aria-expanded', String(!isOpen));
      });
    });

    /* Module toggle */
    roadmapContainer.querySelectorAll('[data-module]').forEach((el) => {
      const handle = () => {
        const id = el.dataset.module;
        if (completed.has(id)) completed.delete(id);
        else completed.add(id);
        save();
        el.classList.toggle('is-done');
        el.setAttribute('aria-checked', String(completed.has(id)));
        if (window.egToast) {
          window.egToast(completed.has(id) ? 'Module completed ✅' : 'Module unchecked');
        }
        refreshProgressDisplays();
        updateStageHeaders();
      };
      el.addEventListener('click', handle);
      el.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          handle();
        }
      });
    });

    /* Mark whole stage complete */
    roadmapContainer.querySelectorAll('[data-stage-complete]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const stageId = btn.dataset.stageComplete;
        const stage = ROADMAP.find((s) => s.id === stageId);
        if (!stage) return;
        const allDone = stage.modules.every((m) => completed.has(m.id));
        stage.modules.forEach((m) => {
          if (allDone) completed.delete(m.id);
          else completed.add(m.id);
        });
        save();
        renderRoadmap();
        refreshProgressDisplays();
        if (window.egToast) {
          window.egToast(allDone ? 'Stage unchecked' : `${stage.title} stage marked complete 🎉`);
        }
      });
    });

    refreshProgressDisplays();
  };

  /* ============================================================
     REFRESH DISPLAYS
     ============================================================ */
  const refreshProgressDisplays = () => {
    const { done, total, pct } = overallProgress();

    /* Mini donut */
    const miniDonut = document.getElementById('miniDonut');
    const miniPct = document.getElementById('miniPct');
    const miniDone = document.getElementById('miniDone');
    const miniTotal = document.getElementById('miniTotal');
    const miniHours = document.getElementById('miniHours');

    if (miniDonut) {
      const circumference = 2 * Math.PI * 40; // 251.3
      const offset = circumference * (1 - pct / 100);
      if (prefersReducedMotion) {
        miniDonut.setAttribute('stroke-dashoffset', offset);
      } else {
        requestAnimationFrame(() => {
          miniDonut.setAttribute('stroke-dashoffset', offset);
        });
      }
    }
    if (miniPct) miniPct.textContent = pct + '%';
    if (miniDone) miniDone.textContent = done;
    if (miniTotal) miniTotal.textContent = total;
    if (miniHours) {
      const remainingHours = (total - done) * 10; // rough estimate
      miniHours.textContent = remainingHours > 0 ? `~${remainingHours}h` : '🎉';
    }

    /* Update per-stage chips */
    ROADMAP.forEach((stage) => {
      const el = roadmapContainer?.querySelector(`[data-stage="${stage.id}"]`);
      if (!el) return;
      const { done: d, total: t, pct: p } = stageProgress(stage);
      const progressBar = el.querySelector('.cd-stage__progress span');
      const progressText = el.querySelector('.cd-stage__progress-text');
      if (progressBar) progressBar.style.width = p + '%';
      if (progressText) progressText.textContent = `${d}/${t}`;
    });
  };

  const updateStageHeaders = () => {
    if (!roadmapContainer) return;
    ROADMAP.forEach((stage) => {
      const el = roadmapContainer.querySelector(`[data-stage="${stage.id}"]`);
      if (!el) return;
      const { done, total, pct } = stageProgress(stage);
      const isDone = done === total;
      el.classList.toggle('is-complete', isDone);

      const badge = el.querySelector('.cd-stage__badge');
      if (badge) {
        if (isDone) {
          badge.className = 'cd-stage__badge cd-stage__badge--done';
          badge.textContent = 'Complete';
        } else if (pct > 0) {
          badge.className = 'cd-stage__badge cd-stage__badge--inprogress';
          badge.textContent = 'In progress';
        } else {
          badge.className = 'cd-stage__badge cd-stage__badge--locked';
          badge.textContent = 'Not started';
        }
      }

      const meta = el.querySelector('.cd-stage__meta');
      if (meta) {
        meta.textContent = `${stage.subtitle} · ${total} modules · ${pct}% complete`;
      }

      const ctaText = el.querySelector('.cd-stage__cta-text');
      if (ctaText) {
        ctaText.innerHTML = isDone
          ? `<i class="bi bi-check2-circle" style="color:#10B981;"></i> Stage complete — well done!`
          : `<i class="bi bi-info-circle"></i> Check off modules as you finish them.`;
      }
    });
  };

  /* ============================================================
     TABS
     ============================================================ */
  const tabs = document.querySelectorAll('[data-cd-tab]');
  const panels = document.querySelectorAll('[data-cd-panel]');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.cdTab;
      tabs.forEach((t) => {
        t.classList.toggle('is-active', t === tab);
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
      });
      panels.forEach((p) => {
        p.classList.toggle('is-active', p.dataset.cdPanel === target);
      });
      window.scrollTo({
        top: (document.querySelector('.cd-tabs')?.offsetTop || 0) - 80,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  });

  /* Goto button inside mini card */
  document.querySelectorAll('[data-cd-goto]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.cdGoto;
      const tab = document.querySelector(`[data-cd-tab="${target}"]`);
      if (tab) tab.click();
    });
  });

  /* ============================================================
     SAVE CAREER (hero button)
     ============================================================ */
  const heroSaveBtn = document.getElementById('heroSaveBtn');
  const SAVED_KEY = 'eg_saved_careers_v1';
  let savedCareers = new Set();
  try {
    const s = JSON.parse(localStorage.getItem(SAVED_KEY) || '[]');
    if (Array.isArray(s)) savedCareers = new Set(s);
  } catch (_) {}

  const updateHeroSaveBtn = () => {
    if (!heroSaveBtn) return;
    const isSaved = savedCareers.has('software-engineer');
    heroSaveBtn.classList.toggle('is-saved', isSaved);
    heroSaveBtn.innerHTML = isSaved
      ? '<i class="bi bi-bookmark-fill"></i> <span>Saved</span>'
      : '<i class="bi bi-bookmark"></i> <span>Save career</span>';
  };

  heroSaveBtn?.addEventListener('click', () => {
    if (savedCareers.has('software-engineer')) {
      savedCareers.delete('software-engineer');
      if (window.egToast) window.egToast('Removed from saved careers');
    } else {
      savedCareers.add('software-engineer');
      if (window.egToast) window.egToast('Saved to your careers ❤️');
    }
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify([...savedCareers]));
    } catch (_) {}
    updateHeroSaveBtn();
  });
  updateHeroSaveBtn();

  /* ============================================================
     SHARE
     ============================================================ */
  document.getElementById('heroShareBtn')?.addEventListener('click', async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Software Engineer — EduGuide AI',
          text: 'Check out this career on EduGuide AI',
          url
        });
      } catch (_) {}
    } else {
      try {
        await navigator.clipboard.writeText(url);
        if (window.egToast) window.egToast('Link copied to clipboard ✅');
      } catch (_) {
        if (window.egToast) window.egToast('Unable to copy link');
      }
    }
  });

  /* ============================================================
     EXPAND ALL / RESET
     ============================================================ */
  const expandAllBtn = document.getElementById('expandAllBtn');
  let allExpanded = false;
  expandAllBtn?.addEventListener('click', () => {
    allExpanded = !allExpanded;
    document.querySelectorAll('.cd-stage').forEach((el) => {
      el.classList.toggle('is-open', allExpanded);
      const head = el.querySelector('[data-stage-toggle]');
      if (head) head.setAttribute('aria-expanded', String(allExpanded));
    });
    expandAllBtn.innerHTML = allExpanded
      ? '<i class="bi bi-arrows-collapse"></i> Collapse all'
      : '<i class="bi bi-arrows-expand"></i> Expand all';
  });

  document.getElementById('resetRoadmapBtn')?.addEventListener('click', () => {
    if (!confirm('Reset all roadmap progress? This cannot be undone.')) return;
    completed.clear();
    save();
    renderRoadmap();
    if (window.egToast) window.egToast('Roadmap progress reset');
  });

  /* ============================================================
     REVEAL ON SCROLL
     ============================================================ */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* ============================================================
     INIT
     ============================================================ */
  renderRoadmap();
})();