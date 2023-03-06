import Navbar from "../../components/Navbar/Navbar";
import Share from "../../Assets/share.png";
import Comment from "../../Assets/comment.png";
import Footer from "../../components/Footer/Footer";
import Person from "../../Assets/person_icon.png";
import "./Blog.scss";
import { useLocation, useNavigate } from "react-router-dom";
import Bookmark from "../../UI/Bookmark/Bookmark";
import Likes from "../../UI/Likes/Likes";
import Nothing from "../../UI/Nothing/Nothing";

const Blog = () => {
  const navigate = useNavigate();
  const state = useLocation().state;
  const blogData = state ? state.blogData : null;
  const time = state ? state.time : null;

  return (
    <section className="blog">
      <Navbar />
      <span
        onClick={() => {
          navigate(-1);
        }}
      >
        BACK
      </span>
      {blogData ? (
        <div className="blog-container">
          <h1>{blogData.title}</h1>
          <p>
            <span>Introduction Statement</span>
            {blogData.postIntroduction}
          </p>
          {blogData.thumbnail ? (
            <div
              className="thumbnail"
              style={{
                background: `url(${blogData.thumbnail})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                aspectRatio: "2/1.25",
                backgroundSize: "cover",
              }}
            ></div>
          ) : null}
          {[...blogData.body.split("\n")].map(
            (para, index) =>
              para.length >= 1 && (
                <p className="bodyPara" key={index}>
                  {para}
                </p>
              )
          )}
          <div className="blogger">
            <span>WRITTEN BY</span>
            <div className="writter">
              <div className="avatar">
                <img src={blogData.createdBy.avatar} />
              </div>
              <div className="writter-info">
                <h4>{blogData.createdBy.name.toUpperCase()}</h4>
                <span>{time}</span>
              </div>
            </div>
            <ul className="icons">
              <li>
                <Likes blogData={blogData} />
              </li>
              <li>
                <img src={Comment} />
              </li>
              <li>
                <img src={Share} />
              </li>
              <li>
                <Bookmark blogData={blogData} />
              </li>
            </ul>
          </div>
          <div className="comment-section">
            <div className="comment">
              <div className="avatar">
                <img src={Person} />
              </div>
              <div className="content">
                <div>
                  <span>Arthut Shelby</span>
                  <span></span>
                  <span>24 March, 2022</span>
                </div>
                <p>
                  Massa pharetra id non rutrum neque ut sit. Et accumsan, et,
                  nec fames ut.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Nothing />
      )}
      <Footer />
    </section>
  );
};

export default Blog;
