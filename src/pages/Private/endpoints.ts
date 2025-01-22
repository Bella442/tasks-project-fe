import { createEndpoint } from "@api/utils";

import { HttpMethods } from "@constants/constants";

import { notificationsResponseSchema } from "./apiValidations";

export enum EndpointURLs {
  GET_NOTIFICATIONS = "/notifications",
}

export const getNotifications = createEndpoint({
  method: HttpMethods.GET,
  responseSchema: notificationsResponseSchema,
  fn: () => ({
    url: EndpointURLs.GET_NOTIFICATIONS,
  }),
});
