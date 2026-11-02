/* ============================================================
   EduGuide AI — Registration Flow (Phase 3)
   Depends on app.js (shared utilities)
   ============================================================ */
(() => {
  'use strict';

  const form = document.getElementById('registerForm');
  if (!form) return;

  const steps = form.querySelectorAll('.auth-step');
  const stepIndicators = document.querySelectorAll('[data-step-indicator]');
  const progressBar = document.getElementById('stepProgressBar');
  const submitBtn = document.getElementById('submitBtn');
  const TOTAL_STEPS = 3;
  let currentStep = 1;

  /* ============================================================
     DYNAMIC DATA
     ============================================================ */
  const STATES = {
    NG: [
      'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
      'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
      'FCT — Abuja', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina',
      'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo',
      'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
    ],
    GH: ['Greater Accra', 'Ashanti', 'Western', 'Eastern', 'Northern', 'Volta',
         'Upper East', 'Upper West', 'Central', 'Bono', 'Ahafo', 'Oti', 'Savannah'],
    KE: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Malindi',
         'Kitale', 'Garissa', 'Nyeri', 'Machakos', 'Meru'],
    ZA: ['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape',
         'Free State', 'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape'],
    EG: ['Cairo', 'Alexandria', 'Giza', 'Luxor', 'Aswan', 'Port Said',
         'Suez', 'Ismailia', 'Tanta', 'Mansoura']
  };

  const ACADEMIC_LEVELS = {
    secondary: [
      'JSS 1', 'JSS 2', 'JSS 3',
      'SSS 1', 'SSS 2', 'SSS 3'
    ],
    undergraduate: [
      '100 Level', '200 Level', '300 Level', '400 Level', '500 Level', '600 Level'
    ],
    postgraduate: [
      'Postgraduate Diploma (PGD)',
      'Master\'s Degree (MSc / MA / MBA)',
      'Doctoral Degree (PhD)'
    ]
  };

  /* ============================================================
     STEPPER NAVIGATION
     ============================================================ */
  const goToStep = (n) => {
    if (n < 1 || n > TOTAL_STEPS) return;

    steps.forEach((s) => {
      const isActive = Number(s.dataset.step) === n;
      s.classList.toggle('is-active', isActive);
    });

    stepIndicators.forEach((ind) => {
      const idx = Number(ind.dataset.stepIndicator);
      ind.classList.toggle('is-active', idx === n);
      ind.classList.toggle('is-complete', idx < n);
    });

    progressBar.style.width = `${(n / TOTAL_STEPS) * 100}%`;
    currentStep = n;

    // Scroll form top into view on step change (mobile especially)
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Focus first field of the step
    const activeStep = form.querySelector(`.auth-step[data-step="${n}"]`);
    const firstField = activeStep?.querySelector('input, select');
    if (firstField) {
      setTimeout(() => firstField.focus({ preventScroll: true }), 200);
    }
  };

  form.querySelectorAll('[data-step-next]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = Number(btn.dataset.stepNext);
      if (validateStep(currentStep)) {
        goToStep(target);
      } else {
        if (window.egToast) window.egToast('Please fix the highlighted fields first.');
      }
    });
  });

  form.querySelectorAll('[data-step-prev]').forEach((btn) => {
    btn.addEventListener('click', () => goToStep(Number(btn.dataset.stepPrev)));
  });

  /* ============================================================
     VALIDATION — FIELD LEVEL
     ============================================================ */
  const getField = (name) => form.querySelector(`[name="${name}"]`);

  const showError = (field, msg) => {
    field.classList.remove('is-valid');
    field.classList.add('is-invalid');
    const help = document.querySelector(`[data-help-for="${field.name}"]`);
    if (help) {
      help.dataset.originalText = help.dataset.originalText || help.textContent;
      help.textContent = msg;
      help.classList.add('is-error');
      help.classList.remove('is-success');
    }
  };

  const showSuccess = (field, msg) => {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    const help = document.querySelector(`[data-help-for="${field.name}"]`);
    if (help) {
      if (!help.dataset.originalText) help.dataset.originalText = help.textContent;
      help.textContent = msg || 'Looks good';
      help.classList.remove('is-error');
      help.classList.add('is-success');
    }
  };

  const clearState = (field) => {
    field.classList.remove('is-valid', 'is-invalid');
    const help = document.querySelector(`[data-help-for="${field.name}"]`);
    if (help && help.dataset.originalText) {
      help.textContent = help.dataset.originalText;
      help.classList.remove('is-error', 'is-success');
    }
  };

  /* ---------- Field-level validators ---------- */
  const validators = {
    fullName: (v) => {
      if (!v.trim()) return 'Full name is required.';
      if (v.trim().length < 2) return 'Name must be at least 2 characters.';
      if (!/^[a-zA-Z\s'.\-]+$/.test(v)) return 'Name contains invalid characters.';
      return null;
    },
    email: (v) => {
      if (!v.trim()) return 'Email address is required.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return 'Enter a valid email address.';
      return null;
    },
    phone: (v) => {
      if (!v.trim()) return 'Phone number is required.';
      const digits = v.replace(/[^\d]/g, '');
      if (digits.length < 8) return 'Enter a valid phone number.';
      if (digits.length > 15) return 'Phone number is too long.';
      return null;
    },
    dob: (v) => {
      if (!v) return 'Date of birth is required.';
      const dob = new Date(v);
      const now = new Date();
      let age = now.getFullYear() - dob.getFullYear();
      const m = now.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--;
      if (age < 10) return 'You must be at least 10 years old.';
      if (age > 100) return 'Please check your date of birth.';
      return null;
    },
    gender: (v) => (!v ? 'Please select your gender.' : null),
    country: (v) => (!v ? 'Please select your country.' : null),
    state: (v) => (!v ? 'Please select your state/region.' : null),
    school: (v) => {
      if (!v.trim()) return 'School name is required.';
      if (v.trim().length < 2) return 'School name is too short.';
      return null;
    },
    educationLevel: (v) => (!v ? 'Please select your educational level.' : null),
    academicLevel: (v) => (!v ? 'Please select your academic level.' : null),
    password: (v) => {
      if (!v) return 'Password is required.';
      if (v.length < 8) return 'Password must be at least 8 characters.';
      if (!/[A-Z]/.test(v)) return 'Add at least one uppercase letter.';
      if (!/[a-z]/.test(v)) return 'Add at least one lowercase letter.';
      if (!/\d/.test(v)) return 'Add at least one number.';
      return null;
    },
    confirmPassword: (v) => {
      const pw = getField('password')?.value || '';
      if (!v) return 'Please confirm your password.';
      if (v !== pw) return 'Passwords do not match.';
      return null;
    },
    terms: () => {
      const t = document.getElementById('terms');
      return t && !t.checked ? 'You must accept the Terms to continue.' : null;
    }
  };

  /* ---------- Attach blur+input listeners ---------- */
  Object.keys(validators).forEach((name) => {
    const field = getField(name);
    if (!field) return;

    field.addEventListener('blur', () => {
      if (!field.value && name !== 'terms') return; // skip empty on blur
      const err = validators[name](field.value);
      if (err) showError(field, err);
      else showSuccess(field);
    });

    field.addEventListener('input', () => {
      if (field.classList.contains('is-invalid')) {
        const err = validators[name](field.value);
        if (!err) showSuccess(field);
      }
      if (name === 'password') {
        updatePasswordStrength(field.value);
        // Re-validate confirm password if it's already filled
        const cp = getField('confirmPassword');
        if (cp && cp.value) {
          const err = validators.confirmPassword(cp.value);
          if (err) showError(cp, err);
          else showSuccess(cp, 'Passwords match');
        }
      }
    });
  });

  /* ---------- Terms checkbox listener ---------- */
  const termsBox = document.getElementById('terms');
  if (termsBox) {
    termsBox.addEventListener('change', () => {
      const err = validators.terms();
      if (err) {
        // Use toast, don't visually pollute the checkbox area
      }
    });
  }

  /* ============================================================
     CAREER INTERESTS CHIPS
     ============================================================ */
  const chipsContainer = document.getElementById('interestChips');
  const interestCount = document.getElementById('interestCount');
  if (chipsContainer) {
    chipsContainer.addEventListener('click', (e) => {
      const chip = e.target.closest('.auth-chip');
      if (!chip) return;
      chip.classList.toggle('is-selected');
      updateInterestCount();
    });
  }
  const updateInterestCount = () => {
    if (!chipsContainer || !interestCount) return;
    const count = chipsContainer.querySelectorAll('.auth-chip.is-selected').length;
    interestCount.textContent = count;
  };

  /* ============================================================
     COUNTRY → STATE
     ============================================================ */
  const countrySelect = getField('country');
  const stateSelect = getField('state');

  if (countrySelect && stateSelect) {
    countrySelect.addEventListener('change', () => {
      const code = countrySelect.value;
      stateSelect.innerHTML = '';
      stateSelect.disabled = false;

      if (code === 'OTHER') {
        // Replace select with a text input for "other"
        const placeholderOption = new Option('Type your state/region below', '');
        placeholderOption.disabled = true;
        placeholderOption.selected = true;
        stateSelect.appendChild(placeholderOption);
        // Also allow the user to type
        stateSelect.outerHTML = `<input id="state" name="state" class="eg-input" type="text" placeholder="Enter your state or region" required />`;
        // Rebuild listener reference
        rebindStateInput();
        return;
      }

      const states = STATES[code] || [];
      const placeholderOption = new Option('Select state / region', '');
      placeholderOption.disabled = true;
      placeholderOption.selected = true;
      stateSelect.appendChild(placeholderOption);

      states.forEach((s) => stateSelect.appendChild(new Option(s, s)));

      // Reset state visual
      stateSelect.classList.remove('is-invalid', 'is-valid');
      clearState(stateSelect);
    });

    // Delegate change/blur to a function that works for both select and input
    const rebindStateInput = () => {
      const stateField = getField('state');
      if (!stateField) return;
      const handler = () => {
        const err = validators.state(stateField.value);
        if (err) showError(stateField, err);
        else showSuccess(stateField);
      };
      stateField.addEventListener('blur', handler);
      stateField.addEventListener('input', () => {
        if (stateField.classList.contains('is-invalid')) handler();
      });
    };
    rebindStateInput();
  }

  /* ============================================================
     EDUCATIONAL LEVEL → ACADEMIC LEVEL
     ============================================================ */
  const eduLevel = getField('educationLevel');
  const acadLevel = getField('academicLevel');

  if (eduLevel && acadLevel) {
    eduLevel.addEventListener('change', () => {
      const level = eduLevel.value;
      acadLevel.innerHTML = '';
      acadLevel.disabled = false;

      const placeholderOption = new Option('Select academic level', '');
      placeholderOption.disabled = true;
      placeholderOption.selected = true;
      acadLevel.appendChild(placeholderOption);

      const options = ACADEMIC_LEVELS[level] || [];
      options.forEach((o) => acadLevel.appendChild(new Option(o, o)));

      acadLevel.classList.remove('is-invalid', 'is-valid');
      clearState(acadLevel);

      // Add subtle emphasis animation
      acadLevel.animate(
        [{ boxShadow: '0 0 0 0 rgba(123,92,255,.4)' }, { boxShadow: '0 0 0 6px rgba(123,92,255,0)' }],
        { duration: 500, easing: 'ease-out' }
      );
    });
  }

  /* ============================================================
     PASSWORD STRENGTH + RULES
     ============================================================ */
  const passwordField = getField('password');
  const strengthMeter = document.getElementById('strengthMeter');
  const passwordRules = document.getElementById('passwordRules');
  const ruleEls = passwordRules ? passwordRules.querySelectorAll('[data-rule]') : [];

  const updatePasswordStrength = (value) => {
    const checks = {
      length: value.length >= 8,
      upper: /[A-Z]/.test(value),
      lower: /[a-z]/.test(value),
      number: /\d/.test(value)
    };

    // Update rules
    ruleEls.forEach((el) => {
      const key = el.dataset.rule;
      const ok = checks[key];
      el.classList.toggle('is-ok', ok);
      const icon = el.querySelector('i');
      if (icon) {
        icon.className = ok ? 'bi bi-check-circle-fill' : 'bi bi-circle';
      }
    });

    // Calculate level
    const score = Object.values(checks).filter(Boolean).length;
    let level = 0;
    if (value.length === 0) level = 0;
    else if (score <= 1) level = 1;
    else if (score === 2) level = 2;
    else if (score === 3) level = 3;
    else level = 4;

    // Bonus: length >= 12 bumps it
    if (value.length >= 12 && level < 4) level = Math.min(4, level + 1);

    if (strengthMeter) {
      if (level > 0) strengthMeter.setAttribute('data-level', level);
      else strengthMeter.removeAttribute('data-level');
    }
  };

  /* ============================================================
     PASSWORD VISIBILITY TOGGLE
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
     STEP VALIDATION (gates before advancing)
     ============================================================ */
  const validateStep = (stepNum) => {
    const step = form.querySelector(`.auth-step[data-step="${stepNum}"]`);
    if (!step) return true;

    let isValid = true;
    let firstInvalid = null;

    // Validate fields in this step
    step.querySelectorAll('input, select').forEach((field) => {
      const name = field.name;
      if (validators[name]) {
        const err = validators[name](field.value);
        if (err) {
          showError(field, err);
          isValid = false;
          if (!firstInvalid) firstInvalid = field;
        } else {
          showSuccess(field);
        }
      }
    });

    // Special: interest chips (Step 2)
    if (stepNum === 2 && chipsContainer) {
      const selected = chipsContainer.querySelectorAll('.auth-chip.is-selected').length;
      if (selected === 0) {
        const help = document.querySelector('[data-help-for="interests"]');
        if (help) {
          help.dataset.originalText = help.dataset.originalText || help.innerHTML;
          help.innerHTML = '<span class="is-error">Please pick at least one career interest.</span>';
        }
        isValid = false;
      }
    }

    // Special: terms (Step 3)
    if (stepNum === 3) {
      const t = document.getElementById('terms');
      if (t && !t.checked) {
        isValid = false;
        if (window.egToast) window.egToast('Please accept the Terms to continue.');
      }
    }

    if (!isValid && firstInvalid) {
      setTimeout(() => firstInvalid.focus(), 100);
    }

    return isValid;
  };

  /* ============================================================
     FORM SUBMIT
     ============================================================ */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate final step
    if (!validateStep(3)) return;

    // Simulate API call
    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;

    const submitText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="eg-spinner"></span> Creating account…';

    setTimeout(() => {
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
      submitBtn.innerHTML = submitText;

      // Show success modal
      const email = getField('email')?.value || 'your email';
      const successEmail = document.getElementById('successEmail');
      if (successEmail) successEmail.textContent = email;

      const modal = document.getElementById('successModal');
      if (modal) {
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    }, 1400);
  });

  /* ============================================================
     MODAL CLOSE HANDLING
     ============================================================ */
  document.querySelectorAll('[data-eg-modal-close]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.eg-modal');
      if (modal) {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.querySelector('.eg-modal.is-open');
      if (modal) {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    }
  });

  /* ============================================================
     INIT
     ============================================================ */
  updateInterestCount();

  // Set DOB max to today (no future dates)
  const dobField = getField('dob');
  if (dobField) dobField.max = new Date().toISOString().split('T')[0];
})();