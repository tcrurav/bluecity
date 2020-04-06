import React from 'react';
import GoogleLogin from 'react-google-login';
import './styles.css';

const responseGoogle = (response) => {
  console.log(response);
}

export class MyGoogleButton extends React.Component {
  render() {
    return (
      <div className="col-centered">
        <GoogleLogin
          clientId="139079604367-6fuu61lmh1f07kd227a3dp0qmmgin3uk.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    );
  }
}