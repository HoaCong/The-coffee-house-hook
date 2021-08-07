import React from "react";
import ItemProduct from "./ItemProduct";

function ShowListProduct(props) {
  const product = props.ProductList;
  const keyword = props.KeyWord;
  const list = product.ListProduct.filter((e) =>
    e.product_name.toLowerCase().includes(keyword.toLowerCase())
  );
  if (list.length === 0) {
    return null;
  }
  return (
    <div className="box_cat_product" key={list.id} id={props.catID}>
      <div key={list.id} className="name_category">
        {props.category}
      </div>
      <ItemProduct
        key={list.id}
        ProductList={list}
        toogleOrder={props.toogleOrder}
      />
    </div>
  );
}
export default ShowListProduct;
