// Reiner Aufsatz. Das Filtern selbst laeuft vollstaendig ueber CSS und
// funktioniert ohne dieses Skript unveraendert; ergaenzt werden nur die
// Ansage des Trefferstands und die Escape-Abkuerzung.

const form = document.querySelector<HTMLFormElement>("#event-filter");
const statusZeile = form?.querySelector<HTMLElement>(".filter__status");
const wurzel = form?.closest<HTMLElement>(".events");

if (form && statusZeile && wurzel) {
  const gesamt = Number(statusZeile.dataset.gesamt);

  const aktiveEingaben = () =>
    [...form.querySelectorAll<HTMLInputElement>(".filter__input:checked")];

  const aktualisieren = () => {
    const aktiv = aktiveEingaben();

    if (aktiv.length === 0) {
      statusZeile.textContent = `${gesamt} Termine`;
      return;
    }

    const auswahl = aktiv.map((i) => `.event[data-type="${i.value}"]`).join(",");
    const treffer = wurzel.querySelectorAll(auswahl).length;
    statusZeile.textContent = `${treffer} von ${gesamt} Terminen`;
  };

  form.addEventListener("change", aktualisieren);

  // Das reset-Event feuert vor dem Zuruecksetzen der Felder.
  form.addEventListener("reset", () => queueMicrotask(aktualisieren));

  // Bewusst nur im Fokusbereich der Filterleiste, nicht seitenweit: Escape
  // bedeutet konventionell "schliesse das offene Ding", nicht "loesche meine
  // Auswahl". Seitenweit gebunden waere es eine Ueberraschung ohne Rueckgaengig.
  form.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (aktiveEingaben().length === 0) return;

    form.reset();
    queueMicrotask(aktualisieren);
    form.querySelector<HTMLInputElement>(".filter__input")?.focus();
  });
}
