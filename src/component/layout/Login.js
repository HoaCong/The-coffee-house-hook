import React, { useState } from "react";
import Button from "../common/Button";
import SelectCountry from "../common/SelectCountry";

function Login(props) {
  const [switchSignUp, setSwitchSignUp] = useState(true);
  const switchLogInRegister = () => {
    setSwitchSignUp(!switchSignUp);
  };
  return (
    <div className="login-container">
      {switchSignUp ? (
        <div className="login_box">
          <p className="txt-header">Đăng Nhập</p>
          <SelectCountry
            history={props.history}
            TextButton="Đăng nhập"
            login={switchSignUp}
          />
          <div className="register">
            <p className="link_switch" onClick={() => switchLogInRegister()}>
              Đăng ký thành viên mới?
            </p>
          </div>
          <div className="login_differen">hoặc đăng nhập bằng</div>
          <div className="flex_center">
            <Button className="social facebook">FACEBOOK</Button>
            <Button className="social email">EMAIL</Button>
          </div>
        </div>
      ) : (
        <div className="login_box">
          <p className="txt-header">Chào Bạn,</p>
          <p>Nhập số điện thoại để tiếp tục</p>
          <SelectCountry
            history={props.history}
            TextButton="Tiếp tục"
            login={switchSignUp}
          />
          <div className="register">
            <p
              className="link_switch back_forward"
              onClick={() => switchLogInRegister()}
            >
              Quay về
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
