import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  activeRoom: string;
  unreadMessages: Record<string, number>; // Unread messages count per room
}

const initialState: ChatState = {
  activeRoom: "",
  unreadMessages: {}, // Keeps unread messages count per room
};

interface RoomUnreadMessages {
  roomId: string;
  unreadMessagesCount: number;
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveRoom: (state, action: PayloadAction<string>) => {
      state.activeRoom = action.payload;
      // Reset unread messages for the active room
      state.unreadMessages[action.payload] = 0;
    },
    setUnreadMessages: (state, action: PayloadAction<RoomUnreadMessages>) => {
      const roomId = action.payload.roomId;

      state.unreadMessages[roomId] = action.payload.unreadMessagesCount;
    },
    incrementUnreadMessages: (state, action: PayloadAction<string>) => {
      const roomId = action.payload;

      if (!state.unreadMessages[roomId]) {
        state.unreadMessages[roomId] = 0;
      }

      state.unreadMessages[roomId] += 1;
    },
    resetUnreadMessages: (state, action: PayloadAction<string>) => {
      state.unreadMessages[action.payload] = 0;
    },
  },
});

export const {
  setActiveRoom,
  setUnreadMessages,
  incrementUnreadMessages,
  resetUnreadMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
