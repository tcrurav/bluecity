import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

/**
|--------------------------------------------------
| Components
|--------------------------------------------------
*/
import { MyNavbar } from "../../ui/navbar/my-navbar";
import { Footer } from "../../ui/footer";
import MyParkingsWithFreeScooters from "../parking/components/myParkingsWithFreeScooters";
import MyParkingsWithFreeBoxes from "../parking/components/myParkingsWithFreeBoxes";
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

const RentingScreen = () => {

  let history = useHistory();

  const [loadingState, setLoadingState] = useState(true);
  const [userState, setUserState] = useState(null);

  useEffect(() => {
    const userId = getApiUser().id;
    checkUserIdState(userId);
  }, []);

  const checkUserIdState = (userId) => {
    BoxDataService.getOneWithUserId(userId).then((res) => {
      if (res.data === "") {
        ScooterDataService.getScooterWithUserId(userId).then((res) => {
          if (res.data === "") {
            setUserState(null)
          } else {
            setUserState({
              user: res.data
            });
          }
          setLoadingState(false);
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
          {!userState ? (
            <MyParkingsWithFreeScooters />
          ) : (
            <MyParkingsWithFreeBoxes returningScooter={true} />
          )}
          <Footer />
        </>
      }
    </>
  );
};

export default RentingScreen;
