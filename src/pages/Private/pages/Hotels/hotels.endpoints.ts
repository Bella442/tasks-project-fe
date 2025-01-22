import { createEndpoint } from "@api/utils";
import { HttpMethods } from "@constants/constants";

import { hotelsResponseSchema } from "./hotels.apiValidations";

export enum EndpointURLs {
  GET_HOTELS_DATA = "/hotels",
}

export const getHotelsData = createEndpoint({
  method: HttpMethods.GET,
  responseSchema: hotelsResponseSchema,
  url: EndpointURLs.GET_HOTELS_DATA,
});
