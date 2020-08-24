import React from 'react';
import { MyLoginWithGoogle } from './my-login-with-google';
import { MyLoginWithFacebook } from './my-login-with-facebook';

export class MyAuthButtons extends React.Component {
  render() {
    return (
      <>
        <div className="row">
          <MyLoginWithGoogle history={this.props.history} changeLoadingState={ this.props.changeLoadingState } />
        </div>
        <div className="row">
          <MyLoginWithFacebook />
        </div>
      </>
    );
  }
}