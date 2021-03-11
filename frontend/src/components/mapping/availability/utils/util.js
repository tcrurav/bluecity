/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import socketIOClient from 'socket.io-client';


import { API_USER } from '../constants/constants'

const formatTimeLeft = (state) => {
    let totalSeconds = Math.floor(state / 1000);
    let min = Math.floor(totalSeconds / 60);
    let sec = totalSeconds % 60;
    if (sec < 10) {
        sec = "0" + sec;
    }
    return (min === 0 && sec === 0 ? "" : `${min}:${sec}`);
};

const checkGeolocationAvailability = () => {
    return new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
            resolve(true);
            //resolve({ geolocationAvailable: true });
            //console.log('Geolocation Available');
        } else {
            resolve(false);
            //resolve({ geolocationAvailable: false });
            //console.log('Geolocation Not Available');
        }
    });
};
let socket = null;

const createSocketIOConnection = (parking) => {
    //console.log('createSocketIOConnection');
    if (!socket) {
        //console.log('victoria');
        socket = socketIOClient(process.env.REACT_APP_BASEURL);
        //console.log('otro1')
        socket.on('connect', () => {
            console.log('connected to backend');
        });
        //console.log('otro')
        socket.on('open', data => {
            console.log('connection confirmed');
        });
        //console.log('otro2')
        socket.on('refresh', data => {
          if (data.who_changed_it !== API_USER.id && data.parking_changed === parking.id) {
            console.log("connection refreshed");
          }
        });
    }
};

const openBox = () => {
    console.log('openBox');
    try {
        socket.emit('open', { open: 'open' });
        console.log('socket OK');
    } catch (e) {
        console.log('error');
        console.log(e);
    } finally {
        console.log('finally log');
    }
};

export {
    formatTimeLeft,
    checkGeolocationAvailability,
    createSocketIOConnection,
    openBox,
    socket
};