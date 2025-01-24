import { GetEndpointSchemaType } from "@api/utils/endpointSchemaTypes";

import { getLoggedUserData } from "./usersEndpoints";

/**
	GetPersonalTasksEndpointType, GetPersonalTasksResBody
	@return EndpointType, ResponseBodyType
**/
export type GetLoggedUserDataEndpointType = GetEndpointSchemaType<
  typeof getLoggedUserData
>;

export type GetLoggedUserDataResBody =
  GetLoggedUserDataEndpointType["responseSchema"];

/**/

// /**
// 	GetCountriesEndpointType, GetCountriesResBody
// 	@return EndpointType, ResponseBodyType
// **/
// export type GetCountriesEndpointType = GetEndpointSchemaType<
//   typeof getCountries
// >;

// export type GetCountriesResBody = GetCountriesEndpointType["responseSchema"];
// /**/
