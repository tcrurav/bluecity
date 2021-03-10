/**
|--------------------------------------------------
| Utils
|--------------------------------------------------
*/
import { getApiUser } from '../../../utils/common';

const OCCUPIED = 0, FREE = 1, RESERVED = 2;
const FIVE_MINUTES = 5 * 60 * 1000;
const THIS_USER_HAS_NO_RESERVATION = -1;
const API_USER = getApiUser();
const CLOSE_DISTANCE_TO_PARKING = 2; //0.01; // 0.01 Kilometers = 10 meters
const BEGIN_OF_TIMES = new Date('1970-01-01 00:00:00');

export {
    OCCUPIED,
    FREE,
    RESERVED,
    FIVE_MINUTES,
    THIS_USER_HAS_NO_RESERVATION,
    API_USER,
    CLOSE_DISTANCE_TO_PARKING,
    BEGIN_OF_TIMES,
};