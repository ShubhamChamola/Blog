import "./LabelInput.scss";
import { useState } from "react";
import Button from "../Button/Button";

const LabelInput = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="labeled-input">
      <label htmlFor={props.id}>{props.label}</label>
      {props.type != "text-area" ? (
        props.type != "file" ? (
          <input
            className={props.error ? "error" : null}
            onBlur={props.onBlur}
            type={
              props.id == "password"
                ? showPassword
                  ? "text"
                  : props.type
                : props.type
            }
            min={props.min}
            onChange={props.onChange}
            id={props.id}
            placeholder={props.placeholder}
            value={props.value}
          />
        ) : (
          <div className="file-type" style={props.style}>
            <Button>
              <label htmlFor={props.id}> UPLOAD </label>
            </Button>
            <input id={props.id} onChange={props.onChange} type="file" />
          </div>
        )
      ) : (
        <textarea
          onChange={props.onChange}
          onBlur={props.onBlur}
          id={props.id}
          placeholder={props.placeholder}
          value={props.value}
          onKeyDown={props.onKeyDown}
        ></textarea>
      )}
      <span>{props.error}</span>
      {props.icon ? (
        <props.icon
          style={{ opacity: showPassword ? "1" : ".3" }}
          onClick={() => {
            setShowPassword((prev) => {
              return !prev;
            });
          }}
          src={props.icon}
        />
      ) : null}
    </div>
  );
};

export default LabelInput;
