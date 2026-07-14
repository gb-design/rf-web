---
id: skill-policy
type: policy
status: active
scope: skills
triggers:
  - install-skill
  - find-skill
  - external-capability
inputs:
  - available-skills
  - skills.sh
outputs:
  - skill-recommendation
  - install-decision
gates:
  - source-reviewed
  - need-justified
  - supply-chain-risk-considered
token_hint: read-before-skill-install
---

# Skill Policy

## Ziel

Diese Policy regelt, wann lokale oder externe Skills fuer das Projekt genutzt werden.

## Grundsatz

Installierte lokale Skills werden bevorzugt. Neue Skills werden nur empfohlen oder installiert, wenn sie fachlich klar passen und keinen unnoetigen Supply-Chain-Risikozuwachs erzeugen.

## Bereits ausreichend abgedeckt

- Design und UI: `frontend-design`, `impeccable`, `design`, `layout`, `typeset`, `polish`
- Security: `security-best-practices`
- QA und Browser: `audit`, `critique`, `playwright`
- SEO/Performance: `seo-geo`, `optimize`
- Assets: `imagegen`, `higgsfield-generate`, `pdf:pdf`
- GitHub/PRs: `github:github`, `github:yeet`

## Pruefkriterien fuer neue Skills

- Quelle ist vertrauenswuerdig oder gut reputiert.
- Installationszahlen und Repository wirken belastbar.
- Skill ist fachlich passend.
- Skill bringt mehr als allgemeine Agentenfaehigkeit.
- Keine Installation fuer Kern-Security ohne zwingenden Grund.

## Potenzielle externe Kandidaten

- `obra/superpowers@writing-plans`
- `obra/superpowers@subagent-driven-development`
- `obra/superpowers@dispatching-parallel-agents`
- `obra/superpowers@verification-before-completion`
- `anthropics/skills@webapp-testing`

## Installationsregel

Vor Installation:

1. Bedarf konkret benennen.
2. Quelle und Paketname pruefen.
3. Nutzen gegen Risiko abwaegen.
4. Installation dokumentieren.

Keine Skill-Installation nur, weil ein Skill theoretisch existiert.
