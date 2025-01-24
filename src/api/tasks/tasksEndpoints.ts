import { createEndpoint } from "@api/utils";

import { HttpMethods } from "@constants/constants";

import { tasksResponseSchema } from "./apiValidations";

export enum TasksEndpointURLs {
  GET_PERSONAL_TASKS = "tasks/user",
  GET_COUNTRIES = "/countries/flag/images",
}

export const getPersonalTasks = createEndpoint({
  method: HttpMethods.GET,
  responseSchema: tasksResponseSchema,
  fn: () => ({
    url: TasksEndpointURLs.GET_PERSONAL_TASKS,
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
