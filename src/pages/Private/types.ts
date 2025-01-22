import { GetEndpointSchemaType } from "@api/utils/endpointSchemaTypes";

import { getNotifications } from "./endpoints";

/**
	GetNotificationsEndpointType, GetNotificationsResBody
	@return EndpointType, ResponseBodyType
**/
export type GetNotificationsEndpointType = GetEndpointSchemaType<
  typeof getNotifications
>;

export type GetNotificationsResBody =
  GetNotificationsEndpointType["responseSchema"];
/**/
