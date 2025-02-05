import { useCallback } from "react";

export const useAuth = () => {
  const onLogout = useCallback(async () => {
    localStorage.clear();
  }, []);

  return { onLogout };
};
