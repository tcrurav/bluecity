import React from 'react';
import PropTypes from 'prop-types';

/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

/**
|--------------------------------------------------
| Styled
|--------------------------------------------------
*/
import { ColorMarker } from '../styled/styles';

const MyMarker = ({ color, state, text }) => {

    return (
        <>
            <ColorMarker color={color}>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
            </ColorMarker> {state} {text} <br />
        </>
    )
};

MyMarker.propTypes = {
    color: PropTypes.string,
    state: PropTypes.number,
    text: PropTypes.string
};

export default MyMarker;