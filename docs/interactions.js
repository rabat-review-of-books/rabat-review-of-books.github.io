// Rabat Review of Books — interactive enhancements
(function () {
  // ---- Scroll reveal ----
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('rrb-in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document
    .querySelectorAll('.rrb-hero, .rrb-card, .rrb-pullquote, .rrb-section-head, .rrb-subscribe, .listing-page-title')
    .forEach((el) => {
      el.classList.add('rrb-fade');
      io.observe(el);
    });

  // ---- Marquee / running headline ticker ----
  document.querySelectorAll('.rrb-ticker').forEach((ticker) => {
    const inner = ticker.querySelector('.rrb-ticker-inner');
    if (!inner) return;
    inner.innerHTML += inner.innerHTML; // duplicate for seamless loop
  });

  // ---- Reading progress bar + time counter on post pages ----
  if (document.body.classList.contains('quarto-post')) {
    const bar = document.createElement('div');
    bar.className = 'rrb-progress';
    document.body.appendChild(bar);

    const counter = document.createElement('div');
    counter.className = 'rrb-read-counter';
    counter.innerHTML =
      '<div class="rrb-read-ring"><svg viewBox="0 0 26 26"><circle cx="13" cy="13" r="11" class="rrb-ring-track"/><circle cx="13" cy="13" r="11" class="rrb-ring-fill"/></svg></div>' +
      '<div class="rrb-read-text"><div class="rrb-read-remaining">— min</div><div class="rrb-read-label">left</div></div>';
    document.body.appendChild(counter);

    // Left rail: share icons + progress circle (inside the essay)
    const rail = document.createElement('div');
    rail.className = 'rrb-side-rail';
    const pageUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title || 'Rabat Review of Books');
    rail.innerHTML =
      '<a class="rrb-share-btn" href="https://twitter.com/intent/tweet?url=' + pageUrl + '&text=' + pageTitle + '" target="_blank" rel="noopener" aria-label="Share on X"><i class="bi bi-twitter-x"></i></a>' +
      '<a class="rrb-share-btn" href="https://www.linkedin.com/sharing/share-offsite/?url=' + pageUrl + '" target="_blank" rel="noopener" aria-label="Share on LinkedIn"><i class="bi bi-linkedin"></i></a>' +
      '<a class="rrb-share-btn" href="https://www.facebook.com/sharer/sharer.php?u=' + pageUrl + '" target="_blank" rel="noopener" aria-label="Share on Facebook"><i class="bi bi-facebook"></i></a>' +
      '<a class="rrb-share-btn" href="mailto:?subject=' + pageTitle + '&body=' + pageUrl + '" aria-label="Share by email"><i class="bi bi-envelope"></i></a>' +
      '<button class="rrb-share-btn" type="button" aria-label="Copy link" data-rrb-copy><i class="bi bi-link-45deg"></i></button>' +
      '<div class="rrb-share-sep"></div>' +
      '<div class="rrb-side-progress">' +
      '  <svg viewBox="0 0 36 36">' +
      '    <circle cx="18" cy="18" r="15" class="rrb-side-track"/>' +
      '    <circle cx="18" cy="18" r="15" class="rrb-side-fill"/>' +
      '  </svg>' +
      '</div>';
    document.body.appendChild(rail);

    const side = rail.querySelector('.rrb-side-progress');

    // Copy-link button behaviour
    const copyBtn = rail.querySelector('[data-rrb-copy]');
    if (copyBtn && navigator.clipboard) {
      copyBtn.addEventListener('click', function () {
        navigator.clipboard.writeText(window.location.href).then(function () {
          const prev = copyBtn.innerHTML;
          copyBtn.innerHTML = '<i class="bi bi-check2"></i>';
          setTimeout(function () { copyBtn.innerHTML = prev; }, 1200);
        });
      });
    }

    // Estimate total reading time from article word count
    const content = document.getElementById('quarto-document-content') || document.body;
    const words = (content.innerText || '').trim().split(/\s+/).length;
    const totalMin = Math.max(1, Math.round(words / 230)); // 230 wpm
    const ring = counter.querySelector('.rrb-ring-fill');
    const C = 2 * Math.PI * 11;
    ring.style.strokeDasharray = C;
    ring.style.strokeDashoffset = C;
    const remainingEl = counter.querySelector('.rrb-read-remaining');

    const sideFill = side.querySelector('.rrb-side-fill');
    const Cside = 2 * Math.PI * 15;
    sideFill.style.strokeDasharray = Cside;
    sideFill.style.strokeDashoffset = Cside;

    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const total = h.scrollHeight - h.clientHeight;
      const pct = Math.min(1, Math.max(0, scrolled / total));
      bar.style.width = pct * 100 + '%';
      ring.style.strokeDashoffset = C * (1 - pct);
      sideFill.style.strokeDashoffset = Cside * (1 - pct);
      const left = Math.max(0, Math.ceil(totalMin * (1 - pct)));
      if (left <= 0) {
        remainingEl.textContent = 'done';
      } else {
        remainingEl.textContent = left + ' min';
      }
      counter.classList.toggle('rrb-read-done', pct >= 0.98);
      counter.classList.toggle('rrb-read-visible', scrolled > 120);
      rail.classList.toggle('rrb-visible', scrolled > 120);
      side.classList.toggle('rrb-side-done', pct >= 0.98);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  // ---- Subtle parallax on hero images ----
  const hero = document.querySelector('.rrb-hero-img');
  if (hero) {
    window.addEventListener(
      'scroll',
      () => {
        const y = window.scrollY;
        hero.style.transform = `translateY(${y * 0.05}px) scale(1.02)`;
      },
      { passive: true }
    );
  }

  // ---- Carousel: featured essays slider ----
  document.querySelectorAll('.rrb-carousel').forEach((car) => {
    const track = car.querySelector('.rrb-carousel-track');
    const prev = car.querySelector('.rrb-carousel-prev');
    const next = car.querySelector('.rrb-carousel-next');
    if (!track || !prev || !next) return;
    const step = () => track.clientWidth * 0.9;
    prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  });

  // ---- Theme toggle (light / sepia) ----
  const toggle = document.querySelector('.rrb-theme-toggle');
  if (toggle) {
    const saved = localStorage ? '' : ''; // avoid storage per app rules
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('rrb-sepia');
    });
  }
})();
