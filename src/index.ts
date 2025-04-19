import "water.css/out/light.min.css";
import "./styles.css";
import "./writeValueLogging";
import { handleButtonClick } from "./bluetooth";
import { registerServiceWorker, resizeWindow, setupInstallButton } from "./pwaHelper";
import * as Sentry from "@sentry/browser";
import { isCsdn } from "./utils";

Sentry.init({
  dsn: "https://17d03841e2244d53abdbe587434efd5c@glitchtip.celeswuff.science/1",
});

(document.getElementById("version") as HTMLSpanElement).innerText = " · v" + VERSION;

if (!navigator.bluetooth) {
  (document.querySelector(".supported") as HTMLElement).style.display = "none";
  (document.querySelector(".unsupported") as HTMLElement).style.display = "block";
}

if (isCsdn()) {
  (document.querySelector(".supported") as HTMLElement).style.display = "none";
  (document.querySelector(".unsupported") as HTMLElement).style.display = "none";
  (document.querySelector(".csdn-warning") as HTMLElement).style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  const mainButton = document.getElementById("main-button") as HTMLButtonElement;
  mainButton.addEventListener("click", handleButtonClick);
});

// PWA
registerServiceWorker();
setupInstallButton();
resizeWindow();
