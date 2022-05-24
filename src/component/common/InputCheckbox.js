import React from "react";
import Price from "../common/Price";

function InputCheckbox(props) {
  const { checked, type, id, name, value, onClick, nameOption, price } = props;
  return (
    <div className="ele_radio">
      <input
        defaultChecked={checked}
        type={type}
        id={id}
        name={name}
        value={value}
        onClick={onClick}
      />
      <label htmlFor={id}>
        <span>{nameOption}</span>&nbsp;
        {price > 0 ? (
          <span>
            (+ <Price className="no-margin" price={price} unit="đ" />)
          </span>
        ) : null}
      </label>
    </div>
  );
}
export default InputCheckbox;
