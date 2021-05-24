import React, { useState } from 'react';
// import sections
import Hero from '../components/sections/Hero';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';
import FeaturesSplitTop from '../components/sections/FeaturesSplitTop';
import MediaCard from '../components/sections/MediaCard';
import Rincon from './Rincon';

const Home = () => {
  const [webpage, setWebpage] = useState("main");
  const changeWebpage = (page) => {
    setWebpage(page);
  }

  return (
    <>
      {webpage == "main" ?
        <>
          <Hero className="illustration-section-01" />
          <FeaturesSplitTop invertMobile topDivider imageFill className="illustration-section-02" />

          <FeaturesSplit invertMobile topDivider imageFill bottomDivider className="illustration-section-02" />
          <MediaCard changeWebpage={changeWebpage} />

          <FeaturesTiles />
        </>
        :
        <Rincon />
      }

      {/* <Testimonial topDivider />
      <Cta split /> */}
    </>
  );
}

export default Home;