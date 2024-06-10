import React from "react";

const fetchQuotes = async () => {
  try {
    const fetched = await fetch(
      "https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    );
    if (!fetched.ok) {
      throw new Error("Throw: fetch failed!");
    } else {
      return await fetched.json();
    }
  } catch (error) {
    console.log("Error while fetching quotes: ", error);
    return false;
  }
};

(async () => {
  let fetch = await fetchQuotes();
  // do something
  if (!fetch) {
    console.log(
      "Fetch failed! Please check your connection and reload your browser"
    );
  }
  console.log("Fetch success! ", fetch.quotes);
})();

const App = () => (
  <div>
    <div id="quote-box">
      <p id="text">Quote Text</p>
      <p id="author">Quote Author</p>
      <button id="new-quote">New Quote</button>
      <a href="twitter.com/intent/tweet" id="tweet-quote" target="_blank">
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
