# Seite: Events

Slug: `/events`

## Zweck

Medizinischem Fachpublikum kommende Kongresse, Kurse, Workshops und Webinare strukturiert anzeigen. Vergangene Termine werden automatisch archiviert.

## SEO

**Title:** Events & Kongresse | Hernienchirurgie

**Meta Description:** Aktuelle Kongresse, Kurse und Fortbildungen zu Hernienchirurgie, Bauchwandrekonstruktion und minimalinvasiver Chirurgie.

## Sektion 1 — Hero

**Eyebrow:** Fachveranstaltungen

**H1:** Events und Kongresse

**Intro:** Hier finden Sie ausgewählte Kongresse, Kurse, Workshops und Webinare zu Hernienchirurgie, Bauchwandrekonstruktion und minimalinvasiven Verfahren.

## Sektion 2 — Eventplaner

**H2:** Kommende Veranstaltungen

**Filter:** Alle · Kongress · Kurs · Workshop · Webinar

**Sortierung:** Beginn aufsteigend. Nur Events mit `status = published` und einem Enddatum ab heute anzeigen.

**Card-Inhalte:**

- Veranstaltungstyp
- Start- und Enddatum
- Titel
- Kurzbeschreibung
- Ort oder „Online“
- Sprache, wenn relevant
- Externer Link mit Hinweis „Externe Veranstaltungsseite“

**Leerer Zustand:** Derzeit sind keine neuen Veranstaltungen veröffentlicht. Schauen Sie zu einem späteren Zeitpunkt wieder vorbei.

## Sektion 3 — Archiv

**H2:** Vergangene Veranstaltungen

**Text:** Frühere Termine können nach Jahr aufgerufen werden. Das Archiv dient der Dokumentation; Anmeldelinks abgelaufener Veranstaltungen werden nicht hervorgehoben.

## Sektion 4 — Hinweis

**Text:** Für Programm, Anmeldung, Teilnahmebedingungen und mögliche Änderungen ist der jeweilige Veranstalter verantwortlich. Externe Links führen auf die Website des Veranstalters.

## Empfohlenes Sanity-Schema

| Feld | Typ | Pflicht | Beispiel |
| --- | --- | --- | --- |
| `title` | string | ja | Intensivkurs Bauchwandchirurgie |
| `slug` | slug | ja | intensivkurs-bauchwandchirurgie-2026 |
| `eventType` | string/list | ja | course |
| `startDate` | datetime | ja | 2026-09-17T08:30:00+02:00 |
| `endDate` | datetime | ja | 2026-09-18T17:00:00+02:00 |
| `locationName` | string | ja | Medizinisches Trainingszentrum |
| `city` | string | nein | Wien |
| `country` | string | nein | Österreich |
| `isOnline` | boolean | ja | false |
| `language` | string/list | nein | de |
| `excerpt` | text | ja | Zweitägiger praxisorientierter Kurs … |
| `externalUrl` | url | nein | https://example.org/event |
| `organizer` | string | nein | Beispielveranstalter |
| `image` | image | nein | Key Visual |
| `status` | string/list | ja | draft / published / cancelled |
| `isTestData` | boolean | ja | true |

## Testdaten – nicht veröffentlichen

Alle folgenden Veranstaltungen sind frei erfunden. Sie dienen ausschließlich zum Testen von Karten, Filtern, mehrtägigen Datumsbereichen, Online-Events und Archivlogik. `status` bleibt bis zur bewussten Testfreigabe auf `draft`, `isTestData` immer auf `true`.

### 1. Wiener Hernien-Update 2026

- `slug`: `test-wiener-hernien-update-2026`
- `eventType`: `congress`
- `startDate`: `2026-09-17T09:00:00+02:00`
- `endDate`: `2026-09-18T17:00:00+02:00`
- `locationName`: `Medizinisches Forum Wien`
- `city`: `Wien`
- `country`: `Österreich`
- `isOnline`: `false`
- `language`: `de`
- `excerpt`: `Fiktive zweitägige Fortbildung zu aktuellen Konzepten der Leisten- und Narbenhernienchirurgie.`
- `externalUrl`: `https://example.org/test-wiener-hernien-update-2026`
- `organizer`: `Testveranstalter Hernienmedizin`
- `status`: `draft`
- `isTestData`: `true`

### 2. Hands-on Kurs Minimalinvasive Bauchwandchirurgie

- `slug`: `test-hands-on-minimalinvasive-bauchwandchirurgie`
- `eventType`: `course`
- `startDate`: `2026-10-08T08:30:00+02:00`
- `endDate`: `2026-10-09T16:30:00+02:00`
- `locationName`: `Chirurgisches Trainingszentrum Graz`
- `city`: `Graz`
- `country`: `Österreich`
- `isOnline`: `false`
- `language`: `de`
- `excerpt`: `Fiktiver Praxiskurs mit Falldiskussionen und Übungen zu minimalinvasiven Zugangswegen.`
- `externalUrl`: `https://example.org/test-hands-on-bauchwandchirurgie`
- `organizer`: `Testakademie Chirurgie`
- `status`: `draft`
- `isTestData`: `true`

### 3. Webinar: Komplexe Narbenhernien im interdisziplinären Team

- `slug`: `test-webinar-komplexe-narbenhernien`
- `eventType`: `webinar`
- `startDate`: `2026-11-12T18:00:00+01:00`
- `endDate`: `2026-11-12T19:30:00+01:00`
- `locationName`: `Online`
- `isOnline`: `true`
- `language`: `de`
- `excerpt`: `Fiktives Live-Webinar zur strukturierten Beurteilung komplexer Bauchwanddefekte.`
- `externalUrl`: `https://example.org/test-webinar-narbenhernien`
- `organizer`: `Testnetzwerk Bauchwand`
- `status`: `draft`
- `isTestData`: `true`

### 4. European Abdominal Wall Case Forum

- `slug`: `test-european-abdominal-wall-case-forum`
- `eventType`: `workshop`
- `startDate`: `2026-12-03T10:00:00+01:00`
- `endDate`: `2026-12-04T15:30:00+01:00`
- `locationName`: `Clinical Education Centre`
- `city`: `Prag`
- `country`: `Tschechien`
- `isOnline`: `false`
- `language`: `en`
- `excerpt`: `Fiktives internationales Fallforum zu komplexen Entscheidungen in der Bauchwandrekonstruktion.`
- `externalUrl`: `https://example.org/test-european-case-forum`
- `organizer`: `Example Surgical Education Group`
- `status`: `draft`
- `isTestData`: `true`

### 5. Fortbildungstag Reflux und Hiatushernie

- `slug`: `test-fortbildungstag-reflux-hiatushernie`
- `eventType`: `course`
- `startDate`: `2027-01-22T09:00:00+01:00`
- `endDate`: `2027-01-22T17:00:00+01:00`
- `locationName`: `Fortbildungszentrum Salzburg`
- `city`: `Salzburg`
- `country`: `Österreich`
- `isOnline`: `false`
- `language`: `de`
- `excerpt`: `Fiktive eintägige Fortbildung zu Diagnostik, Indikationsstellung und operativen Strategien.`
- `externalUrl`: `https://example.org/test-reflux-hiatushernie`
- `organizer`: `Testforum Viszeralchirurgie`
- `status`: `draft`
- `isTestData`: `true`

### 6. Young Surgeons Hernia Lab

- `slug`: `test-young-surgeons-hernia-lab`
- `eventType`: `workshop`
- `startDate`: `2027-02-11T08:00:00+01:00`
- `endDate`: `2027-02-12T16:00:00+01:00`
- `locationName`: `Anatomisches Trainingslabor Innsbruck`
- `city`: `Innsbruck`
- `country`: `Österreich`
- `isOnline`: `false`
- `language`: `en`
- `excerpt`: `Fiktiver Workshop für chirurgischen Nachwuchs mit anatomischen Übungen und strukturiertem Feedback.`
- `externalUrl`: `https://example.org/test-young-surgeons-hernia-lab`
- `organizer`: `Example Hernia Faculty`
- `status`: `draft`
- `isTestData`: `true`

### 7. Hybrid Symposium: Zukunft der Hernienchirurgie

- `slug`: `test-hybrid-symposium-zukunft-hernienchirurgie`
- `eventType`: `congress`
- `startDate`: `2027-03-18T09:30:00+01:00`
- `endDate`: `2027-03-19T16:00:00+01:00`
- `locationName`: `Kongresszentrum Linz und Online`
- `city`: `Linz`
- `country`: `Österreich`
- `isOnline`: `true`
- `language`: `de`
- `excerpt`: `Fiktives Hybridsymposium zu Qualitätsdaten, Robotik und individualisierten Operationskonzepten.`
- `externalUrl`: `https://example.org/test-hybrid-symposium-hernienchirurgie`
- `organizer`: `Testgesellschaft für Hernienchirurgie`
- `status`: `draft`
- `isTestData`: `true`

### 8. Masterclass Abdominal Wall Reconstruction

- `slug`: `test-masterclass-abdominal-wall-reconstruction`
- `eventType`: `course`
- `startDate`: `2027-04-15T08:30:00+02:00`
- `endDate`: `2027-04-16T17:30:00+02:00`
- `locationName`: `European Skills Centre`
- `city`: `München`
- `country`: `Deutschland`
- `isOnline`: `false`
- `language`: `en`
- `excerpt`: `Fiktive Masterclass mit komplexen Fallkonferenzen und Demonstrationen rekonstruktiver Verfahren.`
- `externalUrl`: `https://example.org/test-masterclass-awr`
- `organizer`: `Example Abdominal Wall Institute`
- `status`: `draft`
- `isTestData`: `true`
