/* ImmoLux Germany — site-wide settings.
   Edit this file to change contact details, agents or the form endpoint. */
window.IMMOLUX_CONFIG = {
  company: 'ImmoLux Germany Immobilien',
  shortName: 'ImmoLux',
  tagline: { de: 'Zuhause · Werte · Zukunft', en: 'Home · Value · Future' },
  region: { de: 'Leipzig und Umgebung', en: 'Leipzig and surroundings' },

  // Main contact shown in header, footer and on the contact page.
  contact: {
    email: 'immolux-immobilien@gmx.de',
    phone: '0152 5393 6164',
    phoneHref: '+4915253936164'
  },

  // Agents referenced by properties via `agent: '<key>'`.
  agents: {
    oksana: {
      name: 'Oksana Andasova',
      initials: 'OA',
      photo: null, // e.g. 'assets/img/team/oksana.jpg'
      email: 'immolux-immobilien@gmx.de',
      phone: '0152 5393 6164',
      phoneHref: '+4915253936164'
    }
  },

  // Optional: a form backend (e.g. Formspree, Getform, own API) that accepts
  // a JSON POST. When empty, forms open the visitor's e-mail app instead.
  formEndpoint: '',

  // Listings per "Mehr anzeigen" step on the listings page.
  pageSize: 9
};
