import App from "./App.svelte";
import { initialize } from "./analytics";

const app = new App({
  target: document.body,
});

initialize(window, null, { serviceUrl: window.location.origin + "/track" });

export default app;
