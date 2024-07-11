import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "./styles/style.css";

const DrumPad = (props) => (
  <div className="drum-pad" id={props.id} onClick={props.trigger}>
    <audio className="clip" src={props.audio} id={props.string}></audio>
    {props.string}
  </div>
);

const DrumMachine = () => {
  const [text, setText] = useState("-");
  const [volume, setVolume] = useState("0.5");

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      document.addEventListener("keydown", hitDrum);

      // warm up the audios
      const audios = $("audio");
      Object.keys(audios)
        .splice(0, audios.length)
        .forEach((el) => {
          audios[el].preload = "auto";
          audios[el].load();
          audios[el].muted = true;
        });

      $(function () {
        $("body").addClass(
          "d-flex justify-content-center align-items-center vh-100"
        );
        $("#drum-machine")
          .css({
            "max-width": "230px",
            "max-height": "500px",
            width: "100%",
            height: "100%",
          })
          .addClass("bg-light border d-flex flex-column");
        $("#drum-machine > h1").addClass("text-wrap text-center lh-1");
        $(".pad-container").css({
          display: "grid",
          "grid-template-columns": "repeat(3, 1fr)",
          "grid-template-rows": "repeat(3, 1fr)",
        });
        $("#display")
          .css({
            "text-align": "center",
          })
          .addClass("p-2 bg-primary text-white rounded");
        $(".drum-pad")
          .css({
            "text-align": "center",
            padding: "25px 30px",
          })
          .addClass("border btn btn-dark bg-gradient btn-like-div");
        $("#drum-machine > label").addClass("text-center text-primary");
        $("#volume-control").addClass("form-range");
      });

      mounted.current = true;
      return () => {
        document.removeEventListener("keydown", hitDrum);
      };
    } else {
      document.addEventListener("keydown", hitDrum);
      return () => {
        document.removeEventListener("keydown", hitDrum);
      };
    }
  });

  const audioSamples = [
    { link: "Heater-1", key: "Q", instrumentName: "Heater I" },
    { link: "Heater-2", key: "W", instrumentName: "Heater II" },
    { link: "Heater-3", key: "E", instrumentName: "Heater III" },
    { link: "Heater-4_1", key: "A", instrumentName: "Heater IV" },
    { link: "Heater-6", key: "S", instrumentName: "Clap" },
    { link: "Dsc_Oh", key: "D", instrumentName: "Open HH" },
    { link: "Kick_n_Hat", key: "Z", instrumentName: "Kick n' Hat" },
    { link: "RP4_KICK_1", key: "X", instrumentName: "Kick" },
    { link: "Cev_H2", key: "C", instrumentName: "Closed HH" },
  ];

  const hitDrum = ({ key, target }) => {
    const audio = $(`#${key ? key.toUpperCase() : target.innerText}`)[0];
    if (audio) {
      audio.play();
      // instantiating the audio to prevent error
      const audioInstance = new Audio(audio.src);
      audioInstance.volume = volume;
      audioInstance.currentTime = 0;
      audioInstance.play();
      setText($(audio).parent().attr("id").toUpperCase().replace(/-/g, " "));

      setTimeout(() => {
        audioInstance.pause();
        audioInstance.src = "";
      }, 1000);

      $(audio).parent().addClass("button-animation");
      setTimeout(() => {
        $(audio).parent().removeClass("button-animation");
      }, 100);
    }
  };

  const drumPads = [];
  audioSamples.forEach((val) => {
    drumPads.push(
      <DrumPad
        key={val.instrumentName.replace(/\s+/g, "-").toLowerCase()}
        id={val.instrumentName.replace(/\s+/g, "-").toLowerCase()}
        audio={`https://cdn.freecodecamp.org/testable-projects-fcc/audio/${val.link}.mp3`}
        string={val.key}
        trigger={hitDrum}
      />
    );
  });

  return (
    <div id="drum-machine">
      <h1>Istamosh Drumboard</h1>
      <div id="display">{text}</div>
      <div className="pad-container">{drumPads}</div>
      <label htmlFor="volume-control" className="volume-label">
        - Volume Control -
      </label>
      <input
        type="range"
        name="volume"
        id="volume-control"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={({ target }) => setVolume(target.value)}
      />
    </div>
  );
};

export default DrumMachine;
