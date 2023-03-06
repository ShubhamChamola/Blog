import "./Navbar.scss";
import Logo from "../../Assets/Logo.png";
import Button from "../../UI/Button/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { auth } from "../../firebase";

const Navbar = () => {
  const currentUser = useSelector((state) => state.userInfo);
  const [menuClicked, setMenuClicked] = useState(false);

  return (
    <div className="nav">
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="Logo of the website" />
        </Link>
      </div>
      <div
        className={`menu ${menuClicked && "active-menu"}`}
        onClick={() => {
          setMenuClicked((prev) => !prev);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      {currentUser.name ? (
        <ul className={`nav-links ${menuClicked && "active-nav-links"}`}>
          <Link to="/userProfile/saved">
            <li>
              <BookmarkBorderIcon />
              SAVED
            </li>
          </Link>
          <Link to="/createPost">
            <li>
              <AddIcon />
              CREATE
            </li>
          </Link>
          <li
            onClick={async () => {
              auth.signOut();
            }}
          >
            <LogoutIcon /> SIGN OUT
          </li>
          <Link to="/userProfile">
            <li>
              <div
                className="avatar"
                style={{
                  background: `url("${currentUser.avatar}") no-repeat center center / cover`,
                }}
              ></div>
              <h4>
                {currentUser.name
                  .toUpperCase()
                  .substr(
                    0,
                    currentUser.name.indexOf(" ") >= 8
                      ? currentUser.name.indexOf(" ")
                      : 7 + 2
                  ) + "."}
              </h4>
            </li>
          </Link>
        </ul>
      ) : (
        <ul className={`nav-links ${menuClicked && "active-nav-links"}`}>
          <li>ABOUT</li>
          <li>CONTACT</li>
          <Link to="/signIn">
            <li>SIGN IN</li>
          </Link>
          <Link to="/signUp">
            <Button>SIGN UP</Button>
          </Link>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
