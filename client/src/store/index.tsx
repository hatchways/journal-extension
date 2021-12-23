import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import { journalEntriesSlice } from "./journalEntries";
import { userSlice } from "./user";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    journalEntries: journalEntriesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
