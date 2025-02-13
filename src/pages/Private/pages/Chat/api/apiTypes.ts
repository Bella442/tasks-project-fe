import { GetEndpointSchemaType } from "@api/utils/endpointSchemaTypes";

import { createChatRoom, getUserChatList } from "./chatEndpoints";

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
	CreateChatRoomEndpointType, CreateChatRoomResBody
	@return EndpointType, ResponseBodyType
**/
export type CreateChatRoomEndpointType = GetEndpointSchemaType<
  typeof createChatRoom
>;

export type CreateChatRoomResBody =
  CreateChatRoomEndpointType["responseSchema"];
export type CreateChatRoomReqBody = CreateChatRoomEndpointType["requestSchema"];
// /**/
