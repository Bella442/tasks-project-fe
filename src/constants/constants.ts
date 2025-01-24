import { ToastOptions } from "react-toastify";

import { IconNames } from "@components/Icon/Icon";

import { ROUTES } from "../routes/routes";

export const AUTHENTICATED: string = "Authenticated";

export const HEADER_HEIGHT = "64px";

export const ENABLE_MOCKING: string = "enableMocking";

export const REQUIRED_MESSAGE = "This field is required";

export const ASCENDING_ORDER = "asc";

export const DESCENDING_ORDER = "desc";

export const MIN_PASSWORD_LENGTH = 8;

export const MIN_PASSWORD_LENGTH_MESSAGE = `The minimum length is ${MIN_PASSWORD_LENGTH}`;

export const WRONG_EMAIL_FORMAT_MESSAGE = "Wrong email format";

export const NO_RECORDS_TO_DISPLAY = "No records to display";

export const COMPONENT_NOT_FOUND = "Component not found";

export const BASE_API_URL = import.meta.env.VITE_API_URL;

export enum HttpMethods {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export const SIDE_BAR_LINKS = [
  { text: "SIDE_BAR.HOME", to: ROUTES.HOME },
  { text: "SIDE_BAR.HOTELS", to: ROUTES.HOTELS },
  { text: "SIDE_BAR.FIRST_TABLE", to: ROUTES.FIRST_TABLE_PAGE },
  { text: "SIDE_BAR.SECOND_TABLE", to: ROUTES.SECOND_TABLE_PAGE },
  { text: "Chat", to: ROUTES.CHAT },
  { text: "SIDE_BAR.DASHBOARD", to: ROUTES.DASHBOARD_PAGE },
];

export const usedTechnologies = [
  {
    actionText: "USED_TECHNOLOGIES.ACTION_TEXTS.WRITTEN_IN",
    name: "USED_TECHNOLOGIES.NAMES.REACT",
    url: "https://react.dev/reference/react",
    icon: IconNames.React,
  },
  {
    actionText: "USED_TECHNOLOGIES.ACTION_TEXTS.BUILT_ON",
    name: "USED_TECHNOLOGIES.NAMES.VITE",
    url: "https://vitejs.dev/guide/",
    icon: IconNames.Vite,
  },
  {
    actionText: "USED_TECHNOLOGIES.ACTION_TEXTS.STYLED_WITH",
    name: "USED_TECHNOLOGIES.NAMES.MATERIAL_UI",
    url: "https://mui.com/material-ui/all-components/",
    icon: IconNames.MaterialUI,
  },
  {
    actionText: "USED_TECHNOLOGIES.ACTION_TEXTS.ROUTING_BY",
    name: "USED_TECHNOLOGIES.NAMES.REACT_ROUTER_DOM",
    url: "https://reactrouter.com/en/main/start/overview",
    icon: IconNames.ReactRouterDOM,
  },
  {
    actionText: "USED_TECHNOLOGIES.ACTION_TEXTS.TESTED_ON",
    name: "USED_TECHNOLOGIES.NAMES.VITEST",
    url: "https://vitest.dev/",
    icon: IconNames.Vitest,
  },
  {
    actionText:
      "USED_TECHNOLOGIES.ACTION_TEXTS.FETCHING_API_AND_GLOBAL_STATE_MANAGEMENT",
    name: "USED_TECHNOLOGIES.NAMES.REDUX_TOOLKIT",
    url: "https://redux-toolkit.js.org/",
    icon: IconNames.ReduxToolkit,
  },
];

export const TOAST_SETTINGS: ToastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnFocusLoss: false,
  draggable: true,
  pauseOnHover: true,
  theme: "light",
};
