import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { userBlogsActions } from "./userBlogsSlice";

const getUserBlogs = (post, saved) => {
  return async (dispatch) => {
    if (!post) {
      return;
    }

    if (!saved) {
      return;
    }

    post.map(async (blogID) => {
      onSnapshot(doc(db, "blogs", blogID), (doc) => {
        dispatch(userBlogsActions.setPostBlogs(doc.data()));
      });
    });

    saved.map(async (blogID) => {
      onSnapshot(doc(db, "blogs", blogID), (doc) => {
        dispatch(userBlogsActions.setSavedBlogs(doc.data()));
      });
    });
  };
};

export default getUserBlogs;
