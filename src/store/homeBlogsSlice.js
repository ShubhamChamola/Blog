import { createSlice } from "@reduxjs/toolkit";

const homeBlogsSlice = createSlice({
  name: "Trending Blogs",
  initialState: {
    trendingBlogs: [],
    featured: [],
    browse: [],
  },
  reducers: {
    setTrendingBlogs(state, action) {
      state.trendingBlogs.push(action.payload);
    },
    setBrowseBlogs(state, action) {
      state.browse = action.payload;
    },
    setFeaturedBlogs(state, action) {
      state.featured = [...action.payload];
    },
    resetTrending(state) {
      state.trendingBlogs = [];
    },
    resetFeatured(state) {
      state.featured = [];
    },
  },
});

export const homeBlogsAction = homeBlogsSlice.actions;
export default homeBlogsSlice;
