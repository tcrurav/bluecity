import React from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
// import SectionHeader from './partials/SectionHeader';
// import Image from '../elements/Image';
// import Image from 'react-bootstrap/Image';

import { makeStyles } from "@material-ui/core/styles";
import Image from "material-ui-image";
import Container from "@material-ui/core/Container";

import mobileLogo from '../../assets/images/mobile-logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10vh",
  },
  image: {
    maxWidth: "40vh",
  },
  buttonContainer: {
    justify: "center",
    alignItems: "center",
    //justifyContent: "center",
  },
  buttons: {
    marginTop: "1vh",
    backgroundColor: "#00a9f4",
    "&:hover": {
      backgroundColor: "#007ac1",
      color: "white",
    },
  },
  footer: {
    top: 0,
  },
}));

const propTypes = {
  ...SectionSplitProps.types
}

const defaultProps = {
  ...SectionSplitProps.defaults
}

const FeaturesSplitTop = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  ...props
}) => {

  const myClasses = useStyles();

  const outerClasses = classNames(
    'features-split section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  // const innerClasses = classNames(
  //   'features-split-inner section-inner',
  //   topDivider && 'has-top-divider',
  //   bottomDivider && 'has-bottom-divider'
  // );

  const splitClasses = classNames(
    'split-wrap',
    invertMobile && 'invert-mobile',
    invertDesktop && 'invert-desktop',
    alignTop && 'align-top'
  );

  // const sectionHeader = {
  //   title: 'Workflow that just works',
  //   paragraph: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum — semper quis lectus nulla at volutpat diam ut venenatis.'
  // };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container mb-4 myClasses.container">
        {/* <div className={innerClasses}> */}
          {/* <SectionHeader data={sectionHeader} className="center-content" /> */}
          <div className={splitClasses}>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Aparcamiento y alquiler de patinetes
                  </div>
                <h3 className="mt-0 mb-12">
                  Somos Bluecity
                  </h3>
                <p className="m-0">
                 Disponemos de una red de tres estaciones de recarga y aparcamiento de patinetes eléctricos. Desde nuestra App puedes reservar un aparcamiento para tu propio patinete y o alquilar alguna disponible en nuestra red.
                  </p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Container className={myClasses.image}>
                  <Image src={mobileLogo} aspectRatio={5 / 9} />
                </Container>
              </div>
            </div>

          </div>
        {/* </div> */}
      </div>
    </section>
  );
}

FeaturesSplitTop.propTypes = propTypes;
FeaturesSplitTop.defaultProps = defaultProps;

export default FeaturesSplitTop;