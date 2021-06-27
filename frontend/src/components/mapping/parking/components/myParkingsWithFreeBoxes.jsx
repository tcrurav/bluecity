import React, { useState, useEffect } from 'react';

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
import { TileLayer } from 'react-leaflet';

/**
|--------------------------------------------------
| Services
|--------------------------------------------------
*/
import ParkingDataService from '../../../../services/parking.service';

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
import { MyMap } from '../styled/styleComponents';

const MyParkingsWithFreeBoxes = ({ returningScooter }) => {

  const zoom = 13;

  const [freeBoxes, setFreeBoxes] = useState({
    parkings: [],
    // position: [28.128081, -15.4467406] //IES El Rincón
    // position: [41.3603711, 2.0611996] //Citilab
    position: [28.1411542, -15.431888] //Museo Elder
  });

  const { parkings, position } = freeBoxes;

  const allWithAFreeBox = async () => {
    const free = await ParkingDataService.findAllWithAFreeBox();
    if (free) setFreeBoxes({ ...freeBoxes, parkings: free.data });
  };

  useEffect(() => {
    try {
      allWithAFreeBox();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
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
                returningScooter={returningScooter}
              />
            </MyMap>
          </Col>
        </Row>
        <Row>
          <Col>
            <MyBtnCurrentPosition
              freeBoxes={freeBoxes}
              setFreeBoxes={setFreeBoxes}
            />
          </Col>
        </Row>
      </MyContainer>
    </>
  )
};

export default MyParkingsWithFreeBoxes;