import React, { useState, useRef, useEffect } from "react";
import $ from "jquery";
import { evaluate } from "mathjs";

const buttons = [
  { id: "clear", key: "c", label: "C" },
  { id: "divide", key: "/", label: "÷" },
  { id: "multiply", key: "*", label: "×" },
  { id: "seven", key: "7", label: "7" },
  { id: "eight", key: "8", label: "8" },
  { id: "nine", key: "9", label: "9" },
  { id: "subtract", key: "-", label: "-" },
  { id: "four", key: "4", label: "4" },
  { id: "five", key: "5", label: "5" },
  { id: "six", key: "6", label: "6" },
  { id: "add", key: "+", label: "+" },
  { id: "one", key: "1", label: "1" },
  { id: "two", key: "2", label: "2" },
  { id: "three", key: "3", label: "3" },
  { id: "zero", key: "0", label: "0" },
  { id: "decimal", key: ".", label: "." },
  { id: "equals", key: "=", label: "=" },
];

const Engine = () => {
  const [memory, setMemory] = useState("");
  const [input, setInput] = useState("0");

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      $(function () {
        $("body").addClass(
          "d-flex justify-content-center align-items-center vh-100"
        );
        $("#app").addClass("d-flex flex-column");
        $("#memory-display").addClass("form-text text-end");
        $("#display").addClass("form-text text-end").css({ color: "blue" });
        $(".clickables")
          .css({
            display: "grid",
            "grid-template-columns": "repeat(4, 1fr)",
            "grid-template-rows": "repeat(3, 1fr)",
          })
          .addClass("text-center gap-1");
        $(".clickables")
          .children()
          .addClass(
            "btn btn-dark bg-gradient btn-like-div d-flex align-items-center justify-content-center"
          );
        $("#clear").css({
          "grid-column": "1/3",
          "grid-row": "1/2",
        });
        $("#zero").css({
          "grid-column": "1/3",
        });
        $("#equals").css({
          "grid-column": "4/5",
          "grid-row": "4/6",
        });
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

  const handleOperator = (prevInput, operator) => {
    if (prevInput) {
      setMemory((prev) => prev + prevInput + operator);
    } else {
      if (operator === "-") {
        setMemory((prev) => (/-$/.test(prev) ? prev : prev + operator));
      } else {
        setMemory((prev) =>
          /[*/+]-$/.test(prev)
            ? prev.replace(/.{2}$/, operator)
            : prev.replace(/.$/, operator)
        );
      }
    }
    return "";
  };
  const handleEquation = (prevInput) => {
    let calc =
      /[/*+-]$/.test($("#memory-display").val()) && prevInput
        ? evaluate(memory + prevInput)
        : !prevInput
        ? evaluate(memory.replace(/.$/, ""))
        : prevInput;
    setMemory("");
    return calc;
  };

  const buttonPress = ({ key, target }) => {
    let input;
    if (key) {
      const selectedButton = buttons.find((el) => key.toLowerCase() === el.key);
      if (selectedButton) {
        input = selectedButton.id;
      }
    } else {
      input = target.id;
    }

    const assigned =
      input !== undefined ? buttons.find((el) => el.id === input).key : "";
    switch (assigned) {
      case "c":
        setMemory("");
        setInput("0");
        break;
      case ".":
        setInput((prevValue) =>
          prevValue.includes(".") ? prevValue : prevValue + "."
        );
        break;
      case "+":
      case "/":
      case "*":
      case "-":
        setInput((prev) => handleOperator(prev, assigned));
        break;
      case "=":
        setInput((prev) => handleEquation(prev));
        break;
      case "":
        break;
      default:
        setInput((prev) => (prev === "0" ? assigned : prev + assigned));
        break;
    }
  };

  let displayButtons = [];
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
        name="memory"
        id="memory-display"
        value={memory}
        readOnly
        disabled
      />
      <input
        type="text"
        name="input"
        id="display"
        value={input}
        readOnly
        disabled
      />

      <div className="clickables">{displayButtons}</div>
    </>
  );
};

export default Engine;
