/* ============================================================
   EduGuide AI — Shared Utilities (Phase 1)
   Loaded on every page BEFORE other scripts.
   ============================================================ */
(() => {
  'use strict';

  /* ============================================================
     TOAST — window.egToast(message, opts)
     ============================================================ */
  window.egToast = function egToast(message, opts = {}) {
    const container =
      document.getElementById('egToasts') ||
      document.querySelector('.eg-toasts');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'eg-toast';
    toast.setAttribute('role', 'status');
    const icon = opts.icon || 'bi-check-circle-fill';
    toast.innerHTML = `<i class="bi ${icon}"></i><span>${message}</span>`;
    container.appendChild(toast);

    const remove = () => {
      toast.classList.add('is-leaving');
      setTimeout(() => toast.remove(), 200);
    };
    const timeout = setTimeout(remove, opts.duration || 3200);
    toast.addEventListener('click', () => {
      clearTimeout(timeout);
      remove();
    });
  };

  /* ============================================================
     DEBOUNCE — window.egDebounce(fn, wait)
     ============================================================ */
  window.egDebounce = function (fn, wait = 200) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  };

  /* ============================================================
     THROTTLE — window.egThrottle(fn, wait)
     ============================================================ */
  window.egThrottle = function (fn, wait = 200) {
    let last = 0;
    return (...args) => {
      const now = Date.now();
      if (now - last >= wait) {
        last = now;
        fn(...args);
      }
    };
  };

  /* ============================================================
     FORMAT DATE — window.egFormatDate(iso, style)
     ============================================================ */
  window.egFormatDate = function (iso, style = 'short') {
    if (!iso) return '';
    const d = iso instanceof Date ? iso : new Date(iso);
    if (isNaN(d)) return '';
    if (style === 'long') {
      return d.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric'
      });
    }
    return d.toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  };

  /* ============================================================
     SAFE LOCALSTORAGE HELPERS — window.egStore
     ============================================================ */
  window.egStore = {
    get(key, fallback = null) {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch (_) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {}
    },
    remove(key) {
      try { localStorage.removeItem(key); } catch (_) {}
    }
  };

  /* ============================================================
     PREFERS REDUCED MOTION
     ============================================================ */
  window.egPrefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     GLOBAL ESC — closes open dropdowns safely
     ============================================================ */
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.eg-dropdown.is-open').forEach((dd) => {
      dd.classList.remove('is-open');
    });
  });

  /* ============================================================
     POPULATE [data-eg-toast] — auto-toast on click
     ============================================================ */
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-eg-toast]');
    if (!trigger) return;
    const msg = trigger.getAttribute('data-eg-toast');
    if (msg) window.egToast(msg);
  });
})();