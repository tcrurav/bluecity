import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import "./contact.css";

export class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 28.128081,
      lng: -15.4467406,
      zoom: 13,
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution=''
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            IES El Rincón<br />
            Guanarteme Building<br />
            My school.<br />
            I miss it so much.
          </Popup>
        </Marker>
      </Map>
    )
  }
}