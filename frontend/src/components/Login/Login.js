import React from 'react';
import { MyAuthButtons } from '../my-auth-buttons/my-auth-buttons';

export class Login extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <img className="img-fluid" src="img/bluecity.jpg" alt="logo" />
        </div>
        <div className="row text-center justify-content-center">
          <div className="col-10 mx-20">
            <MyAuthButtons 
            // onSignIn={this.props.onSignIn}
            />
          </div>
        </div>
      </div>
    );
  }
}