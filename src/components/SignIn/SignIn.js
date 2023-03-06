import Button from "../../UI/Button/Button";
import Google from "../../Assets/Google.png";
import Facebook from "../../Assets/Facebook.png";
import Mail_dark from "../../Assets/Mail_dark.png";
import { useEffect, useReducer } from "react";
import { provider, auth } from "../../firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import LabelInput from "../../UI/LabelInput/LabelInput";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

const stateReducer = (state, action) => {
  if (action.type == "setShowEmailForm") {
    return {
      ...state,
      showEmailForm: action.value,
    };
  }
  if (action.type == "setEmailClicked") {
    return {
      ...state,
      emailClicked: true,
    };
  }
  if (action.type == "setPasswordClicked") {
    return {
      ...state,
      passwordClicked: true,
    };
  }
  if (action.type == "setEnteredEmail") {
    return {
      ...state,
      enteredEmail: action.value,
    };
  }
  if (action.type == "setEnteredPassword") {
    return {
      ...state,
      enteredPassword: action.value,
    };
  }
  if (action.type == "emailError") {
    return {
      ...state,
      emailError: action.value,
    };
  }
  if (action.type == "passwordError") {
    return {
      ...state,
      passwordError: action.value,
    };
  }
  if (action.type == "submitBtnDisabled") {
    return {
      ...state,
      submitBtnDisabled: action.value,
    };
  }
  if (action.type == "providerError") {
    return {
      ...state,
      providerError: action.value,
    };
  }
  if (action.type == "reset") {
    return {
      showEmailForm: false,
      enteredEmail: null,
      enteredPassword: null,
      emailClicked: false,
      passwordClicked: false,
      emailError: null,
      passwordError: null,
      submitBtnDisabled: true,
      providerError: null,
    };
  }
};

const SignIn = (props) => {
  const [states, dispacthStates] = useReducer(stateReducer, {
    showEmailForm: false,
    enteredEmail: null,
    enteredPassword: null,
    emailClicked: false,
    passwordClicked: false,
    emailError: null,
    passwordError: null,
    submitBtnDisabled: true,
  });

  const navigate = useNavigate();

  const googleSignInHandler = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
    } catch (error) {
      dispacthStates({ type: "providerError", value: error.message });
    }
  };

  const inputValidator = () => {
    states.emailClicked && !states.enteredEmail
      ? dispacthStates({
          type: "emailError",
          value: "Enter a valid email",
        })
      : states.enteredEmail && !states.enteredEmail.includes("@")
      ? dispacthStates({ type: "emailError", value: "Enter a valid email" })
      : dispacthStates({ type: "emailError", value: null });

    states.passwordClicked && !states.enteredPassword
      ? dispacthStates({
          type: "passwordError",
          value: "Password should be at least 6 characters long",
        })
      : states.enteredPassword && states.enteredPassword.length < 6
      ? dispacthStates({
          type: "passwordError",
          value: "Password should be at least 6 characters long",
        })
      : dispacthStates({ type: "passwordError", value: null });

    const disabled =
      states.emailError == null &&
      states.passwordError == null &&
      states.enteredEmail &&
      states.enteredPassword
        ? false
        : true;
    dispacthStates({ type: "submitBtnDisabled", value: disabled });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputValidator();
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [
    states.emailClicked,
    states.passwordClicked,
    states.enteredEmail,
    states.enteredPassword,
    states.emailError,
    states.passwordError,
  ]);

  const signInUser = async () => {
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        states.enteredEmail,
        states.enteredPassword
      );
      const user = res.user;
    } catch (error) {
      dispacthStates({ type: "providerError", value: error.message });
    }
  };

  return (
    <div className="signIn">
      {props.active ? (
        <div className="active">
          {states.showEmailForm ? (
            <div className="form">
              <span
                className="back"
                onClick={() => {
                  dispacthStates({ type: "reset" });
                }}
              >
                BACK
              </span>
              <h2>Sign In</h2>
              <LabelInput
                error={states.emailError}
                onBlur={() => {
                  dispacthStates({
                    type: "setEmailClicked",
                  });
                }}
                onChange={(e) => {
                  dispacthStates({
                    type: "setEnteredEmail",
                    value: e.target.value.trim(),
                  });
                }}
                type={"email"}
                label={"Email"}
                id={"email"}
              />
              <LabelInput
                error={states.passwordError}
                type={"password"}
                label={"Password"}
                id={"password"}
                icon={VisibilityIcon}
                onBlur={() => {
                  dispacthStates({
                    type: "setPasswordClicked",
                    value: true,
                  });
                }}
                onChange={(e) => {
                  dispacthStates({
                    type: "setEnteredPassword",
                    value: e.target.value.trim(),
                  });
                }}
              />
              <Button
                disabled={states.submitBtnDisabled}
                onClick={() => {
                  signInUser();
                }}
              >
                SUBMIT
              </Button>
              <span className="provider-error">{states.providerError}</span>
            </div>
          ) : (
            <div className="btns">
              <h2>Sign In</h2>
              <Button onClick={googleSignInHandler} icon={Google}>
                GOOGLE
              </Button>
              <Button icon={Facebook}>FACEBOOK</Button>
              <div className="seperate">
                <span>OR</span>
                <span></span>
              </div>
              <Button
                onClick={() => {
                  dispacthStates({ type: "setShowEmailForm", value: true });
                  dispacthStates({ type: "providerError", value: null });
                }}
                icon={Mail_dark}
              >
                EMAIL
              </Button>
              <span className="provider-error">{states.providerError}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="in-active">
          <div className="container">
            <h4>Already Have An Account</h4>
            <p>
              Sign in to your existing account with email or any other service
              and continue to read.
            </p>
            <Button
              onClick={() => {
                navigate("/signIn");
                props.setActiveSignIn(true);
                props.setActiveSignUp(false);
              }}
            >
              SIGN IN
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
