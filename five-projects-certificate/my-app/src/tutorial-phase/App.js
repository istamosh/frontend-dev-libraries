import React from "react";
import "./style.css";

const App = () => {
  const firstName = "Alexia";
  const lastName = "Alice";

  return (
    <div className="App">
      <h1>I love you {`${firstName} ${lastName}`}!</h1>
    </div>
  );
};

const Time = () => {
  const date = new Date();
  const hour = date.getHours();
  let timeOfDay =
    hour < 12 ? "morning" : hour >= 12 && hour < 17 ? "afternoon" : "night";

  return (
    <div>
      It's about {date.getHours() % 12} o'clock <br />
      Good {timeOfDay}!
    </div>
  );
};

const Tutorial = () => {
  return (
    <fieldset>
      <legend>Tutorial Section</legend>
      <App />
      <Time />
    </fieldset>
  );
};

export default Tutorial;
// will be received by ../index.js
