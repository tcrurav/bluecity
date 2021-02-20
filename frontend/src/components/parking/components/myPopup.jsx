import React from 'react';
import PropTypes from 'prop-types';

/**
|--------------------------------------------------
| Components
|--------------------------------------------------
*/
import BtnPopup from './btnPopup';

/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import { Popup } from 'react-leaflet';

const MyPopup = ({ id, name, address, p, history }) => {
    return (
        <Popup>
            Parking {id}<br />
            {name}<br />
            {address} <br />
            <BtnPopup
                text='Check availability'
                history={history}
                p={p}
            />
        </Popup>
    )
}

MyPopup.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    p: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default MyPopup;
