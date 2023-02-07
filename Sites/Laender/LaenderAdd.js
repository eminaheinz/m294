import React from 'react';
import BackButton from '../../Components/BackButton';
import LaenderAddForm from '../../Components/Laender/LaenderAddForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const LaenderAdd = () => {
  return (
        <Container>
            <Row>
                <BackButton route="/Laender/"/>
                <Col lg={7} className="mt-5"><LaenderAddForm /></Col>
            </Row>
        </Container>
   );
};
  
export default LaenderAdd;


