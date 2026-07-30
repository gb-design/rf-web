# Design: Events-Seite `/events` — Etappe A

Stand: 31. Juli 2026
Status: zur Freigabe

## Ziel

Medizinischem Fachpublikum kommende Kongresse, Kurse, Workshops und Webinare strukturiert anzeigen, vergangene Termine dokumentiert archivieren. Die Seite entsteht in zwei Etappen; diese Spec beschreibt ausschließlich Etappe A.

## Abgrenzung der Etappen

**Etappe A — diese Spec.** Vollständige Seite mit lokalen Testdaten. Kartenanatomie, Filter, Archiv, Leerzustände, Responsive- und Accessibility-Pass. Kein Sanity, keine neuen Abhängigkeiten.

**Etappe B — später, eigene Spec.** Sanity-Projekt, Schema, Studio unter `/studio`, GROQ-Query, CSP-Ausnahme für das Studio, Rebuild-Automatik.

Der Schnitt liegt bewusst hier: Das Schema jetzt final zu gießen, bevor die Oberfläche existiert, wäre die falsche Reihenfolge. Nach Etappe A ist belegt, welche Felder die Zeilen tatsächlich brauchen. Zwei Felder des Entwurfs haben diese Prüfung bereits nicht bestanden (siehe Datenmodell).

Die Schnittstelle zwischen den Etappen ist `src/lib/events.ts`: In Etappe B wird dort der Datenteil gegen eine GROQ-Query getauscht. Typ und Funktionssignaturen bleiben identisch, die Komponenten werden nicht angefasst.

## Inhaltsquellen

Grundlage ist `docs/content/events.md`. Der Entwurf ist vollständig und enthält acht fiktive Testveranstaltungen sowie ein Schemavorschlag.

Abweichungen gegenüber dem Entwurf, jeweils begründet:

- **Keine Detailseiten.** Der Entwurf beschreibt als Card-Inhalt einen externen Link auf die Veranstalterseite. Eigene Detailseiten würden Inhalte wiederholen, die schon auf der Zeile stehen, und ohne echte Zusatzinhalte dünne Seiten erzeugen. Kundenentscheidung vom 31. Juli 2026.
- **Zwei zusätzliche vergangene Testevents.** Alle acht Entwurfsevents liegen in der Zukunft. Das Archiv wäre damit leer und seine Gruppierung ungeprüft.
- **Vier Datumsrandfälle in den Testdaten.** Siehe Abschnitt Datumsformat.
- **Ein Testevent mit `status: cancelled`**, damit dieser Zustand gestaltet und geprüft ist, bevor er in Sanity existiert.

## Datenmodell

```ts
type EventItem = {
  slug: string;
  title: string;
  eventType: "congress" | "course" | "workshop" | "webinar";
  startDate: string;          // ISO 8601 mit Zeitzonen-Offset
  endDate: string;            // ISO 8601 mit Zeitzonen-Offset
  locationName: string;
  city?: string;
  isOnline: boolean;
  language?: "de" | "en";
  excerpt: string;
  externalUrl?: string;
  image?: { src: string; width: number; height: number };
  imageAlt?: string;
  status: "published" | "draft" | "cancelled";
};
```

Gegenüber dem Entwurf entfallen `organizer`, `country` und `isTestData`.

`organizer` taucht in keiner Kartendefinition des Entwurfs auf. Ein Feld, das gepflegt werden muss und nirgends erscheint, ist Pflegeaufwand ohne Gegenwert. Falls der Veranstalter später sichtbar werden soll, kommt es in Etappe B zurück.

`country` ist bei Wien, Graz, Prag und München redundant zur Stadt. Für Patienten und Fachpublikum im deutschsprachigen Raum trägt die Stadt die Information.

`isTestData` ist in Etappe A gegenstandslos, weil es ausschließlich Testdaten gibt.

`slug` bleibt trotz fehlender Detailseiten. Es ist der stabile Schlüssel für Sanity und für React-artige Key-Zuordnung, und eine spätere Detailseite bliebe damit ohne Datenmigration möglich.

## Zeit- und Statuslogik

**Archivierung ist abgeleitet, nicht gepflegt.** Die Zuordnung zu „kommend" oder „Archiv" ergibt sich allein aus `endDate`. Ein separates Archivdatum wurde erwogen und verworfen:

- Zwei Datumsfelder sind zwei Wahrheiten, die sich widersprechen können.
- Ein manuelles Feld hat einen Vergessen-Zustand. Wird es nicht gesetzt, steht ein abgelaufener Kongress dauerhaft oben auf der Seite — der sichtbarste denkbare Pflegefehler für eine Arztpraxis-Website.
- `endDate` ist ohnehin Pflichtfeld. Die automatische Ableitung kostet null zusätzliche Klicks.

**Trennung nach `endDate`, nicht `startDate`.** Ein laufender zweitägiger Kongress gehört zu „kommend". Verglichen werden ISO-Zeitpunkte, nicht Kalendertage — die Testdaten führen ihre Offsets mit (`2026-09-18T17:00:00+02:00`), wodurch ein Event, das um 23:00 Wiener Zeit endet, nicht versehentlich einen Tag zu früh archiviert wird.

**Statusfeld für die Fälle, die kein Datum abdeckt:**

| Status | Wirkung |
| --- | --- |
| `published` | normal sichtbar, Archivierung automatisch über `endDate` |
| `draft` | erscheint nirgends, unabhängig vom Datum |
| `cancelled` | bleibt sichtbar, als abgesagt gekennzeichnet, nicht filterbar entfernt |

`cancelled` ist kein Komfortfeature. Wird ein Kongress kurzfristig abgesagt, darf der Eintrag nicht verschwinden — Interessenten haben den Termin gesehen und suchen gezielt danach. Ein gekennzeichneter Eintrag beantwortet die Frage, ein gelöschter erzeugt eine Sackgasse.

**Bekannte Einschränkung.** Die Seite ist statisch und altert zwischen zwei Deployments. Ohne Zutun bliebe ein Event so lange unter „kommend", bis zufällig jemand etwas ändert. Aufgelöst wird das in Etappe B durch einen nächtlichen Rebuild (GitHub-Actions-`schedule` um 02:00 UTC auf einen Cloudflare Deploy Hook), zusätzlich zum Sanity-Webhook für echte Inhaltsänderungen. Damit rutscht ein Event in der Nacht nach seinem Ende ins Archiv. In Etappe A wird der Stichtag zur Buildzeit gesetzt; die Logik ist identisch, nur der Auslöser fehlt noch.

## Sektionen

| # | Sektion | Inhalt und Behandlung |
| --- | --- | --- |
| 1 | Intro | `PageIntro.astro` unverändert. Eyebrow „Fachveranstaltungen", H1 „Events und Kongresse". |
| 2 | Kommende Veranstaltungen | Filterleiste, darunter die Editorial-Zeilenliste. Sortierung nach `startDate` aufsteigend. |
| 3 | Archiv | Nach Jahr gruppiert, absteigend. Kompakte Zeilen ohne Kurzbeschreibung, Bild und Filter. |
| 4 | Hinweis | Verantwortlichkeit des Veranstalters, Hinweis auf externe Links. Fließtext, keine Box. |

## Layout: Editorial-Zeilenliste

Jedes Event ist eine Zeile über die volle Rasterbreite, getrennt durch 1px-Haarlinien. Drei Spalten: Datum links in IBM Plex Mono mit `tabular-nums`, Inhalt in der Mitte, optionales Bild rechts.

Zwei Alternativen wurden gezeigt und verworfen:

**Kartenraster mit Marken-Fallback** — gleiche Kartenhöhe, fehlende Bilder durch ein Sechseckmuster ersetzt. Verworfen, weil `.impeccable.md` für Event-Cards ausdrücklich „keine Schatten, Trennung durch 1px border, kein Padding-Bloat, informationsdicht" vorschreibt und identische Kartenraster als Anti-Pattern führt. Der Fallback hätte außerdem dekorative Fläche ohne Aussage erzeugt.

**Nächster Termin herausgestellt** — der erste Eintrag groß mit Bild, der Rest kompakt. Verworfen wegen eines strukturellen Fehlers: Hat ausgerechnet der nächste Termin kein Bild, bricht die Auszeichnung. Die Bildwahl des Kunden würde damit unbeabsichtigt die Seitenhierarchie steuern.

Die Zeilenliste löst das Kernproblem der optionalen Bilder: In einem Raster hinterlässt ein fehlendes Bild eine Lücke, die mit Dekoration gefüllt werden muss. In einer Zeile rückt der Text einfach weiter. Beide Zustände sind gleichermaßen bewusst, ohne Platzhalter.

Datum links in Mono mit `tabular-nums` übernimmt bewusst die Behandlung der Werdegang-Zeitachse auf der Profilseite. Mono bleibt damit auf technische und tabellarische Werte beschränkt, wie im Projekt festgelegt.

## Auszeichnung, externe Links und strukturierte Daten

**Datumsangaben** stehen in `<time datetime="2026-09-17">`. Die sichtbare deutsche Schreibweise bleibt unverändert, das maschinenlesbare Attribut trägt ISO. Bei Zeiträumen erhält jeder der beiden Werte sein eigenes `<time>`-Element.

**Die Liste** ist eine `<ol>`, weil die Reihenfolge Bedeutung trägt (chronologisch). Jedes Event ist ein `<li>`. Das Archiv ist je Jahr eine eigene `<ol>` unter einer `<h3>` mit der Jahreszahl.

**Externe Links** öffnen im selben Tab und tragen `rel="noopener noreferrer"`. Ein neuer Tab würde eine für Screenreader ankündigungspflichtige Zustandsänderung erzeugen und den Zurück-Button entwerten; die Beschriftung „Veranstaltungsseite ↗" signalisiert bereits, dass die Seite verlassen wird. Sollte der Kunde ausdrücklich neue Tabs wünschen, ist das eine Änderung an einer Stelle plus ein `<span class="visually-hidden">(öffnet in neuem Tab)</span>` — die Utility-Klasse existiert seit der Profilseite.

**Strukturierte Daten:** Die Seite gibt kommende Events zusätzlich als JSON-LD nach `schema.org/Event` aus. Für einen Veranstaltungskalender ist das der SEO-Hebel mit dem besten Verhältnis von Aufwand zu Wirkung, weil Suchmaschinen daraus Event-Rich-Results erzeugen. `cancelled` wird dabei als `eventStatus: EventCancelled` abgebildet, Online-Termine als `eventAttendanceMode: OnlineEventAttendanceMode`.

**Achtung CSP:** Ob ein inline eingebettetes `<script type="application/ld+json">` unter `script-src 'self'` durchgeht, ist zwischen Browsern nicht einheitlich — es ist kein ausführbares Skript, wird aber von manchen Implementierungen trotzdem gegen `script-src` geprüft. Das wird **nicht angenommen, sondern im CSP-Durchgang mit den echten Headern verifiziert**. Falls es blockiert wird, sind die Auswege eine `_headers`-Ergänzung per Hash oder die Auslieferung als separate Datei. Diese Prüfung steht ausdrücklich in der Abschlussliste, weil genau diese Klasse von Fehlern zuletzt erst im Deployment aufgefallen ist.

## Bild und Alt-Text

Das Bild ist optional und **dekorativ**. Titel, Typ, Datum, Ort und Kurzbeschreibung stehen bereits als Text daneben; das Bild trägt keine Information, die nicht schon vorhanden ist.

**Rendering-Regel:** `imageAlt` leer oder nicht gesetzt → `alt=""`. Gefüllt → der Text des Kunden.

Für dekorative Bilder ist `alt=""` die korrekte Auszeichnung, nicht eine Beschreibung. Eine generierte Beschreibung wie „ein blaues Plakat mit weißer Schrift" fügt Screenreader-Nutzern Rauschen hinzu, das sie nicht brauchen. Dieselbe Entscheidung wurde auf der Profilseite bereits für die Expertscape-Bildmarke getroffen.

Das Feld `imageAlt` erhält in Etappe B die Feldhilfe: *„Nur ausfüllen, wenn das Bild Information trägt, die nicht im Text steht — etwa ein Plakat mit Programmangaben. Sonst leer lassen."*

**Technisch:** feste `aspect-ratio: 4/3`, `--radius-image` (16px), `loading="lazy"`, `decoding="async"`, explizite `width` und `height` gegen Layout-Sprünge. In Etappe A liegen zwei Testbilder in `public/`; in Etappe B kommt das Sanity-CDN, das die CSP über `img-src https://cdn.sanity.io` bereits erlaubt.

**Zu AI-generiertem Alt-Text.** Sanity AI Assist kann Alt-Text automatisch erzeugen (`options.aiAssist.imageDescriptionField` auf dem Image-Typ, Auslösung beim Upload; für Bestandsbilder über „Generate caption" im ✨-Menü). Alternativ erzeugen Agent Actions ihn beim Asset-Update. Beides ist Etappe B und setzt voraus, dass AI Assist im gewählten Sanity-Tarif enthalten ist.

Eingesetzt wird das ausschließlich als Vorbefüllung für den Ausnahmefall eines informationstragenden Bildes — der Kunde bestätigt oder löscht. Ungeprüft veröffentlichter AI-Alt-Text ist ausgeschlossen: Der Kunde haftet für den Inhalt, und das österreichische Web-Zugänglichkeits-Gesetz verlangt sinnvolle Alternativtexte, keine generierten Bildbeschreibungen. Der barrierefrei korrekte Default (`alt=""`) erfordert ohnehin keine Eingabe.

## Filtermechanik

Native Checkboxen, Zustand über `:has()` gelesen. Vollständige Logik:

```css
/* Die Zeile hält ihren eigenen Anzeigemodus in einer Custom Property,
   damit die Filterregel ihn nicht gegen den Breakpoint überschreibt. */
.event { display: var(--event-display, grid); }

@media (max-width: 42rem) {
  .event { --event-display: block; }
}

/* Kein Filter aktiv → alles sichtbar, keine Regel nötig */

.events:has(.filter__input:checked) .event { display: none; }

.events:has(#f-congress:checked) .event[data-type="congress"],
.events:has(#f-course:checked)   .event[data-type="course"],
.events:has(#f-workshop:checked) .event[data-type="workshop"],
.events:has(#f-webinar:checked)  .event[data-type="webinar"] { display: var(--event-display, grid); }
```

Multiselect fällt von selbst an, weil sich die Einblendregeln addieren — die Auswahl mehrerer Typen ergibt deren Vereinigung. `:has()` ist seit Dezember 2023 Baseline in allen Zielbrowsern.

Die Custom Property ist kein Umweg, sondern verhindert einen konkreten Fehler: Stünde in der Einblendregel fest `display: grid`, würde jede gefilterte Ansicht auf Mobile das dortige Zeilenlayout überschreiben. Der Fehler wäre nur im gefilterten Zustand unterhalb von 42rem sichtbar — also genau dort, wo man ihn beim Prüfen am ehesten übersieht.

**Zurücksetzen ohne JavaScript:** Die Filter liegen in einem `<form>`; `<button type="reset">` leert alle Checkboxen nativ. Der Button erscheint nur bei aktiver Filterung über `.filter:has(.filter__input:checked)`.

**Markup:** `<fieldset>` mit `<legend>` gruppiert die Filter für die Sprachausgabe. Die Checkboxen sind visuell versteckt, aber fokussierbar; der Fokusring liegt über `:has(:focus-visible)` auf dem sichtbaren Label. `autocomplete="off"` verhindert, dass Browser den Filterzustand über einen Reload wiederherstellen.

## Leerzustände

**Filterung erzeugt nie einen Leerzustand.** Es werden ausschließlich Filter für Typen gerendert, die tatsächlich kommende Events haben (`verfuegbareTypen()` zur Buildzeit). Damit hat jede Einzelauswahl mindestens einen Treffer, und weil Multiselect eine Vereinigung nicht-leerer Mengen bildet, hat auch jede Kombination mindestens einen. Ein Ergebnis mit null Treffern ist strukturell unmöglich.

Damit diese Garantie hält, müssen Filterliste und Trefferzahlen **aus genau demselben Array abgeleitet werden, das anschließend gerendert wird** — also aus dem Ergebnis von `kommendeEvents()` einschließlich der `cancelled`-Einträge, nicht aus den Rohdaten. Zählte `verfuegbareTypen()` aus einer anderen Menge als die Liste rendert, entstünden Filter ohne Treffer und die Garantie bräche still. `verfuegbareTypen()` nimmt deshalb das gefilterte Array als Argument entgegen, statt selbst auf die Daten zuzugreifen.

Abgesagte Events bleiben regulär filterbar und behalten ihre Position in der Sortierung. Sie sind sichtbarer Inhalt, kein Sonderfall der Filterlogik.

Das löst zugleich die einzige echte Schwäche des CSS-Ansatzes: CSS kann sichtbare Elemente nicht zählen und könnte einen leeren Zustand gar nicht erkennen. Statt das Problem zu behandeln, wird es ausgeschlossen.

Nebeneffekt: Die Trefferzahlen an den Filtern (`Kongress (2)`) entstehen ohnehin und erklären, warum nur bestimmte Typen zur Auswahl stehen.

**Verbleibende Leerzustände**, beide zur Buildzeit bekannt:

- Keine kommenden Termine → Filterleiste entfällt, Text aus dem Entwurf: „Derzeit sind keine neuen Veranstaltungen veröffentlicht. Schauen Sie zu einem späteren Zeitpunkt wieder vorbei."
- Kein Archiv → Sektion 3 entfällt vollständig statt eine leere Überschrift zu zeigen.

## JavaScript-Umfang

Das Filtern selbst ist reines CSS und funktioniert ohne Skript vollständig. JavaScript ist ausschließlich Aufsatz, rund sechzehn Zeilen in zwei Funktionen:

**Trefferzähler in einer `aria-live="polite"`-Region.** CSS kann keine Live-Region aktualisieren. Ohne sie hört eine Sprachausgabe zwar „Kongress, Kontrollkästchen, aktiviert", aber nicht, dass die Liste nun drei statt acht Einträge zeigt. Der Zähler schließt diese Lücke.

**Escape im Fokusbereich der Filterleiste** setzt zurück und legt den Fokus auf das erste Filterlabel:

```js
filterFieldset.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  form.reset();
  firstFilterLabel.focus();
});
```

Bewusst nicht seitenweit gebunden. Escape bedeutet konventionell „schließe das gerade offene, flüchtige Ding". Ein seitenweites Löschen der Auswahl wäre eine abweichende Bedeutung ohne Rückgängig — jemand drückt Escape für etwas anderes und verliert seine Filterung. Im Fokusbereich ist die Geste erwartbar. Der Reset-Button bleibt der sichtbare, für alle erreichbare Weg; Escape ist nur die Abkürzung.

Beide Skripte respektieren die bestehende CSP (`script-src 'self'`) und laufen als externe Dateien, weil `assetsInlineLimit: 0` und `inlineStylesheets: "never"` in `astro.config.mjs` Inlining verhindern.

**Weitere Konsequenzen des CSS-Ansatzes:** Ein gefilterter Zustand lässt sich nicht per URL teilen oder als Lesezeichen speichern. Beim Drucken werden gefilterte Einträge über `@media print` wieder eingeblendet, damit niemand versehentlich eine Teilliste druckt.

## Datumsformat

`src/lib/eventDatum.ts` bekommt ein eigenes Modul, weil dort die einzige echte Logik der Seite liegt. Vier Randfälle:

| Fall | Ausgabe |
| --- | --- |
| eintägig | `12. Nov 2026` |
| mehrtägig im Monat | `17.–18. Sep 2026` |
| über Monatsgrenze | `30. Sep – 2. Okt 2026` |
| über Jahresgrenze | `28. Dez 2026 – 3. Jan 2027` |

Die Testdaten werden so angelegt, dass **jeder dieser vier Fälle auf der Seite tatsächlich vorkommt**. Damit ist die Formatierung im Browser sichtbar geprüft, ohne ein Test-Framework einzuführen — das Projekt hat bisher keines, und Etappe A ist nicht der Anlass, eines einzuführen. Falls später Vitest hinzukommt, ist dieses Modul der natürliche erste Kandidat.

## Komponenten

| Datei | Aufgabe | Abhängigkeit |
| --- | --- | --- |
| `src/lib/events.ts` | `EventItem`, Testdaten, `kommendeEvents()`, `vergangeneEvents()`, `verfuegbareTypen()` | keine |
| `src/lib/eventDatum.ts` | Datumsbereiche als deutscher Text | keine |
| `src/components/EventCard.astro` | eine Zeile; Prop `compact` für das Archiv | `eventDatum` |
| `src/components/EventFilter.astro` | Fieldset mit Checkboxen, Zählern und Reset | keine |
| `src/components/EventList.astro` | Filter, Liste, Leerzustand | `EventCard`, `EventFilter` |
| `src/pages/events.astro` | Intro, kommend, Archiv, Hinweis | `EventList` |

Das Archiv nutzt dieselbe `EventCard` mit `compact` — eine Zeilendefinition, zwei Dichten. Eine zweite Komponente hätte zwei Stellen erzeugt, die bei jeder Änderung an der Zeile mitgepflegt werden müssten.

Alle Sektionen nutzen `Container.astro` und `Grid.astro` nach den Regeln in `docs/design-system/layout-grid.md`. Zeilenabstände werden über `--grid-row-gap` gesetzt, nicht über direktes `row-gap` auf dem Grid-Root — ein direktes `row-gap` verliert gegen die gescopte Regel in `Grid.astro`, ein bereits einmal aufgetretener Fehler.

## Prüfung vor Abschluss

- `npm run build` inklusive `astro check`: 0 Fehler, 0 Warnungen
- Browser-Pass bei 320, 390, 768, 1024, 1440 und 2560 Pixel: kein horizontaler Overflow, keine Konsolenmeldungen
- Filter per Tastatur bedienbar, Fokusring sichtbar, Escape im Fokusbereich prüfen
- Verhalten mit deaktiviertem JavaScript: Filtern, Reset und alle Inhalte funktionieren
- Kontrast aller Textfarben gegen WCAG AA gemessen
- Alle vier Datumsrandfälle sichtbar korrekt
- Zustand `cancelled` korrekt gekennzeichnet
- Gefilterte Ansicht **unterhalb von 42rem** geprüft — dort würde ein fest verdrahtetes `display` in der Filterregel das mobile Zeilenlayout brechen
- JSON-LD im gebauten Ergebnis vorhanden, gegen die CSP geprüft und mit dem Rich-Results-Test validiert
- Gebautes Ergebnis lokal **mit den echten Headern aus `public/_headers`** ausgeliefert und auf CSP-Verstöße geprüft — der Dev-Server wendet die Header nicht an, weshalb ein CSP-Fehler zuletzt erst im Deployment auffiel

## Offene Punkte für Etappe B

- Sanity-Tarif klären, insbesondere ob AI Assist enthalten ist
- CSP-Ausnahme für `/studio/*`: Das embedded Studio benötigt unter anderem `unsafe-eval` und `unsafe-inline`. Diese Lockerung darf ausschließlich für den Studio-Pfad gelten, nicht global — die Härtung der übrigen Seiten bleibt unverändert
- Nächtlicher Rebuild über GitHub Actions auf einen Cloudflare Deploy Hook
- Sanity-Webhook für Inhaltsänderungen
- Entscheidung, ob `organizer` sichtbar werden soll
- Verantwortlichkeit, Speicherfristen und Auftragsverarbeitungsvertrag für Sanity klären (bestehender Blocker in `STATUS.md`)
