import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./CreateDeck.css";
import { updateDeck, createDeck } from "../utils/api";


function DeckForm({ loadedDeck, action }) {

    const history = useHistory();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(()=>{
        if(action === 'edit'){
            setName(loadedDeck.name);
            setDescription(loadedDeck.description);
        }
    },[action, loadedDeck.name, loadedDeck.description])

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const submitHandler = (event) => {
        event.preventDefault();
        if (action === "create") {
            createDeck({name: name, description: description})
            .then(createdDeck=> history.push(`/decks/${createdDeck.id}`))
        }
        else {
            const updatedDeck = {id: loadedDeck.id, name: name, description: description};
            updateDeck(updatedDeck);
            setTimeout(()=>{history.push(`/decks/${loadedDeck.id}`)},800);
        }
    }

    return (
        <form onSubmit={submitHandler} className="createForm">
                <label>Name
                    <input type="text" placeholder="Deck Name" value={name} onChange={handleNameChange} />
                </label>
                <label>Description
                    <textarea placeholder="Brief description of the deck" value={description} onChange={handleDescriptionChange} />
                </label>
                <div style={{display: "flex"}}>
                    <button type="button" className="btn btn-dark" onClick={()=>history.goBack(1)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
    )
};

export default DeckForm;