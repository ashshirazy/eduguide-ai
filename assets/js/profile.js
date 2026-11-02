/* ============================================================
   EduGuide AI — Profile Page (Phase 6)
   Depends on dashboard-shell.js (dropdowns, sidebar)
   ============================================================ */
(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     DATA — states + academic levels
     ============================================================ */
  const STATES = {
    NG: ['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River',
         'Delta','Ebonyi','Edo','Ekiti','Enugu','FCT — Abuja','Gombe','Imo','Jigawa','Kaduna','Kano',
         'Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo',
         'Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara'],
    GH: ['Greater Accra','Ashanti','Western','Eastern','Northern','Volta','Upper East','Upper West',
         'Central','Bono','Ahafo','Oti','Savannah'],
    KE: ['Nairobi','Mombasa','Kisumu','Nakuru','Eldoret','Thika','Malindi','Kitale','Garissa',
         'Nyeri','Machakos','Meru'],
    ZA: ['Gauteng','Western Cape','KwaZulu-Natal','Eastern Cape','Free State','Limpopo',
         'Mpumalanga','North West','Northern Cape'],
    EG: ['Cairo','Alexandria','Giza','Luxor','Aswan','Port Said','Suez','Ismailia','Tanta','Mansoura']
  };

  const ACADEMIC_LEVELS = {
    secondary: ['JSS 1','JSS 2','JSS 3','SSS 1','SSS 2','SSS 3'],
    undergraduate: ['100 Level','200 Level','300 Level','400 Level','500 Level','600 Level'],
    postgraduate: ['Postgraduate Diploma (PGD)',"Master's Degree (MSc / MA / MBA)",'Doctoral Degree (PhD)']
  };

  const MONTHS = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];

  /* ============================================================
     DOM REFERENCES
     ============================================================ */
  const editBtn = document.getElementById('editProfileBtn');
  const cancelBtn = document.getElementById('cancelEditBtn');
  const saveBtn = document.getElementById('saveProfileBtn');
  const actionBar = document.getElementById('profileActionBar');
  const panels = document.querySelectorAll('.profile-panel');
  const tabs = document.querySelectorAll('[data-profile-tab]');
  const fieldSelectors = document.querySelectorAll('.profile-field[data-field]');

  /* ============================================================
     TAB SWITCHING
     ============================================================ */
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.profileTab;
      tabs.forEach((t) => {
        t.classList.toggle('is-active', t === tab);
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
      });
      panels.forEach((p) => {
        p.classList.toggle('is-active', p.dataset.profilePanel === target);
      });

      // Hide Edit Profile button on Security tab
      if (editBtn) editBtn.classList.toggle('is-hidden', target === 'security');

      // Exit edit mode when switching to security (avoid stale state)
      if (target === 'security' && document.body.classList.contains('is-editing-profile')) {
        exitEditMode(false);
      }
    });
  });

  /* ============================================================
     ORIGINAL STATE CAPTURE (for Cancel)
     ============================================================ */
  let originalState = null;

  const captureState = () => {
    const state = { fields: {}, interests: [] };
    fieldSelectors.forEach((field) => {
      const input = field.querySelector('.profile-field__input');
      const name = field.dataset.field;
      if (input) {
        state.fields[name] = { tag: input.tagName.toLowerCase(), value: input.value };
      }
    });
    document.querySelectorAll('#profileInterests .auth-chip').forEach((chip) => {
      if (chip.classList.contains('is-selected')) state.interests.push(chip.dataset.value);
    });
    return state;
  };

  const restoreState = (state) => {
    if (!state) return;
    Object.entries(state.fields).forEach(([name, { value }]) => {
      const field = document.querySelector(`.profile-field[data-field="${name}"]`);
      const input = field?.querySelector('.profile-field__input');
      if (input) input.value = value;
    });
    document.querySelectorAll('#profileInterests .auth-chip').forEach((chip) => {
      chip.classList.toggle('is-selected', state.interests.includes(chip.dataset.value));
    });
    updateInterestCount();
  };

  /* ============================================================
     FORMAT DATE
     ============================================================ */
  const formatDate = (iso) => {
    if (!iso) return '';
    const [y, m, d] = iso.split('-').map(Number);
    if (!y || !m || !d) return iso;
    return `${d} ${MONTHS[m - 1]} ${y}`;
  };

  /* ============================================================
     APPLY VIEW STATE FROM INPUTS
     ============================================================ */
  const applyViews = () => {
    fieldSelectors.forEach((field) => {
      const input = field.querySelector('.profile-field__input');
      const view = field.querySelector('.profile-field__value');
      const name = field.dataset.field;
      if (!input || !view) return;

      let displayValue;
      if (input.tagName === 'SELECT') {
        displayValue = input.options[input.selectedIndex]?.text || '';
      } else if (input.type === 'date') {
        displayValue = formatDate(input.value);
      } else {
        displayValue = input.value;
      }

      view.textContent = displayValue || '—';

      // Also update hero elements when relevant
      if (name === 'fullName') {
        const heroName = document.getElementById('heroName');
        const initials = document.getElementById('avatarInitials');
        if (heroName) heroName.textContent = displayValue;
        if (initials) {
          const parts = displayValue.trim().split(/\s+/);
          initials.textContent = (parts[0]?.[0] || '') + (parts[parts.length - 1]?.[0] || '');
        }
      }
      if (name === 'educationLevel' || name === 'academicLevel' || name === 'school') {
        updateHeroMeta();
      }
    });
  };

  /* ============================================================
     UPDATE HERO META
     ============================================================ */
  const updateHeroMeta = () => {
    const meta = document.getElementById('heroMeta');
    if (!meta) return;
    const getVal = (name) => {
      const field = document.querySelector(`.profile-field[data-field="${name}"]`);
      const input = field?.querySelector('.profile-field__input');
      if (!input) return '';
      return input.tagName === 'SELECT'
        ? input.options[input.selectedIndex]?.text || ''
        : input.value;
    };
    const level = getVal('educationLevel');
    const acad = getVal('academicLevel');
    const school = getVal('school');
    meta.textContent = [level, acad, school].filter(Boolean).join(' · ');
  };

  /* ============================================================
     INTEREST CHIPS
     ============================================================ */
  const interestCount = document.getElementById('interestCount');
  const updateInterestCount = () => {
    const container = document.getElementById('profileInterests');
    if (!container || !interestCount) return;
    const count = container.querySelectorAll('.auth-chip.is-selected').length;
    interestCount.textContent = count;
  };
  updateInterestCount();

  document.getElementById('profileInterests')?.addEventListener('click', (e) => {
    if (!document.body.classList.contains('is-editing-profile')) return;
    const chip = e.target.closest('.auth-chip');
    if (!chip) return;
    chip.classList.toggle('is-selected');
    updateInterestCount();
  });

  /* ============================================================
     EDIT MODE
     ============================================================ */
  const enterEditMode = () => {
    originalState = captureState();
    document.body.classList.add('is-editing-profile');
    panels.forEach((p) => {
      if (p.dataset.profilePanel !== 'security') p.classList.add('is-editing');
    });
    if (actionBar) actionBar.hidden = false;
    if (editBtn) editBtn.classList.add('is-hidden');
    const hint = document.getElementById('interestEditHint');
    if (hint) hint.innerHTML = '· Toggle chips to change';

    // Focus first editable input
    const firstInput = document.querySelector(
      '.profile-panel.is-editing .profile-field__input'
    );
    if (firstInput) {
      setTimeout(() => firstInput.focus({ preventScroll: true }), 200);
    }
  };

  const exitEditMode = (save = false) => {
    document.body.classList.remove('is-editing-profile');
    panels.forEach((p) => p.classList.remove('is-editing'));
    if (actionBar) actionBar.hidden = true;
    if (editBtn) editBtn.classList.remove('is-hidden');
    const hint = document.getElementById('interestEditHint');
    if (hint) hint.innerHTML = '· Click <strong>Edit Profile</strong> to change';

    if (save) {
      applyViews();
      if (window.egToast) window.egToast('Profile updated ✅');
    } else if (originalState) {
      restoreState(originalState);
    }
    originalState = null;
  };

  editBtn?.addEventListener('click', enterEditMode);
  cancelBtn?.addEventListener('click', () => exitEditMode(false));
  saveBtn?.addEventListener('click', () => {
    if (saveBtn.classList.contains('is-loading')) return;
    saveBtn.classList.add('is-loading');
    saveBtn.disabled = true;
    const original = saveBtn.innerHTML;
    saveBtn.innerHTML = '<span class="eg-spinner"></span> Saving…';

    setTimeout(() => {
      saveBtn.classList.remove('is-loading');
      saveBtn.disabled = false;
      saveBtn.innerHTML = original;
      exitEditMode(true);
    }, 900);
  });

  /* Escape to cancel */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('is-editing-profile')) {
      exitEditMode(false);
    }
  });

  /* ============================================================
     AVATAR UPLOAD + PREVIEW
     ============================================================ */
  const avatarInput = document.getElementById('avatarInput');
  const avatarPreview = document.getElementById('avatarPreview');
  const avatarInitials = document.getElementById('avatarInitials');

  avatarInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      if (window.egToast) window.egToast('Image must be under 5MB');
      e.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (avatarPreview) {
        avatarPreview.src = ev.target.result;
        avatarPreview.hidden = false;
      }
      if (avatarInitials) avatarInitials.style.display = 'none';
      if (window.egToast) window.egToast('Photo updated ✅');
    };
    reader.readAsDataURL(file);
  });

  /* ============================================================
     COUNTRY → STATE CASCADE (in edit mode)
     ============================================================ */
  const countrySelect = document.getElementById('profileCountry');
  const stateSelect = document.getElementById('profileState');

  const populateStates = (code, preselect = null) => {
    if (!stateSelect) return;
    stateSelect.innerHTML = '';
    const states = STATES[code] || [];
    states.forEach((s) => {
      const opt = new Option(s, s);
      if (preselect && s === preselect) opt.selected = true;
      stateSelect.appendChild(opt);
    });
  };

  countrySelect?.addEventListener('change', () => {
    populateStates(countrySelect.value);
  });

  /* ============================================================
     EDUCATION LEVEL → ACADEMIC LEVEL CASCADE
     ============================================================ */
  const eduLevel = document.getElementById('profileEduLevel');
  const acadLevel = document.getElementById('profileAcadLevel');

  eduLevel?.addEventListener('change', () => {
    if (!acadLevel) return;
    acadLevel.innerHTML = '';
    const options = ACADEMIC_LEVELS[eduLevel.value] || [];
    options.forEach((o) => acadLevel.appendChild(new Option(o, o)));
  });

  /* ============================================================
     PASSWORD VISIBILITY (Security tab)
     ============================================================ */
  document.querySelectorAll('[data-toggle-password]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const input = btn.parentElement.querySelector('input');
      if (!input) return;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      btn.innerHTML = `<i class="bi bi-eye${isPassword ? '-slash' : ''}"></i>`;
      btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    });
  });

  /* ============================================================
     CHANGE PASSWORD FORM
     ============================================================ */
  const pwForm = document.getElementById('changePasswordForm');
  const pwBtn = document.getElementById('changePasswordBtn');

  pwForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const current = pwForm.querySelector('[name="currentPassword"]');
    const next = pwForm.querySelector('[name="newPassword"]');
    const confirm = pwForm.querySelector('[name="confirmNewPassword"]');
    let ok = true;

    const mark = (field, bad) => {
      field.classList.toggle('is-invalid', bad);
      field.classList.toggle('is-valid', !bad && field.value.length > 0);
    };

    if (!current.value) { mark(current, true); ok = false; } else mark(current, false);
    if (!next.value || next.value.length < 8) { mark(next, true); ok = false; } else mark(next, false);
    if (next.value !== confirm.value || !confirm.value) { mark(confirm, true); ok = false; } else mark(confirm, false);

    if (!ok) {
      if (window.egToast) window.egToast('Please fix the highlighted fields.');
      return;
    }

    pwBtn.classList.add('is-loading');
    pwBtn.disabled = true;
    const orig = pwBtn.innerHTML;
    pwBtn.innerHTML = '<span class="eg-spinner"></span> Updating…';

    setTimeout(() => {
      pwBtn.classList.remove('is-loading');
      pwBtn.disabled = false;
      pwBtn.innerHTML = orig;
      pwForm.reset();
      pwForm.querySelectorAll('.eg-input').forEach((i) => i.classList.remove('is-valid', 'is-invalid'));
      if (window.egToast) window.egToast('Password updated successfully 🔒');
    }, 1200);
  });

  /* ============================================================
     TWO-FACTOR TOGGLE
     ============================================================ */
  document.getElementById('twoFactorToggle')?.addEventListener('change', (e) => {
    if (window.egToast) {
      window.egToast(e.target.checked
        ? 'Two-factor authentication enabled 🔐'
        : 'Two-factor authentication disabled');
    }
  });

  /* ============================================================
     REVEAL ON SCROLL + PROGRESS BAR + COUNTERS
     ============================================================ */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.1 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // Progress bar in hero
  const heroBar = document.querySelector('.profile-hero .eg-progress__bar[data-progress]');
  if (heroBar) {
    const target = heroBar.dataset.progress + '%';
    heroBar.style.width = '0%';
    setTimeout(() => { heroBar.style.width = target; }, 300);
  }

  // Hero stat counters
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  document.querySelectorAll('.profile-hero [data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count || '0');
    const suffix = el.dataset.suffix || '';
    if (prefersReducedMotion) {
      el.textContent = target + suffix;
      return;
    }
    const start = performance.now();
    const dur = 1400;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(target * easeOutCubic(p)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
})();a