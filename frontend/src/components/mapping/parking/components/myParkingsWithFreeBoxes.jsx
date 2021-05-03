import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

/**
|--------------------------------------------------
| Components
|--------------------------------------------------
*/

import MyMarkerMap from './myMarkerMap';
import MyBtnCurrentPosition from './myBtnCurrentPosition';
import { MyContainer } from '../../../ui/my-container';
/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import { TileLayer, Map } from 'react-leaflet';
// import "leaflet/dist/leaflet.css";

/**
|--------------------------------------------------
| Services
|--------------------------------------------------
*/
import ParkingDataService from '../../../../services/parking.service';

/**
|--------------------------------------------------
| Material-ui
|--------------------------------------------------
*/
// import { Grid } from "@material-ui/core";

/**
|--------------------------------------------------
| Bootstrap
|--------------------------------------------------
*/
import { Row, Col } from 'react-bootstrap';

/**
|--------------------------------------------------
| Styled
|--------------------------------------------------
*/
// import styled from 'styled-components';
import { MyMap } from '../styled/styleComponents';

// const MyMap = styled(Map)`
//   &.leaflet-container {
//     width: auto;
//     height: 70vh;
//     maxHeight: 70vh;
//   }
// `;

// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme) => ({
//   map: {
//     '&.leaflet-container': {
//       width: "auto",
//       height: "80vh"
//     }
//   }
// }));

const MyParkingsWithFreeBoxes = () => {
  // const classes = useStyles();

  const zoom = 13;

  const [freeBoxes, setFreeBoxes] = useState({
    parkings: [],
    position: [28.128081, -15.4467406]
  });

  const { parkings, position } = freeBoxes;

  const allWithAFreeBox = async () => {
    const free = await ParkingDataService.findAllWithAFreeBox();
    if (free) setFreeBoxes({ ...freeBoxes, parkings: free.data });
  };

  useEffect(() => {
    try {
      // console.log("My parking with free boxes");
      allWithAFreeBox();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      {/* <Grid container
        direction="column"
        justify="flex-start"
        alignItems="center">
        <Grid item> */}
      <MyContainer>
        <Row>
          <Col>
            <MyMap
              center={position}
              zoom={zoom}
            >
              <TileLayer
                attribution=""
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MyMarkerMap
                parkings={parkings}
                type='boxes'
                checkingForRenting={false}
              />
            </MyMap>
          </Col>
        </Row>
        <Row>
          <Col>
            {/* </Grid>
        <Grid item> */}
            <MyBtnCurrentPosition
              freeBoxes={freeBoxes}
              setFreeBoxes={setFreeBoxes}
            />
          </Col>
        </Row>
      </MyContainer>
      {/* </Grid>
      </Grid> */}
    </>
  )
};

// MyParkingsWithFreeBoxes.propTypes = {
//     geolocation: PropTypes.object.isRequired
// };

export default MyParkingsWithFreeBoxes;