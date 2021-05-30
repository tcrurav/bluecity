/**
|--------------------------------------------------
| Libraries
|--------------------------------------------------
*/
import React, { useEffect, useRef } from 'react';

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
        } else {
            resolve(false);
        }
    });
};



function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export {
    formatTimeLeft,
    checkGeolocationAvailability,
    useInterval
};