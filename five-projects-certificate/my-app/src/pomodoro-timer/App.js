import React, { useState, useRef, useEffect, useCallback } from "react";
import $ from "jquery";
import "./styles/style.css";

const displayTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);

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
  const [shift, setShift] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // component lifecycle
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      $(function () {
        $("#app").addClass(
          "d-flex justify-content-center flex-column align-items-center vh-100 bg-dark"
        );
        $("h1").addClass("text-center text-white");
        $("span:not(#timer-label)").addClass("text-white");
        $("#session-label").addClass("mt-3");
        $("[id*='-decrement'], [id*='-increment']").addClass(
          "btn btn-outline-light btn-sm ms-1 me-1"
        );
        $("#start_stop, #reset").addClass("btn ms-1 me-1 mb-2");
        $("#reset").addClass("btn-primary");
        $("input").addClass("form-range custom-range");
        $("#break-time, #session-time").addClass("fs-5");
        $("#timer-label").addClass("fs-2");
        $("#time-left").addClass("fs-1");
        $('[id*="controlpanel"]').addClass("d-flex align-items-center");
        $("#timer-section").addClass("d-flex justify-content-center");
        $("#notification-area").addClass("d-flex flex-column");
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
      setTime((prev) => Math.max(prev - 1, 0));
    }, 1000);
  };
  const stopTimer = () => {
    clearInterval(timer.current);
    timer.current = null;
  };

  useEffect(() => {
    playing ? startTimer() : stopTimer();
    $("#start_stop")
      .addClass(playing ? "btn-secondary" : "btn-primary")
      .removeClass(playing ? "btn-primary" : "btn-secondary");
  }, [playing]);

  const playAlarm = useCallback(() => {
    const audioElement = $("#beep")[0];
    audioElement.volume = volume;
    audioElement.play().catch((e) => {
      console.error("Error playing audio:", e);
    });
  }, [volume]);

  useEffect(() => {
    if (time === 0) {
      playAlarm();
      setShift((prev) => !prev);
    }
  }, [time, playAlarm]);

  useEffect(() => {
    setTime(minuteToSecond(session));
  }, [session]);

  useEffect(() => {
    setTime(minuteToSecond(shift ? breakSession : session));
    $("#timer-label")
      .text(shift ? "Break" : "Session")
      .addClass(shift ? "text-info" : "text-warning")
      .removeClass(shift ? "text-warning" : "text-info");
  }, [shift, breakSession, session]);

  const handleButton = ({ target }) => {
    if (!playing) {
      if (target.id.includes("break")) {
        setBreakSession((prev) =>
          target.id.includes("decrement")
            ? Math.max(1, prev - 1)
            : Math.min(60, prev + 1)
        );
      }
      if (target.id.includes("session")) {
        setSession((prev) =>
          target.id.includes("decrement")
            ? Math.max(1, prev - 1)
            : Math.min(60, prev + 1)
        );
      }
    }
  };

  const handleReset = () => {
    setPlaying(false);
    setShift(false);
    setBreakSession(5);
    setSession(25);
    setTime(minuteToSecond(25));

    $("#beep")[0].pause();
    $("#beep")[0].currentTime = 0;
  };

  // audible sound effect
  useEffect(() => {
    const clickSound = $("#click")[0];
    clickSound.currentTIme = 0;
    clickSound.play().catch((e) => {
      console.error("Error playing audio:", e);
    });
  }, [session, breakSession]);

  return (
    <>
      <h1>Pomodoro Timer</h1>
      <span id="break-label">Break Length</span>
      <span id="break-time">{breakSession}:00</span>
      <div id="break-controlpanel">
        <button id="break-decrement" onClick={handleButton}>
          {"❮"}
        </button>
        <input
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
        />
        <button id="break-increment" onClick={handleButton}>
          {"❯"}
        </button>
      </div>

      <span id="session-label">Session Length</span>
      <span id="session-time">{session}:00</span>
      <div id="session-controlpanel">
        <button id="session-decrement" onClick={handleButton}>
          {"❮"}
        </button>
        <input
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
        />
        <button id="session-increment" onClick={handleButton}>
          {"❯"}
        </button>
      </div>

      <span id="timer-label">Session</span>
      <span id="time-left">{displayTime(time)}</span>
      <div id="timer-section">
        <button
          id="start_stop"
          onClick={() => {
            setPlaying(!playing);
          }}
        >
          {playing ? "Pause" : "Start"}
        </button>
        <button id="reset" onClick={handleReset}>
          Reset
        </button>
      </div>

      <div id="notification-area">
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
        <audio
          src="https://github.com/istamosh/frontend-dev-libraries/raw/master/five-projects-certificate/my-app/src/pomodoro-timer/asset/click.wav"
          id="click"
        ></audio>
      </div>
    </>
  );
};
export default Pomodoro;
