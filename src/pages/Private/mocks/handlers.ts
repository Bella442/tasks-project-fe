import { HttpResponse, http } from "msw";

import { makeUrl } from "@utils/utils";

import { getNotificationsResponse } from "./mockedResponses";
import { EndpointURLs } from "../endpoints";

export const pagesHandlers = [
  http.get(makeUrl(EndpointURLs.GET_NOTIFICATIONS), () => {
    return HttpResponse.json(getNotificationsResponse, {
      status: 200,
    });
  }),
];
