import React from "react";

function Price({ className, price, unit }) {
  return (
    <span className={className}>
      {price} <u>{unit}</u>
    </span>
  );
}

export default Price;
