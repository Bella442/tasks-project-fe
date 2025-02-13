import { api } from "@api/api";

import { GetChatUsersResBody, GetLoggedUserDataResBody } from "./types";
import { getChatUsers, getLoggedUserData } from "./usersEndpoints";

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLoggedUserData: builder.query<GetLoggedUserDataResBody, void>({
      query: getLoggedUserData,
    }),
    getChatUsers: builder.query<GetChatUsersResBody, void>({
      query: getChatUsers,
    }),
  }),
  overrideExisting: false,
});

export const { useGetLoggedUserDataQuery, useGetChatUsersQuery } = usersApi;
