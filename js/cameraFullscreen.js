const cameraStage = document.querySelector("#camera-stage");
const fullscreenButton = cameraStage?.querySelector(".camera-stage__fullscreen");
const fullscreenStatus = cameraStage?.querySelector(".camera-stage__status");

if (cameraStage && fullscreenButton && fullscreenStatus) {
  const updateFullscreenButton = () => {
    const isFullscreen = document.fullscreenElement === cameraStage;
    fullscreenButton.textContent = isFullscreen ? "Exit full screen" : "Full screen";
    fullscreenButton.setAttribute("aria-pressed", String(isFullscreen));
  };

  fullscreenButton.addEventListener("click", async () => {
    try {
      if (document.fullscreenElement === cameraStage) {
        await document.exitFullscreen();
      } else {
        await cameraStage.requestFullscreen();
      }
      fullscreenStatus.textContent = "";
    } catch (error) {
      fullscreenStatus.textContent = "Full screen is unavailable in this browser or context.";
      console.error("Unable to change camera fullscreen mode.", error);
    }
  });

  document.addEventListener("fullscreenchange", updateFullscreenButton);
}
