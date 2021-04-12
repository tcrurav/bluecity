import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

/**
|--------------------------------------------------
| Components
|--------------------------------------------------
*/
import { MyNavbar } from "../../ui/navbar/my-navbar";
import { Footer } from "../../ui/footer";
import MyParkingWithFreeScooters from "../parking/components/myParkingsWithFreeScooters";
import MyParkingWithFreeBoxes from "../parking/components/myParkingsWithFreeBoxes";
import ScooterDataService from "../../../services/scooter.service";

const RentingScreen = ({ location, history }) => {
  const [userState, setUserState] = useState(null);
  const { state: { userId } } = location;

  useEffect(() => {
    console.log("renting screen");
    findScooterWithUserId();
  }, []);

  const findScooterWithUserId = () => {
    ScooterDataService.getScooterWithUserId(userId).then((res) => {
      console.log("Res data:")
      console.log(res);
      if (res.data  === "") {
        setUserState(null)
      } else {
        setUserState({
          user: res.data
        });
      }
    });
  };

  return (
    <>
      <MyNavbar history={history} />
      {!userState ? (
        <MyParkingWithFreeScooters history={history} />
      ) : (
        <MyParkingWithFreeBoxes />
      )}
      <Footer />
    </>
  );
};

RentingScreen.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default RentingScreen;
