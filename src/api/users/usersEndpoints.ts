import { createEndpoint } from "@api/utils";
import { HttpMethods } from "@constants/constants";

import { userSchema } from "./apiValidations";

export enum UsersEndpointURLs {
  GET_LOGGED_USER_DATA = "users/loggedUser",
}

export const getLoggedUserData = createEndpoint({
  method: HttpMethods.GET,
  responseSchema: userSchema,
  fn: () => ({
    url: UsersEndpointURLs.GET_LOGGED_USER_DATA,
  }),
});
