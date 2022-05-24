import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import callApi, { callApiHeader } from "../callApi";
import Button from "../common/Button";
import Image from "../common/Image";
import SearchForm from "../common/SearchForm";
import OrderTimer from "../features/OrderTimer";
function ItemAddress(props) {
  return (
    <li onClick={props.onClick}>
      <i className={props.Icon}></i>
      <div>
        <p className="address">{props.p_Address}</p>
        <p className="region">{props.p_Region}</p>
      </div>
    </li>
  );
}
function ListAddress(props) {
  function getValue(e) {
    props.callback(e);
  }
  const Address = props.Data;
  if (props.address.length < 6 || Address === null) return <div></div>;
  if (Address.length === 0)
    return (
      <div className="result_order_input result_error">
        <div>Chuỗi không hợp lệ</div>
      </div>
    );
  return (
    <ul className={"result_order_input " + props.className}>
      {Address.map((item) => (
        <ItemAddress
          onClick={() => getValue(item.full_address)}
          key={item.full_address}
          Icon="fas fa-map-marker-alt"
          p_Address={item.title_address}
          p_Region={item.full_address}
        />
      ))}
    </ul>
  );
}
function Header(props) {
  const debounceChangeInput = useRef(null);
  const insideTimer = useRef(null);
  const [getAddress, setGetAddress] = useState(null);
  const [address, setAddress] = useState("");
  const [toogleAddress, setToogleAddress] = useState(false);
  const [toogleTimer, setToogleTimer] = useState(false);
  const [listDate, setListDate] = useState([]);
  const [textTimer, setTextTimer] = useState("GIAO NGAY");
  const [today, setToday] = useState(null);
  function changeTextTimer(data) {
    setTextTimer(data);
    localStorage.setItem("timer_order", data);
  }
  function openAddress() {
    setToogleAddress(true);
  }
  function closeAddress() {
    setToogleAddress(false);
  }
  function getThreeDate() {
    let day = new Date();
    let nextDay = new Date();
    let tmpList = [];
    let i = 0;
    if (day.getHours() >= 20 && day.getMinutes() >= 15) i = 1;
    for (i; i < 3; i++) {
      nextDay.setDate(day.getDate() + i);
      tmpList.push(nextDay.toLocaleDateString());
    }
    setListDate(tmpList);
    setToday(day.toLocaleDateString());
  }
  function changeToogleTimer() {
    setToogleTimer(!toogleTimer);
    getThreeDate();
  }
  function callback(data) {
    setAddress(data);
  }

  function searchApiAddress(key) {
    // fetch(
    //   `https://api.thecoffeehouse.com/api/v5/map/autocomplete?key=${key}&from=TCH-WEB`,
    //   {
    //     headers: {
    //       accept: "application/json, text/plain, */*",
    //       "accept-language": "en-US,en;q=0.9,ja;q=0.8",
    //       "cache-control": "no-cache",
    //       pragma: "no-cache",
    //       "sec-ch-ua":
    //         '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
    //       "sec-ch-ua-mobile": "?0",
    //       "sec-fetch-dest": "empty",
    //       "sec-fetch-mode": "cors",
    //       "sec-fetch-site": "same-site",
    //       "tch-app-version": "",
    //       "tch-device-id": "",
    //       "x-csrf-token": "XJVEF4AnLtZqcFJ87XeJaV1nJxGC5HrAkMy9QCHA",
    //       "x-requested-with": "XMLHttpRequest",
    //     },
    //     referrer: "https://order.thecoffeehouse.com/",
    //     referrerPolicy: "strict-origin-when-cross-origin",
    //     body: null,
    //     method: "GET",
    //     mode: "cors",
    //     credentials: "omit",
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((ListAddress) => {
    //     setGetAddress(ListAddress.addresses);
    //   });
    const headers = {
      accept: "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9,ja;q=0.8",
      "cache-control": "no-cache",
      pragma: "no-cache",
      "tch-app-version": "",
      "tch-device-id": "",
      "x-csrf-token": "XJVEF4AnLtZqcFJ87XeJaV1nJxGC5HrAkMy9QCHA",
      "x-requested-with": "XMLHttpRequest",
    };
    callApi(`v5/map/autocomplete?key=${key}&from=TCH-WEB`, "GET", headers).then(
      (item) => {
        setGetAddress(item.data.addresses);
      }
    );
  }
  function changeInput(e) {
    const key = e.target.value;
    setAddress(key);
    if (key.length > 5) {
      if (debounceChangeInput.current) {
        clearTimeout(debounceChangeInput.current);
      }
      debounceChangeInput.current = setTimeout(() => {
        searchApiAddress(key);
      }, 500);
    }
  }
  function checkInside(e) {
    if (insideTimer.current && !insideTimer.current.contains(e.target)) {
      setToogleTimer(false);
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", checkInside);
    if (localStorage.getItem("timer_order")) {
      setTextTimer(localStorage.getItem("timer_order"));
    }
  }, []);
  return (
    <header>
      <Link to="/">
        <Image Src={logo} Alt="Logo Cửa Hàng" Size="logo" />
      </Link>
      <div className="nav_header">
        <div className="toogle_timer" ref={insideTimer}>
          <Button Text={textTimer} onClick={changeToogleTimer} />
          {toogleTimer ? (
            <OrderTimer
              listDate={listDate}
              today={today}
              changeTextTimer={changeTextTimer}
            />
          ) : null}
        </div>
        <div className="address_search">
          <SearchForm
            className="order_input"
            icon="fas fa-map-marker-alt"
            onClick={() => setTimeout(openAddress, 150)}
            onBlur={() => setTimeout(closeAddress, 150)}
            type="text"
            placeholder="Nhập địa chỉ giao hàng"
            name="address"
            value={address || ""}
            onChange={(e) => changeInput(e)}
          />
          {toogleAddress ? (
            <ListAddress
              callback={callback}
              Data={getAddress}
              className=""
              address={address}
            />
          ) : null}
        </div>
      </div>
      <div className="toogle_timer flex_timer">
        <Link to="/login">
          <Button className="login" Text="Đăng nhập" />
        </Link>
        {props.amount > 0 ? (
          <div className="flex_timer">
            <div className="total_amount"> {props.amount}</div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="7.3" cy="17.3" r="1.4"></circle>
              <circle cx="13.3" cy="17.3" r="1.4"></circle>
              <polyline
                fill="none"
                stroke="#000"
                points="0 2 3.2 4 5.3 12.5 16 12.5 18 6.5 8 6.5"
              ></polyline>
            </svg>
          </div>
        ) : null}
      </div>
    </header>
  );
}
export default Header;
