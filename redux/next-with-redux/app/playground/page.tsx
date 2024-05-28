// to use console.log()
"use client";

import { legacy_createStore as createStore } from "redux";

export default function PlaygroundPage() {
  /*   const reducer = (state = 5) => {
        return state;
      }; */

  const store = createStore((state = 5) => state);

  const currentState = store.getState();
  console.log(currentState);

  const action = { type: "LOGIN" };

  return <h1>Playground</h1>;
}

// Redux + React Redux section

// Create a Redux Store

// Redux methods are available from a Redux object
// For example: Redux.createStore()
// Define the store here:
