import React from "react";
import ReactDOM from "react-dom";

/* const App = () => {
  const JSX = (
    <div>
      <h2>Welcome to React!</h2>
      <br />
      <p>Be sure to close all tags!</p>
      <hr />
    </div>
  );
  // return JSX;

  const MyComponent = function () {
    return <div>Text</div>;
  };
}; */

// create a component with composition
const ChildComponent = () => {
  return (
    <div>
      <p>I am the child</p>
    </div>
  );
};
class ParentComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>I am the parent</h1>
        <ChildComponent />
        {/* Change code above this line */}
      </div>
    );
  }
}
// export default ParentComponent;

// Use React to Render Nested Components
const TypesOfFruit = () => {
  return (
    <div>
      <ul>
        <li>Apples</li>
        <li>Blueberries</li>
        <li>Strawberries</li>
        <li>Bananas</li>
      </ul>
    </div>
  );
};
const TypesOfVegetable = () => {
  return (
    <div>
      <ul>
        <li>Potato</li>
        <li>Cabbage</li>
        <li>Beetroot</li>
        <li>Corn</li>
        <li>Spinach</li>
      </ul>
    </div>
  );
};

// Compose React Components
class Fruits extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>Fruits:</h2>
        <TypesOfFruit />
      </div>
    );
  }
}
class Vegetables extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>Vegetables:</h2>
        <TypesOfVegetable />
      </div>
    );
  }
}

// Render a Class Component to the DOM
class TypesOfFood extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Types of Food:</h1>
        {/* Change code below this line */}
        <Fruits />
        <Vegetables />
        {/* Change code above this line */}
      </div>
    );
  }
}
// export default TypesOfFood;

// Write a React Component from Scratch
/* class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>My First React Component!</h1>
      </div>
    );
  }
} */

// Pass Props to a Stateless Functional Component
const CurrentDate = (props) => {
  return (
    <div>
      {/* Change code below this line */}
      <p>The current date is: {props.date}</p>
      {/* Change code above this line */}
    </div>
  );
};
class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>What date is it?</h3>
        {/* Change code below this line */}
        <CurrentDate date={Date()} />
        {/* Change code above this line */}
      </div>
    );
  }
}

// Pass an Array as Props
const List = (props) => {
  {
    /* Change code below this line */
  }
  return <p>{props.tasks.join(", ")}</p>;
  {
    /* Change code above this line */
  }
};
class ToDo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>To Do Lists</h1>
        <h2>Today</h2>
        {/* Change code below this line */}
        <List
          tasks={[
            "wash dishes",
            "clean room",
            "sunbathe",
            "exercise",
            "photoshop",
          ]}
        />
        <h2>Tomorrow</h2>
        <List
          tasks={[
            "feed pets",
            "preparing foods",
            "clean droppings",
            "shopping for kitchen materials",
            "code",
            "quality time",
            "book",
          ]}
        />
        {/* Change code above this line */}
      </div>
    );
  }
}

// Using Default Props
/* const ShoppingCart = (props) => {
  return (
    <div>
      <h1>Shopping Cart Component</h1>
    </div>
  );
};
ShoppingCart.defaultProps = { items: 0 }; */

// Override Default Props
/* const Items = (props) => {
  return <h1>Current Quantity of Items in Cart: {props.quantity}</h1>;
};

Items.defaultProps = {
  quantity: 0,
};

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return <Items quantity={10} />;

  }
} */

// Use PropTypes to Define the Props You Expect
import PropTypes from "prop-types";

/* const Items = (props) => {
  return <h1>Current Quantity of Items in Cart: {props.quantity}</h1>;
};

// Change code below this line
Items.propTypes = {
  quantity: PropTypes.number.isRequired,
};
// Change code above this line

Items.defaultProps = {
  quantity: 0,
};

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Items />;
  }
} */

// Access Props Using this.props
/* class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Welcome name={"hehe"} />
      </div>
    );
  }
}
class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <p>
          Hello, <strong>{this.props.name}</strong>!
        </p>
      </div>
    );
  }
} */

// Review Using Props with Stateless Functional Components
/* class CampSite extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Camper />
      </div>
    );
  }
}
// Change code below this line
class Camper extends React.Component {
  constructor(props) {
    super(props);
  }
  render = () => <p>{this.props.name}</p>;
}
Camper.defaultProps = {
  name: "CamperBot",
};
Camper.propTypes = {
  name: PropTypes.string.isRequired,
}; */

// Create a stateful component
// in order to use this.state you need to extend react component first
class StatefulComponent extends React.Component {
  constructor(props) {
    super(props);
    // Only change code below this line
    this.state = {
      firstName: "Istamosh",
    };
    // Only change code above this line
  }
  render() {
    return (
      <div>
        <h1>{this.state.firstName}</h1>
      </div>
    );
  }
}

// Render State in the User Interface
// MyComponent already stateful
/* class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "freeCodeCamp",
    };
  }
  render() {
    const name = this.state.name;
    return (
      // fill code inside div
      <div>
        <h1>{name}</h1>
      </div>
    );
  }
} */

// Set State with this.setState
/* class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Initial State",
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    // Change code below this line
    this.setState({
      name: "React Rocks!",
    });
    // Change code above this line
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Click Me</button>
        <h1>{this.state.name}</h1>
      </div>
    );
  }
} */

// bind 'this' to a class method
/* class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Hello",
    };
    // Change code below this line
    this.handleClick = this.handleClick.bind(this);
    // Change code above this line
  }
  handleClick() {
    this.setState({
      text: "You clicked!",
    });
  }
  render() {
    return (
      // add onclick on button
      <div>
        <button onClick={this.handleClick}>Click Me</button>
        <h1>{this.state.text}</h1>
      </div>
    );
  }
} */

// Use State to Toggle an Element
// toggle visibility between true and false with just one button
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
    };
    // Change code below this line
    this.toggleVisibility = this.toggleVisibility.bind(this);
    // Change code above this line
  }
  // Change code below this line
  toggleVisibility() {
    this.setState((state) => ({
      visibility: state.visibility ? false : true,
    }));
  }
  // Change code above this line
  render() {
    if (this.state.visibility) {
      return (
        <div>
          <button onClick={this.toggleVisibility}>Click Me</button>
          <h1>Now you see me!</h1>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.toggleVisibility}>Click Me</button>
        </div>
      );
    }
  }
}

ReactDOM.render(<MyComponent />, document.getElementById("challenge-node"));
