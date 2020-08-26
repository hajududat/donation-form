import React from "react";

const ProgressTooltip = (props) => {
  return (
    <div className="progress__tooltip" role="tooltip">
      <sup>$</sup>
      <strong className="donor-amount">
        {Math.abs(props.amount).toFixed(2)}
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

export default Progress;
