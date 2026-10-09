/* Property detail page: objekt.html?id=<property id> */
(function () {
  'use strict';

  var MAX_THUMBS = 5;
  var id = new URLSearchParams(location.search).get('id');
  var root = document.getElementById('property');
  var cleanup = [];

  function render() {
    cleanup.forEach(function (fn) { fn(); });
    cleanup = [];

    var p = IL.getProperty(id);
    if (!p) return renderNotFound();

    var t = IL.t, L = IL.L, esc = IL.esc, icon = IL.icon;
    document.title = L(p.title) + ' — ImmoLux Germany';
    setMeta('description', L(p.teaser));

    var agent = IL.config.agents[p.agent] || null;
    var units = IL.unitsOf(p);
    var multi = units.length > 1;

    // One gallery for the whole page: building photos first, then each apartment's photos.
    var images = [];
    var addImages = function (list, unit) {
      (list || []).forEach(function (img) {
        images.push({
          src: IL.imgUrl(p, img), thumb: IL.imgUrl(p, img, true), kind: img.kind,
          alt: (unit ? unit.ref + ' · ' : '') + L(img.alt),
          unit: unit ? unit.id : null
        });
      });
    };
    addImages(p.images, null);
    units.forEach(function (u) { addImages(u.images, u); });
    var indexOfImage = {};
    images.forEach(function (img, i) { indexOfImage[img.src] = i; });

    var floorplans = images.map(function (img, i) { return { img: img, index: i }; })
      .filter(function (x) { return x.img.kind === 'floorplan'; });

    // Position of this property in the default (newest first) listing order, for prev/next.
    var order = IL.properties.slice().sort(function (a, b) { return (b.listedAt || '').localeCompare(a.listedAt || ''); });
    var pos = order.indexOf(p);
    var prev = order[pos - 1], next = order[pos + 1];
    var pagerLink = function (target, iconName, labelKey) {
      return target
        ? '<a href="' + IL.propertyUrl(target) + '" aria-label="' + esc(t(labelKey)) + '">' + icon(iconName) + '</a>'
        : '<span class="is-disabled" aria-hidden="true">' + icon(iconName) + '</span>';
    };

    var ppsqm = multi ? null : IL.pricePerSqm(p);
    var roomsHeading = t('unit.rooms').replace(/^./, function (c) { return c.toUpperCase(); });
    var rr = IL.roomsRange(p);
    var stats = (multi ? [
      { value: IL.priceSummary(p), label: t(p.marketing === 'rent' ? 'price.rent' : 'price.buy') },
      IL.areaLabel(p) ? { value: IL.areaLabel(p), label: t('unit.living') } : null,
      rr ? { value: rr.same ? IL.fmtNumber(rr.min) : IL.fmtNumber(rr.min) + '\u2009–\u2009' + IL.fmtNumber(rr.max), label: roomsHeading } : null,
      { value: IL.fmtNumber(units.length), label: t('units.short') }
    ] : [
      { value: IL.priceSummary(p), label: t(p.marketing === 'rent' ? 'price.rent' : 'price.buy') },
      IL.areaLabel(p) ? { value: IL.areaLabel(p), label: t('unit.living') } : null,
      rr ? { value: IL.fmtNumber(rr.min), label: roomsHeading } : null,
      ppsqm && p.marketing === 'buy' ? { value: IL.fmtPrice(ppsqm), label: t('price.perSqm') } : null
    ]).filter(Boolean);

    // Thumbnails: images after the cover, the last one carries "+N" when more exist.
    var rest = images.slice(1);
    var thumbs = rest.slice(0, MAX_THUMBS).map(function (img, i) {
      var index = i + 1;
      var more = (i === MAX_THUMBS - 1 && rest.length > MAX_THUMBS) ? rest.length - MAX_THUMBS + 1 : 0;
      return '<button type="button" class="thumb" data-gallery="' + index + '" aria-label="' + esc(img.alt) + '">' +
        '<img src="' + img.thumb + '" alt="" loading="lazy">' +
        (more ? '<span class="thumb__more">+' + more + '</span>' : '') + '</button>';
    }).join('');

    var hasMap = p.location && typeof p.location.lat === 'number' && typeof p.location.lng === 'number';
    var tabs = [
      ['objekt', 'prop.tab.property'],
      ['daten', 'prop.tab.facts'],
      units.length ? ['einheiten', 'prop.tab.units'] : null,
      p.highlights ? ['ausstattung', 'prop.tab.features'] : null,
      floorplans.length ? ['grundriss', 'prop.tab.floorplan'] : null,
      ['lage', 'prop.tab.location']
    ].filter(Boolean);

    var factsRows =
      '<tr class="facts__price"><th scope="row">' + esc(stats[0].label) + '</th><td>' + esc(stats[0].value) + '</td></tr>' +
      (ppsqm && p.marketing === 'buy' ? '<tr><th scope="row">' + esc(t('price.perSqm')) + '</th><td>' + esc(IL.fmtPrice(ppsqm)) + '</td></tr>' : '') +
      (p.facts || []).map(function (f) {
        return '<tr><th scope="row">' + esc(L(f.label)) + '</th><td>' + esc(L(f.value)) + '</td></tr>';
      }).join('') +
      '<tr><th scope="row">' + esc(t('prop.ref')) + '</th><td>' + esc(p.ref) + '</td></tr>';

    function roomsTableFor(plan, caption) {
      if (!plan || !plan.length) return '';
      var total = plan.reduce(function (sum, r) { return sum + r.area; }, 0);
      return '<table class="facts rooms-table"><caption>' + esc(caption) + '</caption>' +
        '<thead class="visually-hidden"><tr><th scope="col">' + esc(t('prop.floorplan.room')) + '</th><th scope="col">' + esc(t('prop.floorplan.area')) + '</th></tr></thead><tbody>' +
        plan.map(function (r) {
          return '<tr><th scope="row">' + esc(L(r)) + '</th><td>' + esc(IL.fmtArea(r.area, 2)) + '</td></tr>';
        }).join('') +
        '</tbody><tfoot><tr><th scope="row">' + esc(t('prop.floorplan.total')) + '</th><td>' + esc(IL.fmtArea(Math.round(total * 100) / 100, 2)) + '</td></tr></tfoot></table>';
    }

    // ---------- apartments in this building ----------
    var UNIT_THUMBS = 4;
    function unitHTML(u) {
      var photos = (u.images || []).map(function (img) { return indexOfImage[IL.imgUrl(p, img)]; })
        .filter(function (i) { return i != null; });
      var shown = photos.slice(0, UNIT_THUMBS);
      var extra = photos.length - shown.length;
      var line = [
        u.livingArea ? IL.fmtArea(u.livingArea) : null,
        u.rooms ? IL.fmtNumber(u.rooms) + ' ' + t('unit.rooms') : null,
        u.floor ? L(u.floor) : null
      ].filter(Boolean);
      var price = u.price == null ? t('price.onRequest') : IL.fmtPrice(u.price);
      return '<article class="unit" id="' + esc(u.id) + '">' +
        '<div class="unit__head">' +
          '<div>' +
            '<p class="eyebrow">' + esc(u.ref) + (u.status && u.status !== 'available' ? ' · ' + esc(t('units.status.' + u.status)) : '') + '</p>' +
            '<h3 class="unit__title">' + esc(L(u.title)) + '</h3>' +
            (line.length ? '<p class="unit__meta">' + line.map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('') + '</p>' : '') +
          '</div>' +
          '<p class="unit__price"><span>' + esc(price) + '</span><small>' + esc(t(p.marketing === 'rent' ? 'price.rent' : 'price.buy')) + '</small></p>' +
        '</div>' +
        (u.description ? '<div class="prose unit__text">' + L(u.description).map(function (para) { return '<p>' + esc(para) + '</p>'; }).join('') + '</div>' : '') +
        (shown.length ? '<div class="unit__thumbs">' + shown.map(function (idx, i) {
          var more = (i === shown.length - 1 && extra > 0) ? extra : 0;
          return '<button type="button" class="thumb" data-gallery="' + idx + '" aria-label="' + esc(images[idx].alt) + '">' +
            '<img src="' + images[idx].thumb + '" alt="" loading="lazy">' +
            (more ? '<span class="thumb__more">+' + more + '</span>' : '') + '</button>';
        }).join('') + '</div>' : '') +
        '<div class="unit__cols">' +
          (u.facts && u.facts.length ? '<table class="facts"><tbody>' + u.facts.map(function (f) {
            return '<tr><th scope="row">' + esc(L(f.label)) + '</th><td>' + esc(L(f.value)) + '</td></tr>';
          }).join('') + '</tbody></table>' : '') +
          roomsTableFor(u.roomsPlan, t('units.rooms')) +
        '</div>' +
        '<div class="unit__actions"><button type="button" class="btn btn--ghost" data-unit="' + esc(u.id) + '">' +
          esc(t('units.request')) + icon('arrowRight', 'icon--nudge') + '</button></div>' +
      '</article>';
    }

    var unitsSection = units.length
      ? '<section class="prop-section" id="einheiten"><h2 class="h2">' + esc(t('units.title')) + '</h2>' +
        '<p class="prop-section__intro">' + esc(t('units.intro')) + '</p>' +
        '<div class="units">' + units.map(unitHTML).join('') + '</div></section>'
      : '';

    var agentCard = agent ?
      '<div class="agent-card">' +
        '<p class="agent-card__label">' + esc(t('prop.contact')) + '</p>' +
        '<div class="agent">' +
          '<div class="agent__avatar">' + (agent.photo ? '<img src="' + agent.photo + '" alt="">' : esc(agent.initials)) + '</div>' +
          '<div><p class="agent__name">' + esc(agent.name) + '</p><p class="agent__role">' + esc(t('prop.contact.role')) + '</p></div>' +
        '</div>' +
        '<div class="agent-card__lines">' +
          '<a href="tel:' + agent.phoneHref + '" aria-label="' + esc(t('contact.phoneCompany') + ': ' + agent.phone) + '">' + icon('phone') +
            '<span><small>' + esc(t('contact.phoneCompany')) + '</small>' + esc(agent.phone) + '</span></a>' +
          '<a href="mailto:' + agent.email + '?subject=' + encodeURIComponent(L(p.title) + ' (' + p.ref + ')') + '">' + icon('mail') + esc(agent.email) + '</a>' +
        '</div>' +
        '<p class="agent-card__ref">' + esc(t('prop.ref')) + ' ' + esc(p.ref) + '</p>' +
        '<div class="agent-card__actions">' +
          '<a class="btn btn--primary" href="#expose">' + esc(t('prop.request')) + icon('arrowRight', 'icon--nudge') + '</a>' +
          '<a class="btn btn--ghost" href="tel:' + agent.phoneHref + '" aria-label="' + esc(t('prop.contact.callCompany')) + '">' + icon('phone') + esc(t('prop.contact.call')) + '</a>' +
        '</div>' +
      '</div>' : '';

    root.innerHTML =
      '<section class="prop-hero">' +
        '<div class="prop-hero__content">' +
          '<div class="crumbs">' +
            '<a class="crumbs__back" href="immobilien.html">' + icon('chevronLeft') + esc(t('prop.back')) + '</a>' +
            '<div class="crumbs__pager"><span><b>' + (pos + 1) + '</b> / ' + order.length + '</span>' +
              pagerLink(prev, 'arrowLeft', 'prop.prev') + pagerLink(next, 'arrowRight', 'prop.next') + '</div>' +
          '</div>' +
          '<div class="stagger">' +
            '<p class="eyebrow">' + esc(IL.locationLabel(p)) + (p.newBuild ? ' · ' + esc(t('badge.newBuild')) : '') + '</p>' +
            '<h1 class="prop-title">' + esc(L(p.title)) + '</h1>' +
            '<dl class="stats">' + stats.map(function (s) {
              return '<div class="stat"><dt class="stat__label">' + esc(s.label) + '</dt><dd class="stat__value">' + esc(s.value) + '</dd></div>';
            }).join('') + '</dl>' +
            '<div class="prop-actions">' +
              '<a class="btn btn--primary" href="#expose">' + esc(t('prop.request')) + '</a>' +
              '<button type="button" class="icon-btn" data-share aria-label="' + esc(t('prop.share')) + '">' + icon('share') + '</button>' +
              '<span class="share-note" aria-live="polite"></span>' +
            '</div>' +
          '</div>' +
          '<a class="scroll-down" href="#details" aria-label="' + esc(t('prop.scroll')) + '">' + icon('arrowDown') + '</a>' +
        '</div>' +
        '<div class="prop-hero__media">' +
          '<button type="button" class="prop-cover" data-gallery="0" aria-label="' + esc(t('prop.photos')) + '">' +
            '<img src="' + images[0].src + '" alt="' + esc(images[0].alt) + '" fetchpriority="high">' +
            '<span class="prop-cover__count">' + icon('grid') + esc(t('prop.photoCount', { n: images.length })) + '</span>' +
          '</button>' +
          (thumbs ? '<div class="thumbs">' + thumbs + '</div>' : '') +
        '</div>' +
      '</section>' +

      '<div class="container prop-body" id="details">' +
        '<div>' +
          '<div class="tabs-wrap"><nav class="tabs" aria-label="' + esc(L(p.title)) + '">' + tabs.map(function (tab, i) {
            return '<a href="#' + tab[0] + '"' + (i === 0 ? ' class="is-active"' : '') + '>' + esc(t(tab[1])) + '</a>';
          }).join('') + '</nav></div>' +

          '<section class="prop-section prose" id="objekt">' +
            L(p.description).map(function (para) { return '<p>' + esc(para) + '</p>'; }).join('') +
          '</section>' +

          '<section class="prop-section" id="daten"><h2 class="h2">' + esc(t('prop.facts.title')) + '</h2>' +
            '<table class="facts"><tbody>' + factsRows + '</tbody></table></section>' +

          unitsSection +

          (p.highlights ? '<section class="prop-section" id="ausstattung"><h2 class="h2">' + esc(t('prop.features.title')) + '</h2>' +
            '<ul class="dash-list">' + L(p.highlights).map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('') + '</ul></section>' : '') +

          (floorplans.length ? '<section class="prop-section" id="grundriss"><h2 class="h2">' + esc(t('prop.floorplan.title')) + '</h2>' +
            '<div class="floorplans">' + floorplans.map(function (f) {
              return '<button type="button" class="floorplan" data-gallery="' + f.index + '"><img src="' + f.img.thumb + '" alt="' + esc(f.img.alt) + '" loading="lazy"><span>' + esc(f.img.alt) + '</span></button>';
            }).join('') + '</div></section>' : '') +

          '<section class="prop-section" id="lage"><h2 class="h2">' + esc(t('prop.location.title')) + '</h2>' +
            '<div class="prose">' + L(p.locationText).map(function (para) { return '<p>' + esc(para) + '</p>'; }).join('') + '</div>' +
            (hasMap ?
              '<div class="map" id="map">' +
                '<div class="map__consent"><div>' +
                  '<span class="map__pin" aria-hidden="true"><span></span></span>' +
                  '<p class="eyebrow">' + esc((p.location.postcode ? p.location.postcode + ' ' : '') + IL.locationLabel(p)) + '</p>' +
                  '<p>' + esc(t('prop.map.consent')) + '</p>' +
                  '<button type="button" class="btn btn--green map__btn" data-load-map>' + esc(t('prop.map.load')) + '</button>' +
                '</div></div>' +
              '</div>' +
              '<p class="map-note">' + esc(t('prop.map.note')) + '</p>' : '') +
          '</section>' +
        '</div>' +
        '<aside>' + agentCard + '</aside>' +
      '</div>' +

      '<section class="form-section" id="expose">' +
        '<div class="form-section__bg shade"><img src="assets/img/site/form-bg.jpg" alt="" loading="lazy"></div>' +
        '<div class="container"><div class="form-card reveal">' +
          '<h2 class="form-card__title">' + esc(t('form.expose.title')) + '</h2>' +
          '<p class="form-card__intro">' + esc(L(p.title)) + ' · ' + esc(p.ref) + ' — ' + esc(t('form.expose.intro')) + '</p>' +
          '<form class="form" id="expose-form">' +
            '<div class="form__grid">' +
              (units.length ? IL.field('unit', 'form.unit', {
                prefix: 'ex', type: 'select', cls: 'field--full',
                options: [{ value: '', label: t('form.unit.any'), selected: true }].concat(units.map(function (u) {
                  return { value: u.ref + ' — ' + L(u.title), label: u.ref + ' — ' + L(u.title) };
                }))
              }) : '') +
              IL.field('salutation', 'form.salutation', { prefix: 'ex', type: 'select', required: true, options: IL.salutationOptions(), cls: 'field--half' }) +
              IL.field('title', 'form.title', { prefix: 'ex', cls: 'field--half', autocomplete: 'honorific-prefix' }) +
              IL.field('firstName', 'form.firstName', { prefix: 'ex', required: true, cls: 'field--half', autocomplete: 'given-name' }) +
              IL.field('lastName', 'form.lastName', { prefix: 'ex', required: true, cls: 'field--half', autocomplete: 'family-name' }) +
              IL.field('email', 'form.email', { prefix: 'ex', type: 'email', required: true, cls: 'field--half', autocomplete: 'email' }) +
              IL.field('phone', 'form.phone', { prefix: 'ex', type: 'tel', required: true, cls: 'field--half', autocomplete: 'tel' }) +
              IL.field('street', 'form.street', { prefix: 'ex', required: true, cls: 'field--half', autocomplete: 'street-address' }) +
              IL.field('postcode', 'form.postcode', { prefix: 'ex', required: true, cls: 'field--quarter', autocomplete: 'postal-code', inputmode: 'numeric' }) +
              IL.field('city', 'form.city', { prefix: 'ex', required: true, cls: 'field--quarter', autocomplete: 'address-level2' }) +
              IL.field('message', 'form.message', { prefix: 'ex', type: 'textarea', cls: 'field--full' }) +
            '</div>' +
            '<p class="form__note">' + esc(t('form.required')) + '</p>' +
            IL.consentField('ex') +
            '<div class="form__status" hidden role="alert"></div>' +
            '<div class="form__actions"><button type="submit" class="btn btn--primary">' + esc(t('form.submit')) + '</button></div>' +
          '</form>' +
        '</div></div>' +
      '</section>' +

      (agent ? '<div class="action-bar">' +
        '<a class="btn btn--primary" href="#expose">' + esc(t('prop.request')) + '</a>' +
        '<a class="btn btn--ghost" href="tel:' + agent.phoneHref + '" aria-label="' + esc(t('prop.contact.callCompany')) + '">' + icon('phone') + '</a>' +
      '</div>' : '');

    // Gallery
    root.querySelectorAll('[data-gallery]').forEach(function (el) {
      el.addEventListener('click', function () { IL.openGallery(images, Number(el.getAttribute('data-gallery'))); });
    });

    // Share
    var note = root.querySelector('.share-note');
    root.querySelector('[data-share]').addEventListener('click', function () {
      var data = { title: L(p.title), text: L(p.teaser), url: location.href };
      if (navigator.share) { navigator.share(data).catch(function () {}); return; }
      var copied = function () {
        note.textContent = t('prop.shared');
        note.classList.add('is-shown');
        setTimeout(function () { note.classList.remove('is-shown'); }, 2200);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(copied, function () {});
    });

    // Unit buttons: preselect the apartment in the form, then jump to it
    root.querySelectorAll('[data-unit]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var u = units.filter(function (x) { return x.id === btn.getAttribute('data-unit'); })[0];
        var select = root.querySelector('#ex-unit');
        if (u && select) select.value = u.ref + ' — ' + L(u.title);
        var form = document.getElementById('expose');
        if (form) form.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Map (Leaflet + OSM tiles, loaded only after consent — DSGVO)
    var map = root.querySelector('#map');
    var mapBtn = root.querySelector('[data-load-map]');
    if (mapBtn) mapBtn.addEventListener('click', function () {
      var btn = this;
      btn.disabled = true;
      loadLeaflet().then(function () {
        map.innerHTML = '<div class="map__canvas" role="region" aria-label="' + esc(t('prop.map.title')) + '"></div>';
        drawMap(map.querySelector('.map__canvas'), p);
      }, function () { btn.disabled = false; });
    });

    // Form
    IL.bindForm(root.querySelector('#expose-form'), {
      subject: t('form.expose.title') + ': ' + L(p.title) + ' (' + p.ref + ')',
      to: agent ? agent.email : IL.config.contact.email,
      extra: { property: L(p.title), propertyId: p.id, ref: p.ref, url: location.href }
    });

    setupScrollSpy(tabs.map(function (tab) { return tab[0]; }));
    setupActionBar();
  }

  function setupScrollSpy(ids) {
    var links = root.querySelectorAll('.tabs a');
    var sections = ids.map(function (x) { return document.getElementById(x); }).filter(Boolean);
    if (!sections.length) return;
    var ticking = false;
    var update = function () {
      ticking = false;
      var line = window.innerHeight * 0.35;
      var current = sections[0].id;
      sections.forEach(function (sec) { if (sec.getBoundingClientRect().top <= line) current = sec.id; });
      links.forEach(function (a) {
        var on = a.getAttribute('href') === '#' + current;
        a.classList.toggle('is-active', on);
        if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
        if (on && a !== lastActive) {
          lastActive = a;
          var bar = a.parentElement;
          bar.scrollTo({ left: a.offsetLeft - (bar.clientWidth - a.offsetWidth) / 2, behavior: 'smooth' });
        }
      });
    };
    var lastActive = null;
    var onScroll = function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    cleanup.push(function () { window.removeEventListener('scroll', onScroll); });
  }

  function setupActionBar() {
    var bar = root.querySelector('.action-bar');
    var form = document.getElementById('expose');
    if (!bar || !form) return;
    var onScroll = function () {
      var formTop = form.getBoundingClientRect().top;
      bar.classList.toggle('is-shown', window.scrollY > 500 && formTop > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    cleanup.push(function () { window.removeEventListener('scroll', onScroll); });
  }

  var leafletPromise = null;
  function loadLeaflet() {
    if (window.L && window.L.map) return Promise.resolve();
    if (leafletPromise) return leafletPromise;
    leafletPromise = new Promise(function (resolve, reject) {
      var css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = 'assets/vendor/leaflet/leaflet.css';
      document.head.appendChild(css);
      var js = document.createElement('script');
      js.src = 'assets/vendor/leaflet/leaflet.js';
      js.onload = resolve;
      js.onerror = function () { leafletPromise = null; reject(); };
      document.head.appendChild(js);
    });
    return leafletPromise;
  }

  // Shows the district only: an area circle around the approximate coordinates, never the exact address.
  function drawMap(el, p) {
    var center = [p.location.lat, p.location.lng];
    var m = window.L.map(el, { center: center, zoom: 14, scrollWheelZoom: false, attributionControl: true });
    window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'
    }).addTo(m);
    var area = window.L.circle(center, { radius: 650, color: '#f57417', weight: 1.5, fillColor: '#f57417', fillOpacity: 0.16 }).addTo(m);
    window.L.circleMarker(center, { radius: 7, color: '#fff', weight: 3, fillColor: '#f57417', fillOpacity: 1 }).addTo(m);
    m.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noopener">Leaflet</a>');
    // Size can settle after layout/fonts; re-measure, then fit the area circle (zoom 14 max) into the box.
    var fit = function () { m.invalidateSize(); m.fitBounds(area.getBounds(), { padding: [40, 40], maxZoom: 14 }); };
    fit();
    setTimeout(fit, 60);
    cleanup.push(function () { m.remove(); });
  }

  function setMeta(name, content) {
    var m = document.querySelector('meta[name="' + name + '"]');
    if (m && content) m.setAttribute('content', content);
  }

  function renderNotFound() {
    document.title = IL.t('meta.notfound');
    root.innerHTML = '<div class="container notfound">' +
      '<h1 class="display h2">' + IL.esc(IL.t('prop.notfound.title')) + '</h1>' +
      '<p>' + IL.esc(IL.t('prop.notfound.text')) + '</p>' +
      '<a class="btn btn--green" href="immobilien.html">' + IL.esc(IL.t('prop.back')) + '</a></div>';
  }

  IL.onRender(render);
})();
