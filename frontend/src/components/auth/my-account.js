import React from 'react';
import { MyNavbar } from '../ui/my-navbar';
import { Footer } from '../ui/footer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MyContainer } from '../ui/my-container';
import UserDataService from '../../services/user.service';

export default class MyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
    }

    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    UserDataService.get(this.props.userId)
      .then(response => {
        this.setState({
          name: response.data.name,
          email: response.data.username,
          loading: false
        })
      })
      .catch(e => {
        this.changeLoadingState(false);
      });
  }

  render() {
    return (
      <>
        <MyNavbar history={this.props.history} />
        <MyContainer>
          <Row>
            <Col><h5>User Profile</h5><br /></Col>
          </Row>
          <Row>
            <Col>
              <p className="font-weight-bold">Name</p>
              <p className="text-capitalize">{this.state.name.toLowerCase()}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="font-weight-bold">Email</p>
              <p className="text-lowercase">{this.state.email}</p>
            </Col>
          </Row>
        </MyContainer>
        <Footer />
      </>
    )
  }
}