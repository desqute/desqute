/* ============================================================
   Портфолио — скрипты
   Тема, язык, мобильное меню, появление блоков и активный пункт меню.
   ============================================================ */

(function () {
  'use strict';

  var root = document.documentElement;
  var langToggle = document.getElementById('lang-toggle');
  var menuBtn = document.getElementById('menu-btn');
  var nav = document.getElementById('nav');
  var navBackdrop = document.getElementById('nav-backdrop');
  var header = document.querySelector('.site-header');
  var currentLang = 'ru';

  /* ---------- Переводы ---------- */
  var translations = {
    ru: {
      pageTitle: 'Desqute — портфолио',
      pageDescription: 'Портфолио Desqute: немного обо мне и способы связаться.',
      skipLink: 'Перейти к содержимому',
      logoLabel: 'На главную',
      logoText: 'Портфолио',
      navLabel: 'Основная навигация',
      navAbout: 'Обо мне',
      navContact: 'Контакты',
      menuLabel: 'Меню',
      eyebrow: 'Открыт к предложениям',
      heroTitle: 'Здравствуйте! Я — создатель сайтов.',
      aliasPrefix: 'В сети меня зовут',
      heroText: 'Здесь вы сможете узнать обо мне побольше и найти способы связаться со мной.',
      btnAbout: 'Узнать обо мне',
      btnContact: 'Связаться со мной',
      statsLabel: 'Кратко о себе',
      statWeb: 'разработка',
      statFrontend: 'интерфейсы',
      statCuriosity: 'любопытства',
      aboutTitle: 'Обо мне',
      aboutText:
        'Я занимаюсь разработкой и дизайном цифровых продуктов: от идеи и прототипа ' +
        'до готового сайта или приложения. Люблю задачи, в которых нужно одновременно ' +
        'думать о людях и о качестве кода. Открыт к интересным проектам, стажировкам ' +
        'и сотрудничеству.',
      factLocationLabel: 'Где нахожусь',
      factLocationValue: 'Онлайн',
      factFocusLabel: 'Специализация',
      factFocusValue: 'Web-разработка',
      factLanguagesLabel: 'Языки',
      factLanguagesValue: 'Русский, английский',
      factStatusLabel: 'Статус',
      factStatusValue: 'Открыт к работе',
      contactTitle: 'Давайте работать вместе',
      contactText:
        'Напишите мне, если нужен сайт, приложение или просто хотите обсудить идею. ' +
        'Отвечаю в течение дня.',
      footerNote: 'Сделано вручную: HTML, CSS и немного JavaScript.',
      toTop: 'Наверх ↑',
      toTopLabel: 'Наверх',
      langLabel: 'Переключить на английский',
      langCode: 'EN'
    },

    en: {
      pageTitle: 'Desqute — portfolio',
      pageDescription: 'Desqute — portfolio: a little about me and how to get in touch.',
      skipLink: 'Skip to content',
      logoLabel: 'Back to top',
      logoText: 'Portfolio',
      navLabel: 'Main navigation',
      navAbout: 'About me',
      navContact: 'Contact',
      menuLabel: 'Menu',
      eyebrow: 'Open to offers',
      heroTitle: "Hello! I'm a website creator.",
      aliasPrefix: 'Online I go by',
      heroText: 'Here you can learn more about me and find ways to get in touch.',
      btnAbout: 'Get to know me',
      btnContact: 'Get in touch',
      statsLabel: 'Quick facts about me',
      statWeb: 'development',
      statFrontend: 'interfaces',
      statCuriosity: 'curiosity',
      aboutTitle: 'About me',
      aboutText:
        'I work on the development and design of digital products — from idea and ' +
        'prototype to a finished website or app. I enjoy tasks that require thinking ' +
        'about people and code quality at the same time. I am open to interesting ' +
        'projects, internships and collaboration.',
      factLocationLabel: 'Location',
      factLocationValue: 'Online',
      factFocusLabel: 'Focus',
      factFocusValue: 'Web development',
      factLanguagesLabel: 'Languages',
      factLanguagesValue: 'Russian, English',
      factStatusLabel: 'Status',
      factStatusValue: 'Open to work',
      contactTitle: "Let's work together",
      contactText:
        'Write to me if you need a website or an app, or just want to discuss an idea. ' +
        'I usually reply within a day.',
      footerNote: 'Handmade with HTML, CSS and a little JavaScript.',
      toTop: 'Back to top ↑',
      toTopLabel: 'Back to top',
      langLabel: 'Switch to Russian',
      langCode: 'RU'
    }
  };

  /* ---------- Язык ---------- */
  function setMeta(attr, name, content) {
    var meta = document.querySelector('meta[' + attr + '="' + name + '"]');
    if (meta) meta.setAttribute('content', content);
  }

  function applyLanguage(lang, persist) {
    var dict = translations[lang] || translations.ru;
    currentLang = lang;
    root.lang = lang;

    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n]'), function (node) {
      var key = node.getAttribute('data-i18n');
      if (dict[key] !== undefined) node.textContent = dict[key];
    });

    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-aria]'), function (node) {
      var key = node.getAttribute('data-i18n-aria');
      if (dict[key] === undefined) return;
      node.setAttribute('aria-label', dict[key]);
      if (node.hasAttribute('title')) node.setAttribute('title', dict[key]);
    });

    document.title = dict.pageTitle;
    setMeta('name', 'description', dict.pageDescription);
    setMeta('property', 'og:title', dict.pageTitle);
    setMeta('property', 'og:description', dict.pageDescription);
    setMeta('property', 'og:locale', lang === 'en' ? 'en_US' : 'ru_RU');

    if (langToggle) {
      langToggle.textContent = dict.langCode;
      langToggle.setAttribute('aria-label', dict.langLabel);
      langToggle.setAttribute('title', dict.langLabel);
    }

    if (persist) {
      try { localStorage.setItem('lang', lang); } catch (e) {}
    }
  }

  var savedLang = 'ru';
  try { savedLang = localStorage.getItem('lang') === 'en' ? 'en' : 'ru'; } catch (e) {}
  applyLanguage(savedLang, false);

  if (langToggle) {
    langToggle.addEventListener('click', function () {
      applyLanguage(currentLang === 'en' ? 'ru' : 'en', true);
    });
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
