import { isStringVariableTrue } from "@utils/utils";

import GoogleTagManager from "./GoogleTagManager";

const AppIntegrations = () => {
  return (
    isStringVariableTrue(import.meta.env.VITE_ENABLE_GTM) && (
      <GoogleTagManager />
    )
  );
};

export default AppIntegrations;
