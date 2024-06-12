import React from "react";
import { legacy_createStore as createStore } from "redux";
import { Provider, connect, useSelector } from "react-redux";

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

// React-Redux section EXAMPLE
// Redux:
const ADD = "ADD";

const addMessage = (message) => {
  return {
    type: ADD,
    message: message,
  };
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [...state, action.message];
    default:
      return state;
  }
};

// const store = createStore(messageReducer);

// React:

// Change code below this line
class Presentational extends React.Component {
  constructor(props) {
    super(props);
    // state shouldn't include messages
    this.state = {
      input: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value,
    });
  }
  submitMessage() {
    // change this part
    this.props.submitNewMessage(this.state.input);
    this.setState({
      input: "",
    });
  }
  // change this.state.messages into this.props.messages
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input value={this.state.input} onChange={this.handleChange} />
        <br />
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.props.messages.map((message, idx) => {
            return <li key={idx}>{message}</li>;
          })}
        </ul>
      </div>
    );
  }
}
// Change code above this line

// const mapStateToProps = (state) => {
//   return { messages: state };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (message) => {
      dispatch(addMessage(message));
    },
  };
};

// const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

// class AppWrapper extends React.Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <Container />
//       </Provider>
//     );
//   }
// }

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
  // console.log(fetch.quotes[0].quote, "-", fetch.quotes[0].author);

  store.dispatch(storeQuotes(fetch.quotes));

  // console.log("Let's see here... ", store.getState());
})();

const quotesRandomizer = () => {
  const getState = store.getState();
  return getState[Math.floor(Math.random() * (getState.length + 1))];
};

// React section
class Display extends React.Component {
  constructor(props) {
    super(props);
    // const getQuotes = quotesRandomizer();
    this.state = {
      quote: "",
      author: "",
    };

    this.shuffleQuote = this.shuffleQuote.bind(this);
  }
  shuffleQuote = () => {
    const getQuotes = quotesRandomizer();

    this.setState({
      quote: getQuotes.quote,
      author: getQuotes.author,
    });
  };
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
      <button id="new-quote" onClick={props.buttonClick}>
        New Quote
      </button>
      <a href="twitter.com/intent/tweet" id="tweet-quote" target="_blank">
        Tweet It!
      </a>
      <p id="text">{props.quote}</p>
      <p id="author">{props.author}</p>
    </div>
  </div>
);

// Redux store to react function (for exporting)
const mapStateToProps = (store) => ({
  quotes: store.user.quotes,
});

// export default connect(mapStateToProps)(App);

const RandomQuotes = () => {
  return (
    <fieldset>
      <legend>Random Quotes Generator Section</legend>
      <App />
    </fieldset>
  );
};

// export default RandomQuotes;
export default Display;
