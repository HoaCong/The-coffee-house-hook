import React, { Component } from "react";
import SelectCountry from "../common/SelectCountry";
import Button from "../common/Button";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switch: true,
    };
  }

  switchLogInRegister = () => {
    this.setState({
      switch: !this.state.switch,
    });
  };
  render() {
    console.log(this.props);
    return (
      <div className="login-container">
        {this.state.switch ? (
          <div className="login_box">
            <p className="txt-header">Đăng Nhập</p>
            <SelectCountry
              history={this.props.history}
              TextButton="Đăng nhập"
              login={this.state.switch}
            />

            <div className="register">
              <p
                className="link_switch"
                onClick={() => this.switchLogInRegister()}
              >
                Đăng ký thành viên mới?
              </p>
            </div>

            <div className="login_differen">hoặc đăng nhập bằng</div>
            <div className="flex_center">
              <Button className="social facebook" Text="FACEBOOK" />
              <Button className="social email" Text="EMAIL" />
            </div>
          </div>
        ) : (
          <div className="login_box">
            <p className="txt-header">Chào Bạn,</p>
            <p>Nhập số điện thoại để tiếp tục</p>
            <SelectCountry
              history={this.props.history}
              TextButton="Tiếp tục"
              login={this.state.switch}
            />

            <div className="register">
              <p
                className="link_switch back_forward"
                onClick={() => this.switchLogInRegister()}
              >
                Quay về
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
