document.querySelectorAll(".controls-dialog").forEach((dialog) => {
  const trigger = document.querySelector(`[aria-controls="${dialog.id}"]`);
  const closeButton = dialog.querySelector(".controls-dialog__close");

  if (!trigger || !closeButton) {
    throw new Error(`Controls dialog "${dialog.id}" is missing its trigger or close button.`);
  }

  trigger.addEventListener("click", () => {
    if (!dialog.open) dialog.showModal();
  });

  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => trigger.focus());
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    dialog.close();
  });
  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape" && dialog.open) {
        event.preventDefault();
        dialog.close();
      }
    },
    true
  );
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});
