import React from "react";
function SearchForm(props) {
  const { propsForm, icon, propsInput } = props;
  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
      }}
      autoComplete="off"
      {...propsForm}
    >
      <i className={icon}></i>
      <input {...propsInput} />
    </form>
  );
}

export default SearchForm;
