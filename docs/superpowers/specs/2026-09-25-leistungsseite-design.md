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

**Im Entwurf enthalten und im Bestand nicht belegt.** Alle vier Punkte sind unter „Offene Punkte" als kundenbestätigungspflichtig geführt.

- Das Leistungsspektrum der Hernien-Sektion mit sechs Einzelpositionen, darunter wiederkehrende Hernien und komplexe Bauchwandrekonstruktion
- Die Sektion `Vorbereitung auf den Termin` samt Liste mitzubringender Unterlagen
- Der fünfte Ablaufschritt `Planung und Nachsorge` mit Eingriff, Klinikaufenthalt und Kontrollen
- Zwei ärztliche Handlungsanweisungen: der Notfallhinweis auf plötzlich starke Schmerzen, Fieber, Erbrechen und nicht zurückgehende Vorwölbungen, und die Proktologie-Notiz, Blut im Stuhl immer ärztlich abklären zu lassen

## Sektionen

Spaltenangaben gelten ab 64rem. Darunter belegen alle Inhalte `1 / -1`; das ist derselbe Umbruchpunkt, den `PageIntro.astro` und die Rasterlabels in `index.astro` und `profil.astro` verwenden.

| # | Sektion | Anker | Theme | Raster und Behandlung |
| --- | --- | --- | --- | --- |
| 1 | Hero | — | hell | `PageIntro` mit Eyebrow, H1, Intro und primärem CTA im Slot. Spalten wie in der Komponente: Eyebrow `1 / span 3`, Copy `4 / -1`. H1-Breite lokal überschrieben, siehe unten. |
| 2 | Auf dieser Seite | `#uebersicht` | hell | Label `1 / span 3`, Linkraster `4 / -1` in zwei bis drei Spalten. Fünf Ankerlinks, nummeriert. Statisch, kein JavaScript. |
| 3 | Indikationen 01 – 05 | fünf, siehe Ankerschema | hell | Je Sektion: Nummer in `1 / span 2`, H2 mit Fließtext und optionalem Leistungsspektrum in `3 / -1`. Eigene Überschriftengröße, siehe unten. Trennung zwischen den Indikationen durch Haarlinie und Spacing. |
| 4 | Verfahrenswahl | `#verfahren` | **dunkel** | H2 in `--text-h2` über `1 / span 6`, Fließtext und Kriterienliste `8 / -1`. Editorial-Break in der Seitenmitte. |
| 5 | Ablauf | `#ablauf` | hell | Label `1 / span 3`, fünfteiliges Register `4 / -1`. |
| 6 | Vorbereitung auf den Termin | `#vorbereitung` | hell | Label `1 / span 3`, H2 und Liste `4 / -1`. |
| 7 | Medizinischer Hinweis | — | hell | Getönte Fläche über `4 / -1`. |
| 8 | Abschluss-CTA | — | **dunkel** | Gleiches Muster wie Startseite und Profilseite. |

### Ankerschema

Die IDs sind ein URL-Kontrakt und danach nicht mehr frei änderbar. Sie lauten:

| Sektion | ID |
| --- | --- |
| Auf dieser Seite | `uebersicht` |
| Leisten-, Nabel- und Narbenhernien | `hernien` |
| Gallenblase und Gallensteine | `gallensteine` |
| Refluxerkrankung und Hiatushernie | `reflux` |
| Schilddrüsenerkrankungen | `schilddruese` |
| Hämorrhoiden und Enddarmerkrankungen | `proktologie` |
| Verfahrenswahl | `verfahren` |
| Ablauf | `ablauf` |
| Vorbereitung | `vorbereitung` |

Kleinschreibung, keine Umlaute, keine Nummernpräfixe — die Nummerierung 01 bis 05 ist eine redaktionelle Reihenfolge und darf die Adresse nicht binden, falls später eine Indikation dazukommt oder die Reihenfolge wechselt.

Die ID liegt auf dem `<section>`-Element, nicht auf der Überschrift. Für `aria-labelledby` bekommt die Überschrift eine zweite, abgeleitete ID nach dem Muster `hernien-titel`. Zwei getrennte IDs, weil der Sprunganker auf den Sektionsanfang zeigen muss und nicht auf die Überschrift allein.

## Eingehende Verlinkung der Startseite

Die drei Startseiten-CTAs zeigen derzeit alle auf `href="/leistungen"` ohne Fragment (`src/pages/index.astro:157`, `:182`, `:202`). Damit landen sie am Seitenanfang, und das Ziel dieser Spec — jedem CTA echte Tiefe liefern — wäre nicht prüfbar. Teil dieses Arbeitspakets ist deshalb, die drei Ziele auf Anker umzustellen:

| CTA auf der Startseite | Zeile | neues Ziel | Text |
| --- | --- | --- | --- |
| Alle Leistungen im Überblick | `index.astro:157` | `/leistungen#uebersicht` | unverändert |
| Mehr über das Erstgespräch | `index.astro:182` | `/leistungen#ablauf` | unverändert |
| Behandlung und Ablauf ansehen | `index.astro:202` | `/leistungen#verfahren` | → „Verfahrenswahl ansehen" |

Zwei Feinheiten dazu.

**„Alle Leistungen im Überblick" zielt auf die Übersicht, nicht auf die erste Indikation.** Deshalb hat Sektion 2 eine eigene ID bekommen. Ein Sprung auf `#hernien` würde über genau das Element hinwegscrollen, das die Übersicht ist — wer einen Überblick anklickt, soll den Seitenindex sehen und nicht in Indikation 01 landen.

**Ein CTA-Text ändert sich.** „Behandlung und Ablauf ansehen" verspricht den Ablauf, zeigt künftig aber auf die Verfahrenswahl — während der CTA eine Sektion darüber bereits auf `#ablauf` zielt. Zwei CTAs, die dasselbe versprechen und woanders landen, sind eine Orientierungsfalle. Der Text wird deshalb zu „Verfahrenswahl ansehen". Das ist die einzige inhaltliche Änderung an der Startseite; alles andere bleibt.

## Abgrenzung zur Startseite

Drei der acht Themen dieser Seite behandelt die Startseite bereits an. Wo sich die Inhalte berühren, gilt Folgendes.

**Indikationen.** Die Startseite nennt jede der fünf in einem Satz (`index.astro:13–41`). Diese Seite erklärt Beschwerdebild und Entscheidungsgrundlage. Kein Satz wird übernommen.

Die H2 dieser Seite sind bei drei von fünf Indikationen wortgleich mit den Tabtiteln der Startseite, und die Nummerierung 01 bis 05 wiederholt deren Reihenfolge. Das ist gewollt: Wer auf der Startseite „Leisten-, Nabel- und Narbenhernien" angeklickt hat, muss hier dieselbe Bezeichnung wiederfinden, sonst bricht die Orientierung. Wiedererkennung schlägt an dieser Stelle Variation.

**Hero-Intro.** Der Entwurf formuliert das Intro vierteilig: „Nicht jede Beschwerde erfordert eine Operation. Am Anfang stehen das persönliche Gespräch, eine klinische Untersuchung und die Bewertung Ihrer Befunde. Daraus entsteht eine Empfehlung, die …". Satz zwei ist inhaltlich deckungsgleich mit `index.astro:151` („Eine fundierte Empfehlung entsteht deshalb erst nach einem persönlichen Gespräch, einer klinischen Untersuchung und – falls erforderlich – ergänzender Diagnostik"), und dieser Absatz steht auf der Startseite direkt über dem CTA hierher. Der Nutzer würde dieselbe Aussage zweimal hintereinander lesen.

Das Intro dieser Seite trägt deshalb nur den ersten und dritten Gedanken: dass nicht jede Beschwerde eine Operation erfordert, und dass die Empfehlung medizinische Notwendigkeit, Alternativen und die persönliche Situation berücksichtigt. Der Ablaufgedanke entfällt im Hero und wird in Sektion 5 ausgespielt, wo er hingehört.

`title` und `description` bleiben unverändert aus dem bestehenden Stub `src/pages/leistungen.astro`; beide sind entwurfsgetreu. Der `description`-Prop von `PageIntro` dagegen **wird ersetzt**: der Stub trägt dort derzeit genau den Satz, der hier gestrichen wird („Am Anfang stehen das persönliche Gespräch, eine klinische Untersuchung und die sorgfältige Bewertung Ihrer Befunde."). Nicht zu verwechseln — das eine ist das Meta-Tag, das andere der sichtbare Introtext.

**Verfahrenswahl.** Hier ist die Überschneidung am größten und war im ersten Entwurf dieser Spec zu optimistisch bewertet. `index.astro:201` formuliert die Abwägung bereits aus: „Ob dieses Vorgehen in Ihrem Fall geeignet ist, hängt von der Diagnose, möglichen Voroperationen und weiteren medizinischen Faktoren ab. Gemeinsam wird das Verfahren gewählt, das medizinisch sinnvoll und sicher ist." Gegenüber der Startseite wäre neu allein der Satz, dass offene Verfahren bei bestimmten Befunden die sinnvollere Option bleiben. Für eine dunkle Kontrastsektion in der Seitenmitte ist das zu wenig.

Die Sektion trägt deshalb, was die Startseite nicht hat: die Entscheidungskriterien beim Namen genannt, als Liste statt als Nebensatz.

- Art, Größe und Lage des Befundes
- Voroperationen und Narbengewebe im Operationsgebiet
- Allgemeinzustand und Begleiterkrankungen
- Dringlichkeit des Eingriffs

Das ist eine Konkretisierung der Entwurfsformulierung „richtet sich nach der Diagnose und Ihrem individuellen Risikoprofil" und als solche eine medizinische Setzung ohne Vorlage im Bestand. Sie ist unter „Offene Punkte" als bestätigungspflichtig geführt.

**Rückfallpfad, falls die Bestätigung ausbleibt.** Es entfällt ausschließlich die vierteilige Liste. Sektion 4 bleibt vollständig bestehen: gleiche Position, gleiche H2, gleicher Fließtext, weiterhin dunkel, und `#verfahren` bleibt als Adresse gültig. Das ist wichtig, weil die IDs ein URL-Kontrakt sind und `index.astro:202` künftig dorthin zeigt — eine Sektion, die je nach Freigabestand verschwindet, würde diesen Link brechen und die Rechnung „zwei dunkle Sektionen bei acht Sektionen" ungültig machen.

Der Preis des Rückfalls ist, dass Sektion 4 dann inhaltlich nahe an `index.astro:201` liegt. Das ist die bewusst in Kauf genommene Schwäche des Rückfallzustands, nicht ein Grund, die Sektion aufzulösen: H2 und Fließtext sind entwurfsgedeckt, die Kernaussage der Seite braucht ihren Ort, und ein Absatz im Ablaufregister wäre dafür der falsche Platz.

Die Liste wird gebaut und mit dem Hinweis unter „Offene Punkte" geführt. Sie erscheint damit auf der Cloudflare-Preview-URL, bevor die Bestätigung vorliegt — das ist vertretbar, weil die Preview nicht öffentlich beworben und nicht indexiert wird, und weil die Formulierung keine Diagnose und kein Heilversprechen enthält. Auf `main` geht sie erst nach Freigabe.

## Gestalterische Entscheidungen

**Indikationen rein typografisch, nicht mit Lottie.** Für alle fünf Indikationen liegen Animationen in `public/lottie/` bereit, und die Startseite spielt sie in `TreatmentTabs.astro` aus. Sie werden hier trotzdem nicht wiederverwendet.

Erstens sind die fünf Dateien zusammen 567 Kilobyte und bräuchten eine eigene Lazy-Loading-Mechanik pro Sektion, während `TreatmentTabs` `lottie_light` dynamisch importiert und nur die jeweils aktive Animation lädt. Zweitens, und wichtiger: die Animationen sind das Erkennungszeichen des Startseiten-Einstiegs. Wiederholt auf der Tiefenseite verlieren sie genau diese Funktion. Die Leistungsseite arbeitet stattdessen mit Ruhe und Lesbarkeit — sie ist die Seite, auf der jemand mit einer frischen Diagnose tatsächlich liest.

Identische Karten je Indikation bleiben verworfen, weil wiederholte Kartenraster ein dokumentiertes Anti-Pattern des Projekts sind.

**Leistungsspektrum nur bei den Hernien.** Der Entwurf führt eine Spektrumsliste ausschließlich in der Hernien-Sektion. Das bleibt so: die Liste ist dort inhaltlich gedeckt und belegt das Kernfachgebiet, und für die übrigen vier Indikationen gibt es weder im Entwurf noch im Bestand Material. Vier Listen medizinischer Leistungszusagen zu erfinden, nur damit die Sektionen gleich aussehen, wäre genau der Fehler, den die Bestandsanalyse mit ihren Content-Regeln verhindern will.

Die Sektionen 02 bis 05 tragen deshalb nur Nummer, H2 und Fließtext. Im `indikationen`-Array ist `spektrum` ein optionales Feld; fehlt es, rendert kein Listenelement und keine H3 — dasselbe Prinzip wie bei der optionalen Uhrzeit der Eventzeile.

**Das Zeilenmaß bleibt bei allen fünf gleich.** Alle Fließtexte werden auf `65ch` begrenzt, unabhängig davon, ob eine Spektrumsliste folgt. Die Spalten `3 / -1` sind bei 1440 Pixel rund 1060 Pixel breit, was bei 16 Pixel IBM Plex Sans etwa 115 Zeichen pro Zeile ergäbe — der Designkontext setzt Body auf `max-width: 65ch`, und `PageIntro.astro:70` kappt seinen Intro-Absatz bei `62ch`. Ein Maß von 115 Zeichen wäre auf der Seite, deren erklärter Zweck Ruhe und Lesbarkeit ist, ein Eigengoal.

Das Loch nach der fehlenden Liste wird stattdessen über Spacing gelöst: die Sektionen 02 bis 05 erhalten geringeres `padding-block` als die Hernien-Sektion. Die Seite bekommt dadurch einen Rhythmus, in dem die Hernien-Sektion sichtbar mehr Raum beansprucht — was ihrer Rolle als Kernfachgebiet entspricht und der Grund ist, warum sie auch den einzigen Inline-CTA trägt.

**Sprungnavigation statisch, nicht klebend.** Eine mitlaufende Indexspalte mit Aktivmarkierung wäre publikationsartig und passend zum akademischen Register — sie kostet aber Scroll-Beobachtung per JavaScript. Auf dieser Seite gibt es mit dem Footer-Vorhang aus `src/scripts/footerVorhang.ts` bereits ein scrollabhängiges Verhalten. Ein zweites daneben bedeutet zwei bewegliche Teile, die sich gegenseitig stören können, für einen Orientierungsgewinn auf einer Seite mit fünf Ankern.

Die Navigation steht deshalb einmal unter dem Hero und scrollt danach aus. Die Anker bleiben als stabile Adressen erhalten.

Sie führt bewusst nur die fünf Indikationen, nicht alle acht Sektionen. Ein Index, der auch Verfahrenswahl, Ablauf und Vorbereitung listet, wäre eine Gliederung der Seite statt einer Auswahlhilfe — und die Aufgabe hier ist, dass jemand seine Diagnose findet. `#verfahren`, `#ablauf` und `#vorbereitung` existieren trotzdem als Adressen, weil die Startseite und spätere Verweise darauf zeigen.

**`PageIntro` behalten, den Profil-Hero nicht verallgemeinern.** Die Profil-Spec vom 28. Juli 2026 hat diese Entscheidung ausdrücklich auf dieses Arbeitspaket vertagt. Sie fällt gegen eine Verallgemeinerung.

Der eigene Hero der Profilseite existiert, weil dort drei Elemente unterzubringen waren — H1, Kurzprofil als Lead und die vierstellige Kennzahlen-Rail — und ein reines `PageIntro` deshalb über 40 Prozent Leerfläche ohne Hierarchiesprung erzeugte. Die Leistungsseite hat diesen Bedarf nicht: Eyebrow, H1, ein Intro-Absatz, ein CTA. Das ist genau der Fall, für den `PageIntro` gebaut wurde. Eine zweite Sonderkomposition würde die Seiten auseinanderlaufen lassen, ohne etwas zu lösen.

**H1-Breite über einen Wrapper überschreiben.** `PageIntro.astro:60` begrenzt die H1 auf `max-width: 14ch`. Der Satz „Chirurgische Beratung, die bei Ihrer Diagnose beginnt." hat 54 Zeichen und bricht dort in eine schmale, hohe Textsäule.

Der Wert wird nicht in der Komponente geändert — er ist auf die kürzeren H1 der übrigen Seiten abgestimmt. Ein `:global(.page-intro__copy h1)` aus der Seite heraus hilft aber nicht: Astro liefert die Komponentenregel als `h1[data-astro-cid-…]` mit Spezifität 0-1-1 aus, der globale Selektor hätte dieselbe, und die Durchsetzung hinge an der Stylesheet-Reihenfolge.

`<PageIntro>` wird deshalb in `leistungen.astro` in ein `<div class="leistungen-intro">` gewickelt und die Regel als `.leistungen-intro :global(.page-intro__copy h1)` geschrieben. Der Wrapper trägt das Scope-Attribut der Seite, die Spezifität liegt damit bei 0-3-1 — das von Astro injizierte Attribut zählt mit — und setzt sich unabhängig von der Reihenfolge durch. Startwert `max-width: 26ch`, was den Satz auf zwei ausgewogene Zeilen bringt; bei 1440 und 1920 Pixel visuell zu bestätigen. `text-wrap: balance` ist in der Komponente bereits gesetzt.

**Eigene Überschriftengröße für die Indikationen.** Die fünf Indikations-H2 laufen nicht auf `--text-h2`, sondern auf einer seitenlokalen Skala `clamp(1.5rem, 1.2rem + 1.2vw, 2.125rem)` — bei 1440 Pixel 34 statt 52 Pixel.

Zwei Gründe. Erstens die Rolle: fünf Registereinträge sind der H1 untergeordnet, und fünf Überschriften auf 52 Pixel wären auf einer Seite, die Ruhe herstellen soll, zu viel Stimme. Sektion 4 behält `--text-h2`, weil sie eine echte Sektionsüberschrift ist und eine von zwei Kontrastflächen trägt — dort ist die Größe gewollt.

Zweitens die Breite. Der Nummernspalte stehen zwei Rasterspalten zu, dem Inhalt `3 / -1`. Ein früherer Entwurf dieser Spec stellte Nummer und H2 gemeinsam in `1 / span 3` — das bricht sichtbar: bei 1440 Pixel ist der Container 1280 Pixel breit, der `--site-gutter` liegt bei etwa 24,5 Pixel, eine Spalte damit bei rund 84 Pixel und drei Spalten bei rund 302 Pixel. „Hämorrhoiden und Enddarmerkrankungen" auf `--text-h2` braucht ein Mehrfaches davon; allein „Enddarmerkrankungen" kommt bei 52 Pixel auf rund 540 Pixel. Das Ergebnis wäre Zwangstrennung, zerhackte Wörter oder Overflow — dieselbe Fehlerklasse, die das Projekt in `179fb60` und `fa861ec` bereits zweimal reparieren musste. Drei Spalten sind im Projekt das Maß für Label-Größe, nicht für Überschriften: `PageIntro` setzt dort das Eyebrow und schiebt die H1 nach `4 / -1`.

Auf `3 / -1` bei 34 Pixel bleibt die längste Überschrift auf einer Zeile. Unter 64rem gilt `1 / -1`; bei 320 Pixel liegt die Skala auf ihrem Minimum von 24 Pixel, was auch für „Enddarmerkrankungen" reicht. Zur Sicherheit gegen lange Komposita tragen die Überschriften `hyphens: auto` und `overflow-wrap: break-word`, wie `PageIntro` es für die H1 unter 42rem bereits tut.

**Zwei dunkle Sektionen, gesetzt als Mittelbruch und Abschluss.** Bei acht Sektionen trägt die Seite zwei Kontrastflächen: die Verfahrenswahl etwa in der Mitte und den CTA am Ende. Häufigerer Wechsel wirkt unruhig, dieselbe Begründung wie auf der Profilseite.

**Zwei Nummernserien, klar getrennt.** Die Seite trägt zwei Zählungen: Indikationen `01` bis `05` und Ablaufschritte `1` bis `5`. Die Sprungnavigation wiederholt die erste Serie und ist keine dritte. Ohne Regel sehen beide gleich aus und die Seite wirkt, als zählte sie zweimal dasselbe.

- **Indikationen:** zweistellig mit führender Null, IBM Plex Sans mit `font-variant-numeric: tabular-nums`, `--text-label`, Farbe `--color-text-subtle`.
- **Ablaufschritte:** einstellig, IBM Plex Sans, auf `--text-h3` vergrößert, Farbe `--color-primary-strong`.
- **Sprungnavigation:** übernimmt die Indikationsziffern unverändert, damit Anker und Ziel sichtbar dasselbe sind.

Die Unterscheidung läuft über Größe und Farbe, nicht über die Schriftfamilie.

**Kein Mono auf den Indikationsziffern.** Ein früherer Entwurf dieser Spec setzte sie in IBM Plex Mono. Das war ein Fehler: `TreatmentTabs.astro:290–293` setzt dieselben Ziffern `01` bis `05` auf der Startseite in `--font-display` mit `tabular-nums`, `--text-label` und `--color-text-subtle`. Dieselben Ordnungsziffern in zwei Schriftfamilien hätten genau die Wiedererkennung gebrochen, die oben als Grund für die wortgleichen H2 angeführt ist. Die Werte hier sind deshalb die der Startseite, Zeichen für Zeichen. `tabular-nums` löst das Ausrichtungsproblem bereits, ohne den Mono-Sonderfall zu brauchen; Mono bleibt im Projekt den Eventdaten und Filterzählern vorbehalten.

**Brand-Blau nur auf den Ablaufziffern, und in der kontraststarken Variante.** Fünf einstellige Ziffern sind die sparsamste Verwendung, die noch Wirkung hat; auf allen fünfzehn Ziffern wäre Blau Flächenfarbe und verstieße gegen den Designkontext.

Verwendet wird `--color-primary-strong`, nicht `--color-primary`. Gegen `--color-bg` gemessen erreicht `--color-primary` nur **2,22:1** und fällt damit durch WCAG AA, auch durch die 3:1 für Großtext — die Prüfliste dieser Spec hätte den eigenen Gestaltungsbeschluss sofort kassiert. `--color-primary-strong` erreicht **4,95:1** und besteht AA für Normaltext; `PageIntro` nutzt es aus demselben Grund bereits für das Eyebrow. `--color-text-subtle` auf den Indikationsziffern erreicht **5,04:1** und ist unbedenklich.

**Hinweisblöcke als getönte Fläche.** Notfallhinweis und Proktologie-Notiz brauchen visuelles Gewicht, ohne zu alarmieren. Sie werden als Fläche in `--color-surface-tint` mit `--radius-banner` gesetzt — der Token, den der Designkontext für bannerartige Inhaltsflächen vorsieht, weshalb die 16 Pixel Rundung keine Verletzung der 4-Pixel-Regel für allgemeine Container sind. Akzentstreifen über `border-left` sind ausdrücklich als Anti-Pattern geführt und kommen nicht infrage.

Der Notfallhinweis ist dabei kein Beiwerk. Er schickt Patientinnen und Patienten bei akuten Symptomen in die Notfallambulanz und ist damit der einzige Inhalt der Seite, der zeitkritisch handlungsleitend ist. Er belegt `4 / -1` statt der vollen Rasterbreite, weil er als Fläche sonst mit den beiden dunklen Sektionen um Aufmerksamkeit konkurriert — sein Gewicht kommt aus der Tönung und aus der Position unmittelbar vor dem Abschluss-CTA, also als letztes, was vor der Kontaktaufnahme gelesen wird. Textfarbe ist `--color-text`, gemessen **15,67:1** gegen die getönte Fläche.

**Haarlinie zwischen den Indikationen.** Der Designkontext sagt, Sektionen werden durch Spacing getrennt, nicht durch Trennlinien, und die Profil-Spec hat die horizontalen Registerlinien deshalb aktiv entfernt. Das gilt hier unverändert für die acht Sektionen der Seite: zwischen ihnen steht nur Raum. Die Haarlinie trennt die fünf Indikationen *innerhalb* von Sektion 3 — das ist die Kartenregel („Trennung durch 1px border oder Spacing allein") und regelkonform. Sie beginnt an der ersten und endet an der letzten Indikation, läuft also nicht als Dekolinie durch die Seite.

**Drei CTAs, nicht acht.** Hero, Hernien-Sektion und Abschluss. Die Hernien-Sektion bekommt den einzigen Inline-CTA, weil Hernienchirurgie das Kernfachgebiet ist und den Großteil der Anfragen trägt. Die Indikationen 02 bis 05 bleiben ohne — eine Seite, die nach jedem Absatz zur Terminanfrage auffordert, liest sich als Verkaufsstrecke und untergräbt genau das Vertrauen, das sie aufbauen soll.

**Kein englischer Fachbegriff für die Verfahrenswahl.** Der Live-Bestand nennt `Tailored Surgery`. Die primäre Zielgruppe sind Patientinnen und Patienten, und die globale Content-Regel verlangt, Fachbegriffe beim ersten Auftreten in Alltagssprache zu erklären. Ein englischer Begriff, der erst erklärt werden muss, kostet hier mehr Klarheit als er an Wiedererkennung bringt. Die Sektion heißt „Das passende Verfahren statt einer Standardlösung" und beschreibt das Konzept ohne es zu benennen.

**Minimalinvasiv nicht pauschal als überlegen.** Hier weicht die Seite bewusst vom Live-Ton ab. Live heißt es, die chirurgische Behandlung der überwiegenden Anzahl der Erkrankungen erfolge in Schlüssellochtechnik, gefolgt von einer Vorteilsliste. Die globale Content-Regel in `docs/content/00-bestandsanalyse.md` verbietet genau diese Darstellung. Die Seite formuliert stattdessen, dass minimalinvasive Eingriffe bei geeigneter Indikation kleinere Zugänge und raschere Erholung ermöglichen können und offene Verfahren bei bestimmten Befunden die medizinisch sinnvollere Option bleiben.

**Überschriftenhierarchie.** Eine H1 im Hero. Danach gilt nicht pauschal „H2 je Sektion" — drei Sektionen tragen keine:

| Sektion | Überschrift | Benennung |
| --- | --- | --- |
| 1 Hero | H1 aus `PageIntro` | — |
| 2 Auf dieser Seite | keine. „Auf dieser Seite" ist ein Label, keine Überschrift — ein Inhaltsverzeichnis gehört nicht in die Dokumentgliederung | `<nav aria-label="Auf dieser Seite">` |
| 3 Indikationen | H2 je Indikation, fünf insgesamt | `aria-labelledby` auf die jeweilige H2 |
| 4 Verfahrenswahl | H2 „Das passende Verfahren statt einer Standardlösung" | `aria-labelledby` |
| 5 Ablauf | H2 „Von der Abklärung zur Behandlung" | `aria-labelledby` |
| 6 Vorbereitung | H2 „Vorbereitung auf den Termin" | `aria-labelledby` |
| 7 Medizinischer Hinweis | keine | `<aside aria-label="Medizinischer Hinweis">` |
| 8 Abschluss-CTA | H2 wie auf Startseite und Profilseite | `aria-labelledby` |

Die H2 von Sektion 6 ist der Sektionstitel des Entwurfs, nicht dessen Formulierung „Bitte bringen Sie nach Möglichkeit mit" — die rutscht zur H3 über der Liste. Ohne diese Trennung hätte Sektion 6 nach der Herabstufung keine Überschrift mehr.

H3 gibt es genau zweimal: „Leistungsspektrum" in der Hernien-Sektion und „Bitte bringen Sie nach Möglichkeit mit" in Sektion 6. Beide erscheinen laut Designkontext in Versalien mit 0.08em Laufweite, was ihre Funktion als Listenvorspann trägt.

**Keine neuen Komponenten.** Die Indikationen entstehen aus einem `indikationen`-Array im Seiten-Frontmatter, analog zu `schwerpunkte` in `src/pages/index.astro`. Sprungnavigation, Ablaufregister und Hinweisflächen sind Einmal-Markup mit scoped styles in der Seite. Wiederverwendet werden `BaseLayout`, `PageIntro`, `Container`, `Grid` und `ButtonLink`.

Das folgt der etablierten Struktur des Projekts, in dem `index.astro` und `profil.astro` jeweils rund 1200 Zeilen Markup und scoped CSS tragen. Eine Komponente wird erst extrahiert, wenn ein Muster zum zweiten Mal gebraucht wird; keines der hier entstehenden Muster hat bisher einen zweiten Anwendungsfall.

## Bewusst nicht umgesetzt

- **Eigene Unterseiten je Indikation.** `/leistungen/hernien` und vier weitere Routen wären die SEO-stärkste Variante. Jede bräuchte aber rund 400 Wörter neuen medizinischen Text, den weder Entwurf noch Live-Bestand hergeben und der vollständig kundenbestätigungspflichtig wäre. Die Option bleibt offen; das Ankerschema dieser Seite ist dafür eine brauchbare Vorstufe, weil die IDs später zu Slugs werden können.
- **Bilder.** Die Seite bleibt vollständig ohne Bildmaterial, auch im Hero, obwohl der Designkontext als Hero-Grundtyp „große typografische Aussage plus Foto" beschreibt. Verfügbar wären nur die Übergangsfotos aus `public/images/temp/`, deren Auswahl, Nutzungsrechte und Einwilligungen laut `STATUS.md` offen sind. Eine Textstrecke ohne Bild ist vertretbar; ein rechtlich ungeklärtes Foto auf einer Patientenseite nicht. Sobald freigegebenes Material vorliegt, sind die Sektionsgrenzen 3/4 und 5/6 die naheliegenden Einschubstellen.
- **Verweis auf `operation-hernien.de`.** Der Live-Bestand verlinkt dorthin. Die Bestandsanalyse hält fest, dass der Verweis vom Ziel der Seite ablenkt, und übernimmt ihn nicht.
- **Vorteilsliste zur Schlüssellochtechnik.** Siehe oben, widerspricht der Content-Regel.
- **Preise, Honorare, Kassenangaben.** Im Live-Bestand nicht vorhanden, im Entwurf nicht vorgesehen. Gehören fachlich auf `/kontakt` und brauchen eine Kundenentscheidung.

## Übernommene Struktur mit Abweichung

Der Live-Ablauf hat vier Schritte, der Entwurf fünf. Die Seite folgt dem Entwurf und ergänzt `Planung und Nachsorge`, weil der Live-Ablauf mit der Therapieentscheidung endet und offenlässt, was danach passiert — für Patientinnen und Patienten die naheliegendste Anschlussfrage. Der Schritt ist als kundenbestätigungspflichtig geführt.

## Folgepunkt außerhalb dieser Seite

`docs/content/00-bestandsanalyse.md` schreibt für die Quellseite `/ordination` fest: „Ablauf zu `/leistungen`, Standort und Terminvereinbarung zu `/kontakt`; anschließend 301-Redirect". Diese Seite übernimmt den Ablauf-Teil. Der Redirect selbst gehört nicht hierher, weil er erst greifen darf, wenn auch `/kontakt` den Standortteil trägt, und weil er als Cloudflare-Pages-Regel zusammen mit den übrigen Redirects gesetzt wird. Er wird mit Abschluss dieses Arbeitspakets in `STATUS.md` unter den technischen Restarbeiten eingetragen, damit er nicht zwischen Leistungs- und Kontaktseite durchfällt.

## Offene Punkte

- **Fünfter Ablaufschritt `Planung und Nachsorge`.** Sagt zu, dass Eingriff, Klinikaufenthalt, Verhalten danach und Kontrollen gemeinsam festgelegt werden. Im Live-Bestand nicht belegt. Vom Kunden zu bestätigen.
- **Sektion `Vorbereitung auf den Termin`.** Die Liste mitzubringender Unterlagen ist im Bestand nicht belegt und impliziert eine Erwartungshaltung an das Erstgespräch. Vom Kunden zu bestätigen.
- **Leistungsspektrum der Hernien-Sektion.** Sechs Einzelpositionen, darunter wiederkehrende Hernien und komplexe Bauchwandrekonstruktion. Fachlich plausibel, da die Profilseite komplexe Bauchwandhernien als Schwerpunkt führt, aber als Leistungszusage nicht aus dem Bestand belegt. Vom Kunden zu bestätigen.
- **Kriterienliste der Verfahrenswahl.** Vier Kriterien als Konkretisierung des Entwurfs. Trägt die Begründung für die dunkle Sektion; ohne Bestätigung wandert der Inhalt als Absatz in Ablaufschritt 4. Vom Kunden zu bestätigen.
- **Zwei ärztliche Handlungsanweisungen.** Der Notfallhinweis und die Proktologie-Notiz zu Blut im Stuhl sind medizinisch üblich und im Sinne der Patientensicherheit, aber inhaltliche Setzungen ohne Vorlage im Bestand. Vor Go-live fachlich zu bestätigen.
- **CTA-Ziel `/kontakt`.** Die Zielseite ist derzeit ein Stub aus Seitenintro. Die Route existiert, die Kontaktseite ist das nächste Arbeitspaket nach dieser Seite. Die CTAs verlinken bereits dorthin, statt später einzeln umgestellt werden zu müssen.

## Prüfung vor Abschluss

- Responsive-Pass bei 320, 390, 768, 1024, 1440, 1920 und 2560 Pixel auf horizontalen Overflow und Konsolenmeldungen
- Kontrastmessung aller Textfarben gegen WCAG AA, insbesondere in den beiden dunklen Sektionen. Im hellen Bereich sind die Werte vorab gerechnet und festgelegt: Ablaufziffern `--color-primary-strong` 4,95:1, Indikationsziffern `--color-text-subtle` 5,04:1, Hinweistext `--color-text` auf `--color-surface-tint` 15,67:1. `--color-primary` ist mit 2,22:1 auf dieser Seite für Text gesperrt
- Überschriftenbreite: „Hämorrhoiden und Enddarmerkrankungen" bei 1440, 1024, 390 und 320 Pixel auf Zwangstrennung und Overflow prüfen — das ist die längste Überschrift der Seite und die Stelle, an der ein zu schmales Raster zuerst bricht
- Zeilenmaß aller Indikationstexte auf 65ch begrenzt, auch dort, wo keine Spektrumsliste folgt
- H1-Umbruch bei 1440 und 1920 Pixel gegen den `26ch`-Startwert bestätigen
- Ankersprünge geprüft: `global.css:73` setzt bereits `scroll-padding-top: calc(var(--header-height) + var(--space-4))` auf `html`, und der Header ist `position: sticky`. Zu bestätigen ist, dass dieser globale Offset trägt — **kein zusätzliches `scroll-margin-top` pro Sektion**, das würde den Abstand verdoppeln. `prefers-reduced-motion` ist über `global.css:215` bereits abgedeckt.
- Die drei umgestellten Startseiten-CTAs springen auf die richtigen Sektionen, auch bei geöffnetem mobilen Menü
- Semantik: eine H1, Sektionen über `aria-labelledby` benannt, Sprungnavigation als Liste
- `npm run build` ohne Fehler und Warnungen, Produktionsbuild unter den echten CSP-Headern geprüft
