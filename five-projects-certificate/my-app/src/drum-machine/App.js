import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";

const DrumPad = (props) => (
  <div className="drum-pad" id={props.id} onClick={props.trigger}>
    <audio className="clip" src={props.audio} id={props.string}></audio>
    {props.string}
  </div>
);

const DrumMachine = () => {
  const [text, setText] = useState("");

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      document.addEventListener("keydown", hitDrum);
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
    { link: "Heater-1.mp3", key: "Q" },
    { link: "Heater-2.mp3", key: "W" },
    { link: "Heater-3.mp3", key: "E" },
    { link: "Heater-4_1.mp3", key: "A" },
    { link: "Heater-6.mp3", key: "S" },
    { link: "Dsc_Oh.mp3", key: "D" },
    { link: "Kick_n_Hat.mp3", key: "Z" },
    { link: "RP4_KICK_1.mp3", key: "X" },
    { link: "Cev_H2.mp3", key: "C" },
  ];

  const hitDrum = ({ key, target }) => {
    const audio = $(`#${key ? key.toUpperCase() : target.innerText}`)[0];
    if (audio) {
      audio.play();
      setText(audio.src.substring(57, audio.src.length - 4));
    }
  };

  const drumPads = [];
  audioSamples.forEach((val) => {
    drumPads.push(
      <DrumPad
        key={val.link.substring(0, val.link.length - 4)}
        id={val.link.substring(0, val.link.length - 4)}
        audio={`https://cdn.freecodecamp.org/testable-projects-fcc/audio/${val.link}`}
        string={val.key}
        trigger={hitDrum}
      />
    );
  });

  return (
    <div id="drum-machine">
      <div id="display">{text}</div>
      {drumPads}
    </div>
  );
};

export default DrumMachine;
