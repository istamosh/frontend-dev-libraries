import React, { useState, useRef, useEffect } from "react";
import $ from "jquery";
import "./styles/style.css";

const displayTime = (time) => {
  // let hours = Math.floor((time / 60 / 60) % 24);
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);

  // hours = hours < 1 ? "" : hours + ":";
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return minutes + ":" + seconds;
};

const minuteToSecond = (minute) => minute * 60;

const Pomodoro = () => {
  const [breakSession, setBreakSession] = useState(5);
  const [session, setSession] = useState(25);
  const [time, setTime] = useState();
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [shift, setShift] = useState(false);
  const [notification, setNotification] = useState(false);

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

  const timer = useRef(null);
  const startTimer = () => {
    timer.current = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
  };

  useEffect(() => {
    if (notification) {
      const audioElement = $("#beep")[0];
      audioElement.volume = volume;
      audioElement.currentTime = 0;
      audioElement.play().catch((e) => {
        console.error("Error playing audio:", e);
      });

      setTimeout(() => {
        audioElement.pause();
        setNotification(false);
      }, 5000);
    }
  }, [notification, volume]);

  useEffect(() => {
    if (playing) {
      startTimer();
    }

    $("button, input")
      .not("#start_stop, #reset")
      .prop("disabled", playing ? true : false);

    return () => clearInterval(timer.current);
  }, [playing]);

  useEffect(() => {
    if (time === 0) {
      $("#timer-label").text("Alarm!");
      // $("button, input").not("#start_stop, #reset").prop("disabled", true);
      clearInterval(timer.current);
      setNotification(true);

      setTimeout(() => {
        setShift((prev) => !prev);
        startTimer();
      }, 5000);
    }
  }, [time, volume]);

  useEffect(() => {
    setTime(minuteToSecond(session));
  }, [session]);

  useEffect(() => {
    setTime(minuteToSecond(shift ? breakSession : session));
    $("#timer-label").text(shift ? "Break" : "Session");
  }, [shift, breakSession, session]);

  const handleButton = ({ target }) => {
    // console.log(target.id);
    if (target.id.includes("break")) {
      setBreakSession((prev) =>
        target.id.includes("decrement")
          ? Math.max(1, prev - 1)
          : Math.min(60, prev + 1)
      );
    } else {
      setSession((prev) =>
        target.id.includes("decrement")
          ? Math.max(1, prev - 1)
          : Math.min(60, prev + 1)
      );
    }
  };

  return (
    <>
      <h1>Pomodoro Timer</h1>
      <span id="break-label">Break Length</span>
      <span id="break-time">{breakSession}:00</span>
      <button id="break-decrement" onClick={handleButton}>
        {"<"}
      </button>
      {/* <input
        type="range"
        min="1"
        max="60"
        step="1"
        name="break"
        id="break-length"
        value={breakSession}
        onChange={({ target }) => {
          setBreakSession(target.value);
        }}
      /> */}
      <span id="break-length">{breakSession}</span>
      <button id="break-increment" onClick={handleButton}>
        {">"}
      </button>

      <span id="session-label">Session Length</span>
      <span id="session-time">{session}:00</span>
      <button id="session-decrement" onClick={handleButton}>
        {"<"}
      </button>
      {/* <input
        type="range"
        min="1"
        max="60"
        step="1"
        name="session"
        id="session-length"
        value={session}
        onChange={({ target }) => {
          setSession(target.value);
        }}
      /> */}
      <span id="session-length">{session}</span>
      <button id="session-increment" onClick={handleButton}>
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
          setBreakSession(5);
          setSession(25);
          setTime(minuteToSecond(25));
          setNotification(false);
        }}
      >
        Reset
      </button>

      <span id="volume-label">Notification Volume</span>
      <input
        type="range"
        min="0.01"
        max="1"
        step="0.01"
        name="volume"
        id="volume-control"
        value={volume}
        onChange={({ target }) => {
          setVolume(target.value);
        }}
      />
      <audio
        src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
        id="beep"
      ></audio>
    </>
  );
};
export default Pomodoro;
