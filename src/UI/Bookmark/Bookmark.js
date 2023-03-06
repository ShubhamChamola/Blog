import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { userBlogsActions } from "../../store/userBlogsSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Bookmark = ({ blogData }) => {
  const userInfo = useSelector((state) => state.userInfo);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const saveBlog = async () => {
    await updateDoc(doc(db, "user-info", userInfo.id), {
      saved: arrayUnion(blogData.blogID),
    });
  };

  const removeSavedBlog = () => {
    return async (dispatch) => {
      await updateDoc(doc(db, "user-info", userInfo.id), {
        saved: arrayRemove(blogData.blogID),
      });
      dispatch(
        userBlogsActions.setSavedBlogs({ blogID: blogData.blogID, type: "dlt" })
      );
    };
  };
  return (
    <>
      {userInfo.id && userInfo.saved?.includes(blogData.blogID) ? (
        <BookmarkIcon
          onClick={() => {
            dispatch(removeSavedBlog());
          }}
        />
      ) : (
        <BookmarkBorderIcon
          onClick={() => {
            userInfo.id ? saveBlog() : navigate("/signIn");
          }}
        />
      )}
    </>
  );
};

export default Bookmark;
