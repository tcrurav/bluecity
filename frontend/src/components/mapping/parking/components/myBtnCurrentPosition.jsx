import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import { Button, Image } from 'react-bootstrap';

const BtnCurrentPosition = ({ freeBoxes, setFreeBoxes }) => {
  const { t } = useTranslation();

  const { parkings } = freeBoxes;

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition((location) => {
      setFreeBoxes({
        ...freeBoxes,
        position: [location.coords.latitude, location.coords.longitude]
      });
    });
  };

  return (
    <>
      <Button
        onClick={() => getCurrentPosition()}
        variant='info'
        className='float-right mt-3'
      >
        <Image
          src={`${process.env.REACT_APP_BASEURL}/my-location.png`}
          width="25"
        />
      </Button>
      <p className='mt-3 text-center'>{parkings.length} {t('available stations now')}.</p>
    </>
  )
}

BtnCurrentPosition.propTypes = {
  freeBoxes: PropTypes.object.isRequired,
  setFreeBoxes: PropTypes.func.isRequired
};

export default BtnCurrentPosition;