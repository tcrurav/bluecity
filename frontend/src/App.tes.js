import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import App from "./App";

let container = null;
let myScript = null;

beforeEach(() => {
  // set a DOM element as a rendering target
  container = document.createElement("div");
  document.body.appendChild(container);
  // create script element in DOM to avoid error in my-login-with-google.js in parentNode
  myScript = document.createElement("script");
  document.body.appendChild(myScript);
});

afterEach(() => {
  // cleaning when leaving
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  unmountComponentAtNode(myScript);
  myScript.remove();
  myScript = null;
});

it("By default the App shows 'Login with Google' and 'Login with Facebook'", () => {
  act(() => {
    render(<App />, container);
  });
  expect(container.textContent).toMatch(/Login with GoogleLogin with Facebook/);
});
