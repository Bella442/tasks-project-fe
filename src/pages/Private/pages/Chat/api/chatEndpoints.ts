import { createEndpoint } from "@api/utils";
import { HttpMethods } from "@constants/constants";
import { transformUrl } from "@utils/utils";

import {
  chatHistoryRequestSchema,
  chatHistoryResponseSchema,
  chatRequestSchema,
  chatResponseSchema,
} from "./apiValidations";

export enum ChatEndpointURLs {
  CREATE_CHAT_ROOM = "chat",
  GET_USER_CHAT_LIST = "chat/userChatList",
  GET_CHAT_HISTORY = "chat/chatRoomHistory",
}

export const getUserChatList = createEndpoint({
  method: HttpMethods.GET,
  responseSchema: chatResponseSchema,
  fn: () => ({
    url: ChatEndpointURLs.GET_USER_CHAT_LIST,
  }),
});

export const getChatHistory = createEndpoint({
  method: HttpMethods.GET,
  requestSchema: chatHistoryRequestSchema,
  responseSchema: chatHistoryResponseSchema,
  fn: ({ roomId }) => ({
    url: transformUrl(ChatEndpointURLs.GET_CHAT_HISTORY, {
      roomId,
    }),
  }),
});

export const createChatRoom = createEndpoint({
  method: HttpMethods.POST,
  requestSchema: chatRequestSchema,
  responseSchema: chatResponseSchema,
  fn: ({ roomId, initiatorId, participantId }) => ({
    url: ChatEndpointURLs.CREATE_CHAT_ROOM,
    body: { roomId, initiatorId, participantId },
  }),
});
