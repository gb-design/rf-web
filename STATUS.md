# Projektstatus — Dr. René H. Fortelny Website

Stand: 16. Juli 2026
Branch: `dev`
Repository: `gb-design/rf-web`
Gesamtstatus: **Foundation abgeschlossen · Static MVP in Arbeit**

Diese Datei ist die verbindliche Statusquelle des Projekts. Sie wird nach jedem abgeschlossenen Arbeitspaket aktualisiert.

## Statuslegende

- ✅ Erledigt
- 🟡 In Arbeit oder teilweise umgesetzt
- ⬜ Offen
- ⛔ Blockiert durch fehlende Entscheidung, Freigabe oder externe Voraussetzung

## Aktueller Überblick

| Bereich | Status | Stand |
| --- | --- | --- |
| Git und GitHub | ✅ | Repository verbunden, `dev` gepusht und als Standardbranch eingerichtet |
| Astro-Grundlage | ✅ | Astro 5, TypeScript, gehärtetes BaseLayout und acht geplante Routen vorhanden |
| Build | ✅ | `npm run build` erfolgreich, 0 Fehler und 0 Warnungen |
| Design-Tokens | ✅ | Farben, Fluid-Typografie, Abstände und Lumos-orientiertes 12-Spalten-Raster in `src/styles/tokens.css` angelegt |
| Lokale Fonts | ✅ | IBM Plex Sans und IBM Plex Mono lokal eingebunden |
| Content-Konzept | ✅ | Bestandsanalyse und Entwürfe für Haupt- und Pflichtseiten dokumentiert |
| Statische Assets | 🟡 | Logo, Icons, Lottie-Dateien und temporäre Fotos vorhanden; Rechte und finale Auswahl offen |
| Globale UI | ✅ | Header, Navigation, Footer, Container, globales Grid und Button-Komponenten stehen |
| Hauptseiten | 🟡 | Startseite inhaltlich und visuell umgesetzt; weitere Hauptseiten haben derzeit gemeinsame Intros |
| Pflichtseiten | 🟡 | Routen und Arbeitsentwürfe vorhanden; vollständige Umsetzung und rechtliche Freigabe fehlen |
| Sanity CMS | ⬜ | Noch nicht installiert oder konfiguriert |
| Kontaktformular | ⬜ | Resend-Endpoint, Validierung, Consent, Honeypot und Rate-Limit fehlen |
| Cloudflare Pages | ⬜ | Projekt und Preview-Deployment noch nicht eingerichtet |
| Qualitätssicherung | 🟡 | Foundation sowie Hero und Behandlungsschwerpunkte von 320 bis 2560 px geprüft; vollständiger Seitenpass steht noch aus |
| Production Release | ⬜ | `main`, Production-Deployment und Go-live-Prüfung stehen aus |

## Erledigt

- Projektstruktur und technische Leitplanken definiert.
- Git-Repository initialisiert und mit `https://github.com/gb-design/rf-web.git` verbunden.
- Vollständiger Foundation-Stand auf `dev` gesichert.
- Abhängigkeiten installiert und reproduzierbar über `package-lock.json` festgehalten.
- Sechs Hauptrouten angelegt: `/`, `/profil`, `/leistungen`, `/events`, `/galerie`, `/kontakt`.
- `BaseLayout.astro`, globale Styles und Design-Tokens angelegt.
- Skip-Link, semantische Landmarks, Fokuszustände, Reduced-Motion-Regeln und responsive Grundstruktur umgesetzt.
- Header mit aktiver Desktop-Navigation und JavaScript-freiem mobilen Vollbildmenü umgesetzt.
- Footer mit Navigation, Kontakt-CTA und funktionierenden Links zu den Pflichtseiten umgesetzt.
- Wiederverwendbare Container-, Seitenintro- und vollständige Button-Komponenten für Links und Formulare erstellt.
- Meta-Grundlagen und Cloudflare-Sicherheitsheader ergänzt.
- Desktop- und Mobile-Darstellung einschließlich 320 px Mindestbreite ohne horizontalen Overflow geprüft.
- IBM-Plex-Schriften lokal eingebunden; Build-Artefakte, Abhängigkeiten, Env-Dateien und lokale Browser-Logs werden ignoriert.
- Content-Bestandsanalyse sowie Seitenentwürfe für Home, Profil, Leistungen, Events, Galerie, Kontakt, Impressum und Datenschutz erstellt.
- Temporäre Bilder, Logo, Icons und Lottie-Animationen als Arbeitsmaterial gesammelt.
- Projektrollen, Qualitätsgates, GitHub-Workflow und Operating Model dokumentiert.
- Startseite mit Hero, Behandlungsschwerpunkten, Beratungsablauf, Verfahrens-, Profil-, Event- und Kontaktteaser umgesetzt.
- Hero als präzise Editorial-Komposition mit fluider Typografie, gegen die tatsächliche Screenhöhe zentrierter Portraitbühne, separater Namenscaption, präzisierter Fachausrichtung, `100svh`-Mindesthöhe und eigenem Tablet-Titelfluss überarbeitet.
- Zentrale H1-, H2-, H3- und Body-Tokens als kontrollierte fluide Typografieskala für Mobile bis Desktop geschärft.
- Hero im Browser bei 1440 px, 768 px, 390 px und 320 px geprüft; kein horizontaler Overflow und keine Konsolenwarnungen.
- Globales Astro-natives 12-Spalten-Raster nach Lumos-Prinzipien mit fluidem Seitengutter, fluidem Column-Gap und konsistenten Spaltenbelegungen für Header, Footer, Seitenintros und alle Startseiten-Sektionen eingeführt.
- Behandlungsschwerpunkte als zugängliche Desktop-Tabs mit darunterliegender Beschreibung und als mobiles Accordion umgesetzt.
- Passende lokale Lottie-Animationen auf einer dunklen, adaptiv ausbrechenden Bühne integriert; nur die aktive Animation wird über den leichten SVG-Player geladen, im nicht sichtbaren Bereich pausiert und bei reduzierter Bewegung als Standbild gezeigt.
- Subtile zweistufige Pointer-Perspektive für Lottie-Bühne und Illustration ergänzt; auf Touch-Geräten und bei reduzierter Bewegung bleibt die Darstellung statisch.
- Responsive Layouts bei 320, 390, 1024, 1440 und 2560 Pixel ohne horizontalen Overflow geprüft; Tabwechsel, Pfeiltastennavigation, Mobile-Accordion und Lottie-Neustart verifiziert.
- Astro-Scoping-Regression der globalen Grid-Roots behoben: Beratung, Events und Footer-Legalzeile nutzen wieder ihre vollständigen vorgesehenen Spalten statt einzelner 12tel-Spalten.
- Sichtbaren Lottie-Ladezustand ergänzt; die Illustration wird erst nach einem tatsächlich laufenden Frame eingeblendet und bleibt bei Ladefehlern durch eine markenkonforme Bühne vertreten.
- Lottie-Bühne auf Desktop auf die Rasterspalten 7 bis 12 begrenzt, geometrische Raute entfernt und durch ein dezentes, zur Mitte auslaufendes Punktraster ersetzt.
- Parallax-Steuerung auf die gesamte Behandlungsschwerpunkte-Sektion erweitert; das zweistufige Punktraster für eine klar erkennbare, weiterhin zurückhaltende Tech-Anmutung geschärft.
- Lottie-Wechsel in Tabs und Accordion mit einem kurzen Fade-in und einer um 24 Pixel nach unten versetzten Eintrittsbewegung verfeinert; Eintrittsanimation und sektionweiter Parallax laufen auf getrennten Transform-Ebenen und respektieren reduzierte Bewegung.
- Introtext der Behandlungsschwerpunkte auf eine einheitliche maximale Zeilenlänge von 55 Zeichen verbreitert.
- Dekorative Quadrat- und Rautenformen in Hero, Profilteaser, Schwerpunktnavigation und Eventstatus durch vertikal orientierte Sechsecke aus der Formsprache des Logos ersetzt; SVG-Konturen mit explizitem `currentColor` und 1,5-Pixel-Strich gegen ausfallende CSS-Strokes abgesichert.
- Fließtext global von IBM Plex Mono auf die besser lesbare IBM Plex Sans umgestellt; Mono bleibt nur als optionaler Token für technische Daten erhalten.
- Große Hintergrundfläche des Hero-Portraits als regelmäßiges, vertikal orientiertes Sechseck in der Formsprache des Logos umgesetzt; festes Seitenverhältnis von √3:2 verhindert Verzerrungen und skaliert proportional mit Portraitspalte und Viewporthöhe.
- Dekorative vollflächige Linien aus Kontakt-CTA und Seiteneinstiegen entfernt, damit keine Linien mehr unmotiviert durch Inhalte laufen.
- Eventbereich auf der Startseite bis zur Sanity-Anbindung mit einem belastbaren Leerzustand versehen.
- Ungültige beziehungsweise noch nicht vorhandene CV- und Detailanker bewusst nicht verlinkt.

## Nächstes Arbeitspaket

**Static MVP — Startseite abschließen**

1. ✅ Hero mit vorhandenem Übergangsportrait ausarbeiten.
2. ✅ Orientierung zu Behandlungsschwerpunkten und Beratungsablauf umsetzen.
3. ✅ Profil-, Event- und Kontaktteaser integrieren.
4. 🟡 Startseite inhaltlich und semantisch geprüft; Hero und Behandlungsschwerpunkte visuell und funktional geprüft, vollständigen visuellen Seitenpass nachholen.
5. ✅ `npm run build` erfolgreich ausführen und diesen Status aktualisieren.

Danach folgen Profil, Leistungen, Kontakt, Galerie sowie die vollständigen Pflichtseiten. Events werden zunächst mit einem belastbaren Leerzustand vorbereitet und später an Sanity angebunden.

## Phasen

| Phase | Status | Abschlusskriterium |
| --- | --- | --- |
| 1. Foundation Hardening | ✅ | Globale UI, Navigation, Layout, Basissicherheit und responsive Grundlage stehen |
| 2. Static MVP | ⬜ | Alle statischen Seiten sind inhaltlich und visuell umgesetzt |
| 3. Asset Integration | ⬜ | Freigegebene Bilder, Alt-Texte und responsive Varianten sind integriert |
| 4. Sanity CMS | ⬜ | Studio, Schemas, Queries sowie Events und Galerie funktionieren |
| 5. Kontaktformular | ⬜ | Endpoint, Resend, Validierung, Consent und Schutzmaßnahmen funktionieren |
| 6. Full Audit | ⬜ | Security, Accessibility, Performance, SEO, Content und Legal sind geprüft |
| 7. Release | ⬜ | Cloudflare Preview, PR `dev` → `main`, Go-live und Smoke Test sind abgeschlossen |

## Offene Entscheidungen und Blocker

- ⛔ Offizielle aktuelle Berufsbezeichnung und akademische Funktionen bestätigen.
- ⛔ Primären Ordinationsstandort, Telefonnummer und Patienten-E-Mail bestätigen.
- ⛔ Gültigen CV als PDF und aktuelle Social-Media-Profile bereitstellen.
- ⛔ Bildauswahl, Nutzungsrechte, Einwilligungen und Alt-Texte freigeben.
- ⛔ Impressum und Datenschutzerklärung fachlich beziehungsweise rechtlich prüfen.
- ⛔ Verantwortlichkeiten, Speicherfristen und Verträge für Cloudflare, Sanity und Resend klären.
- ⛔ Entscheiden, ob Analytics, Karten, Videos, Newsletter oder Cookies eingesetzt werden.
- ⛔ Member-Bereich und Freebies fachlich klären; bis dahin nicht implementieren.
- ⛔ Newsletter-Anbieter nur auswählen, wenn ein Newsletter tatsächlich geplant ist.

## Go-live-Gates

- [ ] Alle sichtbaren Seiten haben eindeutige Titel, Meta Descriptions und sinnvolle semantische Struktur.
- [ ] Navigation, CTAs und Downloads funktionieren auf Desktop und Mobile.
- [ ] Kontaktformular ist validiert, abgesichert und datenschutzkonform dokumentiert.
- [ ] Medizinische Inhalte und zeitabhängige Fakten sind fachlich bestätigt.
- [ ] Impressum und Datenschutzerklärung sind freigegeben.
- [ ] Bildrechte und Einwilligungen sind dokumentiert.
- [ ] Keine Secrets oder personenbezogenen Testdaten befinden sich im Repository.
- [ ] Accessibility-, Browser-, Performance-, SEO- und Security-Prüfungen sind abgeschlossen.
- [ ] Cloudflare Preview wurde geprüft und der Build ist grün.
- [ ] Release erfolgt ausschließlich per Pull Request von `dev` nach `main`.

## Pflege dieser Datei

- Nach jedem Arbeitspaket: Status, erledigte Punkte und nächstes Arbeitspaket aktualisieren.
- Neue externe Abhängigkeiten oder Kundenentscheidungen unter „Offene Entscheidungen und Blocker“ ergänzen.
- Ein Punkt wird erst als erledigt markiert, wenn Implementierung und relevante Prüfung abgeschlossen sind.
- Dauerhafte Architektur- und Prozessentscheidungen zusätzlich in `docs/project-operating-model.md` dokumentieren.
