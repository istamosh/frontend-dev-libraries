import { createStore, applyMiddleware } from "redux"; // Redux.createStore alternative
import { thunk } from "redux-thunk"; // ReduxThunk alternative
import logger from "redux-logger"; // in tandem, as a parameter with applymiddleware function

/*   const reducer = (state = 5) => {
        return state;
      }; */

/*   const store = createStore((state = 5) => state);
  const currentState = store.getState();
  console.log(currentState); 

  // define an action creator function and then return an action object
  const action = { type: "LOGIN" };
  const actionCreator = () => action;*/

// Dispatch an Action Event
/* const store = createStore((state = { login: false }) => state);
const loginAction = () => {
  return {
    type: "LOGIN",
  };
};
store.dispatch(loginAction()); */

// Handle an action in the store
/* const defaultState = {
    login: false,
  };

  const reducer = (state = defaultState, action) => {
    // Change code below this line
    // return action.type === "LOGIN" ? { login: "true" } : state;
    if (action.type === "LOGIN") {
      return { login: true };
    } else {
      return state;
    }
    // Change code above this line
  };

  const store = createStore(reducer);

  const loginAction = () => {
    return {
      type: "LOGIN",
    };
  }; */

// Use a Switch Statement to Handle Multiple Actions
/*   const LOGIN = "LOGIN";
  const LOGOUT = "LOGOUT";

  const defaultState = {
    authenticated: false,
  };

  const authReducer = (state = defaultState, action: { type: any }) => {
    // Change code below this line
    switch (action.type) {
      case LOGIN:
        return { authenticated: true };
      case LOGOUT:
        return { authenticated: false };
      default:
        return state;
    }
    // Change code above this line
  };

  // const store = createStore(authReducer);

  const loginUser = () => {
    return {
      type: LOGIN,
    };
  };

  const logoutUser = () => {
    return {
      type: LOGOUT,
    };
  }; */

// Register a Store Listener
/*     const ADD = "ADD";

  const reducer = (state = 0, action: { type: any }) => {
    switch (action.type) {
      case ADD:
        return state + 1;
      default:
        return state;
    }
  };

const store = createStore(reducer);

  let count = 0;

  // Change code below this line
  store.subscribe(() => {
    count++;
  });
  // Change code above this line

  store.dispatch({ type: ADD });
  console.log(count);
  store.dispatch({ type: ADD });
  console.log(count);
  store.dispatch({ type: ADD });
  console.log(count); */

// Combine Multiple Reducers
/*   const INCREMENT = "INCREMENT";
  const DECREMENT = "DECREMENT";

  const counterReducer = (state = 0, action: { type: any }) => {
    switch (action.type) {
      case INCREMENT:
        return state + 1;
      case DECREMENT:
        return state - 1;
      default:
        return state;
    }
  };

  const LOGIN = "LOGIN";
  const LOGOUT = "LOGOUT";

  const authReducer = (
    state = { authenticated: false },
    action: { type: any }
  ) => {
    switch (action.type) {
      case LOGIN:
        return {
          authenticated: true,
        };
      case LOGOUT:
        return {
          authenticated: false,
        };
      default:
        return state;
    }
  };

  const rootReducer = combineReducers({
    count: counterReducer,
    auth: authReducer,
  }); // Define the root reducer here

  const store = createStore(rootReducer); */

// Send Action Data to the Store
/*   const ADD_NOTE = "ADD_NOTE";

  const notesReducer = (
    state = "Initial State",
    action: { type: any; text: any }
  ) => {
    switch (action.type) {
      // Change code below this line
      case ADD_NOTE:
        return action.text;
      // Change code above this line
      default:
        return state;
    }
  };

  const addNoteText = (note: string) => {
    // Change code below this line
    return {
      type: ADD_NOTE,
      text: note,
    };
    // Change code above this line
  };

  const store = createStore(notesReducer);

  console.log(store.getState());
  store.dispatch(addNoteText("Hello!"));
  console.log(store.getState()); */

// Use Middleware to Handle Asynchronous Actions
/* const REQUESTING_DATA = "REQUESTING_DATA";
const RECEIVED_DATA = "RECEIVED_DATA";

const requestingData = () => {
  return { type: REQUESTING_DATA };
};
const receivedData = (data) => {
  return { type: RECEIVED_DATA, users: data.users };
};

const handleAsync = () => {
  return function (dispatch) {
    // Dispatch request action here
    dispatch(requestingData());

    setTimeout(function () {
      let data = {
        users: ["Jeff", "William", "Alice"],
      };
      // Dispatch received data action here
      dispatch(receivedData(data));
    }, 2500);
  };
};

const defaultState = {
  fetching: false,
  users: [],
};

// this one would be the main function for exporting
const asyncDataReducer = (state = defaultState, action) => {
  switch (action.type) {
    case REQUESTING_DATA:
      return {
        fetching: true,
        users: [],
      };
    case RECEIVED_DATA:
      return {
        fetching: false,
        users: action.users,
      };
    default:
      return state;
  }
};
const store = createStore(
  asyncDataReducer,
  applyMiddleware(thunk.default, logger)
); */

// Write a Counter with Redux
const INCREMENT = null; // Define a constant for increment action types
const DECREMENT = null; // Define a constant for decrement action types

const counterReducer = (state = 0, action) => {}; // Define the counter reducer which will increment or decrement the state based on the action it receives

const incAction = () => ({ type: INCREMENT }); // Define an action creator for incrementing

const decAction = () => ({ type: DECREMENT }); // Define an action creator for decrementing

const store = createStore((state = 0) => state); // Define the Redux store here, passing in your reducers

const currentState = store.getState();
console.log(currentState);

// export redux store for ../index.js
export { store };

// start the app using "npm start"
