import { GetEndpointSchemaType } from "@api/utils/endpointSchemaTypes";

import { getPersonalTasks } from "./tasksEndpoints";

/**
	GetPersonalTasksEndpointType, GetPersonalTasksResBody
	@return EndpointType, ResponseBodyType
**/
export type GetPersonalTasksEndpointType = GetEndpointSchemaType<
  typeof getPersonalTasks
>;

export type GetPersonalTasksResBody =
  GetPersonalTasksEndpointType["responseSchema"];

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
