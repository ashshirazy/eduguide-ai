/* ============================================================
   EduGuide AI — Settings (Phase 13)
   ============================================================ */
(() => {
  'use strict';

  const PREFS_KEY = 'eg_settings_v1';

  /* ---------- Load saved prefs ---------- */
  let prefs = {};
  try { prefs = JSON.parse(localStorage.getItem(PREFS_KEY) || '{}'); } catch (_) {}

  const persist = () => {
    try { localStorage.setItem(PREFS_KEY, JSON.stringify(prefs)); } catch (_) {}
  };

  /* ---------- Toggle handlers ---------- */
  const applyState = () => {
    /* Notifications */
    document.querySelectorAll('[data-notif]').forEach((input) => {
      const key = 'notif_' + input.dataset.notif;
      if (prefs[key] !== undefined) input.checked = prefs[key];
      input.addEventListener('change', () => {
        prefs[key] = input.checked;
        persist();
        if (window.egToast) window.egToast(input.checked ? 'Preference saved ✅' : 'Preference updated');
      });
    });

    /* Privacy */
    document.querySelectorAll('[data-privacy]').forEach((input) => {
      const key = 'privacy_' + input.dataset.privacy;
      if (prefs[key] !== undefined) input.checked = prefs[key];
      input.addEventListener('change', () => {
        prefs[key] = input.checked;
        persist();
        if (window.egToast) window.egToast(input.checked ? 'Preference saved ✅' : 'Preference updated');
      });
    });

    /* Security */
    document.querySelectorAll('[data-security]').forEach((input) => {
      const key = 'security_' + input.dataset.security;
      if (prefs[key] !== undefined) input.checked = prefs[key];
      input.addEventListener('change', () => {
        prefs[key] = input.checked;
        persist();
        if (input.dataset.security === '2fa') {
          if (window.egToast) {
            window.egToast(input.checked
              ? 'Two-factor authentication enabled 🔐'
              : 'Two-factor authentication disabled');
          }
        }
      });
    });

    /* Selects */
    document.querySelectorAll('[data-pref]').forEach((select) => {
      const key = 'pref_' + select.dataset.pref;
      if (prefs[key] !== undefined) select.value = prefs[key];
      select.addEventListener('change', () => {
        prefs[key] = select.value;
        persist();
        if (window.egToast) window.egToast('Preference saved ✅');
      });
    });

    /* Theme buttons */
    const themeKey = 'pref_theme';
    const savedTheme = prefs[themeKey] || 'light';
    document.querySelectorAll('[data-theme]').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.theme === savedTheme);
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-theme]').forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        prefs[themeKey] = btn.dataset.theme;
        persist();
        if (window.egToast) {
          window.egToast(`Appearance: ${btn.dataset.theme === 'system' ? 'System' : btn.dataset.theme.charAt(0).toUpperCase() + btn.dataset.theme.slice(1)}`);
        }
      });
    });
  };

  applyState();

  /* ---------- Delete account flow ---------- */
  const deleteBtn = document.getElementById('deleteAccountBtn');
  const deleteModal = document.getElementById('deleteModal');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

  const openDelete = () => {
    if (!deleteModal) return;
    deleteModal.classList.add('is-open');
    deleteModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const closeDelete = () => {
    if (!deleteModal) return;
    deleteModal.classList.remove('is-open');
    deleteModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  deleteBtn?.addEventListener('click', openDelete);
  document.querySelectorAll('[data-eg-modal-close]').forEach((el) => {
    el.addEventListener('click', closeDelete);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && deleteModal?.classList.contains('is-open')) closeDelete();
  });

  confirmDeleteBtn?.addEventListener('click', () => {
    confirmDeleteBtn.classList.add('is-loading');
    confirmDeleteBtn.disabled = true;
    const original = confirmDeleteBtn.innerHTML;
    confirmDeleteBtn.innerHTML = '<span class="eg-spinner"></span> Deleting…';

    setTimeout(() => {
      /* Clear user data (demo behaviour) */
      try {
        localStorage.removeItem('eg_saved_careers_v1');
        localStorage.removeItem('eg_roadmap_software-engineer_v1');
        localStorage.removeItem('eg_saved_resources_v1');
        localStorage.removeItem('eg_assessment_v1');
        localStorage.removeItem('eg_remember_email');
        localStorage.removeItem(PREFS_KEY);
      } catch (_) {}

      if (window.egToast) window.egToast('Account deleted. Redirecting…');
      setTimeout(() => { window.location.href = 'index.html'; }, 1200);
    }, 1400);
  });
})();