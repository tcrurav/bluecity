import React from 'react';
import styled from 'styled-components';

const MyImg = styled.img`
  width: 2.5em;
  padding-bottom: 3px;
  /* padding-right: 5px; */
`;

const MyA = styled.a`
  width: 100%;
  /* text-transform: none; */
  background-color: #3B579D !important;

 :hover {
  width: 100%;
  /* text-transform: none; */
  background-color: darkslategray !important;
`;

const MySpan = styled.span`
  color: white;
  font-weight: bold;
`;

export class MyLoginWithFacebook extends React.Component {

  render() {
    return (
      <div className="col-12 mt-2 my-blue">
          <MyA className="btn btn-outline-dark" href="/main" role="button">
            <MyImg
              alt="Google sign-in"
              src="img/facebook.jpg" />
            <MySpan>Login with Facebook</MySpan>
          </MyA>
      </div>
    );
  }
}