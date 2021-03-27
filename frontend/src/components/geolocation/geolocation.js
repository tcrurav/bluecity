import React, { useState, useEffect, useRef } from 'react';

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
    timestamp: Date.now()
  });

  const [geolocationAvailabilityInside, setGeolocationAvailabilityInside] = useState(false);

  const mounted = useRef(true);
  const watchId = useRef(null);

  const onEvent = event => {
    // console.log("se produce onEvent")
    if (mounted.current) {
      // console.log("va a poner estado")
      // console.log(geolocationAvailabilityInside)
      setState({
        ...state,
        // accuracy: event.coords.accuracy,
        // altitude: event.coords.altitude,
        // altitudeAccuracy: event.coords.altitudeAccuracy,
        // heading: event.coords.heading,
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        // speed: event.coords.speed,
        timestamp: event.timestamp,
      });
    }
    // console.log("eventuando")
    // console.log(mounted)
  };

  useEffect(() => {
      // console.log("principio del useEffect primero")

      navigator.geolocation.getCurrentPosition(onEvent);
      watchId.current = navigator.geolocation.watchPosition(onEvent);

      checkGeolocationAvailability().then((res) => {
        // console.log(res)
        setGeolocationAvailabilityInside(res);
      });

      return () => {
        mounted.current = false;
        navigator.geolocation.clearWatch(watchId.current);
        // console.log("se fue el geolocation principal")
      };
    },
    []
  );

  return [ state, geolocationAvailabilityInside ];
};

export {
  useGeolocation
};