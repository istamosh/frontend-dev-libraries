import React, { useState, useRef, useEffect } from "react";
import $ from "jquery";
import "./styles/style.css";

const displayTime = (time) => {
  let hours = Math.floor((time / 60 / 60) % 24);
  let minutes = Math.floor((time / 60) % 60);
  let seconds = Math.floor(time % 60);

  hours = hours < 10 ? "" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
};

const minuteToSecond = (minute) => minute * 60;

const Pomodoro = () => {
  const [breakTime, setBreakTime] = useState(5);
  const [session, setSession] = useState(25);
  const [time, setTime] = useState(minuteToSecond(25));
  const [playing, setPlaying] = useState(false);

  // component lifecycle
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

  const timer = useRef();
  useEffect(() => {
    if (playing) {
      timer.current = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }

    $("button, input")
      .not("#start_stop, #reset")
      .prop("disabled", playing ? true : false);

    return () => clearInterval(timer.current);
  }, [playing]);

  useEffect(() => {
    if (time === 0) {
      clearInterval(timer.current);
      setPlaying(false);
      let sound = new Audio(
        "https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
      );
      sound.play();
      setTimeout(() => {
        sound.pause();
        sound = null;
      }, 3000);
    }
  }, [time]);

  useEffect(() => {
    setTime(minuteToSecond(session));
  }, [session]);

  return (
    <>
      <h1>Pomodoro Timer</h1>
      <span id="break-label">Break Length</span>
      <span id="break-time">{breakTime}:00</span>
      <button
        id="break-decrement"
        onClick={() => {
          setBreakTime((prev) =>
            prev > $("#break-length").attr("min") ? prev - 1 : prev
          );
        }}
      >
        {"<"}
      </button>
      <input
        type="range"
        min="1"
        max="60"
        name="break"
        id="break-length"
        value={breakTime}
        onChange={({ target }) => {
          setBreakTime(target.value);
        }}
      />
      <button
        id="break-increment"
        onClick={() => {
          setBreakTime((prev) =>
            prev < $("#break-length").attr("max") ? prev + 1 : prev
          );
        }}
      >
        {">"}
      </button>

      <span id="session-label">Session Length</span>
      <span id="session-time">{session}:00</span>
      <button
        id="session-decrement"
        onClick={() => {
          setSession((prev) =>
            prev > $("#session-length").attr("min") ? prev - 1 : prev
          );
        }}
      >
        {"<"}
      </button>
      <input
        type="range"
        min="1"
        max="60"
        name="session"
        id="session-length"
        value={session}
        onChange={({ target }) => {
          setSession(target.value);
        }}
      />
      <button
        id="session-increment"
        onClick={() => {
          setSession((prev) =>
            prev < $("#session-length").attr("max") ? prev + 1 : prev
          );
        }}
      >
        {">"}
      </button>

      <span id="timer-label">Session</span>
      <p id="time-left">{displayTime(time)}</p>
      <button
        id="start_stop"
        onClick={() => {
          if (playing) {
            clearInterval(timer.current);
          }
          setPlaying(!playing);
        }}
      >
        {playing ? "Pause" : "Start"}
      </button>
      <button
        id="reset"
        onClick={() => {
          setTime(minuteToSecond(session));
        }}
      >
        Reset
      </button>
    </>
  );
};
export default Pomodoro;
