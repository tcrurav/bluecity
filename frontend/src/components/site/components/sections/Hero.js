import React from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
// import ButtonGroup from '../elements/ButtonGroup';
// import Button from '../elements/Button';
// import Image from '../elements/Image';
// import Modal from '../elements/Modal';

// import { makeStyles } from "@material-ui/core/styles";

// import videoPlaceholder from '../../assets/images/video-placeholder.jpg';
// import mobileLogo from '../../assets/images/mobile-logo.png';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     marginTop: "10vh",
//   },
//   image: {
//     maxWidth: "512px",
//   },
//   buttonContainer: {
//     justify: "center",
//     alignItems: "center",
//     //justifyContent: "center",
//   },
//   buttons: {
//     marginTop: "1vh",
//     backgroundColor: "#00a9f4",
//     "&:hover": {
//       backgroundColor: "#007ac1",
//       color: "white",
//     },
//   },
//   footer: {
//     top: 0,
//   },
// }));

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {

  // const myClasses = useStyles();

  // const [videoModalActive, setVideomodalactive] = useState(false);

  // const openModal = (e) => {
  //   e.preventDefault();
  //   setVideomodalactive(true);
  // }

  // const closeModal = (e) => {
  //   e.preventDefault();
  //   setVideomodalactive(false);
  // }

  const outerClasses = classNames(
    'hero section center-content',
    // topOuterDivider && 'has-top-divider',
    // bottomOuterDivider && 'has-bottom-divider',
    // hasBgColor && 'has-bg-color',
    // invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
              <span className="text-color-primary">Somos Bluecity</span> es tu red de estaciones para patinetes
            </h1>
            <div className="container-xs">
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                Un prototipo que consta del trabajo colaborativo de tres centros educativos y una empresa con un total de seis ciclos diferentes de Formación Profesional.
                </p>
              {/* <div className="reveal-from-bottom" data-reveal-delay="600">
                <Image src="img/centro1.png" aspectRatio={5 / 9} className={myClasses.image} />
                <Image src="img/centro2.png" aspectRatio={5 / 9} className={myClasses.image} />
                <ButtonGroup>
                  <Button tag="a" color="primary" wideMobile href="https://cruip.com/">
                    Get started
                    </Button>
                  <Button tag="a" color="dark" wideMobile href="https://github.com/cruip/open-react-template/">
                    View on Github
                    </Button>
                </ButtonGroup> 
              </div>*/}
            </div> 
          </div>
          {/* <div className="hero-figure reveal-from-bottom illustration-element-01" data-reveal-value="20px" data-reveal-delay="800">
            <a
              data-video="https://player.vimeo.com/video/174002812"
              href="#0"
              aria-controls="video-modal"
              onClick={openModal}
            >
              <Image
                className="has-shadow"
                src={mobileLogo}
                alt="Hero"
                width={896}
                height={504} />
            </a>
          </div> */}
          {/* <Modal
            id="video-modal"
            show={videoModalActive}
            handleClose={closeModal}
            video="https://player.vimeo.com/video/174002812"
            videoTag="iframe" /> */}
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;