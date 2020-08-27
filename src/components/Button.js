import React from "react";

export const Button = (props) => {
  return (
    <button className={props.classes} onClick={props.onClick}>
      {props.buttonText}
    </button>
  );
};
