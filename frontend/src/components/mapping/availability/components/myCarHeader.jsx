import React from 'react';
import PropTypes from 'prop-types';

/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import { Card } from 'react-bootstrap';

const MyCarHeader = ({ address, name }) => {

    return (
        <Card.Header>
            <h5>{name}</h5>
            <p>{address}</p>
        </Card.Header>
    )
};

MyCarHeader.propTypes = {
    address: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default MyCarHeader;
