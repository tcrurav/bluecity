/**
|--------------------------------------------------
| Utils
|--------------------------------------------------
*/
import { getApiUser } from '../../../../utils/common';

const OCCUPIED = 0, FREE = 1, RESERVED = 2;
const FIVE_MINUTES = 5 * 60 * 1000;
const THIS_USER_HAS_NO_RESERVATION = -1;
//let CLOSE_DISTANCE_TO_PARKING = 1; //0.01; // 0.01 Kilometers = 10 meters
const BEGIN_OF_TIMES = new Date('1970-01-01 00:00:00');
const MINIMUM_DISTANCE_INCREMENT = 0.01;

const NO_ICON = 0;

/**
|--------------------------------------------------
| Values of state in a Box (Constant names from the point of view of the backend)
|--------------------------------------------------
*/
const NEITHER_PARKING_NOT_RENTING = 0;

export {
    OCCUPIED,
    FREE,
    RESERVED,
    FIVE_MINUTES,
    THIS_USER_HAS_NO_RESERVATION,
    getApiUser,
    NO_ICON,
    //CLOSE_DISTANCE_TO_PARKING,
    BEGIN_OF_TIMES,
    MINIMUM_DISTANCE_INCREMENT,
    NEITHER_PARKING_NOT_RENTING
};