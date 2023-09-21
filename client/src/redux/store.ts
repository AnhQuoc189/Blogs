import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

//api
import { apiBlog } from "./services/blogApi";

//reducer
import blogReducer from "./slices/blogSlice";

const store = configureStore({
  reducer: {
    [apiBlog.reducerPath]: apiBlog.reducer,

    blog: blogReducer,
  },

  //add api middleware to enable features like as  catching , invalidation, polling of RTK-Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: {
        ignoredPaths: [
          "ignoredPath",
          "ignoredNested.one",
          "ignoredNested.two",
          "items.data",
        ],
      },
    }).concat([apiBlog.middleware]),
});

// optional but compulsory refetchOnFocus,refetchOnReconnect feature
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
