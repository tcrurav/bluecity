import React, { useState, useEffect } from 'react';

/**
|--------------------------------------------------
| Components
|--------------------------------------------------
*/
import { MyContainer } from '../../../ui/my-container';
import MyMarkerMap from './myMarkerMap';
import MyBtnCurrentPosition from './myBtnCurrentPosition';

/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import { TileLayer } from 'react-leaflet';
import { Row, Col } from 'react-bootstrap';

/**
|--------------------------------------------------
| Services
|--------------------------------------------------
*/
import ParkingDataService from '../../../../services/parking.service';

/**
|--------------------------------------------------
| Styled
|--------------------------------------------------
*/
import { MyMap } from '../styled/styleComponents';

const MyParkingsWithFreeScooters = () => {

  const zoom = 13;

  const [freeScooter, setFreeScooter] = useState({
    parkings: [],
    // position: [28.128081, -15.4467406] //IES El Rincón
    // position: [41.3603711, 2.0611996] //Citilab
    position: [28.1411542, -15.431888] //Museo Elder
  });

  const { parkings, position } = freeScooter;

  const allWithAFreeScooters = async () => {
    const free = await ParkingDataService.findAllWithAFreeScooter();
    if (free) setFreeScooter({ ...freeScooter, parkings: free.data });
  };

  useEffect(() => {
    try {
      allWithAFreeScooters();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
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
              type='scooter'
              checkingForRenting={true}
              returningScooter={false}
            />
          </MyMap>
        </Col>
      </Row>
      <Row>
        <Col>
          <MyBtnCurrentPosition
            freeBoxes={freeScooter}
            setFreeBoxes={setFreeScooter}
          />
        </Col>
      </Row>
    </MyContainer >
  )
};

export default MyParkingsWithFreeScooters;
