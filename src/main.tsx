import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

/**
 * Patch removeChild / insertBefore to prevent "The node to be removed is not
 * a child of this node" crashes.
 *
 * Root cause: third-party scripts (GA, Clarity, browser extensions) or
 * react-helmet-async modify DOM nodes outside React's knowledge.  When React
 * later tries to reconcile its virtual DOM with the real DOM, it calls
 * removeChild on a node that has already been moved.  This is a well-known
 * React issue — the patch below turns the hard crash into a silent no-op.
 */
if (typeof Node !== 'undefined') {
  const origRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(child: T): T {
    if (child.parentNode !== this) {
      // Node was already moved/removed by external code — skip silently
      return child;
    }
    return origRemoveChild.call(this, child) as T;
  };

  const origInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(newNode: T, refNode: Node | null): T {
    if (refNode && refNode.parentNode !== this) {
      // Reference node was moved — append instead
      return origInsertBefore.call(this, newNode, null) as T;
    }
    return origInsertBefore.call(this, newNode, refNode) as T;
  };
}

// Clear #root before React mounts (remove any leftover DOM nodes)
const rootEl = document.getElementById("root")!;
rootEl.innerHTML = '';

createRoot(rootEl).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// Hide the loading screen once React has mounted
const loadingScreen = document.getElementById('loading-screen');
if (loadingScreen) {
  loadingScreen.classList.add('hidden');
  setTimeout(() => loadingScreen.remove(), 400);
}
