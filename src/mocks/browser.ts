import { setupWorker } from "msw/browser";

import { sharedHandlers } from "@api/shared/mocks/handlers";

import { pagesHandlers } from "@pages/Private/mocks/handlers";
import { dashboardHandlers } from "@pages/Private/pages/Dashboard/mockup/dashboard.handlers";
import { hotelsHandlers } from "@pages/Private/pages/Hotels/mockup/hotels.handlers";

import { handlers } from "./handlers";

const handlersArray = [
  ...handlers,
  ...sharedHandlers,
  ...dashboardHandlers,
  ...hotelsHandlers,
  ...pagesHandlers,
];

export const worker = setupWorker(...handlersArray);

export const enableMocking = async () => {
  return await worker.start();
};

export const disableMocking = () => {
  return worker.stop();
};
