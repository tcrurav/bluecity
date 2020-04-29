import React from "react";
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
                <MyContainer>
                    <Row className="h-75">
                        <Col className="text-center my-auto">
                            <h2>Here goes the info of free scooters</h2>
                            <Button variant="outline-primary" className="mt-2" href="/renting">Go back</Button>
                        </Col>
                    </Row>
                </MyContainer>
                <Footer />
            </>
        );
    }
}
