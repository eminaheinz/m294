import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Select from 'react-select'


/* Bootstrap imports */
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

function DozentenEditForm() {
    
    /* Hier wird die ID in der URL in einer Variable gespeichert */
    const params = useParams();
    let id = params.id;
    console.log(params);
      
    /* State für die vorhandenen Werte der jeweiligen Felder */  
    const [loadedValues, setLoadedValues] = useState([]);  
    const [laenderValues, setlaenderValues] = useState([]); 
    
    /* Input state*/  
    const [inputs, setInputs] = useState([]);
    
    /* Error/Success states & handler */
    const [showSuccess, setShowSuccess] = useState(false);
    const handleShowSuccess = (showValue) => setShowSuccess(showValue);
    const [showError, setShowError] = useState(false);
    const handleShowError = (showValue) => setShowError(showValue);
    
    /* Loading state & handler */
    const [loading, setLoading] = useState(false);
    const handleLoading = (loadingValue) => setLoading(loadingValue);

    /* Beim aufrufen der Seite wird die Funktion zum laden der Daten aufgerufen */
    useEffect(() => {
        getData();
        getLaender();
    }, []);
    
    /* Hier werden die Daten des Dozenten von der API geladen. Der API-Call wird asynchron ausgeführt */
    const getData = async () => {
        /* Fehler abfangen */
        try{
            const res = await axios.get("https://emina.dnet.ch/dozenten/" + id);
            setLoadedValues(res.data.data[0]);
        }catch(err){
            handleShowError(true);
        }  
    };

    const getLaender = async () => {
        const res = await axios.get("https://emina.dnet.ch/laender/");
        setlaenderValues(res.data.data);
    };
    
    /* Bei Veränderungen bei einem Textfeld werden die Daten im state gespeichert */
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    };

    const handleChangeSelect = (selectedOptions) => {
        console.log("SO:");
        console.log(selectedOptions)
        console.log(selectedOptions.value);
        setInputs(values => ({...values, "id_land": selectedOptions.value}))         
    }

    /* Submit Listener */
    const handleSubmit = (event) => {
        event.preventDefault();
        handleLoading(true);
        handleShowError(false);
        handleShowSuccess(false);
        updateData();
    };
    
    /* Die Daten werden an die API geschickt. Der API-Call wird asynchron ausgeführt. */
    const updateData = async () => {
        const json = JSON.stringify(inputs);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try{
            const response = await axios.put("https://emina.dnet.ch/dozenten/" + id, json, config);
            handleShowSuccess(true);
            setInputs([]); 
        }catch(err){
            handleShowError(true);
        }
        handleLoading(false);
    };

    function Item(value, label) {    
        this.value = value;    
        this.label = label;    
    } 

    let optionsLaender = []  

    for (let i = 0; i < laenderValues.length; i++) 
    {   
        optionsLaender.push(new Item(laenderValues[i].id, laenderValues[i].land))   
    }
    /* Rendering des Formulars */
    return (
        <div>
        <Alert show={showSuccess} variant="success">
            <p>
              Dozent wurde erfolgreich aktualisiert.
            </p>
        </Alert>
        <Alert show={showError} variant="danger">
            <p>
              Ein Fehler ist aufgetreten.
            </p>
        </Alert>
        <h1>Dozent bearbeiten</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formDozentNummer">
                <Form.Label>Vorname</Form.Label>
                <Form.Control  name="vorname" type="text" placeholder="Vorname" defaultValue={loadedValues.vorname} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fromDozentThema">
                <Form.Label>Nachname</Form.Label>
                <Form.Control  name="nachname" type="text" placeholder="Nachname" defaultValue={loadedValues.nachname} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fromDozentInhalt">
                <Form.Label>Strasse</Form.Label>
                <Form.Control  name="strasse" type="text" placeholder="Strasse" defaultValue={loadedValues.strasse} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fromDozentDozent">
                <Form.Label>PLZ</Form.Label>
                <Form.Control  name="plz" type="text" placeholder="PLZ" defaultValue={loadedValues.plz} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fromDozentStartdatum">
                <Form.Label>Ort</Form.Label>
                <Form.Control  type="text" name="ort" placeholder="Ort" defaultValue={loadedValues.ort} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDozentnddatum">
                <Form.Label>Land</Form.Label>
                <Select options={optionsLaender} isSearchable={true} menuPlacement="top" onChange={handleChangeSelect}/>     
            </Form.Group>
            <Form.Group className="mb-3" controlId="fromDozentDauer">
                <Form.Label>Geschlecht</Form.Label>
                <Form.Control  type="text" name="geschlecht" placeholder="Geschlecht" defaultValue={loadedValues.geschlecht} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fromDozentDauer">
                <Form.Label>Telefon Nummer</Form.Label>
                <Form.Control  type="text" name="telefon" placeholder="Telefon" defaultValue={loadedValues.telefon} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fromDozentDauer">
                <Form.Label>Handy Nummer</Form.Label>
                <Form.Control  type="text" name="handy" placeholder="Handy" defaultValue={loadedValues.handy} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fromDozentDauer">
                <Form.Label>E-Mail Adresse</Form.Label>
                <Form.Control  type="text" name="email" placeholder="Email" defaultValue={loadedValues.email} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fromDozentDauer">
                <Form.Label>Geburtsdatum</Form.Label>
                <Form.Control  type="date" name="geburtsdatum" placeholder="Geburtsdatum" defaultValue={loadedValues.geburtsdatum} onChange={handleChange}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Speichern {loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>}
            </Button>
        </Form>
        </div>
    );
}

export default DozentenEditForm;
