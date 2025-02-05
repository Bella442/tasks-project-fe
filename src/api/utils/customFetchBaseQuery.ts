/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";

import { z } from "zod";

import { AuthEndpointURLs } from "@api/auth/authEndpoints";

type SchemaProps = {
  responseSchema: z.Schema;
  extraParams?: { [key: string]: any };
};
/**
 * Wrapper around rtk query fetchBaseQuery that validates response schema
 */

type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

let globalAbortController = new AbortController();

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

    // Ensure args includes the abort signal
    const requestArgs = {
      ...(typeof args === "string" ? { url: args } : args),
      signal: globalAbortController.signal, // Attach signal to every request
    };

    let baseResult = await fetchBaseQuery({
      ...baseFetchOptions,
      ...extraOptions,
      baseUrl:
        isArgsNotString && args?.extraParams?.isExternalUrl
          ? args?.extraParams?.externalApiUrl
          : baseFetchOptions.baseUrl,
    })(requestArgs, api, extraOptions);

    const refreshToken = localStorage.getItem("refreshToken");

    // If unauthorized, try refreshing token
    if (baseResult.error && baseResult.error.status === 401) {
      // Cancel all ongoing requests
      globalAbortController.abort();

      // Reset global abort controller for future requests
      globalAbortController = new AbortController();

      const refreshResult = await fetchBaseQuery({
        baseUrl: baseFetchOptions.baseUrl,
      })(
        {
          url: AuthEndpointURLs.REFRESH,
          method: "POST",
          body: { refreshToken },
          signal: globalAbortController.signal, // Attach signal to refresh request
        },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        const data = refreshResult.data as RefreshResponse;
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        // Store new tokens
        setTokens(newAccessToken, newRefreshToken);

        // Retry original request with new token
        baseResult = await fetchBaseQuery()(args, api, extraOptions);
      }
    }

    return baseResult;
  };
}

const setTokens = (newAccessToken: string, newRefreshToken?: string) => {
  localStorage.setItem("accessToken", newAccessToken);
  if (newRefreshToken) {
    localStorage.setItem("refreshToken", newRefreshToken);
  }
};
