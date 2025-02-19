import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { api } from "@api/api";
import sideMenuReducer from "@components/SideMenu/sideMenuSlice";
import chatReducer from "@pages/Private/pages/Chat/api/chatSlice";
import loggedUserReducer from "@pages/Public/pages/Login/loggedUserSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    sideMenu: sideMenuReducer,
    loggedUser: loggedUserReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
