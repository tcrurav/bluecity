import React from "react";
<<<<<<< HEAD
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
                <MyNavbar history={this.props.history}/>
=======
import { Button, Row, Col } from 'react-bootstrap';
import {MyNavbar} from "./my-navbar";
import {MyContainer} from "./my-container";
import {Footer} from "./footer";
import {Renting} from "./renting";

export class Scooter extends React.Component {

    render() {
        return (
            <>
                <MyNavbar history={this.props.history} />
>>>>>>> 19417255b0485db8067925a313f3338b29c14650
                <MyContainer>
                    <Row className="h-75">
                        <Col className="text-center my-auto">
                            <h2>Here goes the info of free scooters</h2>
<<<<<<< HEAD
                            {this.state.scooters.map(e => <p>{e.id}</p>)}
=======
>>>>>>> 19417255b0485db8067925a313f3338b29c14650
                            <Button variant="outline-primary" className="mt-2" href="/renting">Go back</Button>
                        </Col>
                    </Row>
                </MyContainer>
<<<<<<< HEAD
                <Footer/>
=======
                <Footer />
>>>>>>> 19417255b0485db8067925a313f3338b29c14650
            </>
        );
    }
}
