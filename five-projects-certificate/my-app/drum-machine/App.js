const DrumMachine = () => {
  return (
    <>
      <div id="drum-machine">
        <div id="display"></div>
        <div class='drum-pad' id="drum-pad-1">Q<audio class='clip' src=""></audio> </div>
        <div class='drum-pad' id="drum-pad-2">W<audio class='clip' src=""></audio> </div>
        <div class='drum-pad' id="drum-pad-3">E<audio class='clip' src=""></audio> </div>
        <div class='drum-pad' id="drum-pad-4">A<audio class='clip' src=""></audio> </div>
        <div class='drum-pad' id="drum-pad-5">S<audio class='clip' src=""></audio> </div>
        <div class='drum-pad' id="drum-pad-6">D<audio class='clip' src=""></audio> </div>
        <div class='drum-pad' id="drum-pad-7">Z<audio class='clip' src=""></audio> </div>
        <div class='drum-pad' id="drum-pad-8">X<audio class='clip' src=""></audio> </div>
        <div class='drum-pad' id="drum-pad-9">C<audio class='clip' src=""></audio> </div>
      </div>
    </>
  );
};

export default DrumMachine;
