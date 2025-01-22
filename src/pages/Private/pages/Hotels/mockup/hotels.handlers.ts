import { http, HttpResponse } from "msw";

import { makeUrl } from "@utils/utils";

import { getHotelsData } from "./hotels.mockedResponses";
import { EndpointURLs } from "../hotels.endpoints";

export const hotelsHandlers = [
  http.get(makeUrl(EndpointURLs.GET_HOTELS_DATA), () => {
    return HttpResponse.json(getHotelsData, {
      status: 200,
    });
  }),
];
