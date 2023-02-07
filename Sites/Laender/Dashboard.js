import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LaenderTable from '../../Components/Laender/LaenderTable'

const Laender = () => {
  return (
        <Container>
            <Row>
                <Col className="mt-5"><LaenderTable /></Col>
            </Row>
        </Container>
   );
};
  
export default Laender;


