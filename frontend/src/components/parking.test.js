import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { Parking } from "./parking";

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

it("render parking page containing 'Parking'", () => {
  act(() => {
    render(<Parking />, container);
  });
  expect(container.textContent).toMatch(/Parking/);
});