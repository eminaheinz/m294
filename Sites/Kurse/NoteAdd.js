import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import BackButton from '../../Components/BackButton';
import NoteAddForm from '../../Components/Kurse/NoteAdd';


const NoteAdd = () => {
  return (
        <Container>
            <Row>
                <BackButton route="/kurse/" />
                <Col lg={7} className="mt-5"><NoteAddForm /></Col>
            </Row>
        </Container>
   );
};
  
export default NoteAdd;


