import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import BackButton from '../../Components/BackButton';
import KurseShowForm from '../../Components/Kurse/KurseShow';


const KurseShow = () => {
  return (
        <Container>
            <Row>
                <BackButton route="/kurse/" />
                <Col lg={7} className="mt-5"><KurseShowForm /></Col>
            </Row>
        </Container>
   );
};
  
export default KurseShow;


