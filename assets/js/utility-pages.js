/* ============================================================
   EduGuide AI — Page Utilities (optional, additive)
   Exposes window.egPage with reusable page-level helpers.
   Auto-runs only the SAFE subset that can't conflict with
   individual page scripts.
   ============================================================ */
(() => {
  'use strict';

  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.egPage = {

    /* ---------- Reveal on scroll ---------- */
    initReveal(options = {}) {
      const { selector = '.reveal', threshold = 0.1, rootMargin = '0px 0px -40px 0px' } = options;
      const els = document.querySelectorAll(selector);
      if (els.length === 0) return;

      if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        els.forEach((el) => el.classList.add('is-visible'));
        return;
      }

      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const delay = parseInt(entry.target.dataset.delay || '0', 10);
          setTimeout(() => entry.target.classList.add('is-visible'), delay * 100);
          io.unobserve(entry.target);
        });
      }, { threshold, rootMargin });

      els.forEach((el) => {
        if (el.dataset.egRevealBound === '1' || el.classList.contains('is-visible')) return;
        el.dataset.egRevealBound = '1';
        io.observe(el);
      });
    },

    /* ---------- Animated counters ---------- */
    initCounters() {
      const counters = document.querySelectorAll('[data-count]');
      if (counters.length === 0) return;

      const ease = (t) => 1 - Math.pow(1 - t, 3);
      const format = (n) => n >= 1000 ? n.toLocaleString('en-US') : String(n);

      const animate = (el) => {
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
          const v = Math.round(target * ease(p));
          el.textContent = format(v) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      };

      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            if (el.dataset.egCountBound === '1') return;
            el.dataset.egCountBound = '1';
            animate(el);
            io.unobserve(el);
          });
        }, { threshold: 0.4 });
        counters.forEach((el) => io.observe(el));
      } else {
        counters.forEach(animate);
      }
    },

    /* ---------- Progress bars ---------- */
    initProgressBars() {
      const bars = document.querySelectorAll('.eg-progress__bar[data-progress]');
      if (bars.length === 0) return;

      if (!('IntersectionObserver' in window) || prefersReducedMotion) {
        bars.forEach((b) => { b.style.width = b.dataset.progress + '%'; });
        return;
      }

      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const bar = entry.target;
          if (bar.dataset.egBarBound === '1') return;
          bar.dataset.egBarBound = '1';
          bar.style.transition = 'width 1.2s cubic-bezier(.22,1,.36,1)';
          bar.style.width = bar.dataset.progress + '%';
          io.unobserve(bar);
        });
      }, { threshold: 0.3 });

      bars.forEach((b) => {
        if (b.dataset.egBarBound === '1') return;
        b.style.width = '0%';
        io.observe(b);
      });
    },

    /* ---------- Back to top ---------- */
    initBackToTop() {
      const btn = document.querySelector('.eg-back-to-top');
      if (!btn || btn.dataset.egBttBound === '1') return;
      btn.dataset.egBttBound = '1';

      const toggle = () => btn.classList.toggle('is-visible', window.scrollY > 600);
      toggle();
      window.addEventListener('scroll', toggle, { passive: true });
      btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      });
    },

    /* ---------- Sticky navbar ---------- */
    initStickyNav() {
      const nav = document.getElementById('egNavbar') || document.querySelector('.eg-navbar');
      if (!nav || nav.dataset.egStickyBound === '1') return;
      nav.dataset.egStickyBound = '1';

      const toggle = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
      toggle();
      window.addEventListener('scroll', toggle, { passive: true });
    },

    /* ---------- Active nav highlighting ---------- */
    initActiveNav() {
      const links = document.querySelectorAll('.eg-navbar__links a[href^="#"]');
      if (links.length === 0) return;

      const map = new Map();
      links.forEach((link) => {
        const id = link.getAttribute('href');
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (target) map.set(target, link);
      });
      if (map.size === 0) return;

      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const active = map.get(entry.target);
            if (!active) return;
            links.forEach((l) => l.classList.remove('is-active'));
            active.classList.add('is-active');
          });
        }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
        map.forEach((_, el) => io.observe(el));
      }
    },

    /* ---------- Smooth anchor scroll ---------- */
    initSmoothAnchor() {
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        if (a.dataset.egSmoothBound === '1') return;
        a.dataset.egSmoothBound = '1';
        a.addEventListener('click', (e) => {
          const id = a.getAttribute('href');
          if (!id || id.length < 2) return;
          const target = document.querySelector(id);
          if (!target) return;
          e.preventDefault();
          const nav = document.querySelector('.eg-navbar, .dash-topbar');
          const offset = nav ? nav.offsetHeight + 8 : 8;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });
      });
    },

    /* ---------- Auto-init (safe subset only) ---------- */
    autoInit() {
      this.initBackToTop();
      this.initStickyNav();
      this.initSmoothAnchor();
      this.initActiveNav();
    }
  };

  const start = () => {
    if (window.egPageSkipAutoInit === true) return;
    window.egPage.autoInit();
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();