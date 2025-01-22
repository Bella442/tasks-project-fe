import { api } from "@api/api";

import { getCountries, getUniversityDataByCountry } from "./endpoints";

import {
  GetCountriesResBody,
  GetUniversityReqBody,
  GetUniversityResBody,
} from "./types";

export enum EUniversitiesTags {
  GET_UNIVERSITY = "GET_UNIVERSITY",
}

type WebSocketQueryData = {
  params: string;
  externalApiUrl?: string;
};

export let ws: WebSocket;

export const sharedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUniversityDataByCountry: builder.query<
      GetUniversityResBody,
      GetUniversityReqBody
    >({
      query: getUniversityDataByCountry,
      /*  providesTags: [EUniversitiesTags.GET_UNIVERSITY], */
    }),
    getCountries: builder.query<GetCountriesResBody, void>({
      query: getCountries,
      transformResponse: (response: { data: GetCountriesResBody }) => {
        return response.data;
      },
    }),
    openWebSocketConnection: builder.query<Array<string>, WebSocketQueryData>({
      queryFn() {
        return { data: [] };
      },
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          // Initialize webSocket
          if (!ws || ws.readyState !== WebSocket.OPEN) {
            ws = new WebSocket(
              `wss://${arg.externalApiUrl ?? import.meta.env.VITE_API_URL}${arg.params}`,
            );

            // when data is received from the socket connection to the server,
            // update our query result with the received message

            ws.onmessage = (event) => {
              updateCachedData((draft) => {
                draft.pop();
                draft.push(event.data);
              });
            };

            ws.onerror = (error) => {
              console.error(error);
            };
          }
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }

        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        if (ws) {
          ws.close();
          ws.onclose = (event) => {
            if (event.wasClean) {
              alert(`Connection closed cleanly, ${event.reason}`);
            } else {
              // e.g. server process killed or network down
              // event.code is usually 1006 in this case
              alert("Connection died");
            }
          };
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUniversityDataByCountryQuery,
  useGetCountriesQuery,
  useOpenWebSocketConnectionQuery,
} = sharedApi;
