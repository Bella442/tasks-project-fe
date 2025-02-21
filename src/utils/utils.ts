import { AUTHENTICATED, BASE_API_URL } from "@constants/constants";

export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem(AUTHENTICATED);
};

export const isStringVariableTrue = (stringVariable: string): boolean => {
  return stringVariable === "true";
};

export const isUnderMaintenance = () => {
  return isStringVariableTrue(import.meta.env.VITE_MAINTENANCE);
};

export const getLocalStorageItemBoolean = (item: string) => {
  return isStringVariableTrue(localStorage.getItem(item) ?? "");
};

export const transformUrl = (
  url: string,
  options: Record<string, string | number>,
) =>
  Object.keys(options).reduce((acc, key) => {
    const optionKey = options[key];

    if (!optionKey) {
      return acc;
    } else {
      return acc.replace(`:${key}`, optionKey.toString());
    }
  }, url);

export const makeUrl = (path: string, externalUrl?: string): string => {
  if (path.split("://").length === 2) {
    return path;
  }

  const url = externalUrl ?? BASE_API_URL;

  return url + (path.startsWith("/") ? path : "/" + path);
};

export const getTimeString = (date: Date): string => {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
};
