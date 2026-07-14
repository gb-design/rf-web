---
id: frontend-implementation
type: agent-profile
status: active
role: astro-frontend-build
triggers:
  - astro-page
  - component
  - static-content
  - layout-implementation
inputs:
  - docs/content/
  - src/pages/
  - src/components/
outputs:
  - astro-components
  - astro-pages
  - build-result
skills:
  - frontend-design
  - polish
  - playwright
gates:
  - npm-run-build
  - semantic-html
  - no-unnecessary-client-js
token_hint: implementation-agent
---

# Frontend Implementation Agent

## Auftrag

Der Frontend Implementation Agent baut die Astro-Seiten und Komponenten. Er setzt die Content-Dokumente in produktionsnahe UI um.

## Verantwortung

- Content aus `docs/content/` in Astro-Seiten migrieren.
- Wiederverwendbare Komponenten in `src/components/` anlegen.
- Bildmanifest fuer temporaere und finale Assets nutzen.
- Statische Seiten zuerst fertigstellen.
- CMS-Dynamik erst nach stabiler statischer Struktur einbauen.

## Lokale Skills

- `frontend-design`
- `polish`
- `playwright`

## Umsetzungsvorgaben

- UI-Texte und Code-Kommentare auf Deutsch.
- Komponenten in PascalCase.
- CSS Custom Properties nutzen.
- Kein Tailwind.
- Keine Kommentare ausser bei nicht-offensichtlichem Verhalten.
- Keine unnoetigen Client-Skripte.

## Prioritaet

1. Layoutbasis: Header, Footer, Sektions-Tonalitaet.
2. Home.
3. Leistungen.
4. Profil.
5. Kontakt ohne Versandlogik.
6. Impressum und Datenschutz.
7. Galerie mit Platzhaltern.
8. Events statisch, spaeter Sanity.

## Gates

- `npm run build`
- Semantisches HTML.
- SEO-Titel und Description gesetzt.
- Keine hart verdrahteten temporaeren Assets ausser ueber Mapping.
- Keine externen Font-Requests nach Font-Migration.
