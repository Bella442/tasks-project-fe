import { GetEndpointSchemaType } from "@api/utils/endpointSchemaTypes";

import { getChartData } from "./dashboard.endpoints";

export type GetChartDataEndpointType = GetEndpointSchemaType<
  typeof getChartData
>;
export type GetChartDataResBody = GetChartDataEndpointType["responseSchema"];
