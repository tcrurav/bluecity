/* global gapi */
import React from 'react';
import { Redirect } from "react-router-dom";
import { MyGoogleLoginButton } from '../my-google-login-button/my-google-login-button';
import { setUserSession } from '../../utils/common';

// I have implemented the solution of this url:
// https://w3path.com/react-google-login-with-example/
export class MyLoginWithGoogle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: false,
    }

    this.getContent = this.getContent.bind(this);
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
      if (d.getElementById(id)) { return; }
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
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        
        //YOUR CODE HERE
        setUserSession(googleUser.getAuthResponse().id_token, profile);

        this.setState({
          isSignedIn: true
        })

      }, (error) => {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }



  // componentDidMount() {
  //   this._isMounted = true;

  //   console.log("Entró en my-login-with-google - componentDidMount");

  //   console.log(window.gapi);

  //   window.gapi.load('auth2', () => {
  //     this.auth2 = gapi.auth2.init({
  //       client_id: '847633477961-hcf33ro35b7kce8856c1ae4lp9bd5aoq.apps.googleusercontent.com',
  //     });

  //     this.auth2.attachClickHandler(document.querySelector('#login-button'), {}, this.onSuccess.bind(this));

  //     this.auth2.then(() => {
  //       console.log('on init');
  //       const isSignedIn = this.auth2.isSignedIn.get();
  //       if (this._isMounted) {
  //         if (this.state.isSignedIn !== isSignedIn) {
  //           this.setState({
  //             isSignedIn: isSignedIn,
  //           });
  //         }
  //       }

  //     });
  //   });
  //   // }

  //   // window.gapi.load('signin2', function () {
  //   //   // Method 3: render a sign in button
  //   //   // using this method will show Signed In if the user is already signed in
  //   //   var opts = {
  //   //     width: 200,
  //   //     height: 50,
  //   //     client_id: '847633477961-hcf33ro35b7kce8856c1ae4lp9bd5aoq.apps.googleusercontent.com',
  //   //     onsuccess: successCallback
  //   //   }
  //   //   gapi.signin2.render('login-button', opts)
  //   // })
  // }

  // componentWillUnmount() {
  //   this._isMounted = false;
  // }

  // onSuccess() {
  //   console.log('on success')
  //   this.setState({
  //     isSignedIn: true,
  //     err: null
  //   })
  // }

  // onLoginFailed(err) {
  //   this.setState({
  //     isSignedIn: false,
  //     error: err,
  //   })
  // }

  getContent() {
    console.log("getContent")
    if (this.state.isSignedIn) {
      return (
        <Redirect to={{ pathname: "/main", }} />
      );
    } else {
      return (
        <MyGoogleLoginButton />
      );
    }
  }

  render() {
    console.log("render")
    return (
      <>
        {this.getContent()}
      </>
    );
  }
}