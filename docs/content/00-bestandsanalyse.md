# Bestandsanalyse und Content-Migration

Stand: 2. Juli 2026

## Zielbild

Die neue Website verbindet zwei Aufgaben:

1. Patientinnen und Patienten erhalten eine klare, vertrauenswürdige Orientierung zu Beschwerden, Behandlungsschwerpunkten, Ablauf und Kontakt.
2. Medizinische Kolleginnen und Kollegen finden den fachlichen Werdegang, wissenschaftliche Schwerpunkte, Veranstaltungen und den Lebenslauf.

Die primäre Nutzerhandlung ist die Kontaktaufnahme zur Terminvereinbarung. Für Fachpublikum sind der CV-Download und die Event-Seite sekundäre Ziele.

## Analysierter Live-Bestand

| Live-Seite | Stärken | Probleme | Migration |
| --- | --- | --- | --- |
| `/` | Positionierung, persönliche Beratung, minimalinvasive Chirurgie, Schwerpunkte und Events vorhanden | sprachliche Fehler, unklare Hierarchie, veraltete Events, fachliche und patientenbezogene Inhalte vermischt | Kernbotschaften kürzen; Leistungen, Ablauf, Profil und Kontakt klar verlinken |
| `/profil` | sehr umfangreicher Werdegang, Forschung, Mitgliedschaften und Funktionen | zu lang, wichtige Vertrauenssignale gehen in Listen unter, mehrere Angaben sind zeitabhängig | in patientenrelevantes Profil, kompakte Meilensteine und Fachbereich für Kolleginnen und Kollegen gliedern |
| `/ordination` | Erstgespräch, Analyse, Diagnose und Therapie gut als Ablauf beschrieben | Standort und Kontakt konkurrieren mit der Kontaktseite; externe Hernienseite lenkt vom Ziel ab | Ablauf zu `/leistungen`, Standort und Terminvereinbarung zu `/kontakt`; anschließend 301-Redirect |
| `/events` | sinnvoller Fachbereich mit Datum, Ort, Beschreibung und Link | alle sichtbaren Termine liegen 2025 und sind abgelaufen | Sanity-basiert, nur kommende Events zuerst; Archivzustand und leere Ansicht vorsehen |
| `/kontakt` | mehrere Institutionen und Kontaktmöglichkeiten vorhanden | englische H1, unklare primäre Anlaufstelle, Formular ohne sichtbare DSGVO-Einwilligung | eine primäre Ordination hervorheben; berufliche Institutionen trennen; Einwilligung und Notfallhinweis ergänzen |
| `/datenschutz` | rechtliche Seite vorhanden | veraltet, doppelte Abschnitte, Kontaktformular und konkrete Dienstleister nicht nachvollziehbar dokumentiert | neu auf tatsächliche technische Verarbeitung abstimmen und juristisch prüfen lassen |
| Impressum-Overlay | Basisdaten vorhanden | keine robuste, eigenständig verlinkbare Pflichtseite; Bankdaten sind für eine Informationswebsite unnötig | eigene Seite `/impressum`; nur erforderliche Angaben veröffentlichen |

## Abgleich mit der neuen Seitenstruktur

| Neue Seite | Quelle im Bestand | Content-Entscheidung |
| --- | --- | --- |
| `/` | Home | neu strukturieren und deutlich kürzen |
| `/profil` | Profil | bewahren, priorisieren, zeitabhängige Angaben prüfbar machen |
| `/leistungen` | Home + Ordination | neu als patientenorientierte Übersichtsseite aufbauen |
| `/events` | Events | Struktur erhalten, neue CMS-Felder und Testdaten definieren |
| `/galerie` | kein belastbarer Bestand | nur mit echten, freigegebenen Bildern veröffentlichen |
| `/kontakt` | Kontakt + Ordination | Termin, Standort, Ablaufhinweise und Formular zusammenführen |
| `/impressum` | Overlay + Datenschutz | als eigene Pflichtseite erstellen |
| `/datenschutz` | Datenschutz | technische und rechtliche Neufassung erforderlich |

## Globale Content-Regeln

- Patiententexte erklären und orientieren, stellen aber keine Ferndiagnose und kein Heilversprechen dar.
- „Minimalinvasiv“ nicht pauschal als überlegen darstellen. Das geeignete Verfahren richtet sich nach Diagnose, Voroperationen und persönlicher Situation.
- Primär durchgehend „Patientinnen und Patienten“ verwenden; direkte Ansprache mit „Sie“.
- Fachbegriffe beim ersten Auftreten in Alltagssprache erklären.
- Zeitabhängige Zahlen, Funktionen, Mitgliedschaften, Adressen und Kontaktdaten vor Veröffentlichung bestätigen.
- Event-Testdaten niemals auf der Produktionsseite veröffentlichen.
- Bei Bildern Einwilligung, Nutzungsrechte, sensible Gesundheitsdaten und Alternativtexte vor Veröffentlichung prüfen.
- Google Fonts aus Datenschutz- und Performancegründen lokal hosten.

## Offene Fakten vor dem Go-live

Abgeglichen mit dem Live-Bestand (Stand: 24. Juli 2026). Status: ✅ beantwortet · ⚠️ teilweise/widersprüchlich · ❌ weiterhin offen.

- ✅ **Berufsbezeichnung/akademische Funktionen** — „Univ.-Prof. Dr. René Hartmann Fortelny", Lehrstuhl für Allgemeinchirurgie an der Medizinischen Fakultät der Sigmund Freud Privatuniversität Wien, Facharzt für Chirurgie und Viszeral-Chirurgie.
- ✅ **Primärer Ordinationsstandort und Telefonnummer** — Ordinationszentrum Rudolfinerhaus, Billrothstraße 78, 1190 Wien, Tel. +43 1 360 36 5900, eigene E-Mail. Der Bestand führte zusätzlich eine zweite Klinik als Impressumsadresse; diese wird auf Kundenentscheidung vom 28. Juli 2026 nicht übernommen. Das Rudolfinerhaus ist der einzige Standort der neuen Website, auch im Impressum. Telefonnummer vor Veröffentlichung bestätigen.
- ⚠️ **Patienten-E-Mail-Adresse** — zwei Adressen im Umlauf: `dr.fortelny@gmail.com` (im Impressum als offizielle Adresse geführt) und `rene.fortelny@wienkav.at` (wirkt wie alte Spitals-Adresse). Vor Übernahme bestätigen, welche für Patientenanfragen vorgesehen ist.
- ✅ **Publikations-, Vortrags- und Rankingzahlen** (Aktualität zu bestätigen) — Platz 5 „Expertscape – Experts in Hernia" weltweit, 250 wissenschaftliche Vorträge, 122 Publikationen in Peer-Review-Journalen, 4 Buchbeiträge. Kein Stand-Datum auf der Live-Seite angegeben.
- ❌ **Gültiger CV als PDF** — auf Home, Profil und Ordination kein PDF-Link auffindbar. Muss neu beschafft werden.
- ✅ **Tatsächlich genutzte Social-Media-Profile** — Facebook (`facebook.com/rene.fortelny`) und LinkedIn (`linkedin.com/in/...fortelny...`) verlinkt. Kein Instagram, X oder Xing.
- ⚠️ **Zuständige Ärztekammer, Berufsrecht, Aufsichtsbehörde, UID** — „Kammerzugehörigkeit: Ärztekammer Wien" im Footer aller Seiten vorhanden. Keine UID/ATU-Nummer auf der Live-Seite auffindbar — weiterhin zu klären.
- ❌ **Verantwortlicher, Auftragsverarbeiter und Speicherfristen für das Kontaktformular** — aktuelle Datenschutzseite enthält nur generischen Boilerplate-Text ohne Angaben zur Formularverarbeitung oder zu Speicherfristen.
- ⚠️ **Einsatz von Analytics, Karten, Video-Einbettungen, Cookies oder Newsletter** — kein Google Analytics/Tag Manager/Matomo und kein Google-Maps-Embed im Live-HTML gefunden. Ein YouTube-Video ist auf der Startseite eingebettet („Abdominal Wall Reconstruction Europe 2026"). Cookies werden im Datenschutztext nur generisch erwähnt, nicht spezifiziert. Kein Newsletter-Formular vorhanden.
- ❌ **Freigegebene Galerie-Assets samt Bildrechten und Einwilligungen** — keine eigene `/galerie`-Seite im Bestand. Auf `/ordination` existiert eine kleine Bildkarussell-Sektion mit Klinikfotos, aber keine erkennbare Rechte- oder Einwilligungsdokumentation.

**Zusätzlicher Fund:** Auf jeder Live-Seite steht im Footer die vollständige Bankverbindung (Kontonummer, IBAN, BIC) — bestätigt den bestehenden Hinweis, dass diese Angaben für eine reine Informationswebsite entfernt werden sollten (siehe Impressum-Overlay in der Tabelle oben).

## Quellen der Bestandsanalyse

- https://www.fortelny.at/
- https://www.fortelny.at/profil
- https://www.fortelny.at/ordination
- https://www.fortelny.at/events
- https://www.fortelny.at/kontakt
- https://www.fortelny.at/datenschutz
- Projektvorgaben aus `AGENTS.md` und `.impeccable.md`

Die rechtlichen Entwürfe berücksichtigen als Ausgangspunkt § 5 ECG und § 25 MedienG. Sie ersetzen keine Prüfung durch eine österreichische Rechtsberatung oder Datenschutzfachperson.
