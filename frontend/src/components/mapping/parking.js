import React from 'react';
import { MyNavbar } from '../ui/navbar/my-navbar';
import { Footer } from '../ui/footer';
import ParkingDataService from '../../services/parking.service';
import { ParkingsWithFreeBoxes } from "./parkingsWithFreeBoxes";

export class Parking extends React.Component {

  constructor(props) {
    super(props);

    // this.state = {
    //   parkings: []
    // }

    // this.getParkings = this.getParkings.bind(this);
  }

  componentDidMount() {
    // this.getParkings();
  }

  // getParkings() {
  //   ParkingDataService.getAll()
  //     .then(response => {
  //       this.setState({
  //         parkings: response.data
  //       })
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

  render() {
    return (
      <>
        <MyNavbar history={this.props.history} />
        <ParkingsWithFreeBoxes history={this.props.history} />
        <Footer />
      </>
    );
  }
}

