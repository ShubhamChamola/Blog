import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoading(state) {
      state.isLoading = true;
    },
    setNotLoading(state) {
      state.isLoading = false;
    },
  },
});

export const loadingActions = loadingSlice.actions;
export default loadingSlice;
