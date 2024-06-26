import React from "react";
// import ReactDOM from "react-dom/client"; // ReactDOM.createRoot is for react 18
import ReactDOM from "react-dom"; // ReactDOM.render
import "./index.css";
// import App from "./App";
import Main from "./Main";

// import reportWebVitals from "./reportWebVitals";

// React 18
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <Tutorial />
//   </React.StrictMode>
// );

ReactDOM.render(<Main />, document.getElementById("app"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
