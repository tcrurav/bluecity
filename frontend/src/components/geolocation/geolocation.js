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
    if (mounted.current) {
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
  };

  useEffect(() => {

      navigator.geolocation.getCurrentPosition(onEvent);
      watchId.current = navigator.geolocation.watchPosition(onEvent);

      checkGeolocationAvailability().then((res) => {
        setGeolocationAvailabilityInside(res);
      });

      return () => {
        mounted.current = false;
        navigator.geolocation.clearWatch(watchId.current);
      };
    },
    []
  );

  return [ state, geolocationAvailabilityInside ];
};

export {
  useGeolocation
};