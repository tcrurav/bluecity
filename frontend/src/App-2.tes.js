import React from "react";
import ReactDOM from "react-dom";
import Main from "./components/main";
// import {
//   useAuth0
// } from "react-auth0-spa";

// const user = {
//   email: "tiburcio.cruz@gmail.com",
//   email_verified: true,
//   sub: "google-oauth2|12345678901234"
// };

// // intercept the useAuth0 function and mock it
// jest.mock("react-auth0-spa");

// describe("First test", () => {
//   beforeEach(() => {
//     // const mockedUseAuth0 = <jest.Mock<typeof useAuth0>>useAuth0;
//     // Mock the Auth0 hook and make it return a logged in state
//     useAuth0.mockReturnValue({
//       isAuthenticated: true,
//       user,
//       logout: jest.fn(),
//       loginWithRedirect: jest.fn()
//     });
//   });

//   it("renders without crashing", () => {
//     const div = document.createElement("div");
//     ReactDOM.render( <Main /> , div);
//   });
// });