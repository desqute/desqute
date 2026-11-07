/* ============================================================
   Портфолио — скрипты
   Тема, мобильное меню, появление блоков и активный пункт меню.
   ============================================================ */

(function () {
  'use strict';

  var root = document.documentElement;
  var themeToggle = document.getElementById('theme-toggle');
  var menuBtn = document.getElementById('menu-btn');
  var nav = document.getElementById('nav');
  var navBackdrop = document.getElementById('nav-backdrop');
  var header = document.querySelector('.site-header');

  /* ---------- Тема ---------- */
  function applyTheme(theme) {
    root.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch (e) {}
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#f7f8fc' : '#0b0d12');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      applyTheme(root.dataset.theme === 'light' ? 'dark' : 'light');
    });
  }

  // Следим за системной темой, пока пользователь не выбрал свою
  var savedTheme = null;
  try { savedTheme = localStorage.getItem('theme'); } catch (e) {}
  if (!savedTheme && window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function (e) { applyTheme(e.matches ? 'dark' : 'light'); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  /* ---------- Мобильное меню ---------- */
  function closeMenu() {
    if (!nav || !menuBtn) return;
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('menu-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    if (navBackdrop) navBackdrop.addEventListener('click', closeMenu);

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) closeMenu();
    });
  }

  /* ---------- Тень шапки при прокрутке ---------- */
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      if (header) header.classList.toggle('scrolled', window.scrollY > 8);
      setActiveLink();
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Подсветка активного пункта меню ---------- */
  var navLinks = nav ? Array.prototype.slice.call(nav.querySelectorAll('a')) : [];
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute('href');
      return id && id.charAt(0) === '#' ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  function setActiveLink() {
    if (!sections.length) return;
    var pos = window.scrollY + 120;
    var current = null;
    sections.forEach(function (section) {
      if (section.offsetTop <= pos) current = section;
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('active', !!current && link.getAttribute('href') === '#' + current.id);
    });
  }

  /* ---------- Мягкое появление блоков ---------- */
  var revealItems = document.querySelectorAll('.reveal');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || reduceMotion) {
    Array.prototype.forEach.call(revealItems, function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    Array.prototype.forEach.call(revealItems, function (el, i) {
      el.style.transitionDelay = Math.min(i % 3, 2) * 70 + 'ms';
      observer.observe(el);
    });
  }

  /* ---------- Год в подвале ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  setActiveLink();
})();
