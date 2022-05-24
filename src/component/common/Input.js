import React from "react";

function Input(props) {
  return (
    <input
      value={props.value}
      className={props.classInput}
      type={props.type}
      placeholder={props.placeholder}
      name={props.name}
      onChange={props.onChange}
      maxLength={props.maxLength}
      min={props.min}
    />
  );
}

export default Input;
