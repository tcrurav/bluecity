import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";


/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import { Button } from 'react-bootstrap';

const MyBtnPopup = ({ text, p, type }) => {

    let history = useHistory();

    const redirectToDetailedParking = (p) => {
        history.push({
            pathname: '/availability',
            state: {
                parking: p,
                checkingForRenting: false
            }
        })
    };

    const typeOfBtn = (k, t) => {
        switch (k) {
            case 'boxes':
                return (
                    <Button onClick={() => redirectToDetailedParking(p)}>
                        {t}
                    </Button>
                );
            case 'scooter':
                return (
                    <Button>
                        {t}
                    </Button>
                );
            default:
                break;
        }
    };

    return typeOfBtn(type, text)
};

MyBtnPopup.propTypes = {
    text: PropTypes.string.isRequired,
    p: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
};

export default MyBtnPopup;
