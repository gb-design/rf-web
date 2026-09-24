# Design: Leistungsseite `/leistungen`

Stand: 25. September 2026
Status: freigegeben, in Umsetzung

## Ziel

Patientinnen und Patienten kommen mit einer Diagnose oder einem Symptom auf diese Seite, nicht mit dem Wunsch, ein Leistungsverzeichnis zu lesen. Die Seite muss deshalb drei Fragen beantworten: Gehört mein Beschwerdebild hierher, wie wird es abgeklärt, und wie entsteht die Entscheidung für oder gegen eine Operation.

Sie ist außerdem das Ziel von drei CTAs der Startseite und muss jedem davon echte Tiefe liefern, statt dieselben Sätze zu wiederholen.

## Inhaltsquellen

Grundlage ist der Entwurf `docs/content/leistungen.md` vom 2. Juli 2026, abgeglichen gegen den Live-Bestand `https://www.fortelny.at/` und `https://www.fortelny.at/ordination`, ausgelesen am 25. September 2026. Laut `docs/content/00-bestandsanalyse.md` sind genau diese zwei Live-Seiten die Quelle für `/leistungen`.

**Im Bestand bestätigt.** Die sechs Indikationen des Entwurfs stehen live in gleicher Zusammensetzung: Narben- und Leistenbruch, Gallensteinleiden, Schilddrüsenerkrankung, Refluxerkrankung, Hämorrhoidalleiden, Mastdarmerkrankungen. Der Entwurf fasst die letzten zwei zu einer Proktologie-Sektion zusammen, was fachlich zusammengehört und die Seite von sechs auf fünf Indikationen verkürzt. Die im Ablauf genannten Diagnostikverfahren — Ultraschall, Computertomographie, Magnetresonanz, Gastro- und Coloskopie — stehen live wörtlich so.

**Im Bestand gefunden und im Entwurf nicht enthalten.**

- Der Begriff `Tailored Surgery` als eigene Marketingvokabel für das maßgeschneiderte Verfahren
- Die vierstufige Ablaufgliederung `Erstgespräch`, `Symptome & Problemanalyse`, `Diagnose`, `Therapie`, jeweils mit eigenem Absatz
- Externer Verweis auf `operation-hernien.de`

**Im Entwurf enthalten und im Bestand nicht belegt.**

- Das Leistungsspektrum der Hernien-Sektion mit sechs Einzelpositionen, darunter wiederkehrende Hernien und komplexe Bauchwandrekonstruktion
- Die Sektion `Vorbereitung auf den Termin` samt Liste mitzubringender Unterlagen
- Der fünfte Ablaufschritt `Planung und Nachsorge` mit Eingriff, Klinikaufenthalt und Kontrollen
- Der Notfallhinweis auf plötzlich starke Schmerzen, Fieber, Erbrechen und nicht zurückgehende Vorwölbungen

## Sektionen

| # | Sektion | Theme | Inhalt und Behandlung |
| --- | --- | --- | --- |
| 1 | Hero | hell | `PageIntro` mit Eyebrow, H1, Intro und primärem CTA. Seitenspezifische H1-Breite, siehe unten. |
| 2 | Auf dieser Seite | hell | Fünf Ankerlinks auf die Indikationen, nummeriert, als Raster im 12-Spalten-Layout. Statisch, kein JavaScript. |
| 3 | Indikationen 01 – 05 | hell | Rein typografische Sektionen. Nummer und Titel in der schmalen Spalte, Fließtext und Leistungsspektrum in der breiten. Trennung durch Haarlinie und Spacing. |
| 4 | Verfahrenswahl | **dunkel** | Editorial-Break in der Seitenmitte. Fließtext zur Abwägung minimalinvasiv gegen offen. |
| 5 | Ablauf | hell | Fünf Schritte als nummeriertes Register. |
| 6 | Vorbereitung auf den Termin | hell | Liste mitzubringender Unterlagen. |
| 7 | Medizinischer Hinweis | hell | Orientierungs- und Notfallhinweis als getönte Fläche. |
| 8 | Abschluss-CTA | **dunkel** | Gleiches Muster wie Startseite und Profilseite. |

## Gestalterische Entscheidungen

**Indikationen rein typografisch, nicht mit Lottie.** Für alle fünf Indikationen liegen Animationen in `public/lottie/` bereit, und die Startseite spielt sie in `TreatmentTabs.astro` aus. Sie werden hier trotzdem nicht wiederverwendet.

Erstens sind fünf Animationen auf einer Seite rund 700 Kilobyte und bräuchten eine eigene Lazy-Loading-Mechanik pro Sektion, während `TreatmentTabs` nur die jeweils aktive Animation lädt. Zweitens, und wichtiger: die Animationen sind das Erkennungszeichen des Startseiten-Einstiegs. Wiederholt auf der Tiefenseite verlieren sie genau diese Funktion. Die Leistungsseite arbeitet stattdessen mit Ruhe und Lesbarkeit — sie ist die Seite, auf der jemand mit einer frischen Diagnose tatsächlich liest.

Die Sektionen tragen deshalb nur Nummer, Titel, Fließtext und Leistungsspektrum, asymmetrisch im Raster verteilt. Identische Karten je Indikation bleiben verworfen, weil wiederholte Kartenraster ein dokumentiertes Anti-Pattern des Projekts sind.

**Sprungnavigation statisch, nicht klebend.** Eine mitlaufende Indexspalte mit Aktivmarkierung wäre publikationsartig und passend zum akademischen Register — sie kostet aber Scroll-Beobachtung per JavaScript. Auf dieser Seite gibt es mit dem Footer-Vorhang aus `src/scripts/footerVorhang.ts` bereits ein scrollabhängiges Verhalten. Ein zweites daneben bedeutet zwei bewegliche Teile, die sich gegenseitig stören können, für einen Orientierungsgewinn auf einer Seite mit fünf Ankern.

Die Navigation steht deshalb einmal unter dem Hero und scrollt danach aus. Die Anker bleiben als stabile Adressen erhalten, auf die spätere Verweise und externe Links zeigen können.

**`PageIntro` behalten, den Profil-Hero nicht verallgemeinern.** Die Profil-Spec vom 28. Juli 2026 hat diese Entscheidung ausdrücklich auf dieses Arbeitspaket vertagt. Sie fällt gegen eine Verallgemeinerung.

Der eigene Hero der Profilseite existiert, weil dort drei Elemente unterzubringen waren — H1, Kurzprofil als Lead und die vierstellige Kennzahlen-Rail — und ein reines `PageIntro` deshalb über 40 Prozent Leerfläche ohne Hierarchiesprung erzeugte. Die Leistungsseite hat diesen Bedarf nicht: Eyebrow, H1, ein Intro-Absatz, ein CTA. Das ist genau der Fall, für den `PageIntro` gebaut wurde. Eine zweite Sonderkomposition würde die Seiten auseinanderlaufen lassen, ohne etwas zu lösen.

**H1-Breite seitenspezifisch.** `PageIntro.astro` begrenzt die H1 auf `max-width: 14ch`. Der Satz „Chirurgische Beratung, die bei Ihrer Diagnose beginnt." hat 51 Zeichen und bricht bei 14ch in eine schmale, hohe Textsäule. Die Seite überschreibt die Breite deshalb lokal über den globalen Selektor, statt die Komponente für alle Seiten zu ändern — die bestehenden Werte sind auf die kürzeren H1 der anderen Seiten abgestimmt.

**Zwei dunkle Sektionen, gesetzt als Mittelbruch und Abschluss.** Bei acht Sektionen trägt die Seite zwei Kontrastflächen: die Verfahrenswahl etwa in der Mitte und den CTA am Ende. Die Verfahrenswahl ist inhaltlich die Kernaussage der Seite — nicht jede Diagnose führt zum gleichen Eingriff — und rechtfertigt den Bruch. Häufigerer Wechsel wirkt unruhig, dieselbe Begründung wie auf der Profilseite.

**Hinweisblöcke als getönte Fläche.** Der Notfallhinweis und die Proktologie-Notiz zu Blut im Stuhl brauchen visuelles Gewicht, ohne alarmierend zu wirken. Sie werden als Fläche in `--color-surface-tint` mit `--radius-banner` gesetzt. Akzentstreifen über `border-left` sind im Designkontext ausdrücklich als Anti-Pattern geführt und kommen nicht infrage.

**Drei CTAs, nicht acht.** Hero, Hernien-Sektion und Abschluss. Die Hernien-Sektion bekommt den einzigen Inline-CTA, weil Hernienchirurgie das Kernfachgebiet ist und den Großteil der Anfragen trägt. Die Indikationen 02 bis 05 bleiben ohne — eine Seite, die nach jedem Absatz zur Terminanfrage auffordert, liest sich als Verkaufsstrecke und untergräbt genau das Vertrauen, das sie aufbauen soll.

**Kein englischer Fachbegriff für die Verfahrenswahl.** Der Live-Bestand nennt `Tailored Surgery`. Die primäre Zielgruppe sind Patientinnen und Patienten, und die globale Content-Regel verlangt, Fachbegriffe beim ersten Auftreten in Alltagssprache zu erklären. Ein englischer Begriff, der erst erklärt werden muss, kostet an dieser Stelle mehr Klarheit als er an Wiedererkennung bringt. Die Sektion heißt deshalb „Das passende Verfahren statt einer Standardlösung" und beschreibt das Konzept ohne es zu benennen.

**Minimalinvasiv nicht pauschal als überlegen.** Hier weicht die Seite bewusst vom Live-Ton ab. Live heißt es, die chirurgische Behandlung der überwiegenden Anzahl der Erkrankungen erfolge in Schlüssellochtechnik, gefolgt von einer Vorteilsliste. Die globale Content-Regel in `docs/content/00-bestandsanalyse.md` verbietet genau diese Darstellung. Die Seite formuliert stattdessen, dass minimalinvasive Eingriffe bei geeigneter Indikation kleinere Zugänge und raschere Erholung ermöglichen können und offene Verfahren bei bestimmten Befunden die medizinisch sinnvollere Option bleiben.

**Keine neuen Komponenten.** Die Indikationen entstehen aus einem `indikationen`-Array im Seiten-Frontmatter, analog zu `schwerpunkte` in `src/pages/index.astro`. Sprungnavigation, Ablaufregister und Hinweisflächen sind Einmal-Markup mit scoped styles in der Seite. Wiederverwendet werden `BaseLayout`, `PageIntro`, `Container`, `Grid` und `ButtonLink`.

Das folgt der etablierten Struktur des Projekts, in dem `index.astro` und `profil.astro` jeweils rund 1200 Zeilen Markup und scoped CSS tragen. Eine Komponente wird erst extrahiert, wenn ein Muster zum zweiten Mal gebraucht wird; keines der hier entstehenden Muster hat bisher einen zweiten Anwendungsfall.

## Abgrenzung zur Startseite

Die drei Startseiten-CTAs auf `/leistungen` müssen jeweils auf echter Tiefe landen:

| CTA auf der Startseite | Zielsektion hier |
| --- | --- |
| Alle Leistungen im Überblick | 3 — Indikationen |
| Mehr über das Erstgespräch | 5 — Ablauf |
| Behandlung und Ablauf ansehen | 4 — Verfahrenswahl |

Die Startseite nennt jede Indikation in einem Satz. Kein Satz von dort wird übernommen. Die Startseite erklärt das Beratungsprinzip in drei Stichpunkten, diese Seite den Ablauf in fünf Schritten mit Diagnostik. Die Startseite nennt minimalinvasive Verfahren als Möglichkeit, diese Seite erklärt die Abwägung.

## Bewusst nicht umgesetzt

- **Eigene Unterseiten je Indikation.** `/leistungen/hernien` und vier weitere Routen wären die SEO-stärkste Variante. Jede bräuchte aber rund 400 Wörter neuen medizinischen Text, den weder Entwurf noch Live-Bestand hergeben und der vollständig kundenbestätigungspflichtig wäre. Die Option bleibt für später offen; die Ankerstruktur dieser Seite ist dafür eine brauchbare Vorstufe.
- **Verweis auf `operation-hernien.de`.** Der Live-Bestand verlinkt dorthin. Die Bestandsanalyse hält fest, dass der Verweis vom Ziel der Seite ablenkt, und übernimmt ihn nicht.
- **Vorteilsliste zur Schlüssellochtechnik.** Siehe oben, widerspricht der Content-Regel.
- **Preise, Honorare, Kassenangaben.** Im Live-Bestand nicht vorhanden, im Entwurf nicht vorgesehen. Gehören fachlich auf `/kontakt` und brauchen eine Kundenentscheidung.

## Übernommene Struktur mit Abweichung

Der Live-Ablauf hat vier Schritte, der Entwurf fünf. Die Seite folgt dem Entwurf und ergänzt `Planung und Nachsorge`, weil der Live-Ablauf mit der Therapieentscheidung endet und offenlässt, was danach passiert — für Patientinnen und Patienten die naheliegendste Anschlussfrage. Der Schritt ist als kundenbestätigungspflichtig geführt, siehe offene Punkte.

## Offene Punkte

- **Fünfter Ablaufschritt `Planung und Nachsorge`.** Sagt zu, dass Eingriff, Klinikaufenthalt, Verhalten danach und Kontrollen gemeinsam festgelegt werden. Im Live-Bestand nicht belegt. Vom Kunden zu bestätigen.
- **Sektion `Vorbereitung auf den Termin`.** Die Liste mitzubringender Unterlagen ist im Bestand nicht belegt und impliziert eine Erwartungshaltung an das Erstgespräch. Vom Kunden zu bestätigen.
- **Leistungsspektrum der Hernien-Sektion.** Sechs Einzelpositionen, darunter wiederkehrende Hernien und komplexe Bauchwandrekonstruktion. Fachlich plausibel, da die Profilseite komplexe Bauchwandhernien als Schwerpunkt führt, aber als Leistungszusage nicht aus dem Bestand belegt. Vom Kunden zu bestätigen.
- **Notfallhinweis.** Medizinisch üblich und im Sinne der Patientensicherheit, aber eine inhaltliche Setzung ohne Vorlage im Bestand. Vor Go-live fachlich zu bestätigen.
- **CTA-Ziel `/kontakt`.** Die Zielseite ist derzeit ein Stub aus Seitenintro. Die Route existiert, die Kontaktseite ist das nächste Arbeitspaket nach dieser Seite. Die CTAs verlinken bereits dorthin, statt später einzeln umgestellt werden zu müssen.

## Prüfung vor Abschluss

- Responsive-Pass bei 320, 390, 768, 1024, 1440, 1920 und 2560 Pixel auf horizontalen Overflow und Konsolenmeldungen
- Kontrastmessung aller Textfarben, insbesondere in den beiden dunklen Sektionen, gegen WCAG AA
- Ankersprünge mit `scroll-margin-top` gegen den Header geprüft, auch bei mobiler Navigation
- Semantik: eine H1, Sektionen über `aria-labelledby` benannt, Sprungnavigation als Liste
- `npm run build` ohne Fehler und Warnungen, Produktionsbuild unter den echten CSP-Headern geprüft
