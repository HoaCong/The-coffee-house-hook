import React from "react";

function Price(props) {
  return (
    <p className={props.className}>
      {props.price} <u>{props.unit}</u>
    </p>
  );
}

export default Price;
