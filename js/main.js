/* ============================================================
   THEME TOGGLE
============================================================ */
const html   = document.documentElement;
const toggle = document.getElementById('themeToggle');

const saved = localStorage.getItem('portfolio-theme') || 'dark';
setTheme(saved);

toggle.addEventListener('click', () => {
  const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(next);
  localStorage.setItem('portfolio-theme', next);
});

function setTheme(t) {
  html.dataset.theme = t;
  toggle.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
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
}, { rootMargin: "-30% 0px -69% 0px" });

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

/* ============================================================
   IDLE AUTO-SCROLL
============================================================ */
let idleTimer = null;
let autoScrollReq = null;
let scrollDir = 1; // 1 for down, -1 for up

function startAutoScroll() {
  if (autoScrollReq) return;
  
  // Disable CSS smooth scrolling temporarily so our frame-by-frame scroll is perfectly smooth
  document.documentElement.style.scrollBehavior = 'auto';
  
  function step() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    
    // Switch directions when hitting top or bottom
    if (scrollDir === 1 && window.scrollY >= maxScroll - 2) {
      scrollDir = -1; 
    } else if (scrollDir === -1 && window.scrollY <= 2) {
      scrollDir = 1; 
    }
    
    // Scroll by 1.2 pixels every frame
    window.scrollBy(0, scrollDir * 1.2);
    autoScrollReq = requestAnimationFrame(step);
  }
  
  autoScrollReq = requestAnimationFrame(step);
}

function stopAutoScroll() {
  if (autoScrollReq) {
    cancelAnimationFrame(autoScrollReq);
    autoScrollReq = null;
    // Restore the CSS smooth scroll behavior for normal navbar links
    document.documentElement.style.scrollBehavior = ''; 
  }
}

function resetIdleTimer() {
  stopAutoScroll();
  clearTimeout(idleTimer);
  // Wait 1 minute before starting auto-scroll
  idleTimer = setTimeout(startAutoScroll, 60000); 
}

// Listen to any actual user interaction (we exclude 'scroll' so our auto-scroll doesn't cancel itself)
['mousemove', 'mousedown', 'keydown', 'wheel', 'touchstart', 'touchmove'].forEach(evt => {
  window.addEventListener(evt, resetIdleTimer, { passive: true });
});

// Start the idle timer as soon as the page loads
resetIdleTimer();


