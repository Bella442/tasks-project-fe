import { createEndpoint } from "@api/utils";
import { HttpMethods } from "@constants/constants";

import { userSchema } from "./apiValidations";

export enum TasksEndpointURLs {
  GET_LOGGED_USER_DATA = "users/loggedUser",
}

export const getLoggedUserData = createEndpoint({
  method: HttpMethods.GET,
  responseSchema: userSchema,
  fn: () => ({
    url: TasksEndpointURLs.GET_LOGGED_USER_DATA,
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
