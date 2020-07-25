import App from "./App.svelte";
import { initialize } from "./minimal-analytics";

const app = new App({
  target: document.body,
});

initialize(window, null, {
  serviceUrls: [
    window.location.origin + "/track",
    "https://www.google-analytics.com/collect",
  ],
});

export default app;
