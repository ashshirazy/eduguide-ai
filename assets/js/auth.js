/* ============================================================
   EduGuide AI — Auth Helpers (optional, additive)
   Exposes window.egAuth with reusable utilities.
   Page scripts (register.js, login.js, forgot-password.js)
   work independently — this file just provides shared helpers
   they MAY call.
   ============================================================ */
(() => {
  'use strict';

  window.egAuth = {

    /* ---------- Validation ---------- */
    validateEmail(value) {
      if (!value || !value.trim()) return 'Email address is required.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())) return 'Enter a valid email address.';
      return null;
    },

    validatePassword(value, minLength = 8) {
      if (!value) return 'Password is required.';
      if (value.length < minLength) return `Password must be at least ${minLength} characters.`;
      return null;
    },

    validateName(value) {
      if (!value || !value.trim()) return 'Name is required.';
      if (value.trim().length < 2) return 'Name must be at least 2 characters.';
      if (!/^[a-zA-Z\s'.\-]+$/.test(value)) return 'Name contains invalid characters.';
      return null;
    },

    validatePhone(value) {
      if (!value || !value.trim()) return 'Phone number is required.';
      const digits = value.replace(/[^\d]/g, '');
      if (digits.length < 8) return 'Enter a valid phone number.';
      if (digits.length > 15) return 'Phone number is too long.';
      return null;
    },

    /* ---------- Password strength ---------- */
    passwordStrength(value) {
      const checks = {
        length: value.length >= 8,
        upper: /[A-Z]/.test(value),
        lower: /[a-z]/.test(value),
        number: /\d/.test(value),
        symbol: /[^A-Za-z0-9]/.test(value)
      };
      const score = Object.values(checks).filter(Boolean).length;
      let level = 0;
      if (value.length === 0) level = 0;
      else if (score <= 1) level = 1;
      else if (score === 2) level = 2;
      else if (score === 3) level = 3;
      else level = 4;
      if (value.length >= 12 && level < 4) level = Math.min(4, level + 1);
      return { score, level, checks };
    },

    applyStrength(meterEl, rulesEl, value) {
      const { level, checks } = this.passwordStrength(value);
      if (meterEl) {
        if (level > 0) meterEl.setAttribute('data-level', level);
        else meterEl.removeAttribute('data-level');
      }
      if (rulesEl) {
        Object.keys(checks).forEach((key) => {
          const rule = rulesEl.querySelector(`[data-rule="${key}"]`);
          if (!rule) return;
          rule.classList.toggle('is-ok', checks[key]);
          const icon = rule.querySelector('i');
          if (icon) icon.className = checks[key] ? 'bi bi-check-circle-fill' : 'bi bi-circle';
        });
      }
    },

    /* ---------- Password visibility (manual call only) ---------- */
    togglePassword(btn) {
      if (!btn || btn.dataset.egPwdBound === '1') return;
      btn.dataset.egPwdBound = '1';
      btn.addEventListener('click', () => {
        const input = btn.parentElement.querySelector('input');
        if (!input) return;
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        btn.innerHTML = `<i class="bi bi-eye${isPassword ? '-slash' : ''}"></i>`;
        btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
      });
    },

    /* ---------- Cascading dropdowns ---------- */
    setupCascade(sourceSelect, targetSelect, options, placeholder = 'Select option') {
      if (!sourceSelect || !targetSelect) return;
      const bind = () => {
        const key = sourceSelect.value;
        const list = options[key] || [];
        targetSelect.innerHTML = '';
        const ph = new Option(placeholder, '');
        ph.disabled = true;
        ph.selected = true;
        targetSelect.appendChild(ph);
        list.forEach((item) => targetSelect.appendChild(new Option(item, item)));
      };
      sourceSelect.addEventListener('change', bind);
      if (sourceSelect.value) bind();
    },

    /* ---------- Field state UI ---------- */
    showFieldError(field, msg) {
      if (!field) return;
      field.classList.add('is-invalid');
      field.classList.remove('is-valid');
      const help = document.querySelector(`[data-help-for="${field.name}"]`);
      if (help) {
        help.dataset.egOriginal = help.dataset.egOriginal || help.textContent;
        help.textContent = msg;
        help.classList.add('is-error');
        help.classList.remove('is-success');
      }
    },

    showFieldSuccess(field) {
      if (!field) return;
      field.classList.add('is-valid');
      field.classList.remove('is-invalid');
      const help = document.querySelector(`[data-help-for="${field.name}"]`);
      if (help && help.dataset.egOriginal) {
        help.textContent = help.dataset.egOriginal;
        help.classList.remove('is-error');
      }
    },

    clearFieldState(field) {
      if (!field) return;
      field.classList.remove('is-valid', 'is-invalid');
      const help = document.querySelector(`[data-help-for="${field.name}"]`);
      if (help && help.dataset.egOriginal) {
        help.textContent = help.dataset.egOriginal;
        help.classList.remove('is-error', 'is-success');
      }
    },

    /* ---------- Redirect with toast ---------- */
    redirect(url, delay = 500) {
      if (window.egToast) window.egToast('Redirecting…', { icon: 'bi-arrow-right-circle-fill' });
      setTimeout(() => { window.location.href = url; }, delay);
    }
  };
})();