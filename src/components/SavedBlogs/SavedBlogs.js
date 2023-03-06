import Button from "../../UI/Button/Button";
import BlogShow from "../../components/HomeContent/BlogShow";
import { useState } from "react";
import { useSelector } from "react-redux";

const SavedBlogs = (props) => {
  const [savedLimit, setSavedLimit] = useState(10);

  const userInfo = useSelector((state) => state.userInfo);
  const savedBlogs = useSelector((state) => state.userBlogs.savedBlogs);

  return (
    <>
      <div className="blog-container" style={props.style}>
        {savedBlogs.length >= 1
          ? savedBlogs.map((blog, index) => {
              return index < savedLimit ? (
                <BlogShow key={index} blogData={blog} category="saved" />
              ) : null;
            })
          : null}
      </div>
      <Button
        style={props.style}
        onClick={() => {
          setSavedLimit((prev) => {
            return prev + 10;
          });
        }}
        disabled={savedLimit >= userInfo.saved.length && true}
      >
        LOAD MORE
      </Button>
    </>
  );
};

export default SavedBlogs;
