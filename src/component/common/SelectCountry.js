import React, { useState } from "react";
import logoCountry from "../../img/country.png";
import InputSearch from "./Input";
import Button from "./Button";
import firebase from "../firebase";
import { useHistory } from "react-router-dom";

function SelectCountry(props) {
  const [error, setError] = useState();
  const [phone, setPhone] = useState();
  // const [codeOTP, setCodeOTP] = useState();
  const history = useHistory();
  function changeInput(e) {
    const phone = e.target.value;
    setError(phone.length);
    if (phone.length > 8 && phone.length < 12) {
      setPhone(phone);
    }
  }
  // function changeOTP(e) {
  //   setCodeOTP(e.target.value);
  // }
  function login() {
    history.push("/");
  }
  function handleClick() {
    var recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha");
    var number = `+84${phone}`;
    login();
    if (props.login) {
      firebase
        .auth()
        .signInWithPhoneNumber(number, recaptcha)
        .then(function (e) {
          var code = prompt("Nhập mã OTP", "");
          if (code === null) return;
          e.confirm(code)
            .then(function (result) {
              console.log(result.user);
              document.querySelector("div.error").textContent +=
                "Đăng nhập thành công";
            })
            .catch(function (error) {
              console.error(error);
            });
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      firebase
        .auth()
        .signInWithPhoneNumber(number, recaptcha)
        .then(function (e) {
          var code = prompt("Nhập mã OTP", "");
          if (code === null) return;
          e.confirm(code)
            .then(function (result) {
              console.log(result.user);
              document.querySelector("div.error").textContent +=
                "Tài khoản đã tồn tại";
            })
            .catch(function (error) {
              console.error(error);
            });
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }
  return (
    <>
      <div className="flex_center">
        <button className="btn-select_country">
          <img src={logoCountry} alt="" />
          <span className="code_region">+84</span>
        </button>
        <select className="select_country">
          <option value="+84">+84</option>
        </select>
        <InputSearch
          classInput="phone-number"
          type="number"
          placeholder="Nhập số điện thoại của bạn"
          maxLength="13"
          min="0"
          onChange={(e) => changeInput(e)}
        />
      </div>
      <div className="error">
        {error !== null &&
          (error < 1
            ? "Không được để trống trường này"
            : error < 9 || error > 11
            ? "Giá trị nằm trong khoảng 9-11 số!"
            : null)}
      </div>

      <Button
        onClick={handleClick}
        className="submit_login"
        Text={props.TextButton}
        disabled={error < 9 || error > 11 ? true : false}
      />
      {/* <form action="/#" onSubmit={onSubmitOtp}>
      <InputSearch
        classInput="phone-number"
        type="number"
        placeholder="Nhập OTP"
        maxLength="6"
        min="0"
        onChange={(e) => changeInput(e)}
      />
    </form> */}
      <div id="recaptcha"></div>
    </>
  );
}

export default SelectCountry;
