import React, { Component } from "react";
class ItemMenu extends Component {
  render() {
    return (
      <div className="ele_product">
        <div className="thumbnail image__menu loading"></div>
        <div className="content__item__menu">
          <div className="item__menu__name loading"></div>
          <div className="item__menu__content loading"></div>
          <div className="item__menu__price loading"></div>
        </div>
      </div>
    );
  }
}

export default ItemMenu;
