/* global gapi */
import React from 'react';
import { Redirect } from "react-router-dom";
// import { Main } from '../main/main';
import { MyGoogleLoginButton } from '../my-google-login-button/my-google-login-button';

export class MyLoginWithGoogle extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: false,
    }

    this.getContent = this.getContent.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    // const successCallback = this.onSuccess.bind(this);

    //if (this.state.isSignedIn) return;

    console.log("Entró en my-login-with-google - componentDidMount");

    console.log(window.gapi);

    // if (gapi) {
    window.gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '847633477961-hcf33ro35b7kce8856c1ae4lp9bd5aoq.apps.googleusercontent.com',
      });

      this.auth2.attachClickHandler(document.querySelector('#login-button'), {}, this.onSuccess.bind(this));

      this.auth2.then(() => {
        console.log('on init');
        const isSignedIn = this.auth2.isSignedIn.get();
        if (this._isMounted) {
          if (this.state.isSignedIn !== isSignedIn) {
            this.setState({
              isSignedIn: isSignedIn,
            });
          }
        }

      });
    });
    // }

    // window.gapi.load('signin2', function () {
    //   // Method 3: render a sign in button
    //   // using this method will show Signed In if the user is already signed in
    //   var opts = {
    //     width: 200,
    //     height: 50,
    //     client_id: '847633477961-hcf33ro35b7kce8856c1ae4lp9bd5aoq.apps.googleusercontent.com',
    //     onsuccess: successCallback
    //   }
    //   gapi.signin2.render('login-button', opts)
    // })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onSuccess() {
    console.log('on success')
    this.setState({
      isSignedIn: true,
      err: null
    })
  }

  // onLoginFailed(err) {
  //   this.setState({
  //     isSignedIn: false,
  //     error: err,
  //   })
  // }

  getContent() {
    if (this.state.isSignedIn) {
      // this.props.onSignIn();
      return (
        <Redirect
          to={{
            pathname: "/main",
            // state: { onSignOut=this.props.onSignOut }
          }}
        />
      );
      // return (
      //   <>
      //   </>
      // )
      // return (
      //   <Redirect
      //     path='/main'
      //     render={(props) => <Main {...props} onSignOut={() => {
      //       console.log("llegó dentro my-login-with-google main");
      //       if (this.props.signedIn) this.props.onSignIn();
      //     }} />}
      //   />
      // )

    } else {
      return (
        <MyGoogleLoginButton />
      )
    }

  }

  render() {
    return (
      <>
        {this.getContent()}
      </>
    );
  }
}