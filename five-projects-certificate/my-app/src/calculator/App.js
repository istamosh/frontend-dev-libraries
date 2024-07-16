import React, { useState, useRef, useEffect } from "react";
import $ from "jquery";
import { evaluate } from "mathjs";

const buttons = [
  { id: "clear", key: "c", label: "C" },
  { id: "divide", key: "/", label: "÷" },
  { id: "seven", key: "7", label: "7" },
  { id: "eight", key: "8", label: "8" },
  { id: "nine", key: "9", label: "9" },
  { id: "multiply", key: "*", label: "×" },
  { id: "four", key: "4", label: "4" },
  { id: "five", key: "5", label: "5" },
  { id: "six", key: "6", label: "6" },
  { id: "subtract", key: "-", label: "-" },
  { id: "one", key: "1", label: "1" },
  { id: "two", key: "2", label: "2" },
  { id: "three", key: "3", label: "3" },
  { id: "add", key: "+", label: "+" },
  { id: "negate", key: "n", label: "+/-" },
  { id: "zero", key: "0", label: "0" },
  { id: "decimal", key: ".", label: "." },
  { id: "equals", key: "=", label: "=" },
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

  const cleanValue = (params) => {
    // split the numbers and operators into an array
    let separatedSegments = params.split(/([+\-*/])/);

    const transformString = (str) => {
      // check if it's the operator
      if (/[+\-/*]/.test(str)) {
        return str;
      }

      let firstCommaIndex = str.indexOf(".") + 1;
      let substringBefore = str.substring(0, firstCommaIndex);
      // store trailing char after comma, remove all commas, and remove trailing zeroes until end
      let substringAfter = str
        .substring(firstCommaIndex)
        .replace(/\./g, "")
        .replace(/0+$/, "");
      // console.log(substringBefore + ", " + substringAfter);
      // concat the processed strings, if the 2nd half is empty then remove the first comma of 1st string
      let concatenated =
        substringAfter !== ""
          ? substringBefore + substringAfter
          : substringBefore + "0";
      return concatenated.startsWith(".") ? "0" + concatenated : concatenated;
    };

    // process segments using above function, then join, then accept last operator if it have consecutive operators
    return separatedSegments
      .map((el) => transformString(el))
      .join("")
      .replace(/([+\-/*]){2,}/g, (match) => match.slice(-1));
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
        setResult("0");
        break;
      case "n":
        setResult((prevValue) =>
          Array.from(prevValue)[0] === "-"
            ? prevValue.slice(1)
            : "-" + prevValue
        );
        break;
      case "=":
        // setResult((prevValue) => parseFloat(evaluate(cleanValue(prevValue))));
        setResult((prevValue) => evaluate(prevValue));
        break;
      case "":
        break;
      default:
        setResult((prevValue) =>
          prevValue === "0" ? assigned : prevValue + assigned
        );
    }
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
        // onChange={({ target }) => setResult(target.value)}
        readOnly
        disabled
      />
      <div className="clickables">{displayButtons}</div>
    </>
  );
};

export default Engine;
