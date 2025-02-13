import { useCallback } from "react";

import { ROUTES } from "@routes/routes";

export const useAuth = () => {
  const onLogout = useCallback(async () => {
    localStorage.clear();
    window.location.replace(ROUTES.LOGIN);
  }, []);

  return { onLogout };
};
