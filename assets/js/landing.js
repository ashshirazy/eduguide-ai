/* ============================================================
   EduGuide AI — Landing Page Interactions (Phase 2)
   Depends on app.js (shared utilities)
   ============================================================ */
(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- NAVBAR: scroll + mobile menu ---------- */
  const navbar = document.getElementById('egNavbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  const updateNavbar = () => {
    if (!navbar) return;
    navbar.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  updateNavbar();
  window.addEventListener('scroll', updateNavbar, { passive: true });

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || '0', 10);
        setTimeout(() => el.classList.add('is-visible'), delay * 100);
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- ANIMATED COUNTERS ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count || '0');
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();

    if (prefersReducedMotion) {
      el.textContent = format(target) + suffix;
      return;
    }

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.round(target * easeOutCubic(progress));
      el.textContent = format(value) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const format = (n) => {
    if (n >= 1000) return n.toLocaleString('en-US');
    return String(n);
  };

  if ('IntersectionObserver' in window) {
    const counterIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          counterIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach((el) => counterIO.observe(el));
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- PROGRESS BARS (data-progress) ---------- */
  const bars = document.querySelectorAll('.eg-progress__bar[data-progress]');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const barIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const bar = entry.target;
        bar.style.width = bar.dataset.progress + '%';
        barIO.unobserve(bar);
      });
    }, { threshold: 0.3 });
    bars.forEach((b) => {
      b.style.width = '0%';
      b.style.transition = 'width 1.2s cubic-bezier(.22,1,.36,1)';
      barIO.observe(b);
    });
  } else {
    bars.forEach((b) => { b.style.width = b.dataset.progress + '%'; });
  }

  /* ---------- FAQ ACCORDION ---------- */
  document.querySelectorAll('[data-eg-faq]').forEach((faq) => {
    faq.querySelectorAll('.eg-faq__question').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.eg-faq__item');
        const isOpen = item.classList.contains('is-open');

        // Close siblings
        faq.querySelectorAll('.eg-faq__item').forEach((sib) => {
          sib.classList.remove('is-open');
          sib.querySelector('.eg-faq__question').setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });

  /* ---------- NEWSLETTER FORM ---------- */
  const form = document.getElementById('newsletterForm');
  const msg = document.getElementById('newsletterMsg');
  const emailInput = document.getElementById('newsletterEmail');

  if (form && msg && emailInput) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const value = emailInput.value.trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

      msg.classList.remove('is-success', 'is-error');

      if (!valid) {
        msg.textContent = 'Please enter a valid email address.';
        msg.classList.add('is-error');
        emailInput.classList.add('is-invalid');
        emailInput.focus();
        return;
      }

      emailInput.classList.remove('is-invalid');
      msg.textContent = 'Thanks! You\'re subscribed — check your inbox for a welcome email.';
      msg.classList.add('is-success');
      form.reset();

      // Reuse shared toast if available
      if (window.egToast) {
        window.egToast('Subscribed successfully ✅');
      }
    });

    emailInput.addEventListener('input', () => {
      if (emailInput.classList.contains('is-invalid')) {
        emailInput.classList.remove('is-invalid');
        msg.textContent = '';
        msg.classList.remove('is-error');
      }
    });
  }

  /* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
  const sections = [
    { id: 'home',    link: 'a[href="#home"]' },
    { id: 'careers', link: 'a[href="#careers"]' },
    { id: 'how',     link: 'a[href="#how"]' },
    { id: 'about',   link: 'a[href="#about"]' },
    { id: 'contact', link: 'a[href="#contact"]' }
  ];
  const navLinks = sections
    .map((s) => document.querySelector(`.eg-navbar__links ${s.link}`))
    .filter(Boolean);

  if (navLinks.length && 'IntersectionObserver' in window) {
    const map = new Map();
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      const link = document.querySelector(`.eg-navbar__links ${s.link}`);
      if (el && link) map.set(el, link);
    });

    const navIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const active = map.get(entry.target);
        if (!active) return;
        navLinks.forEach((l) => l.classList.remove('is-active'));
        active.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    map.forEach((_, el) => navIO.observe(el));
  }

  /* ---------- SMOOTH ANCHOR SCROLL ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = navbar ? navbar.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({
        top,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  });

  /* ---------- BACK TO TOP ---------- */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    const toggleBack = () => {
      backToTop.classList.toggle('is-visible', window.scrollY > 600);
    };
    toggleBack();
    window.addEventListener('scroll', toggleBack, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }
})();