import { createSlice } from "@reduxjs/toolkit";

const userBlogsSlice = createSlice({
  name: "user blogs",
  initialState: {
    postBlogs: [],
    savedBlogs: [],
  },
  reducers: {
    setPostBlogs(state, action) {
      let existingBlog = state.postBlogs.findIndex(
        (blog) => blog.blogID == action.payload.blogID
      );
      if (existingBlog >= 0) {
        state.postBlogs[existingBlog] = action.payload;
      } else {
        state.postBlogs.unshift(action.payload);
      }
    },
    setSavedBlogs(state, action) {
      let existingBlog = state.savedBlogs.findIndex(
        (blog) => blog.blogID == action.payload.blogID
      );
      if (existingBlog >= 0) {
        if (action.payload.type == "dlt") {
          state.savedBlogs.splice(existingBlog, 1);
        } else {
          state.savedBlogs[existingBlog] = action.payload;
        }
      } else {
        state.savedBlogs.unshift(action.payload);
      }
    },
  },
});

export const userBlogsActions = userBlogsSlice.actions;
export default userBlogsSlice;
