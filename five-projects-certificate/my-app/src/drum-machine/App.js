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
            "max-width": "500px",
            "max-height": "500px",
            width: "100%",
            height: "100%",
          })
          .addClass("bg-light border d-flex flex-column");
        $(".pad-container").css({
          display: "grid",
          "grid-template-columns": "repeat(3, 1fr)",
          "grid-template-rows": "repeat(3, 1fr)",
        });
        $("#display").css({
          "text-align": "center",
        });
        $(".drum-pad")
          .css({
            "text-align": "center",
            padding: "25px 30px",
          })
          .addClass("border btn btn-dark btn-like-div");
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
    { link: "Heater-1", key: "Q" },
    { link: "Heater-2", key: "W" },
    { link: "Heater-3", key: "E" },
    { link: "Heater-4_1", key: "A" },
    { link: "Heater-6", key: "S" },
    { link: "Dsc_Oh", key: "D" },
    { link: "Kick_n_Hat", key: "Z" },
    { link: "RP4_KICK_1", key: "X" },
    { link: "Cev_H2", key: "C" },
  ];

  const hitDrum = ({ key, target }) => {
    const audio = $(`#${key ? key.toUpperCase() : target.innerText}`)[0];
    if (audio) {
      audio.play();
      // instantiating the audio to prevent error
      const audioInstance = new Audio(audio.src);
      audioInstance.currentTime = 0;
      audioInstance.play();
      setText(audio.src.substring(57, audio.src.length - 4));

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
        key={val.link.substring(0, val.link.length)}
        id={val.link.substring(0, val.link.length)}
        audio={`https://cdn.freecodecamp.org/testable-projects-fcc/audio/${val.link}.mp3`}
        string={val.key}
        trigger={hitDrum}
      />
    );
  });

  return (
    <div id="drum-machine">
      <div id="display">{text}</div>
      <div className="pad-container">{drumPads}</div>
    </div>
  );
};

export default DrumMachine;
