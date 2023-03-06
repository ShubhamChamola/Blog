import Navbar from "../../components/Navbar/Navbar";
import "./SignInUp.scss";
import Footer from "../../components/Footer/Footer";
import SignUp from "../../components/SignUp/SignUp";
import SignIn from "../../components/SignIn/SignIn";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SignInUp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (userInfo.id) {
      navigate(-1);
    }
  }, [userInfo.id]);

  const [activeSignUp, setActiveSignUp] = useState(
    location.pathname == "/signUp" || location.pathname == "signup"
      ? true
      : false
  );

  const [activeSignIn, setActiveSignIn] = useState(
    location.pathname == "/signIn" || location.pathname == "/singin"
      ? true
      : false
  );

  useEffect(() => {
    setActiveSignUp(
      location.pathname == "/signUp" || location.pathname == "/signup"
        ? true
        : false
    );
    setActiveSignIn(
      location.pathname == "/signIn" || location.pathname == "signin"
        ? true
        : false
    );
  }, [location.pathname]);

  return (
    <section className="sign">
      <Navbar />
      <div className="container">
        <SignIn
          active={activeSignIn}
          setActiveSignIn={setActiveSignIn}
          setActiveSignUp={setActiveSignUp}
        />
        <SignUp
          active={activeSignUp}
          setActiveSignUp={setActiveSignUp}
          setActiveSignIn={setActiveSignIn}
        />
      </div>
      <Footer />
    </section>
  );
};

export default SignInUp;
