import React, { useEffect, useState } from "react";
import callApi from "../callApi";
import CartContainer from "../features/CartContainer";
import ListCategory from "../features/ListCategory";
import MenuContainer from "../features/MenuContainer";
import OrderContainer from "../features/OrderContainer";
import CateLoading from "../placeholder/CategoriesLoading";
import MenuLoading from "../placeholder/MenuLoading";
import SearchNoneData from "../../img/search.png";
import { compareArr, mergeData } from "../assets/helpers";

function Body({ getAmount }) {
  //fetch API
  const [isLoaded, setIsLoaded] = useState(false);
  const [allData, setAllData] = useState([]);
  const [active, setActive] = useState(null);
  const [menu, setMenu] = useState([]);

  // Order
  const [detailOrder, setDetailOrder] = useState({});
  const [itemOrder, setItemOrder] = useState({});
  const [listOrder, setListOrder] = useState([]);
  const [openOrder, setOpenOrder] = useState(false);
  const [indexItem, setIndexItem] = useState(-1);

  //     // totalAmount&Price
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  function resetIndexItem() {
    setIndexItem(-1);
  }
  function getAmountOrder(data) {
    let totalAmount = 0,
      totalPrice = 0;
    data.forEach(
      (item) =>
        (totalAmount += item.amount) && (totalPrice += item.price * item.amount)
    );
    getAmount(totalAmount);
    setTotalAmount(totalAmount);
    setTotalPrice(totalPrice);
  }
  const addToCart = (order) => {
    const tmpOrder = { ...order };
    let tmpListOrder = [...listOrder];
    let addOrEdit = 1;
    if (indexItem !== -1) {
      tmpListOrder = tmpListOrder.filter((item, index) => index !== indexItem);
    }
    tmpListOrder.map((item) =>
      item._id === tmpOrder._id &&
      item.size === tmpOrder.size &&
      item.desc === tmpOrder.desc &&
      compareArr(item.topping, tmpOrder.topping)
        ? ((item.amount += tmpOrder.amount),
          (item.price = tmpOrder.price),
          (item.priceTopping = tmpOrder.priceTopping),
          (item.desc = tmpOrder.desc),
          (addOrEdit *= -1))
        : (addOrEdit *= 1)
    );
    if (addOrEdit === 1) {
      tmpListOrder = [...tmpListOrder, order].filter((item) => item.amount > 0);
    }
    setListOrder(tmpListOrder);
    localStorage.setItem("cartOrder", JSON.stringify(tmpListOrder));
    getAmount(tmpListOrder);
    resetIndexItem();
  };
  const toogleOrder = (data) => {
    setOpenOrder(!openOrder);
    setItemOrder(data);
    setDetailOrder({});
    resetIndexItem();
  };
  const editItemOrder = (order, index) => {
    const itemEdit = menu.find((item) => item._id === order._id);
    setOpenOrder(!openOrder);
    setItemOrder(itemEdit);
    setIndexItem(index);
    setDetailOrder(order);
  };

  useEffect(() => {
    callApi(`v2/category/web`, "GET", null).then((categories) => {
      callApi(`v2/menu`, "GET", null).then((menus) => {
        const newData = mergeData(categories.data, menus.data.data);
        setAllData(newData);
        setMenu(menus.data.data);
        setIsLoaded(true);
        setActive(newData[0].id);
      });
    });
    const cartOrder = localStorage.getItem("cartOrder");
    if (cartOrder) {
      setListOrder(JSON.parse(cartOrder));
      getAmountOrder(JSON.parse(cartOrder));
    }
  }, []);

  if (!isLoaded) {
    return (
      <div className="main">
        <CateLoading classList="categories" />
        <MenuLoading classMenu="products" />
        <CartContainer
          classCart="cart"
          listOrder={listOrder}
          editItemOrder={editItemOrder}
          totalPrice={totalPrice}
          totalAmount={totalAmount}
        />
      </div>
    );
  } else if (allData.length === 0) {
    return (
      <div className="none_data no_date_call">
        <img src={SearchNoneData} alt="Logo Cửa Hàng" className="logo" />
        <div className="none_data_error">
          Rất tiếc chúng tôi không tìm thấy sản phẩm!
        </div>
      </div>
    );
  } else {
    return (
      <div className="main">
        <ListCategory
          classList="categories"
          ConcatList={allData}
          active={active}
        />
        <MenuContainer
          classMenu="products"
          ConcatList={allData}
          active={active}
          toogleOrder={toogleOrder}
        />
        {openOrder ? (
          <OrderContainer
            toogleOrder={toogleOrder}
            addToCart={addToCart}
            itemOrder={itemOrder}
            {...detailOrder}
          />
        ) : null}
        <CartContainer
          classCart="cart"
          listOrder={listOrder}
          editItemOrder={editItemOrder}
          totalPrice={totalPrice}
          totalAmount={totalAmount}
        />
      </div>
    );
  }
}
export default Body;
