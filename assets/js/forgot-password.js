/* ============================================================
   EduGuide AI — Forgot Password (Phase 4)
   Depends on app.js (shared utilities)
   ============================================================ */
(() => {
  'use strict';

  const form = document.getElementById('forgotForm');
  if (!form) return;

  const email = document.getElementById('email');
  const submitBtn = document.getElementById('submitBtn');
  const formView = document.getElementById('forgotFormView');
  const successView = document.getElementById('forgotSuccessView');
  const successEmail = document.getElementById('successEmail');
  const resendLink = document.getElementById('resendLink');

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

  /* ---------- Field listeners ---------- */
  if (email) {
    email.addEventListener('blur', () => {
      if (!email.value) return;
      const err = validateEmail(email.value);
      if (err) showError(email, err);
    });
    email.addEventListener('input', () => {
      if (email.classList.contains('is-invalid')) clearState(email);
    });
  }

  /* ---------- Submit ---------- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const err = validateEmail(email.value);
    if (err) {
      showError(email, err);
      email.focus();
      return;
    }

    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;
    const original = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="eg-spinner"></span> Sending reset link…';

    setTimeout(() => {
      /* Swap views */
      if (formView) formView.style.display = 'none';
      if (successView) successView.style.display = 'block';
      if (successEmail) successEmail.textContent = email.value.trim();

      /* Reset submit button */
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
      submitBtn.innerHTML = original;

      /* Focus heading for screen readers */
      const heading = successView?.querySelector('.auth-success__title');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
      }

      if (window.egToast) window.egToast('Reset link sent ✅');
    }, 1400);
  });

  /* ---------- Resend ---------- */
  if (resendLink) {
    resendLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.egToast) window.egToast('Reset link re-sent. Please check your inbox.');
    });
  }
})();