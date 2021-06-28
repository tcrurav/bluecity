import React from 'react';

import Hero from '../components/sections/Hero';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import FeaturesSplitTop from '../components/sections/FeaturesSplitTop';
import MediaCard from '../components/sections/MediaCard';

import { useHistory } from 'react-router';

const Home = () => {
  let history = useHistory();
  const changeWebpage = (page) => {
    history.push("/" + page);
  }

  return (
    <>
      <Hero className="illustration-section-01" />
      <FeaturesSplitTop invertMobile topDivider imageFill className="illustration-section-02" />

      <FeaturesSplit invertMobile topDivider imageFill bottomDivider className="illustration-section-02" />
      <MediaCard changeWebpage={changeWebpage} />

      <FeaturesTiles />
    </>
  );
}

export default Home;