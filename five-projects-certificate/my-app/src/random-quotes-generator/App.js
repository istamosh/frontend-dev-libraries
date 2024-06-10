import React from "react";
import { legacy_createStore as createStore } from "redux";

// Redux section
function todos(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([action.text]);
    default:
      return state;
  }
}

const store = createStore(todos, ["Use Redux"]);

store.dispatch({
  type: "ADD_TODO",
  text: "Read the docs",
});

console.log(store.getState());
// [ 'Use Redux', 'Read the docs' ]

// Fetch region
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
  // check if fetch is failed
  if (!fetch) {
    return console.log(
      "Fetch failed! Please check your connection and reload this page"
    );
  }
  console.log("Fetch success! ", fetch.quotes);
  console.log(fetch.quotes[0].quote, "-", fetch.quotes[0].author);
  // store state into redux below here
})();

const App = (prop) => (
  <div>
    <div id="quote-box">
      <p id="text">Quote</p>
      <p id="author">Quote Author</p>
      <button id="new-quote">New Quote</button>
      <a href="twitter.com/intent/tweet" id="tweet-quote" target="_blank">
        Tweet It!
      </a>
    </div>
  </div>
);

const RandomQuotes = (props) => {
  return (
    <fieldset>
      <legend>Random Quotes Generator Section</legend>
      <App props={props} />
    </fieldset>
  );
};

export default RandomQuotes;
