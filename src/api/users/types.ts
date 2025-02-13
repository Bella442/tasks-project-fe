import { GetEndpointSchemaType } from "@api/utils/endpointSchemaTypes";

import { getLoggedUserData, getChatUsers } from "./usersEndpoints";

/**
	GetLoggedUserDataEndpointType, GetLoggedUserDataResBody
	@return EndpointType, ResponseBodyType
**/
export type GetLoggedUserDataEndpointType = GetEndpointSchemaType<
  typeof getLoggedUserData
>;

export type GetLoggedUserDataResBody =
  GetLoggedUserDataEndpointType["responseSchema"];

/**/

/**
	GetChatUsersEndpointType, GetChatUsersResBody
	@return EndpointType, ResponseBodyType
**/
export type GetChatUsersEndpointType = GetEndpointSchemaType<
  typeof getChatUsers
>;

export type GetChatUsersResBody = GetChatUsersEndpointType["responseSchema"];
/**/
