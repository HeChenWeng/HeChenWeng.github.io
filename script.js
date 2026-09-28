// The page, publications, and links work without JavaScript.
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const navigationLinks = Array.from(document.querySelectorAll('.nav-links a'));
const sections = Array.from(document.querySelectorAll('main > section[id]'));

// Highlight the section currently being read without changing browser history.
if ('IntersectionObserver' in window) {
  const visible = new Set();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visible.add(entry.target.id);
      else visible.delete(entry.target.id);
    });
    const active = [...sections].reverse().find((section) => visible.has(section.id));
    navigationLinks.forEach((link) => {
      if (active && link.hash === `#${active.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-115px 0px -45% 0px', threshold: 0 });
  sections.forEach((section) => observer.observe(section));
}
