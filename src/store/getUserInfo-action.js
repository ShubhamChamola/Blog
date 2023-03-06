import { doc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { userInfoActions } from "./userInfoSlice";
import { loadingActions } from "./loadingSlice";

const getUserInfo = () => {
  return (dispatch) => {
    // fetching user id
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Fetching user info
        onSnapshot(doc(db, "user-info", user.uid), (doc) => {
          if (doc.data()) {
            dispatch(userInfoActions.currentUserInfo(doc.data()));
            dispatch(loadingActions.setNotLoading());
          } else {
            dispatch(loadingActions.setNotLoading());
          }
        });
      } else {
        dispatch(userInfoActions.resetUser());
        dispatch(loadingActions.setNotLoading());
      }
    });
  };
};

export default getUserInfo;
