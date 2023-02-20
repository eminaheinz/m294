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
    let lehrbetriebID;
    const [inputs, setInputs] = useState([]);
    const [laenderValues, setlaenderValues] = useState([]); 
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
        createData();
        addLehrbetrieb();
    };

    const handleChangeLehrbetriebe = (selectedOptions) => {
        console.log("SOV");
        console.log(selectedOptions.value)
        lehrbetriebID = selectedOptions.value;
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

    let optionsLaender = []  

    for (let i = 0; i < laenderValues.length; i++) 
    {   
        optionsLaender.push(new Item(laenderValues[i].id, laenderValues[i].land))   
    }

    let options = []  

    for (let i = 0; i < lehrbetriebeValues.length; i++) 
    {   
        options.push(new Item(lehrbetriebeValues[i].id, lehrbetriebeValues[i].firma))   
    }

    const getLehrbetriebe = async () => {
        const res = await axios.get("https://emina.dnet.ch/lehrbetriebe/");
        setlehrbetriebeValues(res.data.data);
    };

    const getLaender = async () => {
        const res = await axios.get("https://emina.dnet.ch/laender/");
        setlaenderValues(res.data.data);
    };

    

    const getLernendeID = async () => {
        /* Fehler abfangen */
        try{
            const res = await axios.get("https://emina.dnet.ch/lernende/");
            let lernendenID = res.data.data
            let ID = 0;
            for(let i = 0; i < lernendenID.length; i++)
            {
                if (parseInt(lernendenID[i].id) > parseInt(ID))
                {
                    ID = lernendenID[i].id;
                }
            }
            ID++;
            setLernendeValues(ID)
            return ID 
        }catch(err){
            handleShowError(true);
        }
    };

    useEffect(() => {
        getLehrbetriebe();
        getLernendeID();
        getLaender();
    }, []);

    
    const addLehrbetrieb = async () => {
        let lernendenID = lernendeValues;
        console.log("LehrbetriebID");
        console.log(lehrbetriebID);
        //console.log(inputsLernende)
        let json = {
            'id_lehrbetrieb': Math.floor(lehrbetriebID),
            'id_lernende': lernendenID,
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
                <Form.Label>Land</Form.Label>
                <Select options={optionsLaender} isSearchable={true} menuPlacement="top" onChange={handleChangeSelect}/>     
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
                <Select options={options} isSearchable={true} menuPlacement="top" onChange={handleChangeLehrbetriebe}/>     
            </Form.Group> 
            <Button variant="primary" type="submit">
                Erstellen {loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>}
            </Button>
        </Form>
        </div>
    );
}

export default LernendeAddForm;
