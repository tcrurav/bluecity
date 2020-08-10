import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { Main } from "./main";

let container = null;

beforeEach(() => {
  // set a DOM element as a rendering target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleaning when leaving
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("render main component showing the 2 buttons Parking and Renting", () => {
  act(() => {
    render(<Main />, container);
  });
  expect(container.textContent).toMatch(/ParkingRenting/);
});