import React, { useState, useEffect } from 'react';

const checkGeolocationAvailability = () => {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
};

const useGeolocation = () => {
  const [state, setState] = useState({
    // accuracy: null,
    // altitude: null,
    // altitudeAccuracy: null,
    // heading: null,
    latitude: null,
    longitude: null,
    // speed: null,
    timestamp: Date.now(),
    geolocationAvailability: false
  });
  let mounted = true;
  let watchId;

  const onEvent = event => {
    if (mounted) {
      setState({ ...state,
        // accuracy: event.coords.accuracy,
        // altitude: event.coords.altitude,
        // altitudeAccuracy: event.coords.altitudeAccuracy,
        // heading: event.coords.heading,
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        // speed: event.coords.speed,
        timestamp: event.timestamp
      });
    }
    // console.log("eventuando")
    // console.log(mounted)
  };

  useEffect(
    () => {
      checkGeolocationAvailability().then((res) => {
        setState({...state, geolocationAvailability: res});
        navigator.geolocation.getCurrentPosition(onEvent);
        watchId = navigator.geolocation.watchPosition(onEvent);
      })

  return () => {
    mounted = false;
    navigator.geolocation.clearWatch(watchId);
    console.log("se fue")
  };
},
  [0]
  );

return state;
};

export {
  useGeolocation,
  checkGeolocationAvailability
};