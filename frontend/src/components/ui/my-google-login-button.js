import React from 'react';
import styled from "styled-components";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import { capitalize } from '@material-ui/core';

const MyImg = styled.img`
  width: 20px;
  margin-bottom: 3px;
  margin-right: 5px;
`;

// const MyA = styled.a`
//   width: 100%;
//   background-color: #fff !important;
  
//   &:hover {
//     box-shadow: 0 0 16px #4285f4;
//   }
// `;

const MySpan = styled.span`
  font-weight: bold;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '75vw',
    backgroundColor: '#fff',
    '&:hover': {
      boxShadow: '0, 0, 16px #4285f4',
    },
    border: '1px solid',
    borderRadius: '.25rem',
    padding: '.375rem .75rem',
    textTransform: 'capitalize',
  },
  myButton: {
    margin: '0 auto',
  }
}));

export default function MyGoogleLoginButton() {

  const classes = useStyles();
    return (
      <div className={classes.myButton}>
        {/* <MyA className="btn btn-outline-dark" id="login-button" role="button">
          <MyImg
            alt="Google sign-in"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
          <MySpan>Login with Google</MySpan>
        </MyA> */}
        <Button className={classes.root} id="login-button" variant="contained">
          <MyImg alt="Google sign-in" src="img/Google__G__Logo.svg.webp" />
          <MySpan>Login with Google</MySpan>
        </Button>
      </div>
    );
  }

