import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';

const MyFirstRow = styled(Row)` 
  /*rgb(55,71,79)*/
  background-color: #37474F;
  color: #fff;
`;

const MyCopyrightCol = styled(Col)` 
  background-color: #263238;
  color: #fff;
  text-align: center;
  font-size: small;
`;

const MyContainer = styled(Container)`
  clear:left;
`;

const MyLogo = styled.img`
  
`;

// <hr className="clearfix w-100 d-md-none pb-3" />

export function Footer() {
  const { t } = useTranslation();

  return (
    <MyContainer fluid>
      <MyFirstRow>
        <Col md={6} className="mt-md-0 mt-3">
          {/* <h5 className="text-uppercase">Footer Content</h5>
            <p>Here you can use rows and columns to organize your footer content.</p> */}
          <MyLogo className="img-fluid" src="img/bluecity.png" alt="logo" />
        </Col>
        <Col md={3} className="mb-md-0 mb-3">
          <h5 className="text-uppercase">{t('Participating Organizations')}</h5>
          <ul className="list-unstyled">
            <li>
              <a href="http://www.ieselrincon.es">IES El Rincón</a>
            </li>
            <li>
              <a href="https://moodle.bernatelferrer.cat/">Institut Bernat el Ferrer</a>
            </li>
            <li>
              <a href="http://iesesteveterradas.cat/">Institut Esteve Terradas</a>
            </li>
            <li>
              <a href="https://www.furiouskoalas.com/">Furious Koalas</a>
            </li>
          </ul>
        </Col>
      </MyFirstRow>
      <Row>
        <MyCopyrightCol>
          <p>Copyright information: Unless otherwise specified, all text and images on this website are licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" rel="noopener noreferrer" target="_blank">Creative Commons Attribution-Share Alike 3.0 License</a>.</p>
        </MyCopyrightCol>
      </Row>
    </MyContainer>
  );
}
