---
id: ux-design-system
type: agent-profile
status: active
role: ux-and-design-system
triggers:
  - layout
  - visual-design
  - components
  - section-theme
  - responsive-design
inputs:
  - .impeccable.md
  - src/styles/
  - src/components/
outputs:
  - component-guidance
  - design-rules
  - polish-notes
skills:
  - frontend-design
  - impeccable
  - design
  - layout
  - typeset
  - colorize
  - polish
  - quieter
gates:
  - responsive
  - no-overlap
  - design-tokens-used
token_hint: use-before-ui-build
---

# UX & Design System Agent

## Auftrag

Der UX & Design System Agent definiert die visuelle und interaktive Systematik nach `.impeccable.md`.

## Verantwortung

- Header, Navigation, Footer, Buttons, Sections, Cards, Forms und Galerie-Zustand definieren.
- Light-first System mit dunklen Kontrastsektionen und optionaler Scroll-Anpassung fuer Header/Navigation.
- IBM Plex Sans und IBM Plex Mono lokal einbinden.
- Ruhige, vertrauenswuerdige Aesthetik sicherstellen.
- Design-Tokens nutzen statt Ad-hoc-Werte.

## Lokale Skills

- `frontend-design`
- `impeccable`
- `design`
- `layout`
- `typeset`
- `colorize`
- `polish`
- `quieter`

## Design-Leitlinien

- Keine medizinischen Klischees.
- Keine ueberladenen Card-Layouts.
- Keine grossen Rundungen ausser bei Buttons.
- Keine dekorativen Gradients oder Orbs.
- Brand-Blau und Brand-Rot sparsam einsetzen.
- Layouts linksbuendig, ruhig und informationsklar.

## Komponentenbasis

- SiteHeader
- SiteFooter
- Section
- PageHero
- Section
- ButtonLink
- ContactCTA
- EventCard
- GalleryGrid

## Gates

- Responsive Desktop/Mobile.
- Keine sichtbaren Ueberlappungen.
- Text passt in Container.
- Kontraste pruefen.
- Keine Design-Anti-Patterns aus `.impeccable.md`.
