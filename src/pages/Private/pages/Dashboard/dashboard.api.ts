import { api } from "@api/api";

import { getChartData } from "./dashboard.endpoints";

import { GetChartDataResBody } from "./dashboard.types";

export const sharedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCharData: builder.query<GetChartDataResBody, void>({
      query: getChartData,
    }),
  }),
});

export const { useGetCharDataQuery } = sharedApi;
