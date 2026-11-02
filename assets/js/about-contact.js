/* ============================================================
   EduGuide AI — About & Contact (Phase 12)
   Depends on app.js (egToast) + components.js + landing.js
   ============================================================ */
(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     REVEAL ON SCROLL
     ============================================================ */
  const reveals = document.querySelectorAll('.reveal');
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
     ANIMATED COUNTERS (hero stats)
     ============================================================ */
  const counters = document.querySelectorAll('[data-count]');
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const format = (n) => n >= 1000 ? n.toLocaleString('en-US') : String(n);

  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count || '0');
    const suffix = el.dataset.suffix || '';
    if (prefersReducedMotion) {
      el.textContent = format(target) + suffix;
      return;
    }
    const dur = 1600;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const v = Math.round(target * easeOutCubic(p));
      el.textContent = format(v) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach((el) => io.observe(el));
  } else {
    counters.forEach(animateCount);
  }

  /* ============================================================
     CONTACT FORM
     ============================================================ */
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = form.querySelector('[name="name"]');
  const emailInput = form.querySelector('[name="email"]');
  const subjectInput = form.querySelector('[name="subject"]');
  const messageInput = form.querySelector('[name="message"]');
  const consentInput = document.getElementById('contactConsent');
  const submitBtn = document.getElementById('contactSubmitBtn');
  const successView = document.getElementById('contactSuccess');
  const successEmail = document.getElementById('contactSuccessEmail');
  const sendAnotherBtn = document.getElementById('sendAnotherBtn');
  const charCount = document.getElementById('charCount');

  /* ---------- Char counter ---------- */
  if (messageInput && charCount) {
    const update = () => {
      charCount.textContent = messageInput.value.length;
    };
    messageInput.addEventListener('input', update);
    update();
  }

  /* ---------- Helpers ---------- */
  const validators = {
    name: (v) => {
      if (!v.trim()) return 'Please enter your name.';
      if (v.trim().length < 2) return 'Name is too short.';
      return null;
    },
    email: (v) => {
      if (!v.trim()) return 'Please enter your email.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return 'Enter a valid email.';
      return null;
    },
    subject: (v) => (!v ? 'Please choose a subject.' : null),
    message: (v) => {
      if (!v.trim()) return 'Please write a message.';
      if (v.trim().length < 10) return 'Message must be at least 10 characters.';
      return null;
    },
    consent: (checked) => (!checked ? 'Please agree to be contacted.' : null)
  };

  const showError = (field, msg) => {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    // Optional: attach help text below field
    let help = field.parentElement.parentElement.querySelector('.ac-field-error');
    if (!help) {
      help = document.createElement('span');
      help.className = 'eg-help eg-help--danger ac-field-error';
      help.style.color = '#DC2626';
      help.style.marginTop = '6px';
      help.style.display = 'block';
      field.parentElement.parentElement.appendChild(help);
    }
    help.textContent = msg;
  };

  const clearError = (field) => {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    const help = field.parentElement.parentElement.querySelector('.ac-field-error');
    if (help) help.remove();
  };

  const clearState = (field) => {
    field.classList.remove('is-valid', 'is-invalid');
    const help = field.parentElement.parentElement.querySelector('.ac-field-error');
    if (help) help.remove();
  };

  /* ---------- Live validation ---------- */
  [nameInput, emailInput, messageInput].forEach((input) => {
    if (!input) return;
    input.addEventListener('blur', () => {
      if (!input.value) return;
      const key = input.name;
      const err = validators[key](input.value);
      if (err) showError(input, err);
      else clearError(input);
    });
    input.addEventListener('input', () => {
      if (input.classList.contains('is-invalid')) clearState(input);
    });
  });

  subjectInput?.addEventListener('change', () => {
    if (subjectInput.value) clearError(subjectInput);
  });

  /* ---------- Submit ---------- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    let firstInvalid = null;

    const checks = [
      { field: nameInput, key: 'name', value: nameInput.value },
      { field: emailInput, key: 'email', value: emailInput.value },
      { field: subjectInput, key: 'subject', value: subjectInput.value },
      { field: messageInput, key: 'message', value: messageInput.value }
    ];

    checks.forEach(({ field, key, value }) => {
      const err = validators[key](value);
      if (err) {
        showError(field, err);
        valid = false;
        if (!firstInvalid) firstInvalid = field;
      } else {
        clearError(field);
      }
    });

    const consentErr = validators.consent(consentInput.checked);
    if (consentErr) {
      valid = false;
      if (window.egToast) window.egToast(consentErr);
    }

    if (!valid) {
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    /* ---------- Simulated submit ---------- */
    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;
    const original = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="eg-spinner"></span> Sending…';

    setTimeout(() => {
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
      submitBtn.innerHTML = original;

      /* Swap form → success */
      form.hidden = true;
      if (successView) {
        successView.hidden = false;
        if (successEmail) successEmail.textContent = emailInput.value.trim();
        const heading = successView.querySelector('.ac-form-success__title');
        if (heading) {
          heading.setAttribute('tabindex', '-1');
          heading.focus({ preventScroll: true });
        }
        successView.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'center'
        });
      }

      if (window.egToast) window.egToast('Message sent successfully ✅');
    }, 1400);
  });

  /* ---------- Send another ---------- */
  sendAnotherBtn?.addEventListener('click', () => {
    form.reset();
    form.hidden = false;
    if (successView) successView.hidden = true;
    form.querySelectorAll('.eg-input, .eg-textarea, .eg-select').forEach((f) => {
      f.classList.remove('is-valid', 'is-invalid');
    });
    form.querySelectorAll('.ac-field-error').forEach((el) => el.remove());
    if (charCount) charCount.textContent = '0';
    nameInput?.focus();
  });
})();