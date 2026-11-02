/* ============================================================
   EduGuide AI — Learning Roadmap Overview (Phase 13)
   ============================================================ */
(() => {
  'use strict';

  /* ---------- Roadmap definitions (mirror career-details.js) ---------- */
  const ROADMAPS = [
    {
      id: 'software-engineer',
      title: 'Software Engineer',
      cat: 'Technology',
      icon: 'bi-code-slash',
      color: '#6C4CF1',
      bg: '#EDE8FF',
      storageKey: 'eg_roadmap_software-engineer_v1',
      stages: [
        { name: 'Beginner', total: 6 },
        { name: 'Intermediate', total: 8 },
        { name: 'Advanced', total: 8 },
        { name: 'Professional', total: 8 }
      ]
    }
  ];

  const MODULE_IDS_BY_STAGE = {
    'software-engineer': {
      Beginner:       ['b1','b2','b3','b4','b5','b6'],
      Intermediate:   ['i1','i2','i3','i4','i5','i6','i7','i8'],
      Advanced:       ['a1','a2','a3','a4','a5','a6','a7','a8'],
      Professional:   ['p1','p2','p3','p4','p5','p6','p7','p8']
    }
  };

  /* ---------- Load completion sets ---------- */
  const loadSet = (key) => {
    try {
      const raw = JSON.parse(localStorage.getItem(key) || 'null');
      if (Array.isArray(raw)) return new Set(raw);
    } catch (_) {}
    /* Seed demo: a few modules complete on first visit */
    return new Set(['b1','b2','b3','b4','i1','i2','i3']);
  };
  const saveSet = (key, set) => {
    try { localStorage.setItem(key, JSON.stringify([...set])); } catch (_) {}
  };

  /* ---------- DOM ---------- */
  const grid = document.getElementById('roadmapGrid');
  const empty = document.getElementById('roadmapEmpty');
  const rmDonut = document.getElementById('rmDonut');
  const rmPct = document.getElementById('rmPct');
  const rmModulesDone = document.getElementById('rmModulesDone');
  const rmModulesTotal = document.getElementById('rmModulesTotal');
  const rmStagesDone = document.getElementById('rmStagesDone');
  const rmHours = document.getElementById('rmHours');
  const rmCareersCount = document.getElementById('rmCareersCount');

  if (!grid) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Render a career roadmap card ---------- */
  const renderCard = (rm, completedSet) => {
    const stageData = rm.stages.map((s) => {
      const ids = MODULE_IDS_BY_STAGE[rm.id]?.[s.name] || [];
      const done = ids.filter((id) => completedSet.has(id)).length;
      const pct = ids.length ? Math.round((done / ids.length) * 100) : 0;
      return { ...s, done, pct };
    });

    const totalDone = stageData.reduce((sum, s) => sum + s.done, 0);
    const totalModules = stageData.reduce((sum, s) => sum + s.total, 0);
    const overallPct = totalModules ? Math.round((totalDone / totalModules) * 100) : 0;

    return `
      <article class="rm-card" style="--pe-color:${rm.color};--pe-bg:${rm.bg}">
        <div class="rm-card__head">
          <span class="rm-card__icon"><i class="bi ${rm.icon}"></i></span>
          <div class="rm-card__body">
            <h3 class="rm-card__title">${rm.title}</h3>
            <p class="rm-card__cat">${rm.cat} · ${totalDone}/${totalModules} modules</p>
          </div>
          <span class="rm-card__pct">${overallPct}%</span>
        </div>
        <div class="rm-card__stages">
          ${stageData.map((s) => `
            <div class="rm-stage">
              <span class="rm-stage__label">${s.name}</span>
              <div class="rm-stage__bar rm-stage__bar--${s.name.toLowerCase()}">
                <span style="width:${s.pct}%"></span>
              </div>
              <span class="rm-stage__pct">${s.pct}%</span>
            </div>
          `).join('')}
        </div>
        <div class="rm-card__cta">
          <a href="career-details.html" class="eg-btn eg-btn--primary eg-btn--sm">
            Continue roadmap <i class="bi bi-arrow-right"></i>
          </a>
        </div>
      </article>
    `;
  };

  /* ---------- Main render ---------- */
  const render = () => {
    const activeRoadmaps = [];
    let allCompletedModules = 0;
    let allTotalModules = 0;
    let stagesCompletedTotal = 0;

    ROADMAPS.forEach((rm) => {
      const set = loadSet(rm.storageKey);
      /* Only count as "started" if at least 1 module complete OR seeded progress */
      if (set.size > 0) {
        activeRoadmaps.push({ rm, set });

        rm.stages.forEach((s) => {
          const ids = MODULE_IDS_BY_STAGE[rm.id]?.[s.name] || [];
          allTotalModules += ids.length;
          const done = ids.filter((id) => set.has(id)).length;
          allCompletedModules += done;
          if (done === ids.length && ids.length > 0) stagesCompletedTotal++;
        });
      }
    });

    /* Master donut */
    const pct = allTotalModules ? Math.round((allCompletedModules / allTotalModules) * 100) : 0;
    if (rmPct) rmPct.textContent = pct + '%';
    if (rmDonut) {
      const circumference = 2 * Math.PI * 48;
      const offset = circumference * (1 - pct / 100);
      if (prefersReducedMotion) rmDonut.setAttribute('stroke-dashoffset', offset);
      else requestAnimationFrame(() => rmDonut.setAttribute('stroke-dashoffset', offset));
    }
    if (rmModulesDone) rmModulesDone.textContent = allCompletedModules;
    if (rmModulesTotal) rmModulesTotal.textContent = allTotalModules;
    if (rmStagesDone) rmStagesDone.textContent = stagesCompletedTotal;
    if (rmHours) {
      const remaining = (allTotalModules - allCompletedModules) * 10;
      rmHours.textContent = remaining > 0 ? `~${remaining}h` : '🎉';
    }
    if (rmCareersCount) rmCareersCount.textContent = activeRoadmaps.length;

    /* Grid */
    if (activeRoadmaps.length === 0) {
      grid.innerHTML = '';
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;
    grid.innerHTML = activeRoadmaps.map(({ rm, set }) => renderCard(rm, set)).join('');
  };

  render();
})();