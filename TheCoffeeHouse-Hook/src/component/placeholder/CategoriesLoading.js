import React, { Component } from "react";
import ItemCategory from "./ItemCatLoading";
class CateLoading extends Component {
  render() {
    return (
      <section className={this.props.classList}>
        <ul>
          <ItemCategory />
          <ItemCategory />
          <ItemCategory />
          <ItemCategory />
          <ItemCategory />
          <ItemCategory />
          <ItemCategory />
          <ItemCategory />
        </ul>
      </section>
    );
  }
}

export default CateLoading;
