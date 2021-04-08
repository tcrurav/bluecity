import React from 'react';
import PropTypes from 'prop-types';

/**
|--------------------------------------------------
| Components
|--------------------------------------------------
*/
import MyBtnPopup from './myBtnPopup';

/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import { Popup } from 'react-leaflet';

const MyPopup = ({ id, name, address, p, type, checkingForRenting }) => {

    return (
        <Popup>
            Parking {id}<br />
            {name}<br />
            {address} <br />
            <MyBtnPopup
                text='Check availability'
                p={p}
                type={type}
                checkingForRenting={checkingForRenting}
            />
        </Popup>
    )
}

MyPopup.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    p: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    checkingForRenting: PropTypes.bool.isRequired
};

export default MyPopup;
