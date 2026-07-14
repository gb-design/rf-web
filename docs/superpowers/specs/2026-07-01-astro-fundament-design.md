# Design Spec: Astro 5 Fundament — Dr. René H. Fortelny Website

**Datum:** 2026-07-01
**Scope:** Initiales Projekt-Setup ohne Sanity (Fundament-Phase)
**Stack:** Astro 5, TypeScript strict, CSS Custom Properties, kein Tailwind

---

## Ziel

Das Astro-Projekt im bestehenden Verzeichnis initialisieren und ein solides, design-kohärentes Fundament legen: Token-System, BaseLayout ohne unnoetiges Client-JS, 6 Seiten-Stubs. Kein Content, keine Sanity-Integration — diese kommt in einer späteren Phase.

---

## Initialisierung

- Methode: `npm create astro@latest .` (Minimal-Template, im bestehenden Verzeichnis)
- TypeScript: strict
- Keine Sample-Pages
- Kein `git init` (Repository wird separat eingerichtet)

---

## Projektstruktur

```
rf-website-update/
├── src/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── profil.astro
│   │   ├── leistungen.astro
│   │   ├── events.astro
│   │   ├── galerie.astro
│   │   └── kontakt.astro
│   ├── components/            # leer, bereit für spätere Komponenten
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── styles/
│   │   ├── tokens.css
│   │   └── global.css
│   └── lib/                   # leer, bereit für Sanity-Client später
├── public/
│   ├── rf_logo.svg            # aus Root verschoben
│   └── icons/                 # SVGs aus assets_imported/ verschoben
├── docs/                      # Projekt-Dokumentation
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

**Migration bestehender Dateien:**
- `rf_logo.svg` (Root) → `public/rf_logo.svg`
- `assets_imported/method.svg`, `smalltalk.svg`, `treatment.svg` → `public/icons/`
- `button-showcase.html` → bleibt im Root als Design-Referenz
- `assets_imported/lottie/` → `public/lottie/` (für spätere Verwendung)

---

## Design Tokens — `src/styles/tokens.css`

Alle CSS Custom Properties aus `.impeccable.md`, strukturiert in vier Gruppen:

### Farben (Light Mode als `:root`)

```css
:root {
  --color-bg:           oklch(0.97 0.005 220);
  --color-surface:      oklch(0.99 0.003 220);
  --color-surface-tint: oklch(0.93 0.025 220);

  --color-text:         oklch(0.17 0.025 265);
  --color-text-muted:   oklch(0.5 0.015 240);
  --color-text-subtle:  oklch(0.68 0.01 230);

  --color-border:       oklch(0.88 0.015 220);
  --color-border-light: oklch(0.93 0.008 220);

  --color-primary:      oklch(0.72 0.09 220);
  --color-primary-deep: oklch(0.62 0.1 222);
  --color-primary-bg:   oklch(0.93 0.025 220);

  --color-accent:       oklch(0.54 0.19 352);
  --color-accent-deep:  oklch(0.45 0.18 350);
  --color-accent-bg:    oklch(0.94 0.04 352);
}

[data-section-theme="dark"] {
  --color-bg:           oklch(0.17 0.025 265);
  --color-surface:      oklch(0.21 0.022 265);
  --color-surface-tint: oklch(0.26 0.025 255);

  --color-text:         oklch(0.95 0.01 220);
  --color-text-muted:   oklch(0.68 0.015 230);
  --color-text-subtle:  oklch(0.5 0.01 240);

  --color-border:       oklch(0.3 0.02 260);
  --color-border-light: oklch(0.25 0.018 265);

  --color-primary:      oklch(0.76 0.09 220);
  --color-primary-deep: oklch(0.65 0.1 222);
  --color-primary-bg:   oklch(0.25 0.035 240);

  --color-accent:       oklch(0.65 0.18 352);
  --color-accent-deep:  oklch(0.55 0.19 350);
  --color-accent-bg:    oklch(0.25 0.05 355);
}
```

### Typografie

```css
:root {
  --font-display: "IBM Plex Sans", system-ui, sans-serif;
  --font-body:    "IBM Plex Serif", Georgia, serif;

  --text-h1:    clamp(2.75rem, 5.5vw, 5rem);
  --text-h2:    clamp(1.75rem, 3.5vw, 2.75rem);
  --text-h3:    clamp(1rem, 1.8vw, 1.2rem);
  --text-body:  1rem;
  --text-label: 0.8125rem;
  --text-caption: 0.875rem;
}
```

### Spacing (4pt-Scale)

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-6:  24px;
  --space-8:  32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
  --space-32: 128px;
}
```

---

## Global CSS — `src/styles/global.css`

```css
@import "./tokens.css";
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Serif:ital,wght@0,300;0,400;0,500;1,400&display=swap");

*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; }

html { -webkit-text-size-adjust: 100%; }

body {
  font-family: var(--font-body);
  font-size: var(--text-body);
  line-height: 1.7;
  background-color: var(--color-bg);
  color: var(--color-text);
  -webkit-font-smoothing: antialiased;
}

img, video { max-width: 100%; display: block; }

h1, h2, h3, h4, h5, h6 { font-family: var(--font-display); }
```

---

## BaseLayout — `src/layouts/BaseLayout.astro`

**Props:**
- `title: string` — Seitentitel (erscheint im `<title>` Tag)
- `description?: string` — Meta-Description (optional)

**Struktur:**

```astro
---
interface Props {
  title: string;
  description?: string;
}
const { title, description = "Dr. René H. Fortelny — Hernien- und Viszeral-Chirurg, Wien" } = Astro.props;
---
<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    {description && <meta name="description" content={description} />}
    <link rel="icon" type="image/svg+xml" href="/rf_logo.svg" />
  </head>
  <body>
    <slot />
  </body>
</html>

<style is:global>
  @import "../styles/global.css";
</style>
```

**Wichtig:** Kein globales Theme-Init-Script. Dunkle Gestaltung wird auf Section-Ebene gesetzt, nicht als Website-Modus.

---

## Seiten-Stubs

Alle 6 Seiten als minimale Astro-Dateien. Beispiel `src/pages/index.astro`:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
---
<BaseLayout title="Home — Dr. René H. Fortelny">
  <main>
    <h1>Home</h1>
  </main>
</BaseLayout>
```

| Datei | title |
|-------|-------|
| `index.astro` | `Home — Dr. René H. Fortelny` |
| `profil.astro` | `Profil — Dr. René H. Fortelny` |
| `leistungen.astro` | `Leistungen — Dr. René H. Fortelny` |
| `events.astro` | `Events — Dr. René H. Fortelny` |
| `galerie.astro` | `Galerie — Dr. René H. Fortelny` |
| `kontakt.astro` | `Kontakt — Dr. René H. Fortelny` |

---

## Nicht im Scope dieser Phase

- Sanity CMS Integration
- Navigation / Header / Footer Komponenten
- Seiteninhalt / Sektionen
- Kontaktformular
- Impressum / Datenschutz
- Responsive Breakpoints (kommen mit den ersten echten Komponenten)
- Scroll-basierte Header-/Navigationsanpassung an helle und dunkle Sektionen
