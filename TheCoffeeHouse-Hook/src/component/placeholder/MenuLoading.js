import React, { Component } from "react";
import SearchForm from "../common/SearchForm";
import ListMenuLoading from "./ListMenuLoading";

class MenuLoading extends Component {
  render() {
    return (
      <section className={this.props.classMenu}>
        <SearchForm />
        <ListMenuLoading />
        <ListMenuLoading />
      </section>
    );
  }
}
export default MenuLoading;
