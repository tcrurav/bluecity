import React from "react";
import {Button, Row, Col} from 'react-bootstrap';
import {MyNavbar} from "./my-navbar";
import {MyContainer} from "./my-container";
import {Footer} from "./footer";
import ScooterDataService from "../services/scooter.service";

export class Scooter extends React.Component {

    constructor(props) {
        super(props);
        this.findAllFreeScooters = this.findAllFreeScooters.bind(this);
        this.state = {
            scooters: []
        }
    }

    componentDidMount() {
        this.findAllFreeScooters();
    }

    findAllFreeScooters() {
        ScooterDataService.findAllFree().then(res => {
            console.log(res);
            this.setState({
                scooters: res.data
            })
        })
    }

    render() {
        return (
            <>
                <MyNavbar history={this.props.history} />
                <MyContainer>
                    <Row className="h-75">
                        <Col className="text-center my-auto">
                            <h2>Here goes the info of free scooters</h2>
                            {this.state.scooters.map(e => <p>{e.id}</p>)}
                            <Button variant="outline-primary" className="mt-2" href="/renting">Go back</Button>
                        </Col>
                    </Row>
                </MyContainer>
                <Footer/>
            </>
        );
    }
}