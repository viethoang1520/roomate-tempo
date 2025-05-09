import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

// Import i18n configuration
import "./i18n";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>,
);
