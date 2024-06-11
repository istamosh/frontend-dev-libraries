import React from "react";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";

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

const mapStateToProps = (state) => {
  return { messages: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (message) => {
      dispatch(addMessage(message));
    },
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}

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
  // check if fetch is failed
  if (!fetch) {
    return console.log(
      "Fetch failed! Please check your connection and reload this page"
    );
  }
  console.log(fetch.quotes[0].quote, "-", fetch.quotes[0].author);

  // store fetched quotes into redux state here
  store.dispatch(storeQuotes(fetch.quotes));

  // test the redux store
  console.log("Let's see here... ", store.getState());
})();

// React section
class Display extends React.Component {
  constructor(props) {
    super(props);
    // state shouldn't include messages
    this.state = {
      quotes: [],
    };
    //   this.handleChange = this.handleChange.bind(this);
    //   this.submitMessage = this.submitMessage.bind(this);
    // }
    // handleChange(event) {
    //   this.setState({
    //     input: event.target.value,
    //   });
    // }
    // submitMessage() {
    //   // change this part
    //   this.props.submitNewMessage(this.state.input);
    //   this.setState({
    //     input: "",
    //   });
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
