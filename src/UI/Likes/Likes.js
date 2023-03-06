import { useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  arrayRemove,
  arrayUnion,
  updateDoc,
  doc,
  increment,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";

const Likes = ({ blogData }) => {
  const userInfo = useSelector((state) => state.userInfo);
  const [liked, setLiked] = useState(
    blogData.likedBy.includes(userInfo.id) ? true : false
  );

  const removeLike = async () => {
    setLiked(false);
    await updateDoc(doc(db, "blogs", blogData.blogID), {
      likedBy: arrayRemove(userInfo.id),
      likes: increment(-1),
    });
  };

  const like = async () => {
    setLiked(true);
    await updateDoc(doc(db, "blogs", blogData.blogID), {
      likedBy: arrayUnion(userInfo.id),
      likes: increment(1),
    });
  };

  return (
    <>
      {liked ? (
        <FavoriteIcon
          onClick={() => {
            removeLike();
          }}
        />
      ) : (
        <FavoriteBorderIcon
          onClick={() => {
            like();
          }}
        />
      )}
    </>
  );
};

export default Likes;
