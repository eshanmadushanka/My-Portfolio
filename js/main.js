/* ============================================================
   THEME TOGGLE
============================================================ */
const html       = document.documentElement;
const toggle     = document.getElementById('themeToggle');
const themeIcon  = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');

const saved = localStorage.getItem('portfolio-theme') || 'dark';
setTheme(saved);

toggle.addEventListener('click', () => {
  const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(next);
  localStorage.setItem('portfolio-theme', next);
});

function setTheme(t) {
  html.dataset.theme = t;
  if (t === 'light') {
    themeIcon.textContent  = 'dark_mode';
    themeLabel.textContent = 'Dark';
  } else {
    themeIcon.textContent  = 'light_mode';
    themeLabel.textContent = 'Light';
  }
}

/* ============================================================
   MOBILE MENU
============================================================ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => mobileMenu.classList.remove('open'))
);

/* ============================================================
   ACTIVE NAV LINK ON SCROLL
============================================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObs.observe(s));

/* ============================================================
   SCROLL FADE-UP ANIMATION
============================================================ */
const fadeEls = document.querySelectorAll('.fade-up');

const fadeObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      fadeObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

fadeEls.forEach(el => fadeObs.observe(el));

/* ============================================================
   CONTACT FORM
============================================================ */
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Sent ✓';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.disabled = false;
    e.target.reset();
  }, 3000);
});
