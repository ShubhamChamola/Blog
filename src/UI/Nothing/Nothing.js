import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./Nothing.scss";

const Nothing = () => {
  const navigate = useNavigate();
  return (
    <div className="nothing">
      <p>Their is no blog related to your search, create one now</p>
      <Button
        onClick={() => {
          navigate("/createPost");
        }}
      >
        Create
      </Button>
    </div>
  );
};

export default Nothing;
