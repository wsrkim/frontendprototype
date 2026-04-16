/* ==========================================
   WINGSTOP — main.js
   ========================================== */

// ── Nav scroll effect ──────────────────────
const nav = document.getElementById('nav');
if (nav) {
  const vidHero = document.querySelector('.vid-hero');
  const onScroll = () => {
    const scrolled = window.scrollY > 30;
    nav.classList.toggle('scrolled', scrolled);
    if (vidHero) nav.classList.toggle('nav--video', !scrolled);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── Mobile nav ────────────────────────────
const hamburger = document.querySelector('.nav__hamburger');
const mobileNav  = document.querySelector('.nav__mobile');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  // close on link click
  mobileNav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    })
  );
}

// ── Active nav link ───────────────────────
const path = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__link').forEach(link => {
  const href = (link.getAttribute('href') || '').split('/').pop();
  if (href && href === path) link.classList.add('active');
});

// ── Scroll-reveal ─────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('vis');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up, .fade-in').forEach(el => revealObserver.observe(el));

// ── Counter animation ─────────────────────
function countUp(el, target, duration = 1800, suffix = '') {
  const startTime = performance.now();
  const isYear = target > 1900 && target < 2100;

  const tick = now => {
    const p = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = isYear
      ? Math.round(target - (target - 1940) * (1 - eased))  // year counts less dramatically
      : Math.floor(eased * target);
    el.textContent = val.toLocaleString() + suffix;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target.toLocaleString() + suffix;
  };
  requestAnimationFrame(tick);
}

const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el     = e.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      if (!isNaN(target)) countUp(el, target, 1800, suffix);
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

// ── Accordion / FAQ ───────────────────────
document.querySelectorAll('.acc-item').forEach(item => {
  const trigger = item.querySelector('.acc-trigger');
  if (!trigger) return;
  trigger.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    // Close all siblings
    item.closest('.accordion')?.querySelectorAll('.acc-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ── FAQ category filter ───────────────────
document.querySelectorAll('.faq-cat').forEach(btn => {
  btn.addEventListener('click', () => {
    const cat = btn.dataset.cat;
    document.querySelectorAll('.faq-cat').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.acc-item').forEach(item => {
      if (!cat || cat === 'all' || item.dataset.cat === cat) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
        item.classList.remove('open');
      }
    });
  });
});

// ── Smooth anchor scrolls ────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id  = a.getAttribute('href').slice(1);
    const el  = id && document.getElementById(id);
    if (el) {
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 72;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - navH - 16, behavior: 'smooth' });
    }
  });
});
