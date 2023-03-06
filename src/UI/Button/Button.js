import "./Button.scss";
const Button = (props) => {
  return (
    <div className="btn" style={props.style}>
      <button
        disabled={props.disabled}
        className={props.className}
        onClick={props.onClick}
      >
        {props.children}
      </button>
      <img src={props.icon} />
    </div>
  );
};

export default Button;
