/* ImmoLux Germany — property listings.

   To add a property:
   1. Put its photos in  assets/img/properties/<id>/  (large image + "thumb-" copy, see README.md)
   2. Copy the object below, give it a new unique `id` and fill in the fields.
   Every text field has a German (de) and English (en) version.

   Field reference
   ---------------
   id            URL slug, used as  objekt.html?id=<id>
   ref           internal reference number shown on the page
   listedAt      ISO date, used for "Neueste" sorting and the NEU badge (30 days)
   marketing     'buy' | 'rent'
   type          'apartment' | 'house' | 'plot' | 'investment' | 'commercial'
   status        'available' | 'reserved' | 'sold'
   price         number in EUR (purchase price, or monthly cold rent for 'rent'); null = on request
   pricePerSqm   optional; computed from price / livingArea when omitted
   livingArea    m²
   rooms, bathrooms
   location      city, district, postcode and approximate lat/lng (area only, never the exact address)
   images        first image is the cover; kind 'floorplan' images are also shown in the floor-plan section
   facts         key/value rows for the "Objektdaten" table
   highlights    bullet list for "Ausstattung"
   rooms_plan    optional room list read from the floor plan
   agent         key from IMMOLUX_CONFIG.agents
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

    price: 235000,
    // As printed in the exposé. Note: 235.000 € / 100,76 m² = 2.332 €/m².
    pricePerSqm: 2391,
    livingArea: 100.76,
    rooms: 4,
    bathrooms: 1,

    location: {
      city: 'Leipzig',
      district: 'Breitenfeld',
      postcode: '04158',
      lat: 51.405,
      lng: 12.3445
    },

    title: {
      de: 'Moderne 4-Zimmer-Wohnung in ruhiger Gegend',
      en: 'Modern 4-room apartment in a quiet area'
    },

    teaser: {
      de: 'Lichtdurchflutete Neubauwohnung mit Terrasse, Fußbodenheizung und Stellplatz.',
      en: 'Light-filled new-build apartment with terrace, underfloor heating and parking space.'
    },

    description: {
      de: [
        'Willkommen in Ihrem neuen Zuhause! Diese moderne 4-Zimmer-Wohnung im Neubau besticht durch ihr lichtdurchflutetes Design und hochwertige Ausstattung.',
        'Die großzügigen Fensterfronten sorgen für ein helles und freundliches Ambiente, während die durchdachte Raumaufteilung Komfort und Funktionalität bietet.'
      ],
      en: [
        'Welcome to your new home! This modern 4-room apartment in a new building impresses with its light-filled design and high-quality fittings.',
        'Generous window fronts create a bright, welcoming atmosphere, while the well-considered layout offers both comfort and functionality.'
      ]
    },

    locationText: {
      de: [
        'Die Wohnung befindet sich in einer ruhigen und dennoch zentralen Lage. Einkaufsmöglichkeiten, Schulen und öffentliche Verkehrsmittel sind in unmittelbarer Nähe und bieten eine perfekte Anbindung an das BMW- und Porsche-Werk.'
      ],
      en: [
        'The apartment is in a quiet yet central location. Shops, schools and public transport are close by and offer excellent connections to the BMW and Porsche plants.'
      ]
    },

    facts: [
      { label: { de: 'Objektart', en: 'Property type' }, value: { de: 'Etagenwohnung, Neubau', en: 'Apartment, new build' } },
      { label: { de: 'Wohnfläche', en: 'Living area' }, value: { de: '100,76 m²', en: '100.76 m²' } },
      { label: { de: 'Zimmer', en: 'Rooms' }, value: { de: '4 (Wohnzimmer, Schlafzimmer, Kinder-/Arbeitszimmer)', en: '4 (living room, bedroom, children’s room / study)' } },
      { label: { de: 'Badezimmer', en: 'Bathroom' }, value: { de: '1 modernes Bad mit Dusche und Badewanne', en: '1 modern bathroom with shower and bathtub' } },
      { label: { de: 'Terrasse', en: 'Terrace' }, value: { de: 'Großzügiger Platz für Sitzmöbel', en: 'Generous space for outdoor furniture' } },
      { label: { de: 'Fußboden', en: 'Flooring' }, value: { de: 'Hochwertiges Laminat in den Wohnräumen', en: 'High-quality laminate in the living areas' } },
      { label: { de: 'Heizung', en: 'Heating' }, value: { de: 'Fußbodenheizung in allen Räumen', en: 'Underfloor heating in all rooms' } },
      { label: { de: 'Stellplatz', en: 'Parking' }, value: { de: 'Offener Stellplatz vorhanden', en: 'Open parking space available' } }
    ],

    highlights: {
      de: [
        'Lichtdurchflutetes Design mit großzügigen Fensterfronten',
        '1 modernes Bad mit Dusche und Badewanne',
        'Terrasse mit großzügigem Platz für Sitzmöbel',
        'Hochwertiges Laminat in den Wohnräumen',
        'Fußbodenheizung in allen Räumen',
        'Offener Stellplatz vorhanden',
        'Schulen, Einkauf und ÖPNV in unmittelbarer Nähe'
      ],
      en: [
        'Light-filled design with generous window fronts',
        '1 modern bathroom with shower and bathtub',
        'Terrace with generous space for outdoor furniture',
        'High-quality laminate flooring in the living areas',
        'Underfloor heating in all rooms',
        'Open parking space available',
        'Schools, shops and public transport close by'
      ]
    },

    // Read from the supplied floor plan ("Wohnung 4").
    rooms_plan: [
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
      { src: '01-aussenansicht.jpg', alt: { de: 'Außenansicht des Mehrfamilienhauses mit verglastem Treppenhaus', en: 'Exterior of the apartment building with glazed stairwell' } },
      { src: '02-eingang.jpg', alt: { de: 'Hauseingang und gepflasterter Hof', en: 'Building entrance and paved courtyard' } },
      { src: '03-hof.jpg', alt: { de: 'Hof mit Stellplätzen und überdachtem Bereich', en: 'Courtyard with parking and covered area' } },
      { src: '04-strasse.jpg', alt: { de: 'Straßenansicht mit Giebelseite des Hauses', en: 'Street view with the gable side of the building' } },
      { src: '05-treppenhaus.jpg', alt: { de: 'Helles Treppenhaus', en: 'Bright stairwell' } },
      { src: '06-grundriss-3d.jpg', kind: 'floorplan', alt: { de: 'Grundriss 3D-Ansicht', en: 'Floor plan, 3D view' } },
      { src: '07-grundriss.jpg', kind: 'floorplan', alt: { de: 'Grundriss Wohnung 4', en: 'Floor plan, apartment 4' } }
    ],

    agent: 'oksana'
  }
];
