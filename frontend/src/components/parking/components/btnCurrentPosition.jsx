import React from 'react';
import PropTypes from 'prop-types';

/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import { Col, Button, Image } from 'react-bootstrap';

const BtnCurrentPosition = ({ freeBoxes, setFreeBoxes }) => {

    const { parkings } = freeBoxes;

    const getCurrentPosition = () => {
        console.log('getCurrentPosition')
        navigator.geolocation.getCurrentPosition((location) => {
            setFreeBoxes({
                ...freeBoxes,
                position: [location.coords.latitude, location.coords.longitude]
            });
        });
    };

    return (
        <Col>
            <Button onClick={() => getCurrentPosition()} variant='info' className='float-right mt-3 mr-3'>
                <Image src={`${process.env.REACT_APP_BASEURL}/my-location.png`} width='25' />
            </Button>
            <p className='mt-3 text-center'>{parkings.length} parkings in Gran Canaria now.</p>
        </Col>
    )
}

BtnCurrentPosition.propTypes = {
    freeBoxes: PropTypes.object.isRequired,
    setFreeBoxes: PropTypes.func.isRequired
};

export default BtnCurrentPosition;