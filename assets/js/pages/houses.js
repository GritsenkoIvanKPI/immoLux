/* Modular homes page (modulhaeuser.html).
   All texts are bilingual: { de: ..., en: ... }. Photos live in assets/img/houses/
   (large image + "thumb-" copy), videos in assets/video/houses/ (mp4 + jpg poster). */
(function () {
  'use strict';

  var IMG = 'assets/img/houses/';
  var VID = 'assets/video/houses/';

  var C = {
    eyebrow: { de: 'SIP-Bauweise · Schlüsselfertig', en: 'SIP construction · Turnkey' },
    title: { de: 'Modulhäuser', en: 'Modular homes' },
    lead: {
      de: 'Moderne, energieeffiziente Häuser aus SIP-Paneelen — von der Planung bis zur schlüsselfertigen Übergabe in nur 2–3 Monaten.',
      en: 'Modern, energy-efficient homes built from SIP panels — from planning to turnkey handover in just 2–3 months.'
    },
    ctaEnquire: { de: 'Projekt anfragen', en: 'Enquire about a project' },
    ctaBrochure: { de: 'Prospekt ansehen', en: 'View brochure' },

    benefitsEyebrow: { de: 'Warum SIP', en: 'Why SIP' },
    benefitsTitle: { de: 'Moderne Technologie. Hoher Wohnkomfort.', en: 'Modern technology. High living comfort.' },
    benefits: [
      { title: { de: 'Schnelle Bauzeit', en: 'Fast build time' }, text: { de: 'Ihr Haus in nur 2–3 Monaten — vom Fundament bis zur Übergabe.', en: 'Your home in just 2–3 months — from foundation to handover.' } },
      { title: { de: 'Energieeffizient', en: 'Energy-efficient' }, text: { de: '200 mm Graphit-EPS-Dämmung: niedrige Heizkosten, höchster Komfort.', en: '200 mm graphite EPS insulation: low heating costs, maximum comfort.' } },
      { title: { de: 'Stabile Konstruktion', en: 'Solid construction' }, text: { de: 'SIP-Paneele sind stark, langlebig und sicher.', en: 'SIP panels are strong, durable and safe.' } },
      { title: { de: 'Attraktiver Preis', en: 'Attractive price' }, text: { de: 'Besser als vergleichbare lokale Marktangebote.', en: 'Better value than comparable local offers.' } },
      { title: { de: 'EU-Zertifikate', en: 'EU certificates' }, text: { de: 'Alle notwendigen Zulassungen vorhanden.', en: 'All necessary approvals in place.' } },
      { title: { de: 'Komplettservice', en: 'Full service' }, text: { de: 'Von der Planung bis zur schlüsselfertigen Übergabe — Lieferung und Montage in ganz Europa.', en: 'From planning to turnkey handover — delivery and assembly throughout Europe.' } }
    ],

    typesEyebrow: { de: 'Individuelle Projekte', en: 'Individual projects' },
    typesTitle: { de: 'Häuser für Ihre Bedürfnisse', en: 'Homes for your needs' },
    typesText: {
      de: 'Jedes Haus wird nach Ihren Wünschen geplant — flexibel, funktional und modern.',
      en: 'Every home is planned around your wishes — flexible, functional and modern.'
    },
    types: [
      { name: { de: 'Bungalow', en: 'Bungalow' }, size: { de: 'z. B. 80 m²', en: 'e.g. 80 m²' }, text: { de: 'Wohnen auf einer Ebene, barrierearm und mit großen Fensterflächen.', en: 'Single-level living, low-barrier and with large windows.' } },
      { name: { de: 'Zweistöckiges Haus', en: 'Two-storey house' }, size: { de: 'z. B. 160 m²', en: 'e.g. 160 m²' }, text: { de: 'Viel Platz für die Familie auf zwei Etagen.', en: 'Plenty of room for the family over two floors.' } },
      { name: { de: 'Ferienhaus', en: 'Holiday home' }, size: { de: 'ab 50 m²', en: 'from 50 m²' }, text: { de: 'Kompakt, gemütlich und schnell aufgebaut — auch als Kapitalanlage.', en: 'Compact, cosy and quick to build — also as an investment.' } },
      { name: { de: 'Einfamilienhaus', en: 'Detached house' }, size: { de: 'nach Planung', en: 'as planned' }, text: { de: 'Kompakte und moderne Designs, individuell geplant.', en: 'Compact and modern designs, individually planned.' } }
    ],

    exampleEyebrow: { de: 'Beispielprojekt', en: 'Example project' },
    exampleTitle: { de: 'Haus mit Galerie, 50 m²', en: 'House with gallery, 50 m²' },
    exampleFacts: [
      [{ de: 'Wohnfläche', en: 'Living area' }, { de: '50 m² (Erdgeschoss 32 m² + Dachgeschoss/Galerie 18 m²)', en: '50 m² (ground floor 32 m² + attic/gallery 18 m²)' }],
      [{ de: 'Grundfläche', en: 'Footprint' }, { de: '4 × 8 m', en: '4 × 8 m' }],
      [{ de: 'Höhe', en: 'Height' }, { de: 'Wandhöhe 3 m, Gesamthöhe 6 m', en: 'Wall height 3 m, total height 6 m' }],
      [{ de: 'Dach', en: 'Roof' }, { de: 'Satteldach: SIP-Dachpaneele + Metalldachziegel', en: 'Gable roof: SIP roof panels + metal roof tiles' }]
    ],
    exampleImgAlt: { de: 'Visualisierung eines Ferienhauses mit Satteldach und Terrasse', en: 'Visualisation of a holiday home with gable roof and terrace' },
    visual: { de: 'Visualisierung', en: 'Visualisation' },

    buildEyebrow: { de: 'Bauablauf', en: 'Construction' },
    buildTitle: { de: 'Vom Fundament zum fertigen Haus', en: 'From foundation to finished home' },
    buildText: {
      de: 'Echte Baustellen unserer Partner: Bodenplatte, Montage der SIP-Paneele und das fertige Haus im Vorher-Nachher-Vergleich.',
      en: 'Real building sites of our partners: foundation slab, assembly of the SIP panels and the finished home before and after.'
    },
    steps: [
      { video: '01-fundament', label: { de: 'Fundament: Bewehrung und Betonage der Bodenplatte', en: 'Foundation: reinforcement and pouring the slab' } },
      { video: '02-wandmontage', label: { de: 'Montage der SIP-Wandpaneele', en: 'Assembly of the SIP wall panels' } }
    ],
    beforeAfter: { de: 'Rohbau und fertiges Haus', en: 'Shell and finished home' },
    beforeAfterVideos: ['03-vorher-nachher', '04-vorher-nachher', '05-vorher-nachher', '06-vorher-nachher'],
    play: { de: 'Video abspielen', en: 'Play video' },
    pause: { de: 'Video anhalten', en: 'Pause video' },

    photos: [
      { src: 'bungalow-fertig.jpg', alt: { de: 'Fertiger Bungalow in SIP-Bauweise', en: 'Finished bungalow in SIP construction' } },
      { src: 'sip-rohbau-luftbild.jpg', alt: { de: 'SIP-Rohbau von oben: Wände und Raumaufteilung', en: 'SIP shell from above: walls and room layout' } },
      { src: 'objekt-fertig.jpg', alt: { de: 'Fertiggestelltes Gebäude', en: 'Completed building' } }
    ],
    photosTitle: { de: 'Realisierte Projekte', en: 'Completed projects' },

    specEyebrow: { de: 'Technik', en: 'Technology' },
    specTitle: { de: 'Technische Eigenschaften der SIP-Paneele', en: 'Technical properties of the SIP panels' },
    specParam: { de: 'Parameter', en: 'Parameter' },
    specValue: { de: 'Spezifikation', en: 'Specification' },
    spec: [
      [{ de: 'Paneeltyp', en: 'Panel type' }, { de: 'SIP (Structural Insulated Panel)', en: 'SIP (Structural Insulated Panel)' }],
      [{ de: 'Äußere Beplankung', en: 'Outer sheathing' }, { de: 'OSB – 12 mm', en: 'OSB – 12 mm' }],
      [{ de: 'Dämmstoff', en: 'Insulation' }, { de: 'Graphit-EPS', en: 'Graphite EPS' }],
      [{ de: 'Dämmstoffdicke', en: 'Insulation thickness' }, { de: '200 mm', en: '200 mm' }],
      [{ de: 'Innere Beplankung', en: 'Inner sheathing' }, { de: 'OSB – 12 mm', en: 'OSB – 12 mm' }],
      [{ de: 'Gesamtdicke des Paneels', en: 'Total panel thickness' }, { de: '224 mm', en: '224 mm' }],
      [{ de: 'Wärmeleitfähigkeit des Dämmstoffs (λ)', en: 'Thermal conductivity of the insulation (λ)' }, { de: 'Laut Herstellerdatenblatt', en: 'According to the manufacturer’s data sheet' }],
      [{ de: 'Wärmedurchlasswiderstand des Dämmstoffs (R)', en: 'Thermal resistance of the insulation (R)' }, { de: 'Berechnungswert, abhängig von λ', en: 'Calculated value, depending on λ' }],
      [{ de: 'Tragfähigkeit', en: 'Load-bearing capacity' }, { de: 'Gemäß statischer Berechnung', en: 'According to the structural calculation' }],
      [{ de: 'Anwendungsbereiche', en: 'Applications' }, { de: 'Wände, Decken und Dachkonstruktionen – gemäß Planung', en: 'Walls, ceilings and roof structures – as planned' }],
      [{ de: 'Zertifikate und technische Dokumentation', en: 'Certificates and technical documentation' }, { de: 'Entsprechend den tatsächlich vorliegenden Unterlagen', en: 'According to the documents actually available' }]
    ],
    layers: [
      { mm: '12', name: { de: 'OSB', en: 'OSB' } },
      { mm: '200', name: { de: 'Graphit-EPS', en: 'Graphite EPS' } },
      { mm: '12', name: { de: 'OSB', en: 'OSB' } }
    ],
    layersCaption: { de: 'Aufbau des Paneels, Gesamtdicke 224 mm', en: 'Panel build-up, total thickness 224 mm' },

    villageEyebrow: { de: 'Siedlungslösungen', en: 'Settlement solutions' },
    villageTitle: { de: 'Ganze Siedlungen in naturnaher Lage', en: 'Entire settlements in natural surroundings' },
    villageText: {
      de: 'Wir planen auch komplette Siedlungen — zum Beispiel 30 Häuser mit Infrastruktur, Erholungsflächen und kontrollierter Zufahrt.',
      en: 'We also plan complete settlements — for example 30 homes with infrastructure, recreation areas and controlled access.'
    },
    villageImgAlt: { de: 'Visualisierung einer Siedlung mit Ferienhäusern am See', en: 'Visualisation of a settlement of holiday homes by a lake' },
    concepts: [
      {
        name: { de: 'Konzept A · Familiensiedlung', en: 'Concept A · Family settlement' },
        stats: [
          ['30', { de: 'Häuser', en: 'homes' }],
          ['100–120 m²', { de: 'Wohnfläche je Haus', en: 'living area per home' }],
          ['6–8 Ar', { de: 'Grundstück je Haus', en: 'plot per home' }],
          ['≈ 3,0 ha', { de: 'Gesamtfläche', en: 'total area' }]
        ],
        features: { de: ['Kinderspielplatz und Erholungszone', 'Parkplatz', 'Bewachung und Zufahrtskontrolle', 'Teich und Grünanlagen'], en: ['Children’s playground and recreation area', 'Parking', 'Security and access control', 'Pond and green spaces'] }
      },
      {
        name: { de: 'Konzept B · Feriensiedlung am Hang', en: 'Concept B · Hillside holiday settlement' },
        stats: [
          ['30', { de: 'Häuser', en: 'homes' }],
          ['50–70 m²', { de: 'Wohnfläche je Haus', en: 'living area per home' }],
          ['4–7 Ar', { de: 'Grundstück je Haus', en: 'plot per home' }]
        ],
        features: { de: ['Natürliche Landschaft und Hanglage', 'Asphaltierte Wege, Parkplatz an jedem Haus', 'Erholungszone am Teich, Kinderspielplatz', 'Bewachung, Zufahrtskontrolle, Grünanlagen'], en: ['Natural landscape and hillside setting', 'Asphalt roads, parking at every home', 'Recreation area by the pond, children’s playground', 'Security, access control, green spaces'] }
      }
    ],

    brochureTitle: { de: 'Prospekt: SIP-Häuser schlüsselfertig', en: 'Brochure: turnkey SIP homes' },
    brochureText: { de: 'Alle Vorteile, Haustypen und das Beispielprojekt auf einen Blick.', en: 'All benefits, house types and the example project at a glance.' },
    brochureAlt: { de: 'Prospekt SIP-Häuser schlüsselfertig', en: 'Brochure: turnkey SIP homes' },

    ctaTitle: { de: 'Ihr Traumhaus wird Wirklichkeit.', en: 'Your dream home becomes reality.' },
    ctaText: { de: 'Erzählen Sie uns von Ihrem Vorhaben — wir beraten Sie gerne und erstellen ein individuelles Angebot.', en: 'Tell us about your plans — we will be happy to advise you and prepare an individual offer.' }
  };

  var root = document.getElementById('houses');
  var videoObserver = null;
  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  IL.onRender(function () {
    var t = IL.t, L = IL.L, esc = IL.esc, icon = IL.icon;
    var p = function (s) { return '<p>' + esc(L(s)) + '</p>'; };
    var num = function (i) { return (i < 9 ? '0' : '') + (i + 1); };

    function videoHTML(name, label, cls) {
      return '<figure class="clip' + (cls ? ' ' + cls : '') + '">' +
        '<div class="clip__media">' +
          '<video muted loop playsinline preload="none" poster="' + VID + name + '.jpg" aria-label="' + esc(label) + '">' +
            '<source src="' + VID + name + '.mp4" type="video/mp4"></video>' +
          '<button type="button" class="clip__toggle" data-toggle aria-label="' + esc(L(C.play)) + '">' +
            '<svg class="icon icon--play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z"/></svg>' +
            '<svg class="icon icon--pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 5.5v13M15.5 5.5v13"/></svg>' +
          '</button>' +
        '</div>' +
        (cls === 'clip--step' ? '<figcaption>' + esc(label) + '</figcaption>' : '') +
      '</figure>';
    }

    var gallery = [
      { src: IMG + 'ferienhaus-visualisierung.jpg', alt: L(C.exampleImgAlt) }
    ].concat(C.photos.map(function (ph) { return { src: IMG + ph.src, alt: L(ph.alt) }; }))
     .concat([{ src: IMG + 'siedlung-visualisierung.jpg', alt: L(C.villageImgAlt) }, { src: IMG + 'prospekt-sip-haeuser.jpg', alt: L(C.brochureAlt) }]);
    var gIndex = function (file) {
      for (var i = 0; i < gallery.length; i++) if (gallery[i].src === IMG + file) return i;
      return 0;
    };

    root.innerHTML =
      // ---------- Hero ----------
      '<section class="houses-hero">' +
        '<div class="houses-hero__media shade" aria-hidden="true"><img src="' + IMG + 'bungalow-fertig.jpg" alt="" width="1280" height="960" fetchpriority="high"><div class="grain"></div></div>' +
        '<div class="container houses-hero__content stagger">' +
          '<p class="eyebrow eyebrow--light">' + esc(L(C.eyebrow)) + '</p>' +
          '<h1 class="display h1">' + esc(L(C.title)) + '</h1>' +
          '<p class="houses-hero__lead">' + esc(L(C.lead)) + '</p>' +
          '<div class="houses-hero__actions">' +
            '<a class="btn btn--primary" href="kontakt.html?subject=house">' + esc(L(C.ctaEnquire)) + icon('arrowRight', 'icon--nudge') + '</a>' +
            '<button type="button" class="btn btn--ghost-light" data-gallery="' + gIndex('prospekt-sip-haeuser.jpg') + '">' + esc(L(C.ctaBrochure)) + '</button>' +
          '</div>' +
        '</div>' +
      '</section>' +

      // ---------- Benefits ----------
      '<section class="section">' +
        '<div class="container">' +
          '<div class="section__head"><div><p class="eyebrow">' + esc(L(C.benefitsEyebrow)) + '</p><h2 class="h2">' + esc(L(C.benefitsTitle)) + '</h2></div></div>' +
          '<div class="values values--six">' + C.benefits.map(function (b, i) {
            return '<div class="value reveal"><span class="value__num">' + num(i) + '</span><h3>' + esc(L(b.title)) + '</h3>' + p(b.text) + '</div>';
          }).join('') + '</div>' +
        '</div>' +
      '</section>' +

      // ---------- Types + example project ----------
      '<section class="section section--surface">' +
        '<div class="container">' +
          '<div class="section__head"><div><p class="eyebrow">' + esc(L(C.typesEyebrow)) + '</p><h2 class="h2">' + esc(L(C.typesTitle)) + '</h2>' +
            '<p class="section__lead">' + esc(L(C.typesText)) + '</p></div></div>' +
          '<ul class="house-types">' + C.types.map(function (ty) {
            return '<li class="house-type reveal"><p class="house-type__size">' + esc(L(ty.size)) + '</p><h3>' + esc(L(ty.name)) + '</h3>' + p(ty.text) + '</li>';
          }).join('') + '</ul>' +

          '<article class="example reveal">' +
            '<button type="button" class="example__media" data-gallery="' + gIndex('ferienhaus-visualisierung.jpg') + '" aria-label="' + esc(L(C.exampleImgAlt)) + '">' +
              '<img src="' + IMG + 'thumb-ferienhaus-visualisierung.jpg" alt="" loading="lazy" width="800" height="436">' +
              '<span class="tag">' + esc(L(C.visual)) + '</span>' +
            '</button>' +
            '<div class="example__body">' +
              '<p class="eyebrow">' + esc(L(C.exampleEyebrow)) + '</p>' +
              '<h3 class="h3">' + esc(L(C.exampleTitle)) + '</h3>' +
              '<table class="facts"><tbody>' + C.exampleFacts.map(function (f) {
                return '<tr><th scope="row">' + esc(L(f[0])) + '</th><td>' + esc(L(f[1])) + '</td></tr>';
              }).join('') + '</tbody></table>' +
            '</div>' +
          '</article>' +
        '</div>' +
      '</section>' +

      // ---------- Construction ----------
      '<section class="section">' +
        '<div class="container">' +
          '<div class="section__head"><div><p class="eyebrow">' + esc(L(C.buildEyebrow)) + '</p><h2 class="h2">' + esc(L(C.buildTitle)) + '</h2>' +
            '<p class="section__lead">' + esc(L(C.buildText)) + '</p></div></div>' +
          '<div class="build">' +
            '<div class="build__steps">' + C.steps.map(function (s, i) {
              return '<div class="reveal"><span class="value__num">' + num(i) + '</span>' + videoHTML(s.video, L(s.label), 'clip--step') + '</div>';
            }).join('') + '</div>' +
            '<div class="build__after reveal">' +
              '<p class="build__label"><span class="value__num">03</span>' + esc(L(C.beforeAfter)) + '</p>' +
              '<div class="build__grid">' + C.beforeAfterVideos.map(function (v, i) {
                return videoHTML(v, L(C.beforeAfter) + ' ' + (i + 1));
              }).join('') + '</div>' +
            '</div>' +
          '</div>' +

          '<h3 class="h3 photos__title">' + esc(L(C.photosTitle)) + '</h3>' +
          '<div class="photos">' + C.photos.map(function (ph) {
            return '<button type="button" class="photo reveal" data-gallery="' + gIndex(ph.src) + '" aria-label="' + esc(L(ph.alt)) + '">' +
              '<img src="' + IMG + 'thumb-' + ph.src + '" alt="" loading="lazy"><span class="photo__caption">' + esc(L(ph.alt)) + '</span></button>';
          }).join('') + '</div>' +
        '</div>' +
      '</section>' +

      // ---------- Technical data ----------
      '<section class="section section--surface">' +
        '<div class="container spec">' +
          '<div>' +
            '<p class="eyebrow">' + esc(L(C.specEyebrow)) + '</p>' +
            '<h2 class="h2">' + esc(L(C.specTitle)) + '</h2>' +
            '<figure class="panel reveal" aria-label="' + esc(L(C.layersCaption)) + '">' +
              '<div class="panel__layers">' + C.layers.map(function (l) {
                return '<div class="panel__layer panel__layer--' + (l.mm === '200' ? 'core' : 'osb') + '"><span>' + esc(L(l.name)) + '<b>' + l.mm + ' mm</b></span></div>';
              }).join('') + '</div>' +
              '<figcaption>' + esc(L(C.layersCaption)) + '</figcaption>' +
            '</figure>' +
          '</div>' +
          '<table class="facts spec__table reveal">' +
            '<thead class="visually-hidden"><tr><th scope="col">' + esc(L(C.specParam)) + '</th><th scope="col">' + esc(L(C.specValue)) + '</th></tr></thead><tbody>' +
            C.spec.map(function (r) { return '<tr><th scope="row">' + esc(L(r[0])) + '</th><td>' + esc(L(r[1])) + '</td></tr>'; }).join('') +
          '</tbody></table>' +
        '</div>' +
      '</section>' +

      // ---------- Settlements ----------
      '<section class="section">' +
        '<div class="container">' +
          '<div class="village">' +
            '<button type="button" class="village__media reveal" data-gallery="' + gIndex('siedlung-visualisierung.jpg') + '" aria-label="' + esc(L(C.villageImgAlt)) + '">' +
              '<img src="' + IMG + 'siedlung-visualisierung.jpg" alt="" loading="lazy" width="1280" height="698">' +
              '<span class="tag">' + esc(L(C.visual)) + '</span>' +
            '</button>' +
            '<div class="village__intro">' +
              '<p class="eyebrow">' + esc(L(C.villageEyebrow)) + '</p>' +
              '<h2 class="h2">' + esc(L(C.villageTitle)) + '</h2>' +
              '<p class="section__lead">' + esc(L(C.villageText)) + '</p>' +
            '</div>' +
          '</div>' +
          '<div class="concepts">' + C.concepts.map(function (c) {
            return '<article class="concept reveal">' +
              '<h3 class="concept__name">' + esc(L(c.name)) + '</h3>' +
              '<dl class="concept__stats">' + c.stats.map(function (s) {
                return '<div><dt>' + esc(L(s[1])) + '</dt><dd>' + esc(s[0]) + '</dd></div>';
              }).join('') + '</dl>' +
              '<ul class="dash-list">' + L(c.features).map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>' +
            '</article>';
          }).join('') + '</div>' +
        '</div>' +
      '</section>' +

      // ---------- Brochure ----------
      '<section class="section section--tight">' +
        '<div class="container">' +
          '<button type="button" class="brochure reveal" data-gallery="' + gIndex('prospekt-sip-haeuser.jpg') + '">' +
            '<span class="brochure__img"><img src="' + IMG + 'thumb-prospekt-sip-haeuser.jpg" alt="" loading="lazy" width="533" height="800"></span>' +
            '<span class="brochure__body">' +
              '<span class="brochure__title">' + esc(L(C.brochureTitle)) + '</span>' +
              '<span class="brochure__text">' + esc(L(C.brochureText)) + '</span>' +
              '<span class="link-arrow">' + esc(L(C.ctaBrochure)) + icon('arrowRight') + '</span>' +
            '</span>' +
          '</button>' +
        '</div>' +
      '</section>' +

      // ---------- CTA ----------
      '<section class="section section--tight">' +
        '<div class="container">' +
          '<div class="cta-band reveal">' +
            '<div class="cta-band__media" aria-hidden="true"><img src="' + IMG + 'ferienhaus-visualisierung.jpg" alt="" loading="lazy" width="1280" height="698"></div>' +
            '<h2>' + esc(L(C.ctaTitle)) + '</h2>' +
            '<p>' + esc(L(C.ctaText)) + '</p>' +
            '<a class="btn btn--primary" href="kontakt.html?subject=house">' + esc(L(C.ctaEnquire)) + '</a>' +
          '</div>' +
        '</div>' +
      '</section>';

    // Gallery
    root.querySelectorAll('[data-gallery]').forEach(function (el) {
      el.addEventListener('click', function () { IL.openGallery(gallery, +el.getAttribute('data-gallery')); });
    });

    // Videos: play while visible (unless reduced motion), with a play/pause toggle.
    if (videoObserver) videoObserver.disconnect();
    var clips = root.querySelectorAll('.clip');
    function setState(clip, playing) {
      clip.classList.toggle('is-playing', playing);
      clip.querySelector('[data-toggle]').setAttribute('aria-label', L(playing ? C.pause : C.play));
    }
    clips.forEach(function (clip) {
      var video = clip.querySelector('video');
      video.addEventListener('play', function () { setState(clip, true); });
      video.addEventListener('pause', function () { setState(clip, false); });
      clip.querySelector('[data-toggle]').addEventListener('click', function () {
        clip.dataset.user = video.paused ? 'play' : 'pause';
        if (video.paused) video.play().catch(function () {}); else video.pause();
      });
    });
    if (!reducedMotion && 'IntersectionObserver' in window) {
      videoObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          var clip = e.target, video = clip.querySelector('video');
          if (e.isIntersecting && clip.dataset.user !== 'pause') video.play().catch(function () {});
          else if (!e.isIntersecting) video.pause();
        });
      }, { threshold: 0.4 });
      clips.forEach(function (c) { videoObserver.observe(c); });
    }
  });
})();
