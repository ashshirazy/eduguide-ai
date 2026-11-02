/* ============================================================
   EduGuide AI — Overview Dashboard (Phase 5 only)
   Depends on dashboard-shell.js
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
     COUNTERS
     ============================================================ */
  const counters = document.querySelectorAll('[data-count]');
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count || '0');
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();

    if (prefersReducedMotion) {
      el.textContent = target + suffix;
      return;
    }

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const value = Math.round(target * easeOutCubic(p));
      el.textContent = value + suffix;
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
     DONUT CHART
     ============================================================ */
  const donutBar = document.querySelector('.dash-donut__bar');
  if (donutBar) {
    const target = parseFloat(donutBar.dataset.target || '0');
    const r = 48;
    const circumference = 2 * Math.PI * r; // ~301.59
    donutBar.setAttribute('stroke-dasharray', circumference);
    donutBar.setAttribute('stroke-dashoffset', circumference);

    const animateDonut = () => {
      const offset = circumference * (1 - target / 100);
      if (prefersReducedMotion) {
        donutBar.setAttribute('stroke-dashoffset', offset);
        return;
      }
      requestAnimationFrame(() => {
        donutBar.setAttribute('stroke-dashoffset', offset);
      });
    };

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateDonut();
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      io.observe(donutBar);
    } else {
      animateDonut();
    }
  }

  /* ============================================================
     PROGRESS BARS (reco + roadmap + stats)
     ============================================================ */
  const bars = document.querySelectorAll(
    '.dash-stat__bar span, .dash-roadmap__bar span, .dash-reco__bar span'
  );
  bars.forEach((bar) => {
    const w = bar.style.width;
    bar.style.width = '0%';
    // Reapply on intersection
  });

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const bar = entry.target;
        // Restore original width
        const final = bar.dataset.width || bar.style.width || '0%';
        if (!bar.dataset.width) bar.dataset.width = final;
        bar.style.width = bar.dataset.width;
        io.unobserve(bar);
      });
    }, { threshold: 0.2 });
    bars.forEach((b) => {
      if (!b.dataset.width) b.dataset.width = b.style.width;
      b.style.width = '0%';
      io.observe(b);
    });
  }

  /* ============================================================
     SAVE CAREER BUTTONS
     ============================================================ */
  document.querySelectorAll('.dash-reco__save').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const icon = btn.querySelector('i');
      if (!icon) return;
      const isSaved = icon.classList.contains('bi-bookmark-fill');
      if (isSaved) {
        icon.classList.remove('bi-bookmark-fill');
        icon.classList.add('bi-bookmark');
        if (window.egToast) window.egToast('Removed from saved careers');
      } else {
        icon.classList.remove('bi-bookmark');
        icon.classList.add('bi-bookmark-fill');
        if (window.egToast) window.egToast('Saved to your careers ❤️');
      }
    });
  });
})();