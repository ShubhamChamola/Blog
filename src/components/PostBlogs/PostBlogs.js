import Button from "../../UI/Button/Button";
import BlogShow from "../../components/HomeContent/BlogShow";
import { useState } from "react";
import { useSelector } from "react-redux";

const PostedBlogs = (props) => {
  const [postLimit, setPostLimit] = useState(10);

  const postBlogs = useSelector((state) => state.userBlogs.postBlogs);
  const userInfo = useSelector((state) => state.userInfo);

  return (
    <>
      <div className="blog-container" style={props.style}>
        {postBlogs.length >= 1
          ? postBlogs.map((blog, index) => {
              return index < postLimit ? (
                <BlogShow key={index} blogData={blog} category="post" />
              ) : null;
            })
          : null}
      </div>
      <Button
        style={props.style}
        onClick={() => {
          setPostLimit((prev) => {
            return prev + 10;
          });
        }}
        disabled={postLimit >= userInfo.post.length && true}
      >
        LOAD MORE
      </Button>
    </>
  );
};

export default PostedBlogs;
