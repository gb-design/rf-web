# Button-System

Stand: 14. Juli 2026

Quelle der visuellen Richtung: [`docs/button-showcase.html`](../button-showcase.html)

## Komponenten

- `src/components/ButtonLink.astro` für Navigation, Downloads und externe Links
- `src/components/Button.astro` für Formulare und Aktionen auf der aktuellen Seite
- `src/components/ButtonIcon.astro` für die integrierten Pfeil- und Kalendericons
- `src/styles/buttons.css` für die gemeinsamen Varianten und Zustände

Die Komponenten übernehmen Farben automatisch aus dem jeweiligen Section-Theme. In einer Sektion mit `data-section-theme="dark"` sind keine separaten Dark-Varianten nötig.

## Varianten

| Variante | Einsatz |
| --- | --- |
| `filled` | Primäre Handlung einer Sektion, zum Beispiel „Termin anfragen“ |
| `ghost` | Sekundäre Handlung neben einem Filled-Button |
| `text` | Dezente weiterführende Navigation |
| `text-muted` | Zurück-Navigation oder sehr zurückhaltende Aktion |

Pro Sektion soll es in der Regel höchstens einen Filled-Button geben.

## Link-Beispiele

```astro
---
import ButtonLink from "../components/ButtonLink.astro";
---

<ButtonLink href="/kontakt">Termin anfragen</ButtonLink>
<ButtonLink href="/leistungen" variant="ghost" icon="arrow">Leistungen</ButtonLink>
<ButtonLink href="/profil" variant="text" arrow>Mehr erfahren</ButtonLink>
<ButtonLink href="/cv.pdf" icon="arrow" download>Lebenslauf herunterladen</ButtonLink>
```

## Formular-Beispiele

```astro
---
import Button from "../components/Button.astro";
---

<Button type="submit" icon="calendar" iconPosition="start">Anfrage senden</Button>
<Button type="reset" variant="text-muted">Eingaben zurücksetzen</Button>
<Button disabled>Wird gesendet</Button>
```

## Props

Beide Komponenten unterstützen:

- `variant`: `filled`, `ghost`, `text`, `text-muted`
- `size`: `default`, `compact`
- `icon`: `arrow`, `calendar`
- `iconPosition`: `start`, `end`

`ButtonLink` unterstützt zusätzlich `href`, `target`, `rel`, `download` und die bestehende Kurzform `arrow`.

`Button` unterstützt zusätzlich `type`, `disabled`, `name` und `value`. Ohne Angabe ist der Typ bewusst `button`, damit eine Komponente nicht versehentlich ein Formular absendet.

## Qualitätsregeln

- Buttontexte sind kurz und handlungsorientiert.
- Touch-Ziele sind mindestens 44 Pixel hoch.
- Ein Icon ergänzt die Beschriftung, ersetzt sie aber nicht.
- Fokuszustände bleiben über die globale `:focus-visible`-Regel sichtbar.
- Animationen werden bei `prefers-reduced-motion` deaktiviert.
- Externe Links mit `target="_blank"` erhalten automatisch `noopener noreferrer`, sofern kein eigenes `rel` angegeben wird.
