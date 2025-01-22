import { createApi } from "@reduxjs/toolkit/query/react";

import { BASE_API_URL } from "@constants/constants";

/* 
import { EUniversitiesTags } from "./shared/api"; */
import { customFetchBaseQuery } from "./utils";

export const API_REDUCER_KEY = "api";

/* export const tagTypes = [...Object.values(EUniversitiesTags)]; */

export const api = createApi({
  /* tagTypes, */
  reducerPath: API_REDUCER_KEY,
  baseQuery: customFetchBaseQuery({
    baseUrl: BASE_API_URL,
    /*  prepareHeaders: (headers: any) => {
      // TO DO - add headers like session tokens and change any type
      return headers;
    }, */
  }),
  endpoints: () => ({}), // TODO - revisit later
});

export const { util } = api;
