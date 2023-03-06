import "./Input.scss";

const Input = (props) => {
  const c = props.className ? props.className + " input" : "input";
  return (
    <div className={c}>
      <input
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      <img src={props.icon} />
    </div>
  );
};

export default Input;
