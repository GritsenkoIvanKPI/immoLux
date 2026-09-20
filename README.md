# ImmoLux Germany — Website

Static site with no build step and no framework: plain HTML, CSS and JavaScript. It runs on any web host (upload the folder) and also works when opened locally.

| Page | File |
|---|---|
| Start | `index.html` |
| Immobilienliste (newest first, "Mehr anzeigen") | `immobilien.html` |
| Objektseite | `objekt.html?id=<property-id>` |
| Kontakt | `kontakt.html` |
| Impressum / Datenschutz (**placeholders — fill in before going live**) | `impressum.html`, `datenschutz.html` |

Languages: German (default) and English. The DE/EN switch in the header remembers the choice. `?lang=en` in a link forces English.

## Local preview

```bash
node serve.mjs            # http://localhost:3000
PORT=5500 node serve.mjs  # if port 3000 is taken
```

## Adding a property

1. **Photos** → create `assets/img/properties/<id>/`, e.g. `assets/img/properties/leipzig-gohlis-3-zimmer/`.
   For every photo, save a large version (max. 1920 px, JPG) and a small copy named `thumb-<name>` (max. 800 px):
   ```
   01-aussen.jpg      thumb-01-aussen.jpg
   02-wohnen.jpg      thumb-02-wohnen.jpg
   ```
   The first image is the cover. Images marked `kind: 'floorplan'` also appear in the floor-plan section.

2. **Data** → open `assets/js/properties.js`, copy the existing object, and change `id` (same as the folder name), `ref`, `listedAt` and all fields.
   Every text has a `de` and an `en` version. The field reference is at the top of the file.

That's all: the property then appears on the listings page, the homepage and at `objekt.html?id=<id>`.
Useful fields:
- `status: 'reserved' | 'sold'` shows a badge.
- `price: null` shows "Preis auf Anfrage".
- `marketing: 'rent'` treats `price` as monthly rent.
- The NEU badge appears automatically for 30 days after `listedAt`.

## Contact details and forms

`assets/js/config.js` holds the phone number, e-mail and agents (`agents`; a property references one via `agent: 'oksana'`, optionally with a `photo`).

The forms currently open the visitor's e-mail app with the enquiry filled in. For real form delivery, set `formEndpoint` to a service that accepts a JSON POST (e.g. Formspree), and name that service in the privacy policy.

## Privacy (DSGVO)

- Fonts are self-hosted (`assets/fonts`), with no connection to Google.
- The OpenStreetMap map only loads after a click on "Karte laden".
- The map shows only the district, never the exact address.

## Structure

```
assets/css/main.css        Design (colours as variables in :root)
assets/css/fonts.css       Self-hosted fonts (Cormorant Garamond, Hanken Grotesk)
assets/js/config.js        Contact details, agents, form endpoint
assets/js/properties.js    Listings  ← edit here
assets/js/i18n.js          Interface texts DE/EN
assets/js/core.js          Language, header/footer, cards, gallery, forms
assets/js/pages/*.js       Page logic
assets/img/brand/          Logo, favicon
assets/img/site/           Atmosphere images (AI-generated, show no specific property)
assets/img/properties/     Property photos, one folder per property
```
