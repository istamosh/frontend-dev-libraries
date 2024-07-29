// App.test.js
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Pomodoro from "./App";

test("decrements break length by 1 when decrement button is clicked", () => {
  render(<Pomodoro />);

  const decrementButton = screen.getByTestId("break-decrement");
  const breakValue = screen.getByText("5");

  fireEvent.click(decrementButton);

  expect(breakValue.textContent).toBe("4");
});

// run with "npm test"
