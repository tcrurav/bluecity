import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from "@material-ui/core/styles";

import PropTypes from 'prop-types';

/**
|--------------------------------------------------
| Components
|--------------------------------------------------
*/
import MyBtnPopup from './myBtnPopup';

/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import { Popup } from 'react-leaflet';

const useStyles = makeStyles((theme) => ({
    h6: {
      marginTop: "1em",
      fontWeight: "bolder",
      maxWidth: "50vw"
    },
    paragraph: {
      maxWidth: "50vw"
    },
  }));

const MyPopup = ({ id, name, address, p, type, checkingForRenting, returningScooter }) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Popup>
            <h6 className={classes.h6}>Parking {id}</h6>
            <h6 className={classes.h6}>{name}</h6>
            <p className={classes.paragraph}>{address}</p>
            <MyBtnPopup
                text={t('Check availability')}
                p={p}
                type={type}
                checkingForRenting={checkingForRenting}
                returningScooter={returningScooter}
            />
        </Popup>
    )
}

MyPopup.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    p: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    checkingForRenting: PropTypes.bool.isRequired,
    returningScooter: PropTypes.bool.isRequired
};

export default MyPopup;
