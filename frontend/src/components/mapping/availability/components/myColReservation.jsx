import React from 'react';
import PropTypes from 'prop-types';

/**
|--------------------------------------------------
| Styled
|--------------------------------------------------
*/
import { MyColCustom } from '../styled/styles';

const MyColReservation = ({ bg, id, index, handleReservation }) => {

  return (
    <MyColCustom
      key={id}
      bg={bg}
      onClick={() => {
        handleReservation(index)
      }}
    >
      {index + 1}
    </MyColCustom>
  )
};

MyColReservation.propTypes = {
  bg: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  handleReservation: PropTypes.func.isRequired
};

export default MyColReservation;
