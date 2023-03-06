import Button from "../../UI/Button/Button";
import thumbnailDummy from "../../Assets/thumbnail.png";
import Bookmark from "../../UI/Bookmark/Bookmark";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BlogShow = ({ category, blogData, ...props }) => {
  const createdAt = blogData.createdAt
    ? blogData.createdAt.toDate().toLocaleString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const userInfo = useSelector((state) => state.userInfo);

  const navigate = useNavigate();

  return (
    <>
      {blogData ? (
        <div
          key={props.key}
          className="display-blog"
          style={{
            gridRowEnd:
              blogData.thumbnail && category == "browse" ? "span 2" : null,
            alignItems: category == "featured" ? "center" : null,
          }}
        >
          {category != "trending" && blogData.thumbnail ? (
            <div
              onClick={() => {
                navigate("/blog", {
                  state: { blogData, time: createdAt },
                });
              }}
              style={{
                background: `url(${blogData.thumbnail}) no-repeat center center / cover`,
                cursor: "pointer",
              }}
              className="blog-thumbnail"
            ></div>
          ) : category == "featured" ? (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/blog", {
                  state: { blogData, time: createdAt },
                });
              }}
            >
              <img src={thumbnailDummy} />
            </div>
          ) : (
            <></>
          )}
          <div className="blog-content">
            <h3
              onClick={() => {
                navigate("/blog", {
                  state: { blogData, time: createdAt },
                });
              }}
            >
              {blogData.title}
            </h3>
            <ul className="blog-prop">
              <li>{blogData.readTime} Min Read</li>
              <li>
                {blogData.likes} <span>Likes</span>
              </li>
              <li>#{blogData.tags.join(" #").toUpperCase()}</li>
              {category != "post" ? <Bookmark blogData={blogData} /> : null}
            </ul>
            {category == "featured" ? (
              <div className="blog-description">
                <p>
                  {blogData.description.length > 145
                    ? blogData.description.substr(0, 145) + "..."
                    : blogData.description}
                  <span
                    onClick={() => {
                      navigate("/blog", {
                        state: { blogData, time: createdAt },
                      });
                    }}
                  >
                    More
                  </span>
                </p>
              </div>
            ) : (
              <></>
            )}
            <ul className="blog-write">
              {category != "post" ? (
                <>
                  <li>
                    <div className="avatar">
                      <img src={blogData.createdBy.avatar} />
                    </div>
                    {blogData.createdBy.name}
                  </li>
                  <li>
                    <span></span>
                  </li>
                </>
              ) : null}
              <li>{createdAt}</li>
            </ul>
            {category == "post" ? (
              <Button
                onClick={() => {
                  navigate("/createPost", { state: { blogData } });
                }}
              >
                EDIT
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default BlogShow;
