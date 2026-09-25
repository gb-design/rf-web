# Events-Teaser Startseite — Redesign „Programmheft"

Stand: 25. September 2026

## Anlass

Der Event-Teaser der Startseite wirkte langweilig: vier leere Spalten unter der Überschrift, isoliert schwebender Intro-Text, das Datum als schwächstes Element (kleine Mono-Schrift, Umbruch „30. Sep – 2. Okt / 2026"), drei gleichförmige Zeilen ohne Hierarchie, als einzige Interaktion ein kleiner Unterstreichungslink. Zusätzlich stand der Eventtitel auf `font-weight: 500`, geladen sind nur 400 und 600.

## Entscheidungen

- Richtung „Programmheft": Datum als große typografische Marke, editoriale Zeilen.
- Klickziel jeder Zeile ist `/events#termin-<slug>`, nicht die externe Veranstalterseite. Die Besucher bleiben auf der Website, jede Zeile verhält sich gleich, auch ohne `externalUrl`.
- Keine Scroll-Einblendung, kein JavaScript.

## Layout

- Überschrift (Eyebrow + H2) oben links, Spalten 1–7.
- Darunter links (Spalten 1–4) das Intro, unten in derselben Spalte der Link „Alle n Termine" (bei höchstens drei kommenden Terminen „Zum Eventbereich").
- Liste rechts ab Spalte 5, bündig mit der Liste auf `/events`.
- Mobil gestapelt in DOM-Reihenfolge: Überschrift, Intro, Liste, Link.

## Zeile (`EventTeaser.astro`)

- Datumsmarke: große Tageszahl (`30`, `12`, `3–4`), darunter Monat und Jahr in Versalien, darunter bei mehrtägigen Terminen „bis 2. Okt", bei eintägigen die Uhrzeit aus `zeitBereich()`. Visuell `aria-hidden`, für Screenreader das volle `datumBereich()`.
- Merkmale (Typ · Online · EN), Titel in 600, Ort als gedämpfte Zeile.
- „Nächster Termin" mit rotem Sechseck am ersten nicht abgesagten Termin.
- Abgesagt: Marke „Abgesagt", gedämpfte Tageszahl.
- Pfeil in 1px-Kreis rechts, Hover füllt ihn von links (Ghost-Button-Sprache).
- Titel ist der Link, `::after` spannt die Klickfläche über die Zeile. Fokusring über `:has(:focus-visible)` um die ganze Zeile.
- Hover nur bei `(hover: hover)`, Bewegung nur über `transform`, Reduced Motion ohne Verschiebung.

## Datumslogik

`datumMarke(startISO, endISO)` in `src/lib/eventDatum.ts`, Zeitzone Wien über die bestehende `teile()`:

| Fall | tage | monat | bis |
| --- | --- | --- | --- |
| eintägig | `12` | `Nov 2026` | — |
| gleicher Monat | `3–4` | `Dez 2026` | — |
| über Monatsgrenze | `30` | `Sep 2026` | `bis 2. Okt` |
| über Jahresgrenze | `28` | `Dez 2026` | `bis 3. Jan 2027` |

## Eventseite

`EventCard` erhält `id="termin-<slug>"`. `:target` hebt die Zeile mit einer ausblendenden hellblauen Fläche hervor, unter Reduced Motion statisch. Der Sticky-Header ist über `scroll-padding-top` abgedeckt.

## Prüfung

`npm test`, `npm run build`, Screenshots bei 375, 768, 1024, 1440 px inklusive Hover und Fokus, Ansprung auf `/events`, Reduced Motion.
