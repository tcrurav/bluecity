import React from 'react';
import PropTypes from 'prop-types';

/**
|--------------------------------------------------
| Components
|--------------------------------------------------
*/
import { MyNavbar } from '../../ui/navbar/my-navbar';
import { Footer } from '../../ui/footer';
import MyParkingsWithFreeBoxes from './components/myParkingsWithFreeBoxes';

const ParkingScreen = ({ history }) => {

    return (
        <>
            <MyNavbar history={history} />
            {/* <MyParkingsWithFreeBoxes history={history} /> */}
            <MyParkingsWithFreeBoxes returningScooter={false} />
            <Footer />
        </>
    )
};

ParkingScreen.propTypes = {
    history: PropTypes.object.isRequired
};

export default ParkingScreen;