import React, { useEffect, useState } from "react";
import callApi from "../callApi";
import CartContainer from "../features/CartContainer";
import ListCategory from "../features/ListCategory";
import MenuContainer from "../features/MenuContainer";
import OrderContainer from "../features/OrderContainer";
import CateLoading from "../placeholder/CategoriesLoading";
import MenuLoading from "../placeholder/MenuLoading";

function Body(props) {
  //fetch API
  const [isLoaded, setIsLoaded] = useState(false);
  const [allData, setAllData] = useState([]);
  const [active, setActive] = useState(null);
  const [menu, setMenu] = useState([]);
  //     // Order
  const [order, setOrder] = useState(false);
  const [itemOrder, setItemOrder] = useState([]);
  const [listOrder, setListOrder] = useState([]);
  const [size, setSize] = useState(null);
  const [topping, setTopping] = useState([]);
  const [desc, setDesc] = useState(null);
  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState(null);
  const [indexItem, setIndexItem] = useState(-1);
  const [priceTopping, setPriceTopping] = useState(null);
  //     // totalAmount&Price
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  function resetIndexItem() {
    setIndexItem(-1);
  }
  function getAmountOrder(data) {
    let totalAmount = 0,
      totalPrice = 0;
    data.map(
      (item) =>
        (totalAmount += item.amount) && (totalPrice += item.price * item.amount)
    );
    props.getAmount(totalAmount);
    setTotalAmount(totalAmount);
    setTotalPrice(totalPrice);
  }
  function addToCart(
    _id,
    product_name,
    size,
    topping,
    description,
    amount,
    priceTopping,
    price
  ) {
    let obj = {
      _id,
      product_name: product_name,
      topping_list: itemOrder.topping_list,
      size: size,
      topping: topping,
      description: description,
      amount: amount,
      priceTopping: priceTopping,
      price: price,
    };

    let tmpCart = listOrder;
    if (indexItem !== -1) {
      tmpCart = tmpCart.filter((item, index) => index !== indexItem);
    }
    let addOrEdit = 1;
    tmpCart.map((item) =>
      item._id === _id &&
      item.size === size &&
      item.description === description &&
      (item.topping.length > 1
        ? item.topping.length === topping.length
        : JSON.stringify(item.topping) === JSON.stringify(topping))
        ? ((item.amount += amount),
          (item.price = price),
          (item.priceTopping = priceTopping),
          (addOrEdit *= -1),
          (item.description = description))
        : (addOrEdit *= 1)
    );
    if (addOrEdit === 1) {
      setListOrder([...tmpCart, obj].filter((item) => item.amount > 0));
      localStorage.setItem(
        "cartOrder",
        JSON.stringify([...tmpCart, obj].filter((item) => item.amount > 0))
      );
      getAmountOrder([...tmpCart, obj].filter((item) => item.amount > 0));
    } else {
      setListOrder(tmpCart);
      localStorage.setItem("cartOrder", JSON.stringify(tmpCart));
      getAmountOrder(tmpCart);
    }
    resetIndexItem();
  }
  function toogleOrder(data) {
    setOrder(!order);
    setItemOrder(data);
    setSize(null);
    setTopping([]);
    setDesc(null);
    setAmount(1);
    setPriceTopping(0);
    setPrice(data.price);
    resetIndexItem();
  }
  function editItemOrder(data, index) {
    let itemEdit = menu.filter((item) => item._id === data._id);
    setOrder(!order);
    setItemOrder(itemEdit[0]);
    setSize(data.size);
    setTopping(data.topping);
    setDesc(data.description);
    setAmount(data.amount);
    setPriceTopping(data.priceTopping);
    setPrice(data.price);
    setIndexItem(index);
  }

  function mergeData(category, product) {
    category.map((itemcat) => {
      let arr = [];
      product.map((itempro) => {
        if (itempro.categ_id.includes(itemcat.id)) {
          arr.push(itempro);
        }
        return 0;
      });
      itemcat.ListProduct = arr;
      return 0;
    });
    return category;
  }
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
        <CartContainer classCart="cart" />
      </div>
    );
  } else if (allData.length === 0) {
    return <div>Error: NONE DATA</div>;
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
        {order ? (
          <OrderContainer
            toogleOrder={toogleOrder}
            itemOrder={itemOrder}
            addToCart={addToCart}
            size={size}
            topping={topping}
            desc={desc}
            amount={amount}
            price={price}
            priceTopping={priceTopping}
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
