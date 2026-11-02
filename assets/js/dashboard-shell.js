/* ============================================================
   EduGuide AI — Dashboard Shell (Phase 5)
   Shared across all authenticated pages (Phases 5–11)
   ============================================================ */
(() => {
  'use strict';

  /* ---------- MOBILE SIDEBAR ---------- */
  const sidebar = document.getElementById('dashSidebar');
  const toggle = document.getElementById('sidebarToggle');
  const closeBtn = document.getElementById('sidebarClose');
  const backdrop = document.getElementById('sidebarBackdrop');

  const openSidebar = () => {
    if (!sidebar) return;
    sidebar.classList.add('is-open');
    if (backdrop) {
      backdrop.classList.add('is-visible');
      backdrop.setAttribute('aria-hidden', 'false');
    }
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeSidebar = () => {
    if (!sidebar) return;
    sidebar.classList.remove('is-open');
    if (backdrop) {
      backdrop.classList.remove('is-visible');
      backdrop.setAttribute('aria-hidden', 'true');
    }
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (toggle) toggle.addEventListener('click', openSidebar);
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  if (backdrop) backdrop.addEventListener('click', closeSidebar);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
  });

  /* ---------- DROPDOWNS ---------- */
  const dropdowns = document.querySelectorAll('[data-eg-dd]');

  const closeAllDropdowns = () => {
    dropdowns.forEach((dd) => dd.classList.remove('is-open'));
  };

  dropdowns.forEach((dd) => {
    const btn = dd.querySelector('[data-eg-dd-toggle]');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dd.classList.contains('is-open');
      closeAllDropdowns();
      if (!isOpen) dd.classList.add('is-open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-eg-dd]')) closeAllDropdowns();
  });

  /* ---------- SEARCH SHORTCUT (⌘K / Ctrl+K) ---------- */
  const search = document.getElementById('topSearch');
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (search) search.focus();
    }
  });

  /* ---------- TIME-BASED GREETING ---------- */
  const greeting = document.getElementById('greeting');
  if (greeting) {
    const name = 'Amara';
    const hour = new Date().getHours();
    let salutation = 'Good morning';
    if (hour >= 12 && hour < 17) salutation = 'Good afternoon';
    else if (hour >= 17 || hour < 5) salutation = 'Good evening';
    greeting.textContent = `${salutation}, ${name} 👋`;
  }
})();