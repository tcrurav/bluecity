import React from 'react';
import PropTypes from 'prop-types';

/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
|--------------------------------------------------
| Styled
|--------------------------------------------------
*/
import { ColorMarker } from '../styled/styles';

/**
|--------------------------------------------------
| Constants
|--------------------------------------------------
*/
import { NO_ICON } from '../constants/constants';

const MyMarker = ({ color, state, text, icon }) => {

    return (
        <>
            <ColorMarker color={color} component="span">
                {icon !== NO_ICON ? <FontAwesomeIcon icon={icon} /> : <></>}
            </ColorMarker> {state} {text} <br />
        </>
    )
};

MyMarker.propTypes = {
    color: PropTypes.string.isRequired,
    state: PropTypes.number,
    text: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired
};

export default MyMarker;