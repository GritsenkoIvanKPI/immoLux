/* ImmoLux Germany — property listings.

   To add a property:
   1. Put its photos in  assets/img/properties/<id>/  (large image + "thumb-" copy, see README.md)
   2. Copy an object below, give it a new unique `id` and fill in the fields.
   Every text field has a German (de) and English (en) version.

   Field reference
   ---------------
   id            URL slug, used as  objekt.html?id=<id>
   ref           internal reference number shown on the page
   listedAt      ISO date, used for "Neueste" sorting and the NEU badge (30 days)
   marketing     'buy' | 'rent'
   type          'apartment' | 'house' | 'plot' | 'investment' | 'commercial'
   status        'available' | 'reserved' | 'sold'
   price         number in EUR; null = "Preis auf Anfrage". Omit it when the
                 property has `units` — price, area and rooms are then derived from them.
   livingArea    m²   rooms, bathrooms   numbers
   location      city, district, postcode and approximate lat/lng (area only, never the
                 exact address). Leave lat/lng out and the map section is hidden.
   images        building/exterior photos; first image is the cover
   facts         key/value rows for the "Objektdaten" table
   highlights    bullet list for "Ausstattung"
   agent         key from IMMOLUX_CONFIG.agents

   units         Optional: several apartments in the same building, each with its own
                 photos, price and floor plan. A unit has:
                 id, ref, title, rooms, livingArea, floor, price (null = on request),
                 status, facts, roomsPlan (room list from the floor plan), images.
*/
window.IMMOLUX_PROPERTIES = [
  {
    id: 'leipzig-breitenfeld-4-zimmer',
    ref: 'IL-001',
    listedAt: '2026-09-18',
    marketing: 'buy',
    type: 'apartment',
    status: 'available',
    newBuild: true,

    location: {
      city: 'Leipzig',
      district: 'Breitenfeld',
      postcode: '04158',
      lat: 51.405,
      lng: 12.3445
    },

    title: {
      de: 'Wohnungen im Neubau – Leipzig-Breitenfeld',
      en: 'Apartments in a new building – Leipzig-Breitenfeld'
    },

    teaser: {
      de: 'Drei Eigentumswohnungen von 46 bis 101 m² in ruhiger Lage — mit Terrasse, Balkon, Stellplatz und Fußbodenheizung.',
      en: 'Three freehold apartments from 46 to 101 m² in a quiet location — with terrace, balcony, parking space and underfloor heating.'
    },

    description: {
      de: [
        'In diesem Neubau in Leipzig-Breitenfeld sind derzeit drei Eigentumswohnungen verfügbar: eine 4-Zimmer-Wohnung mit Terrasse, eine 2-Raum-Wohnung im Obergeschoss mit Balkon und eine 2-Raum-Wohnung im Dachgeschoss mit Stellplatz.',
        'Alle Wohnungen liegen in einer ruhigen und dennoch zentralen Lage. Die Wohnungen können einzeln erworben werden — ob zur Eigennutzung oder als Kapitalanlage.'
      ],
      en: [
        'Three freehold apartments are currently available in this new building in Leipzig-Breitenfeld: a 4-room apartment with a terrace, a 2-room apartment on the upper floor with a balcony, and a 2-room apartment on the top floor with a parking space.',
        'All apartments are in a quiet yet central location and can be purchased individually — whether to live in or as an investment.'
      ]
    },

    locationText: {
      de: [
        'Die Wohnungen befinden sich in einer ruhigen und dennoch zentralen Lage. Einkaufsmöglichkeiten, Schulen und öffentliche Verkehrsmittel sind in unmittelbarer Nähe und bieten eine perfekte Anbindung an das BMW- und Porsche-Werk.'
      ],
      en: [
        'The apartments are in a quiet yet central location. Shops, schools and public transport are close by and offer excellent connections to the BMW and Porsche plants.'
      ]
    },

    facts: [
      { label: { de: 'Objektart', en: 'Property type' }, value: { de: 'Eigentumswohnungen, Neubau', en: 'Freehold apartments, new build' } },
      { label: { de: 'Verfügbare Wohnungen', en: 'Available apartments' }, value: { de: '3 (einzeln erwerbbar)', en: '3 (available individually)' } },
      { label: { de: 'Wohnflächen', en: 'Living areas' }, value: { de: '46,11 m² – 100,76 m²', en: '46.11 m² – 100.76 m²' } },
      { label: { de: 'Zimmer', en: 'Rooms' }, value: { de: '2 – 4', en: '2 – 4' } },
      { label: { de: 'Lage', en: 'Location' }, value: { de: '04158 Leipzig, Ortsteil Breitenfeld', en: '04158 Leipzig, Breitenfeld district' } }
    ],

    highlights: {
      de: [
        'Lichtdurchflutetes Design mit großzügigen Fensterfronten',
        'Fußbodenheizung und hochwertiges Laminat in den Wohnräumen',
        'Terrasse, Balkon und Stellplatz je nach Wohnung',
        'Wohnungen einzeln erwerbbar — zur Eigennutzung oder als Kapitalanlage',
        'Schulen, Einkauf und ÖPNV in unmittelbarer Nähe',
        'Sehr gute Anbindung an das BMW- und Porsche-Werk'
      ],
      en: [
        'Light-filled design with generous window fronts',
        'Underfloor heating and high-quality laminate in the living areas',
        'Terrace, balcony and parking space depending on the apartment',
        'Apartments available individually — to live in or as an investment',
        'Schools, shops and public transport close by',
        'Excellent connections to the BMW and Porsche plants'
      ]
    },

    // Building and surroundings. Each apartment has its own photos further below.
    images: [
      { src: '01-aussenansicht.jpg', alt: { de: 'Außenansicht des Mehrfamilienhauses mit verglastem Treppenhaus', en: 'Exterior of the apartment building with glazed stairwell' } },
      { src: '02-eingang.jpg', alt: { de: 'Hauseingang und gepflasterter Hof', en: 'Building entrance and paved courtyard' } },
      { src: '03-hof.jpg', alt: { de: 'Hof mit Stellplätzen und überdachtem Bereich', en: 'Courtyard with parking and covered area' } },
      { src: '04-strasse.jpg', alt: { de: 'Straßenansicht mit Giebelseite des Hauses', en: 'Street view with the gable side of the building' } },
      { src: '05-treppenhaus.jpg', alt: { de: 'Helles Treppenhaus', en: 'Bright stairwell' } }
    ],

    units: [
      {
        id: 'we-4',
        ref: 'WE 4',
        title: { de: '4-Zimmer-Wohnung mit Terrasse', en: '4-room apartment with terrace' },
        rooms: 4,
        livingArea: 100.76,
        price: 209000,
        status: 'available',
        description: {
          de: [
            'Willkommen in Ihrem neuen Zuhause! Diese moderne 4-Zimmer-Wohnung besticht durch ihr lichtdurchflutetes Design und hochwertige Ausstattung.',
            'Die großzügigen Fensterfronten sorgen für ein helles und freundliches Ambiente, während die durchdachte Raumaufteilung Komfort und Funktionalität bietet.'
          ],
          en: [
            'Welcome to your new home! This modern 4-room apartment impresses with its light-filled design and high-quality fittings.',
            'Generous window fronts create a bright, welcoming atmosphere, while the well-considered layout offers both comfort and functionality.'
          ]
        },
        facts: [
          { label: { de: 'Zimmer', en: 'Rooms' }, value: { de: '4 (Wohnzimmer, Schlafzimmer, Kinder-/Arbeitszimmer)', en: '4 (living room, bedroom, children’s room / study)' } },
          { label: { de: 'Badezimmer', en: 'Bathroom' }, value: { de: '1 modernes Bad mit Dusche und Badewanne, zusätzliches Gäste-WC', en: '1 modern bathroom with shower and bathtub, plus a guest WC' } },
          { label: { de: 'Terrasse', en: 'Terrace' }, value: { de: 'Großzügiger Platz für Sitzmöbel', en: 'Generous space for outdoor furniture' } },
          { label: { de: 'Fußboden', en: 'Flooring' }, value: { de: 'Hochwertiges Laminat in den Wohnräumen', en: 'High-quality laminate in the living areas' } },
          { label: { de: 'Heizung', en: 'Heating' }, value: { de: 'Fußbodenheizung in allen Räumen', en: 'Underfloor heating in all rooms' } },
          { label: { de: 'Stellplatz', en: 'Parking' }, value: { de: 'Offener Stellplatz vorhanden', en: 'Open parking space available' } }
        ],
        roomsPlan: [
          { de: 'Wohnen', en: 'Living room', area: 22.68 },
          { de: 'Schlafen', en: 'Bedroom', area: 15.53 },
          { de: 'Kind', en: 'Children’s room', area: 14.90 },
          { de: 'Kind', en: 'Children’s room', area: 11.33 },
          { de: 'Flur', en: 'Hallway', area: 15.04 },
          { de: 'Küche', en: 'Kitchen', area: 6.82 },
          { de: 'Bad/WC', en: 'Bathroom/WC', area: 6.67 },
          { de: 'Abstellraum', en: 'Storage room', area: 2.95 },
          { de: 'Gäste-WC', en: 'Guest WC', area: 2.02 }
        ],
        images: [
          { src: '06-grundriss-3d.jpg', kind: 'floorplan', alt: { de: 'Grundriss Wohnung 4, 3D-Ansicht', en: 'Floor plan apartment 4, 3D view' } },
          { src: '07-grundriss.jpg', kind: 'floorplan', alt: { de: 'Grundriss Wohnung 4', en: 'Floor plan apartment 4' } }
        ]
      },

      {
        id: 'we-5',
        ref: 'WE 5',
        title: { de: '2-Raum-Wohnung mit Balkon', en: '2-room apartment with balcony' },
        rooms: 2,
        livingArea: 54.97,
        floor: { de: 'Obergeschoss', en: 'Upper floor' },
        price: null, // Preis auf Anfrage — noch nicht festgelegt
        status: 'available',
        description: {
          de: ['Helle 2-Raum-Wohnung im Obergeschoss mit Wohn-/Essbereich, separatem Schlafzimmer, Abstellraum und eigenem Balkon.'],
          en: ['Bright 2-room apartment on the upper floor with a living/dining area, separate bedroom, storage room and its own balcony.']
        },
        facts: [
          { label: { de: 'Lage im Haus', en: 'Position in the building' }, value: { de: 'Obergeschoss', en: 'Upper floor' } },
          { label: { de: 'Aufteilung', en: 'Layout' }, value: { de: 'Schlafen, Wohnen/Essen, Küche, Bad/WC, Abstellraum, Flur, Balkon', en: 'Bedroom, living/dining, kitchen, bathroom/WC, storage room, hallway, balcony' } },
          { label: { de: 'Balkon', en: 'Balcony' }, value: { de: '2,17 m²', en: '2.17 m²' } },
          { label: { de: 'Miteigentumsanteil', en: 'Co-ownership share' }, value: { de: '61,702/1.000', en: '61.702/1,000' } },
          { label: { de: 'Aufteilungsplan', en: 'Subdivision plan' }, value: { de: 'Nr. 5', en: 'No. 5' } }
        ],
        roomsPlan: [
          { de: 'Wohnen/Essen', en: 'Living/dining', area: 19.79 },
          { de: 'Schlafen', en: 'Bedroom', area: 12.69 },
          { de: 'Flur', en: 'Hallway', area: 9.30 },
          { de: 'Bad/WC', en: 'Bathroom/WC', area: 6.04 },
          { de: 'Küche', en: 'Kitchen', area: 3.09 },
          { de: 'Abstellraum', en: 'Storage room', area: 1.90 }
        ],
        images: [
          { src: 'we5-01-wohnen.jpg', alt: { de: 'Wohn- und Essbereich', en: 'Living and dining area' } },
          { src: 'we5-02-schlafen.jpg', alt: { de: 'Schlafzimmer', en: 'Bedroom' } },
          { src: 'we5-03-schlafen.jpg', alt: { de: 'Schlafzimmer mit Einbauschrank', en: 'Bedroom with fitted wardrobe' } },
          { src: 'we5-04-bad.jpg', alt: { de: 'Bad mit Dusche und WC', en: 'Bathroom with shower and WC' } },
          { src: 'we5-05-flur.jpg', alt: { de: 'Flur mit Garderobe', en: 'Hallway with wardrobe' } },
          { src: 'we5-07-balkon.jpg', alt: { de: 'Balkon mit Blick ins Grüne', en: 'Balcony with a view of greenery' } },
          { src: 'we5-06-eingang.jpg', alt: { de: 'Wohnungseingang', en: 'Apartment entrance' } },
          { src: 'we5-08-treppenhaus.jpg', alt: { de: 'Verglastes Treppenhaus von außen', en: 'Glazed stairwell seen from outside' } },
          { src: 'we5-09-aussen.jpg', alt: { de: 'Außenansicht', en: 'Exterior view' } },
          { src: 'we5-grundriss-3d.jpg', kind: 'floorplan', alt: { de: 'Grundriss Wohnung 5, 3D-Ansicht', en: 'Floor plan apartment 5, 3D view' } }
        ]
      },

      {
        id: 'we-15',
        ref: 'WE 15',
        title: { de: '2-Raum-Wohnung im Dachgeschoss', en: '2-room apartment on the top floor' },
        rooms: 2,
        livingArea: 46.11,
        floor: { de: 'Dachgeschoss', en: 'Top floor' },
        price: 107000,
        status: 'available',
        description: {
          de: ['2-Raum-Wohnung im Dachgeschoss mit Wohn-/Essbereich, separatem Schlafzimmer und Abstellraum. Ein Stellplatz (Nr. 1) gehört zur Wohnung.'],
          en: ['2-room apartment on the top floor with a living/dining area, separate bedroom and storage room. A parking space (no. 1) belongs to the apartment.']
        },
        facts: [
          { label: { de: 'Lage im Haus', en: 'Position in the building' }, value: { de: 'Dachgeschoss', en: 'Top floor' } },
          { label: { de: 'Aufteilung', en: 'Layout' }, value: { de: 'Schlafen, Wohnen/Essen, Küche, Bad/WC, Abstellraum, Flur', en: 'Bedroom, living/dining, kitchen, bathroom/WC, storage room, hallway' } },
          { label: { de: 'Stellplatz', en: 'Parking' }, value: { de: 'Stellplatz Nr. 1', en: 'Parking space no. 1' } },
          { label: { de: 'Miteigentumsanteil', en: 'Co-ownership share' }, value: { de: '51,757/1.000', en: '51.757/1,000' } }
        ],
        roomsPlan: [
          { de: 'Wohnen', en: 'Living room', area: 16.63 },
          { de: 'Schlafen', en: 'Bedroom', area: 9.89 },
          { de: 'Flur', en: 'Hallway', area: 7.57 },
          { de: 'Bad', en: 'Bathroom', area: 6.15 },
          { de: 'Küche', en: 'Kitchen', area: 3.97 },
          { de: 'Abstellraum', en: 'Storage room', area: 1.90 }
        ],
        images: [
          { src: 'we15-01-wohnen.jpg', alt: { de: 'Wohnbereich', en: 'Living area' } },
          { src: 'we15-02-schlafen.jpg', alt: { de: 'Schlafzimmer mit Dachfenster', en: 'Bedroom with skylight' } },
          { src: 'we15-03-schlafen.jpg', alt: { de: 'Weiterer Schlafbereich', en: 'Further sleeping area' } },
          { src: 'we15-04-kueche.jpg', alt: { de: 'Küche', en: 'Kitchen' } },
          { src: 'we15-05-bad.jpg', alt: { de: 'Bad mit Badewanne und Dusche', en: 'Bathroom with bathtub and shower' } },
          { src: 'we15-06-flur.jpg', alt: { de: 'Flur', en: 'Hallway' } },
          { src: 'we15-grundriss-3d.jpg', kind: 'floorplan', alt: { de: 'Grundriss Wohnung 15, 3D-Ansicht', en: 'Floor plan apartment 15, 3D view' } },
          { src: 'we15-aufteilungsplan.jpg', kind: 'floorplan', alt: { de: 'Aufteilungsplan Dachgeschoss', en: 'Subdivision plan, top floor' } }
        ]
      }
    ],

    agent: 'oksana'
  },

  {
    id: 'haus-drei-wohnungen',
    ref: 'IL-002',
    listedAt: '2026-10-09',
    marketing: 'buy',
    type: 'apartment',
    status: 'available',

    // TODO: Ort ergänzen (Stadt/Ortsteil) und lat/lng eintragen, damit die Karte erscheint.
    location: {
      city: '[Ort ergänzen]',
      district: '',
      postcode: ''
    },

    title: {
      de: 'Drei Wohnungen in einem Mehrfamilienhaus',
      en: 'Three apartments in an apartment building'
    },

    teaser: {
      de: 'Maisonette-Wohnung über zwei Ebenen und zwei 2-Raum-Wohnungen in einem gepflegten Mehrfamilienhaus.',
      en: 'A maisonette apartment over two levels and two 2-room apartments in a well-kept apartment building.'
    },

    description: {
      de: [
        'In diesem Mehrfamilienhaus stehen drei Wohnungen zum Verkauf: eine großzügige Maisonette-Wohnung über zwei Ebenen mit rund 155 m² Wohnfläche sowie zwei 2-Raum-Wohnungen.',
        'Die Maisonette-Wohnung überzeugt mit offener Wendeltreppe, sichtbaren Holzbalken und Dachschrägen. Die Wohnungen können einzeln erworben werden.'
      ],
      en: [
        'Three apartments in this apartment building are for sale: a spacious maisonette over two levels with around 155 m² of living space, and two 2-room apartments.',
        'The maisonette features an open spiral staircase, exposed wooden beams and sloping ceilings. The apartments can be purchased individually.'
      ]
    },

    locationText: {
      de: ['Angaben zur Lage folgen. Gerne informieren wir Sie persönlich über Umgebung, Anbindung und Infrastruktur.'],
      en: ['Details about the location will follow. We will gladly inform you personally about the surroundings, transport links and local amenities.']
    },

    facts: [
      { label: { de: 'Objektart', en: 'Property type' }, value: { de: 'Wohnungen in einem Mehrfamilienhaus', en: 'Apartments in an apartment building' } },
      { label: { de: 'Verfügbare Wohnungen', en: 'Available apartments' }, value: { de: '3 (einzeln erwerbbar)', en: '3 (available individually)' } },
      { label: { de: 'Wohnflächen', en: 'Living areas' }, value: { de: '55 m² – 155 m²', en: '55 m² – 155 m²' } }
    ],

    highlights: {
      de: [
        'Maisonette-Wohnung über zwei Ebenen mit ca. 155 m²',
        'Offene Wendeltreppe, sichtbare Holzbalken und Dachschrägen',
        'Zwei 2-Raum-Wohnungen mit separater Küche',
        'Wohnungen einzeln erwerbbar — zur Eigennutzung oder als Kapitalanlage'
      ],
      en: [
        'Maisonette apartment over two levels with approx. 155 m²',
        'Open spiral staircase, exposed wooden beams and sloping ceilings',
        'Two 2-room apartments with a separate kitchen',
        'Apartments available individually — to live in or as an investment'
      ]
    },

    images: [
      { src: '00-aussenansicht.jpg', alt: { de: 'Außenansichten des Mehrfamilienhauses', en: 'Exterior views of the apartment building' } }
    ],

    units: [
      {
        id: 'we-1',
        ref: 'WE 1',
        title: { de: 'Maisonette-Wohnung über zwei Ebenen', en: 'Maisonette apartment over two levels' },
        livingArea: 155,
        price: null,
        status: 'available',
        description: {
          de: ['Großzügige Maisonette-Wohnung mit rund 155 m² Wohnfläche über zwei Ebenen, verbunden durch eine offene Wendeltreppe. Mehrere Schlafzimmer, zwei Bäder und eine separate Küche mit Holzdecke.'],
          en: ['Spacious maisonette apartment with around 155 m² of living space over two levels, connected by an open spiral staircase. Several bedrooms, two bathrooms and a separate kitchen with a wooden ceiling.']
        },
        facts: [
          { label: { de: 'Wohnfläche', en: 'Living area' }, value: { de: 'ca. 155 m²', en: 'approx. 155 m²' } },
          { label: { de: 'Ebenen', en: 'Levels' }, value: { de: '2, verbunden durch eine Wendeltreppe', en: '2, connected by a spiral staircase' } }
        ],
        images: [
          { src: 'we1-02-treppe.jpg', alt: { de: 'Offene Wendeltreppe zwischen den Ebenen', en: 'Open spiral staircase between the levels' } },
          { src: 'we1-03-treppe.jpg', alt: { de: 'Treppe mit Holzbalken', en: 'Staircase with wooden beams' } },
          { src: 'we1-01-kueche.jpg', alt: { de: 'Küche mit Holzdecke', en: 'Kitchen with wooden ceiling' } },
          { src: 'we1-04-zimmer.jpg', alt: { de: 'Zimmer mit Einbauschrank', en: 'Room with fitted wardrobe' } },
          { src: 'we1-05-schlafen.jpg', alt: { de: 'Schlafzimmer', en: 'Bedroom' } },
          { src: 'we1-06-schlafen.jpg', alt: { de: 'Schlafzimmer', en: 'Bedroom' } },
          { src: 'we1-07-schlafen.jpg', alt: { de: 'Schlafzimmer', en: 'Bedroom' } },
          { src: 'we1-08-schlafen.jpg', alt: { de: 'Schlafzimmer mit Dachschräge', en: 'Bedroom with sloping ceiling' } },
          { src: 'we1-09-schlafen.jpg', alt: { de: 'Schlafzimmer mit Holzbalken', en: 'Bedroom with wooden beams' } },
          { src: 'we1-10-schlafen.jpg', alt: { de: 'Schlafzimmer', en: 'Bedroom' } },
          { src: 'we1-11-zimmer.jpg', alt: { de: 'Zimmer mit Dachschräge', en: 'Room with sloping ceiling' } },
          { src: 'we1-12-galerie.jpg', alt: { de: 'Obere Ebene mit Holzbalken', en: 'Upper level with wooden beams' } },
          { src: 'we1-13-bad.jpg', alt: { de: 'Badezimmer', en: 'Bathroom' } },
          { src: 'we1-14-dusche.jpg', alt: { de: 'Bad mit Dusche', en: 'Bathroom with shower' } },
          { src: 'we1-15-bad.jpg', alt: { de: 'Zweites Bad', en: 'Second bathroom' } }
        ]
      },
      {
        id: 'we-2',
        ref: 'WE 2',
        title: { de: '2-Raum-Wohnung', en: '2-room apartment' },
        rooms: 2,
        livingArea: 55,
        price: null,
        status: 'available',
        description: {
          de: ['2-Raum-Wohnung mit rund 55 m² Wohnfläche, separater Küche und Tageslichtbad.'],
          en: ['2-room apartment with around 55 m² of living space, a separate kitchen and a bathroom with a window.']
        },
        facts: [
          { label: { de: 'Wohnfläche', en: 'Living area' }, value: { de: 'ca. 55 m²', en: 'approx. 55 m²' } },
          { label: { de: 'Zimmer', en: 'Rooms' }, value: { de: '2', en: '2' } }
        ],
        images: [
          { src: 'we2-01-wohnen.jpg', alt: { de: 'Wohnraum', en: 'Living room' } },
          { src: 'we2-02-wohnen.jpg', alt: { de: 'Wohnraum mit Fenster', en: 'Living room with window' } },
          { src: 'we2-03-kueche.jpg', alt: { de: 'Küche', en: 'Kitchen' } },
          { src: 'we2-04-kueche.jpg', alt: { de: 'Küche mit Essplatz', en: 'Kitchen with dining area' } },
          { src: 'we2-05-flur.jpg', alt: { de: 'Flur', en: 'Hallway' } },
          { src: 'we2-06-bad.jpg', alt: { de: 'Bad mit Fenster', en: 'Bathroom with window' } }
        ]
      },
      {
        id: 'we-3',
        ref: 'WE 3',
        title: { de: '2-Raum-Wohnung', en: '2-room apartment' },
        rooms: 2,
        price: null,
        status: 'available',
        description: {
          de: ['2-Raum-Wohnung mit separater Küche. Die Wohnfläche teilen wir Ihnen gerne auf Anfrage mit.'],
          en: ['2-room apartment with a separate kitchen. We are happy to provide the living area on request.']
        },
        facts: [
          { label: { de: 'Zimmer', en: 'Rooms' }, value: { de: '2', en: '2' } },
          { label: { de: 'Wohnfläche', en: 'Living area' }, value: { de: 'Auf Anfrage', en: 'On request' } }
        ],
        images: [
          { src: 'we3-01-zimmer.jpg', alt: { de: 'Zimmer', en: 'Room' } },
          { src: 'we3-02-kueche.jpg', alt: { de: 'Küche mit Essplatz', en: 'Kitchen with dining area' } },
          { src: 'we3-03-flur.jpg', alt: { de: 'Flur', en: 'Hallway' } }
        ]
      }
    ],

    agent: 'oksana'
  }
];
