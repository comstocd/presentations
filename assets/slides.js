/* ============================================================
   Morning Report — Slide Presentation Engine
   Touch/swipe, keyboard, iPad-optimized
   ============================================================ */

(function () {
  'use strict';

  /* ── Collect slides ── */
  const hero    = document.querySelector('.case-hero');
  const toc     = document.querySelector('.toc');
  const sections = Array.from(document.querySelectorAll('.section'));

  if (!hero || sections.length === 0) return; // index page — skip

  // Hide TOC (nav replaces it)
  if (toc) toc.style.display = 'none';

  const allSlides = [hero, ...sections];
  let current = 0;
  let startX = 0;
  let startY = 0;
  let isDragging = false;

  /* ── Build DOM structure ── */
  const wrapper = document.createElement('div');
  wrapper.className = 'slides-wrapper';

  const track = document.createElement('div');
  track.className = 'slides-track';

  // Wrap each slide
  allSlides.forEach((el, i) => {
    const slide = document.createElement('div');
    slide.className = 'slide' + (i === 0 ? ' active' : '');
    slide.setAttribute('data-index', i);

    // Add slide label for sections
    if (i > 0) {
      const heading = el.querySelector('h2');
      if (heading) {
        slide.setAttribute('data-title', heading.textContent.trim());
      }
    } else {
      const title = el.querySelector('h1');
      slide.setAttribute('data-title', title ? title.textContent.trim() : 'Overview');
    }

    el.parentNode.insertBefore(wrapper, el);
    slide.appendChild(el);
    track.appendChild(slide);
  });

  wrapper.appendChild(track);
  document.querySelector('.page-wrap').prepend(wrapper);

  /* ── Navigation bar ── */
  const nav = document.createElement('div');
  nav.className = 'slide-nav';
  nav.innerHTML = `
    <button class="nav-btn nav-prev" aria-label="Previous slide">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </button>
    <div class="nav-center">
      <div class="slide-counter"><span class="counter-current">1</span> / <span class="counter-total">${allSlides.length}</span></div>
      <div class="slide-title-label"></div>
    </div>
    <button class="nav-btn nav-next" aria-label="Next slide">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </button>
  `;
  document.body.appendChild(nav);

  /* ── Progress bar ── */
  const progress = document.createElement('div');
  progress.className = 'slide-progress';
  progress.innerHTML = '<div class="slide-progress-bar"></div>';
  document.body.appendChild(progress);

  /* ── Slide menu (thumbnail nav) ── */
  const menuBtn = document.createElement('button');
  menuBtn.className = 'nav-menu-btn';
  menuBtn.setAttribute('aria-label', 'Slide menu');
  menuBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
  nav.querySelector('.nav-center').appendChild(menuBtn);

  const menu = document.createElement('div');
  menu.className = 'slide-menu';
  allSlides.forEach((_, i) => {
    const item = document.createElement('button');
    item.className = 'slide-menu-item' + (i === 0 ? ' active' : '');
    const title = track.querySelector(`[data-index="${i}"]`).getAttribute('data-title') || `Slide ${i + 1}`;
    item.innerHTML = `<span class="menu-num">${i + 1}</span><span class="menu-label">${title}</span>`;
    item.addEventListener('click', () => { goTo(i); closeMenu(); });
    menu.appendChild(item);
  });
  document.body.appendChild(menu);

  /* ── Core navigation ── */
  function goTo(n, direction) {
    if (n < 0 || n >= allSlides.length) return;

    const slides = track.querySelectorAll('.slide');
    const prev = slides[current];
    const next = slides[n];

    // Determine direction if not provided
    if (direction === undefined) direction = n > current ? 'forward' : 'back';

    // Animate out
    prev.classList.add(direction === 'forward' ? 'exit-left' : 'exit-right');
    prev.classList.remove('active');

    // Animate in
    next.classList.add(direction === 'forward' ? 'enter-right' : 'enter-left');
    next.classList.add('active');

    // Scroll slide to top
    next.scrollTop = 0;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        next.classList.remove('enter-right', 'enter-left');
        setTimeout(() => {
          prev.classList.remove('exit-left', 'exit-right');
        }, 320);
      });
    });

    current = n;
    update();
  }

  function update() {
    const slides = track.querySelectorAll('.slide');
    const counter = nav.querySelector('.counter-current');
    const titleLabel = nav.querySelector('.slide-title-label');
    const progressBar = document.querySelector('.slide-progress-bar');
    const menuItems = menu.querySelectorAll('.slide-menu-item');

    counter.textContent = current + 1;
    titleLabel.textContent = slides[current].getAttribute('data-title') || '';
    progressBar.style.width = ((current / (allSlides.length - 1)) * 100) + '%';

    // Prev/next button states
    nav.querySelector('.nav-prev').disabled = current === 0;
    nav.querySelector('.nav-next').disabled = current === allSlides.length - 1;

    // Menu active state
    menuItems.forEach((item, i) => {
      item.classList.toggle('active', i === current);
    });
  }

  /* ── Menu toggle ── */
  function openMenu() {
    menu.classList.add('open');
    menuBtn.classList.add('active');
    // Scroll active item into view
    const activeItem = menu.querySelector('.slide-menu-item.active');
    if (activeItem) activeItem.scrollIntoView({ block: 'nearest' });
  }

  function closeMenu() {
    menu.classList.remove('open');
    menuBtn.classList.remove('active');
  }

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });

  document.addEventListener('click', () => closeMenu());
  menu.addEventListener('click', (e) => e.stopPropagation());

  /* ── Button clicks ── */
  nav.querySelector('.nav-prev').addEventListener('click', () => goTo(current - 1));
  nav.querySelector('.nav-next').addEventListener('click', () => goTo(current + 1));

  /* ── Keyboard navigation ── */
  document.addEventListener('keydown', (e) => {
    if (menu.classList.contains('open')) {
      if (e.key === 'Escape') closeMenu();
      return;
    }
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
      e.preventDefault();
      goTo(current + 1);
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      goTo(current - 1);
    }
    if (e.key === 'Escape') closeMenu();
  });

  /* ── Touch / swipe ── */
  const slideArea = wrapper;

  slideArea.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isDragging = true;
  }, { passive: true });

  slideArea.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    // Allow vertical scroll within slide — only intercept horizontal swipe
    const dx = e.touches[0].clientX - startX;
    const dy = e.touches[0].clientY - startY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
      e.preventDefault();
    }
  }, { passive: false });

  slideArea.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      dx < 0 ? goTo(current + 1) : goTo(current - 1);
    }
  }, { passive: true });

  /* ── Init ── */
  update();

})();
