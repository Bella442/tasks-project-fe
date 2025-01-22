import { initReactI18next } from "react-i18next";

import {
  BackendFetch,
  DevTools,
  I18nextPlugin,
  Tolgee,
  withTolgee,
} from "@tolgee/i18next";
import i18n from "i18next";
import ICU from "i18next-icu";

export const tolgee = Tolgee()
  .use(DevTools())
  .use(I18nextPlugin())
  .use(BackendFetch())
  .init({
    apiUrl: import.meta.env.VITE_APP_TOLGEE_API_URL,
    apiKey: import.meta.env.VITE_APP_TOLGEE_API_KEY,
    language: "en",
    defaultLanguage: "en",
    fallbackLanguage: "en",
  });

export const initI18n = () => {
  withTolgee(i18n, tolgee)
    .use(ICU)
    .use(initReactI18next)
    .init({
      defaultNS: "translation",
      backend: { loadPath: "./src/i18n/translation/en.json" },
      lng: "en",
      load: "currentOnly",
      fallbackLng: "en",
      supportedLngs: ["en"],
    });

  tolgee.on("language", (language: string) => {
    i18n.changeLanguage(language);
  });
};
