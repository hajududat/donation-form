import React, { useState } from "react";
import { Button } from "./Button";

export const Form = ({ callBack }) => {
  const [amount, setAmount] = useState(5);
  const [error, setError] = useState(false);
  const _submitHandler = (e) => {
    e.preventDefault();
    if (amount === "" || amount < 5) {
      return setError(true);
    }
    setError(false);
    setAmount(5);
    return callBack(amount);
  };

  return (
    <>
      <form className="form">
        <span className="ic-currency">$</span>
        <input
          aria-label="Enter donation amount"
          className="form__input"
          type="number"
          min="5"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="5"
          required
        />
        <Button
          buttonText="Give Now"
          classes="button button__primary"
          onClick={_submitHandler}
        />
      </form>
      {error ? (
        <div className="alert alert__error" role="alert">
          Please enter an amount greater than <sup>$</sup>5.
        </div>
      ) : null}
    </>
  );
};
