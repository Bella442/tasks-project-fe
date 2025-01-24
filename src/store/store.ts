import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { api } from "@api/api";
import sideMenuReducer from "@components/SideMenu/sideMenuSlice";
import table1PageReducer from "@pages/Private/pages/Table1Page/table1PageSlice";
import loggedUserReducer from "@pages/Public/pages/Login/loggedUserSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    table1Page: table1PageReducer,
    sideMenu: sideMenuReducer,
    loggedUser: loggedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
