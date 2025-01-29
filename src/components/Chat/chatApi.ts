import { io, Socket } from "socket.io-client";

import { api } from "@api/api";

import { Message } from "./types";

let socket: Socket | null = null;

// Maintain a map of rooms for multiple connections
const roomListeners: Record<string, boolean> = {};

export const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    joinRoom: builder.mutation<void, string>({
      queryFn: (roomId) => {
        if (!socket) {
          socket = io("http://localhost:3000");
        }

        if (!roomListeners[roomId]) {
          socket.emit("joinRoom", roomId);
          roomListeners[roomId] = true;
        }

        return { data: undefined };
      },
    }),
    leaveRoom: builder.mutation<void, string>({
      queryFn: (roomId) => {
        if (socket) {
          socket.emit("leaveRoom", roomId);
          delete roomListeners[roomId];
        }

        return { data: undefined };
      },
    }),
    sendMessage: builder.mutation<void, { roomId: string; message: Message }>({
      queryFn: ({ roomId, message }) => {
        if (socket) {
          socket.emit("message", { roomId, message });
        }

        return { data: undefined };
      },
    }),
    receiveMessages: builder.query<Message[], string>({
      queryFn() {
        return { data: [] };
      },
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          // when data is received from the socket connection to the server,
          // update our query result with the received message
          if (socket) {
            socket.on(`messageReceived`, (message: Message) => {
              updateCachedData((draft) => {
                draft.push(message);
              });
            });
          }
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }

        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        if (socket) {
          socket.off(`messageReceived`);
        }
      },
    }),
  }),
});

export const {
  useJoinRoomMutation,
  useLeaveRoomMutation,
  useSendMessageMutation,
  useReceiveMessagesQuery,
} = chatApi;

export default chatApi.reducer;
