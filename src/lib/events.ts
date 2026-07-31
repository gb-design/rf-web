import { jahrVon } from "./eventDatum.ts";

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

// Alle Eintraege sind frei erfunden und dienen ausschliesslich der Entwicklung.
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
    status: "published",
  },
  {
    // Existiert, damit der Datumsfall ueber die Jahresgrenze gerendert wird.
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
    // Existiert, damit der Zustand "abgesagt" gestaltet und geprueft ist.
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
    // Existiert, um zu belegen, dass Entwuerfe nirgends erscheinen.
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
    excerpt:
      "Fiktive Jahrestagung zu Standards und Qualitätssicherung in der Hernienchirurgie.",
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

// Nimmt das Array entgegen, das anschliessend gerendert wird. Griffe die Funktion
// selbst auf EVENTS zu, entstuenden Filter ohne Treffer und die Zusicherung
// "Filtern erzeugt nie einen Leerzustand" braeche still.
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
    const jahr = jahrVon(e.startDate);
    gruppen.set(jahr, [...(gruppen.get(jahr) ?? []), e]);
  }
  return [...gruppen.entries()]
    .map(([jahr, events]) => ({ jahr, events }))
    .sort((a, b) => b.jahr - a.jahr);
}
