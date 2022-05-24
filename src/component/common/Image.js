import React from "react";

function Image(props) {
  return <img className={props.Size} src={props.Src} alt={props.Alt} />;
}

export default Image;
