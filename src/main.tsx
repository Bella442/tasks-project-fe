import React from "react";

import { Provider } from "react-redux";

import { GoogleOAuthProvider } from "@react-oauth/google";

import { TolgeeProvider } from "@tolgee/react";

import ReactDOM from "react-dom/client";

import App from "@/App";

import { ENABLE_MOCKING } from "@constants/constants";
import { initI18n, tolgee } from "@i18n/i18n";
import { enableMocking } from "@mocks/browser";
import Maintenance from "@pages/Public/pages/Maintenance/Maintenance";
import { store } from "@store/store.ts";
import { getLocalStorageItemBoolean, isUnderMaintenance } from "@utils/utils";

import "@/index.css";

initI18n();

const startMocking = async () => {
  if (!getLocalStorageItemBoolean(ENABLE_MOCKING)) {
    return;
  }

  return enableMocking();
};

startMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}
      >
        <Provider store={store}>
          {isUnderMaintenance() ? (
            <Maintenance />
          ) : (
            <TolgeeProvider tolgee={tolgee}>
              <App />
            </TolgeeProvider>
          )}
        </Provider>
      </GoogleOAuthProvider>
    </React.StrictMode>,
  );
});
