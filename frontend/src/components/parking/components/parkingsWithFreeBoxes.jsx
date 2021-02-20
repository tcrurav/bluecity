import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
|--------------------------------------------------
| Components
|--------------------------------------------------
*/
import { MyContainer } from '../../my-container';
import MarkerMap from './markerMap';
import BtnCurrentPosition from './btnCurrentPosition';

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

const ParkingsWithFreeBoxes = ({ history }) => {

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
                        zoom={zoom}>
                        <TileLayer
                            attribution=''
                            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        />
                        <MarkerMap
                            parkings={parkings}
                            history={history}
                        />
                    </MyMap>
                </Col>
            </Row>
            <Row>
                <BtnCurrentPosition
                    freeBoxes={freeBoxes}
                    setFreeBoxes={setFreeBoxes}
                />
            </Row>
        </MyContainer>
    )
};

ParkingsWithFreeBoxes.propTypes = {
    history: PropTypes.object.isRequired
};

export default ParkingsWithFreeBoxes;