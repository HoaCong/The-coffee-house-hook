import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import Image from "../common/Image";
import InputCheckbox from "../common/InputCheckbox";
import Price from "../common/Price";
import SearchForm from "../common/SearchForm";
function OrderContainer(props) {
  const [size, setSize] = useState(props.size);
  const [topping, setTopping] = useState(props.topping);
  const [desc, setDesc] = useState(props.desc);
  const [amount, setAmount] = useState(props.amount);
  const [price, setPrice] = useState(props.price);
  const [priceTopping, setPriceTopping] = useState(props.priceTopping);
  function setItemOrder(data) {
    props.toogleOrder(data);
  }
  function addOrder() {
    props.addToCart(
      props.itemOrder._id,
      props.itemOrder.product_name,
      size,
      topping,
      desc,
      amount,
      priceTopping,
      price
    );
    setItemOrder(0);
  }
  function calAmount(data) {
    let tmpamount = amount + data;
    if (tmpamount < 1) {
      setAmount(0);
    } else {
      setAmount(tmpamount);
    }
  }
  function changeStateSize(size, price) {
    setSize(size);
    setPrice(price);
  }
  function changeStateTopping(data) {
    let tmp = [...topping];
    topping.includes(data.code)
      ? (tmp = topping.filter((item) => item !== data.code)) &&
        setTopping(tmp) &&
        setPriceTopping(priceTopping - data.price)
      : tmp.push(data.code) &&
        setTopping(tmp) &&
        setPriceTopping(priceTopping + data.price);
  }
  function getDesc(e) {
    setDesc(e.target.value);
  }

  useEffect(() => {
    if (size === null) {
      let b = document.querySelector("input[checked]").getAttribute("value");
      if (b != null) setSize(b, price);
    }
  }, []);

  const itemOrder = props.itemOrder;
  return (
    <div className="order_container">
      <div className="order_overlay" onClick={() => setItemOrder(0)}></div>
      <div className="order_form">
        <i
          className="fas fa-times btn_close_order"
          onClick={() => setItemOrder(0)}
        ></i>
        <div className="head_order">
          <Image Size="thumbnail" Src={itemOrder.image} Alt="Ảnh sản phẩm" />
          <article>
            <h4 className="name_product">{itemOrder.product_name}</h4>
            <p className="current_option">{size}</p>
            <p className="current_option">
              {itemOrder.topping_list.map((item, index) =>
                topping.includes(item.code)
                  ? item.product_name +
                    (index < topping.length - 1 ? " + " : "")
                  : null
              )}
            </p>
          </article>
        </div>
        <hr />
        <div className="body_order">
          <p>Loại</p>
          {itemOrder.variants.length > 0 ? (
            <div>
              <p>Size -</p>
              <div className="radio_order">
                {itemOrder.variants.map((item, index) => (
                  <InputCheckbox
                    key={index}
                    checked={size === item.val ? true : index === 0}
                    style={{ order: item.price }}
                    type="radio"
                    id={item.code}
                    name="size"
                    value={item.val}
                    onClick={() => changeStateSize(item.val, item.price)}
                    nameOption={item.val}
                    price={item.price - itemOrder.price}
                  />
                ))}
              </div>
              <hr />
            </div>
          ) : null}
          {itemOrder.topping_list.length > 0 ? (
            <div>
              <p>Topping -</p>
              <div className="radio_order">
                {itemOrder.topping_list.map((item, index) => (
                  <InputCheckbox
                    key={index}
                    checked={topping.includes(item.code) ? true : false}
                    type="checkbox"
                    id={item.code}
                    name="topping"
                    value={item.code}
                    onClick={() => changeStateTopping(item)}
                    nameOption={item.product_name}
                    price={item.price}
                  />
                ))}
              </div>
              <hr />
            </div>
          ) : null}
          <SearchForm
            className="order_input order_desc"
            icon="fas fa-pencil-alt"
            type="text"
            placeholder="Thêm ghi chú món này"
            name="description"
            value={desc || ""}
            onChange={(e) => getDesc(e)}
          />
        </div>
        <hr />
        <div className="foot_order">
          <div className="order_amount">
            <i
              className="fas fa-minus-circle"
              onClick={() => calAmount(-1)}
            ></i>
            <div className="amount">{amount}</div>
            <i className="fas fa-plus-circle" onClick={() => calAmount(1)}></i>
          </div>
          <Button
            className="seecart"
            onClick={() => addOrder()}
            Text={
              <div className="btn_add_cart">
                <div className="add_cart">Thêm vào giỏ</div>
                <Price
                  className="no-margin price_cart"
                  price={(price + priceTopping) * amount}
                  unit="đ"
                />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}
export default OrderContainer;
