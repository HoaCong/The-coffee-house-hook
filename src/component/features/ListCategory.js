import React from "react";
import ItemCategory from "./ItemCategory";
function ListCategory(props) {
  return (
    <section className={props.classList}>
      <ul>
        <ItemCategory
          CatList={props.ConcatList}
          changeActive={props.changeActive}
          active={props.active}
        />
      </ul>
    </section>
  );
}

export default ListCategory;
