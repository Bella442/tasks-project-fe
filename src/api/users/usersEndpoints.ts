import { createEndpoint } from "@api/utils";
import { HttpMethods } from "@constants/constants";

import { chatUserResponseSchema, userSchema } from "./apiValidations";

export enum UsersEndpointURLs {
  GET_LOGGED_USER_DATA = "users/loggedUser",
  GET_CHAT_USERS = "users/chatUsers",
}

export const getLoggedUserData = createEndpoint({
  method: HttpMethods.GET,
  responseSchema: userSchema,
  fn: () => ({
    url: UsersEndpointURLs.GET_LOGGED_USER_DATA,
  }),
});

export const getChatUsers = createEndpoint({
  method: HttpMethods.GET,
  responseSchema: chatUserResponseSchema,
  fn: () => ({
    url: UsersEndpointURLs.GET_CHAT_USERS,
  }),
});
