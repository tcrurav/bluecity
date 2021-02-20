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

const MarkerMap = ({ parkings, history }) => {

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
                        history={history}
                        p={p}
                    />
                </Marker>
            );
        })
    )
};

Marker.propTypes = {
    parkings: PropTypes.array,
    history: PropTypes.object
};

export default MarkerMap;