import React, { useState } from 'react';
// import sections
import Hero from '../components/sections/Hero';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import FeaturesSplitTop from '../components/sections/FeaturesSplitTop';
import MediaCard from '../components/sections/MediaCard';
import Rincon from './Rincon';
import Terradas from './Terradas';
import Bernat from './Bernat';
import Koalas from './Koalas';

const Home = () => {
  const [webpage, setWebpage] = useState("main");
  const changeWebpage = (page) => {
    setWebpage(page);
  }

  return (
    <>
      {
        webpage == "rincon" ?
        <Rincon />
        :
        webpage == "terradas" ?
        <Terradas />
        :
        webpage == "bernat" ?
        <Bernat />
        :
        webpage == "koalas" ?
        <Koalas />
        :
        <>
          <Hero className="illustration-section-01" />
          <FeaturesSplitTop invertMobile topDivider imageFill className="illustration-section-02" />

          <FeaturesSplit invertMobile topDivider imageFill bottomDivider className="illustration-section-02" />
          <MediaCard changeWebpage={changeWebpage} />

          <FeaturesTiles />
        </>
      }
    </>
  );
}

export default Home;