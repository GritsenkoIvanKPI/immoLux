/* ImmoLux Germany — shared runtime: language, formatting, layout, cards, gallery, forms. */
(function () {
  'use strict';

  var CONFIG = window.IMMOLUX_CONFIG;
  var STRINGS = window.IMMOLUX_I18N;
  var PROPERTIES = window.IMMOLUX_PROPERTIES || [];
  var LANGS = ['de', 'en'];
  var STORAGE_KEY = 'immolux-lang';
  var renderers = [];

  /* ---------- Language ---------- */

  function readStoredLang() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function storeLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* private mode */ }
  }

  function detectLang() {
    var param = new URLSearchParams(location.search).get('lang');
    if (LANGS.indexOf(param) !== -1) { storeLang(param); return param; }
    var stored = readStoredLang();
    if (LANGS.indexOf(stored) !== -1) return stored;
    return 'de';
  }

  var lang = detectLang();

  function t(key, vars) {
    var str = (STRINGS[lang] && STRINGS[lang][key]) || STRINGS.de[key] || key;
    if (vars) {
      Object.keys(vars).forEach(function (k) { str = str.split('{' + k + '}').join(vars[k]); });
    }
    return str;
  }

  // Picks the current language from a { de, en } object (or returns plain values unchanged).
  function L(value) {
    if (value && typeof value === 'object' && !Array.isArray(value) && ('de' in value || 'en' in value)) {
      return value[lang] != null ? value[lang] : value.de;
    }
    return value;
  }

  function setLang(next) {
    if (next === lang || LANGS.indexOf(next) === -1) return;
    lang = next;
    storeLang(next);
    var url = new URL(location.href);
    if (url.searchParams.has('lang')) { url.searchParams.set('lang', next); history.replaceState(null, '', url); }
    renderAll();
  }

  function applyStaticTranslations(root) {
    (root || document).querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    (root || document).querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var parts = pair.split(':');
        if (parts.length === 2) el.setAttribute(parts[0].trim(), t(parts[1].trim()));
      });
    });
  }

  function onRender(fn) { renderers.push(fn); }

  function renderAll() {
    document.documentElement.lang = lang;
    var titleKey = document.body.getAttribute('data-title');
    if (titleKey) document.title = t(titleKey);
    renderHeader();
    renderFooter();
    applyStaticTranslations();
    renderers.forEach(function (fn) { fn(lang); });
    observeReveals();
  }

  /* ---------- Formatting ---------- */

  function locale() { return lang === 'de' ? 'de-DE' : 'en-GB'; }

  function fmtNumber(n, digits) {
    return new Intl.NumberFormat(locale(), {
      minimumFractionDigits: digits || 0,
      maximumFractionDigits: digits == null ? 2 : digits
    }).format(n);
  }

  function fmtPrice(n) {
    if (n == null) return t('price.onRequest');
    return new Intl.NumberFormat(locale(), { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
  }

  function fmtArea(n, digits) { return fmtNumber(n, digits) + '\u00a0m²'; }

  function priceLabel(p) {
    var s = fmtPrice(p.price);
    if (p.price != null && p.marketing === 'rent') s += ' ' + t('unit.perMonth');
    return s;
  }

  function unitsOf(p) { return (p.units || []).filter(function (u) { return u.status !== 'sold'; }); }

  // Lowest price among the units (or the property's own price when it has none).
  function priceFrom(p) {
    var units = unitsOf(p);
    if (!units.length) return p.price != null ? p.price : null;
    var prices = units.map(function (u) { return u.price; }).filter(function (v) { return v != null; });
    return prices.length ? Math.min.apply(null, prices) : null;
  }

  function range(values) {
    var v = values.filter(function (x) { return x != null; });
    if (!v.length) return null;
    var min = Math.min.apply(null, v), max = Math.max.apply(null, v);
    return { min: min, max: max, same: min === max };
  }

  function areaRange(p) {
    var units = unitsOf(p);
    return units.length ? range(units.map(function (u) { return u.livingArea; })) : range([p.livingArea]);
  }

  function roomsRange(p) {
    var units = unitsOf(p);
    return units.length ? range(units.map(function (u) { return u.rooms; })) : range([p.rooms]);
  }

  function areaLabel(p) {
    var r = areaRange(p);
    if (!r) return null;
    return r.same ? fmtArea(r.min) : fmtNumber(r.min) + '\u2009–\u2009' + fmtArea(r.max);
  }

  function roomsLabel(p) {
    var r = roomsRange(p);
    if (!r) return null;
    return (r.same ? fmtNumber(r.min) : fmtNumber(r.min) + '\u2009–\u2009' + fmtNumber(r.max)) + ' ' + t('unit.rooms');
  }

  // "209.000 €" for a single home, "ab 107.000 €" when several units share one page.
  function priceSummary(p) {
    var from = priceFrom(p);
    if (from == null) return t('price.onRequest');
    var label = fmtPrice(from);
    if (p.marketing === 'rent') label += ' ' + t('unit.perMonth');
    return unitsOf(p).length > 1 ? t('price.from', { price: label }) : label;
  }

  function pricePerSqm(p) {
    if (p.pricePerSqm) return p.pricePerSqm;
    if (p.price && p.livingArea) return Math.round(p.price / p.livingArea);
    return null;
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ---------- Property helpers ---------- */

  var NEW_DAYS = 30;

  function imgUrl(p, img, thumb) {
    return 'assets/img/properties/' + p.id + '/' + (thumb ? 'thumb-' : '') + img.src;
  }

  function isNew(p) {
    if (!p.listedAt) return false;
    return (Date.now() - new Date(p.listedAt).getTime()) / 864e5 <= NEW_DAYS;
  }

  function badgeFor(p) {
    if (p.status === 'sold') return t('badge.sold');
    if (p.status === 'reserved') return t('badge.reserved');
    if (isNew(p)) return t('badge.new');
    return '';
  }

  function locationLabel(p) {
    return [p.location.city, p.location.district].filter(Boolean).join(' – ');
  }

  function propertyUrl(p) { return 'objekt.html?id=' + encodeURIComponent(p.id); }

  function getProperty(id) {
    for (var i = 0; i < PROPERTIES.length; i++) if (PROPERTIES[i].id === id) return PROPERTIES[i];
    return null;
  }

  function cardHTML(p) {
    var badge = badgeFor(p);
    var cover = p.images[0];
    var units = unitsOf(p);
    var meta = [];
    if (units.length > 1) meta.push(t('units.count', { n: units.length }));
    var area = areaLabel(p);
    if (area) meta.push((units.length > 1 ? '' : t('unit.livingShort') + ' ') + area);
    var rooms = roomsLabel(p);
    if (rooms) meta.push(rooms);
    meta.push(priceSummary(p));
    return '' +
      '<article class="card reveal">' +
        '<a class="card__link" href="' + propertyUrl(p) + '">' +
          '<div class="card__media">' +
            '<img src="' + imgUrl(p, cover, true) + '" alt="' + esc(L(cover.alt)) + '" loading="lazy" width="800" height="523">' +
            (badge ? '<span class="badge">' + esc(badge) + '</span>' : '') +
          '</div>' +
          '<div class="card__body">' +
          '<p class="eyebrow">' + esc(locationLabel(p)) + '</p>' +
          '<h3 class="card__title">' + esc(L(p.title)) + '</h3>' +
          '<div class="card__meta"><p class="card__meta-row">' + meta.map(function (m) { return '<span>' + esc(m) + '</span>'; }).join('') + '</p></div>' +
          (p.teaser ? '<p class="card__teaser">' + esc(L(p.teaser)) + '</p>' : '') +
          '<span class="card__cta link-arrow">' + esc(t('prop.details')) + icon('arrowRight') + '</span>' +
          '</div>' +
        '</a>' +
      '</article>';
  }

  /* ---------- Icons ---------- */

  var ICONS = {
    arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowDown: '<path d="M12 4v16M6 14l6 6 6-6"/>',
    chevronLeft: '<path d="M15 5l-7 7 7 7"/>',
    chevronRight: '<path d="M9 5l7 7-7 7"/>',
    chevronDown: '<path d="M5 9l7 7 7-7"/>',
    share: '<path d="M14 5l6 6-6 6M20 11h-8a8 8 0 0 0-8 8"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3.5 6l8.5 7 8.5-7"/>',
    pin: '<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    menu: '<path d="M3 8h18M3 16h18"/>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>'
  };

  function icon(name, cls) {
    return '<svg class="icon' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + ICONS[name] + '</svg>';
  }

  /* ---------- Header & footer ---------- */

  function currentPage() { return document.body.getAttribute('data-page'); }

  function navLink(href, key, page) {
    var active = currentPage() === page;
    return '<a class="nav__link' + (active ? ' is-active' : '') + '" href="' + href + '"' + (active ? ' aria-current="page"' : '') + '>' + esc(t(key)) + '</a>';
  }

  function langSwitch(extraClass) {
    return '<div class="lang' + (extraClass ? ' ' + extraClass : '') + '" role="group" aria-label="' + esc(t('nav.language')) + '">' +
      LANGS.map(function (l) {
        return '<button type="button" class="lang__btn' + (l === lang ? ' is-active' : '') + '" data-lang="' + l + '" aria-pressed="' + (l === lang) + '" lang="' + l + '">' + l.toUpperCase() + '</button>';
      }).join('<span class="lang__sep" aria-hidden="true"></span>') +
      '</div>';
  }

  function renderHeader() {
    var el = document.getElementById('site-header');
    if (!el) return;
    var c = CONFIG.contact;
    el.innerHTML =
      '<a class="skip-link" href="#main">' + esc(t('nav.skip')) + '</a>' +
      '<div class="header__inner container">' +
        '<nav class="nav" aria-label="Main">' +
          navLink('index.html', 'nav.home', 'home') +
          navLink('immobilien.html', 'nav.listings', 'listings') +
          navLink('kontakt.html', 'nav.contact', 'contact') +
        '</nav>' +
        '<a class="brand" href="index.html" aria-label="ImmoLux Germany — ' + esc(t('nav.home')) + '">' +
          '<img class="brand__logo" src="assets/img/brand/logo-header.png" alt="ImmoLux Germany" width="760" height="445">' +
        '</a>' +
        '<div class="header__tools">' +
          langSwitch() +
          '<a class="header__phone" href="tel:' + c.phoneHref + '" title="' + esc(t('contact.phoneNote')) + '" aria-label="' + esc(t('contact.phoneCompany') + ': ' + c.phone) + '">' + icon('phone') +
            '<span><small>' + esc(t('contact.phoneCompany')) + '</small>' + esc(c.phone) + '</span></a>' +
          '<button type="button" class="burger" aria-expanded="false" aria-controls="mobile-menu" aria-label="' + esc(t('nav.menu')) + '">' + icon('menu') + '</button>' +
        '</div>' +
      '</div>' +
      '<div class="mobile-menu" id="mobile-menu" hidden>' +
        '<nav class="mobile-menu__nav" aria-label="Mobile">' +
          navLink('index.html', 'nav.home', 'home') +
          navLink('immobilien.html', 'nav.listings', 'listings') +
          navLink('kontakt.html', 'nav.contact', 'contact') +
        '</nav>' +
        '<div class="mobile-menu__foot">' +
          langSwitch('lang--large') +
          '<a class="mobile-menu__contact" href="tel:' + c.phoneHref + '" aria-label="' + esc(t('contact.phoneCompany') + ': ' + c.phone) + '">' + icon('phone') +
            '<span><small>' + esc(t('contact.phoneCompany')) + '</small>' + esc(c.phone) + '</span></a>' +
          '<a class="mobile-menu__contact" href="mailto:' + c.email + '">' + icon('mail') + esc(c.email) + '</a>' +
        '</div>' +
      '</div>';

    el.querySelectorAll('[data-lang]').forEach(function (btn) {
      btn.addEventListener('click', function () { closeMenu(); setLang(btn.getAttribute('data-lang')); });
    });

    var burger = el.querySelector('.burger');
    var menu = el.querySelector('.mobile-menu');
    function closeMenu() {
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', t('nav.menu'));
      burger.innerHTML = icon('menu');
      menu.hidden = true;
      document.body.classList.remove('menu-open');
    }
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      if (open) { closeMenu(); return; }
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', t('nav.close'));
      burger.innerHTML = icon('close');
      menu.hidden = false;
      document.body.classList.add('menu-open');
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) closeMenu(); });
  }

  function renderFooter() {
    var el = document.getElementById('site-footer');
    if (!el) return;
    var c = CONFIG.contact;
    var year = new Date().getFullYear();
    el.innerHTML =
      '<div class="container">' +
        '<div class="footer__grid">' +
          '<div class="footer__brand">' +
            '<a class="footer__logo" href="index.html"><img src="assets/img/brand/logo-full.png" alt="ImmoLux Germany Immobilien" width="760" height="538" loading="lazy"></a>' +
          '</div>' +
          '<div class="footer__col">' +
            '<p class="footer__heading">' + esc(t('footer.properties')) + '</p>' +
            '<ul>' +
              '<li><a href="immobilien.html">' + esc(t('footer.current')) + '</a></li>' +
            '</ul>' +
          '</div>' +
          '<div class="footer__col">' +
            '<p class="footer__heading">' + esc(t('footer.company')) + '</p>' +
            '<ul>' +
              '<li><a href="index.html">' + esc(t('nav.home')) + '</a></li>' +
              '<li><a href="kontakt.html">' + esc(t('nav.contact')) + '</a></li>' +
              '<li><a href="impressum.html">' + esc(t('footer.imprint')) + '</a></li>' +
              '<li><a href="datenschutz.html">' + esc(t('footer.privacy')) + '</a></li>' +
            '</ul>' +
          '</div>' +
          '<div class="footer__col">' +
            '<p class="footer__heading">' + esc(t('footer.contact')) + '</p>' +
            '<p class="footer__office">' + esc(CONFIG.company) + '</p>' +
            '<address>' +
              esc(L(CONFIG.region)) + '<br>' +
              esc(t('contact.phoneCompany')) + ': <a href="tel:' + c.phoneHref + '">' + esc(c.phone) + '</a><br>' +
              '<a href="mailto:' + c.email + '">' + esc(c.email) + '</a>' +
            '</address>' +
          '</div>' +
        '</div>' +
        '<div class="footer__bottom">' +
          '<p>© ' + year + ' ' + esc(CONFIG.company) + '. ' + esc(t('footer.rights')) + '</p>' +
          '<ul class="footer__legal">' +
            '<li><a href="impressum.html">' + esc(t('footer.imprint')) + '</a></li>' +
            '<li><a href="datenschutz.html">' + esc(t('footer.privacy')) + '</a></li>' +
          '</ul>' +
        '</div>' +
      '</div>';
  }

  function watchHeaderShadow() {
    var header = document.getElementById('site-header');
    if (!header) return;
    var update = function () { header.classList.toggle('is-scrolled', window.scrollY > 4); };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ---------- Reveal on scroll ---------- */

  var revealObserver = null;
  function observeReveals() {
    var items = document.querySelectorAll('.reveal:not(.is-visible)');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    }
    items.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Gallery (lightbox) ---------- */

  var gallery = null;

  function openGallery(items, start) {
    if (!gallery) gallery = buildGallery();
    gallery.items = items;
    gallery.show(start || 0);
  }

  function buildGallery() {
    var dlg = document.createElement('dialog');
    dlg.className = 'lightbox';
    document.body.appendChild(dlg);
    var state = { items: [], index: 0, lastFocus: null };

    function draw() {
      var item = state.items[state.index];
      var focused = document.activeElement && dlg.contains(document.activeElement) ? document.activeElement.getAttribute('data-act') : null;
      dlg.innerHTML =
        '<div class="lightbox__bar">' +
          '<span class="lightbox__count">' + (state.index + 1) + ' / ' + state.items.length + '</span>' +
          '<button type="button" class="lightbox__btn" data-act="close" aria-label="' + esc(t('gallery.close')) + '">' + icon('close') + '</button>' +
        '</div>' +
        '<figure class="lightbox__stage">' +
          '<img src="' + item.src + '" alt="' + esc(item.alt) + '">' +
          '<figcaption>' + esc(item.alt) + '</figcaption>' +
        '</figure>' +
        (state.items.length > 1 ?
          '<button type="button" class="lightbox__btn lightbox__nav lightbox__nav--prev" data-act="prev" aria-label="' + esc(t('gallery.prev')) + '">' + icon('arrowLeft') + '</button>' +
          '<button type="button" class="lightbox__btn lightbox__nav lightbox__nav--next" data-act="next" aria-label="' + esc(t('gallery.next')) + '">' + icon('arrowRight') + '</button>' : '');
      // Re-rendering removes the focused button; restore focus so keyboard navigation keeps working.
      var target = dlg.querySelector('[data-act="' + (focused || 'close') + '"]');
      if (target && dlg.open) target.focus();
    }

    function step(d) {
      state.index = (state.index + d + state.items.length) % state.items.length;
      draw();
    }

    dlg.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-act]');
      if (btn) {
        var act = btn.getAttribute('data-act');
        if (act === 'close') dlg.close();
        if (act === 'prev') step(-1);
        if (act === 'next') step(1);
        return;
      }
      if (e.target === dlg || e.target.classList.contains('lightbox__stage')) dlg.close();
    });
    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
    var touchX = null;
    dlg.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    dlg.addEventListener('touchend', function (e) {
      if (touchX == null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      touchX = null;
    });
    dlg.addEventListener('close', function () {
      document.body.classList.remove('lightbox-open');
      if (state.lastFocus) state.lastFocus.focus();
    });

    return {
      set items(v) { state.items = v; },
      show: function (i) {
        state.index = i;
        state.lastFocus = document.activeElement;
        draw();
        document.body.classList.add('lightbox-open');
        dlg.showModal();
        var close = dlg.querySelector('[data-act="close"]');
        if (close) close.focus();
      }
    };
  }

  /* ---------- Forms ---------- */

  function field(name, labelKey, opts) {
    opts = opts || {};
    var id = (opts.prefix || 'f') + '-' + name;
    var req = opts.required ? ' required' : '';
    var star = opts.required ? ' *' : '';
    var control;
    if (opts.type === 'select') {
      control = '<div class="select"><select id="' + id + '" name="' + name + '"' + req + '>' +
        opts.options.map(function (o) {
          return '<option value="' + esc(o.value) + '"' + (o.selected ? ' selected' : '') + '>' + esc(o.label) + '</option>';
        }).join('') + '</select>' + icon('chevronDown') + '</div>';
    } else if (opts.type === 'textarea') {
      control = '<textarea id="' + id + '" name="' + name + '" rows="6" placeholder="' + esc(t('form.placeholder.message')) + '"' + req + '>' + esc(opts.value || '') + '</textarea>';
    } else {
      control = '<input id="' + id + '" name="' + name + '" type="' + (opts.type || 'text') + '" placeholder="' + esc(t('form.placeholder')) + '"' +
        (opts.autocomplete ? ' autocomplete="' + opts.autocomplete + '"' : '') +
        (opts.inputmode ? ' inputmode="' + opts.inputmode + '"' : '') +
        (opts.pattern ? ' pattern="' + opts.pattern + '"' : '') + req + '>';
    }
    return '<div class="field' + (opts.cls ? ' ' + opts.cls : '') + '"><label for="' + id + '">' + esc(t(labelKey)) + star + '</label>' + control + '</div>';
  }

  function consentField(prefix) {
    var link = '<a href="datenschutz.html" target="_blank" rel="noopener">' + esc(t('form.consent.link')) + '</a>';
    return '<label class="checkbox checkbox--consent"><input type="checkbox" name="consent" id="' + prefix + '-consent" required>' +
      '<span class="checkbox__box" aria-hidden="true">' + icon('check') + '</span>' +
      '<span>' + t('form.consent', { link: link }) + '</span></label>';
  }

  function salutationOptions() {
    return [
      { value: '', label: t('form.salutation.select'), selected: true },
      { value: t('form.salutation.mr'), label: t('form.salutation.mr') },
      { value: t('form.salutation.ms'), label: t('form.salutation.ms') },
      { value: t('form.salutation.diverse'), label: t('form.salutation.diverse') },
      { value: t('form.salutation.none'), label: t('form.salutation.none') }
    ];
  }

  // Wires validation + submission. `ctx` = { subject: string, to: email, extra: object }
  function bindForm(form, ctx) {
    form.setAttribute('novalidate', '');
    var status = form.querySelector('.form__status');
    var submit = form.querySelector('[type="submit"]');

    form.addEventListener('input', function (e) {
      var f = e.target.closest('.field, .checkbox');
      if (f && e.target.checkValidity()) f.classList.remove('is-invalid');
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var invalid = [];
      form.querySelectorAll('input, select, textarea').forEach(function (el) {
        var wrap = el.closest('.field, .checkbox');
        var ok = el.checkValidity();
        if (wrap) wrap.classList.toggle('is-invalid', !ok);
        if (!ok) invalid.push(el);
      });
      if (invalid.length) {
        showStatus('error', t('form.error'));
        invalid[0].focus();
        return;
      }

      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      delete data.consent;
      Object.assign(data, ctx.extra || {}, { language: lang });

      if (CONFIG.formEndpoint) {
        submit.disabled = true;
        submit.textContent = t('form.sending');
        fetch(CONFIG.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(Object.assign({ _subject: ctx.subject }, data))
        }).then(function (res) {
          if (!res.ok) throw new Error(res.status);
          done('success');
        }).catch(function () {
          submit.disabled = false;
          submit.textContent = t('form.submit');
          showStatus('error', t('form.failed', { email: ctx.to }));
        });
      } else {
        var labels = {};
        form.querySelectorAll('label[for]').forEach(function (lb) {
          var input = form.querySelector('#' + CSS.escape(lb.getAttribute('for')));
          if (input) labels[input.name] = lb.textContent.replace(/\s*\*$/, '');
        });
        var body = Object.keys(data).filter(function (k) { return data[k] && k !== 'language'; }).map(function (k) {
          return (labels[k] || k) + ': ' + data[k];
        }).join('\n');
        location.href = 'mailto:' + ctx.to + '?subject=' + encodeURIComponent(ctx.subject) + '&body=' + encodeURIComponent(body);
        done('mailto');
      }
    });

    function showStatus(type, msg) {
      status.hidden = false;
      status.className = 'form__status form__status--' + type;
      status.innerHTML = msg;
    }

    function done(kind) {
      var titleKey = kind === 'success' ? 'form.success.title' : 'form.mailto.title';
      var textKey = kind === 'success' ? 'form.success.text' : 'form.mailto.text';
      var panel = document.createElement('div');
      panel.className = 'form__done';
      panel.setAttribute('role', 'status');
      panel.innerHTML = '<span class="form__done-icon">' + icon('check') + '</span><h3>' + esc(t(titleKey)) + '</h3><p>' + esc(t(textKey)) + '</p>';
      form.replaceWith(panel);
    }
  }

  /* ---------- Boot ---------- */

  window.IL = {
    config: CONFIG,
    properties: PROPERTIES,
    t: t, L: L,
    get lang() { return lang; },
    onRender: onRender,
    fmtNumber: fmtNumber, fmtPrice: fmtPrice, fmtArea: fmtArea, priceLabel: priceLabel, pricePerSqm: pricePerSqm,
    unitsOf: unitsOf, priceFrom: priceFrom, areaRange: areaRange, roomsRange: roomsRange,
    areaLabel: areaLabel, roomsLabel: roomsLabel, priceSummary: priceSummary,
    esc: esc, icon: icon,
    imgUrl: imgUrl, isNew: isNew, badgeFor: badgeFor, locationLabel: locationLabel,
    propertyUrl: propertyUrl, getProperty: getProperty, cardHTML: cardHTML,
    openGallery: openGallery,
    field: field, consentField: consentField, salutationOptions: salutationOptions, bindForm: bindForm,
    observeReveals: observeReveals
  };

  document.addEventListener('DOMContentLoaded', function () {
    renderAll();
    watchHeaderShadow();
    document.documentElement.classList.add('is-ready');
  });
})();
