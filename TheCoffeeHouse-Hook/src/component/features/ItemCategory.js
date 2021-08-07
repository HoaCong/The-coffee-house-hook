import React from "react";
function ItemCategory(props) {
  return props.CatList.map((item) =>
    item.ListProduct.length > 0 ? (
      <li key={item._id}>
        <a
          href={"#" + item.id}
          id={"cate" + item.id}
          className={item.id === props.active ? "active-cat" : null}
        >
          {item.name}
        </a>
      </li>
    ) : null
  );
}
export default ItemCategory;
