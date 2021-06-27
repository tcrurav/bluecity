import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery } from 'react-responsive';
import { useHistory } from "react-router-dom";

import { MyAuthButtons } from '../ui/my-auth-buttons';
import { MyContainer } from '../ui/my-container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BallBeat } from 'react-pure-loaders';

import { Footer } from '../ui/footer';

const useStyles = makeStyles({
  bgImage: {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundImage: "url('logo.png')",
  },
  iconImage: {
    height: "40vh"
  },
  disclaimer: {
    color: "black"
  },
  disclaimerCol: {
    position: "absolute",
    bottom: "0"
  },
  myBottomStripes: {
    marginTop: "1em"
  },
  myStripes: {
    margin: "auto",
    width: "4em",
    height: "0.3em",
    borderBottom: "2px solid white",
    color: "white",
    // position: "absolute"
  },
  mySwipe: {
    backgroundColor: "#00569F",
    height: '12.5em',
    width: "100%"
  },
});

export function Login(props) {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  useEffect(() => {
    if (!isMobile) {
      history.push("/");
    }
  });

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
        <>
          <MyContainer className={classes.bgImage}>
            <Row className="justify-content-xs-center h-100">
              <Col xs={12} className="my-auto">
                <MyAuthButtons history={props.history} changeLoadingState={changeLoadingState} />
              </Col>
            </Row>
          </MyContainer>
          <Footer webDisclaimer="true"/>
        </>
      }
    </>
  );
}
