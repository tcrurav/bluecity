import React from 'react';
import { Redirect } from 'react-router-dom';

export class MyError extends React.Component {

  render() {
    return (
      <Redirect
        to={{
          pathname: "/login",
          // state: { onSignOut=this.props.onSignOut }
        }}
      />
    )
  }
}