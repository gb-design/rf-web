# Project Operating Model

Stand: 14. Juli 2026

Dieses Dokument ist der Einstiegspunkt fuer die agentische Projektsteuerung der Website von Dr. Rene H. Fortelny. Die einzelnen Agentenprofile liegen bewusst getrennt unter `docs/agents/`, damit sie wartbar, reviewbar und spaeter als Skills oder Prompts wiederverwendbar bleiben.

Der operative Fortschritt, offene Blocker und das jeweils naechste Arbeitspaket werden verbindlich in [`STATUS.md`](../STATUS.md) gepflegt.

## Leitprinzip

Ein zentraler Orchestrator steuert Scope, Reihenfolge, Qualitaetsgates und offene Entscheidungen. Spezialisierte Agents liefern klar begrenzte Arbeitspakete. Jede relevante Aenderung wird gegen Architektur, Security/Privacy, Accessibility, Performance, Content-Compliance und Build geprueft.

Das Projekt bleibt static-first. Dynamik wird nur eingesetzt, wenn sie fachlich begruendet ist: Sanity fuer Events/Galerie und ein serverseitiges Kontaktformular fuer Termin- und medizinische Anfragen.

## Festgelegte Entscheidungen

- GitHub-Repository ist `gb-design/rf-web` (`https://github.com/gb-design/rf-web.git`).
- Der aktuelle Entwicklungsstand ist auf `dev` gesichert; `main` wird erst fuer den geregelten Production-Release angelegt beziehungsweise verwendet.
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

1. **Foundation Hardening — abgeschlossen:** Git/Repo, lokale Fonts, Header, responsive Navigation, Footer, Layout-Komponenten, Accessibility-Basis und Security-Header sind umgesetzt und geprueft.
2. **Static MVP — als Naechstes:** Home, Profil, Leistungen, Kontakt, Impressum, Datenschutz und sichtbare Galerie umsetzen.
3. **Asset Integration — offen:** temporaere Fotos pruefen, Bildmanifest, Alt-Texte und responsive Crops erstellen.
4. **Sanity — offen:** Studio, Schemas, Queries, Events und Galerie integrieren.
5. **Contact Form — offen:** Astro Endpoint, Resend, Validierung, Consent, Honeypot und Rate-Limit umsetzen.
6. **Full Audit — offen:** Security, Accessibility, Performance, SEO, Content und Legal pruefen.
7. **Release — offen:** Cloudflare Preview, Env Vars, PR `dev` -> `main`, Go-live und Smoke Test abschliessen.

## Naechste konkrete Schritte

1. Static MVP mit der Startseite beginnen.
2. Hero, Behandlungsschwerpunkte, Beratungsablauf sowie Profil-, Event- und Kontakt-Teaser umsetzen.
3. Freigegebene Uebergangsassets auswaehlen und mit belastbaren Alt-Texten integrieren.
4. Startseite auf Desktop und Mobile pruefen und den Build ausfuehren.
5. Danach Profil, Leistungen und Kontakt umsetzen.

Cloudflare Pages kann parallel als Preview-Projekt eingerichtet werden, wird aber noch nicht produktiv mit `fortelny.at` verbunden.

GitHub-Details: [GitHub Workflow](./github-workflow.md)
