import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DozentenTable from '../../Components/Dozenten/DozentenTable'

const Donzenten = () => {
  return (
        <Container>
            <Row>
                <Col className="mt-5"><DozentenTable /></Col>
            </Row>
        </Container>
   );
};
  
export default Donzenten;


