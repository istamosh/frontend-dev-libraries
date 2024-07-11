import React, { useState } from "react";

const buttons = [
  { id: "negate", char: "+/-" },
  { id: "zero", char: "0" },
  { id: "decimal", char: "." },
  { id: "equals", char: "=" },
  { id: "one", char: "1" },
  { id: "two", char: "2" },
  { id: "three", char: "3" },
  { id: "add", char: "+" },
  { id: "four", char: "4" },
  { id: "five", char: "5" },
  { id: "six", char: "6" },
  { id: "subtract", char: "-" },
  { id: "seven", char: "7" },
  { id: "eight", char: "8" },
  { id: "nine", char: "9" },
  { id: "multiply", char: "*" },
  { id: "clear", char: "C" },
  { id: "divide", char: "/" },
];

const Engine = () => {
  const [result, setResult] = useState("0");

  let displayButtons = [];
  buttons.forEach((el) => {
    displayButtons.push(
      <div id={el.id} key={el.id}>
        {el.char}
      </div>
    );
  });
  return (
    <>
      <div id="display">{result}</div>
      <div className="clickables">{displayButtons}</div>
    </>
  );
};

export default Engine;
