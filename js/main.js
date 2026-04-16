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
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-controls', 'mobile-nav');
  mobileNav.id = 'mobile-nav';

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  // close on link click or Escape
  mobileNav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    })
  );
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      hamburger.focus();
    }
  });
}

// ── Dropdown ARIA ─────────────────────────
document.querySelectorAll('.nav__dropdown').forEach(dropdown => {
  const trigger = dropdown.querySelector('.nav__dropdown-trigger');
  const menu    = dropdown.querySelector('.nav__dropdown-menu');
  if (!trigger || !menu) return;

  trigger.setAttribute('aria-haspopup', 'true');
  trigger.setAttribute('aria-expanded', 'false');
  menu.setAttribute('role', 'menu');
  menu.querySelectorAll('.nav__dropdown-item').forEach(item => item.setAttribute('role', 'menuitem'));

  const open  = () => trigger.setAttribute('aria-expanded', 'true');
  const close = () => trigger.setAttribute('aria-expanded', 'false');

  dropdown.addEventListener('focusin',  open);
  dropdown.addEventListener('focusout', e => { if (!dropdown.contains(e.relatedTarget)) close(); });
  dropdown.addEventListener('mouseover', open);
  dropdown.addEventListener('mouseleave', close);

  // Escape closes dropdown
  dropdown.addEventListener('keydown', e => {
    if (e.key === 'Escape') { close(); trigger.focus(); }
  });
});

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
  // Respect user's reduced-motion preference — jump straight to final value
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = target.toLocaleString() + suffix;
    return;
  }
  const startTime = performance.now();
  const isYear = target > 1900 && target < 2100;

  const tick = now => {
    const p = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = isYear
      ? Math.round(target - (target - 1940) * (1 - eased))
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
document.querySelectorAll('.acc-item').forEach((item, idx) => {
  const trigger = item.querySelector('.acc-trigger');
  const body    = item.querySelector('.acc-body');
  if (!trigger) return;

  // Wire up ARIA
  const bodyId = `acc-body-${idx}`;
  if (body) { body.id = bodyId; trigger.setAttribute('aria-controls', bodyId); }
  trigger.setAttribute('aria-expanded', item.classList.contains('open') ? 'true' : 'false');

  trigger.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    // Close all siblings and reset their ARIA
    item.closest('.accordion')?.querySelectorAll('.acc-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.acc-trigger')?.setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    }
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

// ── Add to Calendar (.ics download) ─────────
function wsAddToCalendar(title, startDate, endDate, description, location) {
  const fmt = s => s.replace(/-/g, '');
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wingstop//Events//EN',
    'BEGIN:VEVENT',
    'DTSTART;VALUE=DATE:' + fmt(startDate),
    'DTEND;VALUE=DATE:'   + fmt(endDate),
    'SUMMARY:'            + title,
    'DESCRIPTION:'        + description.replace(/,/g, '\\,'),
    'LOCATION:'           + location,
    'UID:'                + Date.now() + '@wingstop.com',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const a = Object.assign(document.createElement('a'), {
    href:     URL.createObjectURL(blob),
    download: title.replace(/[^a-z0-9]/gi, '-').toLowerCase() + '.ics'
  });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}

// ── Event countdowns ─────────────────────────
function wsInitCountdowns() {
  const pad = n => String(n).padStart(2, '0');

  const update = () => {
    const now = Date.now();

    // Chip countdowns — [data-event-date] on .evt-countdown and .evt-strip__cd
    document.querySelectorAll('[data-event-date]').forEach(el => {
      const diff = new Date(el.dataset.eventDate).getTime() - now;
      if (diff <= 0) {
        el.textContent = 'Happening Now';
        el.classList.add('evt-countdown--soon');
        return;
      }
      const days = Math.floor(diff / 86400000);
      if      (days === 0) el.textContent = 'Today';
      else if (days === 1) el.textContent = 'Tomorrow';
      else                 el.textContent = 'In ' + days + ' days';
      if (days <= 7) el.classList.add('evt-countdown--soon');
    });

    // Featured event multi-unit countdown (days / hrs / min)
    const target = document.getElementById('feat-countdown-target');
    if (target) {
      const diff2 = new Date(target.dataset.date).getTime() - now;
      if (diff2 > 0) {
        const d = Math.floor(diff2 / 86400000);
        const h = Math.floor((diff2 % 86400000) / 3600000);
        const m = Math.floor((diff2 % 3600000)  / 60000);
        const dEl = document.getElementById('feat-days');
        const hEl = document.getElementById('feat-hrs');
        const mEl = document.getElementById('feat-min');
        if (dEl) dEl.textContent = pad(d);
        if (hEl) hEl.textContent = pad(h);
        if (mEl) mEl.textContent = pad(m);
      } else {
        const wrap = document.querySelector('.featured-evt-countdown');
        if (wrap) wrap.innerHTML = '<span style="color:var(--green);font-weight:700;font-size:14px;">Happening Now</span>';
      }
    }
  };

  update();
  setInterval(update, 30000);
}

wsInitCountdowns();

// ── Events page filter ───────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.event-card-lg').forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.style.display = show ? '' : 'none';
    });
  });
});
