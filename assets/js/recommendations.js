/* ============================================================
   EduGuide AI — Recommendations (Phase 8)
   Depends on dashboard-shell.js + app.js (egToast) + components.js
   ============================================================ */
(() => {
  'use strict';

  /* ============================================================
     DATA — 9 career matches
     ============================================================ */
  const CAREERS = [
    {
      id: 'software-engineer',
      title: 'Software Engineer',
      category: 'technology',
      categoryLabel: 'Technology',
      icon: 'bi-code-slash',
      iconColor: 'purple',
      match: 94,
      shortDesc: 'Design, build and maintain software systems used by millions of people worldwide.',
      skills: ['JavaScript', 'Python', 'Problem Solving', 'Git'],
      education: 'B.Sc. Computer Science',
      salary: '₦6M – ₦18M / yr',
      demand: 'Very high',
      badge: 'Top pick'
    },
    {
      id: 'data-scientist',
      title: 'Data Scientist',
      category: 'technology',
      categoryLabel: 'Technology',
      icon: 'bi-graph-up',
      iconColor: 'sky',
      match: 89,
      shortDesc: 'Extract insights from data using statistics and machine learning to guide decisions.',
      skills: ['Python', 'Statistics', 'SQL', 'Machine Learning'],
      education: 'B.Sc. + M.Sc.',
      salary: '₦7M – ₦20M / yr',
      demand: 'Very high'
    },
    {
      id: 'ai-engineer',
      title: 'AI / ML Engineer',
      category: 'technology',
      categoryLabel: 'Technology',
      icon: 'bi-cpu',
      iconColor: 'success',
      match: 84,
      shortDesc: 'Build intelligent systems that learn, reason and make predictions.',
      skills: ['Python', 'TensorFlow', 'Math', 'Research'],
      education: 'B.Sc. Computer Science',
      salary: '₦8M – ₦22M / yr',
      demand: 'Very high'
    },
    {
      id: 'ux-designer',
      title: 'UX Designer',
      category: 'creative',
      categoryLabel: 'Creative',
      icon: 'bi-palette',
      iconColor: 'warning',
      match: 82,
      shortDesc: 'Shape how people experience digital products through research, design and testing.',
      skills: ['Figma', 'User Research', 'Prototyping'],
      education: 'B.A. Design / HCI',
      salary: '₦4M – ₦12M / yr',
      demand: 'High'
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity Analyst',
      category: 'technology',
      categoryLabel: 'Technology',
      icon: 'bi-shield-lock',
      iconColor: 'purple',
      match: 79,
      shortDesc: 'Protect systems and data from attacks and design secure infrastructure.',
      skills: ['Networking', 'Linux', 'Threat Analysis'],
      education: 'B.Sc. Cybersecurity',
      salary: '₦6M – ₦16M / yr',
      demand: 'Very high'
    },
    {
      id: 'medical-doctor',
      title: 'Medical Doctor',
      category: 'health',
      categoryLabel: 'Health',
      icon: 'bi-heart-pulse',
      iconColor: 'danger',
      match: 76,
      shortDesc: 'Diagnose and treat patients, improving health and saving lives every day.',
      skills: ['Empathy', 'Biology', 'Communication'],
      education: 'MBBS',
      salary: '₦5M – ₦15M / yr',
      demand: 'High'
    },
    {
      id: 'product-manager',
      title: 'Product Manager',
      category: 'business',
      categoryLabel: 'Business',
      icon: 'bi-briefcase',
      iconColor: 'sky',
      match: 74,
      shortDesc: 'Lead teams to build products that solve real customer problems.',
      skills: ['Strategy', 'Communication', 'Data'],
      education: 'B.Sc. or MBA',
      salary: '₦7M – ₦18M / yr',
      demand: 'High'
    },
    {
      id: 'data-analyst',
      title: 'Business Data Analyst',
      category: 'business',
      categoryLabel: 'Business',
      icon: 'bi-bar-chart-line',
      iconColor: 'success',
      match: 71,
      shortDesc: 'Turn data into clear business insights that drive smarter decisions.',
      skills: ['Excel', 'SQL', 'Tableau', 'Storytelling'],
      education: 'B.Sc. any field',
      salary: '₦4M – ₦10M / yr',
      demand: 'High'
    },
    {
      id: 'teacher',
      title: 'STEM Educator',
      category: 'education',
      categoryLabel: 'Education',
      icon: 'bi-mortarboard',
      iconColor: 'warning',
      match: 68,
      shortDesc: 'Inspire the next generation of scientists and engineers.',
      skills: ['Communication', 'Patience', 'Subject Mastery'],
      education: 'B.Ed. / B.Sc. + PGDE',
      salary: '₦3M – ₦8M / yr',
      demand: 'Moderate'
    }
  ];

  /* ============================================================
     STATE
     ============================================================ */
  const state = {
    category: 'all',
    minMatch: 0,
    sort: 'match',
    saved: new Set(),
    compare: []
  };

  /* ---------- DOM ---------- */
  const $ = (sel) => document.querySelector(sel);
  const grid = $('#recGrid');
  const empty = $('#recEmpty');
  const resultCount = $('#resultCount');
  const clearFilters = $('#clearFilters');
  const emptyReset = $('#emptyReset');
  const sortLabel = $('#sortLabel');
  const compareTray = $('#compareTray');
  const compareSlots = $('#compareSlots');
  const compareCount = $('#compareCount');
  const clearCompareBtn = $('#clearCompareBtn');
  const openCompareBtn = $('#openCompareBtn');
  const compareModal = $('#compareModal');
  const compareBody = $('#compareBody');
  const downloadCompareBtn = $('#downloadCompareBtn');
  const shareBtn = $('#shareBtn');
  const downloadBtn = $('#downloadBtn');
  const shareModal = $('#shareModal');
  const copyLinkBtn = $('#copyLinkBtn');
  const nativeShareBtn = $('#nativeShareBtn');

  /* ============================================================
     HELPERS
     ============================================================ */
  const matchClass = (m) => (m >= 85 ? '' : m >= 75 ? '--mid' : '--low');
  const matchClassSuffix = (m) => matchClass(m);

  const getFiltered = () => {
    let list = CAREERS.filter((c) => c.match >= state.minMatch);
    if (state.category !== 'all') {
      list = list.filter((c) => c.category === state.category);
    }
    switch (state.sort) {
      case 'name':
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'salary':
        // rough numeric parse
        list.sort((a, b) => {
          const av = parseInt(a.salary.replace(/[^\d]/g, ''), 10) || 0;
          const bv = parseInt(b.salary.replace(/[^\d]/g, ''), 10) || 0;
          return bv - av;
        });
        break;
      case 'demand':
        const rank = { 'Very high': 3, 'High': 2, 'Moderate': 1 };
        list.sort((a, b) => (rank[b.demand] || 0) - (rank[a.demand] || 0));
        break;
      case 'match':
      default:
        list.sort((a, b) => b.match - a.match);
    }
    return list;
  };

  /* ============================================================
     RENDER
     ============================================================ */
  const render = () => {
    const list = getFiltered();

    /* Result count */
    if (resultCount) {
      resultCount.textContent = `Showing ${list.length} of ${CAREERS.length} careers`;
    }

    /* Clear filters visibility */
    const hasFilters = state.category !== 'all' || state.minMatch > 0;
    if (clearFilters) clearFilters.hidden = !hasFilters;

    /* Empty state */
    if (list.length === 0) {
      grid.innerHTML = '';
      empty.hidden = false;
      return;
    }
    empty.hidden = true;

    /* Cards */
    grid.innerHTML = list.map((c) => renderCard(c)).join('');

    /* Attach events */
    grid.querySelectorAll('[data-action]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        const id = btn.dataset.id;
        if (action === 'save') toggleSave(id, btn);
        else if (action === 'compare') toggleCompare(id);
      });
    });

    /* View details links */
    grid.querySelectorAll('[data-details]').forEach((link) => {
      link.addEventListener('click', () => {
        // Navigate (career-details.html)
        window.location.href = 'career-details.html';
      });
    });

    updateCompareTray();
  };

  const renderCard = (c) => {
    const isSaved = state.saved.has(c.id);
    const isComparing = state.compare.includes(c.id);
    const matchClassSuffix = c.match >= 85 ? '' : c.match >= 75 ? '--mid' : '--low';

    return `
      <article class="rec-card ${isComparing ? 'is-compare-selected' : ''}" data-id="${c.id}">
        <div class="rec-card__top">
          <span class="rec-card__icon rec-card__icon--${c.iconColor}">
            <i class="bi ${c.icon}"></i>
          </span>
          <div class="rec-card__badges">
            ${c.badge ? `<span class="rec-card__badge">${c.badge}</span>` : ''}
            <span class="rec-card__match rec-card__match${matchClassSuffix}">${c.match}% match</span>
          </div>
        </div>

        <h3 class="rec-card__title">${c.title}</h3>
        <p class="rec-card__category">${c.categoryLabel}</p>
        <p class="rec-card__desc">${c.shortDesc}</p>

        <div class="rec-card__skills">
          ${c.skills.slice(0, 4).map((s) => `<span class="rec-skill">${s}</span>`).join('')}
        </div>

        <div class="rec-card__meta">
          <div class="rec-card__meta-item">
            <span class="rec-card__meta-label">Education</span>
            <span class="rec-card__meta-value" title="${c.education}">${c.education}</span>
          </div>
          <div class="rec-card__meta-item">
            <span class="rec-card__meta-label">Salary</span>
            <span class="rec-card__meta-value" title="${c.salary}">${c.salary}</span>
          </div>
        </div>

        <div class="rec-card__actions">
          <button class="rec-card__btn ${isSaved ? 'is-saved' : ''}"
                  data-action="save" data-id="${c.id}"
                  aria-label="${isSaved ? 'Remove from saved' : 'Save career'}">
            <i class="bi bi-bookmark${isSaved ? '-fill' : ''}"></i>
            ${isSaved ? 'Saved' : 'Save'}
          </button>
          <button class="rec-card__btn ${isComparing ? 'is-compare-on' : ''}"
                  data-action="compare" data-id="${c.id}"
                  aria-label="${isComparing ? 'Remove from comparison' : 'Add to comparison'}">
            <i class="bi bi-columns-gap"></i>
            ${isComparing ? 'Added' : 'Compare'}
          </button>
          <a href="career-details.html" class="rec-card__btn is-primary" data-details>
            View <i class="bi bi-arrow-right"></i>
          </a>
        </div>
      </article>
    `;
  };

  /* ============================================================
     SAVE
     ============================================================ */
  const toggleSave = (id, btn) => {
    const career = CAREERS.find((c) => c.id === id);
    if (!career) return;
    if (state.saved.has(id)) {
      state.saved.delete(id);
      if (window.egToast) window.egToast(`Removed ${career.title} from saved`);
    } else {
      state.saved.add(id);
      if (window.egToast) window.egToast(`Saved ${career.title} to your careers ❤️`);
    }
    render();
  };

  /* ============================================================
     COMPARE
     ============================================================ */
  const toggleCompare = (id) => {
    const idx = state.compare.indexOf(id);
    if (idx >= 0) {
      state.compare.splice(idx, 1);
    } else {
      if (state.compare.length >= 3) {
        if (window.egToast) window.egToast('You can compare up to 3 careers at once');
        return;
      }
      state.compare.push(id);
    }
    render();
  };

  const updateCompareTray = () => {
    if (state.compare.length === 0) {
      if (compareTray) compareTray.hidden = true;
      return;
    }
    if (compareTray) compareTray.hidden = false;
    if (compareCount) compareCount.textContent = state.compare.length;

    if (compareSlots) {
      compareSlots.innerHTML = state.compare.map((id) => {
        const c = CAREERS.find((x) => x.id === id);
        if (!c) return '';
        return `
          <span class="rec-slot">
            <span class="rec-slot__icon"><i class="bi ${c.icon}"></i></span>
            ${c.title}
            <button class="rec-slot__remove" data-remove-compare="${c.id}" aria-label="Remove">
              <i class="bi bi-x"></i>
            </button>
          </span>
        `;
      }).join('');

      compareSlots.querySelectorAll('[data-remove-compare]').forEach((btn) => {
        btn.addEventListener('click', () => toggleCompare(btn.dataset.removeCompare));
      });
    }

    if (openCompareBtn) openCompareBtn.disabled = state.compare.length < 2;
  };

  clearCompareBtn?.addEventListener('click', () => {
    state.compare = [];
    render();
  });

  /* ============================================================
     COMPARE MODAL
     ============================================================ */
  const openCompare = () => {
    if (state.compare.length < 2) return;
    const items = state.compare.map((id) => CAREERS.find((c) => c.id === id)).filter(Boolean);

    const headCells = items.map((c) => `
      <th>
        <div class="rec-compare-col-head">
          <span class="rec-compare-col-head__icon rec-card__icon--${c.iconColor}">
            <i class="bi ${c.icon}"></i>
          </span>
          <span>${c.title}</span>
        </div>
      </th>
    `).join('');

    const rows = [
      {
        label: 'Match',
        render: (c) => `<td class="match-cell">${c.match}%</td>`
      },
      {
        label: 'Category',
        render: (c) => `<td>${c.categoryLabel}</td>`
      },
      {
        label: 'Education',
        render: (c) => `<td>${c.education}</td>`
      },
      {
        label: 'Salary',
        render: (c) => `<td>${c.salary}</td>`
      },
      {
        label: 'Demand',
        render: (c) => `<td><strong>${c.demand}</strong></td>`
      },
      {
        label: 'Key skills',
        render: (c) => `<td>${c.skills.join(', ')}</td>`
      },
      {
        label: 'Description',
        render: (c) => `<td>${c.shortDesc}</td>`
      }
    ];

    compareBody.innerHTML = `
      <table class="rec-compare-table">
        <thead>
          <tr>
            <th></th>
            ${headCells}
          </tr>
        </thead>
        <tbody>
          ${rows.map((r) => `
            <tr>
              <th>${r.label}</th>
              ${items.map((c) => r.render(c)).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    compareModal.classList.add('is-open');
    compareModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  openCompareBtn?.addEventListener('click', openCompare);

  /* ============================================================
     MODAL CLOSE (delegated)
     ============================================================ */
  document.querySelectorAll('[data-eg-modal-close]').forEach((el) => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.eg-modal.is-open').forEach((m) => {
        m.classList.remove('is-open');
        m.setAttribute('aria-hidden', 'true');
      });
      document.body.style.overflow = '';
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.eg-modal.is-open').forEach((m) => {
        m.classList.remove('is-open');
        m.setAttribute('aria-hidden', 'true');
      });
      document.body.style.overflow = '';
    }
  });

  /* ============================================================
     SHARE
     ============================================================ */
  shareBtn?.addEventListener('click', () => {
    if (nativeShareBtn && navigator.share) nativeShareBtn.hidden = false;
    shareModal.classList.add('is-open');
    shareModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });

  copyLinkBtn?.addEventListener('click', async () => {
    const input = $('#shareLink');
    if (!input) return;
    try {
      await navigator.clipboard.writeText(input.value);
      if (window.egToast) window.egToast('Link copied to clipboard ✅');
      copyLinkBtn.innerHTML = '<i class="bi bi-check2"></i>';
      setTimeout(() => {
        copyLinkBtn.innerHTML = '<i class="bi bi-clipboard"></i>';
      }, 1800);
    } catch (_) {
      input.select();
      document.execCommand('copy');
      if (window.egToast) window.egToast('Link copied ✅');
    }
  });

  nativeShareBtn?.addEventListener('click', async () => {
    try {
      await navigator.share({
        title: 'My EduGuide AI Career Matches',
        text: 'Here are my top career matches from EduGuide AI!',
        url: 'https://eduguide.ai/r/ao-94x2k'
      });
    } catch (_) { /* user cancelled */ }
  });

  /* ============================================================
     DOWNLOAD
     ============================================================ */
  downloadBtn?.addEventListener('click', () => {
    downloadBtn.classList.add('is-loading');
    downloadBtn.disabled = true;
    const original = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<span class="eg-spinner"></span> Preparing…';
    setTimeout(() => {
      downloadBtn.classList.remove('is-loading');
      downloadBtn.disabled = false;
      downloadBtn.innerHTML = original;
      if (window.egToast) window.egToast('Report downloaded 📄');
    }, 1200);
  });

  downloadCompareBtn?.addEventListener('click', () => {
    downloadCompareBtn.classList.add('is-loading');
    downloadCompareBtn.disabled = true;
    const original = downloadCompareBtn.innerHTML;
    downloadCompareBtn.innerHTML = '<span class="eg-spinner"></span> Preparing…';
    setTimeout(() => {
      downloadCompareBtn.classList.remove('is-loading');
      downloadCompareBtn.disabled = false;
      downloadCompareBtn.innerHTML = original;
      if (window.egToast) window.egToast('Comparison downloaded 📄');
    }, 1000);
  });

  /* ============================================================
     FILTERS
     ============================================================ */
  document.querySelectorAll('[data-cat]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-cat]').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      state.category = btn.dataset.cat;
      render();
    });
  });

  document.querySelectorAll('[data-min]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-min]').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      state.minMatch = parseInt(btn.dataset.min, 10) || 0;
      render();
    });
  });

  document.querySelectorAll('[data-sort]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.sort = btn.dataset.sort;
      if (sortLabel) {
        const map = {
          match: 'Best match',
          name: 'Name (A–Z)',
          salary: 'Highest salary',
          demand: 'Most in demand'
        };
        sortLabel.textContent = map[state.sort] || 'Best match';
      }
      // Close dropdown
      document.querySelectorAll('[data-eg-dd]').forEach((dd) => dd.classList.remove('is-open'));
      render();
    });
  });

  const resetFilters = () => {
    state.category = 'all';
    state.minMatch = 0;
    document.querySelectorAll('[data-cat]').forEach((b) => {
      b.classList.toggle('is-active', b.dataset.cat === 'all');
    });
    document.querySelectorAll('[data-min]').forEach((b) => {
      b.classList.toggle('is-active', b.dataset.min === '0');
    });
    render();
  };
  clearFilters?.addEventListener('click', resetFilters);
  emptyReset?.addEventListener('click', resetFilters);

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
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* ============================================================
     INIT
     ============================================================ */
  render();
})();