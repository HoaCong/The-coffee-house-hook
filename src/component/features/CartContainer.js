import React from "react";
import Button from "../common/Button";
import Price from "../common/Price";
function CartContainer(props) {
  let feeShip = 0;
  return (
    <section className={props.classCart}>
      <div className="main_cart">
        <div className="box_order">
          <Button
            className="seecart"
            disabled={props.totalAmount > 0 ? false : true}
          >
            Xem giỏ hàng
          </Button>
        </div>
        <div className="box_order list_order">
          {props.listOrder != null
            ? props.listOrder.map((item, index) => (
                <div
                  className="ele_order item_order"
                  key={index}
                  onClick={() => props.editItemOrder(item, index)}
                >
                  <div className="ele_order box_item_order">
                    <div className="item_amount">{item.amount}</div>
                    <div className="">
                      <h4 className="item_name">{item.product_name}</h4>
                      <p className="list_option">
                        {item.size}
                        {item.topping.map((item) => " + " + item)}
                      </p>
                      <p className="list_option">{item.description}</p>
                    </div>
                  </div>
                  <div className="price">
                    <Price
                      className="no-margin"
                      price={(item.price + item.priceTopping) * item.amount}
                      unit="đ"
                    />
                  </div>
                </div>
              ))
            : null}
          <div className="ele_order">
            <div>Cộng ({props.totalAmount} món)</div>
            <div>
              <Price className="no-margin" price={props.totalPrice} unit="đ" />
            </div>
          </div>
          <div className="ele_order">
            <div>Vận chuyển</div>
            <div>
              <Price
                className="no-margin"
                price={
                  props.totalPrice >= 50000 ? (feeShip = 0) : (feeShip = 10000)
                }
                unit="đ"
              />
            </div>
          </div>
          <div className="ele_order">
            <form action="" className="order_input">
              <input
                className="no-padding-l"
                type="text"
                placeholder="Nhập mã ưu đãi tại đây"
              />
            </form>
            <Button> Áp dụng</Button>
          </div>
        </div>
        <div className="box_order ele_order none_border">
          <div>Tổng cộng</div>
          <div>
            <Price
              className="no-margin strong"
              price={props.totalPrice + feeShip}
              unit="đ"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export default CartContainer;
