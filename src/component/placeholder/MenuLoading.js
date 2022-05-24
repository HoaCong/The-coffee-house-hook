import React, { Component } from "react";
import SearchForm from "../common/SearchForm";
import ListMenuLoading from "./ListMenuLoading";

class MenuLoading extends Component {
  render() {
    return (
      <section className={this.props.classMenu}>
        <SearchForm
          propsForm={{ className: "order_input" }}
          icon="fas fa-search"
          propsInput={{
            type: "text",
            placeholder: "Tìm kiếm sản phẩm",
          }}
        />
        <ListMenuLoading />
        <ListMenuLoading />
        <ListMenuLoading />
      </section>
    );
  }
}
export default MenuLoading;
