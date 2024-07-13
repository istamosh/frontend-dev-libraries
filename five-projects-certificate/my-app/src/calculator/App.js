import React, { useState, useRef, useEffect } from "react";
import $ from "jquery";

const buttons = [
  { id: "clear", char: "C", label: "C" },
  { id: "divide", char: "/", label: "÷" },
  { id: "seven", char: "7", label: "7" },
  { id: "eight", char: "8", label: "8" },
  { id: "nine", char: "9", label: "9" },
  { id: "multiply", char: "*", label: "×" },
  { id: "four", char: "4", label: "4" },
  { id: "five", char: "5", label: "5" },
  { id: "six", char: "6", label: "6" },
  { id: "subtract", char: "-", label: "-" },
  { id: "one", char: "1", label: "1" },
  { id: "two", char: "2", label: "2" },
  { id: "three", char: "3", label: "3" },
  { id: "add", char: "+", label: "+" },
  { id: "negate", char: "+/-", label: "+/-" },
  { id: "zero", char: "0", label: "0" },
  { id: "decimal", char: ".", label: "." },
  { id: "equals", char: "=", label: "=" },
];

const Engine = () => {
  const [result, setResult] = useState("0");

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      $(function () {
        $("body").addClass(
          "d-flex justify-content-center align-items-center vh-100"
        );
        $("#display")
          .addClass("form-text text-end w-100")
          .css({ color: "blue" });
        $(".clickables")
          .css({
            display: "grid",
            "grid-template-columns": "repeat(4, 1fr)",
            "grid-template-rows": "repeat(3, 1fr)",
          })
          .addClass("text-center gap-1");
        $(".clickables")
          .children("div[id]")
          .addClass("btn btn-dark bg-gradient btn-like-div");
      });
      document.addEventListener("keydown", buttonPress);
      mounted.current = true;
      return () => {
        document.removeEventListener("keydown", buttonPress);
      };
    } else {
      document.addEventListener("keydown", buttonPress);
      return () => {
        document.removeEventListener("keydown", buttonPress);
      };
    }
  });

  const buttonPress = ({ key, target }) => {
    console.log(`keypress: ${key}, click: ${target.innerText[0]}`);
  };

  let displayButtons = [<div key="empty1"></div>, <div key="empty2"></div>];
  buttons.forEach((el) => {
    displayButtons.push(
      <div id={el.id} key={el.id} onClick={buttonPress}>
        {el.label}
      </div>
    );
  });
  return (
    <>
      <input
        type="text"
        name="result"
        id="display"
        value={result}
        onChange={({ target }) => setResult(target.value)}
        readOnly
        disabled
      />
      <div className="clickables">{displayButtons}</div>
    </>
  );
};

export default Engine;
