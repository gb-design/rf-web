---
id: agent-overview
type: agent-index
status: active
scope: all-agents
reads:
  - docs/project-operating-model.md
outputs:
  - selected-agent
  - standard-workflow
token_hint: read-first
---

# Agent Overview

Diese Agentenstruktur ist die operative Rollenverteilung fuer das Projekt. Jeder Agent hat einen klaren Verantwortungsbereich, passende lokale Skills und Gates, die vor Abschluss eines Arbeitspakets geprueft werden.

## Grundregeln

- Der Project Orchestrator steuert Reihenfolge, Scope und Abnahmen.
- Agents arbeiten klein, nachvollziehbar und reviewbar.
- Security und Datenschutz sind Gates, keine spaeten Add-ons.
- Sanity, Resend und Cloudflare werden nur mit dokumentierten Env Vars und ohne Secrets im Client genutzt.
- Temporare Assets bleiben klar gekennzeichnet.

## Agenten

| Agent | Primaere Aufgabe |
| --- | --- |
| Project Orchestrator | Roadmap, Scope, Status, Gates |
| Architecture Agent | Astro, Cloudflare, Sanity, Datenfluss |
| Security & Privacy Agent | Secure-by-default, DSGVO, Headers, Secrets |
| Medical Content & Compliance Agent | Medizinische Sprache, Hinweise, Faktencheck |
| UX & Design System Agent | Layout, Designsystem, Theme, Komponenten |
| Frontend Implementation Agent | Astro-Seiten und Komponenten |
| CMS / Sanity Agent | Schemas, Queries, CMS-Daten |
| Forms & Backend Agent | Kontaktformular, Resend, API Endpoint |
| Accessibility & QA Agent | WCAG, Tastatur, Browserpruefung |
| Performance & SEO Agent | Fonts, Bilder, SEO, strukturierte Daten |
| DevOps / Release Agent | Git, Cloudflare Pages, Deployments |
| Asset Steward | Bilder, CV, Fonts, Rechte, Alt-Texte |

## Standard-Ablauf pro Arbeitspaket

1. Orchestrator definiert Ziel und Akzeptanzkriterien.
2. Architecture und Security pruefen relevante Risiken.
3. Fach-Agent setzt das Arbeitspaket um.
4. QA, Accessibility, Performance und Content pruefen nach Bedarf.
5. Build laeuft.
6. Orchestrator aktualisiert Status und offene Punkte.

## Mindest-Gates

- `npm run build`
- Keine Secrets im Repo oder Client.
- Keine externen Font-Requests nach Font-Migration.
- Keine sensiblen medizinischen Daten in URLs, Logs oder Analytics.
- Jede sichtbare Seite mit Titel, Meta Description und sinnvollem HTML.
- Jede Formularinteraktion mit Label, Fehlerzustand und Consent.

## Dokumentationsregel

Wenn ein Agent eine dauerhafte Entscheidung trifft, muss sie in einer passenden Datei dokumentiert werden:

- Projektsteuerung: `docs/project-operating-model.md`
- Agentenrolle: `docs/agents/*.md`
- Content: `docs/content/*.md`
- Security/Privacy: spaeter `docs/security/*.md`
- Release/Cloudflare: spaeter `docs/deployment/*.md`
