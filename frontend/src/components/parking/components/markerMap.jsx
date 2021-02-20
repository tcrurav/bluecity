import React from 'react'
import PropTypes from 'prop-types';

/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import { Marker, Popup } from 'react-leaflet';
import { Button } from 'react-bootstrap';

const MarkerMap = ({ parkings, history }) => {

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
        parkings.map(p => {

            const { lat, long, id, name, address } = p;

            let pos = [lat, long];

            return (
                <Marker
                    key={id}
                    position={pos}>
                    <Popup>
                        Parking {id}<br />
                        {name}<br />
                        {address} <br />
                        <Button onClick={() => redirectToDetailedParking(p)}>Check availability</Button>
                    </Popup>
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