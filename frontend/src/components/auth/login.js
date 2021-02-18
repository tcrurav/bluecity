import React from 'react';
import { MyAuthButtons } from '../ui/my-auth-buttons';
import { MyContainer } from '../ui/my-container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { BallBeat } from 'react-pure-loaders';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
    this.changeLoadingState = this.changeLoadingState.bind(this);
  }

  changeLoadingState(newState) {
    this.setState({
      loading: newState
    })
  }

  render() {
    return (
      <>
        {this.state.loading ?
          <MyContainer>
            <Row className="justify-content-md-center h-50">
              <Col md={6} className="text-center mt-auto pb-5">
                <BallBeat
                  color={'#123abc'}
                  loading={this.state.loading}
                />
              </Col>
            </Row>
          </MyContainer>
          :
          <MyContainer>
            <Row className="justify-content-md-center h-50">
              <Col md={6} className="text-center mt-auto pb-5">
                <Image fluid src="img/bluecity.jpg" alt="logo" />
              </Col>
            </Row>
            <Row className="justify-content-md-center h-50">
              <Col md={6} className="mb-auto">
                <MyAuthButtons history={this.props.history} changeLoadingState={this.changeLoadingState} />
              </Col>
            </Row>
          </MyContainer>
        }
      </>
    );
  }
}