import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select'

/* Bootstrap imports */
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

/* Diese Funtion gibt das Formular zum hinzufügen von Einträgen zurück*/
function DozentAddForm() {
    /* Input state*/  
    const [inputs, setInputs] = useState([]);
    
    /* Error/Success states & handler */
    const [showSuccess, setShowSuccess] = useState(false);
    const handleShowSuccess = (showValue) => setShowSuccess(showValue);
    const [showError, setShowError] = useState(false);
    const handleShowError = (showValue) => setShowError(showValue);
    
    /* Loading state & handler*/
    const [loading, setLoading] = useState(false);
    const handleLoading = (loadingValue) => setLoading(loadingValue);

    /* Bei Veränderungen bei einem Textfeld werden die Daten im state gespeichert */
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    };

    /* Submit Listener */
    const handleSubmit = (event) => {
        event.preventDefault();
        handleLoading(true);
        handleShowError(false);
        handleShowSuccess(false);
        createData();
    };
    
    /* Die Daten werden an die API geschickt. Der API-Call wird asynchron ausgeführt. */
    const createData = async () => {
        const json = JSON.stringify(inputs);
        /* Headers werden gesetzt */
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        /* Fehler abfangen */
        try{
            const response = await axios.post("https://emina.dnet.ch/dozenten/?", json, config);
            console.log("error vom adden:" + response);
            handleShowSuccess(true);
            setInputs([]);
        }catch(err){
            handleShowError(true);
        }
        handleLoading(false);
    };

    /* Rendering des Formulars */
    return (
        <div>    
        <Alert show={showSuccess} variant="success">
            <p>
              Dozent wurde erfolgreich erstellt.
            </p>
        </Alert>
        <Alert show={showError} variant="danger">
            <p>
              Ein Fehler ist aufgetreten.
            </p>
        </Alert>
        <h1>Dozent hinzufügen</h1>
        <Form className="mt-4" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formDozentVorname">
                <Form.Label>Vorname</Form.Label>
                <Form.Control required name="vorname" type="text" placeholder="Vorname" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fromDozentNachname">
                <Form.Label>Nachname</Form.Label>
                <Form.Control required name="nachname" type="text" placeholder="Nachname" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fromDozentStrasse">
                <Form.Label>Strasse</Form.Label>
                <Form.Control  name="strasse" type="text" placeholder="Strasse" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fromDozentPLZ">
                <Form.Label>PLZ</Form.Label>
                <Form.Control  name="plz" type="text" placeholder="PLZ" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDozentenOrt">
                <Form.Label>Ort</Form.Label>
                <Form.Control  type="text" name="ort" placeholder="Ort" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDozentenidLand">
                <Form.Label>Id Land</Form.Label>
                <Form.Control  type="number" name="id_land" placeholder="Id_Land" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fromDozentGeschlecht">
                <Form.Label>Geschlecht</Form.Label>
                <Form.Control  type="text" name="geschlecht" placeholder="Geschlecht" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fromDozentTelefon">
                <Form.Label>Telefon Nummer</Form.Label>
                <Form.Control  type="text" name="telefon" placeholder="Telefon" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fromDozentHandy">
                <Form.Label>Handy Nummer</Form.Label>
                <Form.Control  type="text" name="handy" placeholder="Handy" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fromDozentEmail">
                <Form.Label>E-Mail Adresse</Form.Label>
                <Form.Control  type="text" name="email" placeholder="Email" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fromDozentGeburtsdatum">
                <Form.Label>Geburtsdatum</Form.Label>
                <Form.Control  type="date" name="geburtsdatum" placeholder="Geburtsdatum" onChange={handleChange}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Erstellen {loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>}
            </Button>
        </Form>
        </div>
    );
}

export default DozentAddForm;
