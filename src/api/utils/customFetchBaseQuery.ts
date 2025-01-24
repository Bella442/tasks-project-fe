/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";

import { z } from "zod";

type SchemaProps = {
  responseSchema: z.Schema;
  extraParams?: { [key: string]: any };
};
/**
 * Wrapper around rtk query fetchBaseQuery that validates response schema
 */

export default function customFetchBaseQuery(
  baseFetchOptions = {
    baseUrl: "",
    prepareHeaders: (headers: Headers) => {
      return headers;
    },
  },
): BaseQueryFn<
  string | (FetchArgs & SchemaProps),
  unknown,
  FetchBaseQueryError,
  {}
> {
  return async (args, api, extraOptions) => {
    const isArgsNotString = typeof args !== "string";

    const baseResult = await fetchBaseQuery({
      ...baseFetchOptions,
      ...extraOptions,
      baseUrl:
        isArgsNotString && args?.extraParams?.isExternalUrl
          ? args?.extraParams?.externalApiUrl
          : baseFetchOptions.baseUrl,
    })(args, api, extraOptions);

    // TODO add validations schema checking for the response

    return baseResult;
  };
}
