import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

/**
|--------------------------------------------------
| Services
|--------------------------------------------------
*/
import BoxDataService from '../../../services/box.service';

/**
|--------------------------------------------------
| Constants
|--------------------------------------------------
*/
import { THIS_USER_HAS_NO_RESERVATION, API_USER } from '../constants/constants';

/**
|--------------------------------------------------
| Styled
|--------------------------------------------------
*/
import { MyColCustom } from '../styled/styles';

const MyColReservation = ({ bg, id, index, stateParking, findAllBoxesInAParking, idParking, activateCountdown, checkOpenBoxPossible }) => {

    const handleReservation = (ind) => {

        if (stateParking.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION) {
            console.log('You have already reserved a Box in this parking');
            return;
        }

        let data = stateParking.boxes[ind];
        data.lastReservationDate = new Date();
        data.userId = API_USER.id;
        BoxDataService.update(data.id, data)
            .then(async (res) => {
                await findAllBoxesInAParking(idParking);
                activateCountdown();
                await checkOpenBoxPossible();
            })
            .catch((e) => console.error(e));
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
    stateParking: PropTypes.object,
    //setStateBox: PropTypes.func.isRequired,
    findAllBoxesInAParking: PropTypes.func.isRequired,
    idParking: PropTypes.number.isRequired,
    activateCountdown: PropTypes.func.isRequired,
    checkOpenBoxPossible: PropTypes.func
};

export default MyColReservation;
