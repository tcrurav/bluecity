import React from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';

/**
|--------------------------------------------------
| Services
|--------------------------------------------------
*/
import BoxDataService from '../../../../services/box.service'

/**
|--------------------------------------------------
| Constants
|--------------------------------------------------
*/
import { THIS_USER_HAS_NO_RESERVATION, API_USER, SOCKET } from '../constants/constants';

/**
|--------------------------------------------------
| Styled
|--------------------------------------------------
*/
import { MyColCustom } from '../styled/styles';

const MyColReservation = ({ bg, id, index, stateParking, findAllBoxesInAParking, checkOpenBoxPossible, stateLatLog, parking, socket }) => {

  const { lat, long } = stateLatLog;

  const handleReservation = async (ind) => {

    if (stateParking.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION) {
      console.log('You have already reserved a Box in this parking');
      return;
    }

    let data = stateParking.boxes[ind];
    data.lastReservationDate = new Date();
    data.userId = API_USER.id;
    await BoxDataService.update(data.id, data);
    try {
      findAllBoxesInAParking();
      checkOpenBoxPossible(lat, long);
      console.log("something-changed")
      socket.emit("something-changed", {
        who_changed_it: API_USER.id,
        parking_changed: parking.id
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MyColCustom
      key={id}
      bg={bg}
      onClick={() => handleReservation(index)}
    >
      {index + 1}
    </MyColCustom>
  )
};

MyColReservation.propTypes = {
  bg: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  stateParking: PropTypes.object.isRequired,
  findAllBoxesInAParking: PropTypes.func.isRequired,
  checkOpenBoxPossible: PropTypes.func.isRequired,
  stateLatLog: PropTypes.object.isRequired,
  parking: PropTypes.object.isRequired
};

export default MyColReservation;
