import React from 'react';
// import sections
import Hero from '../components/sections/Hero';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';
import FeaturesSplitTop from '../components/sections/FeaturesSplitTop';

const Home = () => {

  return (
    <>
      <Hero className="illustration-section-01" />
      <FeaturesSplitTop invertMobile topDivider imageFill className="illustration-section-02" />
      
      <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02" />
      <FeaturesTiles />
      {/* <Testimonial topDivider />
      <Cta split /> */}
    </>
  );
}

export default Home;