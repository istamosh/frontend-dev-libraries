import React from "react";

const App = () => (
  <div>
    <div id="quote-box">
      <p id="text">Quote Text</p>
      <p id="author">Quote Author</p>
      <button id="new-quote">New Quote</button>
      <a href="" id="tweet-quote">
        Tweet It!
      </a>
    </div>
  </div>
);

const RandomQuotes = () => {
  return (
    <fieldset>
      <legend>Random Quotes Generator Section</legend>
      <App />
    </fieldset>
  );
};

export default RandomQuotes;
