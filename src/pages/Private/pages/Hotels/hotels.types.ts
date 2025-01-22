import { z } from "zod";

import { GetEndpointSchemaType } from "@api/utils/endpointSchemaTypes";

import { hotelsSchema } from "./hotels.apiValidations";
import { getHotelsData } from "./hotels.endpoints";

export type GetHotelsDataEndpointType = GetEndpointSchemaType<
  typeof getHotelsData
>;
export type GetHotelsDataResBody = GetHotelsDataEndpointType["responseSchema"];

export type THotelData = z.infer<typeof hotelsSchema>;
