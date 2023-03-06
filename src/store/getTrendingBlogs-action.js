import {
  query,
  limit,
  orderBy,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { homeBlogsAction } from "./homeBlogsSlice";

const getTrendingBlogs = () => {
  return async (dispatch) => {
    const q = query(
      collection(db, "blogs"),
      orderBy("likes", "desc"),
      limit(6)
    );
    onSnapshot(q, (querySnapshot) => {
      dispatch(homeBlogsAction.resetTrending());
      querySnapshot.forEach((doc) => {
        dispatch(homeBlogsAction.setTrendingBlogs(doc.data()));
      });
    });
  };
};

export default getTrendingBlogs;
