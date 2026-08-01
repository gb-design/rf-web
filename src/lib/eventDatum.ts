const ZEITZONE = "Europe/Vienna";

const MONATE = [
  "Jan", "Feb", "Mär", "Apr", "Mai", "Jun",
  "Jul", "Aug", "Sep", "Okt", "Nov", "Dez",
];

type Teile = { tag: number; monat: number; jahr: number };

// Ausschliesslich ueber Intl, nie ueber getDate(): Letzteres liefert den Tag in
// der Zeitzone der Laufzeitumgebung. Ein Build auf einem UTC-Runner wuerde damit
// Tagesgrenzen verschieben, etwa 00:30 Wiener Zeit auf den Vortag.
function teile(iso: string): Teile {
  const parts = new Intl.DateTimeFormat("de-AT", {
    timeZone: ZEITZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(new Date(iso));

  const wert = (typ: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((p) => p.type === typ)!.value);

  return { tag: wert("day"), monat: wert("month"), jahr: wert("year") };
}

export function isoDatum(iso: string): string {
  const { tag, monat, jahr } = teile(iso);
  return `${jahr}-${String(monat).padStart(2, "0")}-${String(tag).padStart(2, "0")}`;
}

// Im selben Monat steht der Halbgeviertstrich ohne Spatien, ueber Monats- und
// Jahresgrenze mit. Das entspricht deutschem Satz und ist bewusst uneinheitlich.
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

// Die Uhrzeiten kommen bereits als lokale Wiener Zeit aus dem CMS. Ein Umweg
// ueber Date wuerde nur wieder Zeitzonenrisiko einbringen, deshalb reine
// Stringlogik. Ohne Startzeit gibt es keine Angabe — der Aufrufer rendert dann
// kein Element, statt eine leere Zeile stehen zu lassen.
export function zeitBereich(
  startTime?: string,
  endTime?: string,
  mehrtaegig = false,
): string | null {
  if (!startTime) return null;
  // Ueber mehrere Tage ist "09:00–17:00" irrefuehrend: es liest sich wie eine
  // Dauer, meint aber zwei Tagesraender. Dort bleibt nur der Beginn stehen.
  if (mehrtaegig || !endTime) return `ab ${startTime}`;
  return `${startTime}–${endTime}`;
}

export function jahrVon(iso: string): number {
  return teile(iso).jahr;
}
