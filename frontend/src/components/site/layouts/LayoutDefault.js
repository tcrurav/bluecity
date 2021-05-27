import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

//import Image from "material-ui-image";
import Paper from "@material-ui/core/Paper";
// import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import { useMediaQuery } from 'react-responsive';

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
  }
}));


const LayoutDefault = ({ children }) => {
  const myClasses = useStyles();
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  return (
    <>
      {
        isMobile ?
          <Header navPosition="right" className="reveal-from-bottom" />
          :
          <></>
      }

      <main className="site-content">
        {children}
      </main>
      {/* <Footer /> */}
      {/* <Paper elevation={0} className={myClasses.root}> */}
      <Container>
        {/* <Typography>Hello, world</Typography> */}
        {/* <Button onClick={redirectToParking}>Accept</Button> */}
        {/* <Row className="mb-4 ">
          <Col xs={2}></Col>
          <Col xs={2}>
            <Image src="img/centro4.png" fluid />
          </Col>
          <Col xs={2}>
            <Image src="img/centro5.png" fluid />
          </Col>
          <Col xs={2}>
            <Image src="img/centro6.jpg" fluid />
          </Col>
          <Col xs={2}>
            <Image src="img/centro1.png" fluid />
          </Col>
          <Col xs={2}></Col>
        </Row> */}
        <Row className="mt-6 mb-2">
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
                <Image className="mt-4 mb-2" src="img/centro4.png"  width="100vh"/>
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
                <Image className="mt-4 mb-2" src="img/centro8.png" width="100vh"/>
              </a>
            </Col>
            <Col xs={2} sm={1}>
              <a href="https://www.instagram.com/somosbluecity/">
                <Image className="mt-4 mb-2" src="img/instagram.png" width="100vh" />
              </a>
            </Col>
            <Col xs={1}></Col>
        </Row>
      </Container>
      {/* </Paper> */}
    </>
  );
}

export default LayoutDefault;