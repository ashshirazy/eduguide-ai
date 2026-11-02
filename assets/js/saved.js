/* ============================================================
   EduGuide AI — Saved Careers (Phase 13)
   ============================================================ */
(() => {
  'use strict';

  const SAVED_KEY = 'eg_saved_careers_v1';

  /* ---------- Demo data (matches careers shown across the app) ---------- */
  const CAREERS = {
    'software-engineer': {
      id: 'software-engineer', title: 'Software Engineer', cat: 'technology',
      catLabel: 'Technology', icon: 'bi-code-slash', color: '#6C4CF1', bg: '#EDE8FF',
      desc: 'Design, build and maintain software systems used by millions of people worldwide.',
      match: 94, education: 'B.Sc. Computer Science', salary: '₦6M – ₦18M',
      savedAt: Date.now() - 2 * 3600 * 1000
    },
    'data-scientist': {
      id: 'data-scientist', title: 'Data Scientist', cat: 'technology',
      catLabel: 'Technology', icon: 'bi-graph-up', color: '#0284C7', bg: '#E0F2FE',
      desc: 'Extract insights from data using statistics and machine learning to guide decisions.',
      match: 89, education: 'B.Sc. + M.Sc.', salary: '₦7M – ₦20M',
      savedAt: Date.now() - 24 * 3600 * 1000
    },
    'ux-designer': {
      id: 'ux-designer', title: 'UX Designer', cat: 'creative',
      catLabel: 'Creative', icon: 'bi-palette', color: '#D97706', bg: '#FEF3C7',
      desc: 'Shape how people experience digital products through research, design and testing.',
      match: 82, education: 'B.A. Design / HCI', salary: '₦4M – ₦12M',
      savedAt: Date.now() - 2 * 24 * 3600 * 1000
    },
    'medical-doctor': {
      id: 'medical-doctor', title: 'Medical Doctor', cat: 'health',
      catLabel: 'Health', icon: 'bi-heart-pulse', color: '#DC2626', bg: '#FEE2E2',
      desc: 'Diagnose and treat patients, improving health and saving lives every day.',
      match: 76, education: 'MBBS', salary: '₦5M – ₦15M',
      savedAt: Date.now() - 3 * 24 * 3600 * 1000
    },
    'product-manager': {
      id: 'product-manager', title: 'Product Manager', cat: 'business',
      catLabel: 'Business', icon: 'bi-briefcase', color: '#0284C7', bg: '#E0F2FE',
      desc: 'Lead teams to build products that solve real customer problems.',
      match: 74, education: 'B.Sc. or MBA', salary: '₦7M – ₦18M',
      savedAt: Date.now() - 4 * 24 * 3600 * 1000
    }
  };

  const state = {
    category: 'all',
    sort: 'recent',
    savedIds: []
  };

  /* ---------- Load saved IDs (with demo seed) ---------- */
  const load = () => {
    try {
      const raw = JSON.parse(localStorage.getItem(SAVED_KEY) || 'null');
      if (Array.isArray(raw) && raw.length >= 0) {
        state.savedIds = raw;
        return;
      }
    } catch (_) {}
    /* Seed with demo data on first visit */
    state.savedIds = ['software-engineer', 'data-scientist', 'ux-designer', 'medical-doctor', 'product-manager'];
    try { localStorage.setItem(SAVED_KEY, JSON.stringify(state.savedIds)); } catch (_) {}
  };
  load();

  const persist = () => {
    try { localStorage.setItem(SAVED_KEY, JSON.stringify(state.savedIds)); } catch (_) {}
  };

  /* ---------- DOM ---------- */
  const grid = document.getElementById('savedGrid');
  const empty = document.getElementById('savedEmpty');
  const count = document.getElementById('savedCount');
  const sidebarCount = document.getElementById('sidebarSavedCount');
  const chips = document.querySelectorAll('[data-cat]');
  const sortLabel = document.getElementById('savedSortLabel');

  if (!grid) return;

  /* ---------- Helpers ---------- */
  const savedCareers = () => state.savedIds.map((id) => CAREERS[id]).filter(Boolean);

  const relativeTime = (ts) => {
    const diff = Date.now() - ts;
    const h = Math.floor(diff / 3600000);
    if (h < 1) return 'just now';
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    if (d < 7) return `${d}d ago`;
    return new Date(ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  const matchClass = (m) => m >= 85 ? '' : m >= 75 ? '--mid' : '--low';

  /* ---------- Filter + sort ---------- */
  const getFiltered = () => {
    let list = savedCareers();
    if (state.category !== 'all') list = list.filter((c) => c.cat === state.category);
    switch (state.sort) {
      case 'name': list.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'match': list.sort((a, b) => b.match - a.match); break;
      default: list.sort((a, b) => b.savedAt - a.savedAt);
    }
    return list;
  };

  /* ---------- Render card ---------- */
  const renderCard = (c) => `
    <article class="pe-card" data-id="${c.id}"
             style="--pe-color:${c.color};--pe-bg:${c.bg}">
      <div class="pe-card__head">
        <span class="pe-card__icon"><i class="bi ${c.icon}"></i></span>
        <span class="pe-card__match pe-card__match${matchClass(c.match)}">${c.match}% match</span>
      </div>
      <h3 class="pe-card__title">${c.title}</h3>
      <p class="pe-card__cat">${c.catLabel} · Saved ${relativeTime(c.savedAt)}</p>
      <p class="pe-card__desc">${c.desc}</p>
      <div class="pe-card__meta">
        <span class="pe-card__meta-item"><i class="bi bi-mortarboard"></i> <span>${c.education}</span></span>
        <span class="pe-card__meta-item"><i class="bi bi-cash-coin"></i> <span>${c.salary}</span></span>
      </div>
      <div class="pe-card__actions">
        <button class="pe-card__remove" data-remove="${c.id}" aria-label="Remove from saved">
          <i class="bi bi-bookmark-x"></i>
        </button>
        <a class="pe-card__view" href="career-details.html">
          View details <i class="bi bi-arrow-right"></i>
        </a>
      </div>
    </article>
  `;

  /* ---------- Render ---------- */
  const render = () => {
    const list = getFiltered();

    if (count) count.textContent = savedCareers().length;
    if (sidebarCount) sidebarCount.textContent = savedCareers().length;

    if (list.length === 0) {
      grid.innerHTML = '';
      if (empty) empty.hidden = false;
      /* If there ARE saved careers but filter is empty, show different message */
      if (savedCareers().length > 0 && empty) {
        empty.querySelector('h3').textContent = 'No careers in this category';
        empty.querySelector('p').textContent = 'Try selecting a different category.';
      } else if (empty) {
        empty.querySelector('h3').textContent = 'No saved careers yet';
        empty.querySelector('p').textContent = 'Tap the bookmark icon on any career to save it here.';
      }
      return;
    }
    if (empty) empty.hidden = true;
    grid.innerHTML = list.map(renderCard).join('');

    grid.querySelectorAll('[data-remove]').forEach((btn) => {
      btn.addEventListener('click', () => remove(btn.dataset.remove));
    });
  };

  /* ---------- Remove ---------- */
  const remove = (id) => {
    const career = CAREERS[id];
    state.savedIds = state.savedIds.filter((x) => x !== id);
    persist();
    render();
    if (window.egToast && career) window.egToast(`Removed ${career.title} from saved`);
  };

  /* ---------- Filters ---------- */
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      state.category = chip.dataset.cat;
      render();
    });
  });

  document.querySelectorAll('[data-sort]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.sort = btn.dataset.sort;
      const map = { recent: 'Recently saved', match: 'Best match', name: 'Name (A–Z)' };
      if (sortLabel) sortLabel.textContent = map[state.sort];
      document.querySelectorAll('[data-eg-dd]').forEach((dd) => dd.classList.remove('is-open'));
      render();
    });
  });

  /* ---------- INIT ---------- */
  render();
})();pp