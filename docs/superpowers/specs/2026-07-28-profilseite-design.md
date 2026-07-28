# Design: Profilseite `/profil`

Stand: 28. Juli 2026
Status: freigegeben, in Umsetzung

## Ziel

Klinische Erfahrung und wissenschaftliche Kompetenz belegen, ohne Patientinnen und Patienten mit einem akademischen Register zu überfordern. Zwei Zielgruppen teilen sich die Seite: Patienten suchen Vertrauen, Fachpublikum sucht nachprüfbare Substanz.

## Inhaltsquellen

Der Entwurf `docs/content/profil.md` war unvollständig. Grundlage ist zusätzlich der Live-Bestand `https://www.fortelny.at/profil`, ausgelesen am 28. Juli 2026.

Im Bestand gefunden und im Entwurf nicht enthalten:

- Werdegang mit rund 18 statt 8 Einträgen, gruppiert in `1980 — 2000` und `2000 —`
- Vollständige Funktionsliste: 7 national, 11 international
- Experimentelle Herniengruppe am Ludwig-Boltzmann-Institut, 2003 bis 2015
- Konkrete Kongressorganisationen: Salzburger Hernientage, Hernie-kompakt Österreich
- Vierte Kennzahl: 4 Buchbeiträge

## Sektionen

| # | Sektion | Inhalt und Behandlung |
| --- | --- | --- |
| 1 | Hero | Eigener Hero statt `PageIntro`. H1 in den Spalten 1 bis 6, Kurzprofil und Intro versetzt in 8 bis 12, darunter die Kennzahlen-Rail über die volle Rasterbreite. Kein CV-CTA, da kein freigegebenes PDF vorliegt. |
| 2 | Haltung | Dunkle Kontrastsektion. Persönliches Statement in Ich-Form, deshalb visuell abgesetzt. |
| 3 | Werdegang | Zeitachse im 12-Spalten-Raster. Jahreszahl in IBM Plex Mono rechtsbündig gegen die Achse, Sechseckknoten auf der Achse, Beschreibung rechts. Zwei Zeitgruppen, beide dauerhaft offen. Bildeinschub `ehrung.jpg`. |
| 4 | Wissenschaft und Forschung | Fließtext inklusive Boltzmann-Institut, Bild `medizin-team_wsp01-history.jpg`, Kennzahlen-Register mit vier Werten, PubMed-Link. |
| 5 | Funktionen und Mitgliedschaften | Zweispaltig national und international. Reine Listen, keine Karten. |
| 6 | Kongresse und Lehre | Konkrete Organisationen mit Links, Verweis auf `/events`. |
| 7 | Abschluss-CTA | Dunkel, gleiches Muster wie die Startseite. |

## Gestalterische Entscheidungen

**Werdegang als Zeitachse.** Zuerst als reines Editorial-Register ohne Achse umgesetzt, auf Kundenwunsch vom 28. Juli 2026 zur Zeitachse weiterentwickelt. Karten je Station bleiben verworfen, weil identische Kartenraster ein dokumentiertes Anti-Pattern des Projekts sind.

Die Achse ist bewusst keine generische Timeline: keine Punkte, keine wechselseitig versetzten Karten, keine durchgehende Dekolinie über die volle Seitenbreite. Sie läuft ausschließlich innerhalb des Registers, beginnt am ersten und endet am letzten Knoten, und die Knoten sind vertikal orientierte Sechsecke aus der Formsprache des Logos. Die horizontalen Trennlinien des Registers entfielen dafür, damit Achse und Haarlinienraster nicht gegeneinander arbeiten.

**Hierarchie über Knotengewicht.** Sechs Qualifikationsstationen sind als Meilensteine markiert und erhalten einen größeren Knoten in Brand-Blau: Facharzt für Chirurgie 1993, Leitender Oberarzt 1996, Facharzt für Viszeral-Chirurgie 2008, Habilitation 2010, Fellowship 2013, Professur und Lehrstuhl 2016. Ohne diese Gewichtung wäre die Achse nur eine Liste mit Linie. Die Auswahl ist eine redaktionelle Setzung im Datenfeld `meilenstein` und jederzeit änderbar.

**Mono nur für Jahreszahlen und Kennziffern.** Der einzige im Projekt zulässige Mono-Einsatz sind technische und tabellarische Werte. Jahreszahlen im Werdegang und die Ziffern im Kennzahlen-Register erfüllen das; Fließtext bleibt IBM Plex Sans.

**Eine dunkle Sektion, nicht zwei.** Nur die Haltungssektion und der Abschluss-CTA sind dunkel. Bei sieben Sektionen würde häufigerer Wechsel unruhig wirken.

**Eigener Hero statt geteilter Komponente.** Der erste Entwurf nutzte `PageIntro.astro` mit einem zusätzlichen Slot. Das Ergebnis war zu schwach: über 40 Prozent Leerfläche, kein Hierarchiesprung nach der H1 und der Einstieg damit das schwächste Element einer Seite, deren übrige Sektionen kräftige Devices tragen.

Die neue Komposition setzt die H1 groß in die Spalten 1 bis 6 und versetzt Kurzprofil und persönliches Intro asymmetrisch in die Spalten 8 bis 12, statt sie unter der Überschrift zu stapeln. Das Kurzprofil steht als dunkleres, größeres Lead über dem gedeckten Intro und liefert den fehlenden Hierarchiesprung.

Diese Komposition in `PageIntro` unterzubringen hätte zwei sehr unterschiedliche Layouts in einer Komponente bedeutet, gesteuert über Slot-Erkennung. Dafür gibt es bisher nur einen realen Anwendungsfall. Die Profilseite bekommt deshalb einen eigenen Hero; `PageIntro` bleibt für die übrigen Seiten unverändert. Beim Bau der Leistungsseite wird entschieden, ob sich das Muster verallgemeinern lässt.

**Kennzahlen im Hero statt in der Forschungssektion.** Vier belegte Werte sind das stärkste Signal für das Fachpublikum und standen zuvor erst nach zwei Bildschirmhöhen. Sie bilden jetzt die Rail am Fuß des Hero und wurden unten entfernt statt dupliziert.

**Kein Portrait.** Kundenentscheidung: Das freigestellte Portrait bleibt dem Startseiten-Hero vorbehalten. Der Hero trägt deshalb rein typografisch.

## Bewusst nicht umgesetzt

- **CV-Download.** Kein freigegebenes PDF vorhanden. Der CTA aus dem Entwurf entfällt ersatzlos statt als toter oder deaktivierter Button zu erscheinen.
- **Reviewertätigkeiten.** Die Überschrift steht im Bestand ohne jeden Inhalt. Ohne Inhalt keine Sektion.
- **Promotionsdatum 1984.** Der Entwurf nennt es, der Bestand kennt es nicht. Bis zur Klärung nicht übernommen.

## Aus dem Bestand korrigiert

- `American Hernia Society - EHS` trägt im Bestand das falsche Kürzel und wird zu `AHS`.
- Deutsche Hernien Gesellschaft und European Hernia Society stehen im Bestand in einem gemeinsamen Listenpunkt und werden getrennt.

## Offene Punkte

- Stichtag der vier Kennzahlen ist unbestätigt. Die Seite rendert eine Konstante `standKennzahlen`, die vor Go-live zu verifizieren ist.
- Der PubMed-Link führt auf eine Suche nach `Fortelny RH`, nicht auf ein bestätigtes Autorenprofil.
- Aktualität aller Funktionen und Mitgliedschaften ist vom Kunden zu bestätigen.
