/* ============================================================
   EduGuide AI — Career Assessment (Phase 7)
   Depends on app.js (egToast) + components.js
   ============================================================ */
(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     QUESTION DATA — 8 sections · 20 questions
     ============================================================ */
  const SECTIONS = [
    {
      id: 'interests',
      title: 'Personal Interests',
      icon: 'bi-heart',
      questions: [
        {
          id: 'q1',
          text: 'Which activities do you enjoy most in your free time?',
          options: [
            'Solving puzzles, coding, or building things',
            'Reading, writing, or researching topics I love',
            'Drawing, designing, or creating visuals',
            'Meeting people, organising events, or leading teams',
            'Tinkering with machines, tools, or the outdoors'
          ]
        },
        {
          id: 'q2',
          text: 'What kind of problems excite you most?',
          options: [
            'Technical problems with clear solutions',
            'Human problems — helping people feel better',
            'Creative problems with no fixed answer',
            'Strategic problems — planning &amp; optimising',
            'Scientific problems — discovering how things work'
          ]
        },
        {
          id: 'q3',
          text: 'Which topic could you talk about for hours?',
          options: [
            'Technology, gadgets and the future of AI',
            'Health, medicine and the human body',
            'Business, money and entrepreneurship',
            'Art, film, music and storytelling',
            'Nature, science and the environment'
          ]
        }
      ]
    },
    {
      id: 'skills',
      title: 'Skills & Abilities',
      icon: 'bi-graph-up',
      questions: [
        {
          id: 'q4',
          text: 'Which skill do you feel most confident about?',
          options: [
            'Logical reasoning and problem-solving',
            'Communication and empathy',
            'Creativity and imagination',
            'Organisation and planning',
            'Hands-on making and building'
          ]
        },
        {
          id: 'q5',
          text: 'When working on a team, what role do you naturally take?',
          options: [
            'The problem-solver — I fix what breaks',
            'The leader — I keep everyone focused',
            'The idea-generator — I bring fresh angles',
            'The mediator — I keep the team together',
            'The executor — I get things done'
          ]
        }
      ]
    },
    {
      id: 'personality',
      title: 'Personality',
      icon: 'bi-person-badge',
      questions: [
        {
          id: 'q6',
          text: 'How do you approach a new challenge?',
          options: [
            'Jump in — figure it out as I go',
            'Research first — understand before acting',
            'Plan carefully — then execute step by step',
            'Talk to others — gather perspectives first',
            'Wait and see — assess the risk first'
          ]
        },
        {
          id: 'q7',
          text: 'How do you prefer to spend your energy?',
          options: [
            'Deep focus on a single complex task',
            'Variety — switching between different activities',
            'Collaborating with people all day',
            'Helping others solve their problems',
            'Being outdoors and physically active'
          ]
        },
        {
          id: 'q8',
          text: 'When making decisions, what matters most to you?',
          options: [
            'Logic and evidence',
            'How it affects other people',
            'Whether it feels right to me',
            'Long-term impact and results',
            'Practicality and speed'
          ]
        }
      ]
    },
    {
      id: 'academic',
      title: 'Academic Strengths',
      icon: 'bi-mortarboard',
      questions: [
        {
          id: 'q9',
          text: 'Which school subject comes most naturally to you?',
          options: [
            'Mathematics and sciences',
            'Languages and literature',
            'Social sciences and history',
            'Arts and design',
            'Practical and technical subjects'
          ]
        },
        {
          id: 'q10',
          text: 'How do you typically study?',
          options: [
            'Solving practice problems until it clicks',
            'Reading and taking notes',
            'Discussing with friends or study groups',
            'Watching videos and tutorials',
            'Building or experimenting hands-on'
          ]
        }
      ]
    },
    {
      id: 'subjects',
      title: 'Favourite Subjects',
      icon: 'bi-book',
      questions: [
        {
          id: 'q11',
          text: 'Which subject do you find most engaging?',
          options: [
            'Physics, chemistry or biology',
            'Mathematics or computer science',
            'Economics or business studies',
            'Literature, history or geography',
            'Fine arts, music or drama'
          ]
        },
        {
          id: 'q12',
          text: 'Which subject would you study more of, purely out of curiosity?',
          options: [
            'Psychology — how the mind works',
            'Astronomy — the universe and beyond',
            'Economics — how societies create value',
            'Philosophy — deep questions about life',
            'Medicine — how the body heals'
          ]
        }
      ]
    },
    {
      id: 'hobbies',
      title: 'Hobbies',
      icon: 'bi-controller',
      questions: [
        {
          id: 'q13',
          text: 'What do you do for fun outside school?',
          options: [
            'Gaming, coding or building projects',
            'Reading, writing or journaling',
            'Sports, hiking or outdoor activities',
            'Drawing, designing or making music',
            'Hanging out, volunteering or community work'
          ]
        },
        {
          id: 'q14',
          text: 'What kind of content do you consume online?',
          options: [
            'Tech reviews, coding tutorials and AI news',
            'Health, fitness and wellness content',
            'Business, startups and finance content',
            'Art, design and creative content',
            'Documentaries on science and nature'
          ]
        }
      ]
    },
    {
      id: 'work',
      title: 'Work Preferences',
      icon: 'bi-briefcase',
      questions: [
        {
          id: 'q15',
          text: 'What kind of work environment appeals to you most?',
          options: [
            'A fast-moving tech company',
            'A hospital or clinic helping people directly',
            'A creative studio or agency',
            'A school, university or research lab',
            'Running my own business or venture'
          ]
        },
        {
          id: 'q16',
          text: 'How do you prefer to work?',
          options: [
            'Independently — deep focus on my own work',
            'In a small focused team',
            'Leading a large team or department',
            'Directly with clients and customers',
            'In the field — hands-on, on-site'
          ]
        },
        {
          id: 'q17',
          text: 'What motivates you most in a career?',
          options: [
            'Solving hard technical problems',
            'Making a real difference in people\'s lives',
            'Creative freedom and expression',
            'Financial security and growth',
            'Recognition and leadership'
          ]
        }
      ]
    },
    {
      id: 'aspirations',
      title: 'Career Aspirations',
      icon: 'bi-rocket-takeoff',
      questions: [
        {
          id: 'q18',
          text: 'What impact do you want to have on the world?',
          options: [
            'Build technology that changes how people live',
            'Improve health and well-being for many',
            'Create beautiful, meaningful work',
            'Educate and inspire the next generation',
            'Solve big problems at scale through business'
          ]
        },
        {
          id: 'q19',
          text: 'In 10 years, where do you see yourself?',
          options: [
            'A senior engineer or technical lead',
            'A doctor, researcher or healthcare leader',
            'A founder or business owner',
            'A creative professional or designer',
            'A professor, teacher or education leader'
          ]
        },
        {
          id: 'q20',
          text: 'What does success mean to you?',
          options: [
            'Mastering a skill deeply and being respected for it',
            'Knowing I helped people live better lives',
            'Creating something original that lasts',
            'Achieving financial freedom',
            'Making my family and community proud'
          ]
        }
      ]
    }
  ];

  /* ---------- Flatten with section metadata ---------- */
  const FLAT = [];
  SECTIONS.forEach((section, sIdx) => {
    section.questions.forEach((q, qIdx) => {
      FLAT.push({
        ...q,
        sectionId: section.id,
        sectionTitle: section.title,
        sectionIcon: section.icon,
        sectionIndex: sIdx,
        indexInSection: qIdx + 1
      });
    });
  });

  const TOTAL = FLAT.length;

  /* ============================================================
     STATE
     ============================================================ */
  const STORAGE_KEY = 'eg_assessment_v1';
  let currentIndex = 0;
  let answers = {}; // { qId: optionIndex }
  let currentSectionIndex = -1;

  /* ---------- Load saved state ---------- */
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (saved && typeof saved === 'object') {
      answers = saved.answers || {};
      currentIndex = Math.max(0, Math.min(saved.index || 0, TOTAL - 1));
    }
  } catch (_) { /* ignore */ }

  const persist = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        answers,
        index: currentIndex,
        updatedAt: Date.now()
      }));
    } catch (_) { /* ignore */ }
  };

  /* ============================================================
     DOM
     ============================================================ */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const screens = $$('.assess-screen');
  const progressBar = $('#progressBar');
  const progressWrap = $('#progressWrap');
  const topStatus = $('#topStatus');
  const sectionLabel = $('#sectionLabel');
  const sectionIcon = $('#sectionIcon');
  const questionCount = $('#questionCount');
  const questionText = $('#questionText');
  const optionsContainer = $('#optionsContainer');
  const prevBtn = $('#prevBtn');
  const nextBtn = $('#nextBtn');
  const navHint = $('#navHint');
  const sectionToast = $('#sectionToast');
  const sectionToastText = $('#sectionToastText');
  const exitBtn = $('#exitBtn');
  const exitModal = $('#exitModal');
  const resumeBtn = $('#resumeBtn');
  const retakeBtn = $('#retakeBtn');
  const resultsPreview = $('#resultsPreview');

  /* ============================================================
     SCREEN NAVIGATION
     ============================================================ */
  const showScreen = (name) => {
    screens.forEach((s) => {
      s.classList.toggle('is-active', s.dataset.screen === name);
    });
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });

    if (name === 'completion') {
      progressBar.style.width = '100%';
      progressWrap.setAttribute('aria-valuenow', '100');
      topStatus.textContent = 'Complete ✓';
      playCompletionEntrance();
    }
  };

  document.querySelectorAll('[data-goto]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.goto;
      if (target === 'question') {
        renderQuestion(currentIndex);
      }
      showScreen(target);
    });
  });

  /* ---------- Resume button (only if progress exists) ---------- */
  const hasProgress = Object.keys(answers).length > 0;
  if (hasProgress && resumeBtn) {
    resumeBtn.hidden = false;
    resumeBtn.addEventListener('click', () => {
      showScreen('question');
      renderQuestion(currentIndex);
    });
  }

  /* ============================================================
     QUESTION RENDERING
     ============================================================ */
  const renderQuestion = (index) => {
    const q = FLAT[index];
    if (!q) return;

    /* Section transitions */
    if (q.sectionIndex !== currentSectionIndex && currentSectionIndex !== -1) {
      showSectionToast(`Moving to: ${q.sectionTitle}`);
    }
    currentSectionIndex = q.sectionIndex;

    /* Header */
    sectionLabel.textContent = q.sectionTitle;
    sectionIcon.innerHTML = `<i class="bi ${q.sectionIcon}"></i>`;
    questionCount.textContent = `Question ${index + 1} of ${TOTAL}`;

    /* Question text */
    questionText.innerHTML = q.text;
    if (!prefersReducedMotion) {
      questionText.classList.remove('is-animating');
      // force reflow
      void questionText.offsetWidth;
      questionText.classList.add('is-animating');
    }

    /* Options */
    optionsContainer.innerHTML = '';
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'assess-option';
      btn.setAttribute('role', 'radio');
      btn.dataset.value = String(i);
      const isSelected = answers[q.id] === i;
      if (isSelected) {
        btn.classList.add('is-selected');
        btn.setAttribute('aria-checked', 'true');
      } else {
        btn.setAttribute('aria-checked', 'false');
      }

      btn.innerHTML = `
        <span class="assess-option__radio" aria-hidden="true"></span>
        <span class="assess-option__text">${opt}</span>
        <span class="assess-option__key" aria-hidden="true">${i + 1}</span>
      `;

      btn.addEventListener('click', () => selectOption(q.id, i, btn));
      optionsContainer.appendChild(btn);
    });

    /* Navigation */
    updateNavState();
    updateProgress();

    /* Save position */
    persist();
  };

  /* ============================================================
     OPTION SELECTION
     ============================================================ */
  const selectOption = (qId, value, btnEl) => {
    answers[qId] = value;

    /* Visual state */
    optionsContainer.querySelectorAll('.assess-option').forEach((el) => {
      const selected = Number(el.dataset.value) === value;
      el.classList.toggle('is-selected', selected);
      el.setAttribute('aria-checked', selected ? 'true' : 'false');
    });

    /* Haptic-ish micro animation */
    if (!prefersReducedMotion && btnEl) {
      btnEl.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(0.98)' }, { transform: 'scale(1)' }],
        { duration: 180, easing: 'ease-out' }
      );
    }

    updateNavState();
    updateProgress();
    persist();
  };

  /* ============================================================
     NAV STATE
     ============================================================ */
  const updateNavState = () => {
    const q = FLAT[currentIndex];
    const answered = q && answers[q.id] !== undefined;

    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = !answered;

    if (navHint) {
      if (answered) {
        navHint.textContent = currentIndex === TOTAL - 1
          ? 'Press Next to finish'
          : 'Press Next or Enter to continue';
        navHint.classList.add('is-ready');
      } else {
        navHint.textContent = 'Select an option to continue';
        navHint.classList.remove('is-ready');
      }
    }
  };

  /* ============================================================
     PROGRESS
     ============================================================ */
  const updateProgress = () => {
    const answeredCount = Object.keys(answers).length;
    const pct = Math.round((answeredCount / TOTAL) * 100);

    if (progressBar) progressBar.style.width = pct + '%';
    if (progressWrap) progressWrap.setAttribute('aria-valuenow', String(pct));

    if (topStatus) {
      if (answeredCount === 0) topStatus.textContent = 'Not started';
      else if (answeredCount === TOTAL) topStatus.textContent = `${TOTAL} of ${TOTAL} answered`;
      else topStatus.textContent = `${answeredCount} of ${TOTAL} answered`;
    }
  };

  /* ============================================================
     SECTION TOAST
     ============================================================ */
  let toastTimer = null;
  const showSectionToast = (text) => {
    if (!sectionToast) return;
    sectionToastText.textContent = text;
    sectionToast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      sectionToast.classList.remove('is-visible');
    }, 2200);
  };

  /* ============================================================
     NAVIGATION BUTTONS
     ============================================================ */
  const goNext = () => {
    const q = FLAT[currentIndex];
    if (!q || answers[q.id] === undefined) return;

    if (currentIndex < TOTAL - 1) {
      currentIndex += 1;
      renderQuestion(currentIndex);
    } else {
      finishAssessment();
    }
  };

  const goPrev = () => {
    if (currentIndex === 0) return;
    currentIndex -= 1;
    renderQuestion(currentIndex);
  };

  prevBtn?.addEventListener('click', goPrev);
  nextBtn?.addEventListener('click', goNext);

  /* ============================================================
     FINISH
     ============================================================ */
  const finishAssessment = () => {
    persist();
    showScreen('completion');
  };

  /* ============================================================
     KEYBOARD SHORTCUTS
     ============================================================ */
  document.addEventListener('keydown', (e) => {
    const activeScreen = document.querySelector('.assess-screen.is-active')?.dataset.screen;
    if (activeScreen !== 'question') {
      /* Escape still opens exit modal from any screen */
      if (e.key === 'Escape' && activeScreen !== 'completion') {
        openExitModal();
      }
      return;
    }

    /* Number keys 1-5 select options */
    if (/^[1-5]$/.test(e.key)) {
      const idx = parseInt(e.key, 10) - 1;
      const q = FLAT[currentIndex];
      if (q && idx < q.options.length) {
        const btn = optionsContainer.querySelector(`.assess-option[data-value="${idx}"]`);
        if (btn) {
          selectOption(q.id, idx, btn);
        }
      }
      return;
    }

    /* Arrow navigation */
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      goNext();
    } else if (e.key === 'Escape') {
      openExitModal();
    }
  });

  /* ============================================================
     EXIT MODAL
     ============================================================ */
  const openExitModal = () => {
    if (!exitModal) return;
    exitModal.classList.add('is-open');
    exitModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const closeExitModal = () => {
    if (!exitModal) return;
    exitModal.classList.remove('is-open');
    exitModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  exitBtn?.addEventListener('click', openExitModal);
  exitModal?.querySelectorAll('[data-eg-modal-close]').forEach((el) => {
    el.addEventListener('click', closeExitModal);
  });

  /* ============================================================
     RETAKE
     ============================================================ */
  retakeBtn?.addEventListener('click', () => {
    if (!confirm('Retake the assessment? Your current answers will be cleared.')) return;
    answers = {};
    currentIndex = 0;
    currentSectionIndex = -1;
    try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
    progressBar.style.width = '0%';
    showScreen('welcome');
    if (resumeBtn) resumeBtn.hidden = true;
  });

  /* ============================================================
     COMPLETION ENTRANCE
     ============================================================ */
  const playCompletionEntrance = () => {
    if (!resultsPreview) return;
    /* Re-trigger the CSS animations */
    resultsPreview.querySelectorAll('.assess-result').forEach((el) => {
      el.style.animation = 'none';
      void el.offsetWidth;
      el.style.animation = '';
    });
  };

  /* ============================================================
     INIT — render first question silently so header is fresh
     ============================================================ */
  if (hasProgress && currentIndex > 0) {
    renderQuestion(currentIndex);
    showScreen('welcome');
  } else {
    renderQuestion(0);
    showScreen('welcome');
  }
})();