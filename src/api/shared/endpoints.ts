import { createEndpoint } from "@api/utils";

import { HttpMethods } from "@constants/constants";
import { transformUrl } from "@utils/utils";

import {
  countriesResponseSchema,
  universitiesRequestSchema,
  universitiesResponseSchema,
} from "./apiValidations";

export enum EndpointURLs {
  GET_UNIVERSITY_BY_COUNTRY = "/search",
  GET_COUNTRIES = "/countries/flag/images",
}

export const getUniversityDataByCountry = createEndpoint({
  method: HttpMethods.GET,
  responseSchema: universitiesResponseSchema,
  requestSchema: universitiesRequestSchema,
  fn: ({ country }) => ({
    url: transformUrl(EndpointURLs.GET_UNIVERSITY_BY_COUNTRY, {
      country,
    }),
    extraParams: {
      isExternalUrl: true,
      externalApiUrl: import.meta.env.VITE_UNIVERSITIES_API,
    },
  }),
});

export const getCountries = createEndpoint({
  method: HttpMethods.GET,
  responseSchema: countriesResponseSchema,
  fn: () => ({
    url: EndpointURLs.GET_COUNTRIES,
    extraParams: {
      isExternalUrl: true,
      externalApiUrl: import.meta.env.VITE_COUNTRIES_API,
    },
  }),
});
