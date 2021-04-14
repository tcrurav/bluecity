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

const RentingScreen = ({ history, userId }) => {
  const [userState, setUserState] = useState(null);

  useEffect(() => {
    findScooterWithUserId();
  }, []);

  const findScooterWithUserId = () => {
    ScooterDataService.getScooterWithUserId(userId).then((res) => {
      setUserState({
        user: res.data,
      });
    });
  };

  return (
    <>
      <MyNavbar history={history} />
      {userState ? (
        <MyParkingWithFreeBoxes />
      ) : (
        <MyParkingWithFreeScooters history={history} />
      )}
      <Footer />
    </>
  );
};

RentingScreen.propTypes = {
  history: PropTypes.object.isRequired,
};

export default RentingScreen;
