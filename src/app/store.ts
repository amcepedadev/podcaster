import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { podcastApi } from "../features/podcasts/podcastsAPI";
import { loadingSlice } from "../features/ui/loadingSlice";

export const store = configureStore({
  reducer: {
    [podcastApi.reducerPath]: podcastApi.reducer,
    [loadingSlice.name]: loadingSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(podcastApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
