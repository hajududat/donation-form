import React, { useState, useEffect } from "react";
import moment from "moment";
import numWords from "num-words";

import { Progress } from "./components/Progress";
import { Form } from "./components/Form";
import { Button } from "./components/Button";
import { Card, CardTitle, CardText } from "./components/Card";

function App() {
  const goalAmount = 5000;
  const endDate = moment("2020-09-30");
  const daysRemaining = endDate.diff(moment(), "days");
  const [donors, setDonors] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const donate = (amount) => {
    setDonors(donors + 1);
    setTotalAmount(totalAmount + parseInt(amount));
  };

  const reset = () => {
    localStorage.removeItem("app-state");
    setTotalAmount(0);
    setDonors(0);
  };

  useEffect(() => {
    const localState = JSON.parse(localStorage.getItem("app-state"));

    if (localState) {
      setTotalAmount(parseInt(localState.totalAmount));
      setDonors(parseInt(localState.donors));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "app-state",
      JSON.stringify({
        totalAmount: totalAmount,
        donors: donors,
      })
    );
  });

  console.log(numWords(endDate.diff(moment(), "days")));

  return (
    <>
      <Progress amount={totalAmount} goal={goalAmount} />
      <Card>
        <CardTitle>
          Only {daysRemaining > 10 ? daysRemaining : numWords(daysRemaining)}{" "}
          days left to support{" "}
          <span className="foundation">The Good Foundation</span>
        </CardTitle>
        <CardText>
          {donors === 0 ? (
            "Be the first person to support this project!"
          ) : (
            <>
              Join the <strong className="donor-count">{donors}</strong> other{" "}
              {donors === 1 ? "donor" : "donors"} who{" "}
              {donors === 1 ? "has" : "have"} already supported this project.
            </>
          )}
        </CardText>
        <Form callBack={donate} />
      </Card>
      {totalAmount >= goalAmount ? (
        <Button
          classes="button button__secondary--text button--reset"
          buttonText="Start Over"
          onClick={() => reset()}
        />
      ) : null}
    </>
  );
}

export default App;
