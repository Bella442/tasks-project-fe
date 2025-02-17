import { GetEndpointSchemaType } from "@api/utils/endpointSchemaTypes";

import {
  createChatRoom,
  getChatHistory,
  getUserChatList,
} from "./chatEndpoints";

/**
	GetUserChatListEndpointType, GetUserChatListResBody
	@return EndpointType, ResponseBodyType
**/
export type GetUserChatListEndpointType = GetEndpointSchemaType<
  typeof getUserChatList
>;

export type GetUserChatListResBody =
  GetUserChatListEndpointType["responseSchema"];

/**/

/**
	GeChatHistoryEndpointType, GetChatHistoryResBody
	@return EndpointType, ResponseBodyType
**/
export type GetChatHistoryEndpointType = GetEndpointSchemaType<
  typeof getChatHistory
>;

export type GetChatHistoryResBody =
  GetChatHistoryEndpointType["responseSchema"];
export type GetChatHistoryReqBody = GetChatHistoryEndpointType["requestSchema"];

/**/

/**
	CreateChatRoomEndpointType, CreateChatRoomResBody
	@return EndpointType, ResponseBodyType
**/
export type CreateChatRoomEndpointType = GetEndpointSchemaType<
  typeof createChatRoom
>;

export type CreateChatRoomResBody =
  CreateChatRoomEndpointType["responseSchema"];
export type CreateChatRoomReqBody = CreateChatRoomEndpointType["requestSchema"];
/**/
