(function () {
  'use strict';

  const pageWrap = document.querySelector('.page-wrap');
  const hero     = document.querySelector('.case-hero');
  const sections = Array.from(document.querySelectorAll('.section'));

  if (!hero || sections.length === 0 || !pageWrap) return;

  const firstSection = sections[0];
  const heroSlideEls = [];
  let node = pageWrap.firstElementChild;
  while (node && node !== firstSection) {
    heroSlideEls.push(node);
    node = node.nextElementSibling;
  }

  const totalSlides = 1 + sections.length;
  let current = 0;
  let startX = 0, startY = 0, isDragging = false;

  const wrapper = document.createElement('div');
  wrapper.className = 'slides-wrapper';
  const track = document.createElement('div');
  track.className = 'slides-track';
  wrapper.appendChild(track);

  // Slide 0: hero + everything before first section
  const slide0 = makeSlide(0, true);
  const h1 = hero.querySelector('h1');
  slide0.setAttribute('data-title', h1 ? h1.textContent.trim() : 'Overview');
  heroSlideEls.forEach(el => {
    if (el.classList && el.classList.contains('toc')) el.style.display = 'none';
    slide0.appendChild(el);
  });
  track.appendChild(slide0);

  // One slide per section
  sections.forEach((sec, i) => {
    const slide = makeSlide(i + 1, false);
    const h2 = sec.querySelector('h2');
    slide.setAttribute('data-title', h2 ? h2.textContent.trim() : 'Slide ' + (i + 2));
    slide.appendChild(sec);
    track.appendChild(slide);
  });

  pageWrap.appendChild(wrapper);
  document.body.classList.add('slides-active');

  // Progress bar
  const progressWrap = document.createElement('div');
  progressWrap.className = 'slide-progress';
  const progressBar = document.createElement('div');
  progressBar.className = 'slide-progress-bar';
  progressWrap.appendChild(progressBar);
  document.body.appendChild(progressWrap);

  // Nav bar
  const nav = document.createElement('div');
  nav.className = 'slide-nav';
  nav.innerHTML = '<button class="nav-btn nav-prev" aria-label="Previous"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button><div class="nav-center"><div class="slide-counter"><span class="cur">1</span><span> / </span><span class="tot"></span></div><div class="slide-title-label"></div><button class="nav-menu-btn" aria-label="All slides"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button></div><button class="nav-btn nav-next" aria-label="Next"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button>';
  nav.querySelector('.tot').textContent = totalSlides;
  document.body.appendChild(nav);

  // Slide menu
  const menu = document.createElement('div');
  menu.className = 'slide-menu';
  track.querySelectorAll('.slide').forEach((sl, i) => {
    const btn = document.createElement('button');
    btn.className = 'slide-menu-item' + (i === 0 ? ' active' : '');
    btn.innerHTML = '<span class="menu-num">' + (i + 1) + '</span><span class="menu-label">' + (sl.getAttribute('data-title') || '') + '</span>';
    btn.addEventListener('click', function() { goTo(i); closeMenu(); });
    menu.appendChild(btn);
  });
  document.body.appendChild(menu);

  // Button events
  nav.querySelector('.nav-prev').addEventListener('click', function() { goTo(current - 1); });
  nav.querySelector('.nav-next').addEventListener('click', function() { goTo(current + 1); });
  var menuBtn = nav.querySelector('.nav-menu-btn');
  menuBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });
  document.addEventListener('click', closeMenu);
  menu.addEventListener('click', function(e) { e.stopPropagation(); });

  // Keyboard
  document.addEventListener('keydown', function(e) {
    if (menu.classList.contains('open')) { if (e.key === 'Escape') closeMenu(); return; }
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); goTo(current + 1); }
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   { e.preventDefault(); goTo(current - 1); }
  });

  // Swipe
  wrapper.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isDragging = true;
  }, { passive: true });
  wrapper.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    var dx = e.touches[0].clientX - startX;
    var dy = e.touches[0].clientY - startY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) e.preventDefault();
  }, { passive: false });
  wrapper.addEventListener('touchend', function(e) {
    if (!isDragging) return;
    isDragging = false;
    var dx = e.changedTouches[0].clientX - startX;
    var dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 45) {
      dx < 0 ? goTo(current + 1) : goTo(current - 1);
    }
  }, { passive: true });

  function goTo(n) {
    if (n < 0 || n >= totalSlides) return;
    var slides = track.querySelectorAll('.slide');
    var dir = n > current ? 'fwd' : 'back';
    var from = slides[current];
    var to   = slides[n];
    from.classList.add(dir === 'fwd' ? 'exit-left' : 'exit-right');
    from.classList.remove('active');
    to.classList.add(dir === 'fwd' ? 'enter-right' : 'enter-left');
    to.classList.add('active');
    to.scrollTop = 0;
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        to.classList.remove('enter-right', 'enter-left');
        setTimeout(function() { from.classList.remove('exit-left', 'exit-right'); }, 300);
      });
    });
    current = n;
    update();
  }

  function update() {
    var slides = track.querySelectorAll('.slide');
    var items  = menu.querySelectorAll('.slide-menu-item');
    var pct    = totalSlides > 1 ? (current / (totalSlides - 1)) * 100 : 100;
    nav.querySelector('.cur').textContent = current + 1;
    nav.querySelector('.slide-title-label').textContent = slides[current].getAttribute('data-title') || '';
    progressBar.style.width = pct + '%';
    nav.querySelector('.nav-prev').disabled = current === 0;
    nav.querySelector('.nav-next').disabled = current === totalSlides - 1;
    items.forEach(function(item, i) { item.classList.toggle('active', i === current); });
  }

  function openMenu() {
    menu.classList.add('open');
    menuBtn.classList.add('active');
    var active = menu.querySelector('.slide-menu-item.active');
    if (active) active.scrollIntoView({ block: 'nearest' });
  }
  function closeMenu() {
    menu.classList.remove('open');
    menuBtn.classList.remove('active');
  }

  function makeSlide(index, active) {
    var s = document.createElement('div');
    s.className = 'slide' + (active ? ' active' : '');
    s.setAttribute('data-index', index);
    return s;
  }

  update();
})();
