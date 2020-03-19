import React from 'react';
import './styles.css';

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class MyLoginWithFacebook extends React.Component {

  render() {
    return (
      <div className="col-12 mt-2 my-blue">
          <a className="btn btn-outline-dark my-fb-outline" href="/main" role="button">
            <img className="my-fb-social-icon"
              alt="Google sign-in"
              src="img/facebook.jpg" />
            <span className="my-white">Login with Facebook</span>
          </a>
      </div>
    );
  }
}