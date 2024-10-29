import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.ts";

import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "https://d24ca079f03e4e7098c341e9eb68a425@o447951.ingest.us.sentry.io/4505001491365888",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      blockAllMedia: false,
    }),
  ],
  enabled: true,
  debug: true,
  environment: "desktop",
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost"],
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1,
});

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
    <button id="error" onclick="throwError()">Throw error</button>
    <button id="dlg">show report dialog</button>
  </div>
`;

document
  .querySelector<HTMLButtonElement>("#dlg")!
  .addEventListener("click", () => {
    Sentry.showReportDialog({
      eventId: Sentry.captureMessage("test"),
    });
  });

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
