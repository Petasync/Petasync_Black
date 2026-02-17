import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Clear #root before React mounts (remove any leftover DOM nodes)
const rootEl = document.getElementById("root")!;
rootEl.innerHTML = '';

createRoot(rootEl).render(<App />);

// Hide the loading screen once React has mounted
const loadingScreen = document.getElementById('loading-screen');
if (loadingScreen) {
  loadingScreen.classList.add('hidden');
  setTimeout(() => loadingScreen.remove(), 400);
}
