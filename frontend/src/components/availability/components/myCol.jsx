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
            key={id}
            bg={bg}
        >
            {index + 1}
        </MyColCustom>
    )
};

MyCol.propTypes = {

};

export default MyCol;
