import { useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import { ThemeProvider } from "@mui/material/styles";

import GlobalDialog from "@components/GlobalDialog/GlobalDialog";
import ChatwootWidget from "@components/LiveChat/ChatwootWidget";
import Scrollbar from "@components/Scrollbar/Scrollbar";
import SecretMenu from "@components/SecretMenu/SecretMenu";

import { ENABLE_MOCKING, TOAST_SETTINGS } from "@constants/constants";

import { GlobalDialogContextProvider } from "@contexts/globalDialogContext";

import AppIntegrations from "@integrations/AppIntegrations";

import { disableMocking, enableMocking } from "@mocks/browser";

import PrivateContainer from "@pages/Private/PrivateContainer";
import PublicContainer from "@pages/Public/PublicContainer";
import { ROUTES } from "@routes/routes";
import { theme } from "@theme/theme";

import { getLocalStorageItemBoolean, isStringVariableTrue } from "@utils/utils";

import "@/App.css";
import "react-toastify/dist/ReactToastify.min.css";

const App = () => {
  const [open, setOpen] = useState(false);
  const secretMenuEnabled = isStringVariableTrue(
    import.meta.env.VITE_SECRET_MENU_ENABLED,
  );

  // Logic for secret menu and mockup server

  useEffect(() => {
    window.addEventListener("storage", () => {
      if (localStorage.getItem(ENABLE_MOCKING) !== null) {
        changeMocking();
      }
    });

    return window.removeEventListener("storage", () => {});
  }, []);

  const changeMocking = async () => {
    if (getLocalStorageItemBoolean(ENABLE_MOCKING)) {
      return enableMocking();
    } else {
      return disableMocking();
    }
  };

  useEffect(() => {
    if (secretMenuEnabled) {
      document.addEventListener("keydown", (event) => {
        if (event.ctrlKey && event.code === "KeyM") {
          setOpen(true);
        }
      });

      return document.removeEventListener("keydown", () => {});
    }
  }, [setOpen, secretMenuEnabled]);

  return (
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <AppIntegrations />
        <ChatwootWidget />
        <ToastContainer {...TOAST_SETTINGS} />
        <BrowserRouter basename={ROUTES.BASE_ROUTE}>
          <GlobalDialogContextProvider>
            {secretMenuEnabled && <SecretMenu open={open} setOpen={setOpen} />}
            <GlobalDialog />
            <Scrollbar>
              <Routes>
                <Route element={<PrivateContainer />} path="/auth/*" />
                <Route element={<PublicContainer />} path="/*" />
              </Routes>
            </Scrollbar>
          </GlobalDialogContextProvider>
        </BrowserRouter>
      </HelmetProvider>
    </ThemeProvider>
  );
};

export default App;
