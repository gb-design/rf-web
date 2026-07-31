# Events-Seite Etappe A — Umsetzungsplan

> **Für agentische Ausführung:** Dieser Plan ist mit `superpowers:executing-plans` oder `superpowers:subagent-driven-development` abzuarbeiten. Die Schritte nutzen Checkbox-Syntax (`- [ ]`) zur Nachverfolgung.

**Ziel:** Die Seite `/events` vollständig mit lokalen Testdaten umsetzen — Editorial-Zeilenliste, CSS-only Multiselect-Filter, Archiv nach Jahr, optionales Eventbild.

**Architektur:** Zwei reine Logikmodule in `src/lib/` (Datumsformat, Datenzugriff) liefern an drei Astro-Komponenten. Die Seite komponiert nur. Die Schnittstelle `src/lib/events.ts` ist der spätere Tauschpunkt gegen Sanity — Typ und Signaturen bleiben in Etappe B unverändert.

**Tech Stack:** Astro 5.18.2, TypeScript, CSS Custom Properties. Tests über den in Node 22.23 eingebauten Runner (`node --test`) — **keine neue Abhängigkeit**.

**Spec:** `docs/superpowers/specs/2026-07-31-events-etappe-a-design.md`

---

## Dateistruktur

| Datei | Verantwortung |
| --- | --- |
| `src/lib/eventDatum.ts` | Datumsbereiche als deutscher Text, ISO-Attributwerte. Kennt keine Events. |
| `src/lib/eventDatum.test.ts` | Vier Datumsfälle, Zeitzonenfestigkeit |
| `src/lib/events.ts` | `EventItem`, Testdaten, `kommendeEvents`, `vergangeneEvents`, `verfuegbareTypen`, `nachJahr` |
| `src/lib/events.test.ts` | Zeitgrenze, Statusfilterung, Sortierung, Zählung |
| `src/components/EventCard.astro` | Eine Zeile. Prop `compact` fürs Archiv. |
| `src/components/EventFilter.astro` | Fieldset, Checkboxen, Zähler, Reset |
| `src/components/EventList.astro` | Filter + Liste + Leerzustand + **globale Filter-CSS** |
| `src/components/EventFilter.script.ts` | Trefferzähler-Live-Region und Escape. Reiner Aufsatz. |
| `src/pages/events.astro` | Intro, kommend, Archiv, Hinweis, JSON-LD |
| `public/images/events/` | Zwei Testbilder |

Zwei Regeln, die im Projekt bereits einmal Fehler verursacht haben und hier gelten:

1. **Filter-CSS muss global sein.** Die `:has()`-Regeln verbinden `EventFilter.astro` mit `EventCard.astro`. Astro hängt an jeden gescopten Selektor ein `[data-astro-cid-…]`, wodurch komponentenübergreifende Regeln stillschweigend nie greifen. Deshalb `<style is:global>` in `EventList.astro`, alles unter `.events` verschachtelt.
2. **Zeilenabstände über `--grid-row-gap`**, nie über direktes `row-gap` auf einem Grid-Root — das verliert gegen die gescopte Regel in `Grid.astro`.

---

## Chunk 1: Datumsmodul

### Task 1: Testlauf einrichten

**Dateien:** Ändern: `package.json`

- [ ] **Schritt 1: Testskript ergänzen**

In `package.json` unter `scripts` einfügen:

```json
"test": "node --test src/lib/*.test.ts"
```

Keine Abhängigkeit hinzufügen. Node 22.23 strippt TypeScript-Typen nativ und bringt `node:test` mit.

- [ ] **Schritt 2: Leerlauf prüfen**

Ausführen: `npm test`
Erwartet: läuft durch, `# tests 0` (noch keine Testdateien vorhanden). Kein Fehler über fehlende Module.

- [ ] **Schritt 3: Committen**

```bash
git add package.json
git commit -m "Testskript auf Nodes eingebautem Runner ergaenzen"
```

### Task 2: `eventDatum.ts` — die vier Datumsfälle

**Dateien:**
- Erstellen: `src/lib/eventDatum.ts`
- Erstellen: `src/lib/eventDatum.test.ts`

- [ ] **Schritt 1: Fehlschlagenden Test schreiben**

`src/lib/eventDatum.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { datumBereich, isoDatum } from "./eventDatum.ts";

test("eintägig", () => {
  assert.equal(
    datumBereich("2026-11-12T18:00:00+01:00", "2026-11-12T19:30:00+01:00"),
    "12. Nov 2026",
  );
});

test("mehrtägig im selben Monat", () => {
  assert.equal(
    datumBereich("2026-09-17T09:00:00+02:00", "2026-09-18T17:00:00+02:00"),
    "17.–18. Sep 2026",
  );
});

test("über Monatsgrenze", () => {
  assert.equal(
    datumBereich("2026-09-30T08:30:00+02:00", "2026-10-02T16:30:00+02:00"),
    "30. Sep – 2. Okt 2026",
  );
});

test("über Jahresgrenze", () => {
  assert.equal(
    datumBereich("2026-12-28T09:00:00+01:00", "2027-01-03T15:00:00+01:00"),
    "28. Dez 2026 – 3. Jan 2027",
  );
});

test("isoDatum liefert den Wiener Kalendertag", () => {
  assert.equal(isoDatum("2026-09-17T09:00:00+02:00"), "2026-09-17");
});

// Der Kern der Zeitzonenfalle: 00:30 Wiener Zeit ist am Vortag 22:30 UTC.
// Mit new Date().getDate() auf einem UTC-Runner käme hier der 16. heraus.
test("Tagesgrenze bleibt Wien, auch wenn die Laufzeit UTC ist", () => {
  const alteTZ = process.env.TZ;
  process.env.TZ = "UTC";
  try {
    assert.equal(isoDatum("2026-09-17T00:30:00+02:00"), "2026-09-17");
  } finally {
    process.env.TZ = alteTZ;
  }
});
```

- [ ] **Schritt 2: Test laufen lassen, Fehlschlag bestätigen**

Ausführen: `npm test`
Erwartet: FAIL — `Cannot find module './eventDatum.ts'`

- [ ] **Schritt 3: Modul implementieren**

`src/lib/eventDatum.ts`:

```ts
const ZEITZONE = "Europe/Vienna";

const MONATE = [
  "Jan", "Feb", "Mär", "Apr", "Mai", "Jun",
  "Jul", "Aug", "Sep", "Okt", "Nov", "Dez",
];

type Teile = { tag: number; monat: number; jahr: number };

// Ausschließlich über Intl, nie über getDate() — sonst bestimmt die Zeitzone
// der Laufzeitumgebung das Ergebnis und ein UTC-Build verschiebt Tagesgrenzen.
function teile(iso: string): Teile {
  const parts = new Intl.DateTimeFormat("de-AT", {
    timeZone: ZEITZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(new Date(iso));

  const wert = (typ: string) => Number(parts.find((p) => p.type === typ)!.value);
  return { tag: wert("day"), monat: wert("month"), jahr: wert("year") };
}

export function isoDatum(iso: string): string {
  const { tag, monat, jahr } = teile(iso);
  return `${jahr}-${String(monat).padStart(2, "0")}-${String(tag).padStart(2, "0")}`;
}

export function datumBereich(startISO: string, endISO: string): string {
  const a = teile(startISO);
  const b = teile(endISO);

  const monatA = MONATE[a.monat - 1];
  const monatB = MONATE[b.monat - 1];

  if (a.jahr !== b.jahr) {
    return `${a.tag}. ${monatA} ${a.jahr} – ${b.tag}. ${monatB} ${b.jahr}`;
  }
  if (a.monat !== b.monat) {
    return `${a.tag}. ${monatA} – ${b.tag}. ${monatB} ${b.jahr}`;
  }
  if (a.tag !== b.tag) {
    return `${a.tag}.–${b.tag}. ${monatA} ${a.jahr}`;
  }
  return `${a.tag}. ${monatA} ${a.jahr}`;
}
```

Zur Typografie: Im selben Monat steht der Halbgeviertstrich ohne Spatien (`17.–18.`), über Monats- und Jahresgrenze mit (`30. Sep – 2. Okt`). Das entspricht deutschem Satz und ist bewusst uneinheitlich.

- [ ] **Schritt 4: Test laufen lassen, Erfolg bestätigen**

Ausführen: `npm test`
Erwartet: `# pass 6`, `# fail 0`

- [ ] **Schritt 5: Committen**

```bash
git add src/lib/eventDatum.ts src/lib/eventDatum.test.ts
git commit -m "Datumsformat fuer Eventbereiche mit Wiener Zeitzone"
```

---

## Chunk 2: Datenmodul

### Task 3: `events.ts` — Typ, Selektoren, Testdaten

**Dateien:**
- Erstellen: `src/lib/events.ts`
- Erstellen: `src/lib/events.test.ts`

- [ ] **Schritt 1: Fehlschlagenden Test schreiben**

`src/lib/events.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  kommendeEvents, vergangeneEvents, verfuegbareTypen, nachJahr,
} from "./events.ts";

const STICHTAG = new Date("2026-07-31T12:00:00+02:00");

test("Entwürfe erscheinen nirgends", () => {
  const alle = [...kommendeEvents(STICHTAG), ...vergangeneEvents(STICHTAG)];
  assert.equal(alle.some((e) => e.status === "draft"), false);
});

test("abgesagte Events bleiben sichtbar", () => {
  assert.equal(
    kommendeEvents(STICHTAG).some((e) => e.status === "cancelled"),
    true,
  );
});

// Trennung über endDate, nicht startDate: ein laufender Kongress bleibt "kommend"
test("laufendes Event zählt als kommend", () => {
  const mitten = new Date("2026-09-18T09:00:00+02:00");
  const slugs = kommendeEvents(mitten).map((e) => e.slug);
  assert.ok(slugs.includes("test-wiener-hernien-update-2026"));
});

test("kommende aufsteigend, vergangene absteigend sortiert", () => {
  const k = kommendeEvents(STICHTAG).map((e) => +new Date(e.startDate));
  assert.deepEqual(k, [...k].sort((a, b) => a - b));

  const v = vergangeneEvents(STICHTAG).map((e) => +new Date(e.startDate));
  assert.deepEqual(v, [...v].sort((a, b) => b - a));
});

// Die Garantie "Filtern erzeugt nie null Treffer" hängt genau hieran:
// gezählt wird aus dem Array, das anschließend gerendert wird.
test("verfuegbareTypen zählt aus dem übergebenen Array", () => {
  const kommend = kommendeEvents(STICHTAG);
  const typen = verfuegbareTypen(kommend);

  assert.equal(typen.every((t) => t.anzahl > 0), true);
  assert.equal(
    typen.reduce((s, t) => s + t.anzahl, 0),
    kommend.length,
  );
  for (const t of typen) {
    assert.equal(
      kommend.filter((e) => e.eventType === t.typ).length,
      t.anzahl,
    );
  }
});

test("verfuegbareTypen auf leerem Array liefert nichts", () => {
  assert.deepEqual(verfuegbareTypen([]), []);
});

test("Archiv nach Jahr gruppiert, neuestes zuerst", () => {
  const gruppen = nachJahr(vergangeneEvents(STICHTAG));
  const jahre = gruppen.map((g) => g.jahr);
  assert.deepEqual(jahre, [...jahre].sort((a, b) => b - a));
  assert.equal(gruppen.every((g) => g.events.length > 0), true);
});

test("alle vier Datumsfälle kommen in den Testdaten vor", () => {
  const k = kommendeEvents(STICHTAG);
  const tag = (iso: string) => iso.slice(0, 10);

  assert.ok(k.some((e) => tag(e.startDate) === tag(e.endDate)), "eintägig fehlt");
  assert.ok(
    k.some((e) => e.startDate.slice(0, 7) === e.endDate.slice(0, 7) && tag(e.startDate) !== tag(e.endDate)),
    "mehrtägig im Monat fehlt",
  );
  assert.ok(
    k.some((e) => e.startDate.slice(0, 4) === e.endDate.slice(0, 4) && e.startDate.slice(5, 7) !== e.endDate.slice(5, 7)),
    "Monatsgrenze fehlt",
  );
  assert.ok(
    k.some((e) => e.startDate.slice(0, 4) !== e.endDate.slice(0, 4)),
    "Jahresgrenze fehlt",
  );
});
```

- [ ] **Schritt 2: Test laufen lassen, Fehlschlag bestätigen**

Ausführen: `npm test`
Erwartet: FAIL — `Cannot find module './events.ts'`

- [ ] **Schritt 3: Modul implementieren**

`src/lib/events.ts`:

```ts
export type EventTyp = "congress" | "course" | "workshop" | "webinar";
export type EventStatus = "published" | "draft" | "cancelled";

export type EventItem = {
  slug: string;
  title: string;
  eventType: EventTyp;
  startDate: string;
  endDate: string;
  locationName: string;
  city?: string;
  isOnline: boolean;
  language?: "de" | "en";
  excerpt: string;
  externalUrl?: string;
  image?: { src: string; width: number; height: number };
  imageAlt?: string;
  status: EventStatus;
};

export const TYP_LABEL: Record<EventTyp, string> = {
  congress: "Kongress",
  course: "Kurs",
  workshop: "Workshop",
  webinar: "Webinar",
};

// Alle Einträge sind frei erfunden und dienen ausschließlich der Entwicklung.
// In Etappe B ersetzt eine GROQ-Query dieses Array; Typ und Signaturen bleiben.
const EVENTS: EventItem[] = [
  {
    slug: "test-wiener-hernien-update-2026",
    title: "Wiener Hernien-Update 2026",
    eventType: "congress",
    startDate: "2026-09-17T09:00:00+02:00",
    endDate: "2026-09-18T17:00:00+02:00",
    locationName: "Medizinisches Forum Wien",
    city: "Wien",
    isOnline: false,
    language: "de",
    excerpt:
      "Fiktive zweitägige Fortbildung zu aktuellen Konzepten der Leisten- und Narbenhernienchirurgie.",
    externalUrl: "https://example.org/test-wiener-hernien-update-2026",
    image: { src: "/images/events/test-kongress-wien.jpg", width: 1200, height: 900 },
    status: "published",
  },
  {
    slug: "test-hands-on-minimalinvasive-bauchwandchirurgie",
    title: "Hands-on Kurs Minimalinvasive Bauchwandchirurgie",
    eventType: "course",
    startDate: "2026-09-30T08:30:00+02:00",
    endDate: "2026-10-02T16:30:00+02:00",
    locationName: "Chirurgisches Trainingszentrum Graz",
    city: "Graz",
    isOnline: false,
    language: "de",
    excerpt:
      "Fiktiver Praxiskurs mit Falldiskussionen und Übungen zu minimalinvasiven Zugangswegen.",
    externalUrl: "https://example.org/test-hands-on-bauchwandchirurgie",
    status: "published",
  },
  {
    slug: "test-webinar-komplexe-narbenhernien",
    title: "Komplexe Narbenhernien im interdisziplinären Team",
    eventType: "webinar",
    startDate: "2026-11-12T18:00:00+01:00",
    endDate: "2026-11-12T19:30:00+01:00",
    locationName: "Online",
    isOnline: true,
    language: "de",
    excerpt:
      "Fiktives Live-Webinar zur strukturierten Beurteilung komplexer Bauchwanddefekte.",
    externalUrl: "https://example.org/test-webinar-narbenhernien",
    status: "published",
  },
  {
    slug: "test-european-abdominal-wall-case-forum",
    title: "European Abdominal Wall Case Forum",
    eventType: "workshop",
    startDate: "2026-12-03T10:00:00+01:00",
    endDate: "2026-12-04T15:30:00+01:00",
    locationName: "Clinical Education Centre",
    city: "Prag",
    isOnline: false,
    language: "en",
    excerpt:
      "Fiktives internationales Fallforum zu komplexen Entscheidungen in der Bauchwandrekonstruktion.",
    externalUrl: "https://example.org/test-european-case-forum",
    image: { src: "/images/events/test-workshop-prag.jpg", width: 1200, height: 900 },
    imageAlt: "",
    status: "published",
  },
  {
    // Existiert, damit der Datumsfall über die Jahresgrenze tatsächlich gerendert wird.
    slug: "test-jahreswechsel-symposium-bauchwand",
    title: "Jahreswechsel-Symposium Bauchwand",
    eventType: "workshop",
    startDate: "2026-12-28T09:00:00+01:00",
    endDate: "2027-01-03T15:00:00+01:00",
    locationName: "Fortbildungszentrum Wien",
    city: "Wien",
    isOnline: false,
    language: "de",
    excerpt:
      "Fiktives Symposium über den Jahreswechsel zu rekonstruktiven Verfahren der Bauchwand.",
    externalUrl: "https://example.org/test-jahreswechsel-symposium",
    status: "published",
  },
  {
    slug: "test-fortbildungstag-reflux-hiatushernie",
    title: "Fortbildungstag Reflux und Hiatushernie",
    eventType: "course",
    startDate: "2027-01-22T09:00:00+01:00",
    endDate: "2027-01-22T17:00:00+01:00",
    locationName: "Fortbildungszentrum Salzburg",
    city: "Salzburg",
    isOnline: false,
    language: "de",
    excerpt:
      "Fiktive eintägige Fortbildung zu Diagnostik, Indikationsstellung und operativen Strategien.",
    externalUrl: "https://example.org/test-reflux-hiatushernie",
    status: "published",
  },
  {
    slug: "test-young-surgeons-hernia-lab",
    title: "Young Surgeons Hernia Lab",
    eventType: "workshop",
    startDate: "2027-02-11T08:00:00+01:00",
    endDate: "2027-02-12T16:00:00+01:00",
    locationName: "Anatomisches Trainingslabor Innsbruck",
    city: "Innsbruck",
    isOnline: false,
    language: "en",
    excerpt:
      "Fiktiver Workshop für chirurgischen Nachwuchs mit anatomischen Übungen und strukturiertem Feedback.",
    externalUrl: "https://example.org/test-young-surgeons-hernia-lab",
    status: "published",
  },
  {
    // Existiert, damit der Zustand "abgesagt" gestaltet und geprüft ist.
    slug: "test-hybrid-symposium-zukunft-hernienchirurgie",
    title: "Hybrid Symposium: Zukunft der Hernienchirurgie",
    eventType: "congress",
    startDate: "2027-03-18T09:30:00+01:00",
    endDate: "2027-03-19T16:00:00+01:00",
    locationName: "Kongresszentrum Linz",
    city: "Linz",
    isOnline: true,
    language: "de",
    excerpt:
      "Fiktives Hybridsymposium zu Qualitätsdaten, Robotik und individualisierten Operationskonzepten.",
    externalUrl: "https://example.org/test-hybrid-symposium",
    status: "cancelled",
  },
  {
    slug: "test-masterclass-abdominal-wall-reconstruction",
    title: "Masterclass Abdominal Wall Reconstruction",
    eventType: "course",
    startDate: "2027-04-15T08:30:00+02:00",
    endDate: "2027-04-16T17:30:00+02:00",
    locationName: "European Skills Centre",
    city: "München",
    isOnline: false,
    language: "en",
    excerpt:
      "Fiktive Masterclass mit komplexen Fallkonferenzen und Demonstrationen rekonstruktiver Verfahren.",
    externalUrl: "https://example.org/test-masterclass-awr",
    status: "published",
  },
  {
    // Existiert, um zu belegen, dass Entwürfe nirgends erscheinen.
    slug: "test-interner-entwurf",
    title: "Interner Entwurf, darf nicht erscheinen",
    eventType: "workshop",
    startDate: "2027-05-05T09:00:00+02:00",
    endDate: "2027-05-06T17:00:00+02:00",
    locationName: "Intern",
    isOnline: false,
    excerpt: "Dieser Eintrag darf auf der Seite nirgends sichtbar sein.",
    status: "draft",
  },
  {
    slug: "test-salzburger-hernientage-2026",
    title: "Salzburger Hernientage 2026",
    eventType: "congress",
    startDate: "2026-06-12T09:00:00+02:00",
    endDate: "2026-06-13T16:00:00+02:00",
    locationName: "Kongresshaus Salzburg",
    city: "Salzburg",
    isOnline: false,
    language: "de",
    excerpt: "Fiktive Jahrestagung zu Standards und Qualitätssicherung in der Hernienchirurgie.",
    externalUrl: "https://example.org/test-salzburger-hernientage-2026",
    status: "published",
  },
  {
    slug: "test-hernie-kompakt-2025",
    title: "Hernie kompakt Österreich 2025",
    eventType: "course",
    startDate: "2025-11-07T09:00:00+01:00",
    endDate: "2025-11-07T17:00:00+01:00",
    locationName: "Ordinationszentrum Rudolfinerhaus",
    city: "Wien",
    isOnline: false,
    language: "de",
    excerpt: "Fiktiver Kompaktkurs zu Indikationsstellung und Nachsorge.",
    status: "published",
  },
];

const sichtbar = (e: EventItem) => e.status !== "draft";
const zeit = (iso: string) => new Date(iso).getTime();

export function kommendeEvents(jetzt: Date = new Date()): EventItem[] {
  return EVENTS
    .filter(sichtbar)
    .filter((e) => zeit(e.endDate) >= jetzt.getTime())
    .sort((a, b) => zeit(a.startDate) - zeit(b.startDate));
}

export function vergangeneEvents(jetzt: Date = new Date()): EventItem[] {
  return EVENTS
    .filter(sichtbar)
    .filter((e) => zeit(e.endDate) < jetzt.getTime())
    .sort((a, b) => zeit(b.startDate) - zeit(a.startDate));
}

export type TypAuswahl = { typ: EventTyp; label: string; anzahl: number };

// Nimmt das Array entgegen, das anschließend gerendert wird. Griffe die Funktion
// selbst auf EVENTS zu, entstünden Filter ohne Treffer und die Zusicherung
// "Filtern erzeugt nie einen Leerzustand" bräche still.
export function verfuegbareTypen(events: EventItem[]): TypAuswahl[] {
  const zaehler = new Map<EventTyp, number>();
  for (const e of events) {
    zaehler.set(e.eventType, (zaehler.get(e.eventType) ?? 0) + 1);
  }
  return [...zaehler.entries()]
    .map(([typ, anzahl]) => ({ typ, label: TYP_LABEL[typ], anzahl }))
    .sort((a, b) => a.label.localeCompare(b.label, "de"));
}

export function nachJahr(events: EventItem[]): { jahr: number; events: EventItem[] }[] {
  const gruppen = new Map<number, EventItem[]>();
  for (const e of events) {
    const jahr = Number(
      new Intl.DateTimeFormat("de-AT", {
        timeZone: "Europe/Vienna",
        year: "numeric",
      }).format(new Date(e.startDate)),
    );
    gruppen.set(jahr, [...(gruppen.get(jahr) ?? []), e]);
  }
  return [...gruppen.entries()]
    .map(([jahr, events]) => ({ jahr, events }))
    .sort((a, b) => b.jahr - a.jahr);
}
```

- [ ] **Schritt 4: Test laufen lassen, Erfolg bestätigen**

Ausführen: `npm test`
Erwartet: alle Tests grün, `# fail 0`

- [ ] **Schritt 5: Committen**

```bash
git add src/lib/events.ts src/lib/events.test.ts
git commit -m "Datenmodul fuer Events mit Testdaten und Selektoren"
```

---

## Chunk 3: Komponenten

### Task 4: Testbilder ablegen

**Dateien:** Erstellen: `public/images/events/test-kongress-wien.jpg`, `public/images/events/test-workshop-prag.jpg`

- [ ] **Schritt 1: Zwei Platzhalterbilder ablegen**

Zwei vorhandene, rechtefreie Bilder aus dem Arbeitsmaterial im Format 4:3 auf 1200×900 skalieren und unter den obigen Pfaden ablegen. Sie sind reines Entwicklungsmaterial und werden in Etappe B durch das Sanity-CDN ersetzt.

- [ ] **Schritt 2: Committen**

```bash
git add public/images/events/
git commit -m "Testbilder fuer die Eventliste ablegen"
```

### Task 5: `EventCard.astro`

**Dateien:** Erstellen: `src/components/EventCard.astro`

- [ ] **Schritt 1: Komponente schreiben**

```astro
---
import { datumBereich, isoDatum } from "../lib/eventDatum";
import { TYP_LABEL, type EventItem } from "../lib/events";

interface Props {
  event: EventItem;
  compact?: boolean;
}

const { event, compact = false } = Astro.props;

const abgesagt = event.status === "cancelled";
const ort = event.isOnline ? "Online" : [event.locationName, event.city].filter(Boolean).join(", ");
const merkmale = [TYP_LABEL[event.eventType]];
if (event.isOnline) merkmale.push("Online");
if (event.language === "en") merkmale.push("EN");
---

<li class="event" data-type={event.eventType} class:list={{ "event--compact": compact }}>
  <p class="event__datum">
    <time datetime={isoDatum(event.startDate)}>{datumBereich(event.startDate, event.endDate)}</time>
  </p>

  <div class="event__inhalt">
    <p class="event__merkmale">
      {merkmale.join(" · ")}
      {abgesagt && <span class="event__abgesagt">Abgesagt</span>}
    </p>

    <h3 class="event__titel">{event.title}</h3>

    {!compact && <p class="event__text">{event.excerpt}</p>}

    <p class="event__meta">
      <span>{ort}</span>
      {event.externalUrl && (
        <a class="event__link" href={event.externalUrl} target="_blank" rel="noopener noreferrer">
          Veranstaltungsseite<span class="visually-hidden"> (öffnet in neuem Tab)</span>
        </a>
      )}
    </p>
  </div>

  {!compact && event.image && (
    <img
      class="event__bild"
      src={event.image.src}
      width={event.image.width}
      height={event.image.height}
      alt={event.imageAlt ?? ""}
      loading="lazy"
      decoding="async"
    />
  )}
</li>

<style>
  /* Der Anzeigemodus liegt in einer Custom Property, damit die globale
     Filterregel ihn beim Wiedereinblenden nicht gegen den Breakpoint
     überschreibt. Siehe EventList.astro. */
  .event {
    display: var(--event-display, grid);
    grid-template-columns: 9rem 1fr minmax(0, 12rem);
    gap: var(--space-6);
    padding-block: var(--space-6);
    border-top: 1px solid var(--color-border);
    align-items: start;
  }

  .event:last-child { border-bottom: 1px solid var(--color-border); }

  .event:not(:has(.event__bild)) { grid-template-columns: 9rem 1fr; }

  .event__datum {
    margin: 0;
    color: var(--color-text);
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    font-variant-numeric: tabular-nums;
    line-height: 1.5;
  }

  .event__merkmale {
    margin: 0 0 var(--space-2);
    display: flex;
    align-items: center;
    gap: var(--space-3);
    color: var(--color-text-muted);
    font-size: var(--text-meta);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .event__abgesagt {
    color: var(--color-accent-deep);
    font-weight: 600;
  }

  .event__titel {
    margin: 0 0 var(--space-3);
    font-size: var(--text-h3);
    font-weight: 500;
    line-height: 1.25;
    letter-spacing: -0.01em;
  }

  .event--compact .event__titel { margin-bottom: var(--space-2); }

  .event__text {
    margin: 0 0 var(--space-3);
    max-width: 55ch;
    color: var(--color-text-muted);
  }

  .event__meta {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
    color: var(--color-text-muted);
    font-size: var(--text-meta);
  }

  .event__link { color: var(--color-primary-strong); font-weight: 500; }
  .event__link:hover { color: var(--color-primary-strong-hover); }

  .event__bild {
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    border-radius: var(--radius-image);
  }

  @media (max-width: 42rem) {
    .event,
    .event:not(:has(.event__bild)) {
      --event-display: block;
    }

    .event__datum { margin-bottom: var(--space-2); }
    .event__bild { margin-top: var(--space-4); max-width: 20rem; }
  }
</style>
```

- [ ] **Schritt 2: Typprüfung**

Ausführen: `npx astro check`
Erwartet: 0 Fehler

- [ ] **Schritt 3: Committen**

```bash
git add src/components/EventCard.astro
git commit -m "EventCard als Editorial-Zeile mit optionalem Bild"
```

### Task 6: `EventFilter.astro`

**Dateien:** Erstellen: `src/components/EventFilter.astro`

- [ ] **Schritt 1: Komponente schreiben**

```astro
---
import type { TypAuswahl } from "../lib/events";

interface Props {
  typen: TypAuswahl[];
  gesamt: number;
}

const { typen, gesamt } = Astro.props;
---

<form class="filter" id="event-filter">
  <fieldset class="filter__set">
    <legend class="filter__legende">Nach Veranstaltungstyp filtern</legend>

    {typen.map(({ typ, label, anzahl }) => (
      <>
        <input
          class="filter__input"
          type="checkbox"
          id={`f-${typ}`}
          name="typ"
          value={typ}
          autocomplete="off"
        />
        <label class="filter__label" for={`f-${typ}`}>
          {label} <span class="filter__anzahl">{anzahl}</span>
        </label>
      </>
    ))}

    <button class="filter__reset" type="reset">Alle anzeigen</button>
  </fieldset>

  <p class="filter__status" role="status" aria-live="polite" data-gesamt={gesamt}>
    {gesamt} Termine
  </p>
</form>

<style>
  .filter { margin-bottom: var(--space-8); }

  .filter__set {
    margin: 0;
    padding: 0;
    border: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3);
  }

  .filter__legende {
    padding: 0;
    width: 100%;
    margin-bottom: var(--space-4);
    color: var(--color-text-muted);
    font-size: var(--text-label);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  /* Sichtbar versteckt, aber fokussierbar — der Fokusring liegt auf dem Label. */
  .filter__input {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .filter__label {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-pill);
    color: var(--color-text);
    font-size: var(--text-meta);
    cursor: pointer;
    transition: border-color 0.15s, background-color 0.15s, color 0.15s;
  }

  .filter__label:hover { border-color: var(--color-primary-strong); }

  .filter__anzahl {
    color: var(--color-text-muted);
    font-family: var(--font-mono);
    font-variant-numeric: tabular-nums;
  }

  .filter__input:checked + .filter__label {
    background: var(--color-primary-strong);
    border-color: var(--color-primary-strong);
    color: #fff;
  }

  .filter__input:checked + .filter__label .filter__anzahl { color: rgb(255 255 255 / 0.75); }

  .filter__input:focus-visible + .filter__label {
    outline: 2px solid var(--color-primary-strong);
    outline-offset: 2px;
  }

  .filter__reset {
    visibility: hidden;
    padding: var(--space-2) var(--space-3);
    border: 0;
    background: none;
    color: var(--color-text-muted);
    font: inherit;
    font-size: var(--text-meta);
    text-decoration: underline;
    text-underline-offset: 0.2em;
    cursor: pointer;
  }

  .filter__set:has(.filter__input:checked) .filter__reset { visibility: visible; }

  .filter__status {
    margin: var(--space-4) 0 0;
    color: var(--color-text-muted);
    font-size: var(--text-meta);
  }

  @media (prefers-reduced-motion: reduce) {
    .filter__label { transition: none; }
  }
</style>
```

- [ ] **Schritt 2: Typprüfung und Commit**

Ausführen: `npx astro check` → 0 Fehler

```bash
git add src/components/EventFilter.astro
git commit -m "Filterleiste als native Checkboxen mit Reset"
```

### Task 7: `EventList.astro` mit globaler Filter-CSS

**Dateien:** Erstellen: `src/components/EventList.astro`

- [ ] **Schritt 1: Komponente schreiben**

```astro
---
import EventCard from "./EventCard.astro";
import EventFilter from "./EventFilter.astro";
import { verfuegbareTypen, type EventItem } from "../lib/events";

interface Props {
  events: EventItem[];
  leerText: string;
}

const { events, leerText } = Astro.props;
const typen = verfuegbareTypen(events);
const zeigeFilter = typen.length > 1;
---

{events.length === 0 ? (
  <p class="events__leer">{leerText}</p>
) : (
  <div class="events">
    {zeigeFilter && <EventFilter typen={typen} gesamt={events.length} />}
    <ol class="events__liste">
      {events.map((event) => <EventCard event={event} />)}
    </ol>
  </div>
)}

<style>
  .events__leer {
    margin: 0;
    max-width: 55ch;
    color: var(--color-text-muted);
  }

  .events__liste {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>

<style is:global>
  /* Diese Regeln verbinden die Checkboxen aus EventFilter mit den Zeilen aus
     EventCard. Astros Scoping hängt an jeden gescopten Selektor ein
     [data-astro-cid-…] der jeweiligen Komponente — eine komponentenüber-
     greifende Regel würde damit still nie greifen. Deshalb global, und
     vollständig unterhalb von .events verschachtelt, damit nichts leckt. */
  .events:has(.filter__input:checked) .event { display: none; }

  .events:has(#f-congress:checked) .event[data-type="congress"],
  .events:has(#f-course:checked)   .event[data-type="course"],
  .events:has(#f-workshop:checked) .event[data-type="workshop"],
  .events:has(#f-webinar:checked)  .event[data-type="webinar"] {
    display: var(--event-display, grid);
  }

  /* Eine gefilterte Ansicht darf sich nicht in den Ausdruck fortsetzen. */
  @media print {
    .events .event { display: var(--event-display, grid) !important; }
    .events .filter { display: none; }
  }
</style>
```

- [ ] **Schritt 2: Committen**

```bash
git add src/components/EventList.astro
git commit -m "EventList mit globaler Filterlogik ueber :has()"
```

### Task 8: Aufsatz-Skript — Trefferzähler und Escape

**Dateien:** Erstellen: `src/components/EventFilter.script.ts`, Ändern: `src/components/EventFilter.astro`

- [ ] **Schritt 1: Skript schreiben**

`src/components/EventFilter.script.ts`:

```ts
const form = document.querySelector<HTMLFormElement>("#event-filter");
const status = form?.querySelector<HTMLElement>(".filter__status");
const wurzel = form?.closest<HTMLElement>(".events");

if (form && status && wurzel) {
  const gesamt = Number(status.dataset.gesamt);

  const aktualisieren = () => {
    const aktiv = form.querySelectorAll<HTMLInputElement>(".filter__input:checked");
    if (aktiv.length === 0) {
      status.textContent = `${gesamt} Termine`;
      return;
    }
    const typen = [...aktiv].map((i) => i.value);
    const treffer = wurzel.querySelectorAll(
      typen.map((t) => `.event[data-type="${t}"]`).join(","),
    ).length;
    status.textContent = `${treffer} von ${gesamt} Terminen`;
  };

  form.addEventListener("change", aktualisieren);
  form.addEventListener("reset", () => queueMicrotask(aktualisieren));

  // Bewusst nur im Fokusbereich der Filterleiste, nicht seitenweit: Escape
  // bedeutet konventionell "schließe das offene Ding", nicht "lösche meine Auswahl".
  form.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (form.querySelectorAll(".filter__input:checked").length === 0) return;
    form.reset();
    queueMicrotask(aktualisieren);
    form.querySelector<HTMLLabelElement>(".filter__label")?.focus();
  });
}
```

- [ ] **Schritt 2: Label fokussierbar machen und Skript einbinden**

In `EventFilter.astro` das erste Label um `tabindex="-1"` ergänzen, damit `focus()` greift, ohne die Tabreihenfolge zu verändern:

```astro
<label class="filter__label" for={`f-${typ}`} tabindex={index === 0 ? -1 : undefined}>
```

Dafür die Map-Signatur auf `{typen.map(({ typ, label, anzahl }, index) => (` ändern.

Am Ende der Datei einbinden:

```astro
<script>
  import "./EventFilter.script.ts";
</script>
```

- [ ] **Schritt 3: Committen**

```bash
git add src/components/EventFilter.astro src/components/EventFilter.script.ts
git commit -m "Trefferzaehler als Live-Region und Escape im Filterfokus"
```

---

## Chunk 4: Seite und Abschlussprüfung

### Task 9: `events.astro`

**Dateien:** Ändern: `src/pages/events.astro`

- [ ] **Schritt 1: Seite schreiben**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Container from "../components/Container.astro";
import Grid from "../components/Grid.astro";
import PageIntro from "../components/PageIntro.astro";
import EventCard from "../components/EventCard.astro";
import EventList from "../components/EventList.astro";
import { kommendeEvents, vergangeneEvents, nachJahr, TYP_LABEL } from "../lib/events";

const kommend = kommendeEvents();
const archivJahre = nachJahr(vergangeneEvents());

const jsonLd = kommend.map((e) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  name: e.title,
  startDate: e.startDate,
  endDate: e.endDate,
  description: e.excerpt,
  eventStatus:
    e.status === "cancelled"
      ? "https://schema.org/EventCancelled"
      : "https://schema.org/EventScheduled",
  eventAttendanceMode: e.isOnline
    ? "https://schema.org/OnlineEventAttendanceMode"
    : "https://schema.org/OfflineEventAttendanceMode",
  location: e.isOnline
    ? { "@type": "VirtualLocation", url: e.externalUrl }
    : {
        "@type": "Place",
        name: e.locationName,
        address: { "@type": "PostalAddress", addressLocality: e.city },
      },
  ...(e.externalUrl ? { url: e.externalUrl } : {}),
}));
---

<BaseLayout
  title="Events & Kongresse | Hernienchirurgie"
  description="Aktuelle Kongresse, Kurse und Fortbildungen zu Hernienchirurgie, Bauchwandrekonstruktion und minimalinvasiver Chirurgie."
>
  <PageIntro
    eyebrow="Fachveranstaltungen"
    title="Events und Kongresse"
    description="Ausgewählte Kongresse, Kurse, Workshops und Webinare zu Hernienchirurgie, Bauchwandrekonstruktion und minimalinvasiven Verfahren."
  />

  <section class="section">
    <Container>
      <Grid class="events-sektion">
        <h2 class="events-sektion__titel">Kommende Veranstaltungen</h2>
        <div class="events-sektion__inhalt">
          <EventList
            events={kommend}
            leerText="Derzeit sind keine neuen Veranstaltungen veröffentlicht. Schauen Sie zu einem späteren Zeitpunkt wieder vorbei."
          />
        </div>
      </Grid>
    </Container>
  </section>

  {archivJahre.length > 0 && (
    <section class="section">
      <Container>
        <Grid class="events-sektion">
          <h2 class="events-sektion__titel">Vergangene Veranstaltungen</h2>
          <div class="events-sektion__inhalt">
            <p class="events-sektion__text">
              Frühere Termine können nach Jahr aufgerufen werden. Das Archiv dient der
              Dokumentation; Anmeldelinks abgelaufener Veranstaltungen werden nicht hervorgehoben.
            </p>
            {archivJahre.map(({ jahr, events }) => (
              <div class="archiv-jahr">
                <h3 class="archiv-jahr__titel">{jahr}</h3>
                <ol class="archiv-jahr__liste">
                  {events.map((event) => <EventCard event={event} compact />)}
                </ol>
              </div>
            ))}
          </div>
        </Grid>
      </Container>
    </section>
  )}

  <section class="section">
    <Container>
      <Grid>
        <p class="events-hinweis">
          Für Programm, Anmeldung, Teilnahmebedingungen und mögliche Änderungen ist der jeweilige
          Veranstalter verantwortlich. Externe Links führen auf die Website des Veranstalters.
        </p>
      </Grid>
    </Container>
  </section>

  <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />
</BaseLayout>

<style>
  .section { padding-block: clamp(var(--space-16), 8vw, var(--space-24)); }

  :global(.events-sektion) { --grid-row-gap: var(--space-8); }

  .events-sektion__titel {
    grid-column: 1 / span 3;
    font-size: var(--text-h3);
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--color-text-muted);
  }

  .events-sektion__inhalt { grid-column: 4 / -1; }

  .events-sektion__text {
    margin: 0 0 var(--space-8);
    max-width: 55ch;
    color: var(--color-text-muted);
  }

  .archiv-jahr { margin-top: var(--space-12); }

  .archiv-jahr__titel {
    margin: 0 0 var(--space-4);
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.1em;
    color: var(--color-text-muted);
  }

  .archiv-jahr__liste { margin: 0; padding: 0; list-style: none; }

  .events-hinweis {
    grid-column: 4 / -1;
    margin: 0;
    max-width: 62ch;
    color: var(--color-text-muted);
    font-size: var(--text-meta);
  }

  @media (max-width: 42rem) {
    .events-sektion__titel,
    .events-sektion__inhalt,
    .events-hinweis { grid-column: 1 / -1; }
  }
</style>
```

- [ ] **Schritt 2: Build ausführen**

Ausführen: `npm run build`
Erwartet: 8 Seiten, 0 Fehler, 0 Warnungen

- [ ] **Schritt 3: Committen**

```bash
git add src/pages/events.astro
git commit -m "Eventseite mit kommenden Terminen, Archiv und JSON-LD"
```

### Task 10: Abschlussprüfung

**Dateien:** keine; Ergebnis wird in `STATUS.md` festgehalten

- [ ] **Schritt 1: Unit-Tests und Build**

```bash
npm test && npm run build
```
Erwartet: alle Tests grün, 0 Fehler, 0 Warnungen.

- [ ] **Schritt 2: CSP-Durchgang mit den echten Headern**

Das gebaute Ergebnis lokal **mit den Headern aus `public/_headers`** ausliefern — nicht über `npm run dev`, der wendet sie nicht an. `/events` im Browser öffnen und die Konsole auf CSP-Verstöße prüfen.

**Besonders zu prüfen:** ob `<script type="application/ld+json">` unter `script-src 'self'` durchgeht. Das ist zwischen Browsern uneinheitlich und ausdrücklich nicht angenommen. Falls blockiert: entweder Hash in `public/_headers` ergänzen oder das JSON-LD als eigene Datei ausliefern.

- [ ] **Schritt 3: Browser-Durchgang**

Bei 320, 390, 768, 1024, 1440 und 2560 Pixel prüfen:

- kein horizontaler Overflow, keine Konsolenmeldungen
- **gefilterte Ansicht unterhalb von 42rem** — hier bräche ein fest verdrahtetes `display` in der Filterregel das mobile Layout
- Multiselect: zwei Typen gleichzeitig ergeben deren Vereinigung
- Reset-Button erscheint nur bei aktiver Filterung
- Escape im Filterbereich setzt zurück, Fokus landet auf dem ersten Label
- Trefferzähler wird aktualisiert
- alle vier Datumsfälle korrekt dargestellt
- „Abgesagt" ist gekennzeichnet, `test-interner-entwurf` erscheint nirgends
- Zeilen mit und ohne Bild wirken beide bewusst
- externe Links öffnen in neuem Tab, versteckter Hinweis wird vorgelesen

- [ ] **Schritt 4: Ohne JavaScript prüfen**

JavaScript im Browser deaktivieren und `/events` neu laden. Erwartet: Filtern, Multiselect und Reset funktionieren unverändert; nur Trefferzähler und Escape fehlen.

- [ ] **Schritt 5: Kontrast messen**

Alle Textfarben gegen WCAG AA prüfen, insbesondere `.filter__anzahl` auf dem aktiven blauen Label und `.event__merkmale`.

- [ ] **Schritt 6: `STATUS.md` aktualisieren**

Eventseite unter „Erledigt" aufnehmen, Zeile „Hauptseiten" auf den neuen Stand bringen, nächstes Arbeitspaket auf Etappe B beziehungsweise die Leistungsseite setzen.

- [ ] **Schritt 7: Committen**

```bash
git add STATUS.md
git commit -m "Events-Seite Etappe A abschliessen und Status aktualisieren"
```

---

## Nicht in diesem Plan

Etappe B, jeweils mit eigener Spec: Sanity-Projekt und Schema, Studio unter `/studio` samt eigener CSP-Ausnahme, GROQ-Query als Ersatz des Testdaten-Arrays, nächtlicher Rebuild über GitHub Actions auf einen Cloudflare Deploy Hook, Sanity-Webhook, AI-Assist-Vorbefüllung für `imageAlt`.
