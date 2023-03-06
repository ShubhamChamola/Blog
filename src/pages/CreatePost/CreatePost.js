import "./CreatePost.scss";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import LabelInput from "../../UI/LabelInput/LabelInput";
import Button from "../../UI/Button/Button";
import { useMemo, useReducer, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useSelector } from "react-redux";
import Loader from "../../UI/Loader/Loader";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, useLocation } from "react-router-dom";
import stopWords from "../../store/stopWords";
import thumbnailDummy from "../../Assets/thumbnail.png";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "title":
      return {
        ...state,
        title: action.value,
      };
    case "titleError":
      return {
        ...state,
        titleError: action.value,
      };
    case "titleClicked":
      return {
        ...state,
        titleClicked: true,
      };
    case "description":
      return {
        ...state,
        description: action.value,
      };
    case "descriptionError":
      return {
        ...state,
        descriptionError: action.value,
      };
    case "descriptionClicked":
      return {
        ...state,
        descriptionClicked: true,
      };
    case "post-introduction":
      return {
        ...state,
        postIntroduction: action.value,
      };
    case "postIntroductionError":
      return {
        ...state,
        postIntroductionError: action.value,
      };
    case "post-introductionClicked":
      return {
        ...state,
        postIntroductionClicked: true,
      };
    case "body":
      return {
        ...state,
        body: action.value,
      };
    case "bodyError":
      return {
        ...state,
        bodyError: action.value,
      };
    case "bodyClicked":
      return {
        ...state,
        bodyClicked: true,
      };
    case "tags":
      return {
        ...state,
        tags: action.value,
      };
    case "tagsError":
      return {
        ...state,
        tagsError: action.value,
      };
    case "tagsClicked":
      return {
        ...state,
        tagsClicked: true,
      };
    case "readTime":
      return {
        ...state,
        readTime: action.value,
      };
    case "readTimeError":
      return {
        ...state,
        readTimeError: action.value,
      };
    case "readTimeClicked":
      return {
        ...state,
        readTimeClicked: true,
      };
    case "thumbnail":
      return {
        ...state,
        thumbnail: action.value,
      };
    case "publishBtnDisabled":
      return {
        ...state,
        publishDisabled: action.value,
      };
    case "isLoading":
      return {
        ...state,
        loading: true,
      };
    case "notLoading":
      return {
        ...state,
        loading: false,
      };
    case "reset":
      return {
        title: "",
        titleError: null,
        titleClicked: false,
        description: "",
        descriptionError: null,
        descriptionClicked: false,
        postIntroduction: "",
        postIntroductionError: null,
        postIntroductionClicked: false,
        thumbnail: null,
        tags: "",
        tagsError: null,
        tagsClicked: false,
        body: "",
        bodyErorr: null,
        bodyClicked: false,
        loading: false,
        readTime: 1,
      };
    default:
      return { ...state };
  }
};

const CreatePost = () => {
  const state = useLocation().state;
  const blogData = state ? state.blogData : null;

  const [updateImage, setUpdateImage] = useState(false);

  const [blogForm, blogDispatch] = useReducer(
    blogReducer,
    blogData
      ? {
          title: blogData.title,
          titleError: null,
          titleClicked: false,
          description: blogData.description,
          descriptionError: null,
          descriptionClicked: false,
          postIntroduction: blogData.postIntroduction,
          postIntroductionError: null,
          postIntroductionClicked: false,
          thumbnail: blogData.thumbnail,
          tags: blogData.tags.join(" "),
          tagsError: null,
          tagsClicked: false,
          body: blogData.body,
          bodyErorr: null,
          bodyClicked: false,
          loading: false,
          readTime: blogData.readTime,
          readTimeClicked: false,
          readTimeError: null,
        }
      : {
          title: "",
          titleError: null,
          titleClicked: false,
          description: "",
          descriptionError: null,
          descriptionClicked: false,
          postIntroduction: "",
          postIntroductionError: null,
          postIntroductionClicked: false,
          thumbnail: null,
          tags: "",
          tagsError: null,
          tagsClicked: false,
          body: "",
          bodyErorr: null,
          bodyClicked: false,
          loading: false,
          readTime: 1,
          readTimeClicked: false,
          readTimeError: null,
        }
  );

  useEffect(() => {
    if (!blogData) {
      blogDispatch({ type: "reset" });
    }
  }, [blogData]);

  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (!userInfo.id) {
      navigate("/signIn");
    }
  }, [userInfo.id]);

  const {
    title,
    titleClicked,
    titleError,
    description,
    descriptionClicked,
    descriptionError,
    postIntroduction,
    postIntroductionClicked,
    postIntroductionError,
    tags,
    tagsClicked,
    tagsError,
    body,
    bodyClicked,
    bodyError,
    loading,
    thumbnail,
    readTime,
    readTimeError,
    readTimeClicked,
  } = blogForm;

  useEffect(() => {
    const timeout = setTimeout(() => {
      formValidation();
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [
    title,
    titleClicked,
    titleError,
    description,
    descriptionClicked,
    descriptionError,
    body,
    bodyClicked,
    bodyError,
    tags,
    tagsClicked,
    tagsError,
    postIntroduction,
    postIntroductionClicked,
    postIntroductionError,
    readTime,
    readTimeClicked,
    readTimeError,
  ]);

  const formValidation = () => {
    titleClicked && title.trim().length <= 0
      ? blogDispatch({ type: "titleError", value: "The title field is empty" })
      : blogDispatch({ type: "titleError", value: null });
    descriptionClicked && description.trim().length <= 0
      ? blogDispatch({
          type: "descriptionError",
          value: "The description field is empty",
        })
      : blogDispatch({ type: "descriptionError", value: null });
    postIntroductionClicked && postIntroduction.trim().length <= 0
      ? blogDispatch({
          type: "postIntroductionError",
          value: "The post introduction field is empty",
        })
      : blogDispatch({ type: "postIntroductionError", value: null });
    tagsClicked && tags.trim().length <= 0
      ? blogDispatch({ type: "tagsError", value: "The tag field is empty" })
      : blogDispatch({ type: "tagsError", value: null });
    bodyClicked && body.trim().length <= 0
      ? blogDispatch({ type: "bodyError", value: "The body field is empty" })
      : blogDispatch({ type: "bodyError", value: null });
    readTimeClicked && Number(readTime) <= 0
      ? blogDispatch({
          type: "readTimeError",
          value: "The read time should me 1 minute minimum",
        })
      : blogDispatch({ type: "readTimeError", value: null });

    const disabled =
      titleError == null &&
      readTimeError == null &&
      descriptionError == null &&
      postIntroductionError == null &&
      tagsError == null &&
      bodyError == null &&
      title &&
      description &&
      body &&
      postIntroduction &&
      readTime &&
      tags
        ? false
        : true;
    blogDispatch({ type: "publishBtnDisabled", value: disabled });
  };

  const blurHandler = (event) => {
    const id = event.target.id;
    blogDispatch({ type: `${id}Clicked` });
  };

  const onSubmitHandler = async () => {
    blogDispatch({ type: "isLoading" });

    const titleArr = [];
    const descriptionArr = [];

    title
      .trim()
      .toLowerCase()
      .split(" ")
      .forEach((word) => {
        if (!stopWords.includes(word.toLowerCase())) {
          titleArr.unshift(word);
        }
      });

    description
      .trim()
      .toLowerCase()
      .split(" ")
      .forEach((word) => {
        if (!stopWords.includes(word.toLowerCase())) {
          descriptionArr.unshift(word);
        }
      });

    const docRef = await addDoc(collection(db, "blogs"), {
      title: title.trim(),
      titleLower: title.trim().toLowerCase(),
      titleArray: titleArr,
      description: description.trim(),
      postIntroduction,
      descriptionLower: description.trim().toLowerCase(),
      descriptionArray: descriptionArr,
      postIntroduction: postIntroduction.trim(),
      body: body.trim(),
      tags: tags.trim().toLowerCase().split(" "),
      createdAt: serverTimestamp(),
      createdBy: {
        name: userInfo.name,
        userID: userInfo.id,
        avatar: userInfo.avatar,
      },
      likes: 0,
      likedBy: [],
      readTime: Number(readTime),
    });

    await updateDoc(doc(db, "blogs", docRef.id), {
      blogID: docRef.id,
    });

    if (thumbnail) {
      const imageName = thumbnail.name + new Date().getTime();

      const thumbnailRef = ref(storage, `Thumbnails/${imageName}`);

      await updateDoc(doc(db, "blogs", docRef.id), {
        thumbnailRef: `Thumbnails/${imageName}`,
      });

      const uploadTask = uploadBytesResumable(thumbnailRef, thumbnail);

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
            await updateDoc(doc(db, "blogs", docRef.id), {
              thumbnail: downloadURL,
            });
            await updateDoc(doc(db, "user-info", userInfo.id), {
              post: arrayUnion(docRef.id),
            });
            blogDispatch({ type: "notLoading" });
            blogDispatch({ type: "reset" });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "user-info", userInfo.id), {
        post: arrayUnion(docRef.id),
      });
      blogDispatch({ type: "notLoading" });
      blogDispatch({ type: "reset" });
    }
  };

  const onUpdateHandler = async () => {
    blogDispatch({ type: "isLoading" });

    const titleArr = [];
    const descriptionArr = [];

    title
      .trim()
      .toLowerCase()
      .split(" ")
      .forEach((word) => {
        if (!stopWords.includes(word.toLowerCase())) {
          titleArr.unshift(word);
        }
      });

    description
      .trim()
      .toLowerCase()
      .split(" ")
      .forEach((word) => {
        if (!stopWords.includes(word.toLowerCase())) {
          descriptionArr.unshift(word);
        }
      });

    const docRef = doc(db, "blogs", blogData.blogID);

    await updateDoc(docRef, {
      title: title.trim(),
      titleLower: title.trim().toLowerCase(),
      titleArray: titleArr,
      description: description.trim(),
      postIntroduction,
      descriptionLower: description.trim().toLowerCase(),
      descriptionArray: descriptionArr,
      postIntroduction: postIntroduction.trim(),
      body: body.trim(),
      tags: tags.trim().toLowerCase().split(" "),
      createdBy: {
        name: userInfo.name,
        userID: userInfo.id,
        avatar: userInfo.avatar,
      },
      readTime: Number(readTime),
    });

    if (thumbnail && updateImage) {
      const thumbnailRef = blogData.thumbnailRef
        ? blogData.thumbnailRef
        : `Thumbnails/${thumbnail.name + new Date().getTime()}`;

      const uploadTask = uploadBytesResumable(
        ref(storage, thumbnailRef),
        thumbnail
      );

      await updateDoc(doc(db, "blogs", blogData.blogID), {
        thumbnailRef: thumbnailRef,
      });

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
            await updateDoc(doc(db, "blogs", blogData.blogID), {
              thumbnail: downloadURL,
            });
            blogDispatch({ type: "notLoading" });
            navigate(-1);
          });
        }
      );
    } else {
      blogDispatch({ type: "notLoading" });
      navigate(-1);
    }
  };

  return (
    <section className="create-post">
      <Navbar />
      <div className="create-post-container">
        <h1>{blogData ? "UPDATE POST" : "NEW POST"}</h1>
        <span
          onClick={() => {
            navigate(-1);
          }}
        >
          BACK
        </span>
        {loading && <Loader />}
        <div className={`post-blog ${loading ? "none" : null}`}>
          <div className="blog-info">
            <div className="sub">
              <LabelInput
                onBlur={(event) => {
                  blurHandler(event);
                }}
                label="Title"
                type="text"
                id="title"
                placeholder="Write Your Post Title Here..."
                onChange={(event) => {
                  blogDispatch({ type: "title", value: event.target.value });
                }}
                error={titleError}
                value={title}
              />
              <LabelInput
                onBlur={(event) => {
                  blurHandler(event);
                }}
                label="Description"
                type="text-area"
                id="description"
                placeholder="Give a breif Description for your Article. Give a glimpse of what users can except from your post.."
                onChange={(event) => {
                  blogDispatch({
                    type: "description",
                    value: event.target.value,
                  });
                }}
                error={descriptionError}
                value={description}
              />
            </div>

            <LabelInput
              onBlur={(event) => {
                blurHandler(event);
              }}
              label="Post Introduction"
              type="text-area"
              id="post-introduction"
              placeholder="Give a introduction for your articles."
              onChange={(event) => {
                blogDispatch({
                  type: "post-introduction",
                  value: event.target.value,
                });
              }}
              error={postIntroductionError}
              value={postIntroduction}
            />
          </div>
          <div className="blog-img">
            {useMemo(() => {
              return (
                <LabelInput
                  style={{
                    background: blogData
                      ? blogData.thumbnail
                        ? !updateImage
                          ? `url(${blogData.thumbnail}) no-repeat center center / cover`
                          : `url("${URL.createObjectURL(
                              thumbnail
                            )}") no-repeat center center / cover`
                        : !updateImage
                        ? `url(${thumbnailDummy}) no-repeat center center / cover`
                        : `url("${URL.createObjectURL(
                            thumbnail
                          )}") no-repeat center center / cover`
                      : thumbnail
                      ? `url("${URL.createObjectURL(
                          thumbnail
                        )}") no-repeat center center / cover`
                      : `url(${thumbnailDummy}) no-repeat center center / cover`,
                  }}
                  label="Post Image"
                  type="file"
                  id="thumbnail"
                  value={thumbnail}
                  onChange={(event) => {
                    blogDispatch({
                      type: "thumbnail",
                      value: event.target.files[0],
                    });
                    setUpdateImage(true);
                  }}
                />
              );
            }, [blogForm.thumbnail])}
            <div className="sub">
              <div className="input-list">
                <label htmlFor="category">Tags / Categories</label>
                <input
                  id="tags"
                  onBlur={(event) => {
                    blurHandler(event);
                  }}
                  list="category"
                  placeholder="Choose or write one of your own"
                  onChange={(event) => {
                    blogDispatch({ type: "tags", value: event.target.value });
                  }}
                  value={tags}
                />
                <span>{tagsError}</span>
                <datalist id="category">
                  <option value="ACADEMIC" />
                  <option value="TECHNOLOGY" />
                  <option value="GAMES" />
                  <option value="TV-&-MOVIES" />
                  <option value="HEALTH" />
                  <option value="SPORTS" />
                </datalist>
              </div>
              <LabelInput
                onBlur={(event) => {
                  blurHandler(event);
                }}
                label="Read Time"
                placeholder="In Min"
                type="number"
                id="readTime"
                onChange={(event) => {
                  blogDispatch({ type: "readTime", value: event.target.value });
                }}
                error={readTimeError}
                value={Number(readTime)}
                min={1}
              />
            </div>
          </div>
          <div className="blog-body">
            <LabelInput
              onBlur={(event) => {
                blurHandler(event);
              }}
              label="Post Body"
              placeholder="Post Body..."
              type="text-area"
              id="body"
              onChange={(event) => {
                blogDispatch({ type: "body", value: event.target.value });
              }}
              error={bodyError}
              value={body}
            />
          </div>
        </div>
        <Button
          disabled={blogForm.publishDisabled}
          onClick={blogData ? onUpdateHandler : onSubmitHandler}
        >
          {blogData ? "UPDATE" : "PUBLISH"}
        </Button>
      </div>
      <Footer />
    </section>
  );
};

export default CreatePost;
