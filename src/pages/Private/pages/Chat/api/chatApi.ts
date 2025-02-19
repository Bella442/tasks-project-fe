import { io, Socket } from "socket.io-client";

import { api } from "@api/api";
import { RootState } from "@store/store";

import {
  CreateChatRoomReqBody,
  CreateChatRoomResBody,
  GetChatHistoryReqBody,
  GetChatHistoryResBody,
  GetUnreadMessagesResBody,
  GetUserChatListResBody,
  ReadMessagesReqBody,
  ReadMessagesResBody,
} from "./apiTypes";
import {
  createChatRoom,
  getChatHistory,
  getUnreadMessages,
  getUserChatList,
  readMessages,
} from "./chatEndpoints";
import { incrementUnreadMessages } from "./chatSlice";
import { Message } from "../types";

let socket: Socket | null = null;
const messages = new Map<string, Message[]>();

// Maintain a map of rooms for multiple connections
const roomListeners: Record<string, boolean> = {};

const initializeSocket = () => {
  if (!socket) {
    socket = io(import.meta.env.VITE_API_URL);
    console.info("✅ Socket initialized");
  }
};

export const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserChatList: builder.query<GetUserChatListResBody, void>({
      query: getUserChatList,
    }),
    getChatHistory: builder.query<GetChatHistoryResBody, GetChatHistoryReqBody>(
      {
        query: getChatHistory,
      },
    ),
    getUnreadMessages: builder.query<GetUnreadMessagesResBody, void>({
      query: getUnreadMessages,
      transformResponse: (
        response: Array<{ room_id: string; unread_messages: string }>,
      ) => {
        return response.map((item) => {
          return {
            roomId: item.room_id,
            unreadMessagesCount: parseInt(item.unread_messages, 10),
          };
        });
      },
    }),
    readMessages: builder.mutation<ReadMessagesResBody, ReadMessagesReqBody>({
      query: readMessages,
    }),
    createRoom: builder.mutation<CreateChatRoomResBody, CreateChatRoomReqBody>({
      query: createChatRoom,
    }),
    joinRoom: builder.mutation<void, string>({
      queryFn: (roomId) => {
        initializeSocket();

        if (socket && !roomListeners[roomId]) {
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
    receiveMessages: builder.query<Record<string, Message[]>, void>({
      queryFn() {
        return { data: Object.fromEntries(messages) };
      },
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        try {
          await cacheDataLoaded;
          // when data is received from the socket connection to the server,
          // update our query result with the received message
          initializeSocket();
          if (socket) {
            socket.on(`messageReceived`, (message: Message, roomId) => {
              updateCachedData((draft) => {
                if (!draft[roomId]) {
                  draft[roomId] = [];
                }

                draft[roomId].push(message);
              });
            });
          }
        } catch (err) {
          console.error(err);
        }

        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        if (socket) {
          socket.off(`messageReceived`);
        }
      },
    }),
    listenForNotifications: builder.query<void, void>({
      queryFn: () => ({ data: undefined }),
      async onCacheEntryAdded(
        _arg,
        { cacheDataLoaded, cacheEntryRemoved, dispatch, getState },
      ) {
        try {
          await cacheDataLoaded;
          initializeSocket();

          if (socket) {
            socket.on("notificationReceived", (roomId: string) => {
              const state = getState() as RootState;
              const activeRoom = state.chat.activeRoom;

              if (activeRoom !== roomId) {
                dispatch(incrementUnreadMessages(roomId));
              }
            });
          }
        } catch (err) {
          console.error(err);
        }

        await cacheEntryRemoved;
        if (socket) {
          socket.off("notificationReceived");
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
  useGetUserChatListQuery,
  useGetChatHistoryQuery,
  useCreateRoomMutation,
  useListenForNotificationsQuery,
  useGetUnreadMessagesQuery,
  useReadMessagesMutation,
} = chatApi;

export default chatApi.reducer;
