import React from "react";
import { legacy_createStore as createStore } from "redux";
import $ from "jquery";

// Redux section
const INSERT = "INSERT";
const reducer = (state = [], action) => {
  switch (action.type) {
    case INSERT:
      return state.concat([...action.quotes]);
    default:
      return state;
  }
};
const storeQuotes = (quotes) => ({ type: INSERT, quotes });
const store = createStore(reducer);

// Declare outside scope to be accessed on class
let getState;
let length = 1;

// Fetch section
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
  if (!fetch) {
    return console.log(
      "Fetch failed! Please check your connection and reload this page"
    );
  }

  store.dispatch(storeQuotes(fetch.quotes));
  getState = store.getState();
  length = getState.length;
})();

// React section
class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "...",
      author: "...",
    };
    this.shuffleQuote = this.shuffleQuote.bind(this);
  }
  // for jQuery allocation after react component initialized
  componentDidMount() {
    $(document).ready(function () {
      $("#quote-box").addClass(
        "d-flex flex-column align-items-center justify-content-end"
      );
      $("#text").addClass("h-100 d-inline-block");
      $("#quote-box").addClass(
        "position-absolute top-50 start-50 translate-middle"
      );
      $("#quote-box").css({
        width: 500,
        height: 200,
        "background-color": "lightgray",
        margin: "auto",
      });
    });
    this.shuffleQuote();
  }
  shuffleQuote() {
    const rng = Math.floor(Math.random() * length);
    this.setState({
      quote: getState[rng].quote,
      author: getState[rng].author,
    });
  }
  render() {
    return (
      <App
        quote={this.state.quote}
        author={this.state.author}
        buttonClick={this.shuffleQuote}
      />
    );
  }
}

const App = (props) => (
  <div>
    <div id="quote-box">
      <p id="text">{props.quote}</p>
      <p id="author">{props.author}</p>
      <button id="new-quote" onClick={props.buttonClick}>
        New Quote
      </button>
      <a href="twitter.com/intent/tweet" id="tweet-quote" target="_blank">
        Tweet It!
      </a>
    </div>
  </div>
);

export default Display;
