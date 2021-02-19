import React from 'react';
import { MyNavbar } from './ui/my-navbar';
import { MyContainer } from './ui/my-container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import Button from 'react-bootstrap/Button';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'react-bootstrap/Image';
import { Footer } from './ui/footer';

const useStyles = makeStyles((theme) => ({
  root: {
    "&:hover": {
      color: "danger",
    }
  },
}));

export function Main(props) {
  const classes = useStyles();

    return (
      <>
        <MyNavbar history={props.history} />
        <MyContainer>
          <Row className="justify-content-md-center h-25"> 
            <Col md={6} className="text-center mt-auto" >
              <Image fluid src="img/bluecity.jpg" alt="logo" />
            </Col>
          </Row>
          <Row className="justify-content-md-center h-50">
            <Col xs={6} md={3} className="pt-5">
              <Image fluid src="img/marker.png" alt="marker" />
            </Col>
            <Col xs={6} md={3} className="pt-5">
              <Row className={classes.root}>
                <Button variant="contained" color="primary" className="mt-2" onClick={() => {props.history.push("/parking")}}>Parking</Button>
              </Row>
              <Row className={classes.root}>
                <Button variant="contained" color="primary" className="mt-2" onClick={() => {props.history.push("/renting")}}>Renting</Button>
              </Row>
            </Col>
          </Row>
        </MyContainer>
        <Footer />
      </>
    );
  }