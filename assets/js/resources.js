/* ============================================================
   EduGuide AI — Learning Resources (Phase 11)
   Depends on dashboard-shell.js + app.js (egToast) + components.js
   ============================================================ */
(() => {
  'use strict';

  /* ============================================================
     CATEGORIES
     ============================================================ */
  const CATEGORIES = [
    { id: 'article',       label: 'Articles',              icon: 'bi-file-text',      color: '#6C4CF1', bg: '#EDE8FF' },
    { id: 'video',         label: 'Educational Videos',    icon: 'bi-camera-video',   color: '#DC2626', bg: '#FEE2E2' },
    { id: 'book',          label: 'Books',                 icon: 'bi-book',           color: '#D97706', bg: '#FEF3C7' },
    { id: 'course',        label: 'Online Courses',        icon: 'bi-play-btn',       color: '#0284C7', bg: '#E0F2FE' },
    { id: 'scholarship',   label: 'Scholarships',          icon: 'bi-award',          color: '#059669', bg: '#D1FAE5' },
    { id: 'certification', label: 'Certifications',        icon: 'bi-patch-check',    color: '#DB2777', bg: '#FCE7F3' },
    { id: 'skill',         label: 'Skill Development',     icon: 'bi-tools',          color: '#0D9488', bg: '#CCFBF1' }
  ];

  const CAT_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

  /* ============================================================
     RESOURCES — 24 resources across 7 categories
     ============================================================ */
  const RESOURCES = [
    /* ---------- ARTICLES (4) ---------- */
    {
      id: 'a1', cat: 'article', title: 'How to Choose the Right Career Path',
      provider: 'EduGuide AI · Editorial',
      desc: 'A practical framework for evaluating career options based on strengths, values and market demand.',
      level: 'beginner', cost: 'free', duration: '8 min read',
      popularity: 95, added: 2024,
      url: '#',
      gains: ['Understand your decision criteria', 'Avoid common career-choice mistakes', 'Build a personal career matrix'],
      bestFor: ['Students', 'Career switchers', 'Recent graduates']
    },
    {
      id: 'a2', cat: 'article', title: 'Building an Impressive Portfolio as a Student',
      provider: 'EduGuide AI · Editorial',
      desc: 'Turn small class projects and side quests into a portfolio that gets you interviews.',
      level: 'beginner', cost: 'free', duration: '10 min read',
      popularity: 88, added: 2024,
      url: '#',
      gains: ['Structure your portfolio effectively', 'Showcase projects without experience', 'Write case studies that stand out'],
      bestFor: ['Designers', 'Developers', 'Creatives']
    },
    {
      id: 'a3', cat: 'article', title: 'Understanding Career Compatibility Scores',
      provider: 'EduGuide AI · Editorial',
      desc: 'How EduGuide AI calculates match percentages, and what they actually mean for your future.',
      level: 'beginner', cost: 'free', duration: '6 min read',
      popularity: 82, added: 2024,
      url: '#',
      gains: ['Interpret match scores accurately', 'Use scores to guide not limit choices', 'Combine with your own judgement'],
      bestFor: ['New platform users', 'Curious students']
    },
    {
      id: 'a4', cat: 'article', title: 'Navigating Postgraduate Study Decisions',
      provider: 'EduGuide AI · Editorial',
      desc: 'Whether to go straight into a masters, work first, or take a gap year — a decision guide.',
      level: 'intermediate', cost: 'free', duration: '12 min read',
      popularity: 76, added: 2023,
      url: '#',
      gains: ['Weigh pros and cons of further study', 'Explore funding options', 'Plan application timelines'],
      bestFor: ['Final-year undergraduates', 'Postgraduate applicants']
    },

    /* ---------- VIDEOS (3) ---------- */
    {
      id: 'v1', cat: 'video', title: 'CS50: Introduction to Computer Science',
      provider: 'Harvard University · edX',
      desc: 'The legendary intro course covering algorithms, data structures and programming foundations.',
      level: 'beginner', cost: 'free', duration: '12 weeks · 6h/week',
      popularity: 98, added: 2024,
      url: '#',
      gains: ['Programming fundamentals in C, Python, SQL', 'Algorithmic thinking', 'Problem-solving techniques'],
      bestFor: ['Aspiring developers', 'CS students', 'Self-learners']
    },
    {
      id: 'v2', cat: 'video', title: 'System Design Interview Primer',
      provider: 'YouTube · Tech Interview Handbook',
      desc: 'A practical walkthrough of designing scalable systems for interviews and real projects.',
      level: 'advanced', cost: 'free', duration: '2h 15m',
      popularity: 86, added: 2024,
      url: '#',
      gains: ['Design scalable system architectures', 'Understand tradeoffs', 'Interview-ready patterns'],
      bestFor: ['Software engineers', 'Senior roles', 'Interview prep']
    },
    {
      id: 'v3', cat: 'video', title: 'The Science of Learning — How Memory Works',
      provider: 'YouTube · CrashCourse',
      desc: 'Understand how your brain actually learns, and how to study more effectively.',
      level: 'beginner', cost: 'free', duration: '45 min',
      popularity: 79, added: 2023,
      url: '#',
      gains: ['Evidence-based study techniques', 'Memory consolidation strategies', 'Reduce time wasted studying'],
      bestFor: ['All students', 'Exam preparation']
    },

    /* ---------- BOOKS (3) ---------- */
    {
      id: 'b1', cat: 'book', title: 'The Pragmatic Programmer',
      provider: 'David Thomas & Andrew Hunt',
      desc: 'The classic guide to building a thoughtful, lasting software engineering career.',
      level: 'intermediate', cost: 'paid', duration: '352 pages',
      popularity: 92, added: 2023,
      url: '#',
      gains: ['Professional engineering mindset', 'Practical career advice', 'Craft over chaos'],
      bestFor: ['Software engineers', 'Developers', 'CS students']
    },
    {
      id: 'b2', cat: 'book', title: 'Deep Work',
      provider: 'Cal Newport',
      desc: 'Rules for focused success in a distracted world — essential reading for serious students.',
      level: 'beginner', cost: 'paid', duration: '296 pages',
      popularity: 87, added: 2023,
      url: '#',
      gains: ['Deep concentration techniques', 'Reduced distraction', 'Higher-quality output'],
      bestFor: ['Students', 'Knowledge workers', 'Creatives']
    },
    {
      id: 'b3', cat: 'book', title: 'Atomic Habits',
      provider: 'James Clear',
      desc: 'The proven framework for building good habits and breaking bad ones — a must-read for learners.',
      level: 'beginner', cost: 'paid', duration: '320 pages',
      popularity: 94, added: 2024,
      url: '#',
      gains: ['Habit loops explained', 'Actionable system for change', 'Long-term consistency'],
      bestFor: ['All students', 'Self-improvement', 'Anyone starting out']
    },

    /* ---------- COURSES (4) ---------- */
    {
      id: 'c1', cat: 'course', title: 'The Complete Python Bootcamp',
      provider: 'Udemy · Jose Portilla',
      desc: 'Learn Python from scratch and build real projects through hands-on exercises.',
      level: 'beginner', cost: 'paid', duration: '22 hours',
      popularity: 96, added: 2024,
      url: '#',
      gains: ['Python syntax and idioms', 'File handling and APIs', 'Build real projects'],
      bestFor: ['Beginners', 'Data-curious students', 'Automation enthusiasts']
    },
    {
      id: 'c2', cat: 'course', title: 'Google Data Analytics Professional Certificate',
      provider: 'Google · Coursera',
      desc: 'Prepare for a career in data analytics with practical, job-ready skills from Google.',
      level: 'beginner', cost: 'paid', duration: '6 months · 10h/week',
      popularity: 90, added: 2024,
      url: '#',
      gains: ['Spreadsheet & SQL skills', 'Data visualisation', 'Analytics portfolio'],
      bestFor: ['Career switchers', 'Analytics beginners', 'Undergraduates']
    },
    {
      id: 'c3', cat: 'course', title: 'CS50P — Introduction to Programming with Python',
      provider: 'Harvard · edX',
      desc: 'A gentler follow-up to CS50, focused entirely on Python and programming fundamentals.',
      level: 'beginner', cost: 'free', duration: '9 weeks · 4h/week',
      popularity: 84, added: 2024,
      url: '#',
      gains: ['Python fundamentals', 'Unit testing', 'File I/O and libraries'],
      bestFor: ['Python beginners', 'Self-learners', 'CS students']
    },
    {
      id: 'c4', cat: 'course', title: 'Machine Learning Specialization',
      provider: 'DeepLearning.AI · Coursera',
      desc: 'The most popular ML course on the internet — from linear regression to neural networks.',
      level: 'intermediate', cost: 'paid', duration: '3 months · 8h/week',
      popularity: 93, added: 2024,
      url: '#',
      gains: ['Supervised & unsupervised learning', 'Neural networks', 'Practical ML projects'],
      bestFor: ['Aspiring ML engineers', 'Data scientists', 'CS students']
    },

    /* ---------- SCHOLARSHIPS (4) ---------- */
    {
      id: 's1', cat: 'scholarship', title: 'Mastercard Foundation Scholars Program',
      provider: 'Mastercard Foundation',
      desc: 'Full-ride scholarships for academically talented yet economically disadvantaged African students.',
      level: 'intermediate', cost: 'free', duration: 'Apply by Jan 2025',
      popularity: 97, added: 2024,
      url: '#',
      gains: ['Full tuition coverage', 'Living stipend', 'Mentorship & leadership training'],
      bestFor: ['African students', 'Undergraduates', 'Postgraduates']
    },
    {
      id: 's2', cat: 'scholarship', title: 'Chevening Scholarships (UK)',
      provider: 'UK Government · FCDO',
      desc: 'Fully-funded UK master\'s degrees for future leaders from around the world.',
      level: 'advanced', cost: 'free', duration: 'Apply by Nov 2024',
      popularity: 94, added: 2024,
      url: '#',
      gains: ['Tuition + living costs', 'UK master\'s degree', 'Global alumni network'],
      bestFor: ['Graduates with leadership potential', 'Postgraduate applicants']
    },
    {
      id: 's3', cat: 'scholarship', title: 'Google PhD Fellowship',
      provider: 'Google Research',
      desc: 'Support for outstanding PhD students pursuing research in computer science and related fields.',
      level: 'advanced', cost: 'free', duration: 'Annual cycle',
      popularity: 88, added: 2023,
      url: '#',
      gains: ['Research funding', 'Google mentorship', 'Global research network'],
      bestFor: ['PhD candidates', 'CS researchers']
    },
    {
      id: 's4', cat: 'scholarship', title: 'Federal Government Scholarship (Nigeria)',
      provider: 'Federal Ministry of Education',
      desc: 'Annual scholarships for Nigerian students in tertiary institutions, home and abroad.',
      level: 'beginner', cost: 'free', duration: 'Annual cycle',
      popularity: 83, added: 2024,
      url: '#',
      gains: ['Tuition support', 'Local & overseas opportunities', 'Government recognition'],
      bestFor: ['Nigerian students', 'Undergraduates', 'Postgraduates']
    },

    /* ---------- CERTIFICATIONS (3) ---------- */
    {
      id: 'ce1', cat: 'certification', title: 'AWS Certified Cloud Practitioner',
      provider: 'Amazon Web Services',
      desc: 'The entry-level AWS certification covering cloud fundamentals and core services.',
      level: 'beginner', cost: 'paid', duration: '~20 hours prep',
      popularity: 89, added: 2024,
      url: '#',
      gains: ['Cloud computing fundamentals', 'AWS core services', 'Industry-recognised credential'],
      bestFor: ['Career switchers', 'IT beginners', 'Students exploring cloud']
    },
    {
      id: 'ce2', cat: 'certification', title: 'Meta Front-End Developer Certificate',
      provider: 'Meta · Coursera',
      desc: 'Job-ready front-end development skills including React, JavaScript and UI engineering.',
      level: 'intermediate', cost: 'paid', duration: '7 months · 6h/week',
      popularity: 91, added: 2024,
      url: '#',
      gains: ['React & modern JS', 'Portfolio projects', 'Meta certificate'],
      bestFor: ['Front-end developers', 'Career switchers', 'Students']
    },
    {
      id: 'ce3', cat: 'certification', title: 'Google Project Management Certificate',
      provider: 'Google · Coursera',
      desc: 'Learn the foundations of project management from practising Google PMs.',
      level: 'beginner', cost: 'paid', duration: '6 months · 10h/week',
      popularity: 85, added: 2023,
      url: '#',
      gains: ['Agile & Scrum', 'Project planning', 'Google certificate'],
      bestFor: ['Aspiring PMs', 'Business students', 'Career switchers']
    },

    /* ---------- SKILL DEVELOPMENT (3) ---------- */
    {
      id: 'sk1', cat: 'skill', title: 'Public Speaking for Students',
      provider: 'Toastmasters International',
      desc: 'Build confidence and clarity in public speaking — essential for any career.',
      level: 'beginner', cost: 'free', duration: 'Self-paced',
      popularity: 78, added: 2023,
      url: '#',
      gains: ['Speech structure', 'Stage presence', 'Confidence under pressure'],
      bestFor: ['All students', 'Leadership roles', 'Aspiring presenters']
    },
    {
      id: 'sk2', cat: 'skill', title: 'Technical Writing Fundamentals',
      provider: 'Google · Technical Writing Course',
      desc: 'Write clearly and concisely for technical and professional audiences.',
      level: 'intermediate', cost: 'free', duration: '4 hours',
      popularity: 81, added: 2024,
      url: '#',
      gains: ['Clear & concise writing', 'Audience awareness', 'Documentation skills'],
      bestFor: ['Engineers', 'Analysts', 'Researchers']
    },
    {
      id: 'sk3', cat: 'skill', title: 'Design Thinking Workshop',
      provider: 'IDEO · Free Course',
      desc: 'A hands-on introduction to human-centred design — applicable across every field.',
      level: 'beginner', cost: 'free', duration: '3 hours',
      popularity: 76, added: 2023,
      url: '#',
      gains: ['Human-centred problem solving', 'Ideation techniques', 'Rapid prototyping'],
      bestFor: ['Designers', 'Entrepreneurs', 'Product teams']
    }
  ];

  /* ============================================================
     STATE
     ============================================================ */
  const state = {
    search: '',
    category: 'all',
    level: 'all',
    cost: 'all',
    sort: 'popular',
    page: 1,
    perPage: 12,
    saved: new Set(),
    openResourceId: null
  };

  /* ---------- Load saved resources ---------- */
  const SAVED_KEY = 'eg_saved_resources_v1';
  try {
    const saved = JSON.parse(localStorage.getItem(SAVED_KEY) || '[]');
    if (Array.isArray(saved)) state.saved = new Set(saved);
  } catch (_) {}

  const persistSaved = () => {
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify([...state.saved]));
    } catch (_) {}
  };

  /* ============================================================
     DOM
     ============================================================ */
  const $ = (s) => document.querySelector(s);
  const categoryGrid = $('#categoryGrid');
  const resourceGrid = $('#resourceGrid');
  const resultsTitle = $('#resResultsTitle');
  const resultsCount = $('#resResultsCount');
  const activeFilters = $('#activeFilters');
  const resEmpty = $('#resEmpty');
  const loadMoreWrap = $('#resLoadMoreWrap');
  const loadMoreBtn = $('#resLoadMoreBtn');
  const loadMoreMeta = $('#resLoadMoreMeta');
  const searchInput = $('#resSearch');
  const searchClear = $('#resSearchClear');
  const searchForm = $('#resSearchForm');
  const sortLabel = $('#resSortLabel');
  const resetCategory = $('#resetCategory');

  /* Modal refs */
  const modal = $('#resourceModal');
  const modalIcon = $('#resourceModalIcon');
  const modalType = $('#resourceModalType');
  const modalTitle = $('#resourceModalTitle');
  const modalProvider = $('#resourceModalProvider');
  const modalMeta = $('#resourceModalMeta');
  const modalDesc = $('#resourceModalDesc');
  const modalGains = $('#resourceModalGains');
  const modalTags = $('#resourceModalTags');
  const modalSaveBtn = $('#resourceModalSaveBtn');
  const modalVisit = $('#resourceModalVisit');

  /* ============================================================
     HELPERS
     ============================================================ */
  const getCategoryCount = (id) => RESOURCES.filter((r) => r.cat === id).length;

  const getFiltered = () => {
    let list = [...RESOURCES];

    /* Search */
    if (state.search.trim()) {
      const q = state.search.trim().toLowerCase();
      list = list.filter((r) =>
        r.title.toLowerCase().includes(q) ||
        r.desc.toLowerCase().includes(q) ||
        r.provider.toLowerCase().includes(q) ||
        r.bestFor.some((t) => t.toLowerCase().includes(q)) ||
        CAT_MAP[r.cat]?.label.toLowerCase().includes(q)
      );
    }

    /* Category */
    if (state.category !== 'all') {
      list = list.filter((r) => r.cat === state.category);
    }

    /* Level */
    if (state.level !== 'all') {
      list = list.filter((r) => r.level === state.level);
    }

    /* Cost */
    if (state.cost !== 'all') {
      list = list.filter((r) => r.cost === state.cost);
    }

    /* Sort */
    switch (state.sort) {
      case 'newest':
        list.sort((a, b) => b.added - a.added || b.popularity - a.popularity);
        break;
      case 'name':
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'shortest':
        list.sort((a, b) => (a.duration.length) - (b.duration.length));
        break;
      case 'popular':
      default:
        list.sort((a, b) => b.popularity - a.popularity);
    }

    return list;
  };

  /* ============================================================
     RENDER CATEGORIES
     ============================================================ */
  const renderCategories = () => {
    if (!categoryGrid) return;

    const allTile = `
      <button class="res-cat ${state.category === 'all' ? 'is-active' : ''}"
              data-cat="all"
              style="--cat-color:#7B5CFF;--cat-bg:#EDE8FF">
        <span class="res-cat__icon"><i class="bi bi-grid-3x3-gap"></i></span>
        <p class="res-cat__name">All Resources</p>
        <p class="res-cat__count">${RESOURCES.length} resources</p>
      </button>
    `;

    const tiles = CATEGORIES.map((c) => `
      <button class="res-cat ${state.category === c.id ? 'is-active' : ''}"
              data-cat="${c.id}"
              style="--cat-color:${c.color};--cat-bg:${c.bg}">
        <span class="res-cat__icon"><i class="bi ${c.icon}"></i></span>
        <p class="res-cat__name">${c.label}</p>
        <p class="res-cat__count">${getCategoryCount(c.id)} resources</p>
      </button>
    `).join('');

    categoryGrid.innerHTML = allTile + tiles;

    categoryGrid.querySelectorAll('[data-cat]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.category = btn.dataset.cat;
        state.page = 1;
        renderCategories();
        render();
      });
    });

    if (resetCategory) {
      resetCategory.hidden = state.category === 'all';
      if (!resetCategory.dataset.bound) {
        resetCategory.dataset.bound = '1';
        resetCategory.addEventListener('click', () => {
          state.category = 'all';
          state.page = 1;
          renderCategories();
          render();
        });
      }
    }
  };

  /* ============================================================
     RENDER CARD
     ============================================================ */
  const renderCard = (r) => {
    const cat = CAT_MAP[r.cat];
    const isSaved = state.saved.has(r.id);
    return `
      <article class="res-card" data-id="${r.id}"
               style="--res-color:${cat.color};--res-bg:${cat.bg}">
        <div class="res-card__head">
          <span class="res-card__icon"><i class="bi ${cat.icon}"></i></span>
          <div class="res-card__badges">
            <span class="res-card__type">${cat.label}</span>
            <span class="res-card__cost res-card__cost--${r.cost}">${r.cost === 'free' ? 'Free' : 'Paid'}</span>
          </div>
        </div>

        <h3 class="res-card__title">${r.title}</h3>
        <p class="res-card__provider">${r.provider}</p>
        <p class="res-card__desc">${r.desc}</p>

        <div class="res-card__meta">
          <span class="res-card__meta-item"><i class="bi bi-clock"></i> ${r.duration}</span>
          <span class="res-card__meta-item"><i class="bi bi-bar-chart"></i> ${r.level.charAt(0).toUpperCase() + r.level.slice(1)}</span>
        </div>

        <div class="res-card__actions">
          <button class="res-card__save ${isSaved ? 'is-saved' : ''}"
                  data-save="${r.id}"
                  aria-label="${isSaved ? 'Remove from library' : 'Save to library'}">
            <i class="bi bi-bookmark${isSaved ? '-fill' : ''}"></i>
          </button>
          <button class="res-card__view" data-view="${r.id}">
            View details <i class="bi bi-arrow-right"></i>
          </button>
        </div>
      </article>
    `;
  };

  /* ============================================================
     RENDER ACTIVE FILTERS
     ============================================================ */
  const renderActiveFilters = () => {
    if (!activeFilters) return;
    const filters = [];
    if (state.search.trim()) filters.push({ type: 'search', label: `"${state.search.trim()}"` });
    if (state.category !== 'all') filters.push({ type: 'category', label: CAT_MAP[state.category]?.label || '' });
    if (state.level !== 'all') filters.push({ type: 'level', label: state.level.charAt(0).toUpperCase() + state.level.slice(1) + ' level' });
    if (state.cost !== 'all') filters.push({ type: 'cost', label: state.cost === 'free' ? 'Free only' : 'Paid only' });

    if (filters.length === 0) {
      activeFilters.hidden = true;
      return;
    }

    activeFilters.hidden = false;
    activeFilters.innerHTML = `
      <span class="res-active-filters__label">Active filters:</span>
      ${filters.map((f) => `
        <span class="res-filter-chip">
          ${f.label}
          <button type="button" data-clear-filter="${f.type}" aria-label="Remove filter">
            <i class="bi bi-x"></i>
          </button>
        </span>
      `).join('')}
      <button type="button" class="res-active-filters__clear" id="clearAllFilters">Clear all</button>
    `;

    activeFilters.querySelectorAll('[data-clear-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const t = btn.dataset.clearFilter;
        if (t === 'search') {
          state.search = '';
          if (searchInput) searchInput.value = '';
          if (searchClear) searchClear.hidden = true;
        } else if (t === 'category') {
          state.category = 'all';
          renderCategories();
        } else if (t === 'level') {
          state.level = 'all';
          document.querySelectorAll('[data-level]').forEach((b) => {
            b.classList.toggle('is-active', b.dataset.level === 'all');
          });
        } else if (t === 'cost') {
          state.cost = 'all';
          document.querySelectorAll('[data-cost]').forEach((b) => {
            b.classList.toggle('is-active', b.dataset.cost === 'all');
          });
        }
        state.page = 1;
        render();
      });
    });

    const clearAll = activeFilters.querySelector('#clearAllFilters');
    if (clearAll) clearAll.addEventListener('click', resetFilters);
  };

  /* ============================================================
     RENDER MAIN
     ============================================================ */
  const render = () => {
    if (!resourceGrid) return;

    const list = getFiltered();
    const total = list.length;
    const visible = list.slice(0, state.page * state.perPage);

    /* Title + count */
    if (resultsTitle) {
      resultsTitle.textContent = state.category === 'all'
        ? (state.search ? 'Search results' : 'All resources')
        : CAT_MAP[state.category]?.label || 'Resources';
    }
    if (resultsCount) {
      resultsCount.textContent = `${total} ${total === 1 ? 'resource' : 'resources'}`;
    }

    if (visible.length === 0) {
      resourceGrid.innerHTML = '';
      if (resEmpty) resEmpty.hidden = false;
      if (loadMoreWrap) loadMoreWrap.hidden = true;
    } else {
      if (resEmpty) resEmpty.hidden = true;
      resourceGrid.innerHTML = visible.map(renderCard).join('');

      /* Save buttons */
      resourceGrid.querySelectorAll('[data-save]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleSave(btn.dataset.save);
        });
      });

      /* View details */
      resourceGrid.querySelectorAll('[data-view]').forEach((btn) => {
        btn.addEventListener('click', () => openModal(btn.dataset.view));
      });

      /* Load more */
      if (loadMoreWrap && loadMoreMeta) {
        if (total > visible.length) {
          loadMoreWrap.hidden = false;
          loadMoreMeta.textContent = `Showing ${visible.length} of ${total}`;
        } else {
          loadMoreWrap.hidden = true;
        }
      }
    }

    renderActiveFilters();
  };

  /* ============================================================
     SAVE TOGGLE
     ============================================================ */
  const toggleSave = (id) => {
    const r = RESOURCES.find((x) => x.id === id);
    if (!r) return;
    if (state.saved.has(id)) {
      state.saved.delete(id);
      if (window.egToast) window.egToast(`Removed "${r.title}" from library`);
    } else {
      state.saved.add(id);
      if (window.egToast) window.egToast(`Saved to your library ❤️`);
    }
    persistSaved();
    render();
    if (state.openResourceId === id) updateModalSaveBtn();
  };

  /* ============================================================
     MODAL
     ============================================================ */
  const updateModalSaveBtn = () => {
    if (!modalSaveBtn || !state.openResourceId) return;
    const isSaved = state.saved.has(state.openResourceId);
    modalSaveBtn.classList.toggle('is-saved', isSaved);
    modalSaveBtn.innerHTML = isSaved
      ? '<i class="bi bi-bookmark-fill"></i> <span>Saved to library</span>'
      : '<i class="bi bi-bookmark"></i> <span>Save to library</span>';
  };

  const openModal = (id) => {
    const r = RESOURCES.find((x) => x.id === id);
    if (!r || !modal) return;

    const cat = CAT_MAP[r.cat];
    state.openResourceId = id;

    /* Style icon */
    if (modalIcon) {
      modalIcon.style.setProperty('--res-color', cat.color);
      modalIcon.style.setProperty('--res-bg', cat.bg);
      modalIcon.innerHTML = `<i class="bi ${cat.icon}"></i>`;
    }
    if (modalType) {
      modalType.textContent = cat.label;
      modalType.style.color = cat.color;
    }
    if (modalTitle) modalTitle.textContent = r.title;
    if (modalProvider) modalProvider.textContent = r.provider;

    if (modalMeta) {
      modalMeta.innerHTML = `
        <span class="res-modal-meta__item"><i class="bi bi-clock"></i> ${r.duration}</span>
        <span class="res-modal-meta__item"><i class="bi bi-bar-chart"></i> ${r.level.charAt(0).toUpperCase() + r.level.slice(1)}</span>
        <span class="res-modal-meta__item"><i class="bi bi-cash-coin"></i> ${r.cost === 'free' ? 'Free' : 'Paid'}</span>
      `;
    }
    if (modalDesc) modalDesc.textContent = r.desc;
    if (modalGains) {
      modalGains.innerHTML = r.gains.map((g) => `<li>${g}</li>`).join('');
    }
    if (modalTags) {
      modalTags.innerHTML = r.bestFor.map((t) => `<span class="res-modal-tag">${t}</span>`).join('');
    }
    if (modalVisit) modalVisit.href = r.url;

    updateModalSaveBtn();

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    state.openResourceId = null;
  };

  modalSaveBtn?.addEventListener('click', () => {
    if (state.openResourceId) toggleSave(state.openResourceId);
  });

  document.querySelectorAll('[data-eg-modal-close]').forEach((el) => {
    el.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('is-open')) closeModal();
  });

  /* ============================================================
     SEARCH
     ============================================================ */
  let searchDebounce;
  searchInput?.addEventListener('input', () => {
    state.search = searchInput.value;
    state.page = 1;
    if (searchClear) searchClear.hidden = !state.search;
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => render(), 180);
  });

  searchClear?.addEventListener('click', () => {
    state.search = '';
    if (searchInput) { searchInput.value = ''; searchInput.focus(); }
    if (searchClear) searchClear.hidden = true;
    state.page = 1;
    render();
  });

  searchForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    state.search = searchInput.value;
    state.page = 1;
    render();
    resourceGrid?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.querySelectorAll('[data-hint]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const hint = btn.dataset.hint;
      if (!searchInput) return;
      searchInput.value = hint;
      state.search = hint;
      state.page = 1;
      if (searchClear) searchClear.hidden = false;
      render();
      resourceGrid?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ============================================================
     FILTERS
     ============================================================ */
  document.querySelectorAll('[data-level]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-level]').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      state.level = btn.dataset.level;
      state.page = 1;
      render();
    });
  });

  document.querySelectorAll('[data-cost]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-cost]').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      state.cost = btn.dataset.cost;
      state.page = 1;
      render();
    });
  });

  /* ============================================================
     SORT
     ============================================================ */
  document.querySelectorAll('[data-sort]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.sort = btn.dataset.sort;
      const map = {
        popular: 'Most popular',
        newest: 'Newest',
        name: 'Name (A–Z)',
        shortest: 'Shortest'
      };
      if (sortLabel) sortLabel.textContent = map[state.sort] || 'Most popular';
      document.querySelectorAll('[data-eg-dd]').forEach((dd) => dd.classList.remove('is-open'));
      state.page = 1;
      render();
    });
  });

  /* ============================================================
     LOAD MORE
     ============================================================ */
  loadMoreBtn?.addEventListener('click', () => {
    loadMoreBtn.classList.add('is-loading');
    loadMoreBtn.disabled = true;
    const original = loadMoreBtn.innerHTML;
    loadMoreBtn.innerHTML = '<span class="eg-spinner"></span> Loading…';
    setTimeout(() => {
      state.page += 1;
      loadMoreBtn.classList.remove('is-loading');
      loadMoreBtn.disabled = false;
      loadMoreBtn.innerHTML = original;
      render();
    }, 500);
  });

  /* ============================================================
     RESET FILTERS
     ============================================================ */
  const resetFilters = () => {
    state.search = '';
    state.category = 'all';
    state.level = 'all';
    state.cost = 'all';
    state.page = 1;
    if (searchInput) searchInput.value = '';
    if (searchClear) searchClear.hidden = true;
    document.querySelectorAll('[data-level]').forEach((b) => {
      b.classList.toggle('is-active', b.dataset.level === 'all');
    });
    document.querySelectorAll('[data-cost]').forEach((b) => {
      b.classList.toggle('is-active', b.dataset.cost === 'all');
    });
    renderCategories();
    render();
  };

  document.getElementById('resEmptyReset')?.addEventListener('click', resetFilters);

  /* ============================================================
     KEYBOARD SHORTCUT: / focuses search
     ============================================================ */
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      searchInput?.focus();
    }
  });

  /* ============================================================
     REVEAL ON SCROLL
     ============================================================ */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
  renderCategories();
  render();
})();