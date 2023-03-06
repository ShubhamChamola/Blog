import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import LabelInput from "../../UI/LabelInput/LabelInput";
import Button from "../../UI/Button/Button";
import { useEffect, useReducer, useMemo, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useSelector } from "react-redux";
import "./UserEdit.scss";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Loader from "../../UI/Loader/Loader";
import { useNavigate } from "react-router-dom";

const stateReducer = (state, action) => {
  switch (action.type) {
    case "name": {
      return {
        ...state,
        name: action.value,
      };
    }
    case "nameClicked": {
      return {
        ...state,
        nameClicked: action.value,
      };
    }
    case "nameError": {
      return {
        ...state,
        nameError: action.value,
      };
    }
    case "bio": {
      return {
        ...state,
        bio: action.value,
      };
    }
    case "bioClicked": {
      return {
        ...state,
        bioClicked: action.value,
      };
    }
    case "bioError": {
      return {
        ...state,
        bioError: action.value,
      };
    }
    case "profile": {
      return {
        ...state,
        profile: action.value,
      };
    }
    case "btnDisabled": {
      return {
        ...state,
        btnDisabled: action.value,
      };
    }
    case "loadState": {
      return {
        ...state,
        loadState: action.value,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

const UserEdit = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const [avatarChange, setAvatarChange] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.id) {
      navigate("/signIn");
    }
  }, [userInfo.id]);

  const [state, dispatchState] = useReducer(stateReducer, {
    name: userInfo.name,
    nameClicked: false,
    nameError: null,
    bio: userInfo.bio,
    bioClicked: false,
    bioError: null,
    profile: userInfo.avatar ? userInfo.avatar : "",
    btnDisabled: false,
    loadState: false,
  });

  const { name, nameClicked, nameError, bio, bioClicked, bioError, profile } =
    state;

  useEffect(() => {
    const timeout = setTimeout(() => {
      formValidation();
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [name, nameClicked, nameError, bio, bioClicked, bioError, profile]);

  const onBlurHandler = (event) => {
    dispatchState({ type: event.target.id + "Clicked", value: true });
  };

  const onChangeHandler = (event) => {
    dispatchState({ type: event.target.id, value: event.target.value });
  };

  const updateAvatar = async () => {
    const imageRef = userInfo.avatarRef
      ? ref(storage, userInfo.avatarRef)
      : ref(storage, `Avatar/${profile.name + new Date().getTime()}`);
    if (!userInfo.avatarRef) {
      await updateDoc(doc(db, "user-info", userInfo.id), {
        avatarRef: `Avatar/${profile.name + new Date().getTime()}`,
      });
    }
    const uploadTask = uploadBytesResumable(imageRef, profile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateDoc(doc(db, "user-info", userInfo.id), {
            avatar: downloadURL,
          });
        });
      }
    );
  };

  const formValidation = () => {
    nameClicked && name.trim().length <= 0
      ? dispatchState({
          type: "nameError",
          value: "The name field is empty",
        })
      : dispatchState({ type: "nameError", value: null });
    bioClicked && bio.trim().length <= 0
      ? dispatchState({
          type: "bioError",
          value: "The bio field is empty",
        })
      : dispatchState({ type: "bioError", value: null });
    const disabled =
      nameError == null && bioError == null && name && bio ? false : true;
    dispatchState({ type: "btnDisabled", value: disabled });
  };

  const updateHandler = async () => {
    dispatchState({ type: "loadState", value: true });
    setAvatarChange(false);

    if (avatarChange) {
      updateAvatar();
    }

    await updateDoc(doc(db, "user-info", userInfo.id), {
      name: name.trim(),
      bio: bio.trim(),
    });
    dispatchState({ type: "loadState", value: false });
  };

  return (
    <section>
      <Navbar />
      <div className="edit">
        {state.loadState && <Loader />}
        <h1>PROFILE</h1>
        <div className="content">
          <LabelInput
            id="name"
            type="text"
            onBlur={(event) => {
              onBlurHandler(event);
            }}
            onChange={(event) => {
              onChangeHandler(event);
            }}
            placeholder="Enter your name..."
            label="Name"
            value={name}
            error={nameError}
          />
          <LabelInput
            id="bio"
            type="text-area"
            onBlur={(event) => {
              onBlurHandler(event);
            }}
            onChange={(event) => {
              onChangeHandler(event);
            }}
            placeholder="Enter your Bio here..."
            label="Bio"
            value={bio}
            error={bioError}
          />
        </div>
        {useMemo(() => {
          return (
            <LabelInput
              style={{
                background: `url("${
                  typeof profile == "string"
                    ? profile
                    : profile
                    ? URL.createObjectURL(profile)
                    : null
                }") no-repeat center center/cover`,
              }}
              label="Post Avatar"
              type="file"
              id="profile"
              value={profile}
              onChange={(event) => {
                setAvatarChange(true);
                dispatchState({
                  type: "profile",
                  value: event.target.files[0],
                });
              }}
            />
          );
        }, [profile])}
        <Button disabled={state.btnDisabled} onClick={updateHandler}>
          Update
        </Button>
      </div>
      <Footer />
    </section>
  );
};

export default UserEdit;
