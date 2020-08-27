import React from "react";

const ProgressTooltip = ({ amount, message }) => {
  return (
    <div className="progress__tooltip" role="tooltip">
      <sup>$</sup>
      <strong className="donor-amount">
        {Math.abs(amount)
          .toFixed(0)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </strong>{" "}
      {message}
      <span className="arrow"></span>
    </div>
  );
};

export const Progress = ({ amount, goal }) => {
  const amountLeft = goal - amount;
  const percentage = (amount / goal) * 100 + "%";
  const message =
    amountLeft >= 0
      ? "still needed to fund this project."
      : "raised over the goal amount! Yay! 🥳";

  console.log(amount, amountLeft);

  return (
    <div className="progress">
      <ProgressTooltip amount={amountLeft} message={message} />
      <div className="progress__bar">
        <div className="progress__fill" style={{ width: percentage }}></div>
      </div>
    </div>
  );
};
