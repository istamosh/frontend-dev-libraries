import React, { useEffect, useRef } from "react";
import $ from "jquery";

const DrumPad = (props) => (
  // <input
  //   className="drum-pad"
  //   id={`drum-pad-${props.number}`}
  //   type="button"
  //   value={props.string}
  //   onClick={() => {
  //     new Audio(props.audio).play();
  //   }}
  // />
  <div className="drum-pad" id={props.id}>
    <audio className="clip" src={props.audio} id={props.string}></audio>
    {props.string}
  </div>
);

const DrumMachine = () => {
  let audioSamples = [
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

  const drumPads = [];
  audioSamples.forEach((val) => {
    drumPads.push(
      <DrumPad
        // number={i + 1}
        id={val.link.substring(0, val.link.length - 4)}
        audio={`https://cdn.freecodecamp.org/testable-projects-fcc/audio/${val.link}`}
        string={val.key}
        key={val.link.substring(0, val.link.length - 4)}
      />
    );
  });

  // const play = (arg) => {
  //   document.querySelector("audio").play();
  // };

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      $(document).ready(function () {
        $(".drum-pad").each((i, obj) => {
          console.log(obj);
        });
      });
      mounted.current = true;
    } else {
    }
  });

  return (
    <>
      <div id="drum-machine">
        <div id="display"></div>
        {drumPads}
      </div>
    </>
  );
};

export default DrumMachine;
