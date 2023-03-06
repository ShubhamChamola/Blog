import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
  name: "user info",
  initialState: {
    id: null,
    name: null,
    email: null,
    avatar: null,
    bio: null,
    post: [],
    saved: [],
  },
  reducers: {
    currentUserInfo(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
      state.bio = action.payload.bio;
      state.id = action.payload.id;
      state.post = action.payload.post;
      state.saved = action.payload.saved;
      state.avatarRef = action.payload.avatarRef;
    },
    resetUser(state) {
      state.id = null;
      state.name = null;
      state.email = null;
      state.avatar = null;
      state.bio = null;
      state.post = [];
      state.saved = [];
    },
  },
});

export const userInfoActions = userInfoSlice.actions;
export default userInfoSlice;
