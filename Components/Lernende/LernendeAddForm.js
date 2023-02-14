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
function LernendeAddForm() {
    /* Input state*/  
    let lernendeID = []
    const [inputs, setInputs] = useState([]);
    const [lehrbetriebeValues, setlehrbetriebeValues] = useState([]); 
    const [lernendeValues, setLernendeValues] = useState([]); 
    
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
        addLehrbetrieb();
    };

    const handleChangeLernende = (selectedOptions) => {
        lernendeID = [];
        for (let i = 0; i<selectedOptions.length; i++)
        {
            lernendeID.push(selectedOptions[i]);
        }
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
            const response = await axios.post("https://emina.dnet.ch/lernende/?", json, config);
            console.log(response);
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

    for (let i = 0; i < lehrbetriebeValues.length; i++) 
    {   
        options.push(new Item(lehrbetriebeValues[i].id, lehrbetriebeValues[i].firma))   
    }

    const getData = async () => {
        const res = await axios.get("https://emina.dnet.ch/lehrbetriebe/");
        setlehrbetriebeValues(res.data.data);
    };

    useEffect(() => {
        getData();
        getLernende();
    }, []);

    
    const addLehrbetrieb = async () => {
        let lehrbetriebeId = lernendeValues;
        console.log(lernendeID);
        //console.log(inputsLernende)
        let json = {
            'id_lehrbetrieb': Math.floor(lernendeID.value),
            'id_lernende': lehrbetriebeId,
        };
        console.log(json)
        /* Headers werden gesetzt */
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        /* Fehler abfangen */
        try{
            const response = await axios.post("https://emina.dnet.ch/lehrbetriebe_lernende/", json, config);
            handleShowSuccess(true);
        }catch(err){
            handleShowError(true);
        }
        handleLoading(false);

    };

    const getLernende = async () => {
        /* Fehler abfangen */
        try{
            const res = await axios.get("https://emina.dnet.ch/lernende/");
            let lernendeID = res.data.data
            let ID = 0;
            for(let i = 0; i < lernendeID.length; i++)
            {
                if (parseInt(lernendeID[i].id) > parseInt(ID))
                {
                    ID = lernendeID[i].id;
                }
            }
            ID++;
            setLernendeValues(ID)
            return ID 
        }catch(err){
            handleShowError(true);
        }
    };

    /* Rendering des Formulars */
    return (
        <div>    
        <Alert show={showSuccess} variant="success">
            <p>
              Lernende wurde erfolgreich erstellt.
            </p>
        </Alert>
        <Alert show={showError} variant="danger">
            <p>
              Ein Fehler ist aufgetreten.
            </p>
        </Alert>
        <h1>Lernende hinzufügen</h1>
        <Form className="mt-4" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formLernendeVorname">
                <Form.Label>Vorname</Form.Label>
                <Form.Control required name="vorname" type="text" placeholder="Vorname" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fromLernendeNachname">
                <Form.Label>Nachname</Form.Label>
                <Form.Control   name="nachname" type="text" placeholder="Nachname" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fromLernendeStrasse">
                <Form.Label>Strasse</Form.Label>
                <Form.Control   name="strasse" type="text" placeholder="Strasse" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fromLernendePLZ">
                <Form.Label>PLZ</Form.Label>
                <Form.Control   name="plz" type="text" placeholder="PLZ" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeenOrt">
                <Form.Label>Ort</Form.Label>
                <Form.Control   type="text" name="ort" placeholder="Ort" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeenidLand">
                <Form.Label>Id Land</Form.Label>
                <Form.Control   type="number" name="id_land" placeholder="Id_Land" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fromLernendeGeschlecht">
                <Form.Label>Geschlecht</Form.Label>
                <Form.Control   type="text" name="geschlecht" placeholder="Geschlecht" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fromLernendeTelefon">
                <Form.Label>Telefon Nummer</Form.Label>
                <Form.Control   type="text" name="telefon" placeholder="Telefon" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fromLernendeHandy">
                <Form.Label>Handy Nummer</Form.Label>
                <Form.Control   type="text" name="handy" placeholder="Handy" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fromLernendeEmail">
                <Form.Label>E-Mail Adresse</Form.Label>
                <Form.Control   type="text" name="email" placeholder="Email" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fromLernendeEmailPrivat">
                <Form.Label>E-Mail Adresse Privat</Form.Label>
                <Form.Control   type="text" name="email_privat" placeholder="Email Privat" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fromLernendeGeburtsdatum">
                <Form.Label>Geburtsdatum</Form.Label>
                <Form.Control   type="date" name="geburtsdatum" placeholder="Geburtsdatum" onChange={handleChange}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Lehrbetrieb</Form.Label>        
                <Select options={options} isSearchable={true} menuPlacement="top" onChange={handleChangeLernende}/>     
            </Form.Group> 
            <Button variant="primary" type="submit">
                Erstellen {loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>}
            </Button>
        </Form>
        </div>
    );
}

export default LernendeAddForm;
