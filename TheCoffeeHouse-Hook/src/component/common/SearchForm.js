import React from "react";
import InputSearch from "../common/Input";
function SearchForm(props) {
  function noneSubmit(e) {
    e.preventDefault();
  }
  return (
    <form
      action=""
      className={props.className}
      onSubmit={(e) => {
        noneSubmit(e);
      }}
      onClick={props.onClick}
      onBlur={props.onBlur}
      autoComplete="off"
    >
      <i className={props.icon}></i>
      <InputSearch
        type={props.type}
        classInput={props.classInput}
        placeholder={props.placeholder}
        value={props.value}
        className={props.classInput}
        name={props.name}
        onChange={props.onChange}
      />
    </form>
  );
}

export default SearchForm;
