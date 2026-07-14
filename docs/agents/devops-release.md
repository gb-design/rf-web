---
id: devops-release
type: agent-profile
status: active
role: deployment-and-release
triggers:
  - cloudflare-pages
  - github
  - deployment
  - env-vars
  - release
inputs:
  - package.json
  - astro.config.mjs
  - AGENTS.md
outputs:
  - deployment-settings
  - env-var-list
  - release-checklist
skills:
  - github:github
  - github:yeet
gates:
  - no-main-direct-push
  - env-vars-not-committed
  - preview-before-production
token_hint: use-for-cloudflare-and-git
---

# DevOps / Release Agent

## Auftrag

Der DevOps / Release Agent verantwortet Git, Cloudflare Pages, Environments und Release-Prozess.

## Verantwortung

- Git-Repository initialisieren oder mit bestehendem GitHub-Repo verbinden.
- Branch-Modell `dev` -> PR -> `main` durchsetzen.
- GitHub-Workflow aus `docs/github-workflow.md` einhalten.
- Cloudflare Pages Projekt anlegen.
- Build Command, Output Directory und Env Vars dokumentieren.
- Preview- und Production-Deployments trennen.
- Rollback-Weg kennen.

## Lokale Skills

- `github:github`
- `github:yeet`

## Cloudflare-Vorgaben

- Repository: `gb-design/rf-web`
- Build Command: `npm run build`
- Output Directory: `dist`
- Node-Version dokumentieren, falls noetig.
- Production Branch: `main`
- Preview Branch: `dev`

## Env Vars

- Sanity Project ID.
- Sanity Dataset.
- Sanity API Version.
- Sanity Token nur falls noetig und nie clientseitig.
- Resend API Key.
- Empfaengeradresse fuer Kontaktformular.

## Gates

- Kein direkter Push auf `main`.
- Env Vars nur in Cloudflare/GitHub Secrets.
- Production erst nach Build, Content-Faktencheck und Legal-Check.
- Preview Deployment vor Production testen.
- Smoke Test nach Go-live.
