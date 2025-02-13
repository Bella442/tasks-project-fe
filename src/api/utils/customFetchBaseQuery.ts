/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";

import { z } from "zod";

import { AuthEndpointURLs } from "@api/auth/authEndpoints";
import { ROUTES } from "@routes/routes";
import { NEED_TO_BE_ANY } from "@sharedTypes/globalTypes";

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

let refreshResult: NEED_TO_BE_ANY;
const mutex = new Mutex();

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

    await mutex.waitForUnlock();
    let baseResult = await fetchBaseQuery({
      ...baseFetchOptions,
      ...extraOptions,
      baseUrl:
        isArgsNotString && args?.extraParams?.isExternalUrl
          ? args?.extraParams?.externalApiUrl
          : baseFetchOptions.baseUrl,
    })(args, api, extraOptions);

    // If unauthorized, try refreshing token
    if (baseResult.error && baseResult.error.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!mutex.isLocked()) {
        const release = await mutex.acquire();

        try {
          refreshResult = await fetchBaseQuery({
            baseUrl: baseFetchOptions.baseUrl,
          })(
            {
              url: AuthEndpointURLs.REFRESH,
              method: "POST",
              body: { refreshToken },
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

            // retry the initial query
            baseResult = await fetchBaseQuery({
              ...baseFetchOptions,
            })(args, api, extraOptions);
          } else {
            localStorage.clear();
            window.location.replace(ROUTES.LOGIN);
          }
        } finally {
          // release must be called once the mutex should be released again.
          release();
        }
      } else {
        // wait until the mutex is available without locking it
        await mutex.waitForUnlock();
        baseResult = await fetchBaseQuery({
          ...baseFetchOptions,
        })(args, api, extraOptions);
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
