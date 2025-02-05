import { api } from "@api/api";

import { login } from "./authEndpoints";
import { LoginReqBody, LoginResBody } from "./types";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResBody, LoginReqBody>({
      query: login,
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = authApi;
