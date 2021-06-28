import React from 'react';
import Header from '../components/layout/Header';

import { makeStyles } from "@material-ui/core/styles";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import { DisclaimerLinkText } from '../../disclaimer-app/disclaimer-link-text';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10vh",
  },
  image: {
    maxWidth: "20vh",
    marginBottom: "10vh"
  },
  footer: {
    backgroundColor: "#757ce8",
  },
  logos: {
    marginTop: "4em",
    marginBottom: "1em",
  },
  disclaimer: {
    color: "white",
  }
}));


const LayoutDefault = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <Header navPosition="right" className="reveal-from-bottom" />
      <main className="site-content">
        {children}
      </main>
      <Container>
        <Row className={classes.logos}>
          <Col>
            <Image src="img/mec.png" fluid />
          </Col>
          <Col>
            <Image src="img/fse.jpg" fluid />
          </Col>
        </Row>
      </Container>
      <Container className="bg-dark mt-4" fluid>
        <Row className="justify-content-md-center">
          <Col xs={1}></Col>
          <Col xs={2} sm={1}>
            <a href="https://www.bernatelferrer.cat">
              <Image className="mt-4 mb-2" src="img/centro4.png" width="100vh" />
            </a>
          </Col>
          <Col xs={2} sm={1}>
            <a href="http://www.iesesteveterradas.cat">
              <Image className="mt-4 mb-2" src="img/centro5.png" width="100vh" />
            </a>
          </Col>
          <Col xs={2} sm={1}>
            <a href="https://www3.gobiernodecanarias.org/medusa/edublog/ieselrincon/">
              <Image className="mt-4 mb-2" src="img/centro1-circle-bg.png" width="100vh" />
            </a>
          </Col>
          <Col xs={2} sm={1}>
            <a href="https://www.furiouskoalas.com">
              <Image className="mt-4 mb-2" src="img/centro8.png" width="100vh" />
            </a>
          </Col>
          <Col xs={2} sm={1}>
            <a href="https://www.instagram.com/somosbluecity/">
              <Image className="mt-4 mb-2" src="img/instagram.png" width="100vh" />
            </a>
          </Col>
          <Col xs={1}></Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={12}>
            <p className="text-center">
              <a href="/disclaimer" className="text-white">
                <DisclaimerLinkText/>
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LayoutDefault;