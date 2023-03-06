import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./userInfoSlice";
import userBlogsSlice from "./userBlogsSlice";
import homeBlogsSlice from "./homeBlogsSlice";
import loadingSlice from "./loadingSlice";

const store = configureStore({
  reducer: {
    userInfo: userInfoSlice.reducer,
    userBlogs: userBlogsSlice.reducer,
    loading: loadingSlice.reducer,
    homeBlogs: homeBlogsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
