import React from "react";

const DrumPad = (props) => (
  <input
    className="drum-pad"
    id={`drum-pad-${props.number}`}
    type="button"
    value={`${props.string}`}
    onClick={() => {
      new Audio(props.audio).play();
    }}
  />
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
  audioSamples.forEach((val, i) => {
    drumPads.push(
      <DrumPad
        number={i + 1}
        audio={`https://cdn.freecodecamp.org/testable-projects-fcc/audio/${val.link}`}
        string={val.key}
      />
    );
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
