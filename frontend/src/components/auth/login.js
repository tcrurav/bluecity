import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";

import { MyAuthButtons } from '../ui/my-auth-buttons';
import { MyContainer } from '../ui/my-container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { BallBeat } from 'react-pure-loaders';

const useStyles = makeStyles({
  bgImage: {
    /* Full height */
    // height: "1vh",
    // width: "100vw",
    height: "100vh",

    /* Center and scale the image nicely */
    // backgroundPosition: "center",
    // backgroundRepeat: "repeat",
    // backgroundSize: "60px 50px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundImage: "url('logo.png')",
    // backgroundColor: "#b3e5fc",

    // position: "relative",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    // zIndex: -1
  },
  iconImage: {
    height: "40vh"
  }
});

export function Login(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  useEffect(() => {

  });

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     loading: false
  //   }
  //   this.changeLoadingState = this.changeLoadingState.bind(this);
  // }

  const changeLoadingState = (newState) => {
    setLoading(newState);
  }

  return (
    <>
      {loading ?
        <MyContainer>
          <Row className="justify-content-md-center h-50">
            <Col md={6} className="text-center mt-auto pb-5">
              <BallBeat
                color={'#123abc'}
                loading={loading}
              />
            </Col>
          </Row>
        </MyContainer>
        :
        <MyContainer className={classes.bgImage}>
          {/* <Row className="justify-content-md-center h-50">
            <Col md={6} className="text-center mt-auto pb-5">
              <Image fluid src="img/bluecity-favicon.png" alt="logo" className={classes.iconImage}/>
            </Col>
          </Row> */}
          <Row className="justify-content-md-center h-100">
            <Col md={6} className="my-auto">
              <MyAuthButtons history={props.history} changeLoadingState={changeLoadingState} />
            </Col>
          </Row>
        </MyContainer>
      }
    </>
  );
}
