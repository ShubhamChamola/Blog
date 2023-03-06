import {
  query,
  limit,
  collection,
  getDocs,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import { homeBlogsAction } from "./homeBlogsSlice";

const searchFunction = (searchText = "", searchArray = [], l = 9) => {
  return async (dispatch) => {
    if (searchText) {
      let descriptionData = [];
      let titleData = [];
      let tagsData = [];
      let allBlogs = [];
      let uniqueAllBlogs = [];
      const descriptionQuery = query(
        collection(db, "blogs"),
        where("descriptionLower", ">=", searchText + "\uf8ff"),
        where("descriptionArray", "array-contains-any", searchArray),
        limit(l)
      );
      const descriptionSnapshot = await getDocs(descriptionQuery);
      descriptionSnapshot.forEach((doc) => {
        descriptionData.unshift(doc.data().blogID);
        allBlogs.push(doc.data());
      });

      const titleQuery = query(
        collection(db, "blogs"),
        where("titleArray", "array-contains-any", searchArray),
        where("titleLower", ">=", searchText + "\uf8ff"),
        limit(l)
      );
      const titleSnapshot = await getDocs(titleQuery);
      titleSnapshot.forEach((doc) => {
        titleData.unshift(doc.data().blogID);
        allBlogs.push(doc.data());
      });

      const tagsQuery = query(
        collection(db, "blogs"),
        where("tags", "array-contains-any", searchArray),
        limit(l)
      );
      const tagsSnapshot = await getDocs(tagsQuery);
      tagsSnapshot.forEach((doc) => {
        tagsData.unshift(doc.data().blogID);
        allBlogs.push(doc.data());
      });

      const sum = [...tagsData, ...descriptionData, ...titleData];

      function removeDuplicateObjectFromArray(array, key) {
        var check = new Set();
        return array.filter(
          (obj) => !check.has(obj[key]) && check.add(obj[key])
        );
      }

      uniqueAllBlogs = removeDuplicateObjectFromArray(allBlogs, "blogID");

      const firstPriority = sum.filter(
        (value) =>
          tagsData.includes(value) &&
          descriptionData.includes(value) &&
          titleData.includes(value)
      );

      const secondPriority = sum.filter(
        (value) =>
          (tagsData.includes(value) && descriptionData.includes(value)) ||
          (tagsData.includes(value) && titleData.includes(value)) ||
          (descriptionData.includes(value) && titleData.includes(value))
      );

      const prioritySum = [
        ...firstPriority,
        ...secondPriority,
        ...tagsData,
        ...descriptionData,
        ...titleData,
      ];

      const result = [...new Set(prioritySum)];
      const resultBlogs = uniqueAllBlogs.filter((blog) =>
        result.includes(blog.blogID)
      );
      dispatch(homeBlogsAction.setBrowseBlogs(resultBlogs));
    } else {
      const q = query(
        collection(db, "blogs"),
        orderBy("likes", "desc"),
        limit(l)
      );
      onSnapshot(q, (querySnapshot) => {
        let browseBlogs = [];
        querySnapshot.forEach((doc) => {
          browseBlogs.push(doc.data());
        });
        dispatch(homeBlogsAction.setBrowseBlogs(browseBlogs));
      });
    }
  };
};

export default searchFunction;
