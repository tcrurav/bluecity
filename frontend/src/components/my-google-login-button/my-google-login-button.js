import React from 'react';
import './my-google-login-button.css';

export class MyGoogleLoginButton extends React.Component {

  render() {
    return (
      <div className="col-12">
        {/* <a className="btn btn-outline-dark my-google-outline" href="/main" role="button"> */}
        <a className="btn btn-outline-dark my-google-outline" id="login-button" role="button">
          <img className="my-google-social-icon"
            alt="Google sign-in"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
          <span className="my-black">Login with Google</span>
        </a>
      </div>
    );
  }
}

