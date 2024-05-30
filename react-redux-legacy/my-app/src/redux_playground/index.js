// import { legacy_createStore as createStore } from 'redux';
import Redux from "redux";

const REQUESTING_DATA = "REQUESTING_DATA";
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

    setTimeout(function () {
      let data = {
        users: ["Jeff", "William", "Alice"],
      };
      // Dispatch received data action here
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
const store = Redux.createStore(
  asyncDataReducer,
  applyMiddleware(ReduxThunk.default)
);

// export redux store for ../index.js
export default store;
