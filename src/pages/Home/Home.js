import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Input from "../../UI/Input/Input";
import SeachIcon from "../../Assets/SearchIcon.png";
import "./Home.scss";
import HomeContent from "../../components/HomeContent/HomeContent";
import { useEffect, useState } from "react";
import searchFunction from "../../store/searchFunction";
import { useDispatch, useSelector } from "react-redux";
import getFeaturedBlogs from "../../store/getFeaturedBlogs-action";
import Button from "../../UI/Button/Button";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [searchArray, setSearchArray] = useState([]);
  const [countCommon, setCountCommon] = useState(1);
  const [countSearch, setCountSearch] = useState(1);

  const browseBlogs = useSelector((state) => state.homeBlogs.browse);
  const trendingBlogs = useSelector((state) => state.homeBlogs.trendingBlogs);
  const featuredBlogs = useSelector((state) => state.homeBlogs.featured);

  const dispatch = useDispatch();

  const onChangeHandler = (event) => {
    setSearchText(event.target.value.trim().toLowerCase());
    const arr = event.target.value.trim().toLowerCase().split(" ");
    setSearchArray(arr);
  };

  useEffect(() => {
    var timeout = setTimeout(() => {
      dispatch(searchFunction(searchText, searchArray, 9));
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchText]);

  return (
    <section className="Home ">
      <Navbar />
      <div className="home-container">
        <h1>LATEST POSTS</h1>
        <div className="home-bar">
          <Input
            onChange={(event) => {
              onChangeHandler(event);
            }}
            icon={SeachIcon}
            placeholder="SEARCH..."
          />
          <ul>
            <li
              onClick={(event) => {
                dispatch(getFeaturedBlogs(event.target.innerText));
              }}
            >
              ACADEMIC
            </li>

            <li
              onClick={(event) => {
                dispatch(getFeaturedBlogs(event.target.innerText));
              }}
            >
              TECHNOLOGY
            </li>
            <li
              onClick={(event) => {
                dispatch(getFeaturedBlogs(event.target.innerText));
              }}
            >
              GAMES
            </li>
            <li
              onClick={(event) => {
                dispatch(getFeaturedBlogs(event.target.innerText));
              }}
            >
              TV-&-MOVIES
            </li>
            <li
              onClick={(event) => {
                dispatch(getFeaturedBlogs(event.target.innerText));
              }}
            >
              HEALTH
            </li>
            <li
              onClick={(event) => {
                dispatch(getFeaturedBlogs(event.target.innerText));
              }}
            >
              SPORTS
            </li>
          </ul>
        </div>
        <HomeContent
          trending={trendingBlogs}
          browse={browseBlogs}
          featured={featuredBlogs}
          onChangeHandler={onChangeHandler}
        />
        <Button
          onClick={() => {
            dispatch(
              searchFunction(
                searchText,
                searchArray,
                ((!searchText ? countCommon : countSearch) + 1) * 9
              )
            );
            !searchText
              ? setCountCommon((prev) => prev + 1)
              : setCountSearch((prev) => prev + 1);
          }}
        >
          LOAD MORE
        </Button>
      </div>
      <Footer />
    </section>
  );
};

export default Home;
