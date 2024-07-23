import React, { useState, useRef, useEffect } from "react";
import $ from "jquery";
import "./styles/style.css";

const Pomodoro = () => {
  const [timer, setTimer] = useState("0");
  const [session, setSession] = useState("25");

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      $(function () {
        $("#app").addClass(
          "d-flex justify-content-center flex-column align-items-center vh-100"
        );
      });

      mounted.current = true;
      return () => {};
    } else {
      return () => {};
    }
  });

  return (
    <>
      <h1>Pomodoro Timer</h1>
    </>
  );
};
export default Pomodoro;
