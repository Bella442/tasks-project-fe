import { api } from "@api/api";

import { getPersonalTasks } from "./tasksEndpoints";
import { GetPersonalTasksResBody } from "./types";

export const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPersonalTasks: builder.query<GetPersonalTasksResBody, void>({
      query: getPersonalTasks,
    }),
    // getPersonalTasks: builder.query<GetPersonalTasksResBody, void>({
    //   query: getPersonalTasks,
    //   transformResponse: (response: { data: GetPersonalTasksResBody }) => {
    //     return response.data;
    //   },
    // }),
    // openWebSocketConnection: builder.query<Array<string>, WebSocketQueryData>({
    //   queryFn() {
    //     return { data: [] };
    //   },
    //   async onCacheEntryAdded(
    //     arg,
    //     { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
    //   ) {
    //     try {
    //       // wait for the initial query to resolve before proceeding
    //       await cacheDataLoaded;
    //       // Initialize webSocket
    //       if (!ws || ws.readyState !== WebSocket.OPEN) {
    //         ws = new WebSocket(
    //           `wss://${arg.externalApiUrl ?? import.meta.env.VITE_API_URL}${arg.params}`,
    //         );

    //         // when data is received from the socket connection to the server,
    //         // update our query result with the received message

    //         ws.onmessage = (event) => {
    //           updateCachedData((draft) => {
    //             draft.pop();
    //             draft.push(event.data);
    //           });
    //         };

    //         ws.onerror = (error) => {
    //           console.error(error);
    //         };
    //       }
    //     } catch {
    //       // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
    //       // in which case `cacheDataLoaded` will throw
    //     }

    //     // cacheEntryRemoved will resolve when the cache subscription is no longer active
    //     await cacheEntryRemoved;
    //     // perform cleanup steps once the `cacheEntryRemoved` promise resolves
    //     if (ws) {
    //       ws.close();
    //       ws.onclose = (event) => {
    //         if (event.wasClean) {
    //           alert(`Connection closed cleanly, ${event.reason}`);
    //         } else {
    //           // e.g. server process killed or network down
    //           // event.code is usually 1006 in this case
    //           alert("Connection died");
    //         }
    //       };
    //     }
    //   },
    // }),
  }),
  overrideExisting: false,
});

export const { useGetPersonalTasksQuery } = tasksApi;
