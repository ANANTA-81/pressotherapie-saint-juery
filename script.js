const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const reveals = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('[data-counter]');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

reveals.forEach((element) => revealObserver.observe(element));

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const target = entry.target;
      const endValue = Number(target.dataset.counter || 0);
      const duration = 1200;
      const startTime = performance.now();

      const updateCounter = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        target.textContent = String(Math.floor(progress * endValue));

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          target.textContent = String(endValue);
        }
      };

      requestAnimationFrame(updateCounter);
      counterObserver.unobserve(target);
    });
  },
  { threshold: 0.8 }
);

counters.forEach((counter) => counterObserver.observe(counter));
