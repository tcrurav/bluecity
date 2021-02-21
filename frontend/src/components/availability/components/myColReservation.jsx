import React from 'react';
import PropTypes from 'prop-types';

/**
|--------------------------------------------------
| Styled
|--------------------------------------------------
*/
import { MyColCustom } from '../styled/styles';

const MyColReservation = ({ id, index, bg }) => {

    const handleReservation = (index) => {
        console.log('Helllooooo');
        /*if (this.state.boxReservedByThisUser !== THIS_USER_HAS_NO_RESERVATION) {
            console.log("You have already reserved a Box in this parking");
            return;
        }

        let data = this.state.boxes[index];
        data.lastReservationDate = new Date();
        data.userId = apiUser.id;
        BoxDataService.update(data.id, data).then((res) => {
            this.findAllBoxesInAParking(this.props.location.state.parking.id).then((newState) => {
                this.setState(newState);
                this.activateCountdown();
                this.checkOpenBoxPossible();
            });
        }).catch((e) => console.error(e));*/
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
}

MyColReservation.propTypes = {

};

export default MyColReservation;
