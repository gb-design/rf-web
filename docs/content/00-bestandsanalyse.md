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

- Offizielle aktuelle Berufsbezeichnung und akademische Funktionen
- Primärer Ordinationsstandort und gültige Telefonnummer
- Für Patienten vorgesehene E-Mail-Adresse
- Aktuelle Publikations-, Vortrags- und Rankingzahlen
- Gültiger CV als PDF
- Tatsächlich genutzte Social-Media-Profile
- Zuständige Ärztekammer, Berufsrecht, Aufsichtsbehörde und gegebenenfalls UID
- Verantwortlicher, Auftragsverarbeiter und Speicherfristen für das Kontaktformular
- Einsatz von Analytics, Karten, Video-Einbettungen, Cookies oder Newsletter
- Freigegebene Galerie-Assets samt Bildrechten und Einwilligungen

## Quellen der Bestandsanalyse

- https://www.fortelny.at/
- https://www.fortelny.at/profil
- https://www.fortelny.at/ordination
- https://www.fortelny.at/events
- https://www.fortelny.at/kontakt
- https://www.fortelny.at/datenschutz
- Projektvorgaben aus `AGENTS.md` und `.impeccable.md`

Die rechtlichen Entwürfe berücksichtigen als Ausgangspunkt § 5 ECG und § 25 MedienG. Sie ersetzen keine Prüfung durch eine österreichische Rechtsberatung oder Datenschutzfachperson.
