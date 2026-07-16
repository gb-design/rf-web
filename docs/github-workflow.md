# GitHub Workflow

Stand: 14. Juli 2026

## Repository

- GitHub: https://github.com/gb-design/rf-web.git
- Kurzname: `gb-design/rf-web`
- Projekt: Dr. René H. Fortelny Website
- Hosting-Ziel: Cloudflare Pages

## Branch-Modell

- `main`: Production Branch fuer fortelny.at.
- `dev`: Development Branch fuer Preview Deployments.
- Feature-Branches: kurzlebig, von `dev` abzweigen.

Kein direkter Push auf `main`. Production-Aenderungen laufen ueber Pull Request von `dev` nach `main`.

## Lokales Setup

Falls der lokale Ordner noch kein Git-Repository ist:

```bash
git init
git remote add origin https://github.com/gb-design/rf-web.git
git branch -M dev
git add .
git commit -m "Initial Astro website foundation"
git push -u origin dev
```

Falls das Repository bereits lokal verbunden ist:

```bash
git remote -v
git branch --show-current
git status
```

Erwartung:

- Remote `origin` zeigt auf `https://github.com/gb-design/rf-web.git`.
- Aktiver Arbeitsbranch ist normalerweise `dev`.
- `main` wird nicht direkt lokal bebaut.

## Arbeitsablauf

1. Neue Arbeit auf `dev` oder einem Feature-Branch starten.
2. Aenderungen lokal pruefen.
3. Mindestens `npm run build` ausfuehren, bevor gepusht wird.
4. `STATUS.md` mit Fortschritt, Blockern und naechstem Arbeitspaket aktualisieren.
5. Feature-Branch in `dev` mergen oder per PR nach `dev` fuehren.
6. Cloudflare Preview fuer `dev` pruefen.
7. Release per Pull Request `dev` -> `main`.
8. Nach Production-Deployment Smoke Test durchfuehren.

## Pull Requests

PRs sollen knapp, aber pruefbar sein:

- Was wurde geaendert?
- Welche Seiten oder Komponenten sind betroffen?
- Wurde `npm run build` erfolgreich ausgefuehrt?
- Wurde `STATUS.md` aktualisiert?
- Gibt es Content-, Legal-, DSGVO- oder Asset-Fragen?
- Ist ein Cloudflare Preview-Link vorhanden, sobald Cloudflare verbunden ist?

## Branch Protection

Empfohlen fuer `main`:

- Pull Request erforderlich.
- Direkte Pushes blockieren.
- Branch darf nur nach erfolgreichem Review oder bewusstem Owner-Override gemerged werden.
- Build-Check erforderlich, sobald GitHub Actions oder Cloudflare Checks eingerichtet sind.

## Cloudflare Pages

Geplante Einstellungen:

- Repository: `gb-design/rf-web`
- Production Branch: `main`
- Preview Branch: `dev`
- Build Command: `npm run build`
- Output Directory: `dist`

Env Vars werden nicht committed. Sanity- und Resend-Werte gehoeren in Cloudflare Environment Variables oder GitHub Secrets, je nach Einsatzort.

## Release Gates

Vor Merge nach `main`:

- `npm run build` ist gruen.
- Preview wurde visuell geprueft.
- Impressum/Datenschutz sind fuer den Release-Stand passend.
- Keine Secrets im Repo.
- Medizinische Inhalte wurden fachlich gegengeprueft, wenn sie neu oder geaendert sind.

Nach Deployment:

- Startseite, Kontakt, Leistungen und Profil oeffnen.
- Navigation und CTAs pruefen.
- Mobile View kurz gegenpruefen.
- Kontaktformular pruefen, sobald es produktiv ist.
