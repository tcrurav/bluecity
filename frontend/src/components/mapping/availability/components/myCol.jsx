import React from 'react'
import PropTypes from 'prop-types';

/**
|--------------------------------------------------
| Styled
|--------------------------------------------------
*/
import { MyColCustom } from '../styled/styles';

const MyCol = ({ id, index, bg }) => {
    return (
        <MyColCustom
            variant="contained"
            key={id}
            bg={bg}
        >
            {index + 1}
        </MyColCustom>
    )
};

MyCol.propTypes = {
    id: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    bg: PropTypes.string.isRequired
};

export default MyCol;
