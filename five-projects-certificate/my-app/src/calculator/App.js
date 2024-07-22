import React, { useState, useRef, useEffect } from "react";
import $ from "jquery";
import { evaluate } from "mathjs";
import "./styles/style.css";

const buttons = [
  { id: "clear", key: "c", label: "C" },
  { id: "divide", key: "/", label: "÷" },
  { id: "multiply", key: "*", label: "×" },
  { id: "subtract", key: "-", label: "-" },
  { id: "eight", key: "8", label: "8" },
  { id: "nine", key: "9", label: "9" },
  { id: "seven", key: "7", label: "7" },
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
        $("#app").addClass(
          "d-flex flex-column align-items-center bg-light border"
        );
        $("h1").addClass("text-center text-wrap m-2");
        $("#memory-display").addClass("form-text text-end form-control");
        $("#display")
          .addClass("form-text text-end form-control mb-2")
          .css({ color: "blue" });
        $(".clickables")
          .css({
            display: "grid",
            "grid-template-columns": "repeat(4, 1fr)",
            "grid-template-rows": "repeat(3, 1fr)",
            "max-width": "160px",
          })
          .addClass("text-center gap-1");
        $(".clickables")
          .children()
          .addClass(
            "btn btn-dark bg-gradient btn-like-div d-flex align-items-center justify-content-center"
          );
        $("#add").css({
          "grid-column": "4",
          "grid-row": "2/4",
        });
        $("#zero").css({
          "grid-column": "1/3",
        });
        $("#equals").css({
          "grid-column": "4",
          "grid-row": "4/6",
        });
        $("span").addClass("text-center text-secondary text-wrap mt-2");
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
      input !== undefined ? buttons.find((el) => el.id === input) : "";

    $(`#${assigned.id}`).addClass("button-animation");
    setTimeout(() => {
      $(`#${assigned.id}`).removeClass("button-animation");
    }, 100);

    switch (assigned.key) {
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
        setInput((prev) => handleOperator(prev, assigned.key));
        break;
      case "=":
        setInput((prev) => handleEquation(prev));
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        setInput((prev) => (prev === "0" ? assigned.key : prev + assigned.key));
        break;
      default:
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
      <h1>Calculator</h1>
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
      <span>made with ❤️ by Istamosh.</span>
    </>
  );
};

export default Engine;
