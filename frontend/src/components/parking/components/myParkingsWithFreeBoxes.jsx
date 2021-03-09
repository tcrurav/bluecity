import React, { useState, useEffect } from 'react';

/**
|--------------------------------------------------
| Components
|--------------------------------------------------
*/
import { MyContainer } from '../../ui/my-container';
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
import ParkingDataService from '../../../services/parking.service';

/**
|--------------------------------------------------
| Styled
|--------------------------------------------------
*/
import { MyMap } from '../styled/styleComponents';

const MyParkingsWithFreeBoxes = () => {

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
            allWithAFreeBox();
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
                            attribution=''
                            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        />
                        <MyMarkerMap
                            parkings={parkings}
                            type='boxes'
                        />
                    </MyMap>
                </Col>
            </Row>
            <Row>
                <MyBtnCurrentPosition
                    freeBoxes={freeBoxes}
                    setFreeBoxes={setFreeBoxes}
                />
            </Row>
        </MyContainer>
    )
};

export default MyParkingsWithFreeBoxes;