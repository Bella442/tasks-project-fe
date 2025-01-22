import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SideMenuState {
  isOpen: boolean;
}

const initialState: SideMenuState = {
  isOpen: false,
};

const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {
    updateIsMenuOpen: (state, action: PayloadAction<boolean>) => {
      return { ...state, isOpen: action.payload };
    },
  },
});

export const { updateIsMenuOpen } = sideMenuSlice.actions;

export default sideMenuSlice.reducer;
