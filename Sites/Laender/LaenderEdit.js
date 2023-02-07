import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import BackButton from '../../Components/BackButton';
import LaenderEditForm from '../../Components/Laender/LaenderEditForm';


const LaenderEdit = () => {
  return (
        <Container>
            <Row>
                <BackButton route="/Laender/" />
                <Col lg={7} className="mt-5"><LaenderEditForm /></Col>
            </Row>
        </Container>
   );
};
  
export default LaenderEdit;


