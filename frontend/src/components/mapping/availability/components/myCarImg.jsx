import React from 'react';
import PropTypes from 'prop-types';

/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import { Card } from 'react-bootstrap';

const MyCarImg = ({ id }) => {

    return (
        <Card.Img
            variant='top'
            src={`${process.env.REACT_APP_BASEURL}/parking${id}.jpg`}
        />
    )
};

MyCarImg.propTypes = {
    id: PropTypes.number.isRequired
};

export default MyCarImg;
