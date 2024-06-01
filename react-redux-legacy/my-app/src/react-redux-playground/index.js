import React from "react";
import "../App.css";

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
        {/* Render an input, button, and ul below this line */}
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
        {/* Change code above this line */}
      </div>
    );
  }
}

export default DisplayMessages;
// this will be used by index.js
