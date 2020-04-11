import React from 'react';
import styled from 'styled-components';

const MyImg = styled.img`
  width: 2.5em;
  padding-bottom: 3px;
`;

const MyA = styled.a`
  width: 100%;
  background-color: #3B579D !important;

  &:hover {
    box-shadow: 0 0 16px #4285f4;
  }
`;

const MySpan = styled.span`
  color: white;
  font-weight: bold;
`;

export class MyLoginWithFacebook extends React.Component {

  render() {
    return (
      <div className="col-12 mt-2">
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