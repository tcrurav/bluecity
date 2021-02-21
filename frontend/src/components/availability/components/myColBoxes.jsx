
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
| Libraries
| --------------------------------------------------
*/
import { Row, Col } from 'react-bootstrap';

/**
| --------------------------------------------------
| Constants
| --------------------------------------------------
*/
import { OCCUPIED, FREE, RESERVED, FIVE_MINUTES, THIS_USER_HAS_NO_RESERVATION, API_USER, CLOSE_DISTANCE_TO_PARKING, BEGIN_OF_TIMES } from '../constants/constants';

const MyColBoxes = ({ stateBox, checkingForRenting, findOutGreenRedOrOrange }) => {
    console.log('stateBox in ColBox ', stateBox);

    const { boxes } = stateBox;

    return (
        <Col>
            <Row>
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
                                    //onClick={(b) => this.handleReservation(index)}
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
            </Row>
        </Col>
    )
};

MyColBoxes.propTypes = {
    stateBox: PropTypes.object.isRequired,
    findOutGreenRedOrOrange: PropTypes.func.isRequired
};

export default MyColBoxes;
