import React from 'react';
import PropTypes from 'prop-types';

/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import { Button } from 'react-bootstrap';

const BtnPopup = ({ text, history, p }) => {

    const redirectToDetailedParking = (p) => {
        history.push({
            pathname: '/availability',
            state: {
                parking: p,
                checkingForRenting: false
            }
        })
    };
    return (
        <Button onClick={() => redirectToDetailedParking(p)}>
            {text}
        </Button>
    )
};

BtnPopup.propTypes = {
    text: PropTypes.string,
    history: PropTypes.object.isRequired,
    p: PropTypes.object.isRequired
};

export default BtnPopup;
