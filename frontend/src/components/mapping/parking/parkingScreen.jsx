import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

/**
|--------------------------------------------------
| Components
|--------------------------------------------------
*/
import { MyNavbar } from '../../ui/navbar/my-navbar';
import { Footer } from '../../ui/footer';
import MyParkingsWithFreeBoxes from './components/myParkingsWithFreeBoxes';
import { getApiUser } from "../constants/constants";

import ScooterDataService from "../../../services/scooter.service";
import BoxDataService from "../../../services/box.service";

/**
 *  React-Bootstrap Imports
 */
 import { MyContainer } from "../../ui/my-container";
 import Row from "react-bootstrap/Row";
 import Col from "react-bootstrap/Col";
 import { BallBeat } from "react-pure-loaders";

const ParkingScreen = () => {
  let history = useHistory();

  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    console.log("Parking Screen");

    const userId = getApiUser().id;
    checkUserIdState(userId);
  }, []);

  const checkUserIdState = (userId) => {
    ScooterDataService.getScooterWithUserId(userId).then((res) => {
      if (res.data === "") {
        BoxDataService.getOneWithUserId(userId).then((res) => {
          if (res.data === "") {
            setLoadingState(false);
            return;
          }
          goToMain();
        });
        return;
      }
      goToMain();
    });
  };

  const goToMain = () => {
    history.push({
      pathname: "/main"
    });
  }

  return (
    <>
      {loadingState ? (
        <>
          <MyContainer>
            <Row className="justify-content-md-center h-50">
              <Col md={6} className="text-center mt-auto pb-5">
                <BallBeat color={"#123abc"} loading={loadingState} />
              </Col>
            </Row>
          </MyContainer>
        </>
      ) :
        <>
          <MyNavbar history={history} />
          <MyParkingsWithFreeBoxes returningScooter={false} />
          <Footer />
        </>
      }
    </>
  )
};

export default ParkingScreen;