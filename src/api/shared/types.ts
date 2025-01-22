import { GetEndpointSchemaType } from "@api/utils/endpointSchemaTypes";

import { getCountries, getUniversityDataByCountry } from "./endpoints";

/**
	GetUniversityEndpointType, GetUniversityReqBody, GetUniversityResBody
	@return EndpointType,RequestBodyType, ResponseBodyType
**/
export type GetUniversityEndpointType = GetEndpointSchemaType<
  typeof getUniversityDataByCountry
>;

export type GetUniversityReqBody = GetUniversityEndpointType["requestSchema"];
export type GetUniversityResBody = GetUniversityEndpointType["responseSchema"];

/**/

/**
	GetCountriesEndpointType, GetCountriesResBody
	@return EndpointType, ResponseBodyType
**/
export type GetCountriesEndpointType = GetEndpointSchemaType<
  typeof getCountries
>;

export type GetCountriesResBody = GetCountriesEndpointType["responseSchema"];
/**/
