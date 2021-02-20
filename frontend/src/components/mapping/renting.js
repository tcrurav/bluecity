import React from 'react';
import { MyNavbar } from '../ui/navbar/my-navbar';
import { Footer } from '../ui/footer';
import ScooterDataService from "../../services/scooter.service";
import { ParkingsWithFreeScooters } from "./parkingsWithFreeScooters";
import { ParkingsWithFreeBoxes } from "./parkingsWithFreeBoxes";

export class Renting extends React.Component {

  constructor(props) {
    super(props);
    this.findScooterWithuserId = this.findScooterWithuserId.bind(this);
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    this.findScooterWithuserId();
  }

  findScooterWithuserId() {
    ScooterDataService.getScooterWithUserId(this.props.userId).then(res => {
      this.setState({
        user: res.data
      })
    })
  }

  render() {
    return (
      <>
        <MyNavbar history={this.props.history} />
        {this.state.user ? <ParkingsWithFreeBoxes /> : <ParkingsWithFreeScooters history={this.props.history}/>}
        <Footer />
      </>
    );
  }
}

