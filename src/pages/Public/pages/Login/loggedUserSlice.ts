import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { User } from "@sharedTypes/globalTypes";

export interface LoggedUserState {
  user: User | null;
}

const initialState: LoggedUserState = {
  user: null,
};

const loggedUserSlice = createSlice({
  name: "loggedUser",
  initialState,
  reducers: {
    setLoggedUser: (state, action: PayloadAction<User>) => {
      return { ...state, user: action.payload };
    },
  },
});

export const { setLoggedUser } = loggedUserSlice.actions;

export default loggedUserSlice.reducer;
