import React from 'react';
import PropTypes from 'prop-types';

/**
|--------------------------------------------------
| Components
|--------------------------------------------------
*/
import MyCol from './myCol';
import MyColReservation from './myColReservation';

/**
| --------------------------------------------------
| Constants
| --------------------------------------------------
*/
import { OCCUPIED, FREE, RESERVED } from '../constants/constants';

const MyColBoxes = ({ stateParking, setStateParking, findOutGreenRedOrOrange, findAllBoxesInAParking, idParking, activateCountdown, checkOpenBoxPossible }) => {

    const { boxes } = stateParking;

    return (
        <>
            {
                boxes.map((b, index) => {

                    let { id } = b;

                    switch (findOutGreenRedOrOrange(b)) {

                        case OCCUPIED:
                            return (
                                <MyCol
                                    bg='red'
                                    key={id}
                                    id={id}
                                    index={index}
                                />
                            );
                        case FREE:
                            return (
                                <MyColReservation
                                    bg='green'
                                    key={id}
                                    id={id}
                                    index={index}
                                    stateParking={stateParking}
                                    setStateParking={setStateParking}
                                    findAllBoxesInAParking={findAllBoxesInAParking}
                                    idParking={idParking}
                                    activateCountdown={activateCountdown}
                                    checkOpenBoxPossible={checkOpenBoxPossible}
                                />

                            );
                        case RESERVED:
                            return (
                                <MyCol
                                    bg='orange'
                                    key={id}
                                    id={id}
                                    index={index}
                                />
                            );
                        default:
                            console.log("This case should never take place");
                            return <></>;
                    }
                })
            }
        </>
    )
};

MyColBoxes.propTypes = {
    stateParking: PropTypes.object.isRequired,
    setStateParking: PropTypes.func.isRequired,
    findOutGreenRedOrOrange: PropTypes.func.isRequired,
    findAllBoxesInAParking: PropTypes.func.isRequired,
    idParking: PropTypes.number.isRequired,
    activateCountdown: PropTypes.func.isRequired,
    checkOpenBoxPossible: PropTypes.func
};

export default MyColBoxes;
