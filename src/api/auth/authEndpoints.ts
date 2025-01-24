import { createEndpoint } from "@api/utils";
import { HttpMethods } from "@constants/constants";

import { loginRequestSchema, loginResponseSchema } from "./apiValidations";

export enum TasksEndpointURLs {
  LOGIN = "/login",
}

export const login = createEndpoint({
  method: HttpMethods.POST,
  responseSchema: loginResponseSchema,
  requestSchema: loginRequestSchema,
  fn: (credentials) => ({
    url: TasksEndpointURLs.LOGIN,
    body: credentials,
  }),
});

// export const getCountries = createEndpoint({
//   method: HttpMethods.GET,
//   responseSchema: countriesResponseSchema,
//   fn: () => ({
//     url: TasksEndpointURLs.GET_COUNTRIES,
//     extraParams: {
//       isExternalUrl: true,
//       externalApiUrl: import.meta.env.VITE_COUNTRIES_API,
//     },
//   }),
// });
