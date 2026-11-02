/* ============================================================
   EduGuide AI — Component Interactions (Phase 1)
   Dropdowns · Tabs · Accordions · Modals · Tooltips · Ripple
   ============================================================ */
(() => {
  'use strict';

  /* ============================================================
     DROPDOWNS
     ============================================================ */
  const dropdowns = document.querySelectorAll(
    '[data-eg-dropdown], [data-eg-dd]'
  );

  const closeAllDropdowns = (except) => {
    dropdowns.forEach((dd) => {
      if (dd === except) return;
      dd.classList.remove('is-open');
    });
  };

  dropdowns.forEach((dd) => {
    const toggle = dd.querySelector(
      '[data-eg-dropdown-toggle], [data-eg-dd-toggle]'
    );
    if (!toggle) return;

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = dd.classList.contains('is-open');
      closeAllDropdowns(dd);
      dd.classList.toggle('is-open', !isOpen);
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-eg-dropdown], [data-eg-dd]')) {
      closeAllDropdowns();
    }
  });

  /* ============================================================
     TABS — [data-eg-tabs] [data-eg-tab] [data-eg-panel]
     ============================================================ */
  document.querySelectorAll('[data-eg-tabs]').forEach((tabsRoot) => {
    const triggers = tabsRoot.querySelectorAll('[data-eg-tab]');
    const panels = tabsRoot.parentElement.querySelectorAll('[data-eg-panel]');

    triggers.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-eg-tab');
        triggers.forEach((b) => b.classList.toggle('is-active', b === btn));
        panels.forEach((p) => {
          p.classList.toggle('is-active', p.getAttribute('data-eg-panel') === id);
        });
      });
    });
  });

  /* ============================================================
     ACCORDION — [data-eg-accordion]
     ============================================================ */
  document.querySelectorAll('[data-eg-accordion]').forEach((acc) => {
    acc.querySelectorAll('.eg-accordion__head').forEach((head) => {
      head.addEventListener('click', () => {
        const item = head.closest('.eg-accordion__item');
        const wasOpen = item.classList.contains('is-open');
        acc.querySelectorAll('.eg-accordion__item').forEach((i) => {
          i.classList.remove('is-open');
        });
        if (!wasOpen) item.classList.add('is-open');
      });
    });
  });

  /* ============================================================
     MODAL OPEN — [data-eg-modal="id"]
     ============================================================ */
  document.querySelectorAll('[data-eg-modal]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const id = trigger.getAttribute('data-eg-modal');
      const modal = document.getElementById(id);
      if (!modal) return;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  /* ============================================================
     MODAL CLOSE — [data-eg-modal-close]
     ============================================================ */
  document.querySelectorAll('[data-eg-modal-close]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.eg-modal');
      if (!modal) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });

  /* ============================================================
     ESC closes any open modal
     ============================================================ */
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.eg-modal.is-open').forEach((modal) => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    });
    document.body.style.overflow = '';
  });

  /* ============================================================
     PASSWORD TOGGLES — [data-toggle-password]
     (Safely deduped via btn.dataset.boundPwd)
     ============================================================ */
  document.querySelectorAll('[data-toggle-password]').forEach((btn) => {
    if (btn.dataset.boundPwd === '1') return;
    btn.dataset.boundPwd = '1';
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
     RIPPLE EFFECT on buttons
     ============================================================ */
  document.querySelectorAll('.eg-btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      if (window.egPrefersReducedMotion) return;
      if (btn.disabled || btn.classList.contains('is-loading')) return;

      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement('span');
      ripple.className = 'eg-ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });
})();