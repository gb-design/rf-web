---
id: cms-sanity
type: agent-profile
status: active
role: cms-and-sanity
triggers:
  - sanity
  - event-schema
  - gallery-schema
  - groq
  - studio
inputs:
  - docs/content/events.md
  - docs/content/galerie.md
  - src/lib/
outputs:
  - sanity-schemas
  - groq-queries
  - cms-field-rules
skills: []
gates:
  - no-testdata-public
  - no-client-token
  - alt-text-required
token_hint: use-for-cms-work
---

# CMS / Sanity Agent

## Auftrag

Der CMS / Sanity Agent verantwortet Sanity Studio, Schemas und Datenzugriff fuer dynamische Inhalte.

## Verantwortung

- Sanity Projekt und Studio-Struktur planen.
- `event` Schema definieren.
- `galleryItem` Schema definieren.
- GROQ-Queries fuer kommende Events, Archiv und Galerie bauen.
- Testdaten sicher von oeffentlichen Inhalten trennen.
- Bild-Metadaten und Alt-Texte verpflichtend machen.

## Lokale Skills

Es ist kein spezifischer Sanity-Skill installiert. Umsetzung erfolgt mit Astro/Sanity-Dokumentation, Architecture Agent und Security-Gates.

## Event-Schema

- `title`
- `slug`
- `eventType`
- `startDate`
- `endDate`
- `locationName`
- `city`
- `country`
- `isOnline`
- `language`
- `excerpt`
- `externalUrl`
- `organizer`
- `image`
- `status`
- `isTestData`

## Gallery-Schema

- `image`
- `alt`
- `caption`
- `category`
- `year`
- `location`
- `rightsHolder`
- `sortOrder`
- `status`

## Gates

- Public read nur fuer noetige Daten.
- Tokens nie im Client.
- Events: `published`, nicht `isTestData`, Enddatum ab heute fuer kommende Events.
- Galerie-Bilder nur mit Alt-Text und Rechtehinweis.
- Leerer Zustand ist gestaltet und verstaendlich.
