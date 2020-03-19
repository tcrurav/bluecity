import React from 'react';
import { MyLoginWithGoogle } from '../MyLoginWithGoogle/MyLoginWithGoogle';
import { MyLoginWithFacebook } from '../MyLoginWithFacebook/MyLoginWithFacebook';

export class MyAuthButtons extends React.Component {
  render() {
    return (
      <>
        <div className="row">
          <MyLoginWithGoogle />
        </div>
        <div className="row">
          <MyLoginWithFacebook />
        </div>
      </>
    );
  }
}