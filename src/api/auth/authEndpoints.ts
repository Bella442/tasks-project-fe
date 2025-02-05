import { createEndpoint } from "@api/utils";
import { HttpMethods } from "@constants/constants";

import { loginRequestSchema, loginResponseSchema } from "./apiValidations";

export enum AuthEndpointURLs {
  LOGIN = "/login",
  REFRESH = "/refresh",
}

export const login = createEndpoint({
  method: HttpMethods.POST,
  responseSchema: loginResponseSchema,
  requestSchema: loginRequestSchema,
  fn: (credentials) => ({
    url: AuthEndpointURLs.LOGIN,
    body: credentials,
  }),
});
