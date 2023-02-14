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

function KurseEditForm() {
    
    /* Hier wird die ID in der URL in einer Variable gespeichert */
    const params = useParams();
    let id = params.id;
    console.log(params);
      
    /* State für die vorhandenen Werte der jeweiligen Felder */  
    const [loadedValues, setLoadedValues] = useState([]);  
    const [dozentenValues, setDozentenValues] = useState([]);

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
        getDozenten();
    }, []);
    
    /* Hier werden die Daten des Kurses von der API geladen. Der API-Call wird asynchron ausgeführt */
    const getData = async () => {
        /* Fehler abfangen */
        try{
            const res = await axios.get("https://emina.dnet.ch/kurs/" + id);
            setLoadedValues(res.data.data[0]);
        }catch(err){
            handleShowError(true);
        }  
    };

    const getDozenten = async () => {
        const res = await axios.get("https://emina.dnet.ch/dozenten/");
        setDozentenValues(res.data.data);
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
        setInputs(values => ({...values, "id_dozent": selectedOptions.value}))
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
            const response = await axios.put("https://emina.dnet.ch/kurs/" + id, json, config);
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
    let options = []  

    for (let i = 0; i < dozentenValues.length; i++) 
    {   
        options.push(new Item(dozentenValues[i].id, dozentenValues[i].vorname))  
        console.log("vorname:" + dozentenValues[i].vorname)  
    }
    /* Rendering des Formulars */
    return (
        <div>
        <Alert show={showSuccess} variant="success">
            <p>
              Kurs wurde erfolgreich aktualisiert.
            </p>
        </Alert>
        <Alert show={showError} variant="danger">
            <p>
              Ein Fehler ist aufgetreten.
            </p>
        </Alert>
        <h1>Kurs bearbeiten</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formKursNummer">
                <Form.Label>Kursnummer</Form.Label>
                <Form.Control name="kursnummer" type="number" placeholder="Kursnummer" defaultValue={loadedValues.kursnummer} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formKursThema">
                <Form.Label>Kursthema</Form.Label>
                <Form.Control name="kursthema" type="text" placeholder="Kursthema" defaultValue={loadedValues.kursthema} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formKursInhalt">
                <Form.Label>Kursinhalt</Form.Label>
                <Form.Control name="inhalt" as="textarea" rows={3} placeholder="Kursinhalt" defaultValue={loadedValues.inhalt} onChange={handleChange}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Dozent</Form.Label>        
                <Select options={options} isSearchable={true} menuPlacement="top" onChange={handleChangeSelect}/>     
            </Form.Group>
            <Form.Group className="mb-3" controlId="formKursStartdatum">
                <Form.Label>Startdatum</Form.Label>
                <Form.Control type="date" name="startdatum" placeholder="Startdatum" defaultValue={loadedValues.startdatum} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formKursEnddatum">
                <Form.Label>Enddatum</Form.Label>
                <Form.Control type="date" name="enddatum" placeholder="Enddatum" defaultValue={loadedValues.enddatum} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formKursDauer">
                <Form.Label>Dauer</Form.Label>
                <Form.Control type="number" name="dauer" placeholder="Dauer" defaultValue={loadedValues.dauer} onChange={handleChange}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Speichern {loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>}
            </Button>
        </Form>
        </div>
    );
}

export default KurseEditForm;
