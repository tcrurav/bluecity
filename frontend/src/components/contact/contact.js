import React, { useState } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import { MyNavbar } from '../ui/navbar/my-navbar';
import { Footer } from '../ui/footer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { MyContainer } from '../ui/my-container';
import styled from 'styled-components';

import Image from "material-ui-image";

import { makeStyles } from "@material-ui/core/styles";

const MyMap = styled(Map)`
  &.leaflet-container {
    width: 100%;
    height: 50vh;
    margin-bottom: 1vh;
  }
`;

const useStyles = makeStyles((theme) => ({
  popup: {
    // maxHeight: "50vw"
    // height: "30vh"
  },
  popupImage: {
    width: "50vw",
    // height: "auto",
    // maxHeight: "30vw",
    // height: "30vw",
    borderRadius: "5px"
  },
  map: {
    width: "100%",
    height: "100vh"
  },
  h6: {
    marginTop: "1em",
    fontWeight: "bolder",
    maxWidth: "50vw"
  },
  paragraph: {
    maxWidth: "50vw"
  },
  mec: {
    height: ""
  }
}));

export function Contact(props) {
  const classes = useStyles();
  const [currentLocation, setCurrentLocation] = useState(3); //Ciudad Real is chosen as center at the beginning
  const [zoom, setZoom] = useState(4);

  const locations = [{
    id: 1,
    lat: '28.127729',
    long: '-15.4464768',
    address: 'Av. José Sánchez Peñate, s/n, Las Palmas de GC',
    name: 'IES El Rincón',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    id: 4,
    lat: '41.4107854',
    long: '2.0247707',
    address: 'Carrer Ntra. Sra. de Lourdes, 34, Barcelona',
    name: 'IES Bernat el Ferrer',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    id: 5,
    lat: '41.3558269',
    long: '2.0752466',
    address: 'Carrer Bonavista, 70, Barcelona',
    name: 'IES Esteve Terradas i Illa',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    id: 6,
    lat: '38.997992',
    long: '-3.919667',
    address: 'Inst. de Tec. y Sistemas de Información, Ciudad Real',
    name: 'Furious Koalas',
    createdAt: new Date(),
    updatedAt: new Date()
  }];

  const changeLocation = (id) => {
    setCurrentLocation(id);
    setZoom(13);
  }

  return (
    <>
      <MyNavbar history={props.history} />
      <MyContainer>
        <Row>
          <Col>
            <MyMap center={[locations[currentLocation].lat, locations[currentLocation].long]} zoom={zoom} zoomAnimation="true">
              <TileLayer
                attribution=""
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {
                locations.map(l => {
                  let position = [l.lat, l.long];
                  return (
                    <Marker key={l.id} position={position}>
                      <Popup className={classes.popup}>
                        <h6 className={classes.h6}>{l.name}</h6>
                        <p className={classes.paragraph}>{l.address}</p>
                      </Popup>
                    </Marker>
                  );
                })
              }
            </MyMap>
          </Col>
        </Row>
        <Row>
          {
            locations.map((l, index) => {
              return (
                <Col key={l.id}>
                  <Image src={`img/centro${l.id}.png`} onClick={() => changeLocation(index)}/>
                </Col>
              );
            })
          }
        </Row>
      </MyContainer>
      <Footer />
    </>
  )
}
