import React from "react";
import "../App.css";

import { createStore } from "redux";
import { useSelector } from "react-redux";

// Getting Started with React Redux
/* class DisplayMessages extends React.Component {
  // Change code below this line
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      messages: [],
    };
  }
  // Change code above this line
  render() {
    return <div />;
  }
} */

/* class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      messages: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  // Add handleChange() and submitMessage() methods here
  handleChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };
  submitMessage = () => {
    this.setState({
      messages: [...this.state.messages, this.state.input],
      input: "",
    });
  };
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleChange}
        />
        <button onClick={this.submitMessage}>Button</button>
        <ul>
          {this.state.messages.map((el) => (
            <li key={el.toString()}>{el}</li>
          ))}
        </ul>
      </div>
    );
  }
} */

// Extract State Logic to Redux
// Define ADD, addMessage(), messageReducer(), and store here:
/* const ADD = "ADD";
const addMessage = (message) => ({ type: ADD, message });
const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [...state, action.message];
    default:
      return state;
  }
};
const store = createStore(messageReducer);
store.dispatch(addMessage("Welcome to the fraternity."));
store.dispatch(addMessage("John Wick"));
store.dispatch(addMessage("John Wick")); */

// Use Provider to Connect Redux to React
// Redux:
const ADD = "ADD";

const addMessage = (message) => {
  return {
    type: ADD,
    message,
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

const store = Redux.createStore(messageReducer);

// React:

class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      messages: [],
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
    this.setState((state) => {
      const currentMessage = state.input;
      return {
        input: "",
        messages: state.messages.concat(currentMessage),
      };
    });
  }
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input value={this.state.input} onChange={this.handleChange} />
        <br />
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.state.messages.map((message, idx) => {
            return <li key={idx}>{message}</li>;
          })}
        </ul>
      </div>
    );
  }
}

const Provider = ReactRedux.Provider;

class AppWrapper extends React.Component {
  // Render the Provider below this line
  // Change code above this line
}

// for react
// export default DisplayMessages;

// for redux
export { store };

// this will be used by index.js
