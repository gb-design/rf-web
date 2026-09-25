import { test } from "node:test";
import assert from "node:assert/strict";
import { datumBereich, datumMarke, isoDatum, zeitBereich } from "./eventDatum.ts";

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
// Mit new Date().getDate() käme auf einem UTC-Runner hier der 16. heraus.
test("Tagesgrenze bleibt Wien, unabhängig von der Laufzeit-Zeitzone", () => {
  assert.equal(isoDatum("2026-09-17T00:30:00+02:00"), "2026-09-17");
  assert.equal(isoDatum("2026-09-17T23:30:00+02:00"), "2026-09-17");
});

test("ohne Startzeit gibt es keine Zeitangabe", () => {
  assert.equal(zeitBereich(undefined, "17:00"), null);
  assert.equal(zeitBereich(""), null);
});

test("eintägig mit Endzeit ergibt eine Spanne", () => {
  assert.equal(zeitBereich("18:00", "19:30"), "18:00–19:30");
});

test("eintägig ohne Endzeit ergibt nur den Beginn", () => {
  assert.equal(zeitBereich("09:00"), "ab 09:00");
});

// Eine Spanne über zwei Tage läse sich als Dauer eines einzelnen Tages.
test("mehrtägig zeigt nur den Beginn, auch wenn eine Endzeit gesetzt ist", () => {
  assert.equal(zeitBereich("09:00", "17:00", true), "ab 09:00");
});

test("Marke eintägig", () => {
  assert.deepEqual(
    datumMarke("2026-11-12T18:00:00+01:00", "2026-11-12T19:30:00+01:00"),
    { tage: "12", monat: "Nov 2026", bis: null },
  );
});

test("Marke mehrtägig im selben Monat", () => {
  assert.deepEqual(
    datumMarke("2026-12-03T10:00:00+01:00", "2026-12-04T15:30:00+01:00"),
    { tage: "3–4", monat: "Dez 2026", bis: null },
  );
});

test("Marke über Monatsgrenze", () => {
  assert.deepEqual(
    datumMarke("2026-09-30T08:30:00+02:00", "2026-10-02T16:30:00+02:00"),
    { tage: "30", monat: "Sep 2026", bis: "bis 2. Okt" },
  );
});

test("Marke über Jahresgrenze nennt das Endjahr", () => {
  assert.deepEqual(
    datumMarke("2026-12-28T09:00:00+01:00", "2027-01-03T15:00:00+01:00"),
    { tage: "28", monat: "Dez 2026", bis: "bis 3. Jan 2027" },
  );
});

test("Marke bleibt beim Wiener Kalendertag", () => {
  assert.deepEqual(
    datumMarke("2026-09-17T00:30:00+02:00", "2026-09-17T23:30:00+02:00"),
    { tage: "17", monat: "Sep 2026", bis: null },
  );
});
