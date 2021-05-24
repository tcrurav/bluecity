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

const MyColBoxes = ({ boxes, findOutGreenRedOrOrange, handleReservation }) => {

  // console.log("MyColBoxes")

  return (
    <>
      {
        boxes.map((b, index) => {

          let { id } = b;

          switch (findOutGreenRedOrOrange(b)) {

            case OCCUPIED:
              return (
                <MyCol
                  bg='#f44336'
                  key={id}
                  id={id}
                  index={index}
                />
              );
            case FREE:
              return (
                <MyColReservation
                  bg='#4caf50'
                  key={id}
                  id={id}
                  index={index}
                  handleReservation={handleReservation}
                />

              );
            case RESERVED:
              return (
                <MyCol
                  bg='#ff9800'
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
  boxes: PropTypes.array.isRequired,
  findOutGreenRedOrOrange: PropTypes.func.isRequired,
  handleReservation: PropTypes.func.isRequired
};

export default MyColBoxes;
