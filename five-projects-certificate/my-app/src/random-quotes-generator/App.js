import React from "react";
import { legacy_createStore as createStore } from "redux";
import $ from "jquery";
import { connect, Provider } from "react-redux";
import "./styles/style.css";

// Redux section
const reducer = (state = [], action) => {
  switch (action.type) {
    case "INSERT":
      return state.concat([...action.quotes]);
    default:
      return state;
  }
};
const storeQuotes = (quotes) => ({ type: "INSERT", quotes });
const store = createStore(reducer);

// Fetch section
const fetchQuotes = async () => {
  try {
    const fetched = await fetch(
      "https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    );
    const fetched2 = await fetch(
      "https://raw.githubusercontent.com/AtaGowani/daily-motivation/master/src/data/quotes.json"
    );
    if (!fetched.ok || !fetched2.ok) {
      throw new Error("Throw: fetch failed!");
    } else {
      return [await fetched.json(), await fetched2.json()];
    }
  } catch (error) {
    console.log("Error while fetching quotes: ", error);
    return false;
  }
};
(async () => {
  const fetch = await fetchQuotes();
  if (!fetch) {
    return console.log(
      "Fetch failed! Please check your connection and reload this page"
    );
  }

  store.dispatch(storeQuotes(fetch[0].quotes));
  store.dispatch(storeQuotes(fetch[1]));
})();

// Animate.css snippet
const animateCSS = (element, animation, duration, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(
      `${prefix}animated`,
      animationName,
      `${prefix}${duration}`
    );

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(
        `${prefix}animated`,
        animationName,
        `${prefix}${duration}`
      );
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });

// React section
class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteState: "",
    };
    this.shuffleQuote = this.shuffleQuote.bind(this);
  }
  // for jQuery allocation after react component initialized
  componentDidMount() {
    $(document).ready(function () {
      $("#quote-box")
        .addClass("d-flex flex-column justify-content-end")
        .addClass("shadow-lg p-3 mb-5 bg-body rounded");
      $("#text").addClass("h-100 d-inline-block");
      $("#quote-box").addClass(
        "position-absolute top-50 start-50 translate-middle"
      );
      $("#new-quote").addClass("btn btn-primary btn-lg");
      // .addClass("animate__animated animate__heartBeat");
      $("#text").addClass("text-start");
      $("#author").addClass("text-end");
      $("#tweet-quote").addClass("text-center");
      $("#new-quote").click(function (e) {
        e.preventDefault();
        const randomColor =
          "#" + (((1 << 24) * Math.random()) | 0).toString(16);
        $(`body, #new-quote`).css({
          "background-color": randomColor,
        });
        $("#tweet-quote").css({ color: randomColor });
      });
    });

    animateCSS("#new-quote", "heartBeat", "fast");

    setTimeout(() => {
      this.setState({
        quoteState:
          store.getState()[
            Math.floor(Math.random() * this.props.quotes.length)
          ],
      });
    }, 1000);
  }
  componentDidUpdate() {
    animateCSS("#new-quote", "headShake", "faster");
  }
  shuffleQuote() {
    this.setState({
      quoteState:
        this.props.quotes[Math.floor(Math.random() * this.props.quotes.length)],
    });
  }
  render() {
    const hashtag =
      "?hashtags=quotes&related=freecodecamp&text=" +
      encodeURIComponent(
        '"' + this.state.quoteState.quote + '" -' + this.state.quoteState.author
      );
    return (
      <App
        quote={this.state.quoteState.quote}
        author={this.state.quoteState.author}
        buttonClick={this.shuffleQuote}
        hashtag={hashtag}
      />
    );
  }
}

const App = (props) => (
  <div>
    <h1>❝</h1>
    <div id="quote-box">
      <p id="text">{!props.quote ? "❝" : props.quote}</p>
      <p id="author">{!props.author ? "❞" : props.author}</p>
      <button id="new-quote" onClick={props.buttonClick}>
        New Quote
      </button>
      <a
        href={"https://www.twitter.com/intent/tweet" + props.hashtag}
        id="tweet-quote"
        target="_top"
      >
        <i className="bi bi-twitter-x"></i>Tweet It!
      </a>
    </div>
    <h1>❞</h1>
  </div>
);

// React-Redux connect section
const mapStateToProps = (state) => ({ quotes: state });
const Container = connect(mapStateToProps)(Display);
class Wrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}

export default Wrapper;
