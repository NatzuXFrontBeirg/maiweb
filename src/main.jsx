import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AppStateProvider } from "./hooks/useAppState.jsx";
import { ToastProvider } from "./hooks/useToast.jsx";
import "../styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppStateProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </AppStateProvider>
  </StrictMode>
);
