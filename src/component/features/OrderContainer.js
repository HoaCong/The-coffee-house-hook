import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import InputCheckbox from "../common/InputCheckbox";
import Price from "../common/Price";
import SearchForm from "../common/SearchForm";
function OrderContainer(props) {
  const { toogleOrder, addToCart, itemOrder } = props;
  const [size, setSize] = useState(props.size);
  const [topping, setTopping] = useState(props.topping || []);
  const [desc, setDesc] = useState(props.desc || "");
  const [amount, setAmount] = useState(props.amount || 1);
  const [price, setPrice] = useState(props.price || itemOrder.price);
  const [priceTopping, setPriceTopping] = useState(props.priceTopping || 0);
  const setItemOrder = (data) => {
    toogleOrder(data);
  };
  function addOrder() {
    addToCart({
      _id: props.itemOrder._id,
      product_name: props.itemOrder.product_name,
      size,
      topping,
      desc,
      amount,
      priceTopping,
      price,
    });
    setItemOrder({});
  }
  const calAmount = (data) => {
    let tmpamount = amount + data;
    if (tmpamount < 1) tmpamount = 0;
    setAmount(tmpamount);
  };
  const changeStateSize = (size, price) => {
    setSize(size);
    setPrice(price);
  };
  const changeStateTopping = (name, price) => {
    let tmp = [...topping];
    let tmpPrice = 0;
    topping.includes(name)
      ? (tmp = topping.filter((item) => item !== name)) &&
        (tmpPrice = priceTopping - price)
      : tmp.push(name) && (tmpPrice = priceTopping + price);
    setTopping(tmp);
    setPriceTopping(tmpPrice);
  };
  function getDesc(e) {
    setDesc(e.target.value);
  }

  useEffect(() => {
    if (!size) {
      let b = document.querySelector("input[checked]").getAttribute("value");
      if (b != null) setSize(b, price);
    }
  }, []);

  return (
    <div className="order_container">
      <div className="order_overlay" onClick={() => setItemOrder(0)}></div>
      <div className="order_form">
        <i
          className="fas fa-times btn_close_order"
          onClick={() => setItemOrder(0)}
        ></i>
        <div className="head_order">
          <img className="thumbnail" src={itemOrder.image} alt="Ảnh sản phẩm" />
          <article>
            <h4 className="name_product">{itemOrder.product_name}</h4>
            <p className="current_option">{size}</p>
            <p className="current_option">
              {topping.map((item, index) => (index > 0 ? " + " : "") + item)}
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
                    checked={topping.includes(item.product_name) ? true : false}
                    type="checkbox"
                    id={item.code}
                    name="topping"
                    value={item.code}
                    onClick={() =>
                      changeStateTopping(item.product_name, item.price)
                    }
                    nameOption={item.product_name}
                    price={item.price}
                  />
                ))}
              </div>
              <hr />
            </div>
          ) : null}
          <SearchForm
            propsForm={{ className: "order_input order_desc" }}
            icon="fas fa-pencil-alt"
            propsInput={{
              type: "text",
              name: "description",
              placeholder: "Thêm ghi chú món này",
              value: desc || "",
              onChange: (e) => getDesc(e),
            }}
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
          <Button className="seecart" onClick={() => addOrder()}>
            <div className="btn_add_cart">
              <div className="add_cart">Thêm vào giỏ</div>
              <Price
                className="no-margin price_cart"
                price={(price + priceTopping) * amount}
                unit="đ"
              />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
export default OrderContainer;
