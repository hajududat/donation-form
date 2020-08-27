import React from "react";

export const Card = (props) => <div className="card">{props.children}</div>;

export const CardTitle = (props) => (
  <h1 className="card__title">{props.children}</h1>
);

export const CardText = (props) => (
  <p className="card__text">{props.children}</p>
);
