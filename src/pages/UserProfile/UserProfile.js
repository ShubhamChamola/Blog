import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Button from "../../UI/Button/Button";
import "./UserProfile.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostedBlogs from "../../components/PostBlogs/PostBlogs";
import SavedBlogs from "../../components/SavedBlogs/SavedBlogs";
import { useLocation, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.userInfo);

  const [showPost, setShowPost] = useState(
    location.pathname == "/userProfile/saved" ? false : true
  );

  useEffect(() => {
    setShowPost(location.pathname == "/userProfile/saved" ? false : true);
  }, [location.pathname]);

  useEffect(() => {
    if (!userInfo.id) {
      navigate("/signIn");
    }
  }, [userInfo.id]);

  return (
    <section className="user-profile">
      <Navbar />
      <div className="user-profile-container">
        <div className="bio">
          <div
            className="avatar"
            style={{
              background: `url("${userInfo.avatar}") no-repeat center center / cover`,
            }}
          ></div>
          <div className="info">
            <h3>{userInfo.name}</h3>
            <span>BIO</span>
            <p>{userInfo.bio}</p>
            <Button
              onClick={() => {
                navigate("/userEdit");
              }}
            >
              Edit User
            </Button>
          </div>
        </div>
        <div className="links">
          <h6
            className={showPost ? "active" : null}
            onClick={() => {
              setShowPost(true);
            }}
          >
            {userInfo.post.length} <span>Posts</span>
          </h6>
          <h6
            className={!showPost ? "active" : null}
            onClick={() => {
              setShowPost(false);
            }}
          >
            {userInfo.saved.length} <span>Saved</span>
          </h6>
        </div>
        <PostedBlogs style={!showPost ? { display: "none" } : null} />
        <SavedBlogs style={showPost ? { display: "none" } : null} />
      </div>
      <Footer />
    </section>
  );
};

export default UserProfile;
