import React from "react";

function Button(props) {
  return (
    <button
      className={"" + props.className}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.Text}
    </button>
  );
}

export default Button;
