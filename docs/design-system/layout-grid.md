# Layout- und Raster-System

Stand: 16. Juli 2026

Das Layout orientiert sich konzeptionell eng am Lumos Framework, bleibt jedoch Astro-nativ: Struktur entsteht durch wiederverwendbare Komponenten und Design-Tokens statt durch Webflow-spezifische Utility-Klassen.

## Grundsystem

- 12 Spalten auf allen Seiten
- Fluides Seitengutter über `--site-margin`
- Fluider Spaltenabstand über `--site-gutter`
- Maximale Inhaltsbreite von `80rem`
- Unterstützte Mindestbreite von `20rem` beziehungsweise 320 Pixel
- Sektionen dürfen gezielt aus dem Inhaltscontainer ausbrechen, das Grundraster bleibt ihre Ausrichtungslinie

Die verbindlichen Variablen stehen in `src/styles/tokens.css`:

```css
--site-column-count: 12;
--site-max-width: 80rem;
--site-margin: clamp(1.25rem, 0.35rem + 3vw, 4rem);
--site-gutter: clamp(1rem, 0.72rem + 0.9vw, 2rem);
```

## Komponenten

`Container.astro` begrenzt die Inhaltsbreite und setzt das äußere Seitengutter. `Grid.astro` stellt darin das 12-Spalten-Raster bereit.

```astro
<Container>
  <Grid class="section__grid">
    <div class="section__title">…</div>
    <div class="section__copy">…</div>
  </Grid>
</Container>
```

Komponenten behalten semantische, BEM-artige Klassennamen. Spaltenpositionen werden in der jeweiligen Komponente definiert; globale Klassen wie `col-span-6` werden nicht eingeführt.

Wird eine Klasse über `class` an `Grid.astro` übergeben, liegt das gerenderte Root-Element im Scope der Grid-Komponente. Root-Regeln in einer aufrufenden Astro-Komponente müssen deshalb mit `:global(.klassenname)` adressiert werden. Direkte Grid-Inhalte erhalten für ihre Spaltenbelegung eigene semantische Klassen; Spaltenregeln dürfen nicht ausschließlich von einem lokal gescopten Parent-Selektor abhängen.

## Responsive Regeln

- Das Raster bleibt grundsätzlich bei 12 Spalten. Inhalte ändern an definierten Breiten ihre Spaltenbelegung.
- Mobile Inhalte belegen üblicherweise `grid-column: 1 / -1`.
- Typografie, Außenabstände und Gutter skalieren fluid über `clamp()`.
- Breakpoints werden nur eingesetzt, wenn Inhalt, Bedienung oder Lesbarkeit einen strukturellen Wechsel benötigen.
- Kein Grid-Element darf durch seinen intrinsischen Inhalt die Spalten verbreitern; direkte Grid-Kinder erhalten deshalb `min-width: 0`.

## Ausnahmen und Full-Bleed

Full-Bleed-Flächen dürfen rechts oder links über den Container hinausreichen, wenn sie eine klare gestalterische Funktion haben. Die Lottie-Bühne der Behandlungsschwerpunkte ist bewusst keine solche Ausnahme: Sie belegt auf Desktop die Spalten 7 bis 12 und endet am rechten Rand des Inhaltscontainers. Auf Mobile nutzt sie die volle verfügbare Containerbreite.
