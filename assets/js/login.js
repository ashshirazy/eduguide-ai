/* ============================================================
   EduGuide AI — Login (Phase 4)
   Depends on app.js (shared utilities)
   ============================================================ */
(() => {
  'use strict';

  const form = document.getElementById('loginForm');
  if (!form) return;

  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const submitBtn = document.getElementById('submitBtn');
  const remember = document.getElementById('remember');

  /* ---------- Password visibility ---------- */
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

  /* ---------- Validation helpers ---------- */
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

  const showSuccess = (field) => {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    const help = document.querySelector(`[data-help-for="${field.name}"]`);
    if (help) {
      if (!help.dataset.originalText) help.dataset.originalText = help.textContent;
      help.textContent = help.dataset.originalText;
      help.classList.remove('is-error');
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

  const validateEmail = (v) => {
    if (!v.trim()) return 'Email address is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return 'Enter a valid email address.';
    return null;
  };

  const validatePassword = (v) => {
    if (!v) return 'Password is required.';
    if (v.length < 8) return 'Password must be at least 8 characters.';
    return null;
  };

  /* ---------- Field listeners ---------- */
  [email, password].forEach((field) => {
    if (!field) return;
    field.addEventListener('blur', () => {
      if (!field.value) return;
      const err = field === email ? validateEmail(field.value) : validatePassword(field.value);
      if (err) showError(field, err);
      else showSuccess(field);
    });
    field.addEventListener('input', () => {
      if (field.classList.contains('is-invalid')) clearState(field);
    });
  });

  /* ---------- Pre-fill remembered email ---------- */
  try {
    const stored = localStorage.getItem('eg_remember_email');
    if (stored && email) {
      email.value = stored;
      if (remember) remember.checked = true;
      showSuccess(email);
    }
  } catch (_) { /* localStorage may be disabled */ }

  /* ---------- Submit ---------- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    let firstInvalid = null;

    const emailErr = validateEmail(email.value);
    if (emailErr) {
      showError(email, emailErr);
      isValid = false;
      if (!firstInvalid) firstInvalid = email;
    } else {
      showSuccess(email);
    }

    const pwErr = validatePassword(password.value);
    if (pwErr) {
      showError(password, pwErr);
      isValid = false;
      if (!firstInvalid) firstInvalid = password;
    } else {
      showSuccess(password);
    }

    if (!isValid) {
      if (firstInvalid) firstInvalid.focus();
      if (window.egToast) window.egToast('Please fix the highlighted fields.');
      return;
    }

    /* Simulate sign-in */
    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;
    const original = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="eg-spinner"></span> Signing you in…';

    /* Remember me */
    try {
      if (remember && remember.checked) {
        localStorage.setItem('eg_remember_email', email.value.trim());
      } else {
        localStorage.removeItem('eg_remember_email');
      }
    } catch (_) { /* ignore */ }

    setTimeout(() => {
      if (window.egToast) window.egToast('Signed in successfully 🎉');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 700);
    }, 1400);
  });
})();