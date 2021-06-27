import React, { useEffect } from 'react';
import classNames from 'classnames';

import Images from '../components/sections/Images';
import Workflow from '../components/sections/Workflow';

const Rincon = ({ className, ...props }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const outerClasses = classNames(
    'hero section center-content',
    "illustration-section-01"
  );

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <Images />
      <Workflow />
    </section>
  );
}

export default Rincon;