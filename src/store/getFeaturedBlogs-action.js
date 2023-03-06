import {
  query,
  limit,
  orderBy,
  collection,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { homeBlogsAction } from "./homeBlogsSlice";

const getFeaturedBlogs = (blogType = "academic") => {
  return async (dispatch) => {
    dispatch(homeBlogsAction.resetFeatured());

    const q = query(
      collection(db, "blogs"),
      where("tags", "array-contains", blogType.toLowerCase()),
      orderBy("likes", "desc"),
      limit(10)
    );
    onSnapshot(q, (querySnapshot) => {
      let featuredBlogs = [];
      querySnapshot.forEach((doc) => {
        featuredBlogs.push(doc.data());
      });
      dispatch(homeBlogsAction.setFeaturedBlogs(featuredBlogs));
    });
  };
};

export default getFeaturedBlogs;
