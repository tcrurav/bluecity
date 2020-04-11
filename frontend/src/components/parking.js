import React from 'react';
import { MyNavbar } from './my-navbar';
import { Footer } from './footer';
import { MyContainer } from './my-container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ParkingDataService from '../services/parking.service';

export class Parking extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      parkings: []
    }

    this.getParkings = this.getParkings.bind(this);
  }

  componentDidMount(){
    this.getParkings();
  }

  getParkings() {
    //IMPORTANT: This should be fixed: token should be sent (fixed necessary in backend too)
    ParkingDataService.getAll()
      .then(response => {
        console.log(response)
        this.setState({
          parkings: response.data
        })
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <>
        <MyNavbar history={this.props.history} />
        <MyContainer>
          <Row className="h-75">
            <Col className="text-center my-auto">
              <h1>Parking</h1>
              {this.state.parkings.map(p => <p key={p.id}>{p.name}</p>)}
            </Col>
          </Row>
        </MyContainer>
        <Footer />
      </>
    );
  }
}

