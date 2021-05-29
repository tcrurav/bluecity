import React, { useEffect } from 'react';

import Images from '../components/sections/Images';
import Messages from '../components/sections/Messages';
import Workflow from '../components/sections/Workflow';

const Rincon = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });


  return (
    <>
      {/* <Messages /> */}
      <Images />
      <Workflow />
    </>
  );
}

export default Rincon;