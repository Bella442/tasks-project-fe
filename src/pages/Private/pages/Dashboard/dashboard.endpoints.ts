import { createEndpoint } from "@api/utils";
import { HttpMethods } from "@constants/constants";

import { chartResponseSchema } from "./dashboard.apiValidations";

export enum EndpointURLs {
  GET_CHAR_DATA = "/dashboard",
}

export const getChartData = createEndpoint({
  method: HttpMethods.GET,
  responseSchema: chartResponseSchema,
  url: EndpointURLs.GET_CHAR_DATA,
});
