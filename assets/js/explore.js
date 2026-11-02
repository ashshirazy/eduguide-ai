/* ============================================================
   EduGuide AI — Career Explorer (Phase 9)
   Depends on dashboard-shell.js + app.js (egToast) + components.js
   ============================================================ */
(() => {
  'use strict';

  /* ============================================================
     CATEGORIES
     ============================================================ */
  const CATEGORIES = [
    { id: 'technology',  label: 'Technology',       icon: 'bi-cpu',            color: '#6C4CF1', bg: '#EDE8FF' },
    { id: 'health',      label: 'Medicine & Health',icon: 'bi-heart-pulse',    color: '#DC2626', bg: '#FEE2E2' },
    { id: 'engineering', label: 'Engineering',      icon: 'bi-gear',           color: '#D97706', bg: '#FEF3C7' },
    { id: 'education',   label: 'Education',        icon: 'bi-mortarboard',    color: '#059669', bg: '#D1FAE5' },
    { id: 'business',    label: 'Business & Finance',icon:'bi-briefcase',      color: '#0284C7', bg: '#E0F2FE' },
    { id: 'agriculture', label: 'Agriculture',      icon: 'bi-tree',           color: '#65A30D', bg: '#ECFCCB' },
    { id: 'law',         label: 'Law',              icon: 'bi-shield-check',   color: '#4338CA', bg: '#E0E7FF' },
    { id: 'science',     label: 'Science',          icon: 'bi-flask',          color: '#8B5CF6', bg: '#EDE9FE' },
    { id: 'creative',    label: 'Creative Arts',    icon: 'bi-palette',        color: '#DB2777', bg: '#FCE7F3' },
    { id: 'social',      label: 'Social Sciences',  icon: 'bi-people',         color: '#0D9488', bg: '#CCFBF1' }
  ];

  const CAT_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

  /* ============================================================
     CAREER DATASET — 36 careers across 10 categories
     ============================================================ */
  const CAREERS = [
    /* ---------- TECHNOLOGY ---------- */
    { id: 'software-engineer',    title: 'Software Engineer',      cat: 'technology', icon: 'bi-code-slash', desc: 'Design, build and maintain the software products people use every day.', edu: 'B.Sc. Computer Science', skills: ['JavaScript', 'Python', 'Git', 'Problem Solving'], salary: 18, demand: 'Very high', trending: 10 },
    { id: 'data-scientist',       title: 'Data Scientist',         cat: 'technology', icon: 'bi-graph-up',  desc: 'Turn raw data into insight using statistics and machine learning.', edu: 'B.Sc. + M.Sc.', skills: ['Python', 'Statistics', 'SQL', 'ML'], salary: 20, demand: 'Very high', trending: 9 },
    { id: 'ai-engineer',          title: 'AI / ML Engineer',       cat: 'technology', icon: 'bi-cpu',       desc: 'Build intelligent systems that learn and make predictions.', edu: 'B.Sc. CS / Math', skills: ['Python', 'TensorFlow', 'Math'], salary: 22, demand: 'Very high', trending: 10 },
    { id: 'cybersecurity',        title: 'Cybersecurity Analyst',  cat: 'technology', icon: 'bi-shield-lock', desc: 'Protect systems and data from threats and breaches.', edu: 'B.Sc. Cybersecurity', skills: ['Networking', 'Linux', 'Threat Analysis'], salary: 16, demand: 'Very high', trending: 8 },
    { id: 'ux-designer',          title: 'UX Designer',            cat: 'technology', icon: 'bi-palette',   desc: 'Design intuitive digital experiences that people love to use.', edu: 'B.A. Design / HCI', skills: ['Figma', 'User Research', 'Prototyping'], salary: 12, demand: 'High', trending: 7 },

    /* ---------- MEDICINE & HEALTH ---------- */
    { id: 'medical-doctor',       title: 'Medical Doctor',         cat: 'health', icon: 'bi-heart-pulse',     desc: 'Diagnose and treat patients to improve health and save lives.', edu: 'MBBS', skills: ['Diagnosis', 'Empathy', 'Biology'], salary: 15, demand: 'High', trending: 9 },
    { id: 'nurse',                title: 'Registered Nurse',       cat: 'health', icon: 'bi-heart',           desc: 'Provide direct patient care and support in hospitals and clinics.', edu: 'B.Sc. Nursing', skills: ['Patient Care', 'Observation', 'Empathy'], salary: 8, demand: 'Very high', trending: 8 },
    { id: 'pharmacist',           title: 'Pharmacist',             cat: 'health', icon: 'bi-capsule',         desc: 'Dispense medication and advise patients on safe usage.', edu: 'B.Pharm', skills: ['Pharmacology', 'Detail', 'Communication'], salary: 9, demand: 'Moderate', trending: 5 },
    { id: 'physiotherapist',      title: 'Physiotherapist',        cat: 'health', icon: 'bi-activity',        desc: 'Help patients recover mobility and manage pain through therapy.', edu: 'B.Sc. Physiotherapy', skills: ['Anatomy', 'Patience', 'Movement'], salary: 8, demand: 'High', trending: 5 },

    /* ---------- ENGINEERING ---------- */
    { id: 'civil-engineer',       title: 'Civil Engineer',         cat: 'engineering', icon: 'bi-building', desc: 'Design and build bridges, roads and large infrastructure.', edu: 'B.Eng. Civil', skills: ['AutoCAD', 'Math', 'Structural Design'], salary: 12, demand: 'High', trending: 7 },
    { id: 'mechanical-engineer',  title: 'Mechanical Engineer',    cat: 'engineering', icon: 'bi-gear',     desc: 'Design and improve machines, engines and mechanical systems.', edu: 'B.Eng. Mechanical', skills: ['CAD', 'Physics', 'Thermodynamics'], salary: 12, demand: 'High', trending: 6 },
    { id: 'electrical-engineer',  title: 'Electrical Engineer',    cat: 'engineering', icon: 'bi-lightning', desc: 'Work on power systems, electronics and electrical networks.', edu: 'B.Eng. Electrical', skills: ['Circuitry', 'Math', 'Simulation'], salary: 13, demand: 'High', trending: 6 },
    { id: 'chemical-engineer',    title: 'Chemical Engineer',      cat: 'engineering', icon: 'bi-droplet-half', desc: 'Apply chemistry to design industrial processes and products.', edu: 'B.Eng. Chemical', skills: ['Chemistry', 'Process Design'], salary: 14, demand: 'Moderate', trending: 5 },

    /* ---------- EDUCATION ---------- */
    { id: 'teacher',              title: 'STEM Educator',          cat: 'education', icon: 'bi-mortarboard', desc: 'Inspire the next generation of scientists and engineers.', edu: 'B.Ed. / B.Sc. + PGDE', skills: ['Communication', 'Patience', 'Subject Mastery'], salary: 8, demand: 'Moderate', trending: 6 },
    { id: 'school-counselor',     title: 'School Counsellor',      cat: 'education', icon: 'bi-chat-square-heart', desc: 'Guide students through academic and personal challenges.', edu: 'B.Sc. Psychology + PGD', skills: ['Empathy', 'Listening', 'Guidance'], salary: 7, demand: 'High', trending: 5 },
    { id: 'instructional-designer', title: 'Instructional Designer', cat: 'education', icon: 'bi-journal-richtext', desc: 'Create effective online courses and learning experiences.', edu: 'B.Ed. / M.Ed.', skills: ['Curriculum', 'E-learning', 'Design'], salary: 10, demand: 'High', trending: 6 },

    /* ---------- BUSINESS & FINANCE ---------- */
    { id: 'accountant',           title: 'Accountant',             cat: 'business', icon: 'bi-calculator', desc: 'Prepare financial records and help businesses stay compliant.', edu: 'B.Sc. Accounting', skills: ['Excel', 'Attention to detail', 'Ethics'], salary: 10, demand: 'High', trending: 6 },
    { id: 'financial-analyst',    title: 'Financial Analyst',      cat: 'business', icon: 'bi-bar-chart',  desc: 'Analyse markets and guide investment and finance decisions.', edu: 'B.Sc. Finance', skills: ['Excel', 'Modelling', 'Analysis'], salary: 14, demand: 'High', trending: 8 },
    { id: 'marketing-manager',    title: 'Marketing Manager',      cat: 'business', icon: 'bi-megaphone',  desc: 'Plan campaigns that grow brands and reach customers.', edu: 'B.Sc. Marketing', skills: ['Strategy', 'Storytelling', 'Analytics'], salary: 12, demand: 'High', trending: 7 },
    { id: 'product-manager',      title: 'Product Manager',        cat: 'business', icon: 'bi-diagram-3',  desc: 'Lead cross-functional teams to build products customers love.', edu: 'B.Sc. or MBA', skills: ['Strategy', 'Communication', 'Data'], salary: 18, demand: 'High', trending: 9 },

    /* ---------- AGRICULTURE ---------- */
    { id: 'agronomist',           title: 'Agronomist',             cat: 'agriculture', icon: 'bi-flower1',  desc: 'Improve crop yield and sustainability through science.', edu: 'B.Sc. Agronomy', skills: ['Soil Science', 'Crop Management'], salary: 8, demand: 'Moderate', trending: 4 },
    { id: 'agri-engineer',        title: 'Agricultural Engineer',  cat: 'agriculture', icon: 'bi-truck',    desc: 'Design machinery and systems that improve farming.', edu: 'B.Eng. Agricultural', skills: ['Mechanics', 'Systems', 'Design'], salary: 9, demand: 'Moderate', trending: 4 },
    { id: 'food-scientist',       title: 'Food Scientist',         cat: 'agriculture', icon: 'bi-egg-fried',desc: 'Ensure food safety, quality and innovation in production.', edu: 'B.Sc. Food Science', skills: ['Biology', 'Chemistry', 'Quality'], salary: 9, demand: 'Moderate', trending: 5 },

    /* ---------- LAW ---------- */
    { id: 'lawyer',               title: 'Lawyer',                 cat: 'law', icon: 'bi-briefcase',  desc: 'Represent clients, draft contracts and argue cases in court.', edu: 'LL.B. + Bar', skills: ['Argumentation', 'Research', 'Ethics'], salary: 16, demand: 'High', trending: 7 },
    { id: 'legal-counsel',        title: 'Corporate Legal Counsel', cat: 'law', icon: 'bi-file-earmark-text', desc: 'Advise companies on contracts, compliance and risk.', edu: 'LL.B. + Bar', skills: ['Contracts', 'Compliance', 'Judgement'], salary: 18, demand: 'High', trending: 6 },
    { id: 'paralegal',            title: 'Paralegal',              cat: 'law', icon: 'bi-files',      desc: 'Support lawyers with research, documentation and filing.', edu: 'Diploma / B.Sc.', skills: ['Research', 'Organisation', 'Writing'], salary: 7, demand: 'Moderate', trending: 4 },

    /* ---------- SCIENCE ---------- */
    { id: 'research-scientist',   title: 'Research Scientist',     cat: 'science', icon: 'bi-search',   desc: 'Investigate fundamental questions and publish new findings.', edu: 'B.Sc. + Ph.D.', skills: ['Experimentation', 'Analysis', 'Writing'], salary: 14, demand: 'Moderate', trending: 6 },
    { id: 'biochemist',           title: 'Biochemist',             cat: 'science', icon: 'bi-eyedropper', desc: 'Study chemical processes inside living organisms.', edu: 'B.Sc. + M.Sc.', skills: ['Chemistry', 'Biology', 'Lab'], salary: 12, demand: 'Moderate', trending: 5 },
    { id: 'environmental-scientist', title: 'Environmental Scientist', cat: 'science', icon: 'bi-tree', desc: 'Study ecosystems and tackle environmental challenges.', edu: 'B.Sc. Env. Science', skills: ['Fieldwork', 'Data', 'Policy'], salary: 10, demand: 'High', trending: 6 },
    { id: 'physicist',            title: 'Physicist',              cat: 'science', icon: 'bi-atom',        desc: 'Explore the fundamental laws of nature and matter.', edu: 'B.Sc. + Ph.D.', skills: ['Mathematics', 'Physics', 'Modeling'], salary: 13, demand: 'Moderate', trending: 5 },

    /* ---------- CREATIVE ARTS ---------- */
    { id: 'graphic-designer',     title: 'Graphic Designer',       cat: 'creative', icon: 'bi-palette2', desc: 'Create visual identities, layouts and illustrations for brands.', edu: 'B.A. Design', skills: ['Adobe Suite', 'Typography', 'Creativity'], salary: 9, demand: 'High', trending: 6 },
    { id: 'filmmaker',            title: 'Filmmaker',              cat: 'creative', icon: 'bi-camera-reels', desc: 'Direct, produce and edit films, shorts and documentaries.', edu: 'B.A. Film / Media', skills: ['Storytelling', 'Cinematography'], salary: 11, demand: 'Moderate', trending: 6 },
    { id: 'music-producer',       title: 'Music Producer',         cat: 'creative', icon: 'bi-music-note-beamed', desc: 'Compose, mix and produce music for artists and media.', edu: 'Diploma / B.A. Music', skills: ['DAWs', 'Composition', 'Mixing'], salary: 10, demand: 'Moderate', trending: 5 },
    { id: 'writer',               title: 'Writer / Author',        cat: 'creative', icon: 'bi-pen',       desc: 'Create stories, articles and books that inform and inspire.', edu: 'B.A. English / Creative Writing', skills: ['Writing', 'Research', 'Editing'], salary: 7, demand: 'Moderate', trending: 5 },

    /* ---------- SOCIAL SCIENCES ---------- */
    { id: 'psychologist',         title: 'Psychologist',           cat: 'social', icon: 'bi-person-heart', desc: 'Study the mind and help people improve mental wellbeing.', edu: 'B.Sc. + M.Sc. Psychology', skills: ['Listening', 'Research', 'Empathy'], salary: 11, demand: 'High', trending: 7 },
    { id: 'social-worker',        title: 'Social Worker',          cat: 'social', icon: 'bi-people',      desc: 'Support individuals and families through difficult situations.', edu: 'B.Sc. Social Work', skills: ['Advocacy', 'Empathy', 'Communication'], salary: 7, demand: 'High', trending: 6 },
    { id: 'economist',            title: 'Economist',              cat: 'social', icon: 'bi-graph-up-arrow', desc: 'Analyse markets, policy and economic trends for governments and firms.', edu: 'B.Sc. + M.Sc. Economics', skills: ['Econometrics', 'Modelling', 'Policy'], salary: 13, demand: 'Moderate', trending: 6 }
  ];

  /* ============================================================
     STATE
     ============================================================ */
  const state = {
    search: '',
    category: 'all',
    sort: 'trending',
    view: 'grid',
    page: 1,
    perPage: 12,
    saved: new Set()
  };

  /* ============================================================
     DOM
     ============================================================ */
  const $ = (s) => document.querySelector(s);
  const categoryGrid = $('#categoryGrid');
  const careerGrid = $('#careerGrid');
  const resultsTitle = $('#resultsTitle');
  const resultsCount = $('#resultsCount');
  const activeFilters = $('#activeFilters');
  const exploreEmpty = $('#exploreEmpty');
  const loadMoreWrap = $('#loadMoreWrap');
  const loadMoreBtn = $('#loadMoreBtn');
  const loadMoreMeta = $('#loadMoreMeta');
  const exploreSearch = $('#exploreSearch');
  const searchClear = $('#searchClear');
  const exploreSearchForm = $('#exploreSearchForm');
  const sortLabel = $('#sortLabel');
  const resetCategory = $('#resetCategory');

  /* ============================================================
     HELPERS
     ============================================================ */
  const getCategoryCount = (id) => CAREERS.filter((c) => c.cat === id).length;

  const getFiltered = () => {
    let list = [...CAREERS];

    /* Search */
    if (state.search.trim()) {
      const q = state.search.trim().toLowerCase();
      list = list.filter((c) =>
        c.title.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q) ||
        c.skills.some((s) => s.toLowerCase().includes(q)) ||
        CAT_MAP[c.cat]?.label.toLowerCase().includes(q)
      );
    }

    /* Category */
    if (state.category !== 'all') {
      list = list.filter((c) => c.cat === state.category);
    }

    /* Sort */
    switch (state.sort) {
      case 'name':
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'demand':
        const rank = { 'Very high': 3, 'High': 2, 'Moderate': 1 };
        list.sort((a, b) => (rank[b.demand] || 0) - (rank[a.demand] || 0));
        break;
      case 'salary':
        list.sort((a, b) => b.salary - a.salary);
        break;
      case 'trending':
      default:
        list.sort((a, b) => b.trending - a.trending);
    }

    return list;
  };

  /* ============================================================
     RENDER CATEGORY TILES
     ============================================================ */
  const renderCategories = () => {
    if (!categoryGrid) return;

    const allTile = `
      <button class="exp-cat ${state.category === 'all' ? 'is-active' : ''}"
              data-cat="all"
              style="--cat-color:#7B5CFF;--cat-bg:#EDE8FF">
        <span class="exp-cat__icon"><i class="bi bi-grid-3x3-gap"></i></span>
        <p class="exp-cat__name">All Careers</p>
        <p class="exp-cat__count">${CAREERS.length} careers</p>
      </button>
    `;

    const tiles = CATEGORIES.map((c) => `
      <button class="exp-cat ${state.category === c.id ? 'is-active' : ''}"
              data-cat="${c.id}"
              style="--cat-color:${c.color};--cat-bg:${c.bg}">
        <span class="exp-cat__icon"><i class="bi ${c.icon}"></i></span>
        <p class="exp-cat__name">${c.label}</p>
        <p class="exp-cat__count">${getCategoryCount(c.id)} careers</p>
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
     RENDER CAREER CARDS
     ============================================================ */
  const renderCard = (c) => {
    const cat = CAT_MAP[c.cat];
    const isSaved = state.saved.has(c.id);
    return `
      <article class="exp-card"
               data-id="${c.id}"
               style="--cat-color:${cat.color};--cat-bg:${cat.bg}">
        <div class="exp-card__head">
          <span class="exp-card__icon"><i class="bi ${c.icon}"></i></span>
          <span class="exp-card__cat"><i class="bi ${cat.icon}"></i> ${cat.label}</span>
        </div>

        <h3 class="exp-card__title">${c.title}</h3>
        <p class="exp-card__desc">${c.desc}</p>

        <div class="exp-card__meta">
          <div class="exp-card__meta-row">
            <i class="bi bi-mortarboard"></i>
            <span title="${c.edu}">${c.edu}</span>
          </div>
          <div class="exp-card__meta-row">
            <i class="bi bi-graph-up-arrow"></i>
            <span>${c.demand} demand</span>
          </div>
        </div>

        <div class="exp-card__skills">
          ${c.skills.map((s) => `<span class="exp-skill">${s}</span>`).join('')}
        </div>

        <div class="exp-card__actions">
          <button class="exp-card__save ${isSaved ? 'is-saved' : ''}"
                  data-save="${c.id}"
                  aria-label="${isSaved ? 'Remove from saved' : 'Save career'}">
            <i class="bi bi-bookmark${isSaved ? '-fill' : ''}"></i>
          </button>
          <a class="exp-card__learn" href="career-details.html">
            Learn More <i class="bi bi-arrow-right"></i>
          </a>
        </div>
      </article>
    `;
  };

  /* ============================================================
     RENDER ACTIVE FILTERS BAR
     ============================================================ */
  const renderActiveFilters = () => {
    if (!activeFilters) return;
    const filters = [];
    if (state.search.trim()) {
      filters.push({ type: 'search', label: `"${state.search.trim()}"` });
    }
    if (state.category !== 'all') {
      const cat = CAT_MAP[state.category];
      if (cat) filters.push({ type: 'category', label: cat.label });
    }

    if (filters.length === 0) {
      activeFilters.hidden = true;
      return;
    }

    activeFilters.hidden = false;
    activeFilters.innerHTML = `
      <span class="exp-active-filters__label">Active filters:</span>
      ${filters.map((f) => `
        <span class="exp-filter-chip">
          ${f.label}
          <button type="button" data-clear-filter="${f.type}" aria-label="Remove filter">
            <i class="bi bi-x"></i>
          </button>
        </span>
      `).join('')}
      <button type="button" class="exp-active-filters__clear" id="clearAllFilters">Clear all</button>
    `;

    activeFilters.querySelectorAll('[data-clear-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const t = btn.dataset.clearFilter;
        if (t === 'search') {
          state.search = '';
          if (exploreSearch) exploreSearch.value = '';
          if (searchClear) searchClear.hidden = true;
        } else if (t === 'category') {
          state.category = 'all';
          renderCategories();
        }
        state.page = 1;
        render();
      });
    });

    const clearAll = activeFilters.querySelector('#clearAllFilters');
    if (clearAll) {
      clearAll.addEventListener('click', resetFilters);
    }
  };

  /* ============================================================
     RENDER MAIN
     ============================================================ */
  const render = () => {
    if (!careerGrid) return;

    const list = getFiltered();
    const total = list.length;
    const visible = list.slice(0, state.page * state.perPage);

    /* Headline + count */
    if (resultsTitle) {
      resultsTitle.textContent = state.category === 'all'
        ? (state.search ? 'Search results' : 'All careers')
        : CAT_MAP[state.category]?.label || 'Careers';
    }
    if (resultsCount) {
      resultsCount.textContent = `${total} ${total === 1 ? 'career' : 'careers'}`;
    }

    /* Grid */
    if (visible.length === 0) {
      careerGrid.innerHTML = '';
      if (exploreEmpty) exploreEmpty.hidden = false;
      if (loadMoreWrap) loadMoreWrap.hidden = true;
    } else {
      if (exploreEmpty) exploreEmpty.hidden = true;
      careerGrid.innerHTML = visible.map(renderCard).join('');

      /* Save buttons */
      careerGrid.querySelectorAll('[data-save]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          toggleSave(btn.dataset.save);
        });
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
     SAVE
     ============================================================ */
  const toggleSave = (id) => {
    const c = CAREERS.find((x) => x.id === id);
    if (!c) return;
    if (state.saved.has(id)) {
      state.saved.delete(id);
      if (window.egToast) window.egToast(`Removed ${c.title} from saved`);
    } else {
      state.saved.add(id);
      if (window.egToast) window.egToast(`Saved ${c.title} to your careers ❤️`);
    }
    render();
  };

  /* ============================================================
     SEARCH
     ============================================================ */
  let searchDebounce;
  exploreSearch?.addEventListener('input', () => {
    state.search = exploreSearch.value;
    state.page = 1;
    if (searchClear) searchClear.hidden = !state.search;
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => render(), 180);
  });

  searchClear?.addEventListener('click', () => {
    state.search = '';
    if (exploreSearch) {
      exploreSearch.value = '';
      exploreSearch.focus();
    }
    if (searchClear) searchClear.hidden = true;
    state.page = 1;
    render();
  });

  exploreSearchForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    state.search = exploreSearch.value;
    state.page = 1;
    render();
    careerGrid?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.querySelectorAll('[data-hint]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const hint = btn.dataset.hint;
      if (!exploreSearch) return;
      exploreSearch.value = hint;
      state.search = hint;
      state.page = 1;
      if (searchClear) searchClear.hidden = false;
      render();
      careerGrid?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ============================================================
     SORT
     ============================================================ */
  document.querySelectorAll('[data-sort]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.sort = btn.dataset.sort;
      const map = {
        trending: 'Trending',
        name: 'Name (A–Z)',
        demand: 'In demand',
        salary: 'Highest salary'
      };
      if (sortLabel) sortLabel.textContent = map[state.sort] || 'Trending';
      document.querySelectorAll('[data-eg-dd]').forEach((dd) => dd.classList.remove('is-open'));
      state.page = 1;
      render();
    });
  });

  /* ============================================================
     VIEW MODE
     ============================================================ */
  document.querySelectorAll('[data-view]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-view]').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      state.view = btn.dataset.view;
      if (careerGrid) careerGrid.classList.toggle('is-list', state.view === 'list');
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
    state.page = 1;
    if (exploreSearch) exploreSearch.value = '';
    if (searchClear) searchClear.hidden = true;
    renderCategories();
    render();
  };

  document.getElementById('emptyReset')?.addEventListener('click', resetFilters);

  /* ============================================================
     KEYBOARD SHORTCUT: / focuses search
     ============================================================ */
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      exploreSearch?.focus();
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