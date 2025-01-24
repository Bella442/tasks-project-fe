import { api } from "@api/api";

import { GetLoggedUserDataResBody } from "./types";
import { getLoggedUserData } from "./usersEndpoints";

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLoggedUserData: builder.query<GetLoggedUserDataResBody, void>({
      query: getLoggedUserData,
    }),
  }),
  overrideExisting: false,
});

export const { useGetLoggedUserDataQuery } = usersApi;
