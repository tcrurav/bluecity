import React from 'react';
import SimulatorOPCUA from './simulator-opcua';
import SimulatorWebsockets from './simulator-websockets';

const Simulator = () => {

  return (
    <>
      {process.env.REACT_APP_SIMULATING_OPCUA === "true" ?
        <SimulatorOPCUA/>
        :
        <SimulatorWebsockets/>
      }
    </>
  )
}

export default Simulator;