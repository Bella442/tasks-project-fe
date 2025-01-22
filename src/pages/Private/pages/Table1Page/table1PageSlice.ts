import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface PageState {
  country: string;
}

const initialState: PageState = {
  country: "Bulgaria",
};

const table1PageSlice = createSlice({
  name: "table1Page",
  initialState,
  reducers: {
    updateCountry: (state, action: PayloadAction<string>) => {
      return { ...state, country: action.payload };
    },
  },
});

export const { updateCountry } = table1PageSlice.actions;

export default table1PageSlice.reducer;
