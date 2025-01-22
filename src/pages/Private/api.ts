import { api } from "@api/api";

import { getNotifications } from "./endpoints";

import { GetNotificationsResBody } from "./types";

export const pagesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<GetNotificationsResBody, void>({
      query: getNotifications,
    }),
  }),
});

export const { useGetNotificationsQuery } = pagesApi;
