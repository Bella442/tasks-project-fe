import { http, HttpResponse } from "msw";

import { makeUrl } from "@utils/utils";

import { getChartData } from "./dashboard.mockedResponses";
import { EndpointURLs } from "../dashboard.endpoints";

export const dashboardHandlers = [
  http.get(makeUrl(EndpointURLs.GET_CHAR_DATA), () => {
    return HttpResponse.json(getChartData, {
      status: 200,
    });
  }),
];
