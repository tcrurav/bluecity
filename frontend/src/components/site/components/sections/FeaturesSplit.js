import React from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
// import Image from '../elements/Image';

import { makeStyles } from "@material-ui/core/styles";
import Image from "material-ui-image";
import Container from "@material-ui/core/Container";

import step0Short from '../../assets/images/step-0-short.png';
import step1Short from '../../assets/images/step-1-short.png';
// import step2Short from '../../assets/images/step-2-short.png';
import step3Short from '../../assets/images/step-3-short.png';

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

const FeaturesSplit = ({
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

  const innerClasses = classNames(
    'features-split-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const splitClasses = classNames(
    'split-wrap',
    invertMobile && 'invert-mobile',
    invertDesktop && 'invert-desktop',
    alignTop && 'align-top'
  );

  const sectionHeader = {
    title: 'Tres pasos sencillos de uso de nuestro servicio',
    paragraph: 'El uso de nuestro servicio es sencillo. Con estos 3 pasos puedes aparcar tu patinete o alquilar alguna de las disponibles en nuestra red de estaciones una vez te has registrado en nuestra App.'
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={splitClasses}>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Dos posibilidades de uso
                </div>
                <h3 className="mt-0 mb-12">
                  Aparcar o alquilar un patinete
                </h3>
                <p className="m-0">
                  Haciendo click en una de estas dos opciones podrás buscar la estación mas cercana. Aparcar tu propia patinete o acceder a una de nuestras patinetes de alquiler.
                </p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Container className={myClasses.image}>
                  <Image src={step0Short} aspectRatio={5 / 9} />
                </Container>
              </div>
            </div>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-right" data-reveal-container=".split-item">
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Busca la estación más cercana
                  </div>
                <h3 className="mt-0 mb-12">
                  Busca la estación para aparcar/alquilar
                  </h3>
                <p className="m-0">
                  A través del mapa puedes localizar, si activas la geolocalización en tu móvil, la estación más cercana dónde aparcar tu patinete o alquilar una patinete de nuestra red.
                  </p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Container className={myClasses.image}>
                  <Image src={step1Short} aspectRatio={5 / 9} />
                </Container>
              </div>
            </div>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Una vez elegida la estación
                  </div>
                <h3 className="mt-0 mb-12">
                  Reserva el aparcamiento dentro de la estación
                  </h3>
                <p className="m-0">
                  Finamente reserva el aparcamiento/alquiler en la estación. La duración de la reserva es de 5 minutos. Una vez transcurridos los 5 minutos puedes volver a hacer otra reserva. 
                  </p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Container className={myClasses.image}>
                  <Image src={step3Short} aspectRatio={5 / 9} />
                </Container>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;