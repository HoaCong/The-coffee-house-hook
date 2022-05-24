import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import ListProduct from "./ListProduct";
function MenuContainer(props) {
  const [keyword, setKeyword] = useState("");
  function getKeyWord(data) {
    setKeyword(data);
  }
  function handleValue(e) {
    getKeyWord(e.target.value);
  }

  function activeElement(data) {
    if (document.querySelectorAll(".active-cat").length > 0) {
      document.querySelector(".active-cat").classList.remove("active-cat");
    }
    document.getElementById("cate" + data).classList.add("active-cat");
  }
  function windowScroll() {
    let NodeList = document.querySelectorAll(".box_cat_product");
    let yWindow = window.scrollY + 76; // "+76" vì set height khi chia layout
    NodeList.forEach((e) =>
      document.getElementById(e.id).offsetTop <= yWindow &&
      yWindow <=
        document.getElementById(e.id).offsetTop +
          document.getElementById(e.id).offsetHeight
        ? activeElement(e.id)
        : null
    );
  }
  useEffect(() => {
    window.addEventListener("scroll", windowScroll);
    return () => {
      window.removeEventListener("scroll", windowScroll);
    };
  }, []);

  return (
    <section className={props.classMenu}>
      <SearchForm
        propsForm={{ className: "order_input" }}
        icon="fas fa-search"
        propsInput={{
          type: "text",
          placeholder: "Tìm kiếm sản phẩm",
          onChange: (e) => handleValue(e),
        }}
      />

      <ListProduct
        ProductList={props.ConcatList}
        KeyWord={keyword}
        toogleOrder={props.toogleOrder}
      />
    </section>
  );
}
export default MenuContainer;
