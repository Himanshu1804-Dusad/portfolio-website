// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', nav.classList.contains('open'));
});

// Close mobile menu on link click
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// Scroll-to-top button
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  toTop.classList.toggle('show', window.scrollY > 350);
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Active link highlight with IntersectionObserver
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`.nav__link[href="#${id}"]`);
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      if (link) link.classList.add('active');
    }
  });
}, { threshold: 0.55 });

sections.forEach(sec => observer.observe(sec));

// Circular skills animation on scroll
const circles = document.querySelectorAll('.circle');
const circleObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.percentage) || 0;
    animateCircle(el, target);
    circleObs.unobserve(el);
  });
}, { threshold: 0.5 });

circles.forEach(c => circleObs.observe(c));

function animateCircle(el, target) {
  const valueEl = el.querySelector('.circle__value');
  let start = 0;
  const dur = 1000; // ms
  const startTime = performance.now();

  function tick(now) {
    const p = Math.min(1, (now - startTime) / dur);
    const eased = easeOutCubic(p);
    const current = Math.round(eased * target);
    el.style.background = `conic-gradient(var(--accent) 0deg ${current * 3.6}deg, rgba(255,255,255,.08) ${current * 3.6}deg 360deg)`;
    valueEl.textContent = `${current}%`;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
function easeOutCubic(t){ return 1 - Math.pow(1 - t, 3); }

// Simple contact (no backend): show a note and mailto as fallback
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(contactForm);
  const name = data.get('name');
  const email = data.get('email');
  const subject = data.get('subject') || 'Portfolio Contact';
  const message = data.get('message');

  formNote.textContent = 'Thanks! Opening your email client…';
  const mailto = `mailto:himanshudusad08@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    `From: ${name} <${email}>\n\n${message}`
  )}`;
  window.location.href = mailto;

  setTimeout(() => formNote.textContent = '', 4000);
});

// ✅ Hero Image fallback check
const heroImg = document.querySelector('.hero__image img');
if (heroImg) {
  heroImg.addEventListener('error', () => {
    console.warn("⚠️ Profile image not found! Check the path: " + heroImg.src);
  });
}
