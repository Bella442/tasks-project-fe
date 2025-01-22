import { api } from "@api/api";

import { getHotelsData } from "./hotels.endpoints";

import { GetHotelsDataResBody } from "./hotels.types";

export const hotelsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHotelsData: builder.query<GetHotelsDataResBody, void>({
      query: getHotelsData,
    }),
  }),
});

export const { useGetHotelsDataQuery } = hotelsApi;
