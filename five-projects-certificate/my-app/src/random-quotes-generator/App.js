import React from "react";

const fetchQuotes = async () => {
  try {
    const fetched = await fetch(
      "https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    );
    if (!fetched.ok) throw "fetch failed!";
    return await fetched.json();
  } catch (error) {
    console.log(error);
    return false;
  }
};

(async () => {
  let fetch = await fetchQuotes();
  // check if fetch is failed (false)
  let timeOut = 5000;
  while (!fetch) {
    setTimeout(async () => {
      fetch = await fetchQuotes();
    }, timeOut);
    timeOut += 5000;
  }
  // do something
  console.log(fetch);
})();

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
