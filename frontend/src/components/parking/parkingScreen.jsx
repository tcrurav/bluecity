import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
|--------------------------------------------------
| Components
|--------------------------------------------------
*/
import { MyNavbar } from '../my-navbar';
import { Footer } from '../footer';
import ParkingsWithFreeBoxes from './components/parkingsWithFreeBoxes';

/**
|--------------------------------------------------
| Services
|--------------------------------------------------
*/
import ParkingDataService from '../../services/parking.service';

const ParkingScreen = ({ history }) => {

    const [allParkings, setAllParkings] = useState({});

    const getAllParkings = async () => {
        const parkings = await ParkingDataService.getAll();
        if (parkings) setAllParkings(parkings);
    };

    useEffect(() => {
        try {
            getAllParkings();
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <>
            <MyNavbar history={history} />
            <ParkingsWithFreeBoxes history={history} />
            <Footer />
        </>
    )
};

ParkingScreen.propTypes = {
    history: PropTypes.object.isRequired
};

export default ParkingScreen;