import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LehrbetriebeTable from '../../Components/Lehrbetriebe/LehrbetriebeTable'

const Lehrbetriebe = () => {
  return (
        <Container>
            <Row>
                <Col className="mt-5"><LehrbetriebeTable /></Col>
            </Row>
        </Container>
   );
};
  
export default Lehrbetriebe;


