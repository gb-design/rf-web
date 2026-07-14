# Project Operating Model

Stand: 13. Juli 2026

Dieses Dokument ist der Einstiegspunkt fuer die agentische Projektsteuerung der Website von Dr. Rene H. Fortelny. Die einzelnen Agentenprofile liegen bewusst getrennt unter `docs/agents/`, damit sie wartbar, reviewbar und spaeter als Skills oder Prompts wiederverwendbar bleiben.

## Leitprinzip

Ein zentraler Orchestrator steuert Scope, Reihenfolge, Qualitaetsgates und offene Entscheidungen. Spezialisierte Agents liefern klar begrenzte Arbeitspakete. Jede relevante Aenderung wird gegen Architektur, Security/Privacy, Accessibility, Performance, Content-Compliance und Build geprueft.

Das Projekt bleibt static-first. Dynamik wird nur eingesetzt, wenn sie fachlich begruendet ist: Sanity fuer Events/Galerie und ein serverseitiges Kontaktformular fuer Termin- und medizinische Anfragen.

## Festgelegte Entscheidungen

- GitHub-Repository ist `gb-design/rf-web` (`https://github.com/gb-design/rf-web.git`).
- Cloudflare Pages ist gesetzt, ein Projekt existiert im Dashboard noch nicht.
- Sanity ist gesetzt, zuerst fuer Events und Galerie.
- Die Galerie soll sichtbar sein. Wenn keine freigegebenen Fotos vorhanden sind, werden Platzhalter verwendet.
- Das Kontaktformular soll Termin-/Organisationsanfragen und medizinische Anliegen erlauben.
- Temporare Fotos aus der bestehenden Website duerfen als Uebergangsassets verwendet werden.
- Lokale Fonts sind Zielstandard. Externe Google-Fonts-Requests sollen entfernt werden.

## Agentenindex

- [Agent Overview](./agents/README.md)
- [Project Orchestrator](./agents/project-orchestrator.md)
- [Architecture Agent](./agents/architecture.md)
- [Security & Privacy Agent](./agents/security-privacy.md)
- [Medical Content & Compliance Agent](./agents/medical-content-compliance.md)
- [UX & Design System Agent](./agents/ux-design-system.md)
- [Frontend Implementation Agent](./agents/frontend-implementation.md)
- [CMS / Sanity Agent](./agents/cms-sanity.md)
- [Forms & Backend Agent](./agents/forms-backend.md)
- [Accessibility & QA Agent](./agents/accessibility-qa.md)
- [Performance & SEO Agent](./agents/performance-seo.md)
- [DevOps / Release Agent](./agents/devops-release.md)
- [Asset Steward](./agents/asset-steward.md)
- [Skill Policy](./agents/skill-policy.md)

## Phasen

1. **Foundation Hardening:** Git/Repo, lokale Fonts, Header/Footer/Layout, Sektions-Tonalitaet, Security-Header-Konzept.
2. **Static MVP:** Home, Profil, Leistungen, Kontakt, Impressum, Datenschutz, sichtbare Galerie mit Platzhaltern.
3. **Asset Integration:** temporaere Fotos, Bildmanifest, Alt-Texte, responsive Crops.
4. **Sanity:** Studio, Schemas, Queries, Events, Galerie.
5. **Contact Form:** Astro Endpoint, Resend, Validierung, Consent, Honeypot, Rate-Limit.
6. **Full Audit:** Security, Accessibility, Performance, SEO, Content und Legal.
7. **Release:** Cloudflare Preview, Env Vars, PR `dev` -> `main`, Go-live, Smoke Test.

## Naechste konkrete Schritte

1. GitHub/Git-Status klaeren.
2. Cloudflare Pages Projekt anlegen, aber noch nicht produktiv verbinden.
3. Lokale Fonts in `public/fonts/` einbinden.
4. Header/Footer/Layout-Komponenten bauen.
5. Static MVP starten.

GitHub-Details: [GitHub Workflow](./github-workflow.md)
