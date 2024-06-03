import React from "react";
import "../App.css";

import { createStore, applyMiddleware } from "redux";
import { useSelector, connect } from "react-redux";

import { Provider } from "react-redux";

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

// -
// Use Provider to Connect Redux to React
// Redux:
/* const ADD = "ADD";

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

const store = createStore(messageReducer);

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

const Provider = _Provider;

class AppWrapper extends React.Component {
  // Render the Provider below this line
  render() {
    return (
      <Provider store={store}>
        <DisplayMessages />
      </Provider>
    );
  }
  // Change code above this line
} */

// Map State to Props
/* const state = [];
// Change code below this line
const mapStateToProps = (state) => ({ messages: state }); */

// Map Dispatch to Props
/* const addMessage = (message) => {
  return {
    type: "ADD",
    message: message,
  };
};
// Change code below this line
const mapDispatchToProps = (dispatch) => ({
  submitNewMessage: (message) => {
    dispatch(addMessage(message));
  },
}); */

// Connect Redux to React
/* const addMessage = (message) => {
  return {
    type: "ADD",
    message: message,
  };
};

const mapStateToProps = (state) => {
  return {
    messages: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (message) => {
      dispatch(addMessage(message));
    },
  };
};

class Presentational extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h3>This is a Presentational Component</h3>;
  }
}

const connect = _connect;
// Change code below this line
const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Presentational); */

// Connect Redux to the Messages App
// Redux:
/* const ADD = "ADD";

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

const store = createStore(messageReducer);

// React:
class Presentational extends React.Component {
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

// React-Redux:
const mapStateToProps = (state) => {
  return { messages: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (newMessage) => {
      dispatch(addMessage(newMessage));
    },
  };
};

// Define the Container component here:
const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // Complete the return statement:
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
} */

// Extract Local State into Redux
// Redux:
/* const ADD = "ADD";

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

const store = createStore(messageReducer);

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
} */

// Moving Forward From Here
/*
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './redux/reducers'
import App from './components/App'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
*/

// Only change code below this line
console.log("Now I know React and Redux!");

// for react
// dummy store const to prevent Provider error
const dummyStore = createStore(() => [], {}, applyMiddleware());
class App extends React.Component {
  render() {
    return; /* <Provider store={store}><ConnectedComponent /></Provider>; */
  }
}
export default App;
// for redux
// export { store };

// this will be used by index.js
