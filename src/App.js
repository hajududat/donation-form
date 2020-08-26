import React, { useState, useEffect, useRef } from "react";

import "./assets/scss/App.scss";

const ProgressTooltip = (props) => {
  return (
    <div className="progress__tooltip" role="tooltip">
      <sup>$</sup>
      <strong className="donor-amount">
        {Math.abs(props.amount)
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </strong>{" "}
      {props.message}
      <span className="arrow"></span>
    </div>
  );
};

const ProgressBar = (props) => {
  return <div className="progress__bar">{props.children}</div>;
};

const ProgressFill = (props) => {
  return <div className="progress__fill" style={{ width: props.width }}></div>;
};

const Progress = (props) => {
  return (
    <div className="progress">
      <ProgressTooltip
        amount={props.amount}
        message={props.message}
        position={props.percentage}
      />
      <ProgressBar>
        <ProgressFill width={props.percentage} />
      </ProgressBar>
    </div>
  );
};

const Card = (props) => <div className="card">{props.children}</div>;

const CardTitle = (props) => (
  <h1 className="card__title">
    Only {props.daysRemaining} days left to support{" "}
    <span className="foundation">The Good Foundation</span>
  </h1>
);

const CardText = (props) => {
  if (props.donors !== 0) {
    return (
      <p className="card__text">
        Join the <strong className="donor-count">{props.donors}</strong> other{" "}
        {props.donors === 1 ? "donor" : "donors"} who have already supported
        this project.
      </p>
    );
  } else {
    return (
      <p className="card__text">Be the first person to support this project.</p>
    );
  }
};

const Form = (props) => {
  return (
    <form className="form">
      <span className="ic-currency">$</span>
      <input
        aria-label="Enter donation amount"
        ref={props.inputRef}
        className="form__input"
        type="number"
        name="donation"
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

const Button = (props) => {
  return (
    <button className={props.classes} onClick={props.onClick}>
      {props.buttonText}
    </button>
  );
};

const FormErrorMessage = () => {
  return (
    <div className="alert alert__error" role="alert">
      Please enter an amount greater than <sup>$</sup>5.
    </div>
  );
};

function App() {
  const goalAmount = 5000;
  const [donors, setDonors] = useState(0);
  const [amount, setAmount] = useState(0);
  const [amountLeft, setAmountLeft] = useState(goalAmount);
  const inputRef = useRef(0);

  const donate = () => {
    setDonors(donors + 1);
    setAmount(amount + parseInt(inputRef.current.value));
    setAmountLeft(amountLeft - inputRef.current.value);
    resetInput();
  };

  const reset = () => {
    localStorage.removeItem("app-state");
    setAmount(0);
    setAmountLeft(goalAmount);
    setDonors(0);
    resetInput();
  };

  const resetInput = () => {
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  useEffect(() => {
    const localState = JSON.parse(localStorage.getItem("app-state"));

    if (localState) {
      setAmount(parseInt(localState.amount));
      setAmountLeft(parseInt(localState.amountLeft));
      setDonors(parseInt(localState.donors));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "app-state",
      JSON.stringify({
        amount: amount,
        amountLeft: amountLeft,
        donors: donors,
      })
    );
  });

  return (
    <>
      <Progress
        amount={amountLeft}
        message={
          amountLeft >= 0
            ? "still needed to fund this project."
            : "raised over the goal amount! 🥳"
        }
        percentage={(amount / goalAmount) * 100 + "%"}
      />
      <Card>
        <CardTitle daysRemaining="four" />
        <CardText donors={donors} />
        <Form
          inputRef={inputRef}
          onClick={(e) => {
            if (inputRef.current.value >= parseInt(inputRef.current.min)) {
              e.preventDefault();
              donate();
            }
          }}
        />
        <FormErrorMessage />
      </Card>
      <Button
        classes="button button__secondary--outline button--reset"
        buttonText="Start Over"
        onClick={() => reset()}
      />
    </>
  );
}

export default App;
