import React from "react";

fetch(
  "https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
)
  .then((response) => response.json())
  .then((result) => {
    console.log(result.quotes);
    console.log(result.quotes.length);
    console.log(`${result.quotes[0].quote}; ${result.quotes[0].author}`);
  });

// async function wait() {
//   console.log(await item["quotes"]);
// }
// wait();

const App = () => (
  <div>
    <div id="quote-box">
      <p id="text">Quote Text</p>
      <p id="author">Quote Author</p>
      <button id="new-quote">New Quote</button>
      <a href="" id="tweet-quote" target="_blank">
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
