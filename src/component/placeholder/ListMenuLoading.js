import React, { Component } from "react";
import ItemMenu from "./ItemMenuLoading";

class ListMenuLoading extends Component {
  render() {
    return (
      <div className="box_cat_product">
        <div className="name_item_menu loading"></div>
        <ItemMenu />
        <ItemMenu />
        <ItemMenu />
      </div>
    );
  }
}
export default ListMenuLoading;
