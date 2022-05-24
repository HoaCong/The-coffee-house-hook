import React from "react";
import Price from "../common/Price";
function ItemProduct(props) {
  function setItemOrder(data) {
    props.toogleOrder(data);
  }
  const product = props.ProductList;
  return product.map((item) => (
    <div className="ele_product" key={item._id}>
      <img className="thumbnail" src={item.image} alt={item.product_name} />
      <article>
        <h4>{item.product_name}</h4>
        <p className="description">{item.description}</p>
        <Price price={item.price} unit="đ" />
        <i
          className="fas fa-plus-circle"
          onClick={() => setItemOrder(item)}
        ></i>
      </article>
    </div>
  ));
}

export default ItemProduct;
