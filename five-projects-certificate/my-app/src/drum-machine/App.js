import React from "react";

const audioSamples = {
  heaterOne:
    "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3",
  heaterTwo:
    "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3",
  heaterThree:
    "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3",
  heaterFour:
    "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3",
  clap: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3",
  openHH: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3",
  kickAndHat:
    "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3",
  kick: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3",
  closedHH:
    "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3",
};

const DrumPad = (i) => {
  return (
    <div class="drum-pad" id={`drum-pad-${i}`}>
      {key}
      <input type="button" value="Play" onClick={play} />
    </div>
  );
};

const DrumMachine = () => {
  const play = () => {
    new Audio(audioSamples.heaterOne).play();
  };
  return (
    <>
      <div id="drum-machine">
        <div id="display"></div>
        <div class="drum-pad" id="drum-pad-1">
          Q<input type="button" value="PLAY" onClick={play}></input>
          {/* <audio
            id="q"
            class="clip"
            src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3"
            type="audio/mpeg"
          ></audio>{" "} */}
        </div>
        <div class="drum-pad" id="drum-pad-2">
          W<audio class="clip" src=""></audio>{" "}
        </div>
        <div class="drum-pad" id="drum-pad-3">
          E<audio class="clip" src=""></audio>{" "}
        </div>
        <div class="drum-pad" id="drum-pad-4">
          A<audio class="clip" src=""></audio>{" "}
        </div>
        <div class="drum-pad" id="drum-pad-5">
          S<audio class="clip" src=""></audio>{" "}
        </div>
        <div class="drum-pad" id="drum-pad-6">
          D<audio class="clip" src=""></audio>{" "}
        </div>
        <div class="drum-pad" id="drum-pad-7">
          Z<audio class="clip" src=""></audio>{" "}
        </div>
        <div class="drum-pad" id="drum-pad-8">
          X<audio class="clip" src=""></audio>{" "}
        </div>
        <div class="drum-pad" id="drum-pad-9">
          C<audio class="clip" src=""></audio>{" "}
        </div>
      </div>
    </>
  );
};

export default DrumMachine;
