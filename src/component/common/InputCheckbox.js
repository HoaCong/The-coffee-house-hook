import React from "react";
import Price from "../common/Price";

function InputCheckbox(props) {
  return (
    <div className="ele_radio" style={props.style}>
      <input
        defaultChecked={props.checked}
        type={props.type}
        id={props.id}
        name={props.name}
        value={props.value}
        onClick={props.onClick}
      />
      <label htmlFor={props.id} className="ele_radio">
        <span>{props.nameOption}</span>&nbsp;
        {props.price > 0 ? (
          <span className="order_amount">
            (+
            <Price className="no-margin" price={props.price} unit="đ" />)
          </span>
        ) : null}
      </label>
    </div>
  );
}

export default InputCheckbox;
