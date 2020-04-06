import React from 'react';
import { MyLoginWithGoogle } from '../my-login-with-google/my-login-with-google';
import { MyLoginWithFacebook } from '../my-login-with-facebook/my-login-with-facebook';

export class MyAuthButtons extends React.Component {
  render() {
    return (
      <>
        <div className="row">
          <MyLoginWithGoogle 
          // onSignIn={this.props.onSignIn} 
          />
        </div>
        <div className="row">
          <MyLoginWithFacebook />
        </div>
      </>
    );
  }
}