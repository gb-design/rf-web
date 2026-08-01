// Legt den Footer als Vorhang hinter die Seitenflaeche. Die Bewegung selbst
// macht CSS; hier wird nur gemessen, wie viel Scrollweg der Footer braucht.

// Ohne Import oder Export waere dies ein globales Skript und teilte seinen
// Namensraum mit eventFilter.ts.
export {};

const footer = document.querySelector<HTMLElement>(".site-footer");
const wurzel = document.documentElement;

// Der Vorhang setzt voraus, dass der Footer in den Viewport passt — sonst
// waere er nie ganz sichtbar und der reservierte Scrollweg liefe ins Leere.
// Der Rest von zehn Prozent haelt einen Streifen Seiteninhalt stehen, damit
// die Bewegung als Freilegen lesbar bleibt und nicht als Seitenwechsel.
// Auf schmalen Geraeten ist dieser Footer hoeher als der Bildschirm; dort
// greift die statische Rueckfallebene.
const MAX_ANTEIL = 0.9;

if (footer) {
  let angewandt = -1;

  const messen = () => {
    // Im fixierten Zustand spannt der Footer ueber `inset-inline: 0` genau die
    // Viewportbreite, also dieselbe Breite wie im Fluss. Die Hoehe stimmt
    // deshalb in beiden Zustaenden und muss nicht zurueckgeschaltet werden —
    // was sonst eine Rueckkopplung mit dem ResizeObserver ausloeste.
    const hoehe = footer.offsetHeight;
    if (hoehe === angewandt) return;
    angewandt = hoehe;

    if (hoehe > 0 && hoehe <= window.innerHeight * MAX_ANTEIL) {
      wurzel.style.setProperty("--footer-height", `${hoehe}px`);
      wurzel.dataset.footer = "reveal";
    } else {
      wurzel.style.removeProperty("--footer-height");
      wurzel.dataset.footer = "static";
    }
  };

  messen();

  // Fasst Groessenaenderungen des Footers und des Viewports zusammen: beide
  // koennen die Umbruchlage und damit die Hoehe verschieben.
  let geplant = false;
  const nachmessen = (erzwingen = false) => {
    if (erzwingen) angewandt = -1;
    if (geplant) return;
    geplant = true;
    requestAnimationFrame(() => {
      geplant = false;
      messen();
    });
  };

  new ResizeObserver(() => nachmessen()).observe(footer);

  // Beim Drehen oder Verkleinern kann sich die Schwelle verschieben, ohne dass
  // der Footer selbst seine Hoehe aendert — deshalb hier neu bewerten.
  window.addEventListener("resize", () => nachmessen(true));

  // Webfonts aendern die Zeilenhoehen im Footer und damit seine Gesamthoehe.
  document.fonts?.ready.then(() => nachmessen());
}
