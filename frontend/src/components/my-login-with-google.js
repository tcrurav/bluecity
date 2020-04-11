/* global gapi */
import React from 'react';
import { MyGoogleLoginButton } from './my-google-login-button';
import { setUserSession } from '../utils/common';

// I have implemented the solution of this url:
// https://w3path.com/react-google-login-with-example/

export class MyLoginWithGoogle extends React.Component {
  constructor(props) {
    super(props);

    this.prepareLoginButton = this.prepareLoginButton.bind(this);
    this.googleSDK = this.googleSDK.bind(this);
  }

  googleSDK() {
    console.log("googleSDK");
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '847633477961-hcf33ro35b7kce8856c1ae4lp9bd5aoq.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLoginButton();
      });
    }

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { 
        window['googleSDKLoaded']();
        return; 
      }
      js = d.createElement(s); js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));

  }

  componentDidMount() {
    console.log("componentDidMount")
    this.googleSDK();
  }

  prepareLoginButton = () => {
    console.log("prepareLoginButton")
    this.auth2.attachClickHandler(document.querySelector('#login-button'), {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        // console.log('Token || ' + googleUser.getAuthResponse().id_token);
        // console.log('ID: ' + profile.getId());
        // console.log('Name: ' + profile.getName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail());
        
        //YOUR CODE HERE
        setUserSession(googleUser.getAuthResponse().id_token, profile);
        this.props.history.push("/main");
        
      }, (error) => {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  render() {
    console.log("render")
    return (
      <MyGoogleLoginButton />
    );
  }
}