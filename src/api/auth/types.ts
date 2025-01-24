import { GetEndpointSchemaType } from "@api/utils/endpointSchemaTypes";

import { login } from "./authEndpoints";

/**
	LoginEndpointType, LoginReqBody, LoginResBody
	@return EndpointType, RequestBodyType, ResponseBodyType
**/
export type LoginEndpointType = GetEndpointSchemaType<typeof login>;

export type LoginResBody = LoginEndpointType["responseSchema"];
export type LoginReqBody = LoginEndpointType["requestSchema"];

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
