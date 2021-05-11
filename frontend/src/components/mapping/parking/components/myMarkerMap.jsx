import React from 'react'
import PropTypes from 'prop-types';

/**
|--------------------------------------------------
| Components
|--------------------------------------------------
*/
import MyPopup from './myPopup';

/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import { Marker } from 'react-leaflet';

const MyMarkerMap = ({ parkings, type, checkingForRenting }) => {

    // console.log("still in free parkings");
    // console.log(checkingForRenting);

    return (
        parkings.map(p => {

            const { lat, long, id, name, address } = p;

            let pos = [lat, long];

            return (
                <Marker
                    key={id}
                    position={pos}>
                    <MyPopup
                        id={id}
                        name={name}
                        address={address}
                        p={p}
                        type={type}
                        checkingForRenting={checkingForRenting}
                    />
                </Marker>
            );
        })
    )
};

MyMarkerMap.propTypes = {
    parkings: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    checkingForRenting: PropTypes.bool.isRequired
};

export default MyMarkerMap;