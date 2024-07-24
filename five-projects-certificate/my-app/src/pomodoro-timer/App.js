import React, { useState, useRef, useEffect } from "react";
import $ from "jquery";
import "./styles/style.css";

const Pomodoro = () => {
  const [timer, setTimer] = useState("0");
  const [breakTime, setBreakTime] = useState("5");
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
      <span for="" id="break-label">
        Break Length
      </span>
      <button id="break-decrement">{"<"}</button>
      <button id="break-increment">{">"}</button>
      <input
        type="range"
        min="1"
        max="60"
        name="break"
        id="break-length"
        value={breakTime}
      />
      <span for="" id="session-label">
        Session Length
      </span>
      <button id="session-decrement">{"<"}</button>
      <button id="session-increment">{">"}</button>
      <input
        type="range"
        min="1"
        max="60"
        name="session"
        id="session-length"
        value={session}
      />
      <span for="" id="timer-label">
        Session
      </span>
      <p id="time-left">mm:ss</p>
      <button id="start_stop">Start / Stop</button>
      <button id="reset">Reset</button>
    </>
  );
};
export default Pomodoro;
