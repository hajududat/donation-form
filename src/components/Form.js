import React from "react";
import Button from "./Button";

const Form = (props) => {
  return (
    <form className="form">
      <span className="ic-currency">$</span>
      <input
        aria-label="Enter donation amount"
        ref={props.inputRef}
        className="form__input"
        type="number"
        min="5"
        step="0.01"
        placeholder="5"
        required
      />
      <Button
        buttonText="Give Now"
        classes="button button__primary"
        onClick={props.onClick}
      />
    </form>
  );
};

export default Form;
