import { createApi } from "@reduxjs/toolkit/query/react";

import { BASE_API_URL } from "@constants/constants";

import { customFetchBaseQuery } from "./utils";

export const API_REDUCER_KEY = "api";

export const api = createApi({
  reducerPath: API_REDUCER_KEY,
  baseQuery: customFetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");

      headers.set("Authorization", token ? `Bearer ${token}` : "");

      return headers;
    },
  }),
  endpoints: () => ({}),
});

export const { util } = api;
