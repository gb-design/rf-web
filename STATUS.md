# Projektstatus — Dr. René H. Fortelny Website

Stand: 28. Juli 2026
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
| Content-Konzept | ✅ | Bestandsanalyse und Entwürfe für Haupt- und Pflichtseiten dokumentiert; offene Fakten gegen den Live-Bestand abgeglichen |
| Statische Assets | 🟡 | Logo, Icons, Lottie-Dateien und temporäre Fotos vorhanden; Rechte und finale Auswahl offen |
| Globale UI | ✅ | Header, Navigation, Footer, Container, globales Grid und Button-Komponenten stehen |
| Hauptseiten | 🟡 | Startseite und Profilseite inhaltlich und visuell umgesetzt; Leistungen, Events, Galerie und Kontakt bestehen bisher nur aus dem gemeinsamen Seitenintro |
| Pflichtseiten | 🟡 | Routen und Arbeitsentwürfe vorhanden; vollständige Umsetzung und rechtliche Freigabe fehlen |
| Sanity CMS | ⬜ | Noch nicht installiert oder konfiguriert |
| Kontaktformular | ⬜ | Resend-Endpoint, Validierung, Consent, Honeypot und Rate-Limit fehlen |
| Cloudflare Pages | 🟡 | Preview-Deployment über einen leeren Commit angestoßen; Ergebnis noch nicht verifiziert und hier dokumentiert |
| SEO-Grundlagen | 🟡 | Titel und Descriptions je Seite vorhanden; `site` in `astro.config.mjs`, Canonical-Tags, Open-Graph-Daten, `robots.txt` und Sitemap fehlen |
| Qualitätssicherung | 🟡 | Foundation, Hero und Behandlungsschwerpunkte von 320 bis 2560 px geprüft; vollständiger Seitenpass über alle Sektionen steht noch aus |
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
- Primären Ordinationsstandort bestätigt (Ordinationszentrum Rudolfinerhaus, Billrothstraße 78, 1190 Wien) und im Hero-Fact-Block der Startseite ergänzt.
- Kundenentscheidung vom 28. Juli 2026: Das Rudolfinerhaus ist der einzige Standort der Website. Die zweite Klinik aus dem Bestandsimpressum wird an keiner Stelle übernommen — Kontaktentwurf, Bestandsanalyse und Marketing-Audit entsprechend bereinigt. Auch das neue Impressum führt ausschließlich das Rudolfinerhaus.
- Hero visuell verdichtet: Portraitbühne aus gefülltem Sechseck und konzentrischem Konturring, radialer Lichtkegel hinter dem Portrait und feine Korntextur erzeugen eine klare Ebenenstaffelung statt einer flachen Fläche.
- Hero-Fakten aus der Textspalte in eine Meta-Rail am unteren Rand überführt; die Trennlinie läuft randlos über die volle Viewportbreite und die Rail nimmt zusätzlich einen Scroll-Hinweis auf.
- Hierarchie der Hero-Labels geschärft: Eyebrow und Rail-Labels in IBM Plex Mono mit brand-red-Marke als einzigem Akzent, Fließtext-Labels von `--color-text-subtle` auf `--color-text-muted` angehoben (Kontrast von rund 3,3:1 auf rund 6:1).
- H1 auf 0.86 Zeilenhöhe und -0.058em Laufweite verdichtet; Zeilen als eigene Elemente für die gestaffelte Einblendung ausgezeichnet.
- Choreografierte Eintrittsanimation für Hero ergänzt (Eyebrow, H1-Zeilen, Intro, CTAs, Rail versetzt; Konturring als Strichzeichnung), ausschließlich über `transform` und `opacity`, mit expliziter Abschaltung bei reduzierter Bewegung.
- Hero-Höhe auf `calc(100svh - var(--header-height))` korrigiert und die Portraithöhe gedeckelt; Hero schließt bei 1440×780, 1512×900 und 1920×1080 exakt mit dem Viewport ab, mobile Hero-Höhe von 1513 auf 1408 Pixel reduziert.
- Positionierungs-Hacks des Portraits (negative `translateY` um die Headerhöhe, absolut gesetzte Bildunterschrift) durch reguläre Grid-Zeilen ersetzt.
- Hero um ein dependency-freies, Astro-natives Canvas-Punktraster nach dem React-Bits-Dot-Field-Prinzip ergänzt; der Verlauf nutzt Brand-Blau bis Tiefblau, läuft oben und unten weich aus und die Cursor-Auswölbung bleibt eine zurückhaltende Hintergrundinteraktion.
- Dot Field bei 1440, 768, 390 und 320 Pixel ohne Overflow oder Konsolenfehler geprüft; außerhalb des Viewports pausiert es und bleibt bei reduzierter Bewegung sowie auf Touch-Geräten statisch.
- Globalen Medienradius von 16 Pixel als `--radius-image` eingeführt und auf alle `<img>`-Elemente sowie die Lottie-Bühne der Behandlungsschwerpunkte angewendet.
- Bannerartige Inhaltsflächen über `--radius-banner` an denselben 16-Pixel-Radius gekoppelt und beim Profilteaser der Startseite angewendet.
- Radius-Regel im Design-System nachgezogen: `.impeccable.md` erlaubt für Bilder, Medienbühnen und Inhaltsbanner ausdrücklich mindestens 16 Pixel, während allgemeine Container weiterhin bei maximal 4 Pixel bleiben.
- Offene Fakten der Bestandsanalyse vollständig gegen die Live-Seite abgeglichen und in `docs/content/00-bestandsanalyse.md` mit Status ✅, ⚠️ und ❌ dokumentiert.
- Berufsbezeichnung und akademische Funktion aus dem Bestand bestätigt: Univ.-Prof. Dr. René Hartmann Fortelny, Lehrstuhl für Allgemeinchirurgie an der Medizinischen Fakultät der Sigmund Freud Privatuniversität Wien, Facharzt für Chirurgie und Viszeral-Chirurgie.
- Tatsächlich genutzte Social-Media-Profile identifiziert: Facebook und LinkedIn; kein Instagram, X oder Xing.
- Kammerzugehörigkeit als Ärztekammer Wien aus dem Live-Footer bestätigt.
- Kennzahlen aus dem Bestand erfasst: Platz 5 bei „Expertscape – Experts in Hernia“, 250 wissenschaftliche Vorträge, 122 Peer-Review-Publikationen, 4 Buchbeiträge.
- Tracking-Bestand der Live-Seite geprüft: kein Analytics, kein Tag Manager, kein Karten-Embed; ein YouTube-Video auf der Startseite und ein generischer Cookie-Hinweis im Datenschutztext.
- `npm run build` nach allen Startseiten-Änderungen erneut ausgeführt: 8 Seiten, 0 Fehler, 0 Warnungen.
- Profilseite `/profil` mit sieben Sektionen umgesetzt: Intro mit Kurzprofil, dunkle Haltungssektion, Werdegang-Register, Wissenschaft und Forschung, Funktionen und Mitgliedschaften, Kongresse und Lehre, Abschluss-CTA.
- Inhalt der Profilseite gegen den Live-Bestand abgeglichen; Werdegang von 8 auf 18 belegte Stationen erweitert, Funktionsliste mit 7 nationalen und 10 internationalen Einträgen ergänzt, experimentelle Herniengruppe am Ludwig-Boltzmann-Institut und die konkreten Kongressorganisationen aufgenommen.
- Werdegang als Zeitachse umgesetzt: durchgehende 1px-Achse mit Sechseckknoten aus der Formsprache des Logos, Jahreszahlen rechtsbündig in IBM Plex Mono mit `tabular-nums` gegen die Achse gesetzt, zwei Zeitgruppen mit auf Desktop mitlaufender Gruppenmarke. Auf Mobile rückt die Achse an den linken Rand und die Jahreszahl über die Beschreibung.
- Sechs Qualifikationsstationen als Meilensteine hervorgehoben (1993, 1996, 2008, 2010, 2013, 2016): größerer Knoten in Brand-Blau statt der zurückgenommenen Zwischenstationen. Die Auswahl ist eine redaktionelle Setzung und kann angepasst werden.
- Zeitachse scrollgesteuert animiert: Ein größeres blaues Sechseck folgt einer Leselinie bei 42 Prozent Bildschirmhöhe, zieht eine Fortschrittslinie im selben Blauton hinter sich her und die Stationen blenden von 50 auf 100 Prozent Deckkraft auf. Beide Zeitgruppen liegen dafür in einem durchgehenden Track; die Achse bricht nicht mehr zwischen den Jahrzehnten.
- Das Skript schreibt ausschließlich vier Custom Properties und nutzt `requestAnimationFrame`; Bewegung läuft allein über `transform` und `opacity`. Ohne JavaScript ist nichts abgeblendet und die Achse vollständig gezogen, bei reduzierter Bewegung entfällt der Marker und alle Stationen stehen auf voller Deckkraft. Beides verifiziert.
- Schriftgrößen projektweit angehoben, damit die Seite auch mit Altersweitsicht gut lesbar bleibt: `--text-body` von 16–17 auf 17–19 Pixel, `--text-label` von 14 auf 15 Pixel, neuer Token `--text-meta` mit 15 Pixel als verbindliche Untergrenze für technische Metadaten und Bildunterschriften. Jahreszahlen der Zeitachse auf 16 Pixel. Nichts auf der Profilseite liegt noch unter 15 Pixel.
- Startseite, Leistungen, Kontakt und Impressum nach der globalen Token-Änderung von 320 bis 2560 Pixel gegengeprüft: kein Overflow, keine Konsolenmeldungen, Hero der Startseite unverändert schlüssig.
- Hero der Profilseite neu komponiert, weil der bisherige Einstieg über 40 Prozent Leerfläche hatte und keinen Hierarchiesprung nach der H1: H1 groß in den Spalten 1 bis 6, Kurzprofil und persönliches Intro asymmetrisch versetzt in den Spalten 8 bis 12 statt untereinander, darunter eine rasterbreite Kennzahlen-Rail. Bewusst ohne Portrait — das bleibt dem Startseiten-Hero vorbehalten.
- Kennzahlen aus der Forschungssektion in den Hero verschoben statt dupliziert; das stärkste Vertrauenssignal steht damit oberhalb der Falz. Die Forschungssektion trägt weiterhin Text, Teamfoto und PubMed-Link.
- Profilseite nutzt `PageIntro.astro` nicht mehr, sondern einen eigenen Hero. Die Komponente bleibt für die übrigen Seiten unverändert in Betrieb; ob sich die neue Komposition verallgemeinern lässt, wird beim Bau der Leistungsseite entschieden.
- Boxbegrenzung `p { max-width: 72ch }` aus `global.css` kappte die rechtsbündige Stand-Angabe der Kennzahlen-Rail auf 648 Pixel und ließ sie zentriert erscheinen; lokal mit `max-width: none` aufgehoben.
- Kennzahlen in `--color-primary-strong` gesetzt, exakt der Blauton der Eyebrow-Labels.
- Count-up für die vier Kennzahlen ergänzt: `easeOutQuart` über 1600 Millisekunden, ausgelöst beim Sichtbarwerden der Rail. `easeOutExpo` wurde verworfen, weil es 98 Prozent des Werts im ersten Viertel der Zeit erreicht und der Rest nur noch kriecht.
- Serverseitig steht der echte Wert, damit die Rail ohne JavaScript stimmt; das Skript nullt sofort beim Start, sonst blitzt der Endwert auf und springt zurück. Bei reduzierter Bewegung bleibt der Endwert stehen. Beides verifiziert.
- Zeilenabstand der Startseiten-H1 von 0.86 auf 0.95 geöffnet und die Laufweite von -0.058em auf -0.048em zurückgenommen. Bei 0.86 kollidierten die Unterlängen mit den Umlautpunkten der Folgezeile („Erfahrung." gegen „Persönlich"); deutsche Displaytypografie braucht mehr Durchschuss als englische. Damit liegt die Startseite auch näher an den 0.98 der übrigen Seitenüberschriften.
- Hero-Passung nach der Typo-Änderung erneut vermessen: Bei 1920×1080, 1512×900, 1440×780, 1366×768 und 1024×768 schließt der Hero weiterhin auf 1 bis 6 Pixel genau mit dem Viewport ab, die dokumentierte mobile Höhe von 1408 Pixel bei 390 Pixel Breite bleibt unverändert.
- Seitenverhältnis aller Sechsecke korrigiert: Sie standen auf 1:1 und waren dadurch horizontal gestaucht. Ein reguläres, vertikal orientiertes Sechseck braucht √3:2, also `aspect-ratio: 0.8660254`. Betroffen waren der Tab-Marker der Behandlungsschwerpunkte, der Hero-Tick und der Eventstatus der Startseite sowie die Aufzählungspunkte im Werdegang. Der Tab-Marker wurde zusätzlich von 0.55 auf 0.75 Rem vergrößert.
- Alle sechs Sechsecke der Website im Browser nachgemessen: gerendertes Verhältnis liegt bei 0.866 bis 0.867.
- Haarlinie über dem Kurzprofil im Profil-Hero entfernt.
- Expertscape-Auszeichnung als Emblem-Lockup im Hero: Bildmarke bis 160 Pixel, daneben der Rang als eigene Aussage in Brand-Blau und die Quelle in Mono. Die ersten beiden Fassungen waren zu klein und beziehungslos abgelegt und wirkten wie ein Aufkleber.
- Hero-Spalten auf `align-items: start` umgestellt. Bei `end` sackte die rechte Spalte ab und ließ die obere rechte Ecke leer; jetzt bilden Eyebrow und Auszeichnung eine gemeinsame Kopfzeile.
- Expertscape-Platzierung aus der Kennzahlen-Rail entfernt, weil sie dort ein zweites Mal und schwächer stand. Die Rail führt jetzt ausschließlich die drei Kennzahlen wissenschaftlicher Arbeit und ist damit auch inhaltlich stimmig; eine globale Rangliste und eine Anzahl von Buchbeiträgen sind nicht dasselbe. Die Ziffern wurden dadurch auf bis zu 4,25 Rem vergrößert.
- Rail-Umbruch an die drei Werte angepasst: drei Spalten bis 40 Rem, darunter eine. Die vorherige Zweispaltigkeit stammte aus der Zeit mit vier Werten und hätte den letzten Wert allein in eine zweite Reihe gestellt.
- Bildmarke trägt `alt=""`, da die Bildunterschrift die Aussage auf Deutsch führt; die englische Marke allein wäre für Patientinnen und Patienten nicht unmittelbar lesbar.
- Abstand zwischen H1 und Kurzprofil im gestapelten Zustand von 16 bis 21 auf 48 bis 61 Pixel erhöht. Die erste Fassung griff nicht: Ein direktes `row-gap` auf einem Grid-Root verliert gegen die gescopte Regel in `Grid.astro`. Der Abstand wird jetzt über `--grid-row-gap` gesetzt, wie in `docs/design-system/layout-grid.md` vorgesehen. Derselbe Fehler steckte auch im Sektionskopf und wurde mitkorrigiert.
- Utility-Klasse `.visually-hidden` in `global.css` ergänzt. Die sichtbaren Ziffern sind vollständig `aria-hidden`, den echten Wert liefert ein eigenes Element — die Sprachausgabe bekommt so keinen Zwischenstand der Animation zu hören.
- Kennzahlen-Register mit vier Werten ergänzt.
- Dreistellige Nullen-Auffüllung der Kennzahlen wieder entfernt: „005 Platz weltweit" und „004 Buchbeiträge" sind sachlich falsch, ein Rang und eine Anzahl werden nicht aufgefüllt. Das Muster stammte aus dem Live-Bestand und war dort rein dekorativ.
- Zwei Fehler aus dem Bestand korrigiert: Kürzel der American Hernia Society von EHS auf AHS berichtigt, Deutsche Hernien Gesellschaft und European Hernia Society als getrennte Mitgliedschaften geführt.
- `PageIntro.astro` um einen optionalen Slot unter der Beschreibung erweitert; bestehendes Interface und alle übrigen Seiten bleiben unverändert.
- Fehlende Flächenfarbe der Sektionsthemen global behoben: `[data-section-theme]` setzt jetzt in `global.css` Hintergrund und Textfarbe, statt dass jede Seite es einzeln wiederholt. Zuvor rendelte die dunkle Sektion hellen Text auf hellem Grund.
- Silbentrennung für lange deutsche Komposita in `PageIntro.astro` ergänzt; die H1 wurde bei 320 Pixel zuvor durch `overflow: clip` still abgeschnitten.
- Kontrast aller kleinen Mono-Labels der Profilseite von `--color-text-subtle` auf `--color-text-muted` angehoben und gemessen: alle geprüften Textfarben liegen zwischen 4,97:1 und 17,61:1 und erfüllen WCAG AA.
- Profilseite bei 1440, 1024, 768, 390 und 320 Pixel geprüft: kein horizontaler Overflow, keine Konsolenmeldungen. Startseite, Leistungen und Kontakt als Regressionstest gegen die globale CSS-Änderung mitgeprüft.
- `npm run build` inklusive `astro check` nach der Profilseite ausgeführt: 21 Dateien, 0 Fehler, 0 Warnungen, 0 Hinweise.

## Nächstes Arbeitspaket

**Static MVP — Startseite abschließen**

1. ✅ Hero mit vorhandenem Übergangsportrait ausarbeiten.
2. ✅ Orientierung zu Behandlungsschwerpunkten und Beratungsablauf umsetzen.
3. ✅ Profil-, Event- und Kontaktteaser integrieren.
4. 🟡 Startseite inhaltlich und semantisch geprüft; Hero und Behandlungsschwerpunkte visuell und funktional geprüft, vollständigen visuellen Seitenpass über Beratungsablauf, Verfahren, Profil-, Event- und Kontaktteaser nachholen.
5. ✅ `npm run build` erfolgreich ausführen und diesen Status aktualisieren.

**Profilseite als erste Unterseite — abgeschlossen**

1. ✅ Inhaltsentwurf aus `docs/content/profil.md` in Sektionen übersetzt und zuvor gegen den Live-Bestand vervollständigt.
2. ✅ Werdegang, Wissenschaft, Funktionen und Lehre mit dem globalen Raster umgesetzt.
3. ✅ CV-Download bewusst nicht verlinkt, da kein freigegebenes PDF vorliegt.
4. ✅ Responsive-Pass bei 320, 390, 768, 1024, 1440, 1920 und 2560 Pixel ohne Overflow oder Konsolenmeldungen; Kontrast aller Textfarben gemessen und WCAG AA bestätigt.

**Nächstes Arbeitspaket — Leistungsseite**

1. ⬜ Inhaltsentwurf `docs/content/leistungen.md` zuerst gegen den Live-Bestand abgleichen, wie bei der Profilseite.
2. ⬜ Behandlungsschwerpunkte, Verfahren und Ablauf als eigenständige Seite umsetzen, ohne die Startseite zu duplizieren.
3. ⬜ Responsive- und Accessibility-Pass von 320 bis 2560 Pixel.

Danach folgen Kontakt, Galerie sowie die vollständigen Pflichtseiten. Events werden zunächst mit einem belastbaren Leerzustand vorbereitet und später an Sanity angebunden.

**Technische Restarbeiten, unabhängig vom Seitenfortschritt**

- ⬜ `site` in `astro.config.mjs` setzen sowie Canonical-Tags, Open-Graph-Daten, `robots.txt` und Sitemap ergänzen.
- ⬜ Status des Cloudflare-Pages-Projekts und der Preview-URL verifizieren und hier dokumentieren.

## Phasen

| Phase | Status | Abschlusskriterium |
| --- | --- | --- |
| 1. Foundation Hardening | ✅ | Globale UI, Navigation, Layout, Basissicherheit und responsive Grundlage stehen |
| 2. Static MVP | 🟡 | Alle statischen Seiten sind inhaltlich und visuell umgesetzt; bisher Startseite und Profil |
| 3. Asset Integration | ⬜ | Freigegebene Bilder, Alt-Texte und responsive Varianten sind integriert |
| 4. Sanity CMS | ⬜ | Studio, Schemas, Queries sowie Events und Galerie funktionieren |
| 5. Kontaktformular | ⬜ | Endpoint, Resend, Validierung, Consent und Schutzmaßnahmen funktionieren |
| 6. Full Audit | ⬜ | Security, Accessibility, Performance, SEO, Content und Legal sind geprüft |
| 7. Release | ⬜ | Cloudflare Preview, PR `dev` → `main`, Go-live und Smoke Test sind abgeschlossen |

## Offene Entscheidungen und Blocker

Grundlage ist der Live-Abgleich in `docs/content/00-bestandsanalyse.md` vom 24. Juli 2026.

- ⛔ Gültige Telefonnummer des Ordinationszentrums Rudolfinerhaus bestätigen (Bestand nennt +43 1 360 36 5900).
- ⛔ Patienten-E-Mail festlegen: Im Bestand kursieren eine private Adresse und eine offenbar veraltete Spitals-Adresse. Für Patientenanfragen ist eine eindeutige, professionelle Adresse nötig.
- ⛔ Aktualität der Kennzahlen zu Vorträgen, Publikationen und Ranking bestätigen und ein Stand-Datum festlegen; der Bestand nennt keines. Die Profilseite rendert derzeit die Konstante `standKennzahlen` mit dem Wert 2026 — eine Setzung, keine bestätigte Angabe.
- ⛔ Aktualität aller Funktionen und Mitgliedschaften auf der Profilseite bestätigen; die Liste stammt unverändert aus dem Bestand.
- ⛔ Promotionsjahr klären: Der frühere Inhaltsentwurf nannte eine Promotion 1984, im Live-Bestand ist sie nirgends belegt. Die Profilseite führt sie deshalb nicht.
- ⛔ Entscheiden, ob es zur Bestandsüberschrift „Reviewertätigkeiten“ Inhalt gibt; sie steht dort ohne Text und wurde nicht übernommen.
- ⛔ Bestätigen, ob ein PubMed-Autorenprofil existiert; die Profilseite verlinkt ersatzweise eine Suche nach `Fortelny RH`.
- ⛔ Gültigen CV als PDF bereitstellen; im gesamten Live-Bestand ist kein Download auffindbar.
- ⛔ UID beziehungsweise ATU-Nummer sowie zuständige Aufsichtsbehörde und Berufsrecht klären; im Bestand fehlen sie.
- ⛔ Bildauswahl, Nutzungsrechte, Einwilligungen und Alt-Texte freigeben; für die geplante Galerie existiert bisher kein rechtlich dokumentiertes Material.
- ⛔ Impressum und Datenschutzerklärung fachlich beziehungsweise rechtlich prüfen; der Bestandstext ist generischer Boilerplate ohne Angaben zu Formularverarbeitung und Speicherfristen.
- ⛔ Verantwortlichkeiten, Speicherfristen und Verträge für Cloudflare, Sanity und Resend klären.
- ⛔ Entscheiden, ob das YouTube-Video der Bestandsseite übernommen wird; eine Einbettung erfordert eine Zwei-Klick-Lösung, eine Anpassung der Content-Security-Policy und einen Datenschutzabsatz.
- ⛔ Entscheiden, ob Analytics, Karten, Newsletter oder Cookies eingesetzt werden; im Bestand ist nichts davon aktiv.
- ⛔ Member-Bereich und Freebies fachlich klären; bis dahin nicht implementieren.
- ⛔ Newsletter-Anbieter nur auswählen, wenn ein Newsletter tatsächlich geplant ist.
- ⛔ Bankverbindung nicht übernehmen: Der Live-Footer zeigt Kontonummer, IBAN und BIC. Für eine reine Informationswebsite entfällt diese Angabe; Entfernung mit dem Kunden bestätigen.

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
