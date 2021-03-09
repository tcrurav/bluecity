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

const MyColBoxes = ({ stateParking, findOutGreenRedOrOrange, findAllBoxesInAParking, checkOpenBoxPossible, stateLatLog }) => {

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
                                    findAllBoxesInAParking={findAllBoxesInAParking}
                                    checkOpenBoxPossible={checkOpenBoxPossible}
                                    stateLatLog={stateLatLog}
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
    findOutGreenRedOrOrange: PropTypes.func.isRequired,
    findAllBoxesInAParking: PropTypes.func.isRequired,
    checkOpenBoxPossible: PropTypes.func.isRequired,
    stateLatLog: PropTypes.object.isRequired
};

export default MyColBoxes;
