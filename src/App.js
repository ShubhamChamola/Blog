import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import SignInUp from "./pages/SignInUp/SignInUp";
import Home from "./pages/Home/Home";
import Blog from "./pages/Blog/Blog";
import UserProfile from "./pages/UserProfile/UserProfile";
import CreatePost from "./pages/CreatePost/CreatePost";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getUserInfo from "./store/getUserInfo-action";
import { loadingActions } from "./store/loadingSlice";
import Loader from "./UI/Loader/Loader";
import React from "react";
import getUserBlogs from "./store/getUserBlogs-action";
import getFeaturedBlogs from "./store/getFeaturedBlogs-action";
import getTrendingBlogs from "./store/getTrendingBlogs-action";
import searchFunction from "./store/searchFunction";
import UserEdit from "./pages/UserEdit/UserEdit";

function App() {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userInfo);

  const loadingState = useSelector((state) => state.loading.isLoading);

  useEffect(() => {
    dispatch(loadingActions.setLoading());
    dispatch(getTrendingBlogs());
    dispatch(getFeaturedBlogs());
    dispatch(searchFunction());
    dispatch(getUserInfo());
  }, []);

  useEffect(() => {
    dispatch(getUserBlogs(userInfo.post, userInfo.saved));
  }, [userInfo.post, userInfo.saved]);

  return (
    <div className="App">
      {loadingState ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home />}></Route>
              <Route path="userProfile/saved" element={<UserProfile />} />
              <Route path="userProfile" element={<UserProfile />} />
              <Route path="signIn" element={<SignInUp />} />
              <Route path="signUp" element={<SignInUp />} />
              <Route path="createPost" element={<CreatePost />}></Route>
              <Route path="blog" element={<Blog />} />
              <Route path="userEdit" element={<UserEdit />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
