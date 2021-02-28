/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import socketIOClient from 'socket.io-client';

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

const createSocketIOConnection = () => {
    //console.log('createSocketIOConnection');
    if (!socket) {
        //console.log('victoria');
        socket = socketIOClient(process.env.REACT_APP_BASEURL);
        //console.log('otro1')
        socket.on('connect', () => {
            console.log('connected to backend');
        });
        //console.log('otro')
        socket.on('hola', data => {
            console.log('connection confirmed');
        });
        //console.log('otro2')
    }
};

const openBox = () => {
    console.log('openBox');
    try {
        socket.emit('chacho-tu', { hola: 'hola' });
        console.log('terminó bien');
    } catch (e) {
        console.log('error');
    } finally {
        console.log('terminó bien o mal');
    }
};

export {
    formatTimeLeft,
    checkGeolocationAvailability,
    createSocketIOConnection,
    openBox,
    socket
};