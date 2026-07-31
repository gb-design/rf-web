import { test } from "node:test";
import assert from "node:assert/strict";
import {
  kommendeEvents,
  vergangeneEvents,
  verfuegbareTypen,
  nachJahr,
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

// Trennung ueber endDate, nicht startDate: ein laufender Kongress bleibt kommend.
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

test("kommend und vergangen überschneiden sich nicht", () => {
  const k = new Set(kommendeEvents(STICHTAG).map((e) => e.slug));
  const v = vergangeneEvents(STICHTAG).map((e) => e.slug);
  assert.equal(v.some((slug) => k.has(slug)), false);
});

// Die Zusicherung "Filtern erzeugt nie null Treffer" haengt genau hieran:
// gezaehlt wird aus dem Array, das anschliessend gerendert wird.
test("verfuegbareTypen zählt aus dem übergebenen Array", () => {
  const kommend = kommendeEvents(STICHTAG);
  const typen = verfuegbareTypen(kommend);

  assert.equal(typen.every((t) => t.anzahl > 0), true);
  assert.equal(typen.reduce((s, t) => s + t.anzahl, 0), kommend.length);

  for (const t of typen) {
    assert.equal(kommend.filter((e) => e.eventType === t.typ).length, t.anzahl);
  }
});

test("verfuegbareTypen auf leerem Array liefert nichts", () => {
  assert.deepEqual(verfuegbareTypen([]), []);
});

test("Archiv nach Jahr gruppiert, neuestes zuerst", () => {
  const gruppen = nachJahr(vergangeneEvents(STICHTAG));
  const jahre = gruppen.map((g) => g.jahr);

  assert.ok(jahre.length > 1, "Archiv braucht mehr als ein Jahr zum Prüfen");
  assert.deepEqual(jahre, [...jahre].sort((a, b) => b - a));
  assert.equal(gruppen.every((g) => g.events.length > 0), true);
});

test("alle vier Datumsfälle kommen in den Testdaten vor", () => {
  const k = kommendeEvents(STICHTAG);
  const tag = (iso: string) => iso.slice(0, 10);
  const monat = (iso: string) => iso.slice(0, 7);
  const jahr = (iso: string) => iso.slice(0, 4);

  assert.ok(
    k.some((e) => tag(e.startDate) === tag(e.endDate)),
    "eintägig fehlt",
  );
  assert.ok(
    k.some((e) => monat(e.startDate) === monat(e.endDate) && tag(e.startDate) !== tag(e.endDate)),
    "mehrtägig im Monat fehlt",
  );
  assert.ok(
    k.some((e) => jahr(e.startDate) === jahr(e.endDate) && monat(e.startDate) !== monat(e.endDate)),
    "Monatsgrenze fehlt",
  );
  assert.ok(
    k.some((e) => jahr(e.startDate) !== jahr(e.endDate)),
    "Jahresgrenze fehlt",
  );
});

test("jedes Event hat ein Ende nicht vor seinem Beginn", () => {
  const alle = [...kommendeEvents(STICHTAG), ...vergangeneEvents(STICHTAG)];
  for (const e of alle) {
    assert.ok(
      +new Date(e.endDate) >= +new Date(e.startDate),
      `${e.slug}: endDate liegt vor startDate`,
    );
  }
});
