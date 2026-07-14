# Dr. René H. Fortelny — Website

Arztpraxis-Website für Dr. René H. Fortelny (Hernien- und Viszeral-Chirurg, Wien). Kombination aus Surgeon Portfolio und Patienteninformationsseite. Kein E-Commerce. Member-Bereich (Freebies/Downloadables) noch in Klärung.

**Live:** fortelny.at · **Developer:** Georg (hello@georgeandburn.at; gesign.art@gmail.com)

---

## Tech Stack

| Tool             | Rolle                                     |
| ---------------- | ----------------------------------------- |
| Astro 5          | Static Site Generator                     |
| Sanity CMS       | Headless CMS (Events, dynamische Inhalte) |
| Cloudflare Pages | Hosting + Auto-Deployment                 |
| GitHub           | Versionierung                             |

## Commands

```bash
npm run dev       # Dev-Server → localhost:4321
npm run build     # Production Build
npm run preview   # Build lokal vorschauen
```

## Branches

- `main` → Production (fortelny.at, auto-deploy via Cloudflare Pages)
- `dev` → Development (automatische Preview-URL von Cloudflare)

Kein direkter Push auf `main`. Ausschließlich via Pull Request von `dev`.

GitHub-Workflow und Repo-Details: `docs/github-workflow.md`

---

## Seiten (geplant, ~6)

| Seite      | Slug          | CMS               |
| ---------- | ------------- | ----------------- |
| Home       | `/`           | —                 |
| Profil     | `/profil`     | —                 |
| Leistungen | `/leistungen` | —                 |
| Events     | `/events`     | Sanity            |
| Galerie    | `/galerie`    | Sanity (optional) |
| Kontakt    | `/kontakt`    | —                 |

**Features:** CV-Download (PDF), Veranstaltungskalender, Social Media Links, Bildergalerie

## Projektstruktur

```
/
├── src/
│   ├── pages/           # Astro-Seiten (file-based Routing)
│   ├── components/      # Wiederverwendbare Astro-Komponenten
│   ├── layouts/         # Seitenlayouts (BaseLayout, etc.)
│   ├── styles/          # Globale CSS + Design Tokens
│   └── lib/             # Sanity-Client, Utilities
├── studio/              # Sanity Studio (embedded)
├── public/              # Statische Assets: Logo, Favicon, CV.pdf
└── AGENTS.md
```

---

## Sanity CMS

- Dataset: `production` (ein einziges — kein separates dev-Dataset nötig)
- Studio embedded in Astro, erreichbar unter `/studio`
- API: GROQ-Queries via `@sanity/client` in `src/lib/sanity.ts`
- Content-Typen (geplant): `event`, ggf. `galleryItem`

## Design

Details in `.impeccable.md`. Kurzfassung:

- Theme: **Light-first** mit dunklen Kontrastsektionen; keine manuelle Umschaltung, keine gespeicherte User-Präferenz
- Fonts: **IBM Plex Sans** (H1–H6, UI) + **IBM Plex Mono Regular** (Body/Text)
- `#77B1E1` brand-blue · `#DA4378` brand-red · `#E2ECF3` brand-light · `#212137` brand-dark
- Alle Design Tokens als CSS Custom Properties in `src/styles/tokens.css`

---

## Konventionen

- **Sprache:** UI-Texte und Code-Kommentare auf Deutsch
- **Komponenten:** PascalCase (`EventCard.astro`, `HeroSection.astro`)
- **Styles:** CSS Custom Properties für Tokens, kein Tailwind
- **Bilder:** Sanity CDN für CMS-Bilder, `public/` für statische Assets
- **Keine Kommentare** außer bei nicht-offensichtlichem Verhalten

---

## Offene Punkte

- Seitenstruktur und Sektionen noch nicht vollständig definiert
- Member-Bereich (Login/Freebies): noch in Klärung mit Kunde
- Kontaktformular: **Resend** via Astro API Endpoint (Cloudflare Workers Adapter) — DSGVO-Checkbox Pflicht
- Mailing/Newsletter: noch offen — Brevo oder Mailchimp (klären ob Newsletter geplant)
- Sanity-Schema für Events: Felder noch zu definieren
- Impressum + Datenschutzerklärung: Pflichtseiten (AT/AVG), noch zu erstellen

---

## Hinweis

Diese Datei ist das Codex/Agent-Pendant zu `CLAUDE.md`. Inhaltlich identisch bis auf den Skills-Abschnitt (Claude-Code-spezifisch, entfällt hier). Bei Änderungen an Stack, Struktur oder Konventionen **beide Dateien synchron halten**.
